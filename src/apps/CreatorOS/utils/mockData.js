// ============================================================
//  CreatorOS — Rich Mock Dataset
//  Simulates a personal brand creator: Tech + Productivity niche
//  Primary platforms: Instagram, YouTube, TikTok, LinkedIn, X
// ============================================================

export const CREATOR_PROFILE = {
  name:        'Alex Rivera',
  handle:      '@alex.creates',
  niche:       'Tech & Productivity',
  bio:         'Helping 250K creators work smarter with tech, tools & systems.',
  totalFollowers: 248700,
  followersGrowthRate: 3.2,  // % last 30 days
  primaryPlatform: 'Instagram',
  platforms: ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter/X'],
  avgEngagementRate: 4.8,
  contentScore: 73,
  bestPlatform: 'Instagram',
  joinedCreating: '2022-03-01',
};

// ─── POSTS (30 items across 5 platforms) ──────────────────────────

export const POSTS = [
  // INSTAGRAM
  {
    id: 'p1', platform: 'Instagram', type: 'reel',
    topic: 'AI Tools',
    hook: 'You\'re doing your morning routine wrong — here\'s what 1% of creators do instead',
    caption: '5 AI tools that replaced my entire production team. Save this before it gets buried. #aitools #creatorhacks',
    postedAt: '2026-04-08T19:00:00Z',
    likes: 18400, comments: 892, shares: 3200, saves: 5600, watchTime: 87,
    engagementRate: 11.3, sentimentScore: 0.82, fakeEngagementFlag: false,
    topComments: [
      { text: 'This changed how I work completely!', sentiment: 'joy', intent: 'appreciation' },
      { text: 'Which tool is #3? Need that now', sentiment: 'excitement', intent: 'question' },
      { text: 'Already using 2 of these, rest are new to me', sentiment: 'positive', intent: 'share' },
    ],
  },
  {
    id: 'p2', platform: 'Instagram', type: 'carousel',
    topic: 'Productivity Systems',
    hook: 'The 5AM routine nobody talks about',
    caption: 'Swipe to see the system that doubled my output in 30 days.',
    postedAt: '2026-04-05T08:00:00Z',
    likes: 9200, comments: 340, shares: 1100, saves: 4800, watchTime: null,
    engagementRate: 6.2, sentimentScore: 0.71, fakeEngagementFlag: false,
    topComments: [
      { text: 'Slide 4 hit different', sentiment: 'excitement', intent: 'appreciation' },
      { text: 'Saved this immediately', sentiment: 'positive', intent: 'save' },
    ],
  },
  {
    id: 'p3', platform: 'Instagram', type: 'reel',
    topic: 'Controversial Take',
    hook: 'Hot take: Notion is actually making you less productive',
    caption: 'Hear me out... #notion #productivity',
    postedAt: '2026-04-01T17:30:00Z',
    likes: 22100, comments: 1840, shares: 4100, saves: 2200, watchTime: 91,
    engagementRate: 12.1, sentimentScore: 0.31, fakeEngagementFlag: false,
    topComments: [
      { text: 'FINALLY someone said it', sentiment: 'excitement', intent: 'agreement' },
      { text: 'Disagree entirely — Notion saved my business', sentiment: 'frustration', intent: 'debate' },
      { text: 'Curious what your alternative is?', sentiment: 'neutral', intent: 'question' },
    ],
  },
  {
    id: 'p4', platform: 'Instagram', type: 'post',
    topic: 'Personal Story',
    hook: 'I almost quit creating last year',
    caption: 'Today marks 2 years. Here\'s what I learned.',
    postedAt: '2026-03-28T12:00:00Z',
    likes: 14300, comments: 620, shares: 890, saves: 1800, watchTime: null,
    engagementRate: 7.0, sentimentScore: 0.77, fakeEngagementFlag: false,
    topComments: [
      { text: 'Thank you for being real', sentiment: 'joy', intent: 'connection' },
      { text: 'I needed to read this today', sentiment: 'joy', intent: 'appreciation' },
    ],
  },
  {
    id: 'p5', platform: 'Instagram', type: 'reel',
    topic: 'Tech Review',
    hook: 'New gadget dropped — worth it or overhyped?',
    caption: 'Honest review after 2 weeks of daily use.',
    postedAt: '2026-03-22T16:00:00Z',
    likes: 6700, comments: 210, shares: 380, saves: 920, watchTime: 74,
    engagementRate: 3.3, sentimentScore: 0.55, fakeEngagementFlag: false,
    topComments: [
      { text: 'Good review but too short', sentiment: 'neutral', intent: 'feedback' },
      { text: 'Already ordered mine!', sentiment: 'excitement', intent: 'action' },
    ],
  },
  {
    id: 'p6', platform: 'Instagram', type: 'story',
    topic: 'Behind the Scenes',
    hook: 'My content creation setup revealed',
    caption: null,
    postedAt: '2026-03-18T10:00:00Z',
    likes: 3800, comments: 95, shares: 140, saves: 360, watchTime: null,
    engagementRate: 1.8, sentimentScore: 0.62, fakeEngagementFlag: false,
    topComments: [],
  },

  // YOUTUBE
  {
    id: 'p7', platform: 'YouTube', type: 'video',
    topic: 'AI Tools',
    hook: 'I tested every AI video tool so you don\'t have to (60-day results)',
    caption: 'Comprehensive breakdown of every major AI video tool in 2026.',
    postedAt: '2026-04-06T15:00:00Z',
    likes: 4800, comments: 387, shares: 920, saves: 0, watchTime: 68,
    engagementRate: 8.4, sentimentScore: 0.78, fakeEngagementFlag: false,
    topComments: [
      { text: 'Best breakdown I\'ve seen all year', sentiment: 'joy', intent: 'appreciation' },
      { text: 'Timestamp for the pricing comparison?', sentiment: 'neutral', intent: 'question' },
    ],
  },
  {
    id: 'p8', platform: 'YouTube', type: 'video',
    topic: 'Productivity Systems',
    hook: 'Building a second brain in 2026 — the updated system',
    caption: 'Full walkthrough of the system that helps me create 30 pieces of content a month.',
    postedAt: '2026-03-30T14:00:00Z',
    likes: 3200, comments: 241, shares: 680, saves: 0, watchTime: 72,
    engagementRate: 6.1, sentimentScore: 0.74, fakeEngagementFlag: false,
    topComments: [
      { text: 'Can you share a template?', sentiment: 'positive', intent: 'question' },
    ],
  },
  {
    id: 'p9', platform: 'YouTube', type: 'short',
    topic: 'Quick Tips',
    hook: '60-second hack to make your content go viral',
    caption: '#shorts #viral #contenttips',
    postedAt: '2026-03-25T11:00:00Z',
    likes: 9800, comments: 512, shares: 2100, saves: 0, watchTime: 83,
    engagementRate: 9.2, sentimentScore: 0.69, fakeEngagementFlag: false,
    topComments: [],
  },
  {
    id: 'p10', platform: 'YouTube', type: 'video',
    topic: 'Creator Economy',
    hook: 'How I made $0 for 18 months then hit $10K/month',
    caption: 'Full breakdown of my monetization journey.',
    postedAt: '2026-03-15T16:00:00Z',
    likes: 7200, comments: 894, shares: 1800, saves: 0, watchTime: 81,
    engagementRate: 11.2, sentimentScore: 0.83, fakeEngagementFlag: false,
    topComments: [
      { text: 'The part about brand deals was eye-opening', sentiment: 'excitement', intent: 'specific' },
      { text: 'Did you use any courses or was this organic?', sentiment: 'neutral', intent: 'question' },
    ],
  },

  // TIKTOK
  {
    id: 'p11', platform: 'TikTok', type: 'video',
    topic: 'AI Tools',
    hook: 'POV: You discover these 3 AI tools and never edit manually again',
    caption: '#aitools #creator #productivity #foryou',
    postedAt: '2026-04-09T20:00:00Z',
    likes: 31400, comments: 1820, shares: 8200, saves: 4300, watchTime: 94,
    engagementRate: 18.3, sentimentScore: 0.76, fakeEngagementFlag: false,
    topComments: [
      { text: 'Tool 2 is INSANE I downloaded it immediately', sentiment: 'excitement', intent: 'action' },
      { text: 'Name of the first one???', sentiment: 'neutral', intent: 'question' },
    ],
  },
  {
    id: 'p12', platform: 'TikTok', type: 'video',
    topic: 'Controversial Take',
    hook: 'Unpopular opinion: you don\'t need consistency to grow',
    caption: 'Ratio me. #growth #contentcreator',
    postedAt: '2026-04-03T21:00:00Z',
    likes: 42100, comments: 3400, shares: 9800, saves: 2100, watchTime: 96,
    engagementRate: 23.1, sentimentScore: 0.24, fakeEngagementFlag: false,
    topComments: [
      { text: 'The comment section is WILD', sentiment: 'excitement', intent: 'meta' },
      { text: 'Everything you said is wrong but I can\'t look away', sentiment: 'frustration', intent: 'debate' },
    ],
  },
  {
    id: 'p13', platform: 'TikTok', type: 'video',
    topic: 'Quick Tips',
    hook: 'If you edit videos, watch this',
    caption: '#editing #creators #tips',
    postedAt: '2026-03-27T19:00:00Z',
    likes: 8400, comments: 340, shares: 1200, saves: 890, watchTime: 78,
    engagementRate: 5.8, sentimentScore: 0.66, fakeEngagementFlag: true,
    topComments: [],
  },
  {
    id: 'p14', platform: 'TikTok', type: 'video',
    topic: 'Storytelling',
    hook: 'Story time: how I got 100K followers in 90 days',
    caption: 'Not clickbait — full honest story #growth',
    postedAt: '2026-03-20T18:00:00Z',
    likes: 19800, comments: 1240, shares: 4400, saves: 3100, watchTime: 89,
    engagementRate: 14.7, sentimentScore: 0.81, fakeEngagementFlag: false,
    topComments: [
      { text: 'The part about posting consistency was key', sentiment: 'positive', intent: 'specific' },
    ],
  },

  // LINKEDIN
  {
    id: 'p15', platform: 'LinkedIn', type: 'post',
    topic: 'Creator Economy',
    hook: 'I turned my 9-5 skills into a $150K content business. Here\'s the blueprint:',
    caption: '6 steps anyone can follow. Save this and come back in 90 days.',
    postedAt: '2026-04-07T09:00:00Z',
    likes: 2840, comments: 187, shares: 940, saves: 0, watchTime: null,
    engagementRate: 9.1, sentimentScore: 0.84, fakeEngagementFlag: false,
    topComments: [
      { text: 'Step 3 is underrated. Most people skip it.', sentiment: 'positive', intent: 'specific' },
      { text: 'Would love a more detailed breakdown of step 5', sentiment: 'neutral', intent: 'question' },
    ],
  },
  {
    id: 'p16', platform: 'LinkedIn', type: 'post',
    topic: 'Leadership',
    hook: 'The #1 productivity mistake every creator makes (and I did for 2 years):',
    caption: 'Thread on how output ≠ progress.',
    postedAt: '2026-03-31T08:30:00Z',
    likes: 1900, comments: 124, shares: 480, saves: 0, watchTime: null,
    engagementRate: 6.4, sentimentScore: 0.72, fakeEngagementFlag: false,
    topComments: [],
  },
  {
    id: 'p17', platform: 'LinkedIn', type: 'carousel',
    topic: 'AI Tools',
    hook: '10 AI tools transforming content creation in 2026',
    caption: 'Swipe for the full list with use cases.',
    postedAt: '2026-03-24T09:00:00Z',
    likes: 3400, comments: 210, shares: 780, saves: 0, watchTime: null,
    engagementRate: 10.2, sentimentScore: 0.79, fakeEngagementFlag: false,
    topComments: [],
  },

  // TWITTER/X
  {
    id: 'p18', platform: 'Twitter/X', type: 'thread',
    topic: 'Creator Economy',
    hook: 'The creator economy is broken. Here\'s why (thread):',
    caption: '1/ Most creators optimize for vanity metrics...',
    postedAt: '2026-04-04T14:00:00Z',
    likes: 8200, comments: 620, shares: 3400, saves: 0, watchTime: null,
    engagementRate: 7.8, sentimentScore: 0.45, fakeEngagementFlag: false,
    topComments: [
      { text: 'RT\'ing this entire thread', sentiment: 'excitement', intent: 'amplify' },
      { text: 'Tweet 7 is the real insight', sentiment: 'positive', intent: 'specific' },
    ],
  },
  {
    id: 'p19', platform: 'Twitter/X', type: 'tweet',
    topic: 'Quick Tips',
    hook: 'One habit that will 10x your content quality: record yourself watching your own content.',
    caption: 'If you wince, your audience will scroll. Ruthless self-editing > posting more.',
    postedAt: '2026-03-29T11:00:00Z',
    likes: 4100, comments: 280, shares: 1800, saves: 0, watchTime: null,
    engagementRate: 9.3, sentimentScore: 0.68, fakeEngagementFlag: false,
    topComments: [],
  },
  {
    id: 'p20', platform: 'Twitter/X', type: 'tweet',
    topic: 'Controversial Take',
    hook: 'Viral content is a lagging indicator of deep creator trust. Unpopular take?',
    caption: 'Most viral creators have shallow audiences. Discuss.',
    postedAt: '2026-03-23T15:00:00Z',
    likes: 6800, comments: 940, shares: 2200, saves: 0, watchTime: null,
    engagementRate: 13.4, sentimentScore: 0.38, fakeEngagementFlag: false,
    topComments: [
      { text: 'This aged well in 24 hours', sentiment: 'excitement', intent: 'observation' },
    ],
  },
];

