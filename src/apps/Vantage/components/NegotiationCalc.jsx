import React, { useState, useEffect } from 'react';
import { DollarSign, Calculator } from 'lucide-react';
import { calculateNegotiationFloor } from '../utils/rateCalculator.js';

const NICHES    = ['Technology', 'Finance', 'Health & Wellness', 'Fashion & Beauty', 'Gaming', 'Food & Lifestyle', 'Travel', 'Education', 'Fitness', 'Entertainment', 'Business', 'Other'];
const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'LinkedIn'];
const CONTENT_TYPES = {
  Instagram: ['reel', 'post', 'story'],
  YouTube: ['video', 'short'],
  TikTok: ['video'],
  'Twitter/X': ['post'],
  LinkedIn: ['post'],
};

export default function NegotiationCalc({ prefillMetrics }) {
  const [platform, setPlatform] = useState(prefillMetrics?.platform || 'Instagram');
  const [niche, setNiche] = useState(prefillMetrics?.niche || 'Technology');
  const [followers, setFollowers] = useState(prefillMetrics?.followers || '');
  const [engagement, setEngagement] = useState(prefillMetrics?.engagementRate || '');
  const [contentType, setContentType] = useState('reel');
  const [usageMonths, setUsageMonths] = useState(3);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (prefillMetrics?.platform) { setPlatform(prefillMetrics.platform); }
    if (prefillMetrics?.niche)    { setNiche(prefillMetrics.niche); }
    if (prefillMetrics?.followers)     { setFollowers(prefillMetrics.followers); }
    if (prefillMetrics?.engagementRate) { setEngagement(prefillMetrics.engagementRate); }
  }, [prefillMetrics]);

  const contentOpts = CONTENT_TYPES[platform] || ['post'];

  const calc = () => {
    const r = calculateNegotiationFloor({
      platform, niche,
      followers:     parseInt(followers) || 0,
      engagementRate: parseFloat(engagement) || 0,
      contentType,
      usageRightsMonths: usageMonths,
    });
    setResult(r);
  };

  return (
    <div className="v-calc-grid">
      {/* Inputs */}
      <div className="v-card">
        <div className="v-card-hd">
          <Calculator size={13} className="v-indigo" />
          <span className="v-card-hd-title">Rate Parameters</span>
        </div>

        <div className="v-field-row" style={{ marginBottom: '0.85rem' }}>
          <div className="v-field">
            <label>Platform</label>
            <select value={platform} onChange={e => { setPlatform(e.target.value); setContentType(CONTENT_TYPES[e.target.value][0]); }}>
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="v-field">
            <label>Content Type</label>
            <select value={contentType} onChange={e => setContentType(e.target.value)}>
              {contentOpts.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="v-field" style={{ marginBottom: '0.85rem' }}>
          <label>Niche</label>
          <select value={niche} onChange={e => setNiche(e.target.value)}>
            {NICHES.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>

        <div className="v-field-row" style={{ marginBottom: '0.85rem' }}>
          <div className="v-field">
            <label>Followers</label>
            <input type="number" value={followers} placeholder="250000"
              onChange={e => setFollowers(e.target.value)} />
          </div>
          <div className="v-field">
            <label>Engagement %</label>
            <input type="number" step="0.1" value={engagement} placeholder="4.2"
              onChange={e => setEngagement(e.target.value)} />
          </div>
        </div>

        <div className="v-field" style={{ marginBottom: '1.5rem' }}>
          <label>
            Usage Rights:{' '}
            <strong style={{ color: 'var(--v-indigo-lt)' }}>{usageMonths === 0 ? 'None' : `${usageMonths} months`}</strong>
          </label>
          <input type="range" min={0} max={12} value={usageMonths}
            onChange={e => setUsageMonths(parseInt(e.target.value))}
            className="v-slider" />
          <div className="v-slider-labels"><span>None</span><span>6 mo</span><span>12 mo</span></div>
        </div>

        <button className="v-btn-primary v-btn-full" onClick={calc}>
          <DollarSign size={16} />
          Calculate My Rate
        </button>
      </div>

      {/* Results */}
      {result ? (
        <div className="v-card">
          <div className="v-card-hd">
            <DollarSign size={13} className="v-emerald" />
            <span className="v-card-hd-title">Negotiation Floor</span>
          </div>

          <div className="v-rate-hero">
            <span className="v-rate-tag">Your Negotiation Range</span>
            <div className="v-rate-range">
              <span className="v-rate-floor">${result.negotiation_range.floor.toLocaleString()}</span>
              <span className="v-rate-dash">—</span>
              <span className="v-rate-ceil">${result.negotiation_range.ceiling.toLocaleString()}</span>
            </div>
            <span className="v-rate-note">
              Recommended Rate: <strong>${result.total_recommended_rate.toLocaleString()}</strong>
            </span>
          </div>

          <div className="v-breakdown">
            <div className="v-bd-row">
              <span>Base Rate (CPM $10)</span>
              <span className="v-bd-val">${result.base_rate.toLocaleString()}</span>
            </div>
            <div className="v-bd-row">
              <span>Engagement Multiplier</span>
              <span className="v-bd-val">{result.engagement_factor}×</span>
            </div>
            <div className="v-bd-row v-highlight">
              <span>Adjusted Base</span>
              <span className="v-bd-val">${result.breakdown.adjusted_base.toLocaleString()}</span>
            </div>
            <div className="v-bd-row">
              <span>Niche Premium ({result.breakdown.niche_premium_rate})</span>
              <span className="v-bd-val">+${result.niche_premium.toLocaleString()}</span>
            </div>
            <div className="v-bd-row">
              <span>Usage Rights ({result.breakdown.usage_surcharge_rate})</span>
              <span className="v-bd-val">+${result.usage_surcharge.toLocaleString()}</span>
            </div>
            <div className="v-bd-row v-total">
              <span>Total Rate Floor</span>
              <span className="v-bd-val">${result.total_recommended_rate.toLocaleString()}</span>
            </div>
          </div>

          <div className="v-tip">
            Never accept below <strong>${result.negotiation_range.floor.toLocaleString()}</strong>. Open negotiations at <strong>${result.negotiation_range.ceiling.toLocaleString()}</strong> to leave room to close in your favor.
          </div>
        </div>
      ) : (
        <div className="v-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', minHeight: '300px' }}>
          <DollarSign size={48} style={{ color: 'var(--v-text-3)' }} />
          <p style={{ color: 'var(--v-text-3)', fontSize: '0.875rem', textAlign: 'center' }}>
            Configure parameters and click Calculate to see your negotiation floor.
          </p>
        </div>
      )}
    </div>
  );
}
