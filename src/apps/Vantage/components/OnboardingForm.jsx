import React, { useState } from 'react';
import { User, Hash, TrendingUp, Tag, ArrowRight } from 'lucide-react';

const NICHES    = ['Technology', 'Finance', 'Health & Wellness', 'Fashion & Beauty', 'Gaming', 'Food & Lifestyle', 'Travel', 'Education', 'Fitness', 'Entertainment', 'Business', 'Other'];
const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'LinkedIn'];

export default function OnboardingForm({ onSubmit }) {
  const [metrics, setMetrics] = useState({
    platform: 'Instagram', niche: 'Technology',
    followers: '', engagementRate: '',
    keywords: ['', '', '', '', ''],
  });
  const [brief, setBrief] = useState('');

  const setKw = (i, v) => setMetrics(p => {
    const kws = [...p.keywords]; kws[i] = v; return { ...p, keywords: kws };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...metrics,
      followers: parseInt(metrics.followers) || 0,
      engagementRate: parseFloat(metrics.engagementRate) || 0,
      keywords: metrics.keywords.filter(Boolean),
    }, brief);
  };

  return (
    <form onSubmit={handleSubmit} className="v-form">
      <div className="v-form-2col">
        {/* Left: Influencer Profile */}
        <div className="v-form-panel">
          <div className="v-panel-hd">
            <User size={13} className="v-indigo" />
            Influencer Profile
          </div>

          <div className="v-field-row">
            <div className="v-field">
              <label>Platform</label>
              <select value={metrics.platform} onChange={e => setMetrics(p => ({ ...p, platform: e.target.value }))}>
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="v-field">
              <label>Primary Niche</label>
              <select value={metrics.niche} onChange={e => setMetrics(p => ({ ...p, niche: e.target.value }))}>
                {NICHES.map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="v-field-row">
            <div className="v-field">
              <label><TrendingUp size={11} style={{display:'inline',marginRight:4}} />Followers</label>
              <input type="number" placeholder="250,000" value={metrics.followers}
                onChange={e => setMetrics(p => ({ ...p, followers: e.target.value }))} required />
            </div>
            <div className="v-field">
              <label>Eng. Rate %</label>
              <input type="number" step="0.1" placeholder="4.2" value={metrics.engagementRate}
                onChange={e => setMetrics(p => ({ ...p, engagementRate: e.target.value }))} required />
            </div>
          </div>

          <div className="v-field">
            <label><Tag size={11} style={{display:'inline',marginRight:4}} />Audience Keywords (Top 5)</label>
            <div className="v-kw-grid">
              {metrics.keywords.map((kw, i) => (
                <input key={i} type="text" placeholder={`Keyword ${i + 1}`}
                  value={kw} onChange={e => setKw(i, e.target.value)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Brand Brief */}
        <div className="v-form-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="v-panel-hd">
            <Hash size={13} className="v-emerald" />
            Brand Campaign Brief
          </div>

          <div className="v-field" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label>Paste the brand's deal summary or campaign brief</label>
            <textarea
              value={brief}
              onChange={e => setBrief(e.target.value)}
              required
              className="v-brief-area"
              placeholder={`Example:
Brand: TechFlow Pro
Product: Productivity SaaS — project management tool

Target Audience: Young professionals 25–35, productivity enthusiasts
Deliverable: 1 Instagram Reel (60s) + 3 Stories
Budget Offered: $2,500 flat fee
Usage: 6-month digital advertising rights
Timeline: Post within 30 days of signing`}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="v-btn-primary v-btn-full">
        <TrendingUp size={17} />
        <span>Run Fit Analysis</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
