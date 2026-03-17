import React, { useState, useEffect } from 'react';
import { Heart, Star, Users, MessageCircle, Shield, CheckCircle, Smartphone, Globe } from 'lucide-react';
import Onboarding from './Onboarding';
import ChatInterface from './ChatInterface';
import './Preksha.css';
import './PrfStyles.css';
import divineAvatar from '../../assets/images/divine_preksha.png';

const PrekshaApp = () => {
  const [step, setStep] = useState('onboarding');
  const [userData, setUserData] = useState(null);
  const [donationAmount, setDonationAmount] = useState(501);
  const [donationStatus, setDonationStatus] = useState('idle');

  useEffect(() => {
    if (step === 'onboarding') {
      document.title = 'Preksha Rana Foundation';
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

  const handleDonate = (e) => {
    e.preventDefault();
    setDonationStatus('processing');
    setTimeout(() => {
        setDonationStatus('success');
    }, 1500);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="prf-container">
      {/* Navigation */}
      <nav className="prf-navbar">
        <div className="prf-logo">Preksha Rana Foundation</div>
        <div className="prf-nav-links">
          <button onClick={() => scrollToSection('home')}>Home</button>
          <button onClick={() => scrollToSection('ai')}>Preksha AI</button>
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('programs')}>Programs</button>
          <button onClick={() => scrollToSection('donate')} className="prf-nav-donate">Donate</button>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section id="home" className="prf-hero">
        <div className="prf-hero-content">
          <h1>Healing Minds,<br/>Guiding Souls</h1>
          <p>Spiritual guidance rooted in Vedic wisdom. Blending spirituality and compassion to uplift lives.</p>
          <div className="prf-hero-buttons">
            <button className="prf-btn-primary" onClick={() => scrollToSection('ai')}>Talk to Preksha</button>
            <button className="prf-btn-secondary" onClick={() => scrollToSection('donate')}>Support Our Mission</button>
          </div>
        </div>
        <div className="prf-hero-image">
           <div className="prf-avatar-glow"></div>
           <img src={divineAvatar} alt="Divine Preksha Avatar" />
        </div>
      </section>

      {/* SECTION 2: PREKSHA (CENTERPIECE) */}
      <section id="ai" className="prf-ai-section">
        <div className="prf-section-header">
           <h2>Preksha – Your Spiritual Companion</h2>
           <p>A divine companion that understands your life through your kundali and guides you with compassion.</p>
        </div>
        
        <div className="prf-ai-split">
          <div className="prf-ai-features">
             <div className="prf-feature-card">
               <Star className="prf-icon" size={32} />
               <h3>Kundali-Based Insights</h3>
               <p>Personalized wisdom based on your exact birth planetary alignments and transits.</p>
             </div>
             <div className="prf-feature-card">
               <Heart className="prf-icon" size={32} />
               <h3>Emotional Healing</h3>
               <p>Gentle, non-judgmental support to help you navigate anxiety, sadness, and confusion.</p>
             </div>
             <div className="prf-feature-card">
               <MessageCircle className="prf-icon" size={32} />
               <h3>Astrology-Powered Advice</h3>
               <p>Actionable guidance and specific timelines for your career, relationships, and health.</p>
             </div>
          </div>
          
          <div className="prf-ai-app-wrapper">
             {step === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
             {step === 'chat' && userData && <ChatInterface userData={userData} />}
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT FOUNDATION */}
      <section id="about" className="prf-about">
         <div className="prf-about-centered">
            <h2>About Preksha Rana Foundation</h2>
            <p className="prf-mission-statement">
              Our mission is to bring spiritual mental health and accessible emotional healing to everyone, especially the underprivileged. We envision a world where the ancient wisdom of Vedic astrology meets boundless empathy to provide solace, guidance, and peace of mind at scale.
            </p>
         </div>
      </section>

      {/* SECTION 4: IMPACT */}
      <section className="prf-impact">
        <div className="prf-impact-grid">
          <div className="prf-impact-stat">
            <Users size={48} className="prf-icon-gold" />
            <h3>10,000+</h3>
            <p>Lives Touched</p>
          </div>
          <div className="prf-impact-stat">
            <MessageCircle size={48} className="prf-icon-gold" />
            <h3>50,000+</h3>
            <p>AI Sessions Delivered</p>
          </div>
          <div className="prf-impact-stat">
            <Globe size={48} className="prf-icon-gold" />
            <h3>15+</h3>
            <p>Communities Reached</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: DONATION (HIGH-CONVERSION BLOCK) */}
      <section id="donate" className="prf-donation-funnel">
         <div className="prf-donation-container">
            <div className="prf-donation-trigger">
               <h2>Support Healing & Awareness</h2>
               <p className="prf-emotional-line">"Someone today is struggling silently. Your support can bring them clarity, peace, and guidance."</p>
            </div>
            
            {donationStatus === 'success' ? (
              <div className="prf-donation-success">
                <CheckCircle size={80} color="#4CAF50" />
                <h3>Thank You!</h3>
                <p>You just helped someone find peace today. 🌸</p>
                <p className="prf-blessing">May the divine universe shower you with abundance and joy.</p>
                <button className="prf-btn-primary" onClick={() => scrollToSection('ai')} style={{marginTop: '2rem'}}>
                  Experience Preksha Yourself
                </button>
              </div>
            ) : (
              <div className="prf-donation-box">
                <div className="prf-impact-mapping">
                   <div className={donationAmount === 101 ? 'prf-map active' : 'prf-map'} onClick={() => setDonationAmount(101)}>
                     <strong>₹101</strong><span>Funds 1 healing session</span>
                   </div>
                   <div className={donationAmount === 501 ? 'prf-map active' : 'prf-map'} onClick={() => setDonationAmount(501)}>
                     <strong>₹501</strong><span>Supports 10 people</span>
                   </div>
                   <div className={donationAmount === 1100 ? 'prf-map active' : 'prf-map'} onClick={() => setDonationAmount(1100)}>
                     <strong>₹1100</strong><span>Sponsors a community</span>
                   </div>
                </div>

                <div className="prf-donation-amounts">
                   {[101, 501, 1100].map(amt => (
                     <button 
                       key={amt} 
                       className={`prf-amt-btn ${donationAmount === amt ? 'selected' : ''}`}
                       onClick={() => setDonationAmount(amt)}
                     >₹{amt}</button>
                   ))}
                   <button className="prf-amt-btn custom" onClick={() => setDonationAmount(9999)}>Custom</button>
                </div>

                <form onSubmit={handleDonate} className="prf-payment-form">
                   <button type="submit" className="prf-btn-donate" disabled={donationStatus === 'processing'}>
                      {donationStatus === 'processing' ? 'Processing...' : `Donate ₹${donationAmount} Securely`}
                   </button>
                   <div className="prf-payment-methods">
                     <span>✓ UPI Accepted</span>
                     <span>✓ Credit/Debit Cards</span>
                     <span>✓ Net Banking</span>
                   </div>
                </form>
              </div>
            )}
         </div>
      </section>

      {/* SECTION 6: PROGRAMS */}
      <section id="programs" className="prf-programs">
        <h2>Our Core Programs</h2>
        <div className="prf-programs-grid">
           <div className="prf-program-card">
              <Smartphone size={40} />
              <h3>Spiritual Guidance</h3>
              <p>Free, continuous access to empathetic astrological counseling through Preksha.</p>
           </div>
           <div className="prf-program-card">
              <Shield size={40} />
              <h3>Mental Health Awareness</h3>
              <p>Conducting workshops and campaigns to destigmatize mental health in spiritual contexts.</p>
           </div>
           <div className="prf-program-card">
              <Heart size={40} />
              <h3>Support for Underprivileged</h3>
              <p>Ensuring marginalized communities get free access to healing tools and essential support.</p>
           </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="prf-testimonials">
         <h2>Stories of Transformation</h2>
         <div className="prf-testimonial-carousel">
            <div className="prf-testimonial">
               <p>"I was lost in a sea of anxiety. Preksha didn't just give me predictions; it gave me peace. The breathing exercises changed my daily routine."</p>
               <span>— Anjali S.</span>
            </div>
            <div className="prf-testimonial">
               <p>"Finding a safe space to discuss both my karmic path and my practical career fears was impossible until I found this foundation."</p>
               <span>— Rohan M.</span>
            </div>
         </div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="prf-footer">
         <div className="prf-footer-content">
            <div className="prf-footer-logo">
               <h3>Preksha Rana Foundation</h3>
               <p>Healing minds, guiding souls.</p>
            </div>
            <div className="prf-footer-links">
               <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
               <a href="#ai" onClick={(e) => { e.preventDefault(); scrollToSection('ai'); }}>Preksha AI</a>
               <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
               <a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Programs</a>
            </div>
            <div className="prf-footer-cta">
               <button onClick={() => scrollToSection('donate')} className="prf-btn-secondary" style={{borderColor: 'rgba(255,255,255,0.3)', color: 'white'}}>Donate Now</button>
               <p>Contact: info@prekshafoundation.org</p>
            </div>
         </div>
         <div className="prf-footer-bottom">
            <p>&copy; {new Date().getFullYear()} Preksha Rana Foundation. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export default PrekshaApp;