// ─── AUDIENCE DATA ────────────────────────────────────────────────

export const AUDIENCE = {
  totalFollowers: 248700,
  growthRate: 3.2,
  demographics: {
    ageGroups: [
      { group: '18–24', pct: 28 },
      { group: '25–34', pct: 41 },
      { group: '35–44', pct: 19 },
      { group: '45–54', pct: 8  },
      { group: '55+'  , pct: 4  },
    ],
    genders: { male: 58, female: 38, other: 4 },
    topCountries: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'],
  },
  // 7 rows (Mon–Sun) × 24 cols (0–23h) = engagement intensity 0–10
  activeHours: [
    [0,0,0,0,0,0,1,2,3,4,5,5,4,4,3,3,4,6,7,8,8,7,5,2], // Mon
    [0,0,0,0,0,0,1,2,3,4,5,5,4,4,3,3,4,6,7,9,9,7,5,2], // Tue
    [0,0,0,0,0,0,1,2,3,4,5,6,5,4,3,3,4,6,7,8,8,7,5,2], // Wed
    [0,0,0,0,0,0,1,2,3,4,5,5,4,4,3,3,4,5,6,7,7,6,4,1], // Thu
    [0,0,0,0,0,0,1,2,3,4,5,5,4,4,4,4,5,7,8,9,9,8,6,3], // Fri
    [0,0,0,0,0,1,2,3,4,5,6,7,7,7,6,5,5,6,7,8,9,8,6,3], // Sat
    [0,0,0,0,0,1,2,3,4,5,6,7,7,6,5,4,4,5,6,7,8,7,5,2], // Sun
  ],
  interests: [
    { label: 'AI & Machine Learning', affinity: 94 },
    { label: 'Productivity & Systems', affinity: 88 },
    { label: 'Entrepreneurship', affinity: 76 },
    { label: 'Tech Gadgets', affinity: 71 },
    { label: 'Personal Finance', affinity: 64 },
    { label: 'Fitness & Wellness', affinity: 52 },
  ],
  personas: [
    {
      id: 'pa1',
      name: 'The Ambitious Builder',
      size: 38,
      description: 'Ages 25–34, building side projects or early startups. Obsessed with efficiency and leverage. Consumes long-form content about systems and processes.',
      contentAffinity: ['AI Tools', 'Productivity Systems', 'Creator Economy'],
      bestFormat: 'Carousel / Long video',
      emoji: '🚀',
    },
    {
      id: 'pa2',
      name: 'The Curious Student',
      size: 27,
      description: 'Ages 18–24, in college or early career. Wants practical knowledge applicable immediately. Short attention span but high save rate.',
      contentAffinity: ['Quick Tips', 'AI Tools', 'Tech Review'],
      bestFormat: 'Short-form Reel / TikTok',
      emoji: '📚',
    },
    {
      id: 'pa3',
      name: 'The Career Climber',
      size: 22,
      description: 'Ages 30–44, in corporate roles exploring the creator economy as a side income. Engages heavily with success stories and practical monetization content.',
      contentAffinity: ['Creator Economy', 'Personal Story', 'Leadership'],
      bestFormat: 'LinkedIn post / YouTube video',
      emoji: '💼',
    },
  ],
  personaDrift: {
    detected: true,
    from: 'The Curious Student (growing faster)',
    to: 'The Ambitious Builder (stable)',
    confidence: 72,
    alert: 'Your TikTok content is attracting younger audiences who prefer shorter, more entertaining formats. Your Instagram strategy still targets older, more professional segments. Consider aligning format choices or the audience split will widen.',
  },
  silentFollowers: {
    total: 248700,
    neverEngaged: 81,      // % who never liked/commented
    firstTimers: 9,        // % who engaged for the first time last month
    regulars: 10,          // % who engage consistently
    conversionTriggers: ['BTS content', 'Controversial takes', 'Question CTAs', 'Giveaways'],
  },
};

