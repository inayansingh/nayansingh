import React, { useState } from 'react';
import { Radio, TrendingUp, AlertCircle, ChevronRight, Zap } from 'lucide-react';
import { viralityColor, LIFECYCLE_CFG, PLATFORM_COLORS } from '../utils/metrics.js';
import { VIRAL_WINDOWS } from '../utils/mockData.js';

export default function SocialListening({ TRENDS, COMPETITORS, POSTS, navigate }) {
  const [selectedPost, setSelectedPost] = useState(POSTS[0]);

  const newTrends    = TRENDS.filter(t => !t.creatorHasTouched);
  const emergingTrends = TRENDS.filter(t => t.lifecycleStage === 'emerging');

  // Comment sentiment replay mock arcs
  const sentimentArc = [
    { period: '0-2h',  joy:30, excitement:45, neutral:20, frustration:5,  anger:0  },
    { period: '2-24h', joy:42, excitement:38, neutral:15, frustration:4,  anger:1  },
    { period: 'Day 2', joy:48, excitement:30, neutral:17, frustration:4,  anger:1  },
    { period: 'Day 7', joy:55, excitement:22, neutral:20, frustration:2,  anger:1  },
  ];

  const emotionColors = { joy:'#10B981', excitement:'#7C3AED', neutral:'#6366F1', frustration:'#F59E0B', anger:'#F43F5E' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Social Listening</h2>
          <p className="cos-section-sub">Trend tracking, viral windows, keyword monitor, and comment sentiment replay</p>
        </div>
        <div className="cos-badge" style={{ color:'#F43F5E', background:'rgba(244,63,94,0.1)', border:'1px solid rgba(244,63,94,0.2)', fontSize:'0.7rem', padding:'0.3rem 0.75rem' }}>
          {newTrends.length} untouched trends
        </div>
      </div>

      {/* Viral Moment Windows */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Zap size={13} className="cos-amber" />
          <span className="cos-card-hd-title">Viral Moment Windows</span>
          <span className="cos-badge" style={{ marginLeft:'auto', color:'var(--cos-amber)', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)' }}>Next 7 days</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {VIRAL_WINDOWS.map(vw => (
            <div key={vw.id} style={{ display:'flex', alignItems:'flex-start', gap:'1rem', background:'var(--cos-bg-raised)', border:'1px solid var(--cos-border)', borderRadius:10, padding:'1rem' }}>
              <div style={{ background:`rgba(245,158,11,0.1)`, border:'1px solid rgba(245,158,11,0.2)', borderRadius:8, padding:'0.4rem 0.6rem', textAlign:'center', flexShrink:0 }}>
                <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'1.1rem', fontWeight:700, color:'#F59E0B', lineHeight:1 }}>{vw.relevanceScore}</div>
                <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.55rem', color:'var(--cos-text-3)' }}>RELEVANT</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, color:'var(--cos-text-1)', fontSize:'0.88rem', marginBottom:'0.25rem' }}>{vw.event}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)', marginBottom:'0.35rem' }}>Window: {vw.window.start} → {vw.window.end}</div>
                <p style={{ fontSize:'0.8rem', color:'var(--cos-text-2)', lineHeight:1.5 }}>{vw.suggestedAngle}</p>
              </div>
              <button className="cos-btn-ghost cos-btn-sm" style={{ flexShrink:0 }} onClick={() => navigate('studio')}>
                Create <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Feed */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <TrendingUp size={13} className="cos-violet" />
          <span className="cos-card-hd-title">Trend Feed</span>
          <span className="cos-badge" style={{ marginLeft:'auto', color:'var(--cos-violet-lt)', background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.15)' }}>{TRENDS.length} trends tracked</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {TRENDS.map(t => {
            const lc = LIFECYCLE_CFG[t.lifecycleStage];
            const vc = viralityColor(t.viralityScore);
            return (
              <div key={t.id} className="cos-trend-card">
                {/* Virality score */}
                <div style={{ background: vc+'18', border:`1px solid ${vc}30`, borderRadius:8, padding:'0.4rem 0.55rem', textAlign:'center', flexShrink:0 }}>
                  <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'1rem', fontWeight:700, color:vc, lineHeight:1 }}>{t.viralityScore}</div>
                  <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.52rem', color:'var(--cos-text-3)' }}>VIRAL</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.25rem', flexWrap:'wrap' }}>
                    <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.82rem', fontWeight:600, color:'var(--cos-text-1)' }}>{t.hashtag}</span>
                    <span className="cos-badge" style={{ color:lc.color, background:lc.bg, border:`1px solid ${lc.color}30`, fontSize:'0.6rem' }}>{lc.label}</span>
                    {!t.creatorHasTouched && (
                      <span className="cos-badge" style={{ color:'#F43F5E', background:'rgba(244,63,94,0.1)', border:'1px solid rgba(244,63,94,0.2)', fontSize:'0.6rem' }}>🔔 You haven't touched this</span>
                    )}
                  </div>
                  <div style={{ fontSize:'0.78rem', color:'var(--cos-text-2)', marginBottom:'0.35rem' }}>{t.keyword} · {t.trendType} · {t.platform}</div>
                  {/* Sentiment mini bars */}
                  <div style={{ display:'flex', gap:'0.6rem' }}>
                    {[
                      { label:'Pos', val:t.sentimentBreakdown.positive, color:'#10B981' },
                      { label:'Neu', val:t.sentimentBreakdown.neutral,  color:'#6366F1' },
                      { label:'Neg', val:t.sentimentBreakdown.negative, color:'#F43F5E' },
                    ].map(s => (
                      <div key={s.label} style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                        <div style={{ width:s.val/3, height:4, borderRadius:2, background:s.color, maxWidth:40 }} />
                        <span style={{ fontSize:'0.6rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>{s.val}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flexShrink:0, textAlign:'right' }}>
                  <div style={{ fontSize:'0.65rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)', marginBottom:'0.2rem' }}>Peak ~{t.peakPredicted?.slice(5)}</div>
                  {!t.creatorHasTouched && (
                    <button className="cos-btn-ghost cos-btn-sm" onClick={() => navigate('studio')}>Create</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyword Monitor Table */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Radio size={13} className="cos-cyan" />
          <span className="cos-card-hd-title">Keyword Monitor</span>
        </div>
        <div className="cos-table-wrap">
          <table className="cos-table">
            <thead>
              <tr><th>Keyword</th><th>Platform</th><th>Mentions/Day</th><th>Sentiment</th><th>Trend</th><th>Action</th></tr>
            </thead>
            <tbody>
              {TRENDS.map(t => {
                const lc = LIFECYCLE_CFG[t.lifecycleStage];
                const sentDir = t.lifecycleStage === 'emerging' ? '↑' : t.lifecycleStage === 'peaking' ? '→' : '↓';
                const sentColor = t.lifecycleStage === 'emerging' ? '#10B981' : t.lifecycleStage === 'peaking' ? '#F59E0B' : '#F43F5E';
                return (
                  <tr key={t.id}>
                    <td style={{ color:'var(--cos-text-1)', fontWeight:500, fontFamily:'var(--cos-font-mono)', fontSize:'0.8rem' }}>{t.hashtag}</td>
                    <td><span className="cos-platform-tag">{t.platform}</span></td>
                    <td style={{ fontFamily:'var(--cos-font-mono)', color:'var(--cos-cyan)' }}>{Math.round(t.viralityScore * 120).toLocaleString()}</td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background: t.sentimentBreakdown.positive > 60 ? '#10B981' : '#F59E0B' }} />
                        <span style={{ fontSize:'0.72rem', color:'var(--cos-text-2)' }}>{t.sentimentBreakdown.positive > 60 ? 'Positive' : 'Mixed'}</span>
                      </div>
                    </td>
                    <td><span style={{ color:sentColor, fontFamily:'var(--cos-font-mono)', fontSize:'0.8rem' }}>{sentDir} {lc.label}</span></td>
                    <td>
                      <button className="cos-btn-ghost cos-btn-sm" onClick={() => navigate('studio')}>Create</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comment Sentiment Replay */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Radio size={13} className="cos-emerald" />
          <span className="cos-card-hd-title">Comment Sentiment Replay</span>
          <span style={{ marginLeft:'auto', fontSize:'0.65rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>Select a post to see emotion arc over time</span>
        </div>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
          {POSTS.slice(0,6).map(p => (
            <button key={p.id} className={`cos-chip ${selectedPost?.id === p.id ? 'active' : ''}`} onClick={() => setSelectedPost(p)} style={{ fontSize:'0.68rem' }}>
              {p.platform} · {p.hook?.slice(0,30)}...
            </button>
          ))}
        </div>

        {selectedPost && (
          <div style={{ animation:'cos-fadein 0.3s ease-out' }}>
            <div style={{ fontWeight:600, color:'var(--cos-text-1)', fontSize:'0.85rem', marginBottom:'1rem' }}>
              <span className="cos-platform-tag" style={{ marginRight:'0.5rem' }}>{selectedPost.platform}</span>
              {selectedPost.hook?.slice(0,60)}...
            </div>

            {/* Timeline bars */}
            {sentimentArc.map((arc, i) => (
              <div key={i} style={{ marginBottom:'1.1rem' }}>
                <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', marginBottom:'0.4rem', textTransform:'uppercase', letterSpacing:'0.08em' }}>{arc.period}</div>
                <div style={{ display:'flex', height:16, borderRadius:4, overflow:'hidden', gap:1 }}>
                  {Object.entries(emotionColors).map(([emotion, color]) => (
                    <div key={emotion} style={{ flex: arc[emotion], background:color + 'cc', transition:'flex 0.6s ease' }} title={`${emotion}: ${arc[emotion]}%`} />
                  ))}
                </div>
                <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.3rem', flexWrap:'wrap' }}>
                  {Object.entries(emotionColors).map(([em, col]) => (
                    <span key={em} style={{ fontSize:'0.6rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>
                      <span style={{ color:col }}>■</span> {em} {arc[em]}%
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
