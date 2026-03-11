import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    dob: '',
    tob: '',
    birthPlace: '',
    currentCity: '',
    concern: 'Career',
    mood: 'Peaceful',
    apiKey: 'AIzaSyDTMppBu8bnru5IKJ06U_k4qmkB1-QcsP8',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.apiKey) {
      alert("Please enter at least your Name and API Key to proceed.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Send form data to our serverless email endpoint
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // We don't necessarily need to wait or block on the response
    } catch (error) {
      console.error("Failed to send email submission:", error);
    } finally {
      setIsSubmitting(false);
      onComplete(formData);
    }
  };

  return (
    <div className="radha-onboarding">
      <div className="radha-header">
        <h1 className="radha-title">Preksha</h1>
        <p className="radha-subtitle">Your Spiritual Companion</p>
      </div>

      <form onSubmit={handleSubmit} className="radha-form">
        <div className="radha-form-grid">
          <div className="radha-form-group">
            <label className="radha-label">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              className="radha-input" 
              placeholder="Seeker's Name" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="radha-form-group">
            <label className="radha-label">Mobile Number</label>
            <input 
              type="tel" 
              name="mobile" 
              className="radha-input" 
              placeholder="+91..." 
              value={formData.mobile} 
              onChange={handleChange} 
            />
          </div>

          <div className="radha-form-group">
            <label className="radha-label">Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              className="radha-input" 
              value={formData.dob} 
              onChange={handleChange} 
            />
          </div>

          <div className="radha-form-group">
            <label className="radha-label">Time of Birth</label>
            <input 
              type="time" 
              name="tob" 
              className="radha-input" 
              value={formData.tob} 
              onChange={handleChange} 
            />
          </div>

          <div className="radha-form-group">
            <label className="radha-label">Place of Birth</label>
            <input 
              type="text" 
              name="birthPlace" 
              className="radha-input" 
              placeholder="City, Country" 
              value={formData.birthPlace} 
              onChange={handleChange} 
            />
          </div>

          <div className="radha-form-group">
            <label className="radha-label">Current City</label>
            <input 
              type="text" 
              name="currentCity" 
              className="radha-input" 
              placeholder="Where are you now?" 
              value={formData.currentCity} 
              onChange={handleChange} 
            />
          </div>

          <div className="radha-form-group">
            <label className="radha-label">Primary Life Concern</label>
            <select 
              name="concern" 
              className="radha-select" 
              value={formData.concern} 
              onChange={handleChange}
            >
              <option value="Career">Career & Purpose</option>
              <option value="Marriage">Marriage & Love</option>
              <option value="Relationships">Family & Relationships</option>
              <option value="Finance">Wealth & Finance</option>
              <option value="Health">Physical & Mental Health</option>
              <option value="Spiritual Path">Spiritual Evolution</option>
              <option value="Emotional Wellbeing">Emotional Wellbeing</option>
            </select>
          </div>

          <div className="radha-form-group">
            <label className="radha-label">Current Mood</label>
            <select 
              name="mood" 
              className="radha-select" 
              value={formData.mood} 
              onChange={handleChange}
            >
              <option value="Peaceful">Peaceful & Calm</option>
              <option value="Anxious">Anxious & Overwhelmed</option>
              <option value="Sad">Sad & Low Energy</option>
              <option value="Confused">Confused & Seeking Clarity</option>
              <option value="Joyful">Joyful & Grateful</option>
            </select>
          </div>

          <div className="radha-form-group full-width">
            <label className="radha-label">Gemini API Key</label>
            <input 
              type="password" 
              name="apiKey" 
              className="radha-input" 
              placeholder="AIzaSy..." 
              value={formData.apiKey} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <button type="submit" className="radha-btn" disabled={!formData.fullName || !formData.apiKey || isSubmitting}>
          <span>{isSubmitting ? 'Entering Realm...' : 'Join Spiritual Realm'}</span>
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
