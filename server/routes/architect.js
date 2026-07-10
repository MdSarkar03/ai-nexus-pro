import express from "express";
import LLMModel from "../models/LLMModel.js";
import Tool from "../models/Tool.js";
import Stack from "../models/Stack.js";
import Workflow from "../models/Workflow.js";
import Prompt from "../models/Prompt.js";
import { extractIntent } from "../engine/intentExtractor.js";
import {
  scoreModel, scoreTool, scoreStack, scoreWorkflow, scorePrompt,
  pickTop, computeConfidence
} from "../engine/scoringEngine.js";
import {
  explainModelWin, explainToolSelection, explainStackFit, buildDecisionTrace
} from "../engine/explanationEngine.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1. Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Valid prompt string is required"
      });
    }

    const trimmedPrompt = prompt.trim();

    // 2. Extract intent
    const intent = await extractIntent(trimmedPrompt);

    // 3. Load all data from MongoDB
    const [models, tools, stacks, workflows, prompts] = await Promise.all([
      LLMModel.find({}).lean(),
      Tool.find({}).lean(),
      Stack.find({}).lean(),
      Workflow.find({}).lean(),
      Prompt.find({}).lean()
    ]);

    // 4. Score every item
    const scoredModels = models.map(model => ({
      ...model,
      score: scoreModel(model, intent)
    }));

    const scoredTools = tools.map(tool => ({
      ...tool,
      score: scoreTool(tool, intent)
    }));

    const scoredStacks = stacks.map(stack => ({
      ...stack,
      score: scoreStack(stack, intent)
    }));

    const scoredWorkflows = workflows.map(workflow => ({
      ...workflow,
      score: scoreWorkflow(workflow, intent)
    }));

    const scoredPrompts = prompts.map(promptItem => ({
      ...promptItem,
      score: scorePrompt(promptItem, intent)
    }));

    // 5. Pick best recommendations using pickTop (first item as primary)
    const topModel = pickTop(scoredModels)[0] || null;
    const topTool = pickTop(scoredTools)[0] || null;
    const topStack = pickTop(scoredStacks)[0] || null;
    const topWorkflow = pickTop(scoredWorkflows)[0] || null;
    const topPrompt = pickTop(scoredPrompts)[0] || null;

    // 6. Generate explanations
    const modelExplanation = explainModelWin(topModel, intent);
    const toolExplanation = explainToolSelection(topTool, intent);
    const stackExplanation = explainStackFit(topStack, intent);

    // 7. Generate decision trace
    const decisionTrace = buildDecisionTrace({
      query: trimmedPrompt,
      intent,
      topModel,
      topTool,
      topStack,
      topWorkflow,
      topPrompt
    });

    // 8. Generate confidence score (delegated to shared engine)
    const confidence = computeConfidence([
      topModel?.score || 0,
      topTool?.score || 0,
      topStack?.score || 0,
      topWorkflow?.score || 0,
      topPrompt?.score || 0
    ]);

    // Prepare recommendations object (full data for future frontend use)
    const recommendations = {
      model: topModel,
      tool: topTool,
      stack: topStack,
      workflow: topWorkflow,
      prompt: topPrompt
    };

    // Synthesize human-readable recommendation (matches frontend contract)
    const recommendation = `Recommended Architecture: Use ${topModel?.name || 'a versatile LLM'} as the core model, integrated with ${topTool?.name || 'specialized tools'} within the ${topStack?.title || 'optimal stack'}. This design best matches your prompt requirements for efficiency and scalability. See details below.`;

    // Derive riskLevel deterministically
    let riskLevel = "Medium";
    if (confidence >= 75) riskLevel = "Low";
    else if (confidence < 45) riskLevel = "High";

    // Return success response matching ArchitectPage expectations + rich data
    res.json({
      success: true,
      recommendation,
      riskLevel,
      confidence,
      recommendations,
      explanations: {
        model: modelExplanation,
        tool: toolExplanation,
        stack: stackExplanation
      },
      decisionTrace,
      intent
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;