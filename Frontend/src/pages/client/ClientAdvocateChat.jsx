import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Paperclip,
  Phone,
  Send,
  MoreVertical,
  Video,
  ShieldCheck,
  FileText,
  CheckCheck,
  Clock,
  X,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/DashboardLayout";

export default function ClientAdvocateChat() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "advocate",
      text: "Hello! I'm Sarah Ahmed. I've reviewed your request and I'm ready to help you.",
      time: "10:32 AM",
      status: "read",
    },
    {
      id: 2,
      sender: "client",
      text: "Thank you. I need help understanding a clause in my employment agreement.",
      time: "10:34 AM",
      status: "read",
    },
    {
      id: 3,
      sender: "advocate",
      text: "Of course. Please send me the relevant clause or upload the agreement, and I'll explain what it means.",
      time: "10:35 AM",
      status: "read",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() && !selectedFile) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "client",
      text:
        message.trim() ||
        `Attached document: ${selectedFile?.name}`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      file: selectedFile
        ? {
            name: selectedFile.name,
            size: selectedFile.size,
          }
        : null,
    };

    setMessages((previous) => [
      ...previous,
      newMessage,
    ]);

    setMessage("");
    setSelectedFile(null);

    /*
     * Later connect this section to your backend:
     *
     * POST /chat/advocate
     *
     * or create a dedicated:
     *
     * POST /messages
     */

    setTimeout(() => {
      const advocateReply = {
        id: Date.now() + 1,
        sender: "advocate",
        text: "I've received your message. I'll review the information and get back to you shortly.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "read",
      };

      setMessages((previous) => [
        ...previous,
        advocateReply,
      ]);
    }, 1500);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  return (
    <DashboardLayout role="client">

      <div className="flex h-[calc(100vh-8rem)] min-h-[620px] overflow-hidden rounded-2xl border border-white/10 bg-[#080f1c]/90 shadow-2xl">

        {/* =====================================================
            CHAT AREA
        ===================================================== */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* ===================================================
              HEADER
          =================================================== */}

          <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1626]/80 px-4 py-4 sm:px-6">

            <div className="flex min-w-0 items-center gap-3">

              {/* Back */}

              <button
                onClick={() =>
                  navigate("/client/lawyers")
                }
                className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
                title="Back to lawyers"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              {/* Lawyer avatar */}

              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200"
                  alt="Sarah Ahmed"
                  className="h-11 w-11 rounded-xl object-cover"
                />

                {isOnline && (
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0d1626] bg-[#00FF88]" />
                )}
              </div>

              {/* Lawyer details */}

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <h1 className="truncate font-semibold text-white">
                    Sarah Ahmed
                  </h1>

                  <span className="hidden rounded-full border border-[#00FF88]/20 bg-[#00FF88]/10 px-2 py-0.5 text-[10px] font-medium text-[#00FF88] sm:inline-block">
                    Verified Advocate
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <p className="truncate text-xs text-gray-500">
                    Corporate Law
                  </p>

                  <span className="text-gray-700">
                    •
                  </span>

                  <p
                    className={`text-xs ${
                      isOnline
                        ? "text-[#00FF88]"
                        : "text-gray-500"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </p>

                </div>

              </div>

            </div>


            {/* Header actions */}

            <div className="flex items-center gap-1">

              <button
                className="hidden rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-[#00C2FF] sm:block"
                title="Voice call"
              >
                <Phone className="h-5 w-5" />
              </button>

              <button
                className="hidden rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-[#00C2FF] sm:block"
                title="Video call"
              >
                <Video className="h-5 w-5" />
              </button>

              <button
                className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

            </div>

          </div>


          {/* ===================================================
              CONSULTATION STATUS
          =================================================== */}

          <div className="border-b border-white/5 bg-[#00C2FF]/[0.03] px-4 py-3 sm:px-6">

            <div className="mx-auto flex max-w-4xl items-center gap-3">

              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#00C2FF]/10">
                <ShieldCheck className="h-4 w-4 text-[#00C2FF]" />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-xs font-medium text-gray-300">
                  Consultation Active
                </p>

                <p className="truncate text-[11px] text-gray-600">
                  Messages in this conversation are associated with your legal consultation.
                </p>

              </div>

              <span className="hidden rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 px-3 py-1 text-[10px] text-[#00FF88] sm:block">
                Active
              </span>

            </div>

          </div>


          {/* ===================================================
              MESSAGES
          =================================================== */}

          <div className="flex-1 overflow-y-auto">

            <div className="mx-auto max-w-4xl space-y-5 px-4 py-6 sm:px-6">

              {/* Date */}

              <div className="flex items-center gap-3">

                <div className="h-px flex-1 bg-white/5" />

                <span className="text-[10px] text-gray-600">
                  TODAY
                </span>

                <div className="h-px flex-1 bg-white/5" />

              </div>


              {messages.map((item) => {

                const isClient =
                  item.sender === "client";

                return (
                  <div
                    key={item.id}
                    className={`flex gap-3 ${
                      isClient
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    {/* Advocate avatar */}

                    {!isClient && (
                      <img
                        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200"
                        alt="Sarah Ahmed"
                        className="h-8 w-8 flex-shrink-0 rounded-lg object-cover"
                      />
                    )}


                    <div
                      className={`max-w-[82%] sm:max-w-[70%] ${
                        isClient
                          ? "items-end"
                          : "items-start"
                      }`}
                    >

                      {/* Message */}

                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          isClient
                            ? "rounded-tr-md border border-[#00C2FF]/10 bg-gradient-to-r from-[#00C2FF]/15 to-[#00FF88]/10"
                            : "rounded-tl-md border border-white/10 bg-white/5"
                        }`}
                      >

                        <p className="text-sm leading-6 text-gray-300">
                          {item.text}
                        </p>


                        {/* Attached file */}

                        {item.file && (
                          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00C2FF]/10">
                              <FileText className="h-4 w-4 text-[#00C2FF]" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-white">
                                {item.file.name}
                              </p>

                              <p className="text-[10px] text-gray-600">
                                {(
                                  item.file.size /
                                  1024 /
                                  1024
                                ).toFixed(2)}{" "}
                                MB
                              </p>
                            </div>

                          </div>
                        )}

                      </div>


                      {/* Time */}

                      <div
                        className={`mt-1.5 flex items-center gap-1 ${
                          isClient
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <span className="text-[10px] text-gray-600">
                          {item.time}
                        </span>

                        {isClient && (
                          <CheckCheck
                            className={`h-3.5 w-3.5 ${
                              item.status === "read"
                                ? "text-[#00C2FF]"
                                : "text-gray-600"
                            }`}
                          />
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}


              <div ref={messagesEndRef} />

            </div>

          </div>


          {/* ===================================================
              FILE PREVIEW
          =================================================== */}

          {selectedFile && (
            <div className="border-t border-white/10 px-4 py-3 sm:px-6">

              <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-[#00C2FF]/20 bg-[#00C2FF]/5 p-3">

                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#00C2FF]/10">
                  <FileText className="h-4 w-4 text-[#00C2FF]" />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-medium text-white">
                    {selectedFile.name}
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Ready to send
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelectedFile(null)
                  }
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>

            </div>
          )}


          {/* ===================================================
              INPUT
          =================================================== */}

          <div className="border-t border-white/10 bg-[#080f1c] px-4 py-4 sm:px-6">

            <div className="mx-auto max-w-4xl">

              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] focus-within:border-[#00C2FF]/40">

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Write a message to Sarah..."
                  className="max-h-32 min-h-[54px] w-full resize-none bg-transparent px-14 py-4 pr-16 text-sm text-white outline-none placeholder:text-gray-600"
                />


                {/* Attachment */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-2.5 left-2.5 rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-[#00C2FF]"
                  title="Attach document"
                >
                  <Paperclip className="h-5 w-5" />
                </button>


                {/* Send */}

                <button
                  onClick={sendMessage}
                  disabled={
                    !message.trim() &&
                    !selectedFile
                  }
                  className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>

              </div>

              <p className="mt-2 text-center text-[10px] text-gray-600">
                Do not share passwords, payment information, or
                unnecessary sensitive personal information.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            DESKTOP LAWYER INFO SIDEBAR
        ===================================================== */}

        <aside className="hidden w-72 flex-shrink-0 border-l border-white/10 bg-[#0d1626]/50 xl:block">

          <div className="border-b border-white/10 p-6 text-center">

            <div className="relative mx-auto w-fit">

              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300"
                alt="Sarah Ahmed"
                className="h-24 w-24 rounded-2xl object-cover"
              />

              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-[#0d1626] bg-[#00FF88]" />

            </div>

            <h2 className="mt-4 font-semibold text-white">
              Sarah Ahmed
            </h2>

            <p className="mt-1 text-sm text-[#00FF88]">
              Corporate Law
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">

              <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                <ShieldCheck className="h-3 w-3 text-[#00FF88]" />
                Verified
              </span>

            </div>

          </div>


          {/* Lawyer Details */}

          <div className="space-y-5 p-6">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                Practice Area
              </p>

              <p className="mt-2 text-sm text-gray-300">
                Corporate & Commercial Law
              </p>

            </div>

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                Experience
              </p>

              <p className="mt-2 text-sm text-gray-300">
                8+ Years
              </p>

            </div>

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                Availability
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-[#00FF88]" />

                <span className="text-sm text-gray-300">
                  Available for consultation
                </span>

              </div>

            </div>


            {/* Consultation */}

            <div className="rounded-xl border border-[#00C2FF]/10 bg-[#00C2FF]/5 p-4">

              <div className="flex items-start gap-3">

                <Clock className="mt-0.5 h-4 w-4 text-[#00C2FF]" />

                <div>

                  <p className="text-xs font-medium text-white">
                    Response time
                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">
                    Usually responds within a few hours.
                  </p>

                </div>

              </div>

            </div>


            {/* End consultation */}

            <button
              onClick={() => {
                setIsOnline(false);
              }}
              className="w-full rounded-xl border border-red-400/20 bg-red-400/5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-400/10"
            >
              End Consultation
            </button>

          </div>

        </aside>

      </div>

    </DashboardLayout>
  );
}