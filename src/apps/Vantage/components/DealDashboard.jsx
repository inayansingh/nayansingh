import React, { useEffect, useRef } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, AlertCircle } from 'lucide-react';

const VERDICT_CFG = {
  ACCEPT:    { color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)', label: 'Accept Deal — Strong Brand Alignment Detected', Icon: CheckCircle2 },
  NEGOTIATE: { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', label: 'Negotiate Terms — Conditional Approval', Icon: AlertTriangle },
  REJECT:    { color: '#F43F5E', bg: 'rgba(244,63,94,0.08)',  border: 'rgba(244,63,94,0.3)',  label: 'Reject Deal — Insufficient Brand-Audience Fit', Icon: XCircle },
};

const RISK_CFG = {
  CRITICAL: { color: '#F43F5E', bg: 'rgba(244,63,94,0.06)',  border: 'rgba(244,63,94,0.25)' },
  HIGH:     { color: '#F97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.25)' },
  MEDIUM:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)' },
  LOW:      { color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.25)' },
};

function FitScoreGauge({ score }) {
  const fillRef = useRef(null);
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const clamp = Math.max(0, Math.min(100, score || 0));
  const offset = circumference - (clamp / 100) * circumference;
  const color = clamp >= 75 ? '#10B981' : clamp >= 50 ? '#F59E0B' : '#F43F5E';

  useEffect(() => {
    if (fillRef.current) {
      /* Start from full offset, then animate to final */
      fillRef.current.style.strokeDashoffset = circumference;
      requestAnimationFrame(() => {
        fillRef.current.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease';
        fillRef.current.style.strokeDashoffset = offset;
        fillRef.current.style.stroke = color;
        fillRef.current.style.filter = `drop-shadow(0 0 10px ${color}88)`;
      });
    }
  }, [score]);

  return (
    <div className="v-gauge-wrap">
      <svg className="v-gauge-svg" viewBox="0 0 200 200">
        <circle className="v-gauge-track" cx="100" cy="100" r={radius} />
        <circle
          ref={fillRef}
          className="v-gauge-fill"
          cx="100" cy="100"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          stroke={color}
        />
      </svg>
      <div className="v-gauge-center">
        <span className="v-score-big" style={{ color }}>{clamp}</span>
        <span className="v-score-sub">Fit Score</span>
      </div>
    </div>
  );
}

export default function DealDashboard({ analysisResult, influencerMetrics }) {
  if (!analysisResult) return null;
  const { score, verdict, reasoning, top_alignment_factors } = analysisResult;
  const vc = VERDICT_CFG[verdict] || VERDICT_CFG.NEGOTIATE;
  const Icon = vc.Icon;

  return (
    <div style={{ animation: 'v-slide-in 0.4s ease-out' }}>
      {/* Verdict Banner */}
      <div className="v-verdict-banner" style={{ background: vc.bg, borderColor: vc.border }}>
        <Icon size={22} className="v-verdict-icon" style={{ color: vc.color }} />
        <span className="v-verdict-text" style={{ color: vc.color }}>{vc.label}</span>
        <span className="v-verdict-score-tag v-muted">Score: {score}/100</span>
      </div>

      {/* Main Grid */}
      <div className="v-dash-grid">
        {/* Score Card */}
        <div className="v-card v-score-card">
          <div className="v-card-hd">
            <TrendingUp size={13} className="v-indigo" />
            <span className="v-card-hd-title">Brand-Audience Fit</span>
          </div>
          <FitScoreGauge score={score} />

          <div className="v-factors">
            <p className="v-factors-label">Alignment Factors</p>
            {(top_alignment_factors || []).map((f, i) => (
              <div key={i} className="v-factor">
                <span className="v-factor-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="v-card v-reasoning-card">
          <div className="v-card-hd">
            <span className="v-muted" style={{ fontFamily: 'var(--v-font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em' }}>VANTAGE / ANALYSIS</span>
          </div>
          <p className="v-reasoning-body">{reasoning}</p>

          <div className="v-meta-strip">
            <div className="v-meta-item">
              <span className="v-meta-label">Platform</span>
              <span className="v-meta-val indigo">{influencerMetrics?.platform}</span>
            </div>
            <div className="v-meta-item">
              <span className="v-meta-label">Niche</span>
              <span className="v-meta-val">{influencerMetrics?.niche}</span>
            </div>
            <div className="v-meta-item">
              <span className="v-meta-label">Engagement</span>
              <span className="v-meta-val green">{influencerMetrics?.engagementRate}%</span>
            </div>
            <div className="v-meta-item">
              <span className="v-meta-label">Followers</span>
              <span className="v-meta-val">{(influencerMetrics?.followers || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RiskCard({ clause }) {
  const cfg = RISK_CFG[clause.risk_level] || RISK_CFG.MEDIUM;

  return (
    <div className="v-risk-card" style={{ background: cfg.bg, borderColor: cfg.border }}>
      <div className="v-risk-hd">
        <span className="v-risk-badge" style={{ color: cfg.color, background: cfg.color + '18', borderColor: cfg.border }}>
          {clause.risk_level}
        </span>
        {(clause.label || clause.clause_label) && (
          <span className="v-risk-title">{clause.label || clause.clause_label}</span>
        )}
      </div>
      {clause.clause_text && (
        <blockquote className="v-clause-quote">{clause.clause_text}</blockquote>
      )}
      <p className="v-plain-text">
        <strong>What this means: </strong>{clause.plain_english}
      </p>
      <div className="v-action-row">
        <span className="v-action-label">Recommended Action</span>
        <p className="v-action-text">{clause.recommended_action}</p>
      </div>
    </div>
  );
}
