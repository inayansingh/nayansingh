import React, { useState } from 'react';
import { Users, Radio, TrendingUp, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { heatmapColor, PLATFORM_COLORS } from '../utils/metrics.js';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function AudienceAnalytics({ AUDIENCE, navigate }) {
  const [activePersona, setActivePersona] = useState(null);

  const { demographics, personas, personaDrift, silentFollowers, interests, activeHours } = AUDIENCE;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Audience Analytics</h2>
          <p className="cos-section-sub">Demographics, persona drift, audience mood, and silent follower conversion</p>
        </div>
      </div>

      {/* Persona Drift Alert */}
      {personaDrift.detected && (
        <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.22)', borderRadius:12, padding:'1rem 1.25rem', display:'flex', alignItems:'flex-start', gap:'1rem', animation:'cos-fadein 0.4s ease-out' }}>
          <span style={{ fontSize:'1.2rem' }}>⚠️</span>
          <div>
            <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'0.95rem', fontWeight:700, color:'#F59E0B', marginBottom:'0.25rem' }}>
              Audience Persona Drift Detected ({personaDrift.confidence}% confidence)
            </div>
            <p style={{ fontSize:'0.83rem', color:'var(--cos-text-2)', lineHeight:1.6, marginBottom:'0.5rem' }}>
              <strong style={{ color:'var(--cos-text-1)' }}>Shifting from:</strong> {personaDrift.from} → <strong style={{ color:'var(--cos-text-1)' }}>towards:</strong> {personaDrift.to}
            </p>
            <p style={{ fontSize:'0.82rem', color:'var(--cos-text-2)', lineHeight:1.6 }}>{personaDrift.alert}</p>
            <button className="cos-btn-ghost cos-btn-sm" style={{ marginTop:'0.5rem' }} onClick={() => navigate('strategy')}>
              <ChevronRight size={12} /> Build Realignment Strategy
            </button>
          </div>
        </div>
      )}

      {/* Demographics + Interests */}
      <div className="cos-grid-2">
        {/* Demographics */}
        <div className="cos-card">
          <div className="cos-card-hd">
            <Users size={13} className="cos-violet" />
            <span className="cos-card-hd-title">Demographics</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            {/* Age */}
            <div>
              <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.6rem' }}>Age Groups</div>
              {demographics.ageGroups.map(a => (
                <div key={a.group} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.45rem' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--cos-text-2)', minWidth:50, fontFamily:'var(--cos-font-mono)' }}>{a.group}</span>
                  <div className="cos-score-track" style={{ flex:1 }}>
                    <div className="cos-score-fill" style={{ width:`${a.pct}%`, background: a.pct === Math.max(...demographics.ageGroups.map(x=>x.pct)) ? '#7C3AED' : 'rgba(124,58,237,0.4)' }} />
                  </div>
                  <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.72rem', color:'var(--cos-text-2)', minWidth:32 }}>{a.pct}%</span>
                </div>
              ))}
            </div>
            {/* Gender */}
            <div>
              <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.6rem' }}>Gender Split</div>
              <div style={{ display:'flex', borderRadius:8, overflow:'hidden', height:24 }}>
                <div style={{ width:`${demographics.genders.male}%`, background:'#6366F1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', color:'#fff', fontFamily:'var(--cos-font-mono)' }}>{demographics.genders.male}%</div>
                <div style={{ width:`${demographics.genders.female}%`, background:'#E1306C', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', color:'#fff', fontFamily:'var(--cos-font-mono)' }}>{demographics.genders.female}%</div>
                <div style={{ flex:1, background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>{demographics.genders.other}%</div>
              </div>
              <div style={{ display:'flex', gap:'1rem', marginTop:'0.4rem' }}>
                {[{ label:'Male', color:'#6366F1' }, { label:'Female', color:'#E1306C' }, { label:'Other', color:'rgba(255,255,255,0.3)' }].map(g => (
                  <div key={g.label} style={{ display:'flex', alignItems:'center', gap:'0.3rem', fontSize:'0.63rem', color:'var(--cos-text-3)' }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:g.color }} />{g.label}
                  </div>
                ))}
              </div>
            </div>
            {/* Countries */}
            <div>
              <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>Top Countries</div>
              {demographics.topCountries.map((c, i) => (
                <div key={c} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.3rem 0', borderBottom:'1px solid var(--cos-border)' }}>
                  <span style={{ fontSize:'0.7rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)', minWidth:16 }}>#{i+1}</span>
                  <span style={{ fontSize:'0.83rem', color:'var(--cos-text-1)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Interests + Silent Followers */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          <div className="cos-card">
            <div className="cos-card-hd">
              <Radio size={13} className="cos-cyan" />
              <span className="cos-card-hd-title">Audience Interests</span>
            </div>
            {interests.map(int => (
              <div key={int.label} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.55rem' }}>
                <span style={{ fontSize:'0.78rem', color:'var(--cos-text-2)', minWidth:180 }}>{int.label}</span>
                <div className="cos-score-track" style={{ flex:1 }}>
                  <div className="cos-score-fill" style={{ width:`${int.affinity}%`, background: int.affinity > 80 ? '#7C3AED' : int.affinity > 60 ? '#6366F1' : '#06B6D4' }} />
                </div>
                <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.72rem', color:'var(--cos-text-2)', minWidth:32 }}>{int.affinity}%</span>
              </div>
            ))}
          </div>

          {/* Silent Follower Converter */}
          <div className="cos-card">
            <div className="cos-card-hd">
              <TrendingUp size={13} className="cos-emerald" />
              <span className="cos-card-hd-title">Silent Follower Converter</span>
            </div>
            {/* Funnel */}
            {[
              { label:'Total Followers', value: AUDIENCE.totalFollowers, pct:100, color:'#7C3AED' },
              { label:'Active Lurkers', value: Math.round(AUDIENCE.totalFollowers * 0.81), pct:81, color:'#6366F1' },
              { label:'Occasional Engagers', value: Math.round(AUDIENCE.totalFollowers * 0.09), pct:9, color:'#06B6D4' },
              { label:'Regular Community', value: Math.round(AUDIENCE.totalFollowers * 0.10), pct:10, color:'#10B981' },
            ].map((f, i) => (
              <div key={f.label} style={{ marginBottom:'0.6rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.25rem' }}>
                  <span style={{ fontSize:'0.78rem', color:'var(--cos-text-2)' }}>{f.label}</span>
                  <span style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.72rem', color:f.color }}>{f.pct}%</span>
                </div>
                <div className="cos-score-track" style={{ height:6 }}>
                  <div className="cos-score-fill" style={{ width:`${f.pct}%`, background:f.color }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop:'0.85rem', background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:8, padding:'0.75rem' }}>
              <div style={{ fontSize:'0.62rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-emerald)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.4rem' }}>Conversion Triggers</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                {silentFollowers.conversionTriggers.map(t => (
                  <span key={t} className="cos-badge" style={{ color:'var(--cos-emerald)', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.2)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audience Personas */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Users size={13} className="cos-violet" />
          <span className="cos-card-hd-title">Audience Personas</span>
        </div>
        <div className="cos-grid-3">
          {AUDIENCE.personas.map(persona => (
            <div key={persona.id}
              onClick={() => setActivePersona(activePersona?.id === persona.id ? null : persona)}
              style={{
                background: activePersona?.id === persona.id ? 'rgba(124,58,237,0.12)' : 'var(--cos-bg-raised)',
                border: `1px solid ${activePersona?.id === persona.id ? 'var(--cos-violet)' : 'var(--cos-border)'}`,
                borderRadius: 12, padding:'1.25rem',
                cursor:'pointer', transition:'all var(--cos-transition)',
              }}>
              <div style={{ fontSize:'1.8rem', marginBottom:'0.5rem' }}>{persona.emoji}</div>
              <div style={{ fontFamily:'var(--cos-font-head)', fontSize:'0.95rem', fontWeight:700, color:'var(--cos-text-1)', marginBottom:'0.25rem' }}>{persona.name}</div>
              <div style={{ fontFamily:'var(--cos-font-mono)', fontSize:'0.7rem', color:'var(--cos-violet-lt)', marginBottom:'0.75rem' }}>{persona.size}% of audience</div>
              <div className="cos-score-track" style={{ marginBottom:'0.75rem' }}>
                <div className="cos-score-fill" style={{ width:`${persona.size}%`, background:'#7C3AED' }} />
              </div>
              <p style={{ fontSize:'0.8rem', color:'var(--cos-text-2)', lineHeight:1.5, marginBottom:'0.75rem' }}>{persona.description}</p>
              <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', marginBottom:'0.35rem', textTransform:'uppercase', letterSpacing:'0.08em' }}>Best Format</div>
              <div style={{ fontSize:'0.78rem', color:'var(--cos-cyan)' }}>{persona.bestFormat}</div>

              {activePersona?.id === persona.id && (
                <div style={{ marginTop:'0.85rem', paddingTop:'0.85rem', borderTop:'1px solid var(--cos-border)' }}>
                  <div style={{ fontSize:'0.65rem', fontFamily:'var(--cos-font-mono)', color:'var(--cos-text-3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.35rem' }}>Content Affinity</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
                    {persona.contentAffinity.map(ca => (
                      <span key={ca} className="cos-badge" style={{ color:'var(--cos-violet-lt)', background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.15)', fontSize:'0.65rem' }}>{ca}</span>
                    ))}
                  </div>
                  <button className="cos-btn-ghost cos-btn-sm" style={{ width:'100%', marginTop:'0.75rem' }} onClick={(e) => { e.stopPropagation(); navigate('copilot'); }}>
                    <ChevronRight size={12} /> Talk Strategy for this Persona
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Hours Heatmap */}
      <div className="cos-card">
        <div className="cos-card-hd">
          <Radio size={13} className="cos-indigo" />
          <span className="cos-card-hd-title">Audience Active Hours</span>
          <span style={{ marginLeft:'auto', fontSize:'0.63rem', color:'var(--cos-text-3)', fontFamily:'var(--cos-font-mono)' }}>Mon–Sun · 24h</span>
        </div>
        <div className="cos-heatmap" style={{ marginBottom:'0.4rem' }}>
          <div/>
          {HOURS.map(h => <div key={h} className="cos-hm-hour">{h%3===0?`${h}h`:''}</div>)}
        </div>
        {activeHours.map((row, di) => (
          <div key={di} className="cos-heatmap" style={{ marginBottom:3 }}>
            <div className="cos-hm-label">{DAYS[di]}</div>
            {row.map((val, hi) => (
              <div key={hi} className="cos-hm-cell" style={{ background: heatmapColor(val) }} title={`${DAYS[di]} ${hi}:00 — ${val}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
