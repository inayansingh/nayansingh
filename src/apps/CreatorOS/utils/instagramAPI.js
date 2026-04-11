// instagramAPI.js — Instagram Graph API fetch layer
// Replaces mockData when a real access token is available.

const IG_BASE = 'https://graph.instagram.com/v21.0';
const FB_BASE = 'https://graph.facebook.com/v21.0';

// ─── Helper ──────────────────────────────────────────────────────
async function igFetch(path, params, token) {
  const url = new URL(`${IG_BASE}${path}`);
  url.searchParams.set('access_token', token);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  const data = await res.json();
  if (data.error) throw new Error(`Instagram API: ${data.error.message}`);
  return data;
}

// ─── 1. Creator Profile ───────────────────────────────────────────
export async function fetchProfile(token) {
  const data = await igFetch('/me', {
    fields: 'id,username,name,biography,website,followers_count,follows_count,media_count,profile_picture_url,account_type',
  }, token);

  return {
    id:              data.id,
    name:            data.name || data.username,
    handle:          `@${data.username}`,
    bio:             data.biography || '',
    website:         data.website || '',
    totalFollowers:  data.followers_count || 0,
    following:       data.follows_count || 0,
    mediaCount:      data.media_count || 0,
    avatar:          data.profile_picture_url || '',
    accountType:     data.account_type,
    primaryPlatform: 'Instagram',
    platforms:       ['Instagram'],
    niche:           'Your Niche',             // not available via API
    contentScore:    null,
    followersGrowthRate: null,                 // needs historical data
    avgEngagementRate: null,                   // computed after fetching media
    bestPlatform: 'Instagram',
  };
}

// ─── 2. Recent Media (posts + reels) ────────────────────────────
export async function fetchMedia(token, limit = 30) {
  const data = await igFetch('/me/media', {
    fields: [
      'id', 'caption', 'media_type', 'media_url', 'thumbnail_url',
      'timestamp', 'like_count', 'comments_count', 'permalink',
      'ig_id', 'shortcode',
    ].join(','),
    limit,
  }, token);

  const posts = (data.data || []).map(p => {
    const typeMap = { IMAGE: 'post', VIDEO: 'reel', CAROUSEL_ALBUM: 'carousel' };
    return {
      id:             p.id,
      platform:       'Instagram',
      type:           typeMap[p.media_type] || 'post',
      topic:          guessTopic(p.caption),
      hook:           extractHook(p.caption),
      caption:        p.caption || '',
      postedAt:       p.timestamp,
      date:           new Date(p.timestamp).toLocaleDateString(),
      likes:          p.like_count || 0,
      comments:       p.comments_count || 0,
      shares:         0,          // Instagram API doesn't expose shares
      saves:          0,          // needs /insights call (Business accounts)
      watchTime:      null,
      engagementRate: 0,          // computed below after profile fetch
      sentimentScore: 0.65,       // needs NLP — placeholder
      fakeEngagementFlag: false,  // heuristic applied client-side
      mediaUrl:       p.media_url,
      thumbnail:      p.thumbnail_url,
      permalink:      p.permalink,
    };
  });

  return posts;
}

// ─── 3. Post Insights (Business/Creator accounts only) ───────────
// Requires instagram_manage_insights permission
export async function fetchPostInsights(token, mediaId) {
  try {
    const url = new URL(`${IG_BASE}/${mediaId}/insights`);
    url.searchParams.set('access_token', token);
    url.searchParams.set('metric', 'engagement,impressions,reach,saved,video_views');
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.error) return null;

    const map = {};
    (data.data || []).forEach(m => { map[m.name] = m.values?.[0]?.value ?? m.value; });
    return {
      engagement:  map.engagement   || 0,
      impressions: map.impressions  || 0,
      reach:       map.reach        || 0,
      saves:       map.saved        || 0,
      videoViews:  map.video_views  || 0,
    };
  } catch {
    return null;
  }
}

// ─── 4. Account Insights (30-day window) ────────────────────────
export async function fetchAccountInsights(token, igUserId) {
  try {
    // Needs pages_read_engagement + Instagram Business account
    const url = new URL(`${FB_BASE}/${igUserId}/insights`);
    url.searchParams.set('access_token', token);
    url.searchParams.set('metric', 'follower_count,reach,impressions,profile_views');
    url.searchParams.set('period', 'day');
    url.searchParams.set('since', Math.floor(Date.now() / 1000) - 30 * 86400);
    url.searchParams.set('until', Math.floor(Date.now() / 1000));
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.error) return null;
    return data.data || [];
  } catch {
    return null;
  }
}

// ─── 5. Compute Engagement Rate from posts ───────────────────────
export function computeEngagementRates(posts, followerCount) {
  return posts.map(p => ({
    ...p,
    engagementRate: followerCount > 0
      ? parseFloat(((p.likes + p.comments) / followerCount * 100).toFixed(2))
      : 0,
  }));
}

// ─── 6. Token Validity Check ─────────────────────────────────────
export async function validateToken(token) {
  try {
    const data = await igFetch('/me', { fields: 'id,username' }, token);
    return { valid: true, username: data.username };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

// ─── 7. Refresh Long-Lived Token ─────────────────────────────────
// Long-lived tokens expire in 60 days; refresh if < 10 days left.
export async function refreshToken(token) {
  const url = new URL(`${IG_BASE}/refresh_access_token`);
  url.searchParams.set('grant_type', 'ig_refresh_token');
  url.searchParams.set('access_token', token);
  const res = await fetch(url.toString());
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return { accessToken: data.access_token, expiresIn: data.expires_in };
}

// ─── Helpers ─────────────────────────────────────────────────────

function extractHook(caption) {
  if (!caption) return null;
  const lines = caption.split('\n').filter(l => l.trim().length > 0);
  return lines[0]?.slice(0, 100) || null;
}

function guessTopic(caption) {
  if (!caption) return 'General';
  const lower = caption.toLowerCase();
  if (/(ai|chatgpt|gemini|openai|tool)/.test(lower))    return 'AI Tools';
  if (/(product|system|notion|workflow|hack)/.test(lower)) return 'Productivity Systems';
  if (/(story|journey|fail|success|year)/.test(lower))  return 'Personal Story';
  if (/(money|income|earn|revenue|brand)/.test(lower))  return 'Creator Economy';
  if (/(tip|trick|secret|mistake)/.test(lower))         return 'Quick Tips';
  if (/(gadget|review|iphone|camera)/.test(lower))      return 'Tech Review';
  return 'General';
}
