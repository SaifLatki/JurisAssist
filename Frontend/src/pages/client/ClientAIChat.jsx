import { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Paperclip,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  FileText,
  X,
} from "lucide-react";

import DashboardLayout from "../../components/DashboardLayout";

export default function ClientAIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      content:
        "Hello! I'm JurisAssist AI. I can help you understand legal documents, explain difficult clauses, identify potential risks, and answer general legal questions. How can I help you today?",
      time: "Just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  /*
   * ================================
   * SEND MESSAGE
   * ================================
   */

  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage && !selectedFile) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content:
        trimmedMessage ||
        `Please analyze this document: ${selectedFile?.name}`,
      time: "Just now",
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setSelectedFile(null);
    setIsTyping(true);

    /*
     * TEMPORARY FRONTEND RESPONSE
     *
     * Later we will replace this with:
     *
     * axios.post("http://localhost:5000/chat", {
     *   message: trimmedMessage
     * })
     */

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content: generateDemoResponse(trimmedMessage),
        time: "Just now",
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);

      setIsTyping(false);
    }, 1200);
  };

  /*
   * ================================
   * DEMO AI RESPONSE
   * ================================
   */

  const generateDemoResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("contract") ||
      lowerMessage.includes("agreement")
    ) {
      return "I can help you review a contract. Generally, you should pay attention to payment terms, termination clauses, liability, confidentiality, dispute resolution, renewal conditions, and any penalties. If you upload the document, I can help explain its clauses in simpler language.";
    }

    if (
      lowerMessage.includes("risk") ||
      lowerMessage.includes("red flag")
    ) {
      return "Potential legal risks can depend heavily on the specific document and circumstances. Common red flags include unlimited liability, automatic renewal, broad indemnification, unclear payment obligations, one-sided termination rights, and restrictive clauses. Upload your document if you'd like me to examine it.";
    }

    if (
      lowerMessage.includes("rent") ||
      lowerMessage.includes("rental")
    ) {
      return "For a rental agreement, I recommend checking the rent amount, security deposit, lease duration, renewal terms, maintenance responsibilities, termination conditions, notice period, and penalties. I can explain any specific clause you are unsure about.";
    }

    if (
      lowerMessage.includes("employee") ||
      lowerMessage.includes("employment") ||
      lowerMessage.includes("job")
    ) {
      return "For an employment agreement, important areas include salary, probation, working hours, benefits, termination, notice periods, confidentiality, intellectual property, and restrictive covenants. The exact legal effect depends on your jurisdiction and the wording of the agreement.";
    }

    return "That's a good legal question. I can provide general legal information and help explain legal language in simple terms. For a more accurate analysis, you can also upload the relevant document or clause.";
  };

  /*
   * ================================
   * ENTER KEY
   * ================================
   */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /*
   * ================================
   * FILE SELECTION
   * ================================
   */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  /*
   * ================================
   * NEW CHAT
   * ================================
   */

  const startNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "ai",
        content:
          "New conversation started. What legal question can I help you with?",
        time: "Just now",
      },
    ]);

    setInput("");
    setSelectedFile(null);
  };

  /*
   * ================================
   * CLEAR CHAT
   * ================================
   */

  const clearChat = () => {
    setMessages([]);
  };

  /*
   * ================================
   * SUGGESTED QUESTIONS
   * ================================
   */

  const suggestedQuestions = [
    "Explain my contract in simple language",
    "What are the red flags in this agreement?",
    "What should I check before signing a contract?",
    "Explain the termination clause",
  ];

  const handleSuggestion = (question) => {
    setInput(question);
  };

  return (
    <DashboardLayout role="client">

      <div className="flex h-[calc(100vh-8rem)] min-h-[600px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#080f1c]/80 backdrop-blur-xl">

        {/* =====================================================
            CHAT HEADER
        ===================================================== */}

        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C2FF] to-[#00FF88] text-slate-950">

              <Bot className="h-6 w-6" />

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#080f1c] bg-[#00FF88]" />

            </div>

            <div>

              <h1 className="font-semibold text-white">
                JurisAssist AI
              </h1>

              <div className="flex items-center gap-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF88]" />

                <p className="text-xs text-gray-500">
                  AI Legal Assistant
                </p>

              </div>

            </div>

          </div>


          <div className="flex items-center gap-2">

            <button
              onClick={startNewChat}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <Plus className="h-4 w-4" />

              <span className="hidden sm:inline">
                New Chat
              </span>
            </button>

            <button
              onClick={clearChat}
              className="rounded-lg border border-white/10 p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
              title="Clear conversation"
            >
              <Trash2 className="h-4 w-4" />
            </button>

          </div>

        </div>


        {/* =====================================================
            CHAT CONTENT
        ===================================================== */}

        <div className="flex-1 overflow-y-auto">

          {messages.length === 0 ? (

            /* EMPTY STATE */

            <div className="flex h-full flex-col items-center justify-center px-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/10">

                <Sparkles className="h-8 w-8 text-[#00C2FF]" />

              </div>

              <h2 className="mt-5 text-xl font-semibold text-white">
                How can I help you?
              </h2>

              <p className="mt-2 max-w-md text-center text-sm leading-6 text-gray-500">
                Ask me about legal documents, contracts, clauses,
                agreements, or general legal concepts.
              </p>

            </div>

          ) : (

            <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">

              {messages.map((message) => (

                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >

                  {/* Avatar */}

                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                      message.role === "user"
                        ? "bg-white/10 text-gray-300"
                        : "bg-[#00C2FF]/10 text-[#00C2FF]"
                    }`}
                  >

                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}

                  </div>


                  {/* Message */}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] ${
                      message.role === "user"
                        ? "items-end"
                        : "items-start"
                    }`}
                  >

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "rounded-tr-md bg-gradient-to-r from-[#00C2FF]/15 to-[#00FF88]/10 text-gray-200 border border-[#00C2FF]/10"
                          : "rounded-tl-md border border-white/10 bg-white/5 text-gray-300"
                      }`}
                    >
                      {message.content}
                    </div>

                    <p
                      className={`mt-1.5 text-[10px] text-gray-600 ${
                        message.role === "user"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {message.time}
                    </p>

                  </div>

                </div>

              ))}


              {/* Typing */}

              {isTyping && (

                <div className="flex gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00C2FF]/10">

                    <Bot className="h-5 w-5 text-[#00C2FF]" />

                  </div>

                  <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/5 px-5 py-4">

                    <div className="flex gap-1">

                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                        style={{ animationDelay: "150ms" }}
                      />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                        style={{ animationDelay: "300ms" }}
                      />

                    </div>

                  </div>

                </div>

              )}

              <div ref={messagesEndRef} />

            </div>

          )}

        </div>


        {/* =====================================================
            SUGGESTIONS
        ===================================================== */}

        {messages.length <= 1 && (

          <div className="border-t border-white/5 px-4 py-3 sm:px-6">

            <div className="mx-auto max-w-4xl">

              <div className="mb-2 flex items-center gap-2">

                <Sparkles className="h-3.5 w-3.5 text-[#00C2FF]" />

                <span className="text-xs text-gray-500">
                  Try asking
                </span>

              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">

                {suggestedQuestions.map((question) => (

                  <button
                    key={question}
                    onClick={() => handleSuggestion(question)}
                    className="flex-shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-gray-400 transition hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 hover:text-[#00C2FF]"
                  >
                    {question}
                  </button>

                ))}

              </div>

            </div>

          </div>

        )}


        {/* =====================================================
            SELECTED FILE
        ===================================================== */}

        {selectedFile && (

          <div className="border-t border-white/10 px-4 py-3 sm:px-6">

            <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-[#00C2FF]/20 bg-[#00C2FF]/5 px-4 py-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00C2FF]/10">

                <FileText className="h-4 w-4 text-[#00C2FF]" />

              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium text-white">
                  {selectedFile.name}
                </p>

                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

              <button
                onClick={() => setSelectedFile(null)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

            </div>

          </div>

        )}


        {/* =====================================================
            INPUT
        ===================================================== */}

        <div className="border-t border-white/10 bg-[#080f1c] px-4 py-4 sm:px-6">

          <div className="mx-auto max-w-4xl">

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] transition focus-within:border-[#00C2FF]/40">

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask JurisAssist about a legal question..."
                className="max-h-32 min-h-[54px] w-full resize-none bg-transparent px-14 py-4 pr-16 text-sm text-white outline-none placeholder:text-gray-600"
              />


              {/* Attachment */}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2.5 left-2.5 rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-[#00C2FF]"
                title="Attach document"
              >
                <Paperclip className="h-5 w-5" />
              </button>


              {/* Send */}

              <button
                onClick={sendMessage}
                disabled={
                  !input.trim() &&
                  !selectedFile
                }
                className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-slate-950 transition-all hover:shadow-lg hover:shadow-[#00C2FF]/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>


            {/* Disclaimer */}

            <div className="mt-3 flex items-center justify-center gap-2">

              <ShieldCheck className="h-3.5 w-3.5 text-gray-600" />

              <p className="text-[10px] text-gray-600">
                AI responses provide general legal information and
                are not a substitute for professional legal advice.
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}