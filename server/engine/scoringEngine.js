// server/engine/scoringEngine.js
// Regenerated with proper Weighted MCDM logic to fix unbounded scores (>100% bug)
// Uses weights.js + normalizers.js; guarantees 0-100 output mathematically

import * as weights from './weights.js';
import * as normalizers from './normalizers.js';

// Helper: Normalize weights to sum to 1.0 defensively
function normalizeWeights(weightSet) {
  if (!weightSet || typeof weightSet !== 'object') return {};
  const total = Object.values(weightSet).reduce((sum, w) => sum + (w || 0), 0);
  if (total <= 0) return Object.keys(weightSet).reduce((acc, k) => { acc[k] = 1 / Object.keys(weightSet).length; return acc; }, {});
  return Object.keys(weightSet).reduce((acc, k) => {
    acc[k] = (weightSet[k] || 0) / total;
    return acc;
  }, {});
}

// New metadata-based intent matching (Stage 2)
// Weighted: domain + projectType matter most for relevance. A tool that's generically
// "Enterprise/Complex/High-budget/High-security" but in the WRONG domain (e.g. a legal
// assistant showing up for a fintech query) must not be able to outscore a tool that
// actually serves the right domain just by matching the secondary dimensions.
function computeIntentMatch(item, intent) {
  if (!item || !item.metadata || !intent) return 0.5; // safe fallback if metadata missing

  const fieldMap = [
    { intentField: 'domain', metaField: 'domains', weight: 2 },
    { intentField: 'projectType', metaField: 'projectTypes', weight: 2 },
    { intentField: 'complexity', metaField: 'complexity', weight: 1 },
    { intentField: 'budget', metaField: 'budget', weight: 1 },
    { intentField: 'teamSize', metaField: 'teamSize', weight: 1 },
    { intentField: 'deployment', metaField: 'deployment', weight: 1 },
    { intentField: 'security', metaField: 'securityLevel', weight: 1 },
  ];

  let applicableWeight = 0;
  let matchedWeight = 0;

  for (const { intentField, metaField, weight } of fieldMap) {
    const intentValue = intent[intentField];
    // Skip dimensions where intent didn't specify a real value
    if (!intentValue || intentValue === 'unspecified') continue;

    applicableWeight += weight;
    const metaArray = Array.isArray(item.metadata[metaField]) ? item.metadata[metaField] : [];
    const metaLower = metaArray.map(v => String(v).toLowerCase());
    const intentLower = String(intentValue).toLowerCase();

    if (metaLower.includes(intentLower)) {
      matchedWeight += weight;
    } else if (intentField === 'domain' && metaLower.includes('general')) {
      // "General" tools aren't domain-specialized but still usable — partial credit only,
      // so they can't beat a tool that actually lists the requested domain.
      matchedWeight += weight * 0.4;
    }
  }

  // If intent had no usable fields at all, fall back to neutral score
  if (applicableWeight === 0) return 0.5;

  return matchedWeight / applicableWeight; // 0 to 1, weighted proportion matched
}

