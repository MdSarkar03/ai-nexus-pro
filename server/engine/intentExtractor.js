/**
 * server/engine/intentExtractor.js
 * 
 * Production-ready Intent Extractor using Groq API.
 * Extracts structured project-decision intent from natural language queries for AI Nexus Pro.
 * 
 * Output shape (consumed by scoringEngine.js's computeIntentMatch, matched against
 * each entity's metadata.projectTypes/domains/complexity/budget/teamSize/deployment/securityLevel):
 * 
 * {
 *   projectType, domain, frontend, backend, database, deployment,
 *   budget, scalability, security, complexity, aiTask, teamSize, rawQuery
 * }
 * 
 * Features:
 * - Groq Llama-3.3-70B-Versatile model
 * - Structured JSON-only output
 * - Robust error handling and keyword-based fallback
 * - ES Modules compatible
 * - No uncaught exceptions
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let fetch;
try {
  fetch = (await import('node-fetch')).default;
} catch {
  fetch = globalThis.fetch || require('node-fetch');
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

const DEFAULT_INTENT = {
  projectType: 'unspecified',
  domain: 'unspecified',
  frontend: 'unspecified',
  backend: 'unspecified',
  database: 'unspecified',
  deployment: 'unspecified',
  budget: 'unspecified',
  scalability: 'unspecified',
  security: 'unspecified',
  complexity: 'unspecified',
  aiTask: 'unspecified',
  teamSize: 'unspecified',
  rawQuery: ''
};

/**
 * Validates the input query.
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
 * Keyword-based fallback intent detection when the Groq API is unavailable
 * or returns malformed output. Best-effort only — always fills every field.
 */
