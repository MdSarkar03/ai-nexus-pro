import express from "express";
import LLMModel from "../models/LLMModel.js";
import Tool from "../models/Tool.js";
import Stack from "../models/Stack.js";
import Workflow from "../models/Workflow.js";
import Prompt from "../models/Prompt.js";
import { extractIntent } from "../engine/intentExtractor.js";
import {
  scoreModel,
  scoreTool,
  scoreStack,
  scoreWorkflow,
  scorePrompt,
  pickTop,
  computeConfidence
} from "../engine/scoringEngine.js";
import {
  explainModelWin,
  explainToolSelection,
  explainStackFit,
  buildDecisionTrace
} from "../engine/explanationEngine.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    const { query } = req.body;

    // 1. Validate query
    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Valid query string is required"
      });
    }

    const trimmedQuery = query.trim();

    // 2. Extract intent
    const intent = await extractIntent(trimmedQuery);
    console.log("Query:", trimmedQuery);
console.log("Intent:", intent);

    // 3. Load all data from MongoDB
    const [models, tools, stacks, workflows, prompts] = await Promise.all([
      LLMModel.find({}).lean(),
      Tool.find({}).lean(),
      Stack.find({}).lean(),
      Workflow.find({}).lean(),
      Prompt.find({}).lean()
    ]);
    console.log("Models:", models.length);
console.log("Tools:", tools.length);
console.log("Stacks:", stacks.length);
console.log("Workflows:", workflows.length);
console.log("Prompts:", prompts.length);

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

    const scoredPrompts = prompts.map(prompt => ({
      ...prompt,
      score: scorePrompt(prompt, intent)
    }));

    // 5. Pick best recommendations using pickTop
    const topModel = pickTop(scoredModels);
    const topTool = pickTop(scoredTools);
    const topStack = pickTop(scoredStacks);
    const topWorkflow = pickTop(scoredWorkflows);
    const topPrompt = pickTop(scoredPrompts);

    // 6. Generate explanations
    const modelExplanation = explainModelWin(topModel, intent);
    const toolExplanation = explainToolSelection(topTool, intent);
    const stackExplanation = explainStackFit(topStack, intent);

    // 7. Generate decision trace
    const decisionTrace = buildDecisionTrace({
      query: trimmedQuery,
      intent,
      topModel,
      topTool,
      topStack,
      topWorkflow,
      topPrompt
    });

    // 8. Generate confidence score
    const confidence = computeConfidence([
      topModel.score,
      topTool.score,
      topStack.score,
      topWorkflow.score,
      topPrompt.score
    ]);

    // Prepare recommendations
    const recommendations = {
      model: topModel,
      tool: topTool,
      stack: topStack,
      workflow: topWorkflow,
      prompt: topPrompt
    };

    // Return success response
    res.json({
      success: true,
      recommendations,
      explanations: {
        model: modelExplanation,
        tool: toolExplanation,
        stack: stackExplanation
      },
      decisionTrace,
      confidence,
      intent
    });

  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

export default router;