// Generic weighted scorer
function weightedScore(item, intent, entityType) {
  if (!item) return 0;
  const w = normalizeWeights(weights[entityType] || {});
  let finalScore = 0;

  // Intent-based matching (0-1) - now uses real metadata fields
  const intentMatch = computeIntentMatch(item, intent);

  switch (entityType) {
    case 'model':
      const modelW = normalizeWeights(weights.model);
      const cost = normalizers.normalizeCost(item.costPer1MInput || item.costPer1MOutput || 0);
      // Free (cost === 0) must score highest (1.0), not neutral. Paid cost scales down from there.
      const normCost = cost === 0 ? 1 : Math.max(0, 1 - Math.min(cost / 50, 1));
      const perf = (item.scores?.mmlu || item.scores?.reasoning || 0) / 100 || 0.6;

      finalScore = 
        (intentMatch * modelW.intentMatch || 0) +
        (normCost * modelW.costFit || 0) +
        (perf * modelW.benchmarkFit || 0) +
        (0.7 * modelW.speedFit || 0) + // placeholder for speed/context
        (0.8 * modelW.simplicityFit || 0);
      break;

    case 'tool':
      const toolW = normalizeWeights(weights.tool);
      const pricingNorm = item.pricing === 'Free' ? 1 : item.pricing === 'Freemium' ? 0.7 : 0.3;

      // Real intent signals (old intent?.entities?.category / intent?.intent never existed in this shape)
      const toolIntentSignals = [intent?.domain, intent?.aiTask, intent?.projectType]
        .filter(v => v && v !== 'unspecified')
        .map(v => String(v).toLowerCase());
      const tagRelevance = (toolIntentSignals.length > 0 && Array.isArray(item.tags))
        ? (item.tags.some(t => toolIntentSignals.some(sig => t.toLowerCase().includes(sig))) ? 0.9 : 0.4)
        : 0.5;

      finalScore = 
        (intentMatch * toolW.categoryMatch || 0) + // real metadata-based match, not dead field
        (tagRelevance * toolW.tagRelevance || 0) +
        (pricingNorm * toolW.purposeAlign || 0) + // reuse for alignment
        (0.6 * toolW.diversityBonus || 0);
      break;

    case 'stack':
      const stackW = normalizeWeights(weights.stack);

      // coverageScore used to be Math.min(item.tools.length / 5, 1) — but every stack in
      // this dataset has exactly 6 tools, so that always evaluated to a flat 1.0 for every
      // single stack. It contributed 30% of the score with zero actual differentiation.
      // That's the root of the "Enterprise SaaS Stack keeps winning" bias: several stacks
      // share generic "Enterprise / High budget / Large team" metadata (Enterprise SaaS,
      // Cybersecurity Platform, Data Engineering Pipeline, DevOps & Cloud Platform all
      // qualify), so roleMatch alone couldn't reliably separate them and ties kept
      // resolving toward the same one or two stacks regardless of the actual technical ask.
      //
      // Real fix: check whether the stack's own tags / tool names actually relate to the
      // query (e.g. "kubernetes", "SIEM", "mlflow", "pytorch" appearing in the raw query
      // should favor DevOps/Cybersecurity/ML stacks over a generic Enterprise SaaS pick),
      // plus alignment with detected domain/projectType/aiTask.
      const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      const rawQueryNorm = norm(intent?.rawQuery);
      const rawQueryWords = new Set(rawQueryNorm.split(' ').filter(Boolean));
      const stackKeywordSignals = [intent?.domain, intent?.projectType, intent?.aiTask]
        .filter(v => v && v !== 'unspecified')
        .map(v => norm(v));
      const stackTagsNorm = Array.isArray(item.tags) ? item.tags.map(norm) : [];
      const stackToolNamesNorm = Array.isArray(item.tools)
        ? item.tools.map(t => norm(t.toolName)).filter(Boolean)
        : [];

      // Whole-word matching only — a raw "includes" check let short tags like "ai" match
      // inside unrelated words (e.g. "ai" inside "container"), producing false positives.
      const allWordsPresent = (phrase) => {
        const words = phrase.split(' ').filter(Boolean);
        return words.length > 0 && words.every(w => rawQueryWords.has(w));
      };

      let relevanceHits = 0;
      for (const tag of stackTagsNorm) {
        if (!tag) continue;
        if (stackKeywordSignals.some(sig => tag.includes(sig) || sig.includes(tag))) relevanceHits++;
        else if (allWordsPresent(tag)) relevanceHits++;
      }
      for (const toolName of stackToolNamesNorm) {
        if (toolName.length > 2 && allWordsPresent(toolName)) relevanceHits++;
      }
      const coverage = Math.min(relevanceHits / 3, 1); // 3+ concrete matches = fully relevant

      // Real budget check (was hardcoded 0.6, never looked at intent.budget or metadata.budget)
      let budgetFit = 0.6; // neutral default when user didn't specify a budget
      if (intent?.budget && intent.budget !== 'unspecified') {
        const budgetArr = Array.isArray(item.metadata?.budget) ? item.metadata.budget : [];
        const matches = budgetArr.map(b => String(b).toLowerCase()).includes(String(intent.budget).toLowerCase());
        budgetFit = matches ? 1 : 0.2;
      }

      finalScore = 
        (intentMatch * stackW.roleMatch || 0) +
        (coverage * stackW.coverageScore || 0) +
        (budgetFit * stackW.budgetFit || 0);
      break;

    case 'workflow':
      const wfW = normalizeWeights(weights.workflow);
      const stepNorm = Array.isArray(item.steps) ? Math.min(item.steps.length / 10, 1) : 0.4;
      finalScore = 
        (intentMatch * wfW.goalSimilarity || 0) +
        (stepNorm * wfW.stepCount || 0) +
        (0.7 * wfW.toolOverlap || 0);
      break;

    case 'prompt':
      const pW = normalizeWeights(weights.prompt);

      // Real intent signals (old intent?.entities?.tool never existed in this shape)
      const promptIntentSignals = [intent?.domain, intent?.aiTask, intent?.projectType]
        .filter(v => v && v !== 'unspecified')
        .map(v => String(v).toLowerCase());
      const toolAlign = (promptIntentSignals.length > 0 && Array.isArray(item.tags))
        ? (item.tags.some(t => promptIntentSignals.some(sig => t.toLowerCase().includes(sig))) ? 0.85 : 0.4)
        : 0.5;

      finalScore = 
        (intentMatch * pW.categoryMatch || 0) +
        (toolAlign * pW.toolAlign || 0);
      break;

    default:
      finalScore = intentMatch;
  }

  // Guaranteed 0-1 range due to normalized inputs + weights summing to 1
  const bounded = Math.max(0, Math.min(1, finalScore));
  return Math.round(bounded * 100);
}

// Exported functions - exact signatures preserved
export function scoreModel(model, intent = {}) {
  return weightedScore(model, intent, 'model');
}

export function scoreTool(tool, intent = {}) {
  return weightedScore(tool, intent, 'tool');
}

export function scoreStack(stack, intent = {}) {
  return weightedScore(stack, intent, 'stack');
}

export function scoreWorkflow(workflow, intent = {}) {
  return weightedScore(workflow, intent, 'workflow');
}

export function scorePrompt(prompt, intent = {}) {
  return weightedScore(prompt, intent, 'prompt');
}

export function pickTop(items, limit = 5) {
  if (!Array.isArray(items)) return [];
  return [...items]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, limit);
}

export function computeConfidence(scores) {
  if (!scores) return 50;
  const arr = Array.isArray(scores) ? scores : [scores];
  const validScores = arr.filter(s => typeof s === 'number' && !isNaN(s));
  if (validScores.length === 0) return 50;
  const avg = validScores.reduce((sum, s) => sum + s, 0) / validScores.length;
  // Defensive: average already 0-100 + small jitter capped
  return Math.min(100, Math.max(0, Math.round(avg * 0.95 + (Math.random() * 4 - 2))));
}