import React, { useState } from 'react';
import { FileText, Zap, Shield, Loader2, AlertCircle } from 'lucide-react';
import { preScreenContract } from '../utils/contractParser.js';
import { scanContract } from '../vantageAgent.js';
import { RiskCard } from './DealDashboard.jsx';

export default function ContractScanner({ apiKey }) {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doQuickScan = () => {
    if (!text.trim()) return;
    const findings = preScreenContract(text);
    const sorted = findings.sort((a, b) => {
      const o = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
      return (o[a.risk_level] ?? 4) - (o[b.risk_level] ?? 4);
    });
    setResults(sorted);
    setError(null);
  };

  const doAiScan = async () => {
    if (!text.trim()) return;
    if (!apiKey) { setError('Enter your Gemini API Key in the header to use AI Deep Scan.'); return; }
    setLoading(true); setError(null); setResults(null);
    try {
      const res = await scanContract(text, apiKey);
      const sorted = (res.clauses || []).sort((a, b) => {
        const o = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        return (o[a.risk_level] ?? 4) - (o[b.risk_level] ?? 4);
      });
      setResults(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const critical = (results || []).filter(r => r.risk_level === 'CRITICAL').length;
  const high     = (results || []).filter(r => r.risk_level === 'HIGH').length;

  return (
    <div className="v-scanner">
      <div className="v-card">
        <div className="v-card-hd">
          <FileText size={13} className="v-indigo" />
          <span className="v-card-hd-title">Contract Text</span>
        </div>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="v-contract-ta"
          rows={11}
          placeholder={`Paste full contract or specific clauses to analyze...

Example clause:
"The Influencer hereby grants Brand a perpetual, irrevocable, royalty-free, worldwide license to use, reproduce, modify, distribute, and display the Content in any and all media formats now known or hereafter devised, including but not limited to paid digital advertising, without further compensation to the Influencer..."`}
        />

        <div className="v-scan-actions" style={{ marginTop: '1rem' }}>
          <button className="v-btn-ghost" onClick={doQuickScan} disabled={!text.trim()}>
            <Zap size={15} />
            Quick Scan (Offline)
          </button>
          <button className="v-btn-primary" onClick={doAiScan} disabled={loading || !text.trim()}>
            {loading ? <Loader2 size={15} className="v-spin-icon" /> : <Shield size={15} />}
            {loading ? 'Scanning...' : 'AI Deep Scan'}
          </button>
        </div>

        {error && (
          <div className="v-error" style={{ marginTop: '1rem' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}
      </div>

      {results && results.length > 0 && (
        <div className="v-section-gap">
          {/* Summary */}
          <div className="v-risk-summary">
            <div className="v-risk-counter" style={{ borderColor: critical > 0 ? 'rgba(244,63,94,0.3)' : undefined }}>
              <span className="v-rc-num" style={{ color: '#F43F5E' }}>{critical}</span>
              <span className="v-rc-label">Critical</span>
            </div>
            <div className="v-risk-counter" style={{ borderColor: high > 0 ? 'rgba(249,115,22,0.3)' : undefined }}>
              <span className="v-rc-num" style={{ color: '#F97316' }}>{high}</span>
              <span className="v-rc-label">High Risk</span>
            </div>
            <div className="v-risk-counter">
              <span className="v-rc-num" style={{ color: '#6366F1' }}>{results.length}</span>
              <span className="v-rc-label">Total Flags</span>
            </div>
          </div>

          <div className="v-cards-list">
            {results.map((c, i) => <RiskCard key={i} clause={c} />)}
          </div>
        </div>
      )}

      {results && results.length === 0 && (
        <div className="v-clean-state">
          <Shield size={44} style={{ color: '#10B981' }} />
          <p>No red flags detected. Standard legal review recommended before signing.</p>
        </div>
      )}
    </div>
  );
}
