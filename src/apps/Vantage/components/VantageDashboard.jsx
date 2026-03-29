import React, { useState } from 'react';
import { TrendingUp, FileText, Calculator, BarChart2, Shield, CheckCircle2, AlertTriangle, Clock, Plus, ArrowUpRight, Trash2 } from 'lucide-react';

// Fallback demo data shown only when no real deals have been saved yet
const DEMO_DEALS = [
  { id: 'd1', brand: 'TechFlow Pro',     platform: 'Instagram', niche: 'Technology',    score: 84, rate: 2400,  verdict: 'ACCEPT',    date: 'Demo' },
  { id: 'd2', brand: 'GreenLife Co.',    platform: 'TikTok',    niche: 'Health & Wellness', score: 71, rate: 1800, verdict: 'NEGOTIATE', date: 'Demo' },
  { id: 'd3', brand: 'PixelAura',        platform: 'YouTube',   niche: 'Gaming',        score: 58, rate: 3200,  verdict: 'REJECT',    date: 'Demo' },
  { id: 'd4', brand: 'FinFlow Capital',  platform: 'LinkedIn',  niche: 'Finance',       score: 91, rate: 5100,  verdict: 'ACCEPT',    date: 'Demo' },
  { id: 'd5', brand: 'StyleNova',        platform: 'Instagram', niche: 'Fashion & Beauty', score: 67, rate: 1200, verdict: 'NEGOTIATE', date: 'Demo' },
];

const VERDICT_MAP = { ACCEPT: 'ACCEPTED', NEGOTIATE: 'NEGOTIATING', REJECT: 'REJECTED' };

const STATUS_CFG = {
  ACCEPTED:    { color: '#10B981', bg: 'rgba(16,185,129,0.12)',  label: '✓ Accepted' },
  NEGOTIATING: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: '⇄ Negotiating' },
  REJECTED:    { color: '#F43F5E', bg: 'rgba(244,63,94,0.12)',  label: '✕ Rejected' },
};

function StatCard({ label, value, sub, color, Icon }) {
  return (
    <div className="vd-stat-card">
      <div className="vd-stat-icon" style={{ background: color + '18', color }}>
        <Icon size={18} />
      </div>
      <div className="vd-stat-body">
        <span className="vd-stat-value" style={{ color }}>{value}</span>
        <span className="vd-stat-label">{label}</span>
        {sub && <span className="vd-stat-sub">{sub}</span>}
      </div>
    </div>
  );
}

function ScoreBar({ score }) {
  const color = score >= 75 ? '#10B981' : score >= 55 ? '#F59E0B' : '#F43F5E';
  return (
    <div className="vd-score-bar-wrap">
      <div className="vd-score-bar-track">
        <div className="vd-score-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="vd-score-num" style={{ color }}>{score}</span>
    </div>
  );
}

