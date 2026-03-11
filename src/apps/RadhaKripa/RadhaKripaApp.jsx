import React, { useState } from 'react';
import Onboarding from './Onboarding';
import ChatInterface from './ChatInterface';
import './RadhaKripa.css';
import sideLeftImg from '../../assets/images/radha_krishna_left.png';
import sideRightImg from '../../assets/images/radha_krishna_right.png';

const RadhaKripaApp = () => {
  const [step, setStep] = useState('onboarding');
  const [userData, setUserData] = useState(null);

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

export default RadhaKripaApp;
