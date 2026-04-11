import React, { useState } from 'react';
import { Wand2, Loader2, AlertCircle, Copy, CheckCheck, ChevronDown } from 'lucide-react';
import { generateContent } from '../creatorAgent.js';

const TONE_OPTIONS  = ['Educational', 'Entertaining', 'Controversial', 'Inspirational', 'Storytelling', 'Casual'];
const GOAL_OPTIONS  = ['Grow followers', 'Sell a product', 'Build authority', 'Drive traffic', 'Spark discussion'];

const PLATFORM_ICONS = {
  instagram: '📸', youtube: '▶️', tiktok: '🎵', linkedin: '💼', twitter: '🐦'
};

export default function ContentStudio({ apiKey, CREATOR_PROFILE, navigate }) {
  const [idea,     setIdea]     = useState('');
  const [tone,     setTone]     = useState('Educational');
  const [goal,     setGoal]     = useState('Grow followers');
  const [content,  setContent]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [copied,   setCopied]   = useState('');
  const [expanded, setExpanded] = useState({ instagram:true, youtube:false, tiktok:false, linkedin:false, twitter:false });

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    if (!apiKey) { setError('Enter API Key in sidebar.'); return; }
    setLoading(true); setError(null); setContent(null);
    try { setContent(await generateContent(idea, tone, CREATOR_PROFILE.niche, goal, apiKey)); }
    catch(e) { setError(e.message); } finally { setLoading(false); }
  };

  const copy = (text, id) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(()=>setCopied(''), 2000); };
  const toggle = (key) => setExpanded(e => ({ ...e, [key]: !e[key] }));

  const PLATFORMS = [
    { key:'instagram', label:'Instagram', color:'#E1306C',  icon:'📸' },
    { key:'youtube',   label:'YouTube',  color:'#FF0000',  icon:'▶️' },
    { key:'tiktok',    label:'TikTok',   color:'#69C9D0',  icon:'🎵' },
    { key:'linkedin',  label:'LinkedIn', color:'#0A66C2',  icon:'💼' },
    { key:'twitter',   label:'Twitter/X', color:'#1DA1F2', icon:'🐦' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Content Studio</h2>
          <p className="cos-section-sub">One idea → 5 platform-optimized formats. AI-powered multi-platform adaptation.</p>
        </div>
      </div>

      {/* Input */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Wand2 size={13} className="cos-violet" />
          <span className="cos-card-hd-title">Your Idea</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div className="cos-field">
            <label>Raw Content Idea</label>
            <textarea
              placeholder='e.g. "5 AI tools that replaced my entire video editing workflow — tools that save me 10+ hours a week"'
              value={idea}
              onChange={e => setIdea(e.target.value)}
              rows={3}
            />
          </div>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <div className="cos-field" style={{ flex:1, minWidth:150 }}>
              <label>Tone</label>
              <select value={tone} onChange={e=>setTone(e.target.value)}>
                {TONE_OPTIONS.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="cos-field" style={{ flex:1, minWidth:150 }}>
              <label>Content Goal</label>
              <select value={goal} onChange={e=>setGoal(e.target.value)}>
                {GOAL_OPTIONS.map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div style={{ alignSelf:'flex-end' }}>
              <button className="cos-btn-primary" onClick={handleGenerate} disabled={loading||!idea.trim()}>
                {loading ? <Loader2 size={15} className="cos-spin-icon"/> : <Wand2 size={15}/>}
                {loading ? 'Adapting for 5 platforms...' : 'Generate for All Platforms'}
              </button>
            </div>
          </div>
        </div>
        {error && <div className="cos-alert error" style={{ marginTop:'0.75rem' }}><AlertCircle size={15}/> {error}</div>}
        {loading && (
          <div className="cos-loading" style={{ marginTop:'1rem' }}>
            <div className="cos-pulse"/>
            <span>Adapting your idea for Instagram · YouTube · TikTok · LinkedIn · Twitter/X...</span>
          </div>
        )}
      </div>

      {/* Core Message */}
      {content?.coreMessage && (
        <div style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.25)', borderRadius:12, padding:'1rem 1.25rem', animation:'cos-fadein 0.4s ease-out' }}>
          <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-violet-lt)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem' }}>Core Message</div>
          <p style={{ fontFamily:'var(--cos-font-head)', fontSize:'1rem', fontWeight:600, color:'var(--cos-text-1)' }}>{content.coreMessage}</p>
        </div>
      )}

      {/* Platform Outputs */}
      {content && (
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', animation:'cos-fadein 0.5s ease-out' }}>
          {PLATFORMS.map(({ key, label, color, icon }) => {
            const p = content[key];
            if (!p) return null;
            const isOpen = expanded[key];
            return (
              <div key={key} style={{ background:'var(--cos-bg-2)', border:`1px solid ${isOpen ? color+'40' : 'var(--cos-border)'}`, borderRadius:14, overflow:'hidden', transition:'all var(--cos-transition)' }}>
                {/* Platform header */}
                <button
                  onClick={() => toggle(key)}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.9rem 1.25rem', background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}
                >
                  <span style={{ fontSize:'1.1rem' }}>{icon}</span>
                  <span style={{ fontFamily:'var(--cos-font-head)', fontWeight:700, color, fontSize:'0.95rem' }}>{label}</span>
                  <span style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'0.35rem' }}>
                    <span className="cos-badge" style={{ color:'var(--cos-text-3)', background:'rgba(255,255,255,0.04)', border:'1px solid var(--cos-border)', fontSize:'0.6rem' }}>
                      {isOpen ? 'Collapse' : 'View Content'}
                    </span>
                    <ChevronDown size={16} style={{ color:'var(--cos-text-3)', transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform var(--cos-transition)' }} />
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding:'0 1.25rem 1.25rem', borderTop:`1px solid ${color}25`, paddingTop:'1rem' }}>
                    {/* Instagram */}
                    {key === 'instagram' && <>
                      <ContentField label="Hook" value={p.hook} copyId="ig-hook" copied={copied} onCopy={copy} />
                      <ContentField label="Caption" value={p.caption} copyId="ig-cap" copied={copied} onCopy={copy} />
                      {p.storyBeats && (<div style={{ marginTop:'0.75rem' }}>
                        <div className="cos-output-label">Story Beats</div>
                        {p.storyBeats.map((b,i) => <div key={i} style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', padding:'0.25rem 0', borderBottom:'1px solid var(--cos-border)' }}>{i+1}. {b}</div>)}
                      </div>)}
                      <HashtagRow tags={p.hashtags} copied={copied} onCopy={copy} />
                    </>}

                    {/* YouTube */}
                    {key === 'youtube' && <>
                      <ContentField label="Video Title" value={p.title} copyId="yt-title" copied={copied} onCopy={copy} />
                      <ContentField label="First 15-Second Hook Script" value={p.hook} copyId="yt-hook" copied={copied} onCopy={copy} />
                      <ContentField label="Description" value={p.description} copyId="yt-desc" copied={copied} onCopy={copy} />
                      <HashtagRow tags={p.tags} copied={copied} onCopy={copy} />
                    </>}

                    {/* TikTok */}
                    {key === 'tiktok' && <>
                      <ContentField label="Opening Hook (3-sec spoken)" value={p.hook} copyId="tt-hook" copied={copied} onCopy={copy} />
                      {p.scriptOutline && (<div style={{ marginTop:'0.75rem' }}>
                        <div className="cos-output-label">Script Outline</div>
                        {p.scriptOutline.map((s,i) => <div key={i} style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', padding:'0.25rem 0', borderBottom:'1px solid var(--cos-border)' }}>{i+1}. {s}</div>)}
                      </div>)}
                      {p.soundSuggestion && <div style={{ marginTop:'0.75rem', fontSize:'0.8rem', color:'var(--cos-cyan)', background:'rgba(6,182,212,0.08)', borderRadius:7, padding:'0.5rem 0.75rem', border:'1px solid rgba(6,182,212,0.15)' }}>🎵 Sound: {p.soundSuggestion}</div>}
                    </>}

                    {/* LinkedIn */}
                    {key === 'linkedin' && <>
                      <ContentField label="Opening Line" value={p.openingLine} copyId="li-hook" copied={copied} onCopy={copy} />
                      <ContentField label="Post Body" value={p.body} copyId="li-body" copied={copied} onCopy={copy} />
                      {p.cta && <div style={{ marginTop:'0.75rem', fontSize:'0.8rem', color:'var(--cos-emerald)', background:'rgba(16,185,129,0.08)', borderRadius:7, padding:'0.5rem 0.75rem', border:'1px solid rgba(16,185,129,0.15)' }}>CTA: {p.cta}</div>}
                    </>}

                    {/* Twitter/X */}
                    {key === 'twitter' && (
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                        {[p.tweet1,p.tweet2,p.tweet3,p.tweet4,p.tweet5].filter(Boolean).map((tw,i) => (
                          <div key={i} style={{ background:'var(--cos-bg-raised)', borderRadius:8, padding:'0.75rem 0.9rem', border:'1px solid var(--cos-border)' }}>
                            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.3rem' }}>
                              <span style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)' }}>{i+1}/{[p.tweet1,p.tweet2,p.tweet3,p.tweet4,p.tweet5].filter(Boolean).length}</span>
                              <button className="cos-copy-btn" onClick={()=>copy(tw,`tw${i}`)}>{copied===`tw${i}`?<CheckCheck size={9}/>:<Copy size={9}/>} Copy</button>
                            </div>
                            <p style={{ fontSize:'0.83rem', color:'var(--cos-text-1)', lineHeight:1.5 }}>{tw}</p>
                          </div>
                        ))}
                        <button className="cos-btn-ghost" style={{ marginTop:'0.25rem' }} onClick={()=>copy([p.tweet1,p.tweet2,p.tweet3,p.tweet4,p.tweet5].filter(Boolean).join('\n\n'),'tw-all')}>
                          {copied==='tw-all'?<CheckCheck size={13}/>:<Copy size={13}/>} Copy Entire Thread
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ContentField({ label, value, copyId, copied, onCopy }) {
  if (!value) return null;
  return (
    <div style={{ marginTop:'0.75rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.35rem' }}>
        <span className="cos-output-label">{label}</span>
        <button className="cos-copy-btn" onClick={()=>onCopy(value, copyId)}>
          {copied===copyId?<CheckCheck size={9}/>:<Copy size={9}/>} {copied===copyId?'Copied':'Copy'}
        </button>
      </div>
      <div className="cos-output-box" style={{ padding:'0.75rem 0.9rem' }}>{value}</div>
    </div>
  );
}

function HashtagRow({ tags, copied, onCopy }) {
  if (!tags?.length) return null;
  const text = tags.join(' ');
  return (
    <div style={{ marginTop:'0.75rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.35rem' }}>
        <span className="cos-output-label">Hashtags</span>
        <button className="cos-copy-btn" onClick={()=>onCopy(text,'ht')}>
          {copied==='ht'?<CheckCheck size={9}/>:<Copy size={9}/>} Copy All
        </button>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
        {tags.map(t=><span key={t} className="cos-badge" style={{ color:'var(--cos-cyan)', background:'rgba(6,182,212,0.08)', border:'1px solid rgba(6,182,212,0.15)', fontSize:'0.68rem' }}>{t}</span>)}
      </div>
    </div>
  );
}
