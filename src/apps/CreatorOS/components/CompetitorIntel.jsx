import React, { useState } from 'react';
import { Swords, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { analyzeCompetitors } from '../creatorAgent.js';
import { PLATFORM_COLORS } from '../utils/metrics.js';
import { COLLAB_OPPORTUNITIES } from '../utils/mockData.js';

export default function CompetitorIntel({ apiKey, COMPETITORS, CREATOR_PROFILE, navigate }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const SELF = {
    handle: CREATOR_PROFILE.handle,
    followers: CREATOR_PROFILE.totalFollowers,
    avgEngagementRate: CREATOR_PROFILE.avgEngagementRate,
    weeklyPostCount: 5,
    growthRate: CREATOR_PROFILE.followersGrowthRate,
  };

  const handleAnalyze = async () => {
    if (!apiKey) { setError('Enter API Key in sidebar.'); return; }
    setLoading(true); setError(null); setAnalysis(null);
    try { setAnalysis(await analyzeCompetitors(COMPETITORS, CREATOR_PROFILE, apiKey)); }
    catch(e) { setError(e.message); } finally { setLoading(false); }
  };

  const allHandles = [SELF, ...COMPETITORS];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Competitor Intelligence</h2>
          <p className="cos-section-sub">Benchmarking, gap analysis, collab opportunity matching</p>
        </div>
        <button className="cos-btn-primary" onClick={handleAnalyze} disabled={loading}>
          {loading ? <Loader2 size={14} className="cos-spin-icon"/> : <Swords size={14}/>}
          {loading ? 'Analyzing...' : 'AI Deep Analysis'}
        </button>
      </div>

      {error && <div className="cos-alert error"><AlertCircle size={15}/> {error}</div>}
      {loading && <div className="cos-loading"><div className="cos-pulse"/><span>Analyzing competitor landscape...</span></div>}

      {/* AI Analysis Results */}
      {analysis && (
        <div className="cos-grid-3" style={{ animation:'cos-fadein 0.4s ease-out' }}>
          <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:12, padding:'1.1rem' }}>
            <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-emerald)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>🏆 Week's Winner</div>
            <p style={{ fontSize:'0.85rem', color:'var(--cos-text-1)', lineHeight:1.5 }}>{analysis.weeklyWinner}</p>
          </div>
          <div style={{ background:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.2)', borderRadius:12, padding:'1.1rem' }}>
            <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-violet-lt)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>⚡ Biggest Opportunity</div>
            <p style={{ fontSize:'0.85rem', color:'var(--cos-text-1)', lineHeight:1.5 }}>{analysis.biggestOpportunity}</p>
          </div>
          <div style={{ background:'rgba(244,63,94,0.08)', border:'1px solid rgba(244,63,94,0.2)', borderRadius:12, padding:'1.1rem' }}>
            <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-rose)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>⚠️ Threat to Watch</div>
            <p style={{ fontSize:'0.85rem', color:'var(--cos-text-1)', lineHeight:1.5 }}>{analysis.threatToWatch}</p>
          </div>

          {/* Content Gaps */}
          {analysis.contentGaps?.length > 0 && (
            <div style={{ gridColumn:'1/-1' }}>
              <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>Content Gaps — Own These Topics</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                {analysis.contentGaps.map((gap, i) => (
                  <div key={i} style={{ background:'var(--cos-bg-raised)', border:'1px solid var(--cos-border)', borderRadius:9, padding:'0.85rem', display:'flex', alignItems:'center', gap:'1rem' }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:'0.88rem', color:'var(--cos-text-1)', marginBottom:'0.2rem' }}>{gap.topic}</div>
                      <div style={{ fontSize:'0.75rem', color:'var(--cos-text-3)' }}>{gap.evidence}</div>
                    </div>
                    <div style={{ flex:2, fontSize:'0.82rem', color:'var(--cos-cyan)', fontStyle:'italic' }}>→ {gap.creatorAngle}</div>
                    <button className="cos-btn-ghost cos-btn-sm" onClick={() => navigate('studio')}>Create</button>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'0.75rem', padding:'0.85rem', background:'rgba(124,58,237,0.06)', borderRadius:9, border:'1px solid rgba(124,58,237,0.12)' }}>
                <span style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Strategic Insight: </span>
                <span style={{ fontSize:'0.82rem', color:'var(--cos-text-2)' }}>{analysis.strategyInsight}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Competitor Cards */}
      <div className="cos-grid-3">
        {COMPETITORS.map(c => {
          const pc = PLATFORM_COLORS[c.platform] || '#6366F1';
          return (
            <div key={c.id} className="cos-card" style={{ padding:'1rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.75rem' }}>
                <div>
                  <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.88rem', fontWeight:600, color:'var(--cos-text-1)' }}>{c.handle}</div>
                  <div style={{ display:'flex', gap:'0.35rem', marginTop:'0.25rem' }}>
                    <span className="cos-platform-tag" style={{ background:pc+'18', color:pc, border:`1px solid ${pc}30` }}>{c.platform}</span>
                    <span className="cos-badge" style={{ color:'var(--cos-text-3)', background:'rgba(255,255,255,0.04)', border:'var(--cos-border)' }}>{c.niche}</span>
                  </div>
                </div>
                <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.7rem', color: c.growthRate > 4 ? '#F43F5E' : '#F59E0B' }}>+{c.growthRate}% growth</span>
              </div>

              {[
                { label:'Followers', val:(c.followers/1000).toFixed(0)+'K', sub:'total' },
                { label:'Avg Engagement', val:`${c.avgEngagementRate}%`, sub: c.avgEngagementRate > CREATOR_PROFILE.avgEngagementRate ? '⚠ Ahead of you' : '✓ You lead' },
                { label:'Posts/Week', val: c.weeklyPostCount, sub:'cadence' },
              ].map(m => (
                <div key={m.label} style={{ display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid var(--cos-border)' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--cos-text-2)' }}>{m.label}</span>
                  <div style={{ textAlign:'right' }}>
                    <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.78rem', color:'var(--cos-text-1)', fontWeight:600 }}>{m.val}</span>
                    <span style={{ fontSize:'0.62rem', color: m.sub?.includes('Ahead') ? '#F59E0B' : m.sub?.includes('lead') ? '#10B981' : 'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)', display:'block' }}>{m.sub}</span>
                  </div>
                </div>
              ))}

              {/* Top content */}
              <div style={{ marginTop:'0.75rem' }}>
                <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.35rem' }}>Top Content This Week</div>
                {c.topContent?.slice(0,1).map((tc, i) => (
                  <div key={i} style={{ fontSize:'0.79rem', color:'var(--cos-text-2)', background:'var(--cos-bg-raised)', borderRadius:6, padding:'0.45rem 0.65rem' }}>
                    <span style={{ color:'var(--cos-emerald)', marginRight:4 }}>{tc.engagement}%</span>{tc.topic} <span style={{ color:'var(--cos-text-3)' }}>({tc.type})</span>
                  </div>
                ))}
              </div>

              {/* Gap tags */}
              {c.contentGaps?.length > 0 && (
                <div style={{ marginTop:'0.75rem' }}>
                  <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-amber)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.35rem' }}>Their Gaps (Your Opportunity)</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem' }}>
                    {c.contentGaps.slice(0,2).map(g => (
                      <span key={g} className="cos-badge" style={{ color:'var(--cos-amber)', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', fontSize:'0.62rem' }}>{g}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Benchmarking Table */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Swords size={13} className="cos-indigo" />
          <span className="cos-card-hd-title">Benchmarking — You vs Competitors</span>
        </div>
        <div className="cos-table-wrap">
          <table className="cos-table">
            <thead>
              <tr><th>Creator</th><th>Platform</th><th>Followers</th><th>Avg Engagement</th><th>Posts/Week</th><th>Growth Rate</th></tr>
            </thead>
            <tbody>
              <tr style={{ background:'rgba(124,58,237,0.06)' }}>
                <td style={{ color:'var(--cos-violet-lt)', fontWeight:700 }}>YOU ({CREATOR_PROFILE.handle})</td>
                <td><span className="cos-platform-tag">{CREATOR_PROFILE.primaryPlatform}</span></td>
                <td style={{ fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-1)' }}>{(CREATOR_PROFILE.totalFollowers/1000).toFixed(0)}K</td>
                <td style={{ fontFamily:'var(--cos-font-mono)', color:'var(--cos-emerald)' }}>{CREATOR_PROFILE.avgEngagementRate}%</td>
                <td style={{ fontFamily:'var(--cos-font-mono)' }}>5</td>
                <td style={{ fontFamily:'var(--cos-font-mono)', color:'var(--cos-emerald)' }}>+{CREATOR_PROFILE.followersGrowthRate}%</td>
              </tr>
              {COMPETITORS.map(c => {
                const pc = PLATFORM_COLORS[c.platform] || '#6366F1';
                return (
                  <tr key={c.id}>
                    <td style={{ color:'var(--cos-text-1)' }}>{c.handle}</td>
                    <td><span className="cos-platform-tag" style={{ background:pc+'18', color:pc, border:`1px solid ${pc}30` }}>{c.platform}</span></td>
                    <td style={{ fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-2)' }}>{(c.followers/1000).toFixed(0)}K</td>
                    <td style={{ fontFamily:'var(--cos-font-mono)', color: c.avgEngagementRate > CREATOR_PROFILE.avgEngagementRate ? '#F43F5E' : '#10B981' }}>{c.avgEngagementRate}%</td>
                    <td style={{ fontFamily:'var(--cos-font-mono)' }}>{c.weeklyPostCount}</td>
                    <td style={{ fontFamily:'var(--cos-font-mono)', color: c.growthRate > CREATOR_PROFILE.followersGrowthRate ? '#F43F5E' : '#10B981' }}>+{c.growthRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collab Opportunity Matcher */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Swords size={13} className="cos-emerald" />
          <span className="cos-card-hd-title">Collab Opportunity Matcher</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {COLLAB_OPPORTUNITIES.map((opp, i) => {
            const pc = PLATFORM_COLORS[opp.platform] || '#6366F1';
            return (
              <div key={i} style={{ background:'var(--cos-bg-raised)', border:'1px solid var(--cos-border)', borderRadius:10, padding:'1rem', display:'flex', alignItems:'flex-start', gap:'1rem' }}>
                <div style={{ background:opp.compatibility > 80 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border:`1px solid ${opp.compatibility > 80 ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`, borderRadius:9, padding:'0.5rem 0.7rem', textAlign:'center', flexShrink:0 }}>
                  <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'1.2rem', fontWeight:800, color: opp.compatibility > 80 ? '#10B981' : '#F59E0B', lineHeight:1 }}>{opp.compatibility}%</div>
                  <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.52rem', color:'var(--cos-text-3)' }}>MATCH</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.25rem' }}>
                    <span style={{ fontFamily:'var(--cos-font-mono)', fontWeight:600, color:'var(--cos-text-1)' }}>{opp.handle}</span>
                    <span className="cos-platform-tag" style={{ background:pc+'18', color:pc, border:`1px solid ${pc}30` }}>{opp.platform}</span>
                  </div>
                  <p style={{ fontSize:'0.8rem', color:'var(--cos-text-2)', lineHeight:1.5, marginBottom:'0.5rem' }}>{opp.rationale}</p>
                  <div style={{ background:'rgba(124,58,237,0.08)', borderRadius:7, padding:'0.45rem 0.75rem', fontSize:'0.8rem', color:'var(--cos-violet-lt)', marginBottom:'0.4rem' }}>
                    💡 {opp.suggestedFormat}
                  </div>
                  <div style={{ fontSize:'0.72rem', color:'var(--cos-emerald)', fontFamily:'var(--cos-font-mono)' }}>Expected: {opp.expectedReachLift}</div>
                </div>
                <button className="cos-btn-ghost cos-btn-sm" onClick={() => navigate('copilot')}>Plan</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
