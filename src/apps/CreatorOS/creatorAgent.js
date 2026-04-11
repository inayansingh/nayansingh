// creatorAgent.js — All Gemini API functions for CreatorOS

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function callGemini(apiKey, systemPrompt, userPrompt) {
  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: { temperature: 0.85, maxOutputTokens: 2048 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function parseJSON(text) {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Could not parse AI response as JSON');
  }
}

// ─── 1. QUICK WIN ───────────────────────────────────────────────

export async function getQuickWin(creatorProfile, recentPosts, apiKey) {
  const system = `You are CreatorOS — an elite AI strategic partner for digital content creators. 
You think like a Chief Growth Officer. Be specific, data-driven, and direct.
Always return valid JSON.`;

  const user = `Based on this creator's profile and recent post performance, generate ONE specific action they should take today to maximize growth.

Creator: ${JSON.stringify(creatorProfile, null, 2)}
Recent posts performance (top 3): ${JSON.stringify(recentPosts.slice(0, 3), null, 2)}

Return JSON:
{
  "action": "specific action to take today (1-2 sentences)",
  "rationale": "data-backed reason why this will work (2-3 sentences)",
  "urgency": "NOW | TODAY | THIS WEEK",
  "expectedImpact": "specific predicted outcome",
  "category": "Content | Engagement | Growth | Monetization"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 2. CONTENT DNA ANALYSIS ────────────────────────────────────

export async function analyzeContentDNA(posts, apiKey) {
  const system = `You are CreatorOS Content Intelligence. Analyze content patterns to define a creator's unique style fingerprint.
Think like a brand strategist and content director combined. Return valid JSON only.`;

  const user = `Analyze these posts and define this creator's Content DNA — their unique style signature.

Posts: ${JSON.stringify(posts.map(p => ({
    topic: p.topic, hook: p.hook, type: p.type, platform: p.platform,
    engagementRate: p.engagementRate, sentimentScore: p.sentimentScore
  })), null, 2)}

Return JSON:
{
  "primaryTone": "e.g. Educational-Provocative",
  "narrativePatterns": ["pattern1", "pattern2", "pattern3"],
  "contentStrengths": ["strength1", "strength2"],
  "contentWeaknesses": ["weakness1", "weakness2"],
  "uniqueVoice": "2-3 sentence description of what makes this creator distinctive",
  "recommendedEvolution": "how the creator should evolve their content DNA in next 90 days"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 3. HOOK ANALYSIS ───────────────────────────────────────────

export async function analyzeHooks(hookClusters, apiKey) {
  const system = `You are CreatorOS Hook Strategist. You specialize in opening lines that stop the scroll.
Analyze performance data and give specific, actionable recommendations. Return valid JSON.`;

  const user = `Analyze this creator's hook performance by type. Identify what's working and what to double down on.

Hook clusters: ${JSON.stringify(hookClusters, null, 2)}

Return JSON:
{
  "topHookType": "the winning hook category name",
  "topHookReason": "why this type works for their audience (2 sentences)",
  "underperformingType": "the weakest hook category",
  "recommendation": "specific recommendation on hook strategy (2-3 sentences)",
  "nextHookTemplate": "A fill-in template for their best-performing hook style",
  "hookVariants": [
    "hook variant 1 example",
    "hook variant 2 example",
    "hook variant 3 example"
  ]
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 4. WHAT/WHEN/HOW RECOMMENDATION ───────────────────────────

export async function getRecommendation(creatorProfile, audience, trends, apiKey) {
  const system = `You are CreatorOS Strategy Engine. You generate hyper-specific content recommendations
combining audience data, trending topics, and creator strengths. Be extremely precise. Return valid JSON.`;

  const user = `Generate a single high-confidence content recommendation for this creator.

Creator niche: ${creatorProfile.niche}
Platform: ${creatorProfile.primaryPlatform}
Avg engagement: ${creatorProfile.avgEngagementRate}%
Top audience interests: ${JSON.stringify(audience.interests.slice(0, 3))}
Rising trends: ${JSON.stringify(trends.filter(t => t.lifecycleStage === 'emerging').slice(0, 3))}

Return JSON:
{
  "what": {
    "topic": "specific post topic",
    "format": "Reel | Carousel | Video | Thread | Post",
    "angle": "specific angle or framing"
  },
  "when": {
    "day": "e.g. Tuesday",
    "time": "e.g. 7:30 PM",
    "reasoning": "why this timing"
  },
  "how": {
    "tone": "e.g. Conversational-Educational",
    "hookStyle": "e.g. Controversial opening + data reveal",
    "cta": "specific CTA to use",
    "pacing": "fast-cut | slow-build | punchy"
  },
  "confidenceScore": 0-100,
  "expectedEngagement": "e.g. 8-12% based on similar content"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 5. NARRATIVE ARC BUILDER ───────────────────────────────────

export async function buildNarrativeArc(creatorProfile, goal, platform, apiKey) {
  const system = `You are CreatorOS Arc Architect. You build 30-day content narrative arcs for creators.
Think like a TV showrunner — every piece of content is part of a larger story. Return valid JSON.`;

  const user = `Build a 30-day content narrative arc for this creator.

Creator: ${creatorProfile.name}, Niche: ${creatorProfile.niche}
Goal: ${goal}
Primary Platform: ${platform}

Return JSON with 4 weeks:
{
  "arcTitle": "Theme name for this 30-day arc",
  "arcObjective": "what success looks like at day 30",
  "weeks": [
    {
      "week": 1,
      "theme": "Week theme",
      "narrative": "What story this week tells (2 sentences)",
      "posts": [
        { "day": "Mon/Wed/Fri", "topic": "specific topic", "format": "format type", "hook": "opening line idea" },
        { "day": "...", "topic": "...", "format": "...", "hook": "..." },
        { "day": "...", "topic": "...", "format": "...", "hook": "..." }
      ]
    },
    { "week": 2, ... },
    { "week": 3, ... },
    { "week": 4, ... }
  ]
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 6. CONFIDENCE-TO-POST SCORE ────────────────────────────────

export async function predictPostScore(concept, creatorProfile, recentPosts, apiKey) {
  const system = `You are CreatorOS Prediction Engine. You score content ideas before they're posted.
You combine creator history, audience psychology, and content principles. Return valid JSON.`;

  const user = `Score this content concept for predicted engagement potential.

Creator niche: ${creatorProfile.niche}
Primary platform: ${creatorProfile.primaryPlatform}
Creator avg engagement: ${creatorProfile.avgEngagementRate}%
Top 3 recent post engagement rates: ${recentPosts.slice(0, 3).map(p => p.engagementRate).join(', ')}%

Content concept to score:
"${concept}"

Return JSON:
{
  "score": 0-100,
  "grade": "A+ | A | B+ | B | C | D",
  "verdict": "1 sentence: will this work?",
  "risks": [
    "risk 1 that could hurt performance",
    "risk 2",
    "risk 3"
  ],
  "strengths": [
    "strength 1 in this concept",
    "strength 2"
  ],
  "improvements": [
    "specific improvement suggestion",
    "another improvement",
    "third option"
  ],
  "bestPlatform": "platform this would perform best on",
  "bestFormat": "recommended format"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 7. COMPETITOR ANALYSIS ─────────────────────────────────────

export async function analyzeCompetitors(competitors, creatorProfile, apiKey) {
  const system = `You are CreatorOS Competitive Intelligence. You identify opportunities by analyzing what competitors do.
Think like a strategist finding gaps and leverage points. Return valid JSON.`;

  const user = `Analyze these competitors and generate actionable intelligence for the creator.

Creator niche: ${creatorProfile.niche}
Creator platforms: ${creatorProfile.platforms.join(', ')}

Competitors: ${JSON.stringify(competitors.map(c => ({
    handle: c.handle, platform: c.platform, niche: c.niche,
    followers: c.followers, avgEngagementRate: c.avgEngagementRate,
    topContent: c.topContent, contentGaps: c.contentGaps
  })), null, 2)}

Return JSON:
{
  "weeklyWinner": "which competitor had the best week and why (1 sentence)",
  "biggestOpportunity": "the single biggest gap the creator should fill",
  "threatToWatch": "which competitor is growing fastest and poses a threat",
  "contentGaps": [
    { "topic": "gap topic", "evidence": "which competitor ignores this", "creatorAngle": "unique angle to own it" },
    { "topic": "...", "evidence": "...", "creatorAngle": "..." },
    { "topic": "...", "evidence": "...", "creatorAngle": "..." }
  ],
  "strategyInsight": "2-3 sentence strategic insight about the competitive landscape"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 8. CONTENT GENERATION (Multi-platform) ─────────────────────

export async function generateContent(idea, tone, niche, goal, apiKey) {
  const system = `You are CreatorOS Content Studio. You transform one raw idea into platform-optimized content.
Be specific, creative, and format-aware. Return valid JSON.`;

  const user = `Transform this idea into content for 5 platforms.

Idea: "${idea}"
Tone: ${tone}
Niche: ${niche}
Goal: ${goal}

Return JSON:
{
  "coreMessage": "distilled message in 1 sentence",
  "instagram": {
    "hook": "opening line",
    "caption": "full caption (150-200 chars)",
    "storyBeats": ["beat 1", "beat 2", "beat 3"],
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
  },
  "youtube": {
    "title": "SEO-optimized title",
    "hook": "first 15-second hook script",
    "description": "YouTube description (100 chars)",
    "tags": ["tag1", "tag2", "tag3"]
  },
  "tiktok": {
    "hook": "first 3-second spoken line",
    "scriptOutline": ["intro beat", "main point", "punchline/CTA"],
    "soundSuggestion": "describe ideal sound/audio style"
  },
  "linkedin": {
    "openingLine": "professional hook",
    "body": "professional adaptation (2-3 sentences)",
    "cta": "LinkedIn-appropriate CTA"
  },
  "twitter": {
    "tweet1": "hook tweet (under 280 chars)",
    "tweet2": "expansion",
    "tweet3": "key insight",
    "tweet4": "evidence or example",
    "tweet5": "CTA tweet"
  }
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 9. BRAND SAFETY ANALYSIS ───────────────────────────────────

export async function scoreBrandSafety(brandSafetyData, recentPosts, apiKey) {
  const system = `You are CreatorOS Brand Intelligence. You assess creator brand safety for sponsorships.
Think like a brand partnership director at a Fortune 500 company. Return valid JSON.`;

  const user = `Analyze this creator's brand safety profile and provide a sponsorship readiness assessment.

Brand safety data: ${JSON.stringify(brandSafetyData)}
Recent flagged posts: ${JSON.stringify(brandSafetyData.flaggedPosts)}

Return JSON:
{
  "overallAssessment": "2 sentence summary of brand safety standing",
  "immediateFixes": [
    "specific action to improve score",
    "another specific fix",
    "third action"
  ],
  "readyForCategories": ["category1", "category2", "category3"],
  "avoidCategories": ["category1", "category2"],
  "thirtyDayPlan": "what to do in 30 days to improve score significantly (3-4 sentences)",
  "projectedScore": "projected score after implementing fixes"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 10. CAPTION GENERATOR ──────────────────────────────────────

export async function generateCaptions(topic, tone, platform, niche, apiKey) {
  const system = `You are CreatorOS Caption Engine. Generate platform-native, high-converting captions.
Match the creator's voice: data-driven but conversational. Return valid JSON.`;

  const user = `Generate 3 caption variants for this post.

Topic: "${topic}"
Tone: ${tone}
Platform: ${platform}
Niche: ${niche}

Return JSON:
{
  "captions": [
    { "style": "Short & punchy", "text": "caption text", "charCount": 0 },
    { "style": "Story-driven", "text": "caption text", "charCount": 0 },
    { "style": "Educational hook", "text": "caption text", "charCount": 0 }
  ],
  "suggestedHashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6"],
  "bestCTA": "recommended CTA for this post"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 11. HOOK GENERATOR ─────────────────────────────────────────

export async function generateHooks(topic, hookStyle, platform, apiKey) {
  const system = `You are CreatorOS Hook Lab. Generate scroll-stopping opening lines.
Every hook must create immediate curiosity or tension. Return valid JSON.`;

  const user = `Generate 3 high-performing hook variants.

Topic: "${topic}"
Hook Style: ${hookStyle}
Platform: ${platform}

Return JSON:
{
  "hooks": [
    { "variant": "A", "text": "hook text", "mechanism": "what psychological trigger this uses" },
    { "variant": "B", "text": "hook text", "mechanism": "what psychological trigger this uses" },
    { "variant": "C", "text": "hook text", "mechanism": "what psychological trigger this uses" }
  ],
  "bestPick": "A | B | C",
  "reasoning": "why the best pick will outperform"
}`;

  const text = await callGemini(apiKey, system, user);
  return parseJSON(text);
}

// ─── 12. GROWTH COPILOT CHAT ────────────────────────────────────

export async function chat(messages, newMessage, creatorProfile, audience, recentPosts, personaMode, apiKey) {
  const contextSummary = `
Creator: ${creatorProfile.name}, Niche: ${creatorProfile.niche}
Followers: ${creatorProfile.totalFollowers.toLocaleString()}, Avg Engagement: ${creatorProfile.avgEngagementRate}%
Top audience persona: ${audience.personas[0]?.name}
Recent top performing post: "${recentPosts[0]?.hook}" (${recentPosts[0]?.engagementRate}% engagement)
Recent low performing post: "${recentPosts[recentPosts.length - 1]?.hook}" (${recentPosts[recentPosts.length - 1]?.engagementRate}% engagement)
`.trim();

  const toneInstructions = personaMode === 'creative'
    ? 'Be casual, energetic, and idea-focused. Use occasional emojis. Think like a creative director.'
    : 'Be precise, data-driven, and strategic. Reference specific metrics when answering. Think like a Chief Growth Officer.';

  const system = `You are CreatorOS Growth Copilot — an elite AI strategic partner for digital content creators.
You have deep context about this creator's performance. ${toneInstructions}

Creator Context:
${contextSummary}

Rules:
- Always give specific, actionable answers (never vague)
- Reference the creator's actual metrics when relevant
- Keep responses concise but complete (3-5 sentences usually perfect)
- If asked about content ideas, be very specific (topic, format, hook)`;

  const history = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents: [...history, { role: 'user', parts: [{ text: newMessage }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: 1024 },
    }),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
}
