import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Send, RotateCcw, ChevronRight,
  Loader2, UserCircle, Bot, Zap, Brain
} from 'lucide-react';
import { chat } from '../creatorAgent.js';

const QUESTION_CHIPS = [
  "Why did my last post underperform?",
  "What should I post today?",
  "Build me a content plan for next week",
  "Analyze my audience mood",
  "Which competitor should I watch most?",
  "How do I improve my hook game?",
  "Am I ready for brand deals?",
  "What's the best platform for my niche right now?",
];

export default function GrowthCopilot({ apiKey, CREATOR_PROFILE, POSTS, AUDIENCE }) {
  const [messages, setMessages]     = useState([]);
  const [input, setInput]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [personaMode, setPersonaMode] = useState('strategic');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    if (!apiKey) {
      setMessages(prev => [...prev,
        { role: 'user', content: userMsg },
        { role: 'model', content: '⚠️ Please enter your Gemini API Key in the sidebar to activate the Growth Copilot.' }
      ]);
      setInput('');
      return;
    }

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await chat(messages, userMsg, CREATOR_PROFILE, AUDIENCE, POSTS, personaMode, apiKey);
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="cos-copilot">
      {/* Header */}
      <div className="cos-section-hd">
        <div>
          <h2 className="cos-section-title">Growth Copilot</h2>
          <p className="cos-section-sub">Your AI Chief Growth Officer — ask anything about your content strategy</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Persona Toggle */}
          <div className="cos-persona-toggle">
            <button
              className={`cos-persona-btn ${personaMode === 'strategic' ? 'active' : ''}`}
              onClick={() => setPersonaMode('strategic')}
            >
              <Brain size={14} /> Strategic
            </button>
            <button
              className={`cos-persona-btn ${personaMode === 'creative' ? 'active' : ''}`}
              onClick={() => setPersonaMode('creative')}
            >
              <Zap size={14} /> Creative
            </button>
          </div>
          {messages.length > 0 && (
            <button className="cos-btn-ghost cos-btn-sm" onClick={clearChat}>
              <RotateCcw size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="cos-chat-wrapper">
        {messages.length === 0 && (
          <div className="cos-chat-empty">
            <div className="cos-chat-empty-icon">
              <Bot size={36} style={{ color: 'var(--cos-violet-lt)' }} />
            </div>
            <h3 className="cos-chat-empty-title">
              {personaMode === 'strategic' ? 'Strategic Advisor Mode' : 'Creative Partner Mode'}
            </h3>
            <p className="cos-chat-empty-sub">
              {personaMode === 'strategic'
                ? 'Data-driven insights, metric-backed recommendations, and growth strategy.'
                : 'Fresh ideas, creative angles, and content concepts tailored to your style.'}
            </p>
            <p className="cos-chat-empty-hint">Try one of these questions:</p>
            <div className="cos-chips-grid">
              {QUESTION_CHIPS.map((q, i) => (
                <button key={i} className="cos-question-chip" onClick={() => sendMessage(q)}>
                  <ChevronRight size={12} style={{ flexShrink: 0 }} />
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="cos-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`cos-msg-row ${msg.role}`}>
                <div className="cos-msg-avatar">
                  {msg.role === 'user'
                    ? <UserCircle size={18} style={{ color: 'var(--cos-violet-lt)' }} />
                    : <Bot size={18} style={{ color: 'var(--cos-emerald)' }} />
                  }
                </div>
                <div className="cos-msg-bubble">
                  <div className="cos-msg-meta">
                    {msg.role === 'user' ? 'You' : `CreatorOS${personaMode === 'creative' ? ' ⚡' : ' 🧠'}`}
                  </div>
                  <div className="cos-msg-text">{msg.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="cos-msg-row model">
                <div className="cos-msg-avatar">
                  <Bot size={18} style={{ color: 'var(--cos-emerald)' }} />
                </div>
                <div className="cos-msg-bubble">
                  <div className="cos-msg-meta">CreatorOS</div>
                  <div className="cos-typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Quick chips (when chat has started) */}
      {messages.length > 0 && !loading && (
        <div className="cos-quick-chips">
          {QUESTION_CHIPS.slice(0, 4).map((q, i) => (
            <button key={i} className="cos-chip" onClick={() => sendMessage(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="cos-chat-input-row">
        <textarea
          className="cos-chat-input"
          placeholder={`Ask your ${personaMode === 'creative' ? 'creative partner' : 'strategic advisor'} anything...`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
          }}
          rows={2}
        />
        <button
          className="cos-btn-primary cos-send-btn"
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
        >
          {loading ? <Loader2 size={18} className="cos-spin-icon" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
}
