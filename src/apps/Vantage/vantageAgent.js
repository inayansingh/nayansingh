// VANTAGE AI AGENT — Gemini API Wrapper + Master Talent Manager System Prompt

const VANTAGE_SYSTEM_PROMPT = `You are VANTAGE, a ruthlessly analytical AI Talent Manager and Brand Deal Strategist.
Your client is a digital influencer. Your singular mission is to protect their brand equity,
maximize their revenue, and identify predatory brand clauses before they sign.

BEHAVIORAL RULES:
- You NEVER give generic advice. All analysis is grounded in specific data from the
  influencer's metrics and the exact clause text provided.
- You communicate with the confidence and precision of a high-powered entertainment attorney
  combined with a Wall Street analyst. Concise. Direct. Data-backed.
- You NEVER recommend a deal without a Fit Score above 65. Below 65, you advise rejection
  and explain exactly why.
- When scanning contracts, you flag "Perpetuity," "Exclusivity," "Work for Hire,"
  "Usage Rights," "Non-Disparagement," and "Liquidated Damages" as HIGH risk by default.
- Your Negotiation Floor is always calculated before you recommend terms.
  You never leave money on the table.

OUTPUT FORMAT RULES — ALWAYS return valid parseable JSON, nothing else:
- Fit Score analysis → { "score": number, "verdict": "ACCEPT"|"NEGOTIATE"|"REJECT", "reasoning": string, "top_alignment_factors": string[] }
- Contract scan → { "clauses": [{ "risk_level": "CRITICAL"|"HIGH"|"MEDIUM"|"LOW", "clause_text": string, "plain_english": string, "recommended_action": string }] }
- Negotiation floor → { "base_rate": number, "engagement_factor": number, "niche_premium": number, "usage_surcharge": number, "total_recommended_rate": number, "negotiation_range": { "floor": number, "ceiling": number }, "rationale": string }`;

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function callGemini(userPrompt, apiKey) {
  if (!apiKey) throw new Error('Gemini API Key is required.');

  const response = await fetch(`${GEMINI_API_BASE}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: VANTAGE_SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData?.error?.message || 'Gemini API request failed.');
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  try {
    return JSON.parse(rawText);
  } catch {
    throw new Error('VANTAGE received a malformed response from the AI engine.');
  }
}

// MODULE A + B: Analyze deal fit score
export async function analyzeDeal(influencerMetrics, brandBrief, apiKey) {
  const prompt = `Analyze this brand deal for my influencer client.

INFLUENCER PROFILE:
- Platform: ${influencerMetrics.platform}
- Niche: ${influencerMetrics.niche}
- Followers: ${influencerMetrics.followers.toLocaleString()}
- Engagement Rate: ${influencerMetrics.engagementRate}%
- Top Keywords: ${influencerMetrics.keywords.join(', ')}

BRAND CAMPAIGN BRIEF:
${brandBrief}

Calculate a Fit Score 0–100 using this logic:
- Base compatibility between influencer niche and brand category: up to 40 points
- Audience sentiment and keyword alignment: up to 35 points
- Engagement rate vs industry benchmark (3% = average): up to 25 points

Return your full analysis as JSON.`;

  return callGemini(prompt, apiKey);
}

// MODULE C: Scan contract for red flags
export async function scanContract(contractText, apiKey) {
  const prompt = `Scan this influencer brand contract for dangerous or predatory clauses.

CONTRACT TEXT:
${contractText}

Identify every clause related to: "Perpetuity," "Exclusivity," "Work for Hire," "Usage Rights," "Non-Disparagement," "Liquidated Damages," "IP Assignment," "Morality Clause," "First Right of Refusal."

For each clause found, provide:
- risk_level: CRITICAL / HIGH / MEDIUM / LOW
- clause_text: the exact quoted text from the contract
- plain_english: what this actually means for the influencer in simple terms
- recommended_action: exactly what to do (strike, limit, negotiate, acceptable)

Return the full analysis as JSON.`;

  return callGemini(prompt, apiKey);
}

// MODULE D: Generate negotiation response email
export async function generateResponse(dealSummary, fitScore, rateFloor, apiKey) {
  const prompt = `Write a professional negotiation email on behalf of my influencer client.

DEAL CONTEXT:
${dealSummary}

Our AI Fit Score: ${fitScore}/100
Our calculated minimum rate: $${rateFloor.toLocaleString()}

Generate a firm but professional counter-proposal email that:
- Acknowledges the opportunity
- States our terms clearly
- Justifies our rate using engagement data
- Sets clear deliverables and usage limitations

Return as JSON: { "subject": string, "body": string, "key_terms": string[] }`;

  return callGemini(prompt, apiKey);
}
