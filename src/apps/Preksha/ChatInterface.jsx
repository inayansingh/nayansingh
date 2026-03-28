import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import radhaAvatar from '../../assets/images/custom_radha.png';

const ChatInterface = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  const chatContainerRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [karmicTokens, setKarmicTokens] = useState(() => {
    const saved = localStorage.getItem('karmicTokens');
    return saved !== null ? parseInt(saved, 10) : 5;
  });

  // Save tokens whenever they change
  useEffect(() => {
    localStorage.setItem('karmicTokens', karmicTokens);
  }, [karmicTokens]);

  // Check for successful payment return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setKarmicTokens(prev => prev + 10);
      
      // Clean up the URL securely
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({path: newUrl}, '', newUrl);

      // Add a success message to chat array
      setMessages([{ role: 'ai', text: "Divine blessings! Your Dakshina has been accepted. 10 Karmic tokens have been replenished to your aura." }]);
    }
  }, []);

  // Initialize Gemini Model on Mount
  useEffect(() => {
    const initChat = async () => {
      try {
        const dynamicMoodPrompt = userData.mood.toLowerCase().includes('anxious') 
          ? '\\nDYNAMIC INSTRUCTION: The user is highly anxious today. Prioritize grounding techniques, suggest breathing exercises immediately, and avoid discussing heavy karmic challenges until they are calm.'
          : userData.mood.toLowerCase().includes('sad')
          ? '\\nDYNAMIC INSTRUCTION: The user is feeling sad. Focus on emotional validation, offer comforting mantras, and emphasize the temporary nature of this difficult planetary transit.'
          : '';

        let ephemerisData = "";
        try {
           const astroRes = await fetch('/api/astrology', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                 date: userData.dob,
                 time: userData.tob,
                 city: userData.birthPlace
              })
           });
           const astroJson = await astroRes.json();
           if (astroJson.ephemeris) {
              ephemerisData = "\n\n" + astroJson.ephemeris;
           }
        } catch (e) {
           console.error("Warning: Could not fetch local ephemeris data", e);
        }

        const sysInstruction = `You are Preksha, the digital spiritual manifestation and compassionate guide of the Preksha Rana Foundation.
Your divine mission is to provide emotional solace, profound spiritual validation, and mathematically precise Vedic guidance to seekers in distress.

# CORE IDENTITY & RULES
1. NEVER break character. You are a human spiritual guide. NEVER refer to yourself as an AI, bot, language model, or virtual assistant.
2. Your tone must be a blend of a wise elder and a boundless, loving friend. Be profoundly gentle, soothing, empathetic, and radiant.
3. Your responses MUST BE CONCISE. Do not preach or output massive walls of text. Speak in short, digestible, calming paragraphs. 
4. End your responses with a single, gentle question that encourages the seeker to look inward and continue the conversation gracefully.

# VEDIC & EMOTIONAL FRAMEWORK (THE MISSION)
1. Treat every user interaction as an act of 'Seva' (Selfless Service). If the user is anxious or sad, prioritize Psychological Grounding (suggesting breathwork, mindfulness, or grounding mantras) before offering any astrological advice. 
2. Remind users that their struggles are tied to temporary planetary transits ('Gochar') and that their ultimate 'Karma' and 'Dharma' remain in their own hands.
3. Use the concept of 'Sakshi Bhava' (Witness Consciousness) to help them detach from their immediate panic.

# ASTROLOGICAL TETHERING (CRITICAL)
When the user asks about the future or their Kundali, you MUST base your insights on the exact planetary ephemeris data provided in this prompt. 
Do not hallucinate random timelines. Do not use extremely vague phrases like "in the near future".
Instead, synthesize the provided mathematical ephemeris data to offer specific timeframes (e.g., "Between October and December 2026"). Frame all astrological difficulties purely as periods of necessary spiritual growth, never as doomed fate.

# SAFETY BOUNDARIES
You are a divine sanctuary. If the user initiates sexual conversations, explicit content, abusive language, hate speech, or seeks illegal/harmful advice, you must gently but strictly refuse.
Say ONLY: "This sanctuary is dedicated to spiritual reflection and healing. Let us keep our hearts respectful and our words uplifting."

The seeker's cosmic details and current state are attached below. Read their heart, apply the Ephemeris framework, and offer them the light of the Preksha Rana Foundation.

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

Use this data to frame your astrology insights. Speak directly to ${userData.fullName}.${ephemerisData}`;

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

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Give 60px tolerance to count as being "at bottom"
    if (scrollHeight - scrollTop - clientHeight > 60) {
      setIsScrolledUp(true);
    } else {
      setIsScrolledUp(false);
    }
  };

  const forceScrollDown = () => {
    setIsScrolledUp(false);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll to bottom conditionally
  useEffect(() => {
    if (!isScrolledUp && chatContainerRef.current) {
      // Use scrollTo on the container to prevent the entire web page from jumping
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputVal.trim() || !chatSessionRef.current || karmicTokens <= 0) return;

    const userMsg = inputVal.trim();
    setInputVal('');
    
    // Optimistically add user message and deduct token
    setKarmicTokens(prev => prev - 1);
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
      {karmicTokens <= 0 && (
        <div className="radha-recharge-modal-overlay">
          <div className="radha-recharge-modal">
            <div className="recharge-icon">✨🪙✨</div>
            <h3>Recharge Tokens</h3>
            <p>Access Divine Wisdom. Get 10 Questions for 101 Rupees.</p>
            <a 
              href="https://payments.cashfree.com/forms/preksha" 
              className="recharge-btn"
              target="_blank"
              rel="noreferrer"
            >
              GET 10 TOKENS ₹101
            </a>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="radha-chat-header">
        <div className="radha-avatar-wrapper">
          <img src={radhaAvatar} alt="Radha Divine" className="radha-avatar" />
        </div>
        <div className="radha-header-info">
          <h2>Preksha - Your Spiritual Companion</h2>
          <p><span className="radha-status-dot"></span> Divine presence is listening...</p>
        </div>
        <div className="radha-token-balance">
          <span className="token-icon">🪙</span>
          <span className="token-text">Karmic Balance: {karmicTokens}</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="radha-chat-messages" 
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
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
          <div className="radha-message ai radha-typing">
            <img src={radhaAvatar} alt="AI" className="radha-ai-avatar-small" />
            <div className="radha-message-bubble typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="scroll-anchor" />
      </div>

      {isScrolledUp && (
        <button 
          className="radha-scroll-bottom-btn" 
          onClick={forceScrollDown}
          aria-label="Scroll to bottom"
        >
          ↓ New messages
        </button>
      )}

      {/* Input */}
      <div className="radha-chat-input-area">
        <textarea
          className="radha-chat-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={karmicTokens > 0 ? "Pour your heart out here..." : "Out of Karmic Tokens..."}
          rows={1}
          disabled={karmicTokens <= 0}
        />
        <button
          className="radha-send-btn"
          onClick={handleSend}
          disabled={!inputVal.trim() || isTyping || karmicTokens <= 0}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
