// server/engine/explanationEngine.js
// AI Nexus Pro - Explanation Engine

/**
 * Calculates a confidence or relevance score based on input data.
 * Existing function - kept unchanged.
 */
export function calculateScore(data) {
  if (!data || typeof data !== 'object') {
    return 0;
  }
  const base = data.score ?? data.confidence ?? 0;
  const weight = data.weight ?? 1;
  return Math.max(0, Math.min(100, base * weight));
}

/**
 * Explains why a particular model won in a selection process.
 * Existing function - kept unchanged.
 */
export function explainModelWin(model, context = {}) {
  if (!model) {
    return "No model selected.";
  }
  const name = model.name ?? model.id ?? 'Unknown Model';
  const score = calculateScore(model);
  const reason = safeGetReasoning(model, 'winReason') ?? 
                 (context.reason ?? 'Highest overall score');
  
  return `Model "${name}" was selected with a score of ${score}. ${reason}`;
}

/**
 * Builds a decision trace for logging or display purposes.
 * Existing function - kept unchanged.
 */
export function buildDecisionTrace(decision) {
  if (!decision) {
    return { steps: [], summary: 'No decision provided', finalScore: 0 };
  }

  // Backward-compatible: if a caller already built an explicit steps[] array, use it as-is.
  let steps = Array.isArray(decision.steps) ? decision.steps : null;

  if (!steps) {
    // Synthesize steps from the real shape passed by routes/architect.js:
    // { query, intent, topModel, topTool, topStack, topWorkflow, topPrompt }
    steps = [];

    if (decision.intent) {
      const i = decision.intent;
      steps.push({
        stage: 'Intent Extraction',
        detail: `Parsed query into structured intent: projectType=${i.projectType ?? 'unspecified'}, domain=${i.domain ?? 'unspecified'}, budget=${i.budget ?? 'unspecified'}, complexity=${i.complexity ?? 'unspecified'}, teamSize=${i.teamSize ?? 'unspecified'}, security=${i.security ?? 'unspecified'}.`,
        score: null
      });
    }

    const pushSelection = (stage, item, nameKey = 'name') => {
      if (!item) return;
      const label = item[nameKey] ?? item.title ?? 'Unknown';
      steps.push({
        stage,
        detail: `Selected "${label}" with score ${item.score ?? 0}.`,
        score: typeof item.score === 'number' ? item.score : 0
      });
    };

    pushSelection('Model Selection', decision.topModel);
    pushSelection('Tool Selection', decision.topTool);
    pushSelection('Stack Selection', decision.topStack, 'title');
    pushSelection('Workflow Selection', decision.topWorkflow, 'title');
    pushSelection('Prompt Selection', decision.topPrompt, 'title');
  }

  const summary = decision.summary ??
                  (steps.length ? `Decision trace with ${steps.length} steps` : 'Empty trace');

  // finalScore: prefer an explicit decision.score/confidence (old contract via calculateScore),
  // otherwise average whatever numeric per-step scores we synthesized above.
  const stepScores = steps.map(s => s.score).filter(s => typeof s === 'number' && !isNaN(s));
  const finalScore = (typeof decision.score === 'number' || typeof decision.confidence === 'number')
    ? calculateScore(decision)
    : (stepScores.length ? Math.round(stepScores.reduce((a, b) => a + b, 0) / stepScores.length) : 0);

  return {
    steps: steps.map((step, index) => ({
      index,
      ...step,
      timestamp: step.timestamp ?? new Date().toISOString()
    })),
    summary,
    finalScore
  };
}

/**
 * Safely retrieves reasoning text from an object with defensive checks.
 * Existing function - kept unchanged.
 */
export function safeGetReasoning(obj, path = 'reasoning') {
  if (!obj || typeof obj !== 'object') {
    return null;
  }
  
  if (path === 'reasoning' && obj.reasoning) {
    return typeof obj.reasoning === 'string' ? obj.reasoning : JSON.stringify(obj.reasoning);
  }
  
  // Support dot notation for nested paths (defensive)
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return null;
    }
    current = current[part];
  }
  
  if (current == null) {
    return null;
  }
  
  return typeof current === 'string' ? current : JSON.stringify(current);
}

/**
 * NEW: Explains why a specific tool was selected.
 * Uses defensive programming throughout.
 */
export function explainToolSelection(tool, context = {}) {
  if (!tool) {
    return "No tool was selected.";
  }
  
  const toolName = tool.name ?? tool.id ?? tool.toolId ?? 'Unnamed Tool';
  const score = calculateScore(tool);
  
  const capabilities = Array.isArray(tool.capabilities) 
    ? tool.capabilities.join(', ') 
    : (tool.capabilities ?? 'general');
  
  const matchReason = safeGetReasoning(tool, 'selectionReason') ?? 
                     safeGetReasoning(context, 'toolMatch') ?? 
                     `Tool matches query requirements with score ${score}`;
  
  let explanation = `Tool "${toolName}" was selected.`;
  explanation += ` Score: ${score}. Capabilities: ${capabilities}.`;
  explanation += ` ${matchReason}`;
  
  // Add optional context if available
  if (context.query) {
    explanation += ` For query: "${String(context.query).substring(0, 100)}${String(context.query).length > 100 ? '...' : ''}"`;
  }
  
  return explanation;
}

/**
 * NEW: Explains how a solution fits into the current stack/context.
 * Uses defensive programming throughout.
 */
export function explainStackFit(solution, stack = {}) {
  if (!solution) {
    return "No solution provided for stack evaluation.";
  }
  
  const solName = solution.name ?? solution.id ?? 'Solution';
  const score = calculateScore(solution);
  
  const stackSize = Array.isArray(stack.tools) ? stack.tools.length : 0;
  const stackCompatibility = stack.compatibility ?? 
                            (stack.tools ? 'partial' : 'unknown');
  
  const fitReason = safeGetReasoning(solution, 'stackFit') ?? 
                   safeGetReasoning(solution, 'fitReason') ?? 
                   'Fits current execution stack';
  
  let explanation = `"${solName}" has a stack fit score of ${score}.`;
  explanation += ` Stack contains ${stackSize} tools with ${stackCompatibility} compatibility.`;
  explanation += ` ${fitReason}`;
  
  // Defensive dependencies check
  if (Array.isArray(solution.dependencies) && solution.dependencies.length > 0) {
    const deps = solution.dependencies.slice(0, 3).join(', ');
    explanation += ` Dependencies satisfied: ${deps}${solution.dependencies.length > 3 ? '...' : ''}`;
  }
  
  return explanation;
}

// Re-export all required functions explicitly (ES Module)