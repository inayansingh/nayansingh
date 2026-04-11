import React, { useState } from 'react';
import { Shield, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { scoreBrandSafety } from '../creatorAgent.js';
import { scoreGrade } from '../utils/metrics.js';

export default function BrandCommerce({ apiKey, BRAND_SAFETY, POSTS, navigate }) {
  const [aiReport, setReport]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const handleAnalyze = async () => {
    if (!apiKey) { setError('Enter API Key in sidebar.'); return; }
    setLoading(true); setError(null); setReport(null);
    try { setReport(await scoreBrandSafety(BRAND_SAFETY, POSTS, apiKey)); }
    catch(e) { setError(e.message); } finally { setLoading(false); }
  };

  const { grade, color } = scoreGrade(BRAND_SAFETY.overallScore);

  const BREAKDOWN_LABELS = {
    language: 'Language Safety',
    topicSafety: 'Topic Safety',
    commentToxicity: 'Comment Toxicity',
    controversyHistory: 'Controversy History',
  };

  const BREAKDOWN_COLORS = {
    language: '#10B981',
    topicSafety: '#6366F1',
    commentToxicity: '#F59E0B',
    controversyHistory: '#F43F5E',
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Brand & Commerce</h2>
          <p className="cos-section-sub">Brand safety score, sponsorship readiness, and brand deal optimizer</p>
        </div>
        <button className="cos-btn-primary" onClick={handleAnalyze} disabled={loading}>
          {loading ? <Loader2 size={14} className="cos-spin-icon"/> : <Shield size={14}/>}
          {loading ? 'Analyzing...' : 'AI Brand Report'}
        </button>
      </div>

      {error && <div className="cos-alert error"><AlertCircle size={15}/> {error}</div>}

      {/* Brand Safety Score */}
      <div className="cos-grid-2">
        {/* Overall Score */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Shield size={13} className="cos-violet" />
            <span className="cos-card-hd-title">Brand Safety Score</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'2rem', marginBottom:'1.5rem' }}>
            <div style={{ textAlign:'center', background:`${color}12`, border:`3px solid ${color}`, borderRadius:'50%', width:88, height:88, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'1.8rem', fontWeight:900, color, lineHeight:1 }}>{grade}</div>
              <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.6rem', color:'var(--cos-text-3)' }}>{BRAND_SAFETY.overallScore}/100</div>
            </div>
            <div>
              <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'1.1rem', fontWeight:700, color:'var(--cos-text-1)', marginBottom:'0.25rem' }}>Sponsorship Standing: {grade}</div>
              <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.5 }}>
                {BRAND_SAFETY.overallScore >= 80
                  ? 'Strong brand safety profile. Ready for most major brand partnerships.'
                  : BRAND_SAFETY.overallScore >= 65
                  ? 'Moderate brand safety. Suitable for select brands — avoid controversial categories.'
                  : 'Brand safety needs improvement before pursuing major partnerships.'}
              </p>
            </div>
          </div>

          {/* Breakdown bars */}
          {Object.entries(BRAND_SAFETY.breakdown).map(([key, val]) => (
            <div key={key} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.6rem' }}>
              <span style={{ fontSize:'0.75rem', color:'var(--cos-text-2)', minWidth:160 }}>{BREAKDOWN_LABELS[key]}</span>
              <div className="cos-score-track" style={{ flex:1 }}>
                <div className="cos-score-fill" style={{ width:`${val}%`, background: BREAKDOWN_COLORS[key] }} />
              </div>
              <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.72rem', color: BREAKDOWN_COLORS[key], minWidth:28 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Safe vs Avoid */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          <div className="cos-card">
            <div className="cos-card-hd">
              <Shield size={13} className="cos-emerald"/>
              <span className="cos-card-hd-title">Ready for Brands</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
              {BRAND_SAFETY.safeBrands.map(b => (
                <div key={b} style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.45rem 0', borderBottom:'1px solid var(--cos-border)' }}>
                  <span style={{ color:'var(--cos-emerald)', fontSize:'0.85rem' }}>✓</span>
                  <span style={{ fontSize:'0.83rem', color:'var(--cos-text-1)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cos-card">
            <div className="cos-card-hd">
              <Shield size={13} className="cos-rose"/>
              <span className="cos-card-hd-title">Avoid for Now</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
              {BRAND_SAFETY.avoidBrands.map(b => (
                <div key={b} style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.45rem 0', borderBottom:'1px solid var(--cos-border)' }}>
                  <span style={{ color:'var(--cos-rose)', fontSize:'0.85rem' }}>✕</span>
                  <span style={{ fontSize:'0.83rem', color:'var(--cos-text-2)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flagged Posts */}
      {BRAND_SAFETY.flaggedPosts?.length > 0 && (
        <div className="cos-card">
          <div className="cos-card-hd">
            <AlertCircle size={13} className="cos-amber"/>
            <span className="cos-card-hd-title">Flagged Content</span>
            <span className="cos-badge" style={{ marginLeft:'auto', color:'var(--cos-amber)', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)' }}>{BRAND_SAFETY.flaggedPosts.length} issues</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
            {BRAND_SAFETY.flaggedPosts.map((f, i) => {
              const severity = { high:'#F43F5E', medium:'#F59E0B', low:'#6366F1' };
              return (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.85rem', background:'var(--cos-bg-raised)', borderRadius:9, padding:'0.85rem', border:`1px solid ${severity[f.severity]}25` }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:severity[f.severity], marginTop:'0.4rem', flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:severity[f.severity], textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.2rem' }}>{f.severity} severity · Post {f.id.toUpperCase()}</div>
                    <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.5 }}>{f.issue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Brand Report */}
      {loading && <div className="cos-loading"><div className="cos-pulse"/><span>Generating your brand safety report...</span></div>}
      {aiReport && (
        <div className="cos-card" style={{ animation:'cos-fadein 0.4s ease-out' }}>
          <div className="cos-card-hd">
            <Shield size={13} className="cos-violet"/>
            <span className="cos-card-hd-title">AI Brand Safety Report</span>
            {aiReport.projectedScore && (
              <span className="cos-badge" style={{ marginLeft:'auto', color:'var(--cos-emerald)', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.2)' }}>
                Projected: {aiReport.projectedScore}
              </span>
            )}
          </div>
          <p style={{ fontSize:'0.88rem', color:'var(--cos-text-1)', lineHeight:1.65, marginBottom:'1.25rem', fontStyle:'italic' }}>"{aiReport.overallAssessment}"</p>
          <div className="cos-grid-2">
            {aiReport.immediateFixes?.length > 0 && (
              <div>
                <div style={{ fontSize:'0.63rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-rose)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>Immediate Fixes</div>
                {aiReport.immediateFixes.map((fix, i) => (
                  <div key={i} style={{ display:'flex', gap:'0.4rem', fontSize:'0.82rem', color:'var(--cos-text-2)', marginBottom:'0.35rem' }}>
                    <span style={{ color:'var(--cos-rose)', flexShrink:0 }}>→</span> {fix}
                  </div>
                ))}
              </div>
            )}
            <div>
              <div style={{ fontSize:'0.63rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-violet-lt)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>30-Day Plan</div>
              <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.65 }}>{aiReport.thirtyDayPlan}</p>
            </div>
          </div>
        </div>
      )}

      {/* Brand Deal Optimizer — Preview */}
      <div className="cos-card" style={{ border:'1px dashed rgba(255,255,255,0.1)', background:'var(--cos-bg)' }}>
        <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
          <div style={{ width:48, height:48, borderRadius:12, background:'rgba(124,58,237,0.12)', border:'1px solid rgba(124,58,237,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontSize:'1.4rem' }}>💰</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--cos-font-head)', fontWeight:700, color:'var(--cos-text-1)', marginBottom:'0.25rem' }}>Brand Deal Optimizer</div>
            <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.5 }}>
              Suggest best-fit brands based on your niche and score, predict ROI, recommend deal structure (flat fee / CPM / revenue share).
            </p>
          </div>
          <div style={{ flexShrink:0 }}>
            <span className="cos-badge" style={{ color:'var(--cos-violet-lt)', background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.2)', padding:'0.3rem 0.75rem' }}>Coming Soon</span>
          </div>
        </div>
        <button className="cos-btn-ghost" style={{ marginTop:'0.85rem', width:'100%' }} onClick={() => navigate('copilot')}>
          <ChevronRight size={14}/> Discuss Brand Deals with AI Copilot now
        </button>
      </div>
    </div>
  );
}
