import { useState, useRef, useEffect } from "react";
import { ArrowUp, User, Scale, Sparkles } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

interface UserMessage {
  role: "user";
  text: string;
  time: string;
}

interface BotMessage {
  role: "assistant";
  text: string;
  time: string;
}

type Message = UserMessage | BotMessage;

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Renders line breaks and bold (**text**) in bot messages
function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} style={{ fontWeight: 700, color: "#e2e8f0" }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>
            {part.split("\n").map((line, j, arr) => (
              <span key={j}>
                {line}
                {j < arr.length - 1 && <br />}
              </span>
            ))}
          </span>
        )
      )}
    </>
  );
}

export default function LegalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = textInput.trim();
    if (!trimmed || isAnalyzing) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed, time: getTime() }]);
    setIsAnalyzing(true);
    setTextInput("");

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: trimmed,
      });
      const data = response.data;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "Sorry, I couldn't process that.",
          time: getTime(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Please try again.",
          time: getTime(),
        },
      ]);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .chat-root {
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
          background: #080c14;
          padding: 6rem 1rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Header ── */
        .chat-header {
          text-align: center;
          margin-bottom: 2rem;
          max-width: 720px;
          width: 100%;
        }
        .chat-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,194,255,0.08);
          border: 1px solid rgba(0,194,255,0.2);
          border-radius: 999px;
          padding: 4px 14px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00C2FF;
          margin-bottom: 1rem;
        }
        .chat-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0 0 0.5rem;
        }
        .chat-title span {
          background: linear-gradient(90deg, #00C2FF, #7b8cde);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .chat-subtitle {
          color: #64748b;
          font-size: 0.95rem;
          font-weight: 400;
          margin: 0;
        }

        /* ── Chat Window ── */
        .chat-window {
          width: 100%;
          max-width: 720px;
          background: #0d1117;
          border: 1px solid #1e2a3a;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          height: 68vh;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0,194,255,0.04), 0 32px 80px rgba(0,0,0,0.6);
          position: relative;
        }

        /* top glow line */
        .chat-window::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00C2FF44, transparent);
          border-radius: 999px;
        }

        /* ── Window Chrome Bar ── */
        .chat-chrome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid #1e2a3a;
          background: #0a0f1a;
          flex-shrink: 0;
        }
        .chat-chrome-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chrome-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .chrome-dot.red   { background: #ff5f57; }
        .chrome-dot.yellow{ background: #febc2e; }
        .chrome-dot.green { background: #28c840; }
        .chrome-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-left: 4px;
        }
        .chrome-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: #22c55e;
          font-weight: 500;
        }
        .chrome-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── Messages Area ── */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          scroll-behavior: smooth;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb {
          background: #1e2a3a;
          border-radius: 999px;
        }

        /* Empty state */
        .chat-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #334155;
          text-align: center;
          padding: 2rem;
        }
        .chat-empty-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: #0d1a2a;
          border: 1px solid #1e2a3a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e3a5f;
        }
        .chat-empty h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #334155;
          margin: 0;
        }
        .chat-empty p {
          font-size: 0.8rem;
          color: #1e2a3a;
          margin: 0;
          max-width: 260px;
        }

        /* ── Message Row ── */
        .msg-row {
          display: flex;
          gap: 12px;
          animation: msg-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        .msg-row.user  { flex-direction: row-reverse; }
        .msg-row.assistant { flex-direction: row; }

        /* Avatar */
        .msg-avatar {
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .msg-avatar.user {
          background: linear-gradient(135deg, #00C2FF22, #7b8cde22);
          border: 1px solid #00C2FF33;
          color: #00C2FF;
        }
        .msg-avatar.assistant {
          background: linear-gradient(135deg, #1e3a5f, #0d2240);
          border: 1px solid #1e3a5f;
          color: #7b8cde;
        }

        /* Bubble wrapper */
        .msg-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 78%;
        }
        .msg-row.user .msg-body { align-items: flex-end; }
        .msg-row.assistant .msg-body { align-items: flex-start; }

        /* Bubble */
        .msg-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.9rem;
          line-height: 1.65;
          font-weight: 400;
          word-break: break-word;
        }
        .msg-row.user .msg-bubble {
          background: linear-gradient(135deg, #0077a8, #004f72);
          color: #e0f7ff;
          border: 1px solid #00688833;
          border-bottom-right-radius: 4px;
        }
        .msg-row.assistant .msg-bubble {
          background: #111827;
          color: #cbd5e1;
          border: 1px solid #1e2a3a;
          border-bottom-left-radius: 4px;
          font-family: 'Sora', sans-serif;
        }

        /* Timestamp */
        .msg-time {
          font-size: 0.68rem;
          color: #334155;
          font-weight: 400;
          letter-spacing: 0.02em;
          padding: 0 4px;
        }

        /* ── Typing Indicator ── */
        .typing-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          animation: msg-in 0.25s ease both;
        }
        .typing-bubble {
          background: #111827;
          border: 1px solid #1e2a3a;
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 14px 18px;
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .typing-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #1e3a5f;
          animation: bounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0);  background: #1e3a5f; }
          40%          { transform: translateY(-6px); background: #00C2FF; }
        }

        /* ── Input Bar ── */
        .chat-inputbar {
          padding: 16px 20px;
          border-top: 1px solid #1e2a3a;
          background: #0a0f1a;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .chat-input {
          flex: 1;
          background: #0d1117;
          border: 1px solid #1e2a3a;
          border-radius: 12px;
          padding: 12px 16px;
          color: #e2e8f0;
          font-family: 'Sora', sans-serif;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .chat-input::placeholder { color: #334155; }
        .chat-input:focus {
          border-color: #00C2FF44;
          box-shadow: 0 0 0 3px rgba(0,194,255,0.06);
        }
        .send-btn {
          width: 44px; height: 44px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
          background: linear-gradient(135deg, #0077a8, #005580);
          color: #fff;
          box-shadow: 0 4px 14px rgba(0,119,168,0.3);
        }
        .send-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #00a0d8, #0077a8);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,194,255,0.35);
        }
        .send-btn:active:not(:disabled) { transform: scale(0.96); }
        .send-btn:disabled {
          background: #1e2a3a;
          color: #334155;
          cursor: not-allowed;
          box-shadow: none;
        }

        .chat-hint {
          text-align: center;
          font-size: 0.7rem;
          color: #1e2a3a;
          padding: 8px 0 0;
          letter-spacing: 0.03em;
        }
      `}</style>

      <div className="chat-root">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-badge">
            <Sparkles size={11} /> AI-Powered
          </div>
          <h1 className="chat-title">
            Legal <span>Assistant</span>
          </h1>
          <p className="chat-subtitle">
            Ask anything about law — get clear, instant answers.
          </p>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {/* Chrome bar */}
          <div className="chat-chrome">
            <div className="chat-chrome-left">
              <span className="chrome-dot red" />
              <span className="chrome-dot yellow" />
              <span className="chrome-dot green" />
              <span className="chrome-title">JurisAssist</span>
            </div>
            <div className="chrome-status">
              <span className="chrome-status-dot" />
              Online
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-empty-icon">
                  <Scale size={22} />
                </div>
                <h3>Start a conversation</h3>
                <p>Ask about contracts, rights, procedures, or any legal question.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`msg-row ${msg.role}`}>
                  <div className={`msg-avatar ${msg.role}`}>
                    {msg.role === "user" ? <User size={15} /> : <Scale size={15} />}
                  </div>
                  <div className="msg-body">
                    <div className="msg-bubble">
                      {msg.role === "assistant" ? (
                        <FormattedText text={msg.text} />
                      ) : (
                        msg.text
                      )}
                    </div>
                    <span className="msg-time">{msg.time}</span>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isAnalyzing && (
              <div className="typing-row">
                <div className="msg-avatar assistant">
                  <Scale size={15} />
                </div>
                <div className="typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="chat-inputbar">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask a legal question…"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isAnalyzing}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={isAnalyzing || !textInput.trim()}
              title="Send"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <p className="chat-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </>
  );
}