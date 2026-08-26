import { useState } from "react";
import {
  Bot,
  Send,
  Paperclip,
  Search,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
  User,
  ShieldCheck,
  Sparkles,
  MessageCircle,
} from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function ClientMessages() {
  const [activeChat, setActiveChat] = useState("ai");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your JurisAssist AI Legal Assistant. How can I help you today?",
      time: "10:30 PM",
    },
    {
      id: 2,
      sender: "ai",
      text: "You can ask me about contracts, legal documents, clauses, risks, or general legal information.",
      time: "10:30 PM",
    },
  ]);

  const [advocateMessages, setAdvocateMessages] = useState([
    {
      id: 1,
      sender: "advocate",
      text: "Hello Ahmed, I've reviewed the employment agreement you uploaded.",
      time: "9:42 PM",
    },
    {
      id: 2,
      sender: "advocate",
      text: "There are a few clauses that I recommend discussing before you sign the agreement.",
      time: "9:44 PM",
    },
    {
      id: 3,
      sender: "client",
      text: "Thank you. Can you explain the termination clause to me?",
      time: "9:48 PM",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "client",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    if (activeChat === "ai") {
      setAiMessages((current) => [
        ...current,
        newMessage,
      ]);

      setTimeout(() => {
        setAiMessages((current) => [
          ...current,
          {
            id: Date.now() + 1,
            sender: "ai",
            text: "I've received your question. I can help explain legal concepts and documents in simple language. Please remember that AI information is not a substitute for advice from a qualified lawyer.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 700);
    } else {
      setAdvocateMessages((current) => [
        ...current,
        newMessage,
      ]);
    }

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentMessages =
    activeChat === "ai"
      ? aiMessages
      : advocateMessages;

  return (
    <DashboardLayout role="client">

      <PageHeader
        title="Messages"
        description="Chat with your AI legal assistant or communicate directly with your advocate."
      />

      <div className="mt-6">

        {/* =====================================================
            MESSAGE CONTAINER
        ===================================================== */}

        <div className="grid h-[calc(100vh-230px)] min-h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:grid-cols-12">

          {/* ===================================================
              LEFT SIDEBAR
          =================================================== */}

          <aside
            className={`border-white/10 bg-[#0b1220] lg:col-span-4 lg:block ${
              activeChat ? "hidden lg:block" : "block"
            }`}
          >

            {/* Header */}

            <div className="border-b border-white/10 p-5">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    Messages
                  </h2>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Your conversations
                  </p>

                </div>

                <MessageCircle className="h-5 w-5 text-[#00C2FF]" />

              </div>

              {/* Search */}

              <div className="relative mt-4">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search conversations..."
                  className="w-full rounded-xl border border-white/10 bg-[#111827] py-2.5 pl-10 pr-3 text-xs text-gray-300 outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/30"
                />

              </div>

            </div>

            {/* Conversations */}

            <div className="p-3">

              {/* AI Assistant */}

              <button
                onClick={() => setActiveChat("ai")}
                className={`mb-2 w-full rounded-xl p-4 text-left transition ${
                  activeChat === "ai"
                    ? "border border-[#00C2FF]/20 bg-[#00C2FF]/10"
                    : "border border-transparent hover:bg-white/5"
                }`}
              >

                <div className="flex gap-3">

                  <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/10">

                    <Bot className="h-5 w-5 text-[#00C2FF]" />

                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b1220] bg-[#00FF88]" />

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-sm font-semibold text-white">
                        AI Legal Assistant
                      </h3>

                      <span className="text-[9px] text-gray-700">
                        Now
                      </span>

                    </div>

                    <p className="mt-1 truncate text-[10px] text-gray-600">
                      Ask questions about your legal documents...
                    </p>

                    <div className="mt-2 flex items-center gap-1">

                      <Sparkles className="h-3 w-3 text-[#00FF88]" />

                      <span className="text-[9px] text-[#00FF88]">
                        AI Assistant
                      </span>

                    </div>

                  </div>

                </div>

              </button>

              {/* Advocate */}

              <button
                onClick={() =>
                  setActiveChat("advocate")
                }
                className={`w-full rounded-xl p-4 text-left transition ${
                  activeChat === "advocate"
                    ? "border border-[#00C2FF]/20 bg-[#00C2FF]/10"
                    : "border border-transparent hover:bg-white/5"
                }`}
              >

                <div className="flex gap-3">

                  <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-600/30 to-gray-800/30">

                    <User className="h-5 w-5 text-gray-400" />

                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b1220] bg-[#00FF88]" />

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-sm font-semibold text-white">
                        Muhammad Ahmed
                      </h3>

                      <span className="text-[9px] text-gray-700">
                        9:48 PM
                      </span>

                    </div>

                    <p className="mt-1 truncate text-[10px] text-gray-600">
                      Can you explain the termination clause...
                    </p>

                    <div className="mt-2 flex items-center gap-1">

                      <ShieldCheck className="h-3 w-3 text-[#00C2FF]" />

                      <span className="text-[9px] text-[#00C2FF]">
                        Advocate
                      </span>

                    </div>

                  </div>

                </div>

              </button>

            </div>

          </aside>

          {/* ===================================================
              CHAT AREA
          =================================================== */}

          <main
            className={`flex flex-col bg-[#0D1117] lg:col-span-8 ${
              activeChat
                ? "flex"
                : "hidden lg:flex"
            }`}
          >

            {/* =================================================
                CHAT HEADER
            ================================================= */}

            <div className="flex items-center justify-between border-b border-white/10 bg-[#111827]/80 px-4 py-4 backdrop-blur-md sm:px-6">

              <div className="flex items-center gap-3">

                {/* Mobile back */}

                <button
                  onClick={() =>
                    setActiveChat("")
                  }
                  className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white lg:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Avatar */}

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    activeChat === "ai"
                      ? "bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/10"
                      : "bg-white/10"
                  }`}
                >

                  {activeChat === "ai" ? (
                    <Bot className="h-5 w-5 text-[#00C2FF]" />
                  ) : (
                    <User className="h-5 w-5 text-gray-400" />
                  )}

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="text-sm font-semibold text-white">

                      {activeChat === "ai"
                        ? "AI Legal Assistant"
                        : "Muhammad Ahmed"}

                    </h3>

                    <span className="h-2 w-2 rounded-full bg-[#00FF88]" />

                  </div>

                  <p className="mt-1 text-[10px] text-gray-600">

                    {activeChat === "ai"
                      ? "Available • AI-powered assistance"
                      : "Online • Corporate & Employment Lawyer"}

                  </p>

                </div>

              </div>

              {/* Actions */}

              <div className="flex items-center gap-1">

                {activeChat === "advocate" && (
                  <>
                    <button
                      title="Call"
                      className="rounded-lg p-2.5 text-gray-600 transition hover:bg-white/5 hover:text-[#00C2FF]"
                    >
                      <Phone className="h-4 w-4" />
                    </button>

                    <button
                      title="Video Call"
                      className="rounded-lg p-2.5 text-gray-600 transition hover:bg-white/5 hover:text-[#00C2FF]"
                    >
                      <Video className="h-4 w-4" />
                    </button>
                  </>
                )}

                <button
                  title="More"
                  className="rounded-lg p-2.5 text-gray-600 transition hover:bg-white/5 hover:text-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

              </div>

            </div>

            {/* =================================================
                AI NOTICE
            ================================================= */}

            {activeChat === "ai" && (
              <div className="border-b border-[#00C2FF]/10 bg-[#00C2FF]/[0.03] px-5 py-3">

                <div className="mx-auto flex max-w-3xl items-start gap-2">

                  <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#00C2FF]" />

                  <p className="text-[9px] leading-5 text-gray-600">
                    AI-generated information is for general
                    informational purposes and does not replace
                    professional legal advice.
                  </p>

                </div>

              </div>
            )}

            {/* =================================================
                MESSAGES
            ================================================= */}

            <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">

              <div className="mx-auto mb-6 flex justify-center">

                <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[9px] text-gray-700">
                  Today
                </span>

              </div>

              {currentMessages.map((item) => {

                const isClient =
                  item.sender === "client";

                const isAI =
                  item.sender === "ai";

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isClient
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`flex max-w-[85%] gap-3 sm:max-w-[70%] ${
                        isClient
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >

                      {/* Avatar */}

                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                          isClient
                            ? "bg-[#00C2FF]/10"
                            : isAI
                            ? "bg-[#00FF88]/10"
                            : "bg-white/10"
                        }`}
                      >

                        {isClient ? (
                          <User className="h-4 w-4 text-[#00C2FF]" />
                        ) : isAI ? (
                          <Bot className="h-4 w-4 text-[#00FF88]" />
                        ) : (
                          <User className="h-4 w-4 text-gray-500" />
                        )}

                      </div>

                      {/* Message */}

                      <div>

                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            isClient
                              ? "rounded-tr-sm bg-gradient-to-r from-[#00C2FF]/20 to-[#00C2FF]/10 border border-[#00C2FF]/10"
                              : "rounded-tl-sm border border-white/10 bg-white/5"
                          }`}
                        >

                          <p className="text-xs leading-6 text-gray-300">
                            {item.text}
                          </p>

                        </div>

                        <div
                          className={`mt-1 flex items-center gap-2 ${
                            isClient
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >

                          <span className="text-[8px] text-gray-700">
                            {item.time}
                          </span>

                          {isClient && (
                            <span className="text-[8px] text-[#00C2FF]">
                              Delivered
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* =================================================
                QUICK QUESTIONS
            ================================================= */}

            {activeChat === "ai" && (
              <div className="border-t border-white/5 px-4 pt-3">

                <div className="flex gap-2 overflow-x-auto pb-2">

                  {[
                    "Explain my contract",
                    "Find risky clauses",
                    "Summarize this document",
                  ].map((question) => (
                    <button
                      key={question}
                      onClick={() =>
                        setMessage(question)
                      }
                      className="flex-shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[9px] text-gray-600 transition hover:border-[#00C2FF]/20 hover:text-[#00C2FF]"
                    >
                      {question}
                    </button>
                  ))}

                </div>

              </div>
            )}

            {/* =================================================
                MESSAGE INPUT
            ================================================= */}

            <div className="border-t border-white/10 bg-[#111827]/50 p-4 sm:p-5">

              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[#0b1220] p-2 focus-within:border-[#00C2FF]/30">

                <button
                  title="Attach file"
                  className="mb-0.5 rounded-xl p-2.5 text-gray-700 transition hover:bg-white/5 hover:text-[#00C2FF]"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder={
                    activeChat === "ai"
                      ? "Ask your AI legal assistant..."
                      : "Write a message to your advocate..."
                  }
                  className="max-h-28 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2.5 text-xs text-gray-300 outline-none placeholder:text-gray-700"
                />

                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>

              </div>

              <p className="mt-2 text-center text-[8px] text-gray-800">
                Press Enter to send • Shift + Enter for a new line
              </p>

            </div>

          </main>

        </div>

      </div>

    </DashboardLayout>
  );
}