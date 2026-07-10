/**
 * server/engine/intentExtractor.js
 * 
 * Production-ready Intent Extractor using Groq API.
 * Detects user intent from natural language queries for AI Nexus Pro.
 * 
 * Features:
 * - Groq Llama-3.3-70B-Versatile model
 * - Structured JSON output with intent, confidence, entities
 * - Robust error handling and fallback heuristics
 * - ES Modules compatible
 * - No uncaught exceptions
 * - Detailed logging for debugging
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Use node-fetch for compatibility (native fetch may need polyfill in some Node versions)
let fetch;
try {
  fetch = (await import('node-fetch')).default;
} catch {
  fetch = globalThis.fetch || require('node-fetch');
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

/**
 * Validates the input query.
 * @param {string} query - User input query
 * @returns {boolean} - Whether query is valid
 */
function validateQuery(query) {
  if (!query || typeof query !== 'string') {
    console.warn('[IntentExtractor] Invalid query type or empty query');
    return false;
  }
  const trimmed = query.trim();
  if (trimmed.length === 0 || trimmed.length > 2000) {
    console.warn('[IntentExtractor] Query too short or too long');
    return false;
  }
  return true;
}

/**
 * Heuristic fallback for intent detection when API fails.
 * Uses keyword matching for common intents.
 * @param {string} query - User query
 * @returns {object} - Structured intent result
 */
function heuristicIntentDetection(query) {
  const q = query.toLowerCase().trim();
  
  let intent = 'general';
  let confidence = 0.6;
  const entities = {};

  // Intent keywords mapping
  if (/(chat|talk|conversation|hello|hi|how are you)/.test(q)) {
    intent = 'chatbot';
    confidence = 0.85;
  } else if (/(automate|automation|script|task|schedule|workflow)/.test(q)) {
    intent = 'automation';
    confidence = 0.82;
    if (/(workflow|process)/.test(q)) entities.domain = 'workflow';
  } else if (/(agent|ai agent|autonomous|multi-step)/.test(q)) {
    intent = 'ai-agent';
    confidence = 0.88;
  } else if (/(support|help|customer|ticket|issue|complaint)/.test(q)) {
    intent = 'customer-support';
    confidence = 0.9;
    entities.priority = 'high';
  } else if (/(code|program|develop|debug|function|api)/.test(q)) {
    intent = 'coding';
    confidence = 0.87;
    if (/(python|js|javascript|react)/.test(q)) entities.language = 'programming';
  } else if (/(content|write|generate|blog|article|summary)/.test(q)) {
    intent = 'content-generation';
    confidence = 0.84;
  } else if (/(analyze|analytics|data|report|metric|dashboard)/.test(q)) {
    intent = 'analytics';
    confidence = 0.83;
  } else if (/(recommend|suggest|best|top|similar)/.test(q)) {
    intent = 'recommendation';
    confidence = 0.8;
  } else if (/(search|find|lookup|query|information)/.test(q)) {
    intent = 'search';
    confidence = 0.78;
  } else if (/(productivity|task|todo|manage|organize|calendar)/.test(q)) {
    intent = 'productivity';
    confidence = 0.81;
  }

  console.log(`[IntentExtractor] Fallback heuristic detected intent: ${intent} (confidence: ${confidence})`);
  
  return {
    intent,
    confidence,
    entities,
    rawQuery: query
  };
}

/**
 * Calls Groq API to extract intent using LLM.
 * @param {string} query - User query
 * @returns {Promise<object>} - Parsed intent result
 */
async function callGroqAPI(query) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error('[IntentExtractor] GROQ_API_KEY environment variable not set');
    throw new Error('Missing Groq API key');
  }

  const systemPrompt = `You are an expert intent classifier for an AI platform.
Analyze the user query and return ONLY valid JSON in this exact format (no extra text, no markdown):

{
  "intent": "one of: chatbot, automation, workflow, ai-agent, customer-support, coding, content-generation, analytics, recommendation, search, productivity, general",
  "confidence": number between 0.0 and 1.0,
  "entities": {
    "domain": "optional string",
    "priority": "optional string",
    "language": "optional string",
    "topic": "optional string"
  }
}

Be precise and objective.`;

  const userPrompt = `Query: "${query}"`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[IntentExtractor] Groq API error: ${response.status} ${errorText}`);
    throw new Error(`Groq API request failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('Empty response from Groq');
  }

  // Safe JSON parsing
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (parseError) {
    console.warn(`[IntentExtractor] Failed to parse JSON from Groq: ${content}`);
    throw new Error('Invalid JSON response from model');
  }

  // Validate structure
  if (!parsed.intent || typeof parsed.confidence !== 'number') {
    console.warn('[IntentExtractor] Invalid response structure from Groq');
    throw new Error('Invalid intent structure');
  }

  return {
    intent: parsed.intent.toLowerCase().trim(),
    confidence: Math.max(0.1, Math.min(1.0, parsed.confidence)),
    entities: parsed.entities || {},
    rawQuery: query
  };
}

/**
 * Main function to extract intent from user query.
 * Uses Groq API with heuristic fallback.
 * @param {string} query - The user's query
 * @returns {Promise<object>} - Intent extraction result
 */
export async function extractIntent(query) {
  console.log(`[IntentExtractor] Processing query: "${query}"`);

  // Validation
  if (!validateQuery(query)) {
    return {
      intent: 'general',
      confidence: 0.3,
      entities: {},
      rawQuery: query || ''
    };
  }

  const trimmedQuery = query.trim();

  try {
    const result = await callGroqAPI(trimmedQuery);
    console.log(`[IntentExtractor] Groq detected intent: ${result.intent} (confidence: ${result.confidence})`);
    return result;
  } catch (error) {
    console.error(`[IntentExtractor] Groq API failed: ${error.message}`);
    // Fallback to heuristic
    return heuristicIntentDetection(trimmedQuery);
  }
}