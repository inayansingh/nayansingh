import React, { useState } from 'react';
import { TrendingUp, FileText, Calculator, BarChart2, Shield, CheckCircle2, AlertTriangle, Clock, Plus, ArrowUpRight } from 'lucide-react';

// Sample deal pipeline data for the portfolio demo
const SAMPLE_DEALS = [
  { id: 1,  brand: 'TechFlow Pro',     platform: 'Instagram', niche: 'Technology',    score: 84, rate: 2400,  status: 'ACCEPTED',   date: 'Mar 28' },
  { id: 2,  brand: 'GreenLife Co.',    platform: 'TikTok',    niche: 'Health & Wellness', score: 71, rate: 1800,  status: 'NEGOTIATING', date: 'Mar 27' },
  { id: 3,  brand: 'PixelAura',        platform: 'YouTube',   niche: 'Gaming',        score: 58, rate: 3200,  status: 'REJECTED',   date: 'Mar 25' },
  { id: 4,  brand: 'FinFlow Capital',  platform: 'LinkedIn',  niche: 'Finance',       score: 91, rate: 5100,  status: 'ACCEPTED',   date: 'Mar 22' },
  { id: 5,  brand: 'StyleNova',        platform: 'Instagram', niche: 'Fashion & Beauty', score: 67, rate: 1200, status: 'NEGOTIATING', date: 'Mar 20' },
];

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

export default function VantageDashboard({ onNavigate }) {
  const accepted    = SAMPLE_DEALS.filter(d => d.status === 'ACCEPTED').length;
  const avgScore    = Math.round(SAMPLE_DEALS.reduce((a, d) => a + d.score, 0) / SAMPLE_DEALS.length);
  const avgRate     = Math.round(SAMPLE_DEALS.reduce((a, d) => a + d.rate, 0) / SAMPLE_DEALS.length);
  const totalValue  = SAMPLE_DEALS.filter(d => d.status === 'ACCEPTED').reduce((a, d) => a + d.rate, 0);

  return (
    <div className="vd-dashboard">
      {/* Header Row */}
      <div className="vd-dash-header">
        <div>
          <h2 className="vd-dash-title">Command Center</h2>
          <p className="vd-dash-sub">Brand deal intelligence overview — {SAMPLE_DEALS.length} deals tracked</p>
        </div>
        <button className="v-btn-primary" onClick={() => onNavigate('deal')} style={{ padding: '0.6rem 1.2rem', fontSize: '0.82rem' }}>
          <Plus size={15} /> Analyze New Deal
        </button>
      </div>

      {/* Stats Row */}
      <div className="vd-stats-grid">
        <StatCard label="Deals Accepted"     value={accepted}                 sub="of 5 analyzed"       color="#10B981" Icon={CheckCircle2} />
        <StatCard label="Avg Fit Score"      value={`${avgScore}/100`}        sub="brand alignment"     color="#6366F1" Icon={TrendingUp}   />
        <StatCard label="Avg Floor Rate"     value={`$${avgRate.toLocaleString()}`} sub="per deal"      color="#F59E0B" Icon={BarChart2}    />
        <StatCard label="Portfolio Value"    value={`$${totalValue.toLocaleString()}`} sub="accepted deals" color="#06B6D4" Icon={ArrowUpRight} />
      </div>

      {/* Deal Pipeline Table */}
      <div className="v-card" style={{ marginBottom: '1.5rem' }}>
        <div className="v-card-hd">
          <FileText size={13} className="v-indigo" />
          <span className="v-card-hd-title">Deal Pipeline</span>
          <span className="vd-badge-count">{SAMPLE_DEALS.length} deals</span>
        </div>

        <div className="vd-table-wrap">
          <table className="vd-table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Platform</th>
                <th>Niche</th>
                <th>Fit Score</th>
                <th>Floor Rate</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_DEALS.map(d => {
                const sc = STATUS_CFG[d.status];
                return (
                  <tr key={d.id}>
                    <td className="vd-brand-cell"><strong>{d.brand}</strong></td>
                    <td><span className="vd-platform-tag">{d.platform}</span></td>
                    <td className="vd-muted">{d.niche}</td>
                    <td><ScoreBar score={d.score} /></td>
                    <td className="vd-rate-cell">${d.rate.toLocaleString()}</td>
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

      {/* Bottom Row: Activity + Tips */}
      <div className="vd-bottom-grid">
        {/* Recent Activity */}
        <div className="v-card">
          <div className="v-card-hd">
            <Clock size={13} className="v-indigo" />
            <span className="v-card-hd-title">Recent Activity</span>
          </div>
          <div className="vd-activity-list">
            {[
              { icon: CheckCircle2, color: '#10B981', text: 'FinFlow Capital deal accepted — $5,100', time: '2 days ago' },
              { icon: Shield,       color: '#F43F5E', text: 'Perpetuity clause flagged in PixelAura contract', time: '4 days ago' },
              { icon: TrendingUp,   color: '#6366F1', text: 'TechFlow Pro scored 84/100 fit score', time: '1 day ago' },
              { icon: AlertTriangle,color: '#F59E0B', text: 'GreenLife Co. under negotiation — counter at $2,100', time: '3 days ago' },
              { icon: Calculator,   color: '#06B6D4', text: 'StyleNova rate floor calculated — $1,020 floor', time: '9 days ago' },
            ].map((a, i) => {
              const Icon = a.icon;
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
            {[
              { platform: 'Instagram', deals: 2, share: 40, color: '#E1306C' },
              { platform: 'LinkedIn',  deals: 1, share: 20, color: '#0A66C2' },
              { platform: 'TikTok',    deals: 1, share: 20, color: '#69C9D0' },
              { platform: 'YouTube',   deals: 1, share: 20, color: '#FF0000' },
            ].map(p => (
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
                { id: 'deal', label: 'Analyze Deal', icon: TrendingUp, color: '#6366F1' },
                { id: 'contract', label: 'Scan Contract', icon: Shield, color: '#F43F5E' },
                { id: 'rate', label: 'Calc Rate', icon: Calculator, color: '#10B981' },
              ].map(q => {
                const Icon = q.icon;
                return (
                  <button key={q.id} className="vd-quick-btn" onClick={() => onNavigate(q.id)}
                    style={{ '--q-color': q.color }}>
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
