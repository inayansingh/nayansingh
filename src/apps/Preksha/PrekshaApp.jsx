import React, { useState, useEffect } from 'react';
import { Heart, Star, Compass, Shield, Hexagon, Activity, Sparkles } from 'lucide-react';
import Onboarding from './Onboarding';
import ChatInterface from './ChatInterface';
import './Preksha.css';
import './PrfStyles.css';

const PrekshaApp = () => {
  const [step, setStep] = useState('onboarding');
  const [userData, setUserData] = useState(null);
  const [donationAmount, setDonationAmount] = useState(501);
  const [donationStatus, setDonationStatus] = useState('idle');

  useEffect(() => {
    if (step === 'onboarding') {
      document.title = 'Sanctuary | Preksha Rana Foundation';
    } else if (step === 'chat' && userData?.fullName) {
      document.title = userData.fullName;
    }
    return () => {
      document.title = 'Nayan Singh | Portfolio';
    };
  }, [step, userData]);

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setStep('chat');
  };

  const handleDonateRedirect = (e) => {
    if (e) e.preventDefault();
    window.location.href = 'https://payments.cashfree.com/forms/preksha';
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="prf-container">
      {/* FLOATING SPIRITUAL ORBS */}
      <div className="prf-orb prf-orb-1"></div>
      <div className="prf-orb prf-orb-2"></div>
      <div className="prf-orb prf-orb-3"></div>

      {/* Navigation */}
      <nav className="prf-navbar">
        <div className="prf-logo">Cosmic Blueprint</div>
        <div className="prf-nav-links">
          <button onClick={() => scrollToSection('home')}>Sanctuary</button>
          <button onClick={() => scrollToSection('ai')}>Sacred Guide</button>
          <button onClick={() => scrollToSection('programs')}>Pillars</button>
          <button onClick={handleDonateRedirect} className="prf-nav-donate">Offer Dakshina</button>
        </div>
      </nav>

      {/* SECTION 1: HERO PORTAL */}
      <section id="home" className="prf-hero">
        <div className="prf-glass-panel prf-hero-card">
          <Hexagon className="prf-sacred-icon" size={48} strokeWidth={1} />
          <div className="prf-hero-content">
            <h1>Awaken Your Cosmic Blueprint</h1>
            <p>Embrace the journey. Align with your truest self. Find balance & harmony in the universe through profoundly empathetic, mathematically precise Vedic guidance.</p>
            <button className="prf-btn-primary" onClick={() => scrollToSection('ai')}>Seek Guidance</button>
          </div>
        </div>
      </section>

      {/* SECTION 2: AI SANCTUARY (THE CORE APP) */}
      <section id="ai" className="prf-ai-section">
        <div className="prf-section-header">
          <h2>The Divine Mirror</h2>
          <p>Begin your dialogue with Preksha. Free of worldly judgments, anchored in astrological truth.</p>
        </div>
        
        {/* WRAP THE ORIGINAL APP SAFELY - WE PRESERVE THE INNER LIGHT THEME FOR READABILITY */}
        <div className="prf-ai-app-wrapper">
          <div className="radha-app-container">
            {step === 'onboarding' ? (
              <Onboarding onComplete={handleOnboardingComplete} />
            ) : (
              <ChatInterface userData={userData} />
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE PILLARS */}
      <section id="programs" className="prf-programs">
        <div className="prf-section-header">
          <h2>Architects of the Soul</h2>
          <p>The Preksha Rana Foundation operates on three immutable pillars of divine interaction.</p>
        </div>

        <div className="prf-programs-grid">
          <div className="prf-glass-panel prf-program-card">
            <Compass size={40} strokeWidth={1.5} />
            <h3>Astrological Determinism</h3>
            <p>Anchored by the precise mathematics of the planetary ephemeris. We do not hallucinate the future—we calculate the current transit.</p>
          </div>
          
          <div className="prf-glass-panel prf-program-card">
            <Heart size={40} strokeWidth={1.5} />
            <h3>Emotional Sanctuary</h3>
            <p>Operating through the lens of Sakshi Bhava (witness consciousness), we provide a judgment-free space to untangle mortal anxieties.</p>
          </div>

          <div className="prf-glass-panel prf-program-card">
            <Activity size={40} strokeWidth={1.5} />
            <h3>Selfless Seva</h3>
            <p>Every digital interaction is bound to a karmic economy, ensuring your spiritual healing directly funds real-world interventions.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: KARMIC EXCHANGE / DAKSHINA */}
      <section id="donate" className="prf-donation-funnel">
        <div className="prf-glass-panel prf-donation-container">
          {donationStatus === 'success' ? (
            <div className="prf-donation-success">
              <CheckCircle size={80} color="var(--prf-gold)" />
              <h3>Blessings Received</h3>
              <p className="prf-blessing">"May the universe align to grant you peace. Your Karma Tokens are replenished."</p>
              <button 
                className="prf-btn-primary" 
                onClick={() => { setDonationStatus('idle'); scrollToSection('ai'); }}
              >
                Return to Sanctuary
              </button>
            </div>
          ) : (
            <div className="prf-donation-trigger">
              <Star className="prf-sacred-icon" size={40} strokeWidth={1} style={{marginBottom:'1rem'}} />
              <h2>Offer Dakshina</h2>
              <p className="prf-emotional-line">Replenish your Karmic Tokens by funding mental health awareness.</p>
              
              <div className="prf-donation-amounts">
                {[101, 501, 1100, 2100].map(amt => (
                  <button 
                    key={amt}
                    className={`prf-amt-btn ${donationAmount === amt ? 'selected' : ''}`}
                    onClick={() => setDonationAmount(amt)}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="prf-payment-form">
                <button 
                  className="prf-btn-donate" 
                  onClick={handleDonateRedirect}
                  disabled={donationStatus === 'processing'}
                >
                  {donationStatus === 'processing' ? 'Connecting to Source...' : `Exchange ₹${donationAmount}`}
                </button>
                
                <div className="prf-payment-methods">
                  <span><Shield size={14} style={{display:'inline', marginRight:'4px'}}/> Secure Gateway</span>
                  <span>UPI</span>
                  <span>Cards</span>
                  <span>Netbanking</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER - COSMIC ELEGANCE */}
      <footer className="prf-footer">
        <div className="prf-footer-glow"></div>
        <div className="prf-footer-content">
          <div className="prf-footer-brand">
            <h3 className="prf-footer-title">Preksha Rana Foundation</h3>
            <div className="prf-footer-separator"></div>
            <p className="prf-footer-mantra">
              "A sanctuary where ancient cosmic geometry<br/>
              meets modern emotional resonance."
            </p>
          </div>
        </div>
        <div className="prf-footer-bottom">
          <p>© {new Date().getFullYear()} Preksha Rana Foundation.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrekshaApp;