// ─── TRENDS ──────────────────────────────────────────────────────

export const TRENDS = [
  {
    id: 't1', keyword: 'AI agents', hashtag: '#aiagents',
    platform: 'All', viralityScore: 94,
    lifecycleStage: 'emerging',
    firstSeen: '2026-04-06', peakPredicted: '2026-04-18',
    creatorHasTouched: false, trendType: 'topic',
    sentimentBreakdown: { positive: 72, neutral: 20, negative: 8 },
  },
  {
    id: 't2', keyword: 'creator burnout', hashtag: '#creatorburnout',
    platform: 'Instagram', viralityScore: 81,
    lifecycleStage: 'peaking',
    firstSeen: '2026-04-01', peakPredicted: '2026-04-12',
    creatorHasTouched: false, trendType: 'topic',
    sentimentBreakdown: { positive: 22, neutral: 31, negative: 47 },
  },
  {
    id: 't3', keyword: 'vibe coding', hashtag: '#vibecoding',
    platform: 'TikTok', viralityScore: 88,
    lifecycleStage: 'emerging',
    firstSeen: '2026-04-04', peakPredicted: '2026-04-16',
    creatorHasTouched: false, trendType: 'topic',
    sentimentBreakdown: { positive: 81, neutral: 14, negative: 5 },
  },
  {
    id: 't4', keyword: 'text-to-video', hashtag: '#texttovideo',
    platform: 'All', viralityScore: 76,
    lifecycleStage: 'peaking',
    firstSeen: '2026-03-25', peakPredicted: '2026-04-10',
    creatorHasTouched: true, trendType: 'format',
    sentimentBreakdown: { positive: 68, neutral: 22, negative: 10 },
  },
  {
    id: 't5', keyword: 'morning routine 2026', hashtag: '#morningroutine2026',
    platform: 'TikTok', viralityScore: 71,
    lifecycleStage: 'emerging',
    firstSeen: '2026-04-07', peakPredicted: '2026-04-20',
    creatorHasTouched: false, trendType: 'topic',
    sentimentBreakdown: { positive: 76, neutral: 18, negative: 6 },
  },
  {
    id: 't6', keyword: 'slow productivity', hashtag: '#slowproductivity',
    platform: 'LinkedIn', viralityScore: 65,
    lifecycleStage: 'emerging',
    firstSeen: '2026-04-05', peakPredicted: '2026-04-22',
    creatorHasTouched: false, trendType: 'topic',
    sentimentBreakdown: { positive: 61, neutral: 28, negative: 11 },
  },
  {
    id: 't7', keyword: 'faceless content', hashtag: '#facelesscontent',
    platform: 'Instagram', viralityScore: 83,
    lifecycleStage: 'peaking',
    firstSeen: '2026-03-20', peakPredicted: '2026-04-08',
    creatorHasTouched: true, trendType: 'format',
    sentimentBreakdown: { positive: 64, neutral: 24, negative: 12 },
  },
  {
    id: 't8', keyword: 'digital minimalism', hashtag: '#digitalminimalism',
    platform: 'All', viralityScore: 58,
    lifecycleStage: 'declining',
    firstSeen: '2026-03-10', peakPredicted: '2026-03-28',
    creatorHasTouched: false, trendType: 'topic',
    sentimentBreakdown: { positive: 71, neutral: 22, negative: 7 },
  },
  {
    id: 't9', keyword: 'B-roll aesthetic', hashtag: '#broll',
    platform: 'YouTube', viralityScore: 69,
    lifecycleStage: 'peaking',
    firstSeen: '2026-03-28', peakPredicted: '2026-04-11',
    creatorHasTouched: false, trendType: 'format',
    sentimentBreakdown: { positive: 78, neutral: 18, negative: 4 },
  },
  {
    id: 't10', keyword: 'personal OS', hashtag: '#personalOS',
    platform: 'All', viralityScore: 91,
    lifecycleStage: 'emerging',
    firstSeen: '2026-04-08', peakPredicted: '2026-04-25',
    creatorHasTouched: false, trendType: 'topic',
    sentimentBreakdown: { positive: 84, neutral: 12, negative: 4 },
  },
];

