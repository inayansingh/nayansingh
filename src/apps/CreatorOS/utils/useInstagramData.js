// useInstagramData.js — Token lifecycle + data management hook
// Handles: OAuth callback, token storage, data fetching, refreshing, disconnect

import { useState, useEffect, useCallback } from 'react';
import {
  fetchProfile, fetchMedia, fetchPostInsights,
  computeEngagementRates, validateToken, refreshToken,
} from './instagramAPI.js';
import {
  CREATOR_PROFILE as MOCK_PROFILE,
  POSTS as MOCK_POSTS,
  AUDIENCE as MOCK_AUDIENCE,
} from './mockData.js';

const LS_TOKEN    = 'cos_ig_token';
const LS_EXPIRY   = 'cos_ig_expiry';
const LS_PROFILE  = 'cos_ig_profile';
const LS_APP_ID   = 'cos_ig_app_id';

export function useInstagramData() {
  const [token,   setToken]   = useState(() => localStorage.getItem(LS_TOKEN)   || null);
  const [expiry,  setExpiry]  = useState(() => localStorage.getItem(LS_EXPIRY)  || null);
  const [appId,   setAppId]   = useState(() => localStorage.getItem(LS_APP_ID)  || '');
  const [status,  setStatus]  = useState('idle');   // idle | connecting | loading | ready | error
  const [error,   setError]   = useState(null);

  // Live data (null = not yet fetched)
  const [igProfile, setIgProfile] = useState(null);
  const [igPosts,   setIgPosts]   = useState(null);

  // ── Derived: merge real data with mock defaults ──────────────────
  const profile = igProfile ?? MOCK_PROFILE;
  const posts   = igPosts   ?? MOCK_POSTS;
  const isLive  = !!token && !!igProfile;

  // ── Build OAuth redirect URI ─────────────────────────────────────
  const redirectUri = `${window.location.origin}/creator-os`;

  // ── Build Meta OAuth URL ─────────────────────────────────────────
  function buildOAuthUrl(fbAppId) {
    const state = Math.random().toString(36).slice(2);
    sessionStorage.setItem('cos_oauth_state', state);
    const params = new URLSearchParams({
      client_id:     fbAppId,
      redirect_uri:  redirectUri,
      scope:         [
        'instagram_basic',
        'instagram_manage_insights',
        'pages_show_list',
        'pages_read_engagement',
      ].join(','),
      response_type: 'code',
      state,
    });
    return `https://www.facebook.com/v21.0/dialog/oauth?${params}`;
  }

  // ── Initiate OAuth ───────────────────────────────────────────────
  function initiateOAuth(fbAppId) {
    localStorage.setItem(LS_APP_ID, fbAppId);
    setAppId(fbAppId);
    window.location.href = buildOAuthUrl(fbAppId);
  }

  // ── Handle OAuth callback (code in URL) ─────────────────────────
  const handleCallback = useCallback(async (code) => {
    setStatus('connecting');
    setError(null);

    // Remove code from URL cleanly
    const clean = new URL(window.location.href);
    clean.searchParams.delete('code');
    clean.searchParams.delete('state');
    window.history.replaceState({}, '', clean.toString());

    try {
      const res = await fetch('/api/instagram-token', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ code, redirectUri }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      saveToken(data.accessToken, data.expiresIn);
      await loadData(data.accessToken);
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }, [redirectUri]);

  // ── Manual token paste (no app required) ────────────────────────
  async function connectWithToken(manualToken) {
    setStatus('connecting');
    setError(null);
    try {
      const { valid, error: vErr } = await validateToken(manualToken);
      if (!valid) throw new Error(vErr || 'Invalid token');
      saveToken(manualToken, 5184000); // 60 days in seconds
      await loadData(manualToken);
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }

  // ── Load profile + posts ─────────────────────────────────────────
  async function loadData(tok) {
    setStatus('loading');
    try {
      const rawProfile = await fetchProfile(tok);
      const rawMedia   = await fetchMedia(tok, 30);
      const enriched   = computeEngagementRates(rawMedia, rawProfile.totalFollowers);
      const avgEng     = enriched.length > 0
        ? parseFloat((enriched.reduce((s, p) => s + p.engagementRate, 0) / enriched.length).toFixed(2))
        : 0;

      const finalProfile = {
        ...MOCK_PROFILE,     // fill in non-API fields with mock defaults
        ...rawProfile,
        avgEngagementRate: avgEng,
      };

      setIgProfile(finalProfile);
      setIgPosts(enriched);
      localStorage.setItem(LS_PROFILE, JSON.stringify(finalProfile));
      setStatus('ready');
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }

  // ── Persist token ────────────────────────────────────────────────
  function saveToken(tok, expiresInSeconds) {
    const exp = Date.now() + expiresInSeconds * 1000;
    localStorage.setItem(LS_TOKEN,  tok);
    localStorage.setItem(LS_EXPIRY, String(exp));
    setToken(tok);
    setExpiry(String(exp));
  }

  // ── Auto-refresh token if < 10 days left ────────────────────────
  async function maybeRefreshToken(tok) {
    const exp = Number(localStorage.getItem(LS_EXPIRY));
    const tenDays = 10 * 24 * 60 * 60 * 1000;
    if (exp && Date.now() > exp - tenDays) {
      try {
        const { accessToken, expiresIn } = await refreshToken(tok);
        saveToken(accessToken, expiresIn);
        return accessToken;
      } catch {
        return tok; // use current token if refresh fails
      }
    }
    return tok;
  }

  // ── Disconnect ───────────────────────────────────────────────────
  function disconnect() {
    [LS_TOKEN, LS_EXPIRY, LS_PROFILE].forEach(k => localStorage.removeItem(k));
    setToken(null); setExpiry(null);
    setIgProfile(null); setIgPosts(null);
    setStatus('idle'); setError(null);
  }

  // ── Refresh data manually ────────────────────────────────────────
  async function refreshData() {
    if (!token) return;
    const tok = await maybeRefreshToken(token);
    await loadData(tok);
  }

  // ── On mount: load stored token or handle OAuth callback ─────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code   = params.get('code');
    const state  = params.get('state');

    if (code) {
      // OAuth callback — validate state to prevent CSRF
      const savedState = sessionStorage.getItem('cos_oauth_state');
      if (state && savedState && state !== savedState) {
        setError('OAuth state mismatch — possible CSRF attack. Please try connecting again.');
        setStatus('error');
        return;
      }
      sessionStorage.removeItem('cos_oauth_state');
      handleCallback(code);
      return;
    }

    // Restore from localStorage
    const storedToken = localStorage.getItem(LS_TOKEN);
    if (storedToken) {
      const storedProfile = localStorage.getItem(LS_PROFILE);
      if (storedProfile) {
        try {
          setIgProfile(JSON.parse(storedProfile));
          setStatus('ready');
        } catch {}
      }
      // Silently refresh data in background
      maybeRefreshToken(storedToken).then(tok => loadData(tok));
    }
  }, []);

  return {
    // State
    token, expiry, appId, status, error, isLive,
    // Data (real or mock)
    profile, posts, audience: MOCK_AUDIENCE,
    // Actions
    initiateOAuth, connectWithToken, disconnect, refreshData,
    // Helpers
    setAppId,
  };
}
