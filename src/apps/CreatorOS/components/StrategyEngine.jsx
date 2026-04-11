import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, RefreshCw, Copy, CheckCheck } from 'lucide-react';
import { getRecommendation, buildNarrativeArc, generateCaptions, generateHooks } from '../creatorAgent.js';
import { NARRATIVE_ARC_TEMPLATE } from '../utils/mockData.js';

const GOAL_OPTIONS = [
  'Grow followers fast',
  'Launch a new product',
  'Establish authority in my niche',
  'Build community and engagement',
  'Increase brand deal opportunities',
];

const TONE_OPTIONS = ['Educational', 'Entertaining', 'Controversial', 'Inspirational', 'Storytelling'];
const HOOK_STYLES  = ['Controversial Take', 'Question / Curiosity', 'POV / Scenario', 'Shock Stat', 'Storytelling', 'How-To'];
const PLATFORMS    = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter/X'];

export default function StrategyEngine({ apiKey, CREATOR_PROFILE, AUDIENCE, TRENDS, navigate }) {
  const [rec,    setRec]    = useState(null);  const [recL,  setRecL]  = useState(false); const [recE,  setRecE]  = useState(null);
  const [arc,    setArc]    = useState(null);  const [arcL,  setArcL]  = useState(false); const [arcE,  setArcE]  = useState(null);
  const [caps,   setCaps]   = useState(null);  const [capL,  setCapL]  = useState(false); const [capE,  setCapE]  = useState(null);
  const [hks,    setHks]    = useState(null);  const [hkL,   setHkL]   = useState(false); const [hkE,   setHkE]   = useState(null);

  const [goal,      setGoal]      = useState(GOAL_OPTIONS[0]);
  const [platform,  setPlatform]  = useState('Instagram');
  const [capTopic,  setCapTopic]  = useState('');
  const [capTone,   setCapTone]   = useState('Educational');
  const [hkTopic,   setHkTopic]   = useState('');
  const [hkStyle,   setHkStyle]   = useState('Controversial Take');
  const [copied,    setCopied]    = useState('');

  const copy = (text, id) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(()=>setCopied(''), 2000); };

  const handleRec = async () => {
    if (!apiKey) { setRecE('Enter API Key in sidebar.'); return; }
    setRecL(true); setRecE(null); setRec(null);
    try { setRec(await getRecommendation(CREATOR_PROFILE, AUDIENCE, TRENDS, apiKey)); }
    catch(e) { setRecE(e.message); } finally { setRecL(false); }
  };

  const handleArc = async () => {
    if (!apiKey) { setArcE('Enter API Key in sidebar.'); return; }
    setArcL(true); setArcE(null); setArc(null);
    try { setArc(await buildNarrativeArc(CREATOR_PROFILE, goal, platform, apiKey)); }
    catch(e) { setArcE(e.message); } finally { setArcL(false); }
  };

  const handleCaps = async () => {
    if (!capTopic.trim()) return;
    if (!apiKey) { setCapE('Enter API Key in sidebar.'); return; }
    setCapL(true); setCapE(null); setCaps(null);
    try { setCaps(await generateCaptions(capTopic, capTone, platform, CREATOR_PROFILE.niche, apiKey)); }
    catch(e) { setCapE(e.message); } finally { setCapL(false); }
  };

  const handleHooks = async () => {
    if (!hkTopic.trim()) return;
    if (!apiKey) { setHkE('Enter API Key in sidebar.'); return; }
    setHkL(true); setHkE(null); setHks(null);
    try { setHks(await generateHooks(hkTopic, hkStyle, platform, apiKey)); }
    catch(e) { setHkE(e.message); } finally { setHkL(false); }
  };

  const WEEK_COLORS = ['#7C3AED','#6366F1','#F43F5E','#10B981'];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Strategy Engine</h2>
          <p className="cos-section-sub">AI recommendations, 30-day narrative arc, caption & hook generators</p>
        </div>
      </div>

      {/* What/When/How Recommendation */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Sparkles size={13} className="cos-violet" />
          <span className="cos-card-hd-title">AI Strategy Recommendation</span>
          <button className="cos-btn-primary cos-btn-sm" style={{ marginLeft:'auto' }} onClick={handleRec} disabled={recL}>
            {recL ? <Loader2 size={13} className="cos-spin-icon" /> : <Sparkles size={13}/>}
            {recL ? 'Generating...' : 'Generate for Today'}
          </button>
        </div>

        {recE && <div className="cos-alert error"><AlertCircle size={15}/> {recE}</div>}
        {recL && <div className="cos-loading"><div className="cos-pulse"/><span>Analyzing trends, audience, and your metrics...</span></div>}

        {!rec && !recL && (
          <div style={{ textAlign:'center', padding:'1.5rem', color:'var(--cos-text-3)', fontSize:'0.85rem' }}>
            Click "Generate for Today" to get a data-driven What/When/How recommendation.
          </div>
        )}

        {rec && (
          <div className="cos-grid-3" style={{ animation:'cos-fadein 0.4s ease-out', gap:'1rem' }}>
            {[
              { label:'What to Post', icon:'📌', color:'#7C3AED', content: <><div style={{ fontWeight:600, marginBottom:4 }}>{rec.what?.topic}</div><div style={{ fontSize:'0.78rem', color:'var(--cos-text-3)' }}>{rec.what?.format} · {rec.what?.angle}</div></> },
              { label:'When to Post', icon:'⏰', color:'#06B6D4', content: <><div style={{ fontWeight:600, marginBottom:4 }}>{rec.when?.day} · {rec.when?.time}</div><div style={{ fontSize:'0.78rem', color:'var(--cos-text-3)' }}>{rec.when?.reasoning}</div></> },
              { label:'How to Post', icon:'🎯', color:'#10B981', content: <><div style={{ fontWeight:600, marginBottom:4 }}>{rec.how?.tone}</div><div style={{ fontSize:'0.78rem', color:'var(--cos-text-3)', marginBottom:4 }}>{rec.how?.hookStyle}</div><div style={{ fontSize:'0.72rem', color:'var(--cos-emerald)' }}>CTA: {rec.how?.cta}</div></> },
            ].map(card => (
              <div key={card.label} style={{ background:`${card.color}10`, border:`1px solid ${card.color}30`, borderRadius:12, padding:'1rem' }}>
                <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:card.color, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>{card.icon} {card.label}</div>
                <div style={{ color:'var(--cos-text-1)', fontSize:'0.88rem', lineHeight:1.5 }}>{card.content}</div>
              </div>
            ))}
            <div style={{ gridColumn:'1/-1', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.75rem 1rem', background:'rgba(255,255,255,0.03)', borderRadius:8, border:'1px solid var(--cos-border)' }}>
              <span style={{ fontSize:'0.8rem', color:'var(--cos-text-2)' }}>Confidence Score</span>
              <span style={{ fontFamily:'var(--cos-font-head)', fontSize:'1.2rem', fontWeight:700, color: rec.confidenceScore > 75 ? '#10B981' : '#F59E0B' }}>{rec.confidenceScore}/100</span>
              <span style={{ fontSize:'0.78rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>Expected: {rec.expectedEngagement}</span>
            </div>
          </div>
        )}
      </div>

      {/* Narrative Arc Builder */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Sparkles size={13} className="cos-emerald" />
          <span className="cos-card-hd-title">30-Day Narrative Arc Builder</span>
        </div>
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'1rem', alignItems:'flex-end' }}>
          <div className="cos-field" style={{ flex:2, minWidth:200 }}>
            <label>Content Goal</label>
            <select value={goal} onChange={e=>setGoal(e.target.value)}>
              {GOAL_OPTIONS.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="cos-field" style={{ flex:1, minWidth:140 }}>
            <label>Platform</label>
            <select value={platform} onChange={e=>setPlatform(e.target.value)}>
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button className="cos-btn-primary" onClick={handleArc} disabled={arcL} style={{ alignSelf:'flex-end' }}>
            {arcL ? <Loader2 size={14} className="cos-spin-icon"/> : <Sparkles size={14}/>}
            {arcL ? 'Building Arc...' : 'Build 30-Day Arc'}
          </button>
        </div>

        {arcE && <div className="cos-alert error"><AlertCircle size={15}/> {arcE}</div>}
        {arcL && <div className="cos-loading"><div className="cos-pulse"/><span>Crafting your 30-day narrative arc...</span></div>}

        {/* Static template always visible */}
        {!arc && !arcL && (
          <div style={{ display:'flex', gap:'1rem' }}>
            {NARRATIVE_ARC_TEMPLATE.map((w, i) => (
              <div key={w.week} style={{ flex:1, borderTop:`3px solid ${w.color}`, paddingTop:'0.75rem' }}>
                <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.65rem', color:w.color, marginBottom:'0.3rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>Week {w.week}</div>
                <div style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.4 }}>{w.theme}</div>
              </div>
            ))}
          </div>
        )}

        {arc && (
          <div style={{ animation:'cos-fadein 0.4s ease-out' }}>
            <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:10, padding:'0.85rem 1rem', marginBottom:'1rem' }}>
              <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'1rem', fontWeight:700, color:'var(--cos-emerald)', marginBottom:'0.25rem' }}>{arc.arcTitle}</div>
              <p style={{ fontSize:'0.8rem', color:'var(--cos-text-2)' }}>{arc.arcObjective}</p>
            </div>
            <div style={{ display:'flex', gap:'1rem', overflowX:'auto', paddingBottom:'0.5rem' }}>
              {arc.weeks?.map((week, wi) => (
                <div key={week.week} style={{ minWidth:220, flex:'0 0 220px', background:'var(--cos-bg-raised)', border:`1px solid ${WEEK_COLORS[wi]}40`, borderTop:`3px solid ${WEEK_COLORS[wi]}`, borderRadius:12, padding:'1rem' }}>
                  <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.65rem', color:WEEK_COLORS[wi], textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.4rem' }}>Week {week.week}</div>
                  <div style={{ fontWeight:600, fontSize:'0.88rem', color:'var(--cos-text-1)', marginBottom:'0.35rem' }}>{week.theme}</div>
                  <p style={{ fontSize:'0.78rem', color:'var(--cos-text-2)', lineHeight:1.45, marginBottom:'0.75rem' }}>{week.narrative}</p>
                  <hr className="cos-divider" style={{ margin:'0.5rem 0' }}/>
                  {week.posts?.map((post, pi) => (
                    <div key={pi} style={{ padding:'0.4rem 0', borderBottom: pi < week.posts.length-1 ? '1px solid var(--cos-border)' : 'none' }}>
                      <div style={{ fontSize:'0.65rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>{post.day} · {post.format}</div>
                      <div style={{ fontSize:'0.78rem', color:'var(--cos-text-1)', fontWeight:500, marginTop:'0.15rem' }}>{post.topic}</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--cos-text-3)', fontStyle:'italic', marginTop:'0.1rem' }}>"{post.hook}"</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Caption + Hook generators side by side */}
      <div className="cos-grid-2">
        {/* Caption Generator */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Sparkles size={13} className="cos-indigo" />
            <span className="cos-card-hd-title">Caption Generator</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'0.85rem' }}>
            <div className="cos-field"><label>Post Topic</label><input placeholder="e.g. My top 5 AI productivity tools" value={capTopic} onChange={e=>setCapTopic(e.target.value)}/></div>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <div className="cos-field" style={{ flex:1 }}><label>Tone</label>
                <select value={capTone} onChange={e=>setCapTone(e.target.value)}>{TONE_OPTIONS.map(t=><option key={t}>{t}</option>)}</select>
              </div>
              <div className="cos-field" style={{ flex:1 }}><label>Platform</label>
                <select value={platform} onChange={e=>setPlatform(e.target.value)}>{PLATFORMS.map(p=><option key={p}>{p}</option>)}</select>
              </div>
            </div>
            <button className="cos-btn-primary cos-btn-full" onClick={handleCaps} disabled={capL||!capTopic.trim()}>
              {capL ? <Loader2 size={14} className="cos-spin-icon"/> : <Sparkles size={14}/>}
              {capL ? 'Generating...' : 'Generate 3 Captions'}
            </button>
          </div>
          {capE && <div className="cos-alert error"><AlertCircle size={15}/>{capE}</div>}
          {capL && <div className="cos-loading"><div className="cos-pulse"/><span>Crafting captions...</span></div>}
          {caps && (
            <div style={{ animation:'cos-fadein 0.4s ease-out', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {caps.captions?.map((c, i) => (
                <div key={i} style={{ background:'var(--cos-bg-raised)', border:'1px solid var(--cos-border)', borderRadius:9, padding:'0.85rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                    <span style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-violet-lt)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{c.style}</span>
                    <button className="cos-copy-btn" onClick={()=>copy(c.text, `cap${i}`)}>
                      {copied===`cap${i}` ? <CheckCheck size={10}/> : <Copy size={10}/>} {copied===`cap${i}` ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p style={{ fontSize:'0.83rem', color:'var(--cos-text-1)', lineHeight:1.6 }}>{c.text}</p>
                </div>
              ))}
              {caps.suggestedHashtags && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginTop:'0.25rem' }}>
                  {caps.suggestedHashtags.map(h=><span key={h} className="cos-badge" style={{ color:'var(--cos-cyan)', background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.2)', fontSize:'0.67rem' }}>{h}</span>)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hook Generator */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Sparkles size={13} className="cos-rose" />
            <span className="cos-card-hd-title">Hook Generator</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'0.85rem' }}>
            <div className="cos-field"><label>Post Topic</label><input placeholder="e.g. Why creators fail in year 2" value={hkTopic} onChange={e=>setHkTopic(e.target.value)}/></div>
            <div className="cos-field"><label>Hook Style</label>
              <select value={hkStyle} onChange={e=>setHkStyle(e.target.value)}>{HOOK_STYLES.map(s=><option key={s}>{s}</option>)}</select>
            </div>
            <button className="cos-btn-primary cos-btn-full" onClick={handleHooks} disabled={hkL||!hkTopic.trim()}>
              {hkL ? <Loader2 size={14} className="cos-spin-icon"/> : <Sparkles size={14}/>}
              {hkL ? 'Generating...' : 'Generate 3 Hooks'}
            </button>
          </div>
          {hkE && <div className="cos-alert error"><AlertCircle size={15}/>{hkE}</div>}
          {hkL && <div className="cos-loading"><div className="cos-pulse"/><span>Crafting hooks...</span></div>}
          {hks && (
            <div style={{ animation:'cos-fadein 0.4s ease-out', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {hks.hooks?.map((h, i) => {
                const isBest = hks.bestPick === h.variant;
                return (
                  <div key={i} style={{ background: isBest ? 'rgba(124,58,237,0.1)' : 'var(--cos-bg-raised)', border:`1px solid ${isBest ? 'var(--cos-violet)' : 'var(--cos-border)'}`, borderRadius:9, padding:'0.85rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                        <span style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color: isBest ? 'var(--cos-violet-lt)' : 'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Variant {h.variant}</span>
                        {isBest && <span className="cos-badge" style={{ color:'#10B981', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.2)', fontSize:'0.55rem' }}>★ BEST PICK</span>}
                      </div>
                      <button className="cos-copy-btn" onClick={()=>copy(h.text, `hk${i}`)}>
                        {copied===`hk${i}` ? <CheckCheck size={10}/> : <Copy size={10}/>} {copied===`hk${i}` ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p style={{ fontSize:'0.88rem', color:'var(--cos-text-1)', lineHeight:1.5, fontWeight: isBest ? 600 : 400 }}>"{h.text}"</p>
                    <p style={{ fontSize:'0.72rem', color:'var(--cos-text-3)', marginTop:'0.3rem', fontStyle:'italic' }}>↳ {h.mechanism}</p>
                  </div>
                );
              })}
              {hks.reasoning && (
                <div style={{ background:'rgba(124,58,237,0.06)', borderRadius:8, padding:'0.75rem', border:'1px solid rgba(124,58,237,0.12)' }}>
                  <span style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)' }}>WHY BEST PICK WINS: </span>
                  <span style={{ fontSize:'0.78rem', color:'var(--cos-text-2)' }}>{hks.reasoning}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