// ─── VIRAL MOMENT WINDOWS ─────────────────────────────────────────

export const VIRAL_WINDOWS = [
  {
    id: 'vw1', event: 'Product Hunt Week — major AI tool launches expected',
    date: '2026-04-14',
    relevanceScore: 96, window: { start: 'Apr 14', end: 'Apr 16' },
    suggestedAngle: 'First-look breakdown of the top 3 AI launches — your audience is primed for this',
  },
  {
    id: 'vw2', event: 'Monday motivation peak — highest organic reach window of the week',
    date: '2026-04-14',
    relevanceScore: 82, window: { start: 'Apr 14 7AM', end: 'Apr 14 10AM' },
    suggestedAngle: 'Publish your most motivational or productivity-focused content in this window',
  },
  {
    id: 'vw3', event: 'Global productivity summit hashtag wave expected',
    date: '2026-04-17',
    relevanceScore: 74, window: { start: 'Apr 17', end: 'Apr 18' },
    suggestedAngle: 'Ride the #productivitysummit hashtag with your unique productivity system content',
  },
];

// ─── COMPETITORS ──────────────────────────────────────────────────

export const COMPETITORS = [
  {
    id: 'c1', handle: '@techmindset', platform: 'Instagram',
    niche: 'Tech & Productivity',
    followers: 412000, avgEngagementRate: 4.1, weeklyPostCount: 4,
    growthRate: 2.8,
    topContent: [
      { type: 'reel', topic: 'ChatGPT prompts for work', engagement: 8.2 },
      { type: 'carousel', topic: 'Notion templates', engagement: 6.8 },
    ],
    contentGaps: ['AI agents', 'Personal OS', 'Creator monetization'],
    brandSafetyScore: 88,
  },
  {
    id: 'c2', handle: '@productivewithpurpose', platform: 'YouTube',
    niche: 'Productivity',
    followers: 289000, avgEngagementRate: 6.3, weeklyPostCount: 2,
    growthRate: 4.1,
    topContent: [
      { type: 'video', topic: 'Deep work systems', engagement: 9.4 },
      { type: 'short', topic: '60-sec productivity hacks', engagement: 12.1 },
    ],
    contentGaps: ['AI tools', 'Creator economy', 'Brand deals'],
    brandSafetyScore: 92,
  },
  {
    id: 'c3', handle: '@digitalcreatorhq', platform: 'TikTok',
    niche: 'Creator Economy',
    followers: 518000, avgEngagementRate: 9.2, weeklyPostCount: 7,
    growthRate: 6.4,
    topContent: [
      { type: 'video', topic: 'How I make $30K/month creating', engagement: 18.3 },
      { type: 'video', topic: 'Creator burnout reality', engagement: 15.6 },
    ],
    contentGaps: ['AI tools', 'Productivity systems', 'Tech reviews'],
    brandSafetyScore: 71,
  },
  {
    id: 'c4', handle: '@buildwithtech', platform: 'LinkedIn',
    niche: 'Tech & Entrepreneurship',
    followers: 187000, avgEngagementRate: 7.8, weeklyPostCount: 5,
    growthRate: 5.1,
    topContent: [
      { type: 'post', topic: 'AI replacing jobs — the honest take', engagement: 11.2 },
      { type: 'carousel', topic: 'Building in public: 90 days in', engagement: 8.7 },
    ],
    contentGaps: ['Content creation systems', 'Creator monetization', 'Personal branding'],
    brandSafetyScore: 95,
  },
  {
    id: 'c5', handle: '@alexormsby', platform: 'Twitter/X',
    niche: 'AI & Productivity',
    followers: 334000, avgEngagementRate: 5.6, weeklyPostCount: 14,
    growthRate: 3.9,
    topContent: [
      { type: 'thread', topic: 'The future of AI in 2027', engagement: 9.8 },
      { type: 'tweet', topic: 'Hot take on remote work culture', engagement: 7.4 },
    ],
    contentGaps: ['Video content', 'Personal storytelling', 'Platform diversification'],
    brandSafetyScore: 82,
  },
];

