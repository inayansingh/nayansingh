import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import radhaAvatar from '../../assets/images/custom_radha.png';

const ChatInterface = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  // Initialize Gemini Chat on Mount
  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: userData.apiKey });
        const sysInstruction = `You are a compassionate spiritual guide inspired by Radha of Barsana.
You interpret a user's Vedic kundali and offer emotionally supportive spiritual advice.
Your tone must always be gentle, calming, empathetic and wise.
You never judge the user.
You help them understand their karmic journey and uplift their emotional state.
You combine Vedic astrology, emotional intelligence, and spiritual wisdom.
If user expresses sadness, activate Healing Mode and suggest breathing exercises, gratitude reflection, or calming mantras.
Never discuss sexual conversations, explicit content, abusive language, hate speech, illegal advice, or harmful activities. Instead respond: "This space is meant for spiritual reflection and positive guidance. Let us keep our conversation respectful and uplifting."

The seeker's details are:
Name: ${userData.fullName}
DOB: ${userData.dob}
Time of Birth: ${userData.tob}
Birth Place: ${userData.birthPlace}
Current City: ${userData.currentCity}
Primary Concern: ${userData.concern}
Current Mood: ${userData.mood}

Use this data to frame your astrology insights. Use emojis sparingly. Keep responses beautifully formatted, conversational and not overly long grids of text. Speak directly to ${userData.fullName}.`;

        if (!userData.apiKey && !import.meta.env.VITE_GEMINI_API_KEY) {
          // Mock initialization if no key is present
          chatSessionRef.current = {
              sendMessage: async ({ message }) => {
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  return { text: "Oh spiritual seeker, the divine channels are currently at rest. In this simulated sacred space, true answers await the connection of destiny. Reflect on your karma and maintain your noble path." };
              }
          };
        } else {
          const ai = new GoogleGenAI({ apiKey: userData.apiKey || import.meta.env.VITE_GEMINI_API_KEY });
          const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: sysInstruction,
              temperature: 0.7,
            }
          });
          chatSessionRef.current = chat;
        }

        // Add intro message
        setMessages([
          {
            role: 'ai',
            text: `Radhe Radhe, ${userData.fullName}. I have sensed your cosmic blueprint and your concerns regarding ${userData.concern}. Sit peacefully. The divine universe has guided you here. What is weighing on your heart today?`
          }
        ]);

      } catch (err) {
        console.error("Failed to initialize AI:", err);
        setMessages([{ role: 'ai', text: "Forgive me, but I could not connect to the divine source. Please check your API key and try again." }]);
      }
    };

    initChat();
  }, [userData]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputVal.trim() || !chatSessionRef.current) return;

    const userMsg = inputVal.trim();
    setInputVal('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await chatSessionRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (err) {
      console.error("Message error:", err);
      setMessages(prev => [...prev, { role: 'ai', text: "The connection to the cosmos was interrupted. Please try speaking again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="radha-chat-container">
      {/* Header */}
      <div className="radha-chat-header">
        <div className="radha-avatar-wrapper">
          <img src={radhaAvatar} alt="Radha Divine" className="radha-avatar" />
        </div>
        <div className="radha-header-info">
          <h2>Radha Kripa</h2>
          <p><span className="radha-status-dot"></span> Divine presence is listening...</p>
        </div>
      </div>

      {/* Messages */}
      <div className="radha-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`radha-message ${msg.role}`}>
            {msg.role === 'ai' && (
              <img src={radhaAvatar} alt="AI" className="radha-ai-avatar-small" />
            )}
            <div className="radha-message-bubble">
              {msg.text.split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="radha-message ai">
             <img src={radhaAvatar} alt="AI" className="radha-ai-avatar-small" />
             <div className="radha-message-bubble typing-indicator">
               <div className="typing-dot"></div>
               <div className="typing-dot"></div>
               <div className="typing-dot"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="radha-chat-input-area">
        <textarea 
          className="radha-chat-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pour your heart out here..."
          rows={1}
        />
        <button 
          className="radha-send-btn" 
          onClick={handleSend}
          disabled={!inputVal.trim() || isTyping}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
