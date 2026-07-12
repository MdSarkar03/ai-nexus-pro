import express from "express";
import Tool from "../models/Tool.js";
import LLMModel from "../models/LLMModel.js";
import Stack from "../models/Stack.js";
import Workflow from "../models/Workflow.js";
import Prompt from "../models/Prompt.js";

const router = express.Router();

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Compute a genuine relevance score (0-100) based on where the query matches
function computeScore(query, { primary = "", secondaryList = [], tertiary = "" }) {
  const q = query.trim().toLowerCase();
  if (!q) return 50;

  const p = (primary || "").toLowerCase();
  let score = 0;

  if (p === q) score = Math.max(score, 100);
  else if (p.startsWith(q)) score = Math.max(score, 92);
  else if (new RegExp(`\\b${escapeRegex(q)}\\b`).test(p)) score = Math.max(score, 88);
  else if (p.includes(q)) score = Math.max(score, 78);

  for (const s of secondaryList) {
    const sl = (s || "").toLowerCase();
    if (sl === q) score = Math.max(score, 85);
    else if (sl.includes(q)) score = Math.max(score, 70);
  }

  const t = (tertiary || "").toLowerCase();
  if (t.includes(q)) score = Math.max(score, 60);

  if (score === 0) score = 40; // matched somewhere in the DB query, but not in the fields we scored directly
  return Math.min(100, Math.round(score));
}

router.get("/", async (req, res) => {
  try {
    const { q = "", type = "all", limit = 50 } = req.query;
    const query = q.trim();

    if (!query) {
      return res.json({ query: "", total: 0, results: [] });
    }

    const regex = new RegExp(escapeRegex(query), "i");
    const wantType = (t) => type === "all" || type === t;
    const results = [];

    // TOOLS
    if (wantType("tools")) {
      const tools = await Tool.find({
        $or: [
          { name: regex },
          { description: regex },
          { category: regex },
          { tags: regex },
        ],
      }).limit(30);

      for (const t of tools) {
        results.push({
          id: t._id.toString(),
          type: "Tool",
          title: t.name,
          subtitle: t.category,
          category: t.category,
          description: t.description,
          logo: t.logo,
          url: t.url,
          score: computeScore(query, {
            primary: t.name,
            secondaryList: [...(t.tags || []), t.category],
            tertiary: t.description,
          }),
        });
      }
    }

    // AI MODELS
    if (wantType("models")) {
      const models = await LLMModel.find({
        $or: [
          { name: regex },
          { provider: regex },
          { description: regex },
          { bestFor: regex },
        ],
      }).limit(30);

      for (const m of models) {
        results.push({
          id: m._id.toString(),
          type: "AI Model",
          title: m.name,
          subtitle: m.provider,
          category: m.provider,
          description: m.description,
          score: computeScore(query, {
            primary: m.name,
            secondaryList: [...(m.bestFor || []), m.provider],
            tertiary: m.description,
          }),
        });
      }
    }

    // WORKFLOWS
    if (wantType("workflows")) {
      const workflows = await Workflow.find({
        $or: [
          { title: regex },
          { goal: regex },
          { description: regex },
          { category: regex },
          { tags: regex },
        ],
      }).limit(30);

      for (const w of workflows) {
        results.push({
          id: w._id.toString(),
          type: "Workflow",
          title: w.title,
          subtitle: w.category,
          category: w.category,
          description: w.description,
          score: computeScore(query, {
            primary: w.title,
            secondaryList: [...(w.tags || []), w.category],
            tertiary: `${w.goal} ${w.description}`,
          }),
        });
      }
    }

    // PROMPTS
    if (wantType("prompts")) {
      const prompts = await Prompt.find({
        $or: [
          { title: regex },
          { useCase: regex },
          { category: regex },
          { toolName: regex },
          { tags: regex },
        ],
      }).limit(30);

      for (const p of prompts) {
        results.push({
          id: p._id.toString(),
          type: "Prompt",
          title: p.title,
          subtitle: p.category,
          category: p.category,
          description: p.useCase,
          score: computeScore(query, {
            primary: p.title,
            secondaryList: [...(p.tags || []), p.category, p.toolName],
            tertiary: p.useCase,
          }),
        });
      }
    }

    // STACKS
    if (wantType("stacks")) {
      const stacks = await Stack.find({
        $or: [
          { title: regex },
          { role: regex },
          { description: regex },
          { tags: regex },
          { "tools.toolName": regex },
        ],
      }).limit(30);

      for (const s of stacks) {
        results.push({
          id: s._id.toString(),
          type: "Stack",
          title: s.title,
          subtitle: s.role,
          category: s.role,
          description: s.description,
          score: computeScore(query, {
            primary: s.title,
            secondaryList: [...(s.tags || []), s.role],
            tertiary: s.description,
          }),
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    const limited = results.slice(0, Number(limit));

    res.json({ query, total: limited.length, results: limited });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;