// ─── COLLAB OPPORTUNITIES (pre-computed) ─────────────────────────

export const COLLAB_OPPORTUNITIES = [
  {
    handle: '@productivewithpurpose', platform: 'YouTube',
    compatibility: 87,
    rationale: 'Complementary niches — their audience lacks AI tools content you excel at. Zero audience overlap.',
    suggestedFormat: 'Joint YouTube video: "AI + Deep Work: The Ultimate Productivity System"',
    expectedReachLift: '+31K unique viewers',
  },
  {
    handle: '@buildwithtech', platform: 'LinkedIn',
    compatibility: 79,
    rationale: 'Same professional demographic, different content style. They go broad on tech; you go deep on creation systems.',
    suggestedFormat: 'LinkedIn Live: "Getting started as a tech creator in 2026"',
    expectedReachLift: '+22K unique viewers',
  },
  {
    handle: '@digitalcreatorhq', platform: 'TikTok',
    compatibility: 64,
    rationale: 'High reach but some audience overlap. Best used for a one-off collab to borrow their TikTok growth engine.',
    suggestedFormat: 'TikTok duet: response/reaction format on creator economy debate',
    expectedReachLift: '+58K unique viewers',
  },
];

// ─── HOOK PERFORMANCE DATA ──────────────────────────────────────

