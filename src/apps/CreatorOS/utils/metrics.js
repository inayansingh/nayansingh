// CreatorOS — Pure Math Helpers

// Weighted Engagement Quality Score
// Comment depth (×3), saves (×2.5), shares (×2), likes (×1)
export function calcEngagementQualityScore(post) {
  const { likes, comments, shares, saves, platform } = post;
  const followers = 248700;
  const raw =
    (comments * 3 + (saves || 0) * 2.5 + shares * 2 + likes * 1) /
    followers * 100;
  return Math.min(Math.round(raw * 10), 100);
}

// Fake engagement probability heuristic
// High likes, very low comments ratio = suspicious
export function calcFakeEngagementProbability(post) {
  if (!post.likes || !post.comments) return 0;
  const commentToLikeRatio = post.comments / post.likes;
  if (commentToLikeRatio < 0.005) return 'HIGH';
  if (commentToLikeRatio < 0.015) return 'MEDIUM';
  return 'LOW';
}

// Content Fatigue Score for a given content type
// Returns 0-100 where >70 = fatigue detected
export function calcContentFatigue(posts, contentType) {
  const typePosts = posts
    .filter(p => p.type === contentType)
    .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  if (typePosts.length < 3) return 0;
  const recent = typePosts.slice(0, 3).reduce((s, p) => s + p.engagementRate, 0) / 3;
  const older  = typePosts.slice(3, 6).reduce((s, p) => s + p.engagementRate, 0) / Math.max(typePosts.slice(3, 6).length, 1);
  const drop = older > 0 ? ((older - recent) / older) * 100 : 0;
  return Math.max(0, Math.min(100, Math.round(drop)));
}

// Audience heatmap cell intensity colour (CSS rgba string)
export function heatmapColor(intensity, max = 9) {
  const t = intensity / max;
  if (t === 0) return 'rgba(99,102,241,0.04)';
  if (t < 0.3) return `rgba(99,102,241,${0.15 + t * 0.4})`;
  if (t < 0.7) return `rgba(124,58,237,${0.35 + t * 0.3})`;
  return `rgba(124,58,237,${0.7 + t * 0.3})`;
}

// Golden hour countdown
export function timeUntilWindow(startHHMM) {
  const now = new Date();
  const [h, m] = startHHMM.split(':').map(Number);
  const window = new Date();
  window.setHours(h, m, 0, 0);
  if (window < now) window.setDate(window.getDate() + 1);
  const diffMs = window - now;
  const hrs = Math.floor(diffMs / 3_600_000);
  const mins = Math.floor((diffMs % 3_600_000) / 60_000);
  return { hrs, mins, label: `${hrs}h ${mins}m` };
}

// Score grade label
export function scoreGrade(score) {
  if (score >= 90) return { grade: 'A+', color: '#10B981' };
  if (score >= 80) return { grade: 'A',  color: '#10B981' };
  if (score >= 70) return { grade: 'B+', color: '#6366F1' };
  if (score >= 60) return { grade: 'B',  color: '#6366F1' };
  if (score >= 50) return { grade: 'C',  color: '#F59E0B' };
  return { grade: 'D', color: '#F43F5E' };
}

// Platform colour map
export const PLATFORM_COLORS = {
  Instagram: '#E1306C',
  YouTube:   '#FF0000',
  TikTok:    '#69C9D0',
  LinkedIn:  '#0A66C2',
  'Twitter/X': '#1DA1F2',
};

// Virality score color
export function viralityColor(score) {
  if (score >= 85) return '#F43F5E';
  if (score >= 70) return '#F59E0B';
  if (score >= 50) return '#10B981';
  return '#6366F1';
}

// Format large numbers
export function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

// Lifecycle stage config
export const LIFECYCLE_CFG = {
  emerging:  { color: '#10B981', bg: 'rgba(16,185,129,0.12)', label: '🌱 Emerging' },
  peaking:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: '🔥 Peaking' },
  declining: { color: '#F43F5E', bg: 'rgba(244,63,94,0.12)', label: '📉 Declining' },
};
