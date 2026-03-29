// useDeals — persistent deal history via localStorage
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'vantage_deals';

function loadDeals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDeals(deals) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  } catch { /* quota exceeded — silently ignore */ }
}

// Extract a short brand name from the brief text (first "Brand:" line or first line)
function parseBrandName(brief) {
  const match = brief.match(/brand[:\s]+([^\n,]+)/i);
  if (match) return match[1].trim().slice(0, 30);
  return brief.split('\n')[0].trim().slice(0, 30) || 'Unknown Brand';
}

export function useDeals() {
  const [deals, setDeals] = useState(loadDeals);

  const addDeal = useCallback((metrics, brief, analysisResult, rateResult) => {
    const newDeal = {
      id:         Date.now(),
      date:       new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isoDate:    new Date().toISOString(),
      brand:      parseBrandName(brief),
      platform:   metrics.platform,
      niche:      metrics.niche,
      followers:  metrics.followers,
      engagementRate: metrics.engagementRate,
      keywords:   metrics.keywords,
      score:      analysisResult.score,
      verdict:    analysisResult.verdict,
      reasoning:  analysisResult.reasoning,
      alignmentFactors: analysisResult.top_alignment_factors || [],
      rate:       rateResult?.total_recommended_rate || null,
      brief,
    };
    setDeals(prev => {
      const updated = [newDeal, ...prev].slice(0, 50); // keep last 50 deals
      saveDeals(updated);
      return updated;
    });
    return newDeal;
  }, []);

  const removeDeal = useCallback((id) => {
    setDeals(prev => {
      const updated = prev.filter(d => d.id !== id);
      saveDeals(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setDeals([]);
  }, []);

  return { deals, addDeal, removeDeal, clearAll };
}