export const HOOK_CLUSTERS = [
  { type: 'Controversial Take', count: 6, avgEngagement: 14.8, winRate: 83, examples: ['Hot take: Notion is making you less productive', 'Unpopular opinion: you don\'t need consistency to grow'] },
  { type: 'Storytelling', count: 5, avgEngagement: 11.2, winRate: 80, examples: ['I almost quit creating last year', 'Story time: how I got 100K followers in 90 days'] },
  { type: 'Question / Curiosity', count: 4, avgEngagement: 8.4, winRate: 67, examples: ['You\'re doing your morning routine wrong — here\'s what 1% of creators do instead'] },
  { type: 'Stat / Data', count: 3, avgEngagement: 7.1, winRate: 58, examples: ['I tested every AI video tool so you don\'t have to (60-day results)'] },
  { type: 'How-To / List', count: 4, avgEngagement: 6.3, winRate: 50, examples: ['5 AI tools that replaced my entire production team'] },
  { type: 'POV / Scenario', count: 3, avgEngagement: 12.6, winRate: 77, examples: ['POV: You discover these 3 AI tools and never edit manually again'] },
];

// ─── BRAND SAFETY ────────────────────────────────────────────────

export const BRAND_SAFETY = {
  overallScore: 79,
  grade: 'B+',
  breakdown: {
    language: 92,
    topicSafety: 84,
    commentToxicity: 71,
    controversyHistory: 62,
  },
  flaggedPosts: [
    { id: 'p3', issue: 'High controversy engagement (1,840 comments) — brands view as brand risk', severity: 'medium' },
    { id: 'p12', issue: 'TikTok post generated significant negative sentiment (24%) — toxicity in comments', severity: 'high' },
    { id: 'p20', issue: 'Provocative language in tweet may deter conservative brands', severity: 'low' },
  ],
  safeBrands: ['Tech SaaS companies', 'Productivity tools', 'E-learning platforms', 'Business software'],
  avoidBrands: ['Family brands', 'Children\'s products', 'Conservative financial institutions'],
};

// ─── GOLDEN HOUR PREDICTION ──────────────────────────────────────

export const GOLDEN_HOUR = {
  platform: 'Instagram',
  window: { day: 'Today', start: '19:00', end: '20:30' },
  confidence: 'HIGH',
  reason: 'Your audience\'s Tuesday peak engagement window. 23% above your daily average historically.',
  nextWindow: { day: 'Tomorrow', start: '07:30', end: '09:00', confidence: 'MEDIUM' },
};

// ─── NARRATIVE ARC TEMPLATE ──────────────────────────────────────

export const NARRATIVE_ARC_TEMPLATE = [
  { week: 1, theme: 'Foundation — Establish Your POV', color: '#7C3AED' },
  { week: 2, theme: 'Evidence — Show Results & Proof', color: '#6366F1' },
  { week: 3, theme: 'Conflict — Controversial Take / Debate', color: '#F43F5E' },
  { week: 4, theme: 'Resolution — CTA & Community Moment', color: '#10B981' },
];
