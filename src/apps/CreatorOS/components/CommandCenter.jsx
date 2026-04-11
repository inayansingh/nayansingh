import React, { useState } from 'react';
import {
  LayoutDashboard, TrendingUp, Users, Zap,
  Clock, RefreshCw, Loader2, AlertCircle,
  CheckCircle2, ChevronRight, Target
} from 'lucide-react';
import { getQuickWin, predictPostScore } from '../creatorAgent.js';
import { heatmapColor, timeUntilWindow, fmtNum, PLATFORM_COLORS, scoreGrade, calcEngagementQualityScore } from '../utils/metrics.js';
import { GOLDEN_HOUR } from '../utils/mockData.js';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function CommandCenter({ apiKey, CREATOR_PROFILE, POSTS, AUDIENCE, navigate }) {
  const [quickWin, setQuickWin]         = useState(null);
  const [qwLoading, setQwLoading]       = useState(false);
  const [qwError, setQwError]           = useState(null);
  const [concept, setConcept]           = useState('');
  const [scoreResult, setScoreResult]   = useState(null);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError]     = useState(null);

  const countdown = timeUntilWindow(GOLDEN_HOUR.window.start);

  const topPosts = [...POSTS]
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 5);

  const handleQuickWin = async () => {
    if (!apiKey) { setQwError('Enter your Gemini API Key in the sidebar.'); return; }
    setQwLoading(true); setQwError(null); setQuickWin(null);
    try {
      const res = await getQuickWin(CREATOR_PROFILE, topPosts, apiKey);
      setQuickWin(res);
    } catch (e) { setQwError(e.message); }
    finally { setQwLoading(false); }
  };

  const handleScore = async () => {
    if (!concept.trim()) return;
    if (!apiKey) { setScoreError('Enter your Gemini API Key in the sidebar.'); return; }
    setScoreLoading(true); setScoreError(null); setScoreResult(null);
    try {
      const res = await predictPostScore(concept, CREATOR_PROFILE, topPosts, apiKey);
      setScoreResult(res);
    } catch (e) { setScoreError(e.message); }
    finally { setScoreLoading(false); }
  };

  const { grade, color } = scoreResult ? scoreGrade(scoreResult.score) : {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page header */}
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Command Center</h2>
          <p className="cos-section-sub">
            Welcome back, {CREATOR_PROFILE.name} · {fmtNum(CREATOR_PROFILE.totalFollowers)} followers across {CREATOR_PROFILE.platforms.length} platforms
          </p>
        </div>
        <button className="cos-btn-primary" onClick={() => navigate('copilot')}>
          <Zap size={15} /> Ask AI Copilot
        </button>
      </div>

      {/* KPI Row */}
      <div className="cos-grid-4">
        {[
          { label: 'Avg Engagement',  value: `${CREATOR_PROFILE.avgEngagementRate}%`, sub: 'across all platforms', trend: '+0.6% vs last month', up: true,  color: '#7C3AED', Icon: TrendingUp    },
          { label: 'Total Followers', value: fmtNum(CREATOR_PROFILE.totalFollowers), sub: 'all platforms combined', trend: `+${CREATOR_PROFILE.followersGrowthRate}% this month`, up: true, color: '#06B6D4', Icon: Users },
          { label: 'Content Score',   value: `${CREATOR_PROFILE.contentScore}/100`, sub: 'AI-computed composite', trend: '+4 pts this week', up: true,  color: '#10B981', Icon: LayoutDashboard },
          { label: 'Best Platform',   value: CREATOR_PROFILE.bestPlatform, sub: 'highest avg engagement', trend: '4.8% eng rate', up: true, color: '#F59E0B', Icon: Target },
        ].map(({ label, value, sub, trend, up, color, Icon }) => (
          <div key={label} className="cos-kpi-card">
            <div className="cos-kpi-icon-row">
              <div className="cos-kpi-icon" style={{ background: color + '18', color }}>
                <Icon size={18} />
              </div>
              <span className="cos-kpi-trend" style={{ color: up ? '#10B981' : '#F43F5E' }}>
                {up ? '↑' : '↓'} {trend}
              </span>
            </div>
            <div className="cos-kpi-value" style={{ color }}>{value}</div>
            <div className="cos-kpi-label">{label}</div>
            <div className="cos-kpi-sub">{sub}</div>
          </div>
        ))}
      </div>

      {/* Second row: Golden Hour + AI Quick Win */}
      <div className="cos-grid-2">
        {/* Golden Hour */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Clock size={13} className="cos-violet" />
            <span className="cos-card-hd-title">Golden Hour Predictor</span>
            <span className="cos-badge" style={{ color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', marginLeft: 'auto' }}>
              {GOLDEN_HOUR.confidence}
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.7rem', color: 'var(--cos-text-3)', marginBottom: '0.5rem' }}>
              {GOLDEN_HOUR.window.day} · {GOLDEN_HOUR.platform}
            </div>
            <div style={{ fontFamily: 'var(--cos-font-head)', fontSize: '2.2rem', fontWeight: 800, color: '#7C3AED', lineHeight: 1 }}>
              {GOLDEN_HOUR.window.start} – {GOLDEN_HOUR.window.end}
            </div>
            <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.65rem', color: 'var(--cos-text-3)', marginBottom: '0.25rem' }}>WINDOW OPENS IN</div>
              <div style={{ fontFamily: 'var(--cos-font-head)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--cos-text-1)' }}>{countdown.label}</div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--cos-text-2)', lineHeight: 1.5, marginBottom: '1rem' }}>{GOLDEN_HOUR.reason}</p>
            <div style={{ fontSize: '0.75rem', color: 'var(--cos-text-3)' }}>
              Next window: <span style={{ color: 'var(--cos-text-2)' }}>{GOLDEN_HOUR.nextWindow.day} {GOLDEN_HOUR.nextWindow.start} ({GOLDEN_HOUR.nextWindow.confidence})</span>
            </div>
          </div>
        </div>

        {/* AI Quick Win */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Zap size={13} className="cos-amber" />
            <span className="cos-card-hd-title">AI Quick Win</span>
            {quickWin && (
              <span className="cos-badge" style={{ marginLeft: 'auto', color: quickWin.urgency === 'NOW' ? '#F43F5E' : quickWin.urgency === 'TODAY' ? '#F59E0B' : '#10B981', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.15)' }}>
                {quickWin.urgency}
              </span>
            )}
          </div>

          {!quickWin && !qwLoading && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <Zap size={32} style={{ color: 'var(--cos-text-3)', marginBottom: '0.75rem' }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--cos-text-2)', marginBottom: '1rem', lineHeight: 1.5 }}>
                Get your single best action for today — AI-generated from your real performance data.
              </p>
              <button className="cos-btn-primary" onClick={handleQuickWin}>
                <Zap size={15} /> Generate Today's Win
              </button>
            </div>
          )}

          {qwLoading && (
            <div className="cos-loading"><div className="cos-pulse"/><span>Analyzing your performance data...</span></div>
          )}

          {qwError && <div className="cos-alert error" style={{marginTop:'0'}}><AlertCircle size={15}/> {qwError}</div>}

          {quickWin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 10, padding: '1rem' }}>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--cos-font-mono)', color: 'var(--cos-violet-lt)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>ACTION</div>
                <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--cos-text-1)', lineHeight: 1.5 }}>{quickWin.action}</p>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--cos-text-2)', lineHeight: 1.6 }}>{quickWin.rationale}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="cos-badge" style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--cos-cyan)', border: '1px solid rgba(6,182,212,0.15)' }}>{quickWin.category}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--cos-emerald)', fontFamily: 'var(--cos-font-mono)' }}>↑ {quickWin.expectedImpact}</span>
              </div>
              <button className="cos-btn-ghost cos-btn-sm" onClick={handleQuickWin}>
                <RefreshCw size={12} /> Regenerate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Third row: Post-to-Score + Top Posts */}
      <div className="cos-grid-2">
        {/* Confidence-to-Post */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Target size={13} className="cos-cyan" />
            <span className="cos-card-hd-title">Confidence-to-Post Score</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--cos-text-2)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Describe your post idea and get an AI-predicted engagement score with risks and improvements.
          </p>
          <textarea
            placeholder='e.g. "A reel about 5 AI tools that replace a video editor — hook: most creators don&apos;t know these exist"'
            value={concept}
            onChange={e => setConcept(e.target.value)}
            rows={3}
            style={{ background: 'var(--cos-bg-raised)', border: '1px solid var(--cos-border)', borderRadius: 'var(--cos-radius-sm)', color: 'var(--cos-text-1)', padding: '0.65rem 0.9rem', fontSize: '0.85rem', fontFamily: 'var(--cos-font-ui)', outline: 'none', width: '100%', resize: 'vertical', marginBottom: '0.75rem' }}
          />
          <button className="cos-btn-primary cos-btn-full" onClick={handleScore} disabled={scoreLoading || !concept.trim()}>
            {scoreLoading ? <Loader2 size={15} className="cos-spin-icon" /> : <Target size={15} />}
            {scoreLoading ? 'Scoring...' : 'Score This Idea'}
          </button>

          {scoreError && <div className="cos-alert error" style={{ marginTop: '0.75rem' }}><AlertCircle size={15}/> {scoreError}</div>}

          {scoreResult && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'cos-fadein 0.4s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center', background: color + '18', border: `2px solid ${color}`, borderRadius: 12, padding: '0.75rem 1.25rem' }}>
                  <div style={{ fontFamily: 'var(--cos-font-head)', fontSize: '2rem', fontWeight: 900, color, lineHeight: 1 }}>{scoreResult.score}</div>
                  <div style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.65rem', color: 'var(--cos-text-3)' }}>/ 100</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--cos-font-head)', fontSize: '1.4rem', fontWeight: 800, color }}>{grade}</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--cos-text-2)', lineHeight: 1.4, marginTop: '0.25rem' }}>{scoreResult.verdict}</p>
                  <div style={{ fontSize: '0.72rem', color: 'var(--cos-text-3)', marginTop: '0.3rem', fontFamily: 'var(--cos-font-mono)' }}>Best on: {scoreResult.bestPlatform} · {scoreResult.bestFormat}</div>
                </div>
              </div>

              {scoreResult.risks?.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.63rem', fontFamily: 'var(--cos-font-mono)', color: 'var(--cos-rose)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>Risks</div>
                  {scoreResult.risks.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--cos-text-2)', marginBottom: '0.3rem' }}>
                      <span style={{ color: 'var(--cos-rose)', flexShrink: 0 }}>✕</span> {r}
                    </div>
                  ))}
                </div>
              )}

              {scoreResult.improvements?.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.63rem', fontFamily: 'var(--cos-font-mono)', color: 'var(--cos-emerald)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>Improvements</div>
                  {scoreResult.improvements.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--cos-text-2)', marginBottom: '0.3rem' }}>
                      <span style={{ color: 'var(--cos-emerald)', flexShrink: 0 }}>✓</span> {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Top 5 Posts */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <TrendingUp size={13} className="cos-emerald" />
            <span className="cos-card-hd-title">Top Performing Posts</span>
            <span className="cos-badge" style={{ marginLeft: 'auto', color: 'var(--cos-violet-lt)', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.15)' }}>Last 30 days</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {topPosts.map((post, i) => {
              const pColor = PLATFORM_COLORS[post.platform] || '#6366F1';
              const eqs = calcEngagementQualityScore(post);
              return (
                <div key={post.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0', borderBottom: i < 4 ? '1px solid var(--cos-border)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.7rem', color: 'var(--cos-text-3)', minWidth: 16 }}>#{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--cos-text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {post.hook?.slice(0, 55)}...
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem', alignItems: 'center' }}>
                      <span className="cos-platform-tag" style={{ background: pColor + '18', color: pColor, border: `1px solid ${pColor}30` }}>{post.platform}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--cos-text-3)', fontFamily: 'var(--cos-font-mono)' }}>{post.type}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--cos-font-head)', fontSize: '1rem', fontWeight: 700, color: post.engagementRate > 10 ? '#10B981' : post.engagementRate > 5 ? '#7C3AED' : '#F59E0B' }}>
                      {post.engagementRate}%
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--cos-text-3)', fontFamily: 'var(--cos-font-mono)' }}>EQS {eqs}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Engagement Heatmap */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Clock size={13} className="cos-indigo" />
          <span className="cos-card-hd-title">Audience Engagement Heatmap</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--cos-text-3)', fontFamily: 'var(--cos-font-mono)' }}>Intensity = engagement strength · Mon – Sun · 0–23h</span>
        </div>
        {/* Hour labels */}
        <div className="cos-heatmap" style={{ marginBottom: '0.5rem' }}>
          <div />
          {HOURS.map(h => (
            <div key={h} className="cos-hm-hour">{h % 3 === 0 ? `${h}h` : ''}</div>
          ))}
        </div>
        {/* Rows */}
        {AUDIENCE.activeHours.map((row, di) => (
          <div key={di} className="cos-heatmap" style={{ marginBottom: 3 }}>
            <div className="cos-hm-label">{DAYS[di]}</div>
            {row.map((val, hi) => (
              <div
                key={hi}
                className="cos-hm-cell"
                style={{ background: heatmapColor(val), outline: val >= 8 ? '1px solid rgba(124,58,237,0.6)' : 'none' }}
                title={`${DAYS[di]} ${hi}:00 — intensity ${val}`}
              />
            ))}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {[{ label: 'Peak window', color: 'rgba(124,58,237,0.85)' }, { label: 'Good', color: 'rgba(124,58,237,0.45)' }, { label: 'Low', color: 'rgba(99,102,241,0.15)' }].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', color: 'var(--cos-text-3)' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
