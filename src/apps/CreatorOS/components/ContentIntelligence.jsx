import React, { useState } from 'react';
import { FileText, Loader2, AlertCircle, Copy, CheckCheck, RefreshCw, Zap } from 'lucide-react';
import { analyzeContentDNA, analyzeHooks } from '../creatorAgent.js';
import { calcEngagementQualityScore, calcFakeEngagementProbability, calcContentFatigue, PLATFORM_COLORS, scoreGrade } from '../utils/metrics.js';
import { HOOK_CLUSTERS } from '../utils/mockData.js';

const CONTENT_TYPES = [...new Set(['reel','carousel','video','post','thread','short','story','tweet'])];

export default function ContentIntelligence({ apiKey, POSTS, CREATOR_PROFILE }) {
  const [dna, setDna]           = useState(null);
  const [dnaLoading, setDna_]   = useState(false);
  const [dnaError, setDnaErr]   = useState(null);
  const [hooks, setHooks]       = useState(null);
  const [hooksLoading, setHL]   = useState(false);
  const [hooksError, setHE]     = useState(null);
  const [repurposeId, setRid]   = useState('');
  const [fatigue, setFatigue]   = useState(null);

  const topPosts = [...POSTS].sort((a,b) => b.engagementRate - a.engagementRate);

  const handleDNA = async () => {
    if (!apiKey) { setDnaErr('Enter API Key in sidebar.'); return; }
    setDna_(true); setDnaErr(null); setDna(null);
    try { setDna(await analyzeContentDNA(POSTS, apiKey)); }
    catch(e) { setDnaErr(e.message); }
    finally { setDna_(false); }
  };

  const handleHooks = async () => {
    if (!apiKey) { setHE('Enter API Key in sidebar.'); return; }
    setHL(true); setHE(null); setHooks(null);
    try { setHooks(await analyzeHooks(HOOK_CLUSTERS, apiKey)); }
    catch(e) { setHE(e.message); }
    finally { setHL(false); }
  };

  const handleFatigue = (type) => {
    const score = calcContentFatigue(POSTS, type);
    setFatigue({ type, score, status: score > 60 ? 'FATIGUED' : score > 30 ? 'WARNING' : 'HEALTHY' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Content Intelligence</h2>
          <p className="cos-section-sub">Post performance, content DNA, hook lab, and fatigue detection</p>
        </div>
      </div>

      {/* Post Performance Table */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <FileText size={13} className="cos-violet" />
          <span className="cos-card-hd-title">Post Performance</span>
          <span className="cos-badge" style={{ marginLeft:'auto', color:'var(--cos-violet-lt)', background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.15)' }}>{POSTS.length} posts</span>
        </div>
        <div className="cos-table-wrap">
          <table className="cos-table">
            <thead>
              <tr>
                <th>Hook</th><th>Platform</th><th>Type</th>
                <th>Engagement</th><th>EQS</th><th>Sentiment</th><th>Fake Eng</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map(p => {
                const eqs = calcEngagementQualityScore(p);
                const fake = calcFakeEngagementProbability(p);
                const { grade, color } = scoreGrade(eqs);
                const pc = PLATFORM_COLORS[p.platform] || '#6366F1';
                const sentColor = p.sentimentScore > 0.6 ? '#10B981' : p.sentimentScore > 0.3 ? '#F59E0B' : '#F43F5E';
                return (
                  <tr key={p.id}>
                    <td style={{ maxWidth: 260, color:'var(--cos-text-1)', fontWeight: 500 }}>
                      <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {p.hook?.slice(0, 50) || p.caption?.slice(0, 50) || '—'}
                      </div>
                    </td>
                    <td><span className="cos-platform-tag" style={{ background: pc+'18', color: pc, border:`1px solid ${pc}30` }}>{p.platform}</span></td>
                    <td><span style={{ fontSize:'0.68rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>{p.type}</span></td>
                    <td>
                      <div className="cos-score-wrap">
                        <div className="cos-score-track"><div className="cos-score-fill" style={{ width:`${Math.min(p.engagementRate * 5, 100)}%`, background: p.engagementRate > 10 ? '#10B981' : p.engagementRate > 5 ? '#7C3AED' : '#F59E0B' }} /></div>
                        <span className="cos-score-num" style={{ color: p.engagementRate > 10 ? '#10B981' : p.engagementRate > 5 ? '#7C3AED' : '#F59E0B' }}>{p.engagementRate}%</span>
                      </div>
                    </td>
                    <td><span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.75rem', color, fontWeight:600 }}>{grade} ({eqs})</span></td>
                    <td>
                      <div style={{ width: 8, height: 8, borderRadius:'50%', background: sentColor, display:'inline-block', marginRight: 4 }} />
                      <span style={{ fontSize:'0.72rem', color: sentColor, fontFamily:'var(--cos-font-mono)' }}>{(p.sentimentScore * 100).toFixed(0)}%</span>
                    </td>
                    <td>
                      {p.fakeEngagementFlag
                        ? <span className="cos-badge" style={{ color:'#F43F5E', background:'rgba(244,63,94,0.1)', border:'1px solid rgba(244,63,94,0.2)' }}>⚠ Flagged</span>
                        : <span style={{ fontSize:'0.68rem', color:'var(--cos-text-3)' }}>Clean</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Fatigue Detector + DNA + Hook Lab */}
      <div className="cos-grid-2">
        {/* Content Fatigue */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Zap size={13} className="cos-amber" />
            <span className="cos-card-hd-title">Content Fatigue Detector</span>
          </div>
          <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', marginBottom:'1rem', lineHeight:1.5 }}>
            Select a format to check if your audience is experiencing format fatigue based on engagement decline.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1rem' }}>
            {['reel','carousel','video','post','thread'].map(t => (
              <button key={t} className="cos-chip" style={{ textTransform:'capitalize' }} onClick={() => handleFatigue(t)}>{t}</button>
            ))}
          </div>
          {fatigue && (
            <div className="cos-alert" style={{ marginTop:0 }}
              style={{
                background: fatigue.status === 'FATIGUED' ? 'rgba(244,63,94,0.08)' : fatigue.status === 'WARNING' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)',
                border: `1px solid ${fatigue.status === 'FATIGUED' ? 'rgba(244,63,94,0.2)' : fatigue.status === 'WARNING' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'}`,
                borderRadius: 10, padding:'1rem'
              }}>
              <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'0.95rem', fontWeight:700,
                color: fatigue.status === 'FATIGUED' ? '#F43F5E' : fatigue.status === 'WARNING' ? '#F59E0B' : '#10B981',
                marginBottom:'0.4rem' }}>
                {fatigue.type} — {fatigue.status}
              </div>
              <div style={{ fontSize:'0.8rem', color:'var(--cos-text-2)' }}>
                Fatigue index: <strong style={{ fontFamily:'var(--cos-font-mono)' }}>{fatigue.score}/100</strong>
                {fatigue.status === 'FATIGUED' && ' — Engagement on this format has dropped significantly. Consider a temporary format switch.'}
                {fatigue.status === 'WARNING' && ' — Mild engagement decline detected. Refresh your approach or reduce posting frequency.'}
                {fatigue.status === 'HEALTHY' && ' — Format is performing well. Keep the current cadence.'}
              </div>
            </div>
          )}
        </div>

        {/* Hook Performance Lab */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Zap size={13} className="cos-cyan" />
            <span className="cos-card-hd-title">Hook Performance Lab</span>
            <button className="cos-btn-ghost cos-btn-sm" style={{ marginLeft:'auto' }} onClick={handleHooks} disabled={hooksLoading}>
              {hooksLoading ? <Loader2 size={12} className="cos-spin-icon" /> : <RefreshCw size={12} />} AI Analysis
            </button>
          </div>

          {/* Static data always visible */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.7rem', marginBottom: hooks ? '1rem' : 0 }}>
            {HOOK_CLUSTERS.map(hc => (
              <div key={hc.type} style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <span style={{ fontSize:'0.75rem', color:'var(--cos-text-2)', minWidth:130 }}>{hc.type}</span>
                <div className="cos-score-track" style={{ flex:1, height:5 }}>
                  <div className="cos-score-fill" style={{
                    width:`${hc.winRate}%`,
                    background: hc.winRate > 75 ? '#10B981' : hc.winRate > 55 ? '#7C3AED' : '#F59E0B'
                  }} />
                </div>
                <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.72rem', color:'var(--cos-text-2)', minWidth:35 }}>{hc.winRate}%</span>
                <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.68rem', color:'var(--cos-text-3)', minWidth:50 }}>{hc.avgEngagement}% avg</span>
              </div>
            ))}
          </div>

          {hooksError && <div className="cos-alert error"><AlertCircle size={15}/> {hooksError}</div>}

          {hooks && (
            <div style={{ marginTop:'0.75rem', borderTop:'1px solid var(--cos-border)', paddingTop:'0.75rem', animation:'cos-fadein 0.4s ease-out' }}>
              <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-violet-lt)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>AI Insight</div>
              <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.6, marginBottom:'0.75rem' }}>{hooks.recommendation}</p>
              <div style={{ background:'rgba(124,58,237,0.08)', borderRadius:8, padding:'0.75rem', border:'1px solid rgba(124,58,237,0.15)' }}>
                <div style={{ fontSize:'0.62rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)', marginBottom:'0.4rem' }}>WINNING TEMPLATE</div>
                <p style={{ fontSize:'0.82rem', fontStyle:'italic', color:'var(--cos-text-1)', fontFamily:'var(--cos-font-mono)' }}>"{hooks.nextHookTemplate}"</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content DNA */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <FileText size={13} className="cos-violet" />
          <span className="cos-card-hd-title">Content DNA Map</span>
          <button className="cos-btn-primary cos-btn-sm" style={{ marginLeft:'auto' }} onClick={handleDNA} disabled={dnaLoading}>
            {dnaLoading ? <Loader2 size={13} className="cos-spin-icon" /> : <Zap size={13} />}
            {dnaLoading ? 'Analyzing...' : 'Analyze My DNA'}
          </button>
        </div>

        {dnaError && <div className="cos-alert error"><AlertCircle size={15}/> {dnaError}</div>}

        {!dna && !dnaLoading && (
          <div style={{ textAlign:'center', padding:'2rem', color:'var(--cos-text-3)', fontSize:'0.85rem' }}>
            Click "Analyze My DNA" to generate your unique content style fingerprint using AI.
          </div>
        )}
        {dnaLoading && <div className="cos-loading"><div className="cos-pulse"/><span>Mapping your content DNA across all posts...</span></div>}

        {dna && (
          <div className="cos-grid-2" style={{ animation:'cos-fadein 0.4s ease-out' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div>
                <div style={{ fontSize:'0.63rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem' }}>Primary Tone</div>
                <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'1.1rem', fontWeight:700, color:'var(--cos-violet-lt)' }}>{dna.primaryTone}</div>
              </div>
              <div>
                <div style={{ fontSize:'0.63rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem' }}>Narrative Patterns</div>
                {dna.narrativePatterns?.map((p,i) => (
                  <div key={i} style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', padding:'0.3rem 0', borderBottom:'1px solid var(--cos-border)' }}>· {p}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize:'0.63rem', fontFamily:'var(--cos-font-mono)', color:'#10B981', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem' }}>Strengths</div>
                {dna.contentStrengths?.map((s,i) => (
                  <div key={i} style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', padding:'0.3rem 0' }}>✓ {s}</div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div>
                <div style={{ fontSize:'0.63rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>Unique Voice</div>
                <p style={{ fontSize:'0.88rem', color:'var(--cos-text-1)', lineHeight:1.7, fontStyle:'italic' }}>"{dna.uniqueVoice}"</p>
              </div>
              <div>
                <div style={{ fontSize:'0.63rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-amber)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem' }}>Weaknesses</div>
                {dna.contentWeaknesses?.map((w,i) => (
                  <div key={i} style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', padding:'0.3rem 0' }}>⚠ {w}</div>
                ))}
              </div>
              <div style={{ background:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.15)', borderRadius:10, padding:'0.85rem' }}>
                <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-violet-lt)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.4rem' }}>90-Day Evolution</div>
                <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.6 }}>{dna.recommendedEvolution}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
