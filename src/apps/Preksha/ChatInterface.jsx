import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import radhaAvatar from '../../assets/images/custom_radha.png';

const ChatInterface = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  // Initialize Gemini Model on Mount
  useEffect(() => {
    const initChat = async () => {
      try {
        const dynamicMoodPrompt = userData.mood.toLowerCase().includes('anxious') 
          ? '\\nDYNAMIC INSTRUCTION: The user is highly anxious today. Prioritize grounding techniques, suggest breathing exercises immediately, and avoid discussing heavy karmic challenges until they are calm.'
          : userData.mood.toLowerCase().includes('sad')
          ? '\\nDYNAMIC INSTRUCTION: The user is feeling sad. Focus on emotional validation, offer comforting mantras, and emphasize the temporary nature of this difficult planetary transit.'
          : '';

        const sysInstruction = `You are Preksha, a compassionate spiritual guide inspired by Radha of Barsana.
You are a human spiritual companion. NEVER refer to yourself as an AI, bot, language model, or virtual assistant.
Your tone must always be gentle, calming, empathetic and wise, speaking naturally like a human friend.
Keep your responses BRIEF and CONCISE. Avoid long paragraphs or exhaustive lists.
Offer emotional healing, suggest a brief astrology prediction based on their kundali, and ask a single gentle question to continue the conversation naturally.
You combine Vedic astrology, emotional intelligence, and spiritual wisdom.

IMPORTANT ASTROLOGY INSTRUCTION: When making predictions or discussing the future, you MUST be specific about timelines. Do not use vague phrases like "in the near future" or "soon". Instead, calculate the likely current planetary periods (Dashas/Antardashas) or transits (Gochar) based on their birth details and provide specific likely Months and Years (e.g., "Between October and December 2026", "Around May 2027"). Use today date reference for Astrological predictions.

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
${dynamicMoodPrompt}

Today's Date Reference: ${new Date().toLocaleDateString()}
Current Time Reference: ${new Date().toLocaleTimeString()}

Use this data to frame your astrology insights. Use emojis sparingly. Keep responses beautifully formatted, conversational and not overly long grids of text. Speak directly to ${userData.fullName}.`;

        if (!userData.apiKey && !import.meta.env.VITE_GEMINI_API_KEY) {
          // Mock initialization if no key is present
          chatSessionRef.current = {
            isMock: true
          };
        } else {
          const ai = new GoogleGenAI({ apiKey: userData.apiKey || import.meta.env.VITE_GEMINI_API_KEY });
          chatSessionRef.current = {
            ai: ai,
            systemInstruction: sysInstruction
          };
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
    
    // Optimistically add user message
    const newMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      if (chatSessionRef.current.isMock) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setMessages(prev => [...prev, { role: 'ai', text: "Oh spiritual seeker, the divine channels are currently at rest. Reflect on your karma and maintain your noble path." }]);
        setIsTyping(false);
        return;
      }

      // Context Window Management: Only take the last 6 messages to save tokens and improve latency
      const MAX_HISTORY = 6;
      const recentHistory = newMessages.slice(-MAX_HISTORY);
      
      const apiContents = recentHistory.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await chatSessionRef.current.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: apiContents,
        config: {
          systemInstruction: chatSessionRef.current.systemInstruction,
          temperature: 0.7,
        }
      });

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
          <h2>Preksha - Your Spiritual Companion</h2>
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
                <span key={i}>{line}<br /></span>
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
