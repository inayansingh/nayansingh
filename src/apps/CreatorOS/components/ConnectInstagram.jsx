import React, { useState } from 'react';
import {
  Instagram, Loader2, AlertCircle, CheckCircle2,
  ExternalLink, RefreshCw, LogOut, Copy, CheckCheck,
  ChevronRight, Eye, EyeOff, Zap, Shield, Database
} from 'lucide-react';

export default function ConnectInstagram({
  status, error, isLive, profile, appId, token,
  initiateOAuth, connectWithToken, disconnect, refreshData, setAppId,
}) {
  const [mode,          setMode]          = useState('oauth');   // 'oauth' | 'manual'
  const [fbAppId,       setFbAppId]       = useState(appId || '');
  const [manualToken,   setManualToken]   = useState('');
  const [showToken,     setShowToken]     = useState(false);
  const [copied,        setCopied]        = useState(false);

  const REDIRECT = `${window.location.origin}/creator-os`;

  const handleOAuth = () => {
    if (!fbAppId.trim()) return;
    setAppId(fbAppId);
    initiateOAuth(fbAppId.trim());
  };

  const handleManual = () => {
    if (!manualToken.trim()) return;
    connectWithToken(manualToken.trim());
  };

  const copyRedirect = () => {
    navigator.clipboard.writeText(REDIRECT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isConnecting = status === 'connecting' || status === 'loading';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Connect Instagram</h2>
          <p className="cos-section-sub">
            Link your real Instagram account to replace mock data with live insights
          </p>
        </div>
        {isLive && (
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button className="cos-btn-ghost cos-btn-sm" onClick={refreshData} disabled={isConnecting}>
              {isConnecting ? <Loader2 size={13} className="cos-spin-icon"/> : <RefreshCw size={13}/>} Refresh
            </button>
            <button className="cos-btn-ghost cos-btn-sm" onClick={disconnect} style={{ color: 'var(--cos-rose)', borderColor: 'rgba(244,63,94,0.25)' }}>
              <LogOut size={13}/> Disconnect
            </button>
          </div>
        )}
      </div>

      {/* ── CONNECTED STATE ─────────────────────────────────── */}
      {isLive && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Profile card */}
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {profile.avatar
              ? <img src={profile.avatar} alt={profile.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(16,185,129,0.4)', flexShrink: 0 }} />
              : <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', border: '3px solid rgba(124,58,237,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Instagram size={28} style={{ color: 'var(--cos-violet-lt)' }}/></div>
            }
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--cos-font-head)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--cos-text-1)' }}>{profile.name}</span>
                <span className="cos-badge" style={{ color: '#10B981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', gap: '0.25rem' }}>
                  <CheckCircle2 size={10}/> Connected
                </span>
              </div>
              <div style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.8rem', color: 'var(--cos-violet-lt)', marginBottom: '0.75rem' }}>{profile.handle}</div>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Followers', val: profile.totalFollowers?.toLocaleString() || '—' },
                  { label: 'Posts', val: profile.mediaCount?.toLocaleString() || '—' },
                  { label: 'Avg Engagement', val: profile.avgEngagementRate != null ? `${profile.avgEngagementRate}%` : 'Computing...' },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.62rem', color: 'var(--cos-text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--cos-font-head)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cos-text-1)' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '0.63rem', fontFamily: 'var(--cos-font-mono)', color: 'var(--cos-text-3)', marginBottom: '0.25rem' }}>DATA SOURCE</div>
              <div className="cos-badge" style={{ color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>🔴 LIVE</div>
            </div>
          </div>

          {/* What's now live */}
          <div className="cos-grid-3">
            {[
              { icon: <Database size={16}/>, label: 'Live Posts', val: `${profile.mediaCount || 0} media items`, color: '#7C3AED' },
              { icon: <Zap size={16}/>, label: 'Engagement Rate', val: profile.avgEngagementRate != null ? `${profile.avgEngagementRate}%` : 'Calculating', color: '#10B981' },
              { icon: <Shield size={16}/>, label: 'Account Type', val: profile.accountType || 'Personal', color: '#06B6D4' },
            ].map(({ icon, label, val, color }) => (
              <div key={label} className="cos-card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--cos-font-mono)', color: 'var(--cos-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                </div>
                <div style={{ fontFamily: 'var(--cos-font-head)', fontWeight: 700, color: 'var(--cos-text-1)', fontSize: '0.95rem' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Insights upgrade notice */}
          {profile.accountType === 'PERSONAL' && (
            <div className="cos-alert info">
              <AlertCircle size={15}/>
              <div>
                <strong>You're on a Personal account</strong><br/>
                Saves, reach, impressions, and story insights are only available on <strong>Business or Creator accounts</strong>.
                Switch in Instagram Settings → Account → Switch to Professional Account to unlock full analytics.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── NOT CONNECTED STATE ──────────────────────────────── */}
      {!isLive && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Mode toggle */}
          <div style={{ display: 'flex', background: 'var(--cos-bg-raised)', border: '1px solid var(--cos-border)', borderRadius: 10, padding: '0.3rem', gap: '0.3rem', width: 'fit-content' }}>
            {[
              { id: 'oauth',  label: '🔐 OAuth Flow (Recommended)' },
              { id: 'manual', label: '🔑 Paste Access Token' },
            ].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--cos-font-ui)', fontSize: '0.82rem', fontWeight: 500, transition: 'all var(--cos-transition)',
                  background: mode === m.id ? 'rgba(124,58,237,0.2)' : 'transparent',
                  color: mode === m.id ? 'var(--cos-violet-lt)' : 'var(--cos-text-3)',
                }}>
                {m.label}
              </button>
            ))}
          </div>

          {/* ── OAUTH FLOW ── */}
          {mode === 'oauth' && (
            <div className="cos-grid-2" style={{ gap: '1.25rem' }}>
              {/* Steps */}
              <div className="cos-card">
                <div className="cos-card-hd">
                  <Instagram size={13} className="cos-violet"/>
                  <span className="cos-card-hd-title">OAuth Setup — 4 Steps</span>
                </div>
                {[
                  { n: 1, title: 'Create Facebook App', desc: 'Go to developers.facebook.com → Create App → Business type', link: 'https://developers.facebook.com/apps/creation/', linkLabel: 'Open Meta Developers →' },
                  { n: 2, title: 'Add Instagram Product', desc: 'Inside your app dashboard → Add Product → Instagram Graph API' },
                  {
                    n: 3, title: 'Set Redirect URI',
                    desc: 'App Settings → Basic → Add OAuth Redirect URIs:',
                    chip: REDIRECT, copyable: true,
                  },
                  { n: 4, title: 'Enter App ID below & Connect', desc: 'Copy your Facebook App ID from the dashboard and paste it below.' },
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: '0.85rem', padding: '0.85rem 0', borderBottom: step.n < 4 ? '1px solid var(--cos-border)' : 'none' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(124,58,237,0.16)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--cos-font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--cos-violet-lt)' }}>
                      {step.n}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.87rem', color: 'var(--cos-text-1)', marginBottom: '0.2rem' }}>{step.title}</div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--cos-text-2)', lineHeight: 1.5 }}>{step.desc}</p>
                      {step.chip && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', background: 'var(--cos-bg)', borderRadius: 7, padding: '0.35rem 0.65rem', border: '1px solid var(--cos-border)' }}>
                          <code style={{ flex: 1, fontFamily: 'var(--cos-font-mono)', fontSize: '0.72rem', color: 'var(--cos-cyan)', wordBreak: 'break-all' }}>{step.chip}</code>
                          <button className="cos-copy-btn" onClick={copyRedirect}>
                            {copied ? <CheckCheck size={10}/> : <Copy size={10}/>} {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      )}
                      {step.link && (
                        <a href={step.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--cos-violet-lt)', marginTop: '0.35rem', textDecoration: 'none' }}>
                          {step.linkLabel} <ExternalLink size={11}/>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Connect form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="cos-card">
                  <div className="cos-card-hd">
                    <Zap size={13} className="cos-amber"/>
                    <span className="cos-card-hd-title">Connect with Facebook App</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div className="cos-field">
                      <label>Facebook App ID</label>
                      <input
                        type="text"
                        placeholder="e.g. 123456789012345"
                        value={fbAppId}
                        onChange={e => setFbAppId(e.target.value)}
                      />
                      <span style={{ fontSize: '0.68rem', color: 'var(--cos-text-3)', marginTop: '0.2rem' }}>
                        Found in: App Dashboard → Details panel → App ID
                      </span>
                    </div>
                    <div className="cos-alert info" style={{ marginTop: 0 }}>
                      <AlertCircle size={14}/>
                      <div style={{ fontSize: '0.78rem' }}>
                        The <strong>App Secret</strong> is never exposed in the browser. It's used only by the Vercel serverless function (<code style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.72rem' }}>/api/instagram-token</code>).
                        Add <code style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.72rem' }}>INSTAGRAM_APP_ID</code> and <code style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.72rem' }}>INSTAGRAM_APP_SECRET</code> to Vercel env vars.
                      </div>
                    </div>
                    <button className="cos-btn-primary cos-btn-full" onClick={handleOAuth} disabled={!fbAppId.trim() || isConnecting}>
                      {isConnecting ? <Loader2 size={15} className="cos-spin-icon"/> : <Instagram size={15}/>}
                      {isConnecting ? 'Connecting to Meta...' : 'Connect Instagram via OAuth'}
                    </button>
                  </div>
                </div>

                {/* Required permissions */}
                <div className="cos-card" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.63rem', fontFamily: 'var(--cos-font-mono)', color: 'var(--cos-text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.65rem' }}>Permissions Requested</div>
                  {[
                    { perm: 'instagram_basic', desc: 'Profile, follower count, media list' },
                    { perm: 'instagram_manage_insights', desc: 'Likes, saves, reach, impressions per post' },
                    { perm: 'pages_show_list', desc: 'List pages connected to your account' },
                    { perm: 'pages_read_engagement', desc: 'Account-level insights (Business only)' },
                  ].map(({ perm, desc }) => (
                    <div key={perm} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid var(--cos-border)' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--cos-emerald)', marginTop: 1, flexShrink: 0 }}/>
                      <div>
                        <code style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.72rem', color: 'var(--cos-violet-lt)' }}>{perm}</code>
                        <div style={{ fontSize: '0.72rem', color: 'var(--cos-text-3)' }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MANUAL TOKEN ── */}
          {mode === 'manual' && (
            <div className="cos-grid-2" style={{ gap: '1.25rem' }}>
              <div className="cos-card">
                <div className="cos-card-hd">
                  <Shield size={13} className="cos-cyan"/>
                  <span className="cos-card-hd-title">How to get your Access Token</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { n: 1, text: 'Go to Graph API Explorer', link: 'https://developers.facebook.com/tools/explorer/', label: 'Open Explorer →' },
                    { n: 2, text: 'Select your Facebook App from the dropdown' },
                    { n: 3, text: 'Click "Generate Access Token" and log in with Instagram' },
                    { n: 4, text: 'Add permissions: instagram_basic, instagram_manage_insights' },
                    { n: 5, text: 'Copy the token and paste it below' },
                  ].map(s => (
                    <div key={s.n} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--cos-font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--cos-cyan)' }}>
                        {s.n}
                      </div>
                      <div>
                        <span style={{ fontSize: '0.82rem', color: 'var(--cos-text-2)' }}>{s.text}</span>
                        {s.link && (
                          <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.73rem', color: 'var(--cos-cyan)', textDecoration: 'none', marginTop: '0.15rem' }}>
                            {s.label} <ExternalLink size={10}/>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="cos-alert warning" style={{ marginTop: '0.25rem' }}>
                    <AlertCircle size={13}/>
                    <span style={{ fontSize: '0.78rem' }}>Tokens from Graph Explorer expire in ~1 hour. For persistent access, use the OAuth flow above to get a 60-day token.</span>
                  </div>
                </div>
              </div>

              <div className="cos-card">
                <div className="cos-card-hd">
                  <Zap size={13} className="cos-violet"/>
                  <span className="cos-card-hd-title">Paste Access Token</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div className="cos-field">
                    <label>User Access Token</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showToken ? 'text' : 'password'}
                        placeholder="EAAxxxxxxxx..."
                        value={manualToken}
                        onChange={e => setManualToken(e.target.value)}
                        style={{ paddingRight: '2.5rem', width: '100%' }}
                      />
                      <button onClick={() => setShowToken(v => !v)} style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cos-text-3)' }}>
                        {showToken ? <EyeOff size={15}/> : <Eye size={15}/>}
                      </button>
                    </div>
                  </div>
                  <button className="cos-btn-primary cos-btn-full" onClick={handleManual} disabled={!manualToken.trim() || isConnecting}>
                    {isConnecting ? <Loader2 size={15} className="cos-spin-icon"/> : <ChevronRight size={15}/>}
                    {isConnecting ? 'Validating token...' : 'Connect with this Token'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="cos-alert error">
          <AlertCircle size={15}/>
          <div>
            <strong>Connection failed:</strong> {error}
          </div>
        </div>
      )}

      {/* Loading state */}
      {(status === 'connecting' || status === 'loading') && (
        <div className="cos-loading">
          <div className="cos-pulse"/>
          <span>{status === 'connecting' ? 'Exchanging OAuth code for access token...' : 'Fetching your Instagram data...'}</span>
        </div>
      )}

      {/* What data we pull */}
      <div className="cos-card" style={{ border: '1px dashed rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: '0.65rem', fontFamily: 'var(--cos-font-mono)', color: 'var(--cos-text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>What CreatorOS reads from Instagram</div>
        <div className="cos-grid-3" style={{ gap: '0.75rem' }}>
          {[
            { label: 'Profile', items: ['Username', 'Follower count', 'Following count', 'Media count', 'Bio', 'Profile picture'], available: 'All accounts' },
            { label: 'Media', items: ['Post captions', 'Like count', 'Comment count', 'Post timestamps', 'Media type (Reel/Post/Carousel)', 'Post URL'], available: 'All accounts' },
            { label: 'Insights', items: ['Saves per post', 'Reach & Impressions', 'Engagement rate', 'Story views', 'Account follower growth'], available: 'Business/Creator only' },
          ].map(g => (
            <div key={g.label}>
              <div style={{ fontFamily: 'var(--cos-font-mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--cos-text-2)', marginBottom: '0.5rem' }}>{g.label}</div>
              {g.items.map(item => (
                <div key={item} style={{ fontSize: '0.75rem', color: 'var(--cos-text-3)', padding: '0.2rem 0', display: 'flex', gap: '0.35rem' }}>
                  <span style={{ color: 'var(--cos-violet-lt)' }}>·</span> {item}
                </div>
              ))}
              <div style={{ marginTop: '0.5rem', fontSize: '0.62rem', fontFamily: 'var(--cos-font-mono)', color: g.available.includes('Business') ? 'var(--cos-amber)' : 'var(--cos-emerald)' }}>
                {g.available}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