export default function VantageDashboard({ onNavigate, deals: realDeals, onClearAll }) {
  const isDemo   = realDeals.length === 0;
  const deals    = isDemo ? DEMO_DEALS : realDeals;

  // Normalise status field from both data shapes
  const status = (d) => {
    if (d.status) return d.status;
    return VERDICT_MAP[d.verdict] || 'NEGOTIATING';
  };

  const accepted   = deals.filter(d => status(d) === 'ACCEPTED').length;
  const avgScore   = Math.round(deals.reduce((a, d) => a + d.score, 0) / deals.length);
  const rateDeals  = deals.filter(d => d.rate);
  const avgRate    = rateDeals.length ? Math.round(rateDeals.reduce((a, d) => a + d.rate, 0) / rateDeals.length) : 0;
  const totalValue = deals.filter(d => status(d) === 'ACCEPTED' && d.rate).reduce((a, d) => a + d.rate, 0);

  // Live platform breakdown from real data
  const platformCounts = {};
  deals.forEach(d => { platformCounts[d.platform] = (platformCounts[d.platform] || 0) + 1; });
  const platformColors = { Instagram: '#E1306C', YouTube: '#FF0000', TikTok: '#69C9D0', 'Twitter/X': '#1DA1F2', LinkedIn: '#0A66C2' };
  const platforms = Object.entries(platformCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([p, count]) => ({ platform: p, deals: count, share: Math.round((count / deals.length) * 100), color: platformColors[p] || '#6366F1' }));

  // Recent activity from real deals (last 5)
  const recentActivity = isDemo
    ? [
        { Icon: CheckCircle2, color: '#10B981', text: 'FinFlow Capital deal accepted — $5,100', time: '2 days ago' },
        { Icon: Shield,       color: '#F43F5E', text: 'Perpetuity clause flagged in PixelAura contract', time: '4 days ago' },
        { Icon: TrendingUp,   color: '#6366F1', text: 'TechFlow Pro scored 84/100 fit score', time: '1 day ago' },
        { Icon: AlertTriangle,color: '#F59E0B', text: 'GreenLife Co. under negotiation', time: '3 days ago' },
        { Icon: Calculator,   color: '#06B6D4', text: 'StyleNova rate floor calculated', time: '9 days ago' },
      ]
    : realDeals.slice(0, 5).map(d => ({
        Icon: d.verdict === 'ACCEPT' ? CheckCircle2 : d.verdict === 'REJECT' ? Shield : AlertTriangle,
        color: d.verdict === 'ACCEPT' ? '#10B981' : d.verdict === 'REJECT' ? '#F43F5E' : '#F59E0B',
        text: `${d.brand} — scored ${d.score}/100 (${d.verdict})${d.rate ? ` · $${d.rate.toLocaleString()} floor` : ''}`,
        time: d.date,
      }));

  return (
    <div className="vd-dashboard">
      {/* Header Row */}
      <div className="vd-dash-header">
        <div>
          <h2 className="vd-dash-title">Command Center</h2>
          <p className="vd-dash-sub">
            {isDemo
              ? '⚠ Demo data — run a Deal Analysis to populate your real pipeline'
              : `Brand deal intelligence — ${deals.length} deal${deals.length !== 1 ? 's' : ''} tracked`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {!isDemo && (
            <button className="v-btn-ghost" onClick={onClearAll}
              style={{ padding: '0.55rem 1rem', fontSize: '0.78rem', color: 'var(--v-rose)', borderColor: 'rgba(244,63,94,0.25)' }}>
              <Trash2 size={14} /> Clear History
            </button>
          )}
          <button className="v-btn-primary" onClick={() => onNavigate('deal')} style={{ padding: '0.6rem 1.2rem', fontSize: '0.82rem' }}>
            <Plus size={15} /> Analyze New Deal
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="vd-stats-grid">
        <StatCard label="Deals Accepted"  value={accepted}                        sub={`of ${deals.length} analyzed`}   color="#10B981" Icon={CheckCircle2} />
        <StatCard label="Avg Fit Score"   value={`${avgScore}/100`}               sub="brand alignment"                  color="#6366F1" Icon={TrendingUp}   />
        <StatCard label="Avg Floor Rate"  value={avgRate ? `$${avgRate.toLocaleString()}` : '—'} sub="per deal"         color="#F59E0B" Icon={BarChart2}    />
        <StatCard label="Portfolio Value" value={totalValue ? `$${totalValue.toLocaleString()}` : '—'} sub="accepted deals" color="#06B6D4" Icon={ArrowUpRight} />
      </div>

      {/* Deal Pipeline Table */}
      <div className="v-card" style={{ marginBottom: '1.5rem' }}>
        <div className="v-card-hd">
          <FileText size={13} className="v-indigo" />
          <span className="v-card-hd-title">Deal Pipeline</span>
          {isDemo && <span className="vd-demo-pill">DEMO</span>}
          <span className="vd-badge-count">{deals.length} deals</span>
        </div>

        <div className="vd-table-wrap">
          <table className="vd-table">
            <thead>
              <tr>
                <th>Brand</th><th>Platform</th><th>Niche</th>
                <th>Fit Score</th><th>Floor Rate</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {deals.map(d => {
                const st = status(d);
                const sc = STATUS_CFG[st];
                return (
                  <tr key={d.id}>
                    <td className="vd-brand-cell"><strong>{d.brand}</strong></td>
                    <td><span className="vd-platform-tag">{d.platform}</span></td>
                    <td className="vd-muted">{d.niche}</td>
                    <td><ScoreBar score={d.score} /></td>
                    <td className="vd-rate-cell">{d.rate ? `$${d.rate.toLocaleString()}` : '—'}</td>
                    <td>
                      <span className="vd-status-badge" style={{ color: sc.color, background: sc.bg }}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="vd-muted vd-date">{d.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="vd-bottom-grid">
        {/* Recent Activity */}
        <div className="v-card">
          <div className="v-card-hd">
            <Clock size={13} className="v-indigo" />
            <span className="v-card-hd-title">Recent Activity</span>
            {isDemo && <span className="vd-demo-pill">DEMO</span>}
          </div>
          <div className="vd-activity-list">
            {recentActivity.map((a, i) => {
              const Icon = a.Icon;
              return (
                <div key={i} className="vd-activity-row">
                  <Icon size={15} style={{ color: a.color, flexShrink: 0 }} />
                  <div className="vd-activity-text">
                    <span>{a.text}</span>
                    <span className="vd-activity-time">{a.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="v-card">
          <div className="v-card-hd">
            <BarChart2 size={13} className="v-emerald" />
            <span className="v-card-hd-title">Platform Breakdown</span>
          </div>
          <div className="vd-platform-list">
            {platforms.map(p => (
              <div key={p.platform} className="vd-platform-row">
                <span className="vd-platform-name">{p.platform}</span>
                <div className="vd-bar-track">
                  <div className="vd-bar-fill" style={{ width: `${p.share}%`, background: p.color + 'cc' }} />
                </div>
                <span className="vd-platform-count">{p.deals}</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--v-border)' }}>
            <p className="vd-quick-label">Quick Access</p>
            <div className="vd-quick-actions">
              {[
                { id: 'deal',     label: 'Analyze Deal',    icon: TrendingUp, color: '#6366F1' },
                { id: 'contract', label: 'Scan Contract',   icon: Shield,     color: '#F43F5E' },
                { id: 'rate',     label: 'Calc Rate',       icon: Calculator, color: '#10B981' },
                { id: 'email',    label: 'Draft Email',     icon: FileText,   color: '#F59E0B' },
              ].map(q => {
                const Icon = q.icon;
                return (
                  <button key={q.id} className="vd-quick-btn" onClick={() => onNavigate(q.id)}>
                    <Icon size={14} style={{ color: q.color }} />
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


