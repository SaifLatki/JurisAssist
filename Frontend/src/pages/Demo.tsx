import { useState, useRef, useEffect } from "react";
import { ArrowUp, User, Bot } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from 'axios';

// Define the types for messages
interface UserMessage {
  role: "user";
  text: string;
}

interface BotMessage {
  role: "assistant";
  text: string;
}

type Message = UserMessage | BotMessage;

export default function LegalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!textInput) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", text: textInput }]);
    setIsAnalyzing(true);

    try {
      // Call your backend chat API
      const response = await axios.post('http://localhost:5000/chat', {
        message:textInput
      });

      const data = response.data;

      // Add bot response to chat
      const botMessage: BotMessage = {
        role: "assistant",
        text: data.reply || "Sorry, I couldn't process that.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while sending the message.");
    } finally {
      setIsAnalyzing(false);
      setTextInput("");
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Heading */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          AI Legal Assistant Chat
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Chat with the AI legal assistant — upload documents and get instant
          insights!
        </p>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-[#00C2FF]/10 p-6 h-[70vh] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl text-white shadow-lg flex items-center gap-2 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-[#00C2FF] to-slate-600 shadow-[#00C2FF]/30"
                    : "bg-white/10 border border-white/10 backdrop-blur-md"
                }`}
              >
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="mt-4 flex items-center gap-3">
          {/* File upload commented out for now */}
          {/* <label className="bg-white/10 border border-white/10 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/20 transition-all">
            <FolderUpIcon className="w-5 h-5 text-white" />
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label> */}

          <input
            type="text"
            className="flex-1 bg-white/5 border border-white/10 text-white p-3 rounded-xl outline-none placeholder-gray-400"
            placeholder="Type a message…"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-slate-500 to-slate-700 px-5 py-3 rounded-xl text-white font-semibold shadow-lg"
            disabled={isAnalyzing}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {isAnalyzing && <LoadingSpinner />}
    </div>
  );
}
