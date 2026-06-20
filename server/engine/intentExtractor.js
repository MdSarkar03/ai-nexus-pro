// server/engine/intentExtractor.js
import fetch from "node-fetch";

/**
 * Extracts intent from user query using AI (preserving original logic)
 * @param {string} query - User input query
 * @returns {Promise<Object>} Intent object
 */
export async function extractIntent(query) {
  if (!query || typeof query !== 'string') {
    return { intent: 'unknown', confidence: 0, entities: {} };
  }

  try {
    // Example: Call to an LLM API for intent extraction (original logic preserved)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an intent extractor. Return JSON with: intent, confidence (0-1), entities."
          },
          {
            role: "user",
            content: `Extract intent from: "${query}"`
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';
    
    let intentData;
    try {
      intentData = JSON.parse(content);
    } catch (e) {
      intentData = { intent: 'unknown', confidence: 0.5, entities: {} };
    }

    return {
      intent: intentData.intent || 'unknown',
      confidence: intentData.confidence || 0.6,
      entities: intentData.entities || {},
      rawQuery: query
    };

  } catch (error) {
    console.error('Intent extraction error:', error);
    // Fallback logic
    return {
      intent: query.toLowerCase().includes('cost') ? 'pricing' : 'general',
      confidence: 0.4,
      entities: {},
      rawQuery: query
    };
  }
}