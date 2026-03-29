import React, { useState } from 'react';
import { Mail, Loader2, Copy, CheckCheck, AlertCircle, ChevronDown } from 'lucide-react';
import { generateResponse } from '../vantageAgent.js';

export default function EmailGenerator({ deals, apiKey }) {
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [result, setResult]         = useState(null);
  const [copied, setCopied]         = useState(false);

  const selectedDeal = deals.find(d => String(d.id) === selectedId);

  const handleGenerate = async () => {
    if (!selectedDeal) return;
    if (!apiKey) { setError('Enter your Gemini API Key in the sidebar to generate email drafts.'); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const summary = `Brand: ${selectedDeal.brand}\nPlatform: ${selectedDeal.platform}\nNiche: ${selectedDeal.niche}\nBrief: ${selectedDeal.brief}`;
      const res = await generateResponse(summary, selectedDeal.score, selectedDeal.rate || 0, apiKey);
      setResult(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const full = `Subject: ${result.subject}\n\n${result.body}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="v-email-gen">
      {/* Deal Selector */}
      <div className="v-card" style={{ marginBottom: '1.5rem' }}>
        <div className="v-card-hd">
          <Mail size={13} className="v-indigo" />
          <span className="v-card-hd-title">Select Deal to Draft For</span>
        </div>

        {deals.length === 0 ? (
          <div className="v-eg-empty">
            <Mail size={36} style={{ color: 'var(--v-text-3)' }} />
            <p>No deals analyzed yet. Run a Deal Analysis first to generate a negotiation email.</p>
          </div>
        ) : (
          <>
            <div className="v-eg-select-wrap">
              <select
                className="v-eg-select"
                value={selectedId}
                onChange={e => { setSelectedId(e.target.value); setResult(null); setError(null); }}
              >
                <option value="">— Choose a deal —</option>
                {deals.map(d => (
                  <option key={d.id} value={String(d.id)}>
                    {d.brand} · {d.platform} · Score {d.score} · {d.date}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="v-eg-chevron" />
            </div>

            {/* Deal Summary Card */}
            {selectedDeal && (
              <div className="v-eg-deal-preview">
                <div className="v-eg-preview-row">
                  <span className="v-eg-preview-label">Brand</span>
                  <span className="v-eg-preview-val">{selectedDeal.brand}</span>
                </div>
                <div className="v-eg-preview-row">
                  <span className="v-eg-preview-label">Platform</span>
                  <span className="v-eg-preview-val">{selectedDeal.platform}</span>
                </div>
                <div className="v-eg-preview-row">
                  <span className="v-eg-preview-label">Fit Score</span>
                  <span className="v-eg-preview-val" style={{
                    color: selectedDeal.score >= 75 ? 'var(--v-emerald)' : selectedDeal.score >= 55 ? 'var(--v-amber)' : 'var(--v-rose)'
                  }}>{selectedDeal.score}/100</span>
                </div>
                <div className="v-eg-preview-row">
                  <span className="v-eg-preview-label">Floor Rate</span>
                  <span className="v-eg-preview-val" style={{ color: 'var(--v-emerald)' }}>
                    {selectedDeal.rate ? `$${selectedDeal.rate.toLocaleString()}` : 'Not calculated'}
                  </span>
                </div>
                <div className="v-eg-preview-row">
                  <span className="v-eg-preview-label">Verdict</span>
                  <span className="v-eg-preview-val" style={{
                    color: selectedDeal.verdict === 'ACCEPT' ? 'var(--v-emerald)' : selectedDeal.verdict === 'REJECT' ? 'var(--v-rose)' : 'var(--v-amber)'
                  }}>{selectedDeal.verdict}</span>
                </div>
              </div>
            )}

            <button
              className="v-btn-primary v-btn-full"
              onClick={handleGenerate}
              disabled={!selectedDeal || loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? <Loader2 size={16} className="v-spin-icon" /> : <Mail size={16} />}
              {loading ? 'Drafting email...' : 'Generate Negotiation Email'}
            </button>

            {error && (
              <div className="v-error" style={{ marginTop: '1rem' }}>
                <AlertCircle size={15} /> {error}
              </div>
            )}
          </>
        )}
      </div>

      {/* Generated Email */}
      {result && (
        <div className="v-card" style={{ animation: 'v-slide-in 0.4s ease-out' }}>
          <div className="v-card-hd">
            <Mail size={13} className="v-emerald" />
            <span className="v-card-hd-title">Generated Draft</span>
            <button className="v-eg-copy-btn" onClick={handleCopy}>
              {copied ? <><CheckCheck size={13} /> Copied!</> : <><Copy size={13} /> Copy All</>}
            </button>
          </div>

          {/* Subject */}
          <div className="v-eg-subject">
            <span className="v-eg-field-label">Subject</span>
            <p className="v-eg-subject-text">{result.subject}</p>
          </div>

          {/* Body */}
          <div className="v-eg-body">
            <span className="v-eg-field-label">Body</span>
            <pre className="v-eg-body-text">{result.body}</pre>
          </div>

          {/* Key Terms */}
          {result.key_terms && result.key_terms.length > 0 && (
            <div className="v-eg-terms">
              <span className="v-eg-field-label">Key Terms to Assert</span>
              <div className="v-eg-terms-list">
                {result.key_terms.map((t, i) => (
                  <span key={i} className="v-eg-term-tag">• {t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
