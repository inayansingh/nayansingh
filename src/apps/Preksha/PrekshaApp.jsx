import React, { useState, useEffect } from 'react';
import Onboarding from './Onboarding';
import ChatInterface from './ChatInterface';
import './Preksha.css';
import sideLeftImg from '../../assets/images/radha_krishna_left.png';
import sideRightImg from '../../assets/images/radha_krishna_right.png';

const PrekshaApp = () => {
  const [step, setStep] = useState('onboarding');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (step === 'onboarding') {
      document.title = 'Preksha - Your Spiritual Companion';
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

  return (
    <div className="radha-app-container">
      <div className="radha-side-panel left">
        <img src={sideLeftImg} alt="Divine play left" className="radha-side-image" />
      </div>

      <div className="radha-card-wrapper">
        <div className="radha-card">
          {step === 'onboarding' && (
            <Onboarding onComplete={handleOnboardingComplete} />
          )}
          
          {step === 'chat' && userData && (
            <ChatInterface userData={userData} />
          )}
        </div>
      </div>

      <div className="radha-side-panel right">
        <img src={sideRightImg} alt="Divine play right" className="radha-side-image" />
      </div>
    </div>
  );
};

export default PrekshaApp;