function heuristicIntentDetection(query) {
  const q = query.toLowerCase();
  const result = { ...DEFAULT_INTENT, rawQuery: query };

  // projectType
  if (/(saas|software as a service)/.test(q)) result.projectType = 'SaaS';
  else if (/(mobile app|android|ios|flutter|react native)/.test(q)) result.projectType = 'Mobile App';
  else if (/(chatbot|chat bot|conversational)/.test(q)) result.projectType = 'Chatbot';
  else if (/(api|microservice)/.test(q)) result.projectType = 'API Service';
  else if (/(mvp|minimum viable product|startup idea)/.test(q)) result.projectType = 'MVP';
  else if (/(e-commerce|ecommerce|online store|marketplace)/.test(q)) result.projectType = 'E-commerce';
  else if (/(internal tool|admin panel|dashboard for)/.test(q)) result.projectType = 'Internal Tool';
  else if (/(data pipeline|etl|analytics platform)/.test(q)) result.projectType = 'Data Pipeline';

  // domain
  if (/(health|medical|patient|doctor|clinical|hipaa)/.test(q)) result.domain = 'Healthcare';
  else if (/(finance|banking|payment|fintech)/.test(q)) result.domain = 'Finance';
  else if (/(e-commerce|ecommerce|retail|shop)/.test(q)) result.domain = 'E-commerce';
  else if (/(education|student|learning|university)/.test(q)) result.domain = 'Education';
  else if (/(security|cyber|threat|siem)/.test(q)) result.domain = 'Cybersecurity';
  else if (/(enterprise|corporate|internal)/.test(q)) result.domain = 'Enterprise';
  else result.domain = 'General';

  // security — inferred from domain sensitivity or explicit mention
  if (/(hipaa|gdpr|pci|compliance|encrypt|sensitive data|secure(ly)?)/.test(q) || result.domain === 'Healthcare' || result.domain === 'Finance') {
    result.security = 'High';
  } else {
    result.security = 'Standard';
  }

  // budget
  if (/(free|no budget|zero cost)/.test(q)) result.budget = 'Free';
  else if (/(low budget|cheap|affordable|budget[- ]friendly)/.test(q)) result.budget = 'Low';
  else if (/(medium budget|moderate budget)/.test(q)) result.budget = 'Medium';
  else if (/(enterprise budget|high budget|well[- ]funded|large budget)/.test(q)) result.budget = 'High';

  // teamSize
  if (/(solo|just me|one developer|by myself)/.test(q)) result.teamSize = 'Solo';
  else if (/(small team|\b[2-5]\s*(developers|people|members)\b)/.test(q)) result.teamSize = 'Small';
  else if (/(medium team|\b[6-9]\s*(developers|people|members)\b)/.test(q)) result.teamSize = 'Medium';
  else if (/(large team|enterprise team|dozens of|many developers)/.test(q)) result.teamSize = 'Large';

  // deployment
  if (/(on[- ]prem|on premise|self[- ]hosted)/.test(q)) result.deployment = 'On-Prem';
  else if (/(serverless)/.test(q)) result.deployment = 'Serverless';
  else if (/(hybrid)/.test(q)) result.deployment = 'Hybrid';
  else if (/(cloud|aws|azure|gcp|deploy)/.test(q)) result.deployment = 'Cloud';

  // complexity — rough heuristic from query length/detail
  const wordCount = q.split(/\s+/).length;
  if (wordCount > 60) result.complexity = 'Complex';
  else if (wordCount > 25) result.complexity = 'Moderate';
  else result.complexity = 'Simple';

  // scalability
  if (/(millions of users|massive scale|high traffic|thousands of concurrent)/.test(q)) result.scalability = 'High';
  else if (/(hundreds of users|moderate scale|\d{2,3}\s*concurrent)/.test(q)) result.scalability = 'Medium';
  else result.scalability = 'Low';

  // aiTask
  if (/(summar|summary)/.test(q)) result.aiTask = 'Summarization';
  else if (/(classif)/.test(q)) result.aiTask = 'Classification';
  else if (/(generat|writing|content creation)/.test(q)) result.aiTask = 'Generation';
  else if (/(recommend)/.test(q)) result.aiTask = 'Recommendation';
  else if (/(vision|image)/.test(q)) result.aiTask = 'Vision';
  else if (/(chat|conversation)/.test(q)) result.aiTask = 'Conversational';

  // frontend / backend / database — explicit tech mentions only
  if (/react/.test(q)) result.frontend = 'React';
  else if (/vue/.test(q)) result.frontend = 'Vue';
  else if (/angular/.test(q)) result.frontend = 'Angular';
  else if (/flutter/.test(q)) result.frontend = 'Flutter';

  if (/node\.?js/.test(q)) result.backend = 'Node.js';
  else if (/fastapi|python/.test(q)) result.backend = 'Python/FastAPI';
  else if (/\.net|c#/.test(q)) result.backend = '.NET';
  else if (/django/.test(q)) result.backend = 'Django';

  if (/mongodb/.test(q)) result.database = 'MongoDB';
  else if (/postgres/.test(q)) result.database = 'PostgreSQL';
  else if (/mysql/.test(q)) result.database = 'MySQL';

  console.log(`[IntentExtractor] Fallback heuristic result:`, result);
  return result;
}

/**
 * Calls Groq API to extract structured project intent using an LLM.
 */
async function callGroqAPI(query) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('[IntentExtractor] GROQ_API_KEY environment variable not set');
    throw new Error('Missing Groq API key');
  }

  const systemPrompt = `You are an expert requirement analyst for a software project decision engine.
Analyze the user's project description and extract structured requirements.
Return ONLY valid JSON in exactly this format (no extra text, no markdown fences):

{
  "projectType": "one of: SaaS, Mobile App, MVP, Enterprise Software, Internal Tool, E-commerce, Marketplace, Chatbot, API Service, Data Pipeline, AI Product, Web App, unspecified",
  "domain": "one of: Healthcare, Finance, E-commerce, Education, Enterprise, Cybersecurity, Government, Retail, Technology, Research, General, unspecified",
  "frontend": "specific frontend technology mentioned, or unspecified",
  "backend": "specific backend technology mentioned, or unspecified",
  "database": "specific database technology mentioned, or unspecified",
  "deployment": "one of: Cloud, On-Prem, Serverless, Hybrid, Any, unspecified",
  "budget": "one of: Free, Low, Medium, High, unspecified",
  "scalability": "one of: Low, Medium, High, unspecified",
  "security": "one of: Standard, High, unspecified",
  "complexity": "one of: Simple, Moderate, Complex, unspecified",
  "aiTask": "one of: Summarization, Classification, Generation, Recommendation, Vision, Conversational, unspecified",
  "teamSize": "one of: Solo, Small, Medium, Large, unspecified"
}

Infer security as High for any query mentioning healthcare, finance, government, or explicit compliance/sensitive-data requirements.
If a field is not mentioned or cannot be reasonably inferred, use "unspecified".
Be precise and do not guess wildly — only infer what is reasonably supported by the query text.`;

  const userPrompt = `Project description: "${query}"`;

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

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (parseError) {
    console.warn(`[IntentExtractor] Failed to parse JSON from Groq: ${content}`);
    throw new Error('Invalid JSON response from model');
  }

  // Merge parsed result over defaults so any missing field is never undefined
  const merged = { ...DEFAULT_INTENT, rawQuery: query };
  for (const key of Object.keys(DEFAULT_INTENT)) {
    if (key === 'rawQuery') continue;
    if (parsed[key] && typeof parsed[key] === 'string' && parsed[key].trim().length > 0) {
      merged[key] = parsed[key].trim();
    }
  }

  return merged;
}

/**
 * Main function to extract structured project intent from a user query.
 * Uses Groq API with keyword-based fallback on any failure.
 * @param {string} query - The user's project description
 * @returns {Promise<object>} - Structured intent object (see DEFAULT_INTENT shape)
 */
export async function extractIntent(query) {
  console.log(`[IntentExtractor] Processing query: "${query}"`);

  if (!validateQuery(query)) {
    return { ...DEFAULT_INTENT, rawQuery: query || '' };
  }

  const trimmedQuery = query.trim();

  try {
    const result = await callGroqAPI(trimmedQuery);
    console.log('[IntentExtractor] Groq extraction result:', result);
    return result;
  } catch (error) {
    console.error(`[IntentExtractor] Groq API failed: ${error.message}`);
    return heuristicIntentDetection(trimmedQuery);
  }
}