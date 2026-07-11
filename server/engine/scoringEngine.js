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
function computeIntentMatch(item, intent) {
  if (!item || !item.metadata || !intent) return 0.5; // safe fallback if metadata missing

  const fieldMap = [
    { intentField: 'projectType', metaField: 'projectTypes' },
    { intentField: 'domain', metaField: 'domains' },
    { intentField: 'complexity', metaField: 'complexity' },
    { intentField: 'budget', metaField: 'budget' },
    { intentField: 'teamSize', metaField: 'teamSize' },
    { intentField: 'deployment', metaField: 'deployment' },
    { intentField: 'security', metaField: 'securityLevel' },
  ];

  let applicableCount = 0;
  let matchCount = 0;

  for (const { intentField, metaField } of fieldMap) {
    const intentValue = intent[intentField];
    // Skip dimensions where intent didn't specify a real value
    if (!intentValue || intentValue === 'unspecified') continue;

    applicableCount++;
    const metaArray = Array.isArray(item.metadata[metaField]) ? item.metadata[metaField] : [];
    if (metaArray.map(v => String(v).toLowerCase()).includes(String(intentValue).toLowerCase())) {
      matchCount++;
    }
  }

  // If intent had no usable fields at all, fall back to neutral score
  if (applicableCount === 0) return 0.5;

  return matchCount / applicableCount; // 0 to 1, proportion of matched dimensions
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
      const normCost = cost > 0 ? Math.max(0, 1 - Math.min(cost / 50, 1)) : 0.5; // lower cost better
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
      const tagRelevance = intent?.entities?.category && item.tags && item.tags.some(t => 
        t.toLowerCase().includes(intent.entities.category.toLowerCase())) ? 0.9 : 0.4;

      finalScore = 
        ((item.category && intent?.intent ? 0.8 : 0.5) * toolW.categoryMatch || 0) +
        (tagRelevance * toolW.tagRelevance || 0) +
        (pricingNorm * toolW.purposeAlign || 0) + // reuse for alignment
        (0.6 * toolW.diversityBonus || 0);
      break;

    case 'stack':
      const stackW = normalizeWeights(weights.stack);
      const coverage = Array.isArray(item.tools) ? Math.min(item.tools.length / 5, 1) : 0;
      finalScore = 
        (intentMatch * stackW.roleMatch || 0) +
        (coverage * stackW.coverageScore || 0) +
        (0.6 * stackW.budgetFit || 0);
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
      finalScore = 
        (intentMatch * pW.categoryMatch || 0) +
        ((item.toolName && intent?.entities?.tool ? 0.85 : 0.5) * pW.toolAlign || 0);
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