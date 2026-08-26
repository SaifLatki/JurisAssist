import { useEffect, useRef, useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  User,
  CheckCheck,
  FileText,
  Image as ImageIcon,
  Smile,
  X,
  ArrowLeft,
} from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function AdvocateMessages() {
  const [selectedClient, setSelectedClient] =
    useState(null);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  const [showDetails, setShowDetails] =
    useState(false);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      avatar: "AK",
      status: "Online",
      case: "Employment Contract Dispute",
      lastMessage:
        "Thank you, I will send the document today.",
      time: "10:42 PM",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Hello Advocate, I wanted to ask about my employment case.",
          time: "10:30 PM",
        },
        {
          id: 2,
          sender: "advocate",
          text: "Hello Ahmed. Of course. What would you like to know?",
          time: "10:32 PM",
        },
        {
          id: 3,
          sender: "client",
          text: "Do I need to provide the original employment agreement?",
          time: "10:35 PM",
        },
        {
          id: 4,
          sender: "advocate",
          text: "A clear copy is enough for the initial review. Please also send any termination notice you received.",
          time: "10:38 PM",
        },
        {
          id: 5,
          sender: "client",
          text: "Thank you, I will send the document today.",
          time: "10:42 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara@example.com",
      avatar: "SA",
      status: "Offline",
      case: "Property Ownership Dispute",
      lastMessage:
        "Can we discuss this tomorrow?",
      time: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "I have uploaded the property documents.",
          time: "Yesterday",
        },
        {
          id: 2,
          sender: "advocate",
          text: "Thank you Sara. I will review them and get back to you.",
          time: "Yesterday",
        },
        {
          id: 3,
          sender: "client",
          text: "Can we discuss this tomorrow?",
          time: "Yesterday",
        },
      ],
    },
    {
      id: 3,
      name: "Usman Raza",
      email: "usman@example.com",
      avatar: "UR",
      status: "Online",
      case: "Business Partnership Agreement",
      lastMessage:
        "I have made the requested changes.",
      time: "Yesterday",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "I have made the requested changes.",
          time: "Yesterday",
        },
      ],
    },
    {
      id: 4,
      name: "Fatima Noor",
      email: "fatima@example.com",
      avatar: "FN",
      status: "Offline",
      case: "Divorce & Custody Case",
      lastMessage:
        "Thank you for explaining everything.",
      time: "Aug 25",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Thank you for explaining everything.",
          time: "Aug 25",
        },
      ],
    },
    {
      id: 5,
      name: "Bilal Ahmed",
      email: "bilal@example.com",
      avatar: "BA",
      status: "Online",
      case: "Criminal Defense Case",
      lastMessage:
        "When is our next hearing?",
      time: "Aug 24",
      unread: 3,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "When is our next hearing?",
          time: "Aug 24",
        },
      ],
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedClient?.messages]);

  const filteredClients = clients.filter(
    (client) =>
      client.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      client.case
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleSelectClient = (client) => {
    setSelectedClient(client);

    setClients((current) =>
      current.map((item) =>
        item.id === client.id
          ? { ...item, unread: 0 }
          : item
      )
    );
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || !selectedClient) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "advocate",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };

    const updatedClient = {
      ...selectedClient,
      lastMessage: trimmedMessage,
      time: "Just now",
      messages: [
        ...selectedClient.messages,
        newMessage,
      ],
    };

    setSelectedClient(updatedClient);

    setClients((current) =>
      current.map((client) =>
        client.id === updatedClient.id
          ? updatedClient
          : client
      )
    );

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout role="advocate">
      <PageHeader
        title="Messages"
        description="Communicate directly and securely with your clients."
      />

      <div className="mt-6 flex h-[calc(100vh-230px)] min-h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {/* ==================================================
            CLIENT LIST
        ================================================== */}

        <div
          className={`w-full flex-shrink-0 border-r border-white/10 md:w-80 ${
            selectedClient
              ? "hidden md:block"
              : "block"
          }`}
        >
          {/* Search */}

          <div className="border-b border-white/10 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search clients..."
                className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-2.5 pl-10 pr-3 text-xs text-gray-300 outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/30"
              />
            </div>
          </div>

          {/* Client List */}

          <div className="h-full overflow-y-auto">
            {filteredClients.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <Search className="mx-auto h-8 w-8 text-gray-800" />

                <p className="mt-3 text-xs text-gray-600">
                  No clients found
                </p>
              </div>
            ) : (
              filteredClients.map(
                (client) => (
                  <ClientListItem
                    key={client.id}
                    client={client}
                    selected={
                      selectedClient?.id ===
                      client.id
                    }
                    onClick={() =>
                      handleSelectClient(
                        client
                      )
                    }
                  />
                )
              )
            )}
          </div>
        </div>

        {/* ==================================================
            CHAT
        ================================================== */}

        <div
          className={`flex min-w-0 flex-1 flex-col ${
            selectedClient
              ? "flex"
              : "hidden md:flex"
          }`}
        >
          {!selectedClient ? (
            <EmptyChat />
          ) : (
            <>
              {/* Chat Header */}

              <div className="flex items-center justify-between border-b border-white/10 bg-[#111827]/80 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    onClick={() =>
                      setSelectedClient(null)
                    }
                    className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white md:hidden"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <Avatar
                    initials={
                      selectedClient.avatar
                    }
                    online={
                      selectedClient.status ===
                      "Online"
                    }
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {selectedClient.name}
                    </h3>

                    <p className="truncate text-[10px] text-gray-600">
                      {selectedClient.case}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    title="Voice call"
                    className="hidden rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-[#00C2FF] sm:block"
                  >
                    <Phone className="h-4 w-4" />
                  </button>

                  <button
                    title="Video call"
                    className="hidden rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-[#00C2FF] sm:block"
                  >
                    <Video className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() =>
                      setShowDetails(
                        !showDetails
                      )
                    }
                    className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Client Details */}

              {showDetails && (
                <ClientDetails
                  client={selectedClient}
                  onClose={() =>
                    setShowDetails(false)
                  }
                />
              )}

              {/* Messages */}

              <div className="flex-1 space-y-4 overflow-y-auto bg-[#0d1626]/60 p-4 md:p-6">
                <div className="flex justify-center">
                  <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[9px] text-gray-700">
                    Today
                  </span>
                </div>

                {selectedClient.messages.map(
                  (item) => (
                    <MessageBubble
                      key={item.id}
                      message={item}
                    />
                  )
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}

              <div className="border-t border-white/10 bg-[#111827] p-3 md:p-4">
                <div className="flex items-end gap-2">
                  <button
                    title="Attach file"
                    className="mb-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-white/5 hover:text-[#00C2FF]"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>

                  <div className="flex flex-1 items-end rounded-xl border border-white/10 bg-[#0d1626]">
                    <textarea
                      value={message}
                      onChange={(e) =>
                        setMessage(
                          e.target.value
                        )
                      }
                      onKeyDown={handleKeyDown}
                      rows={1}
                      placeholder="Write a message..."
                      className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-4 py-3 text-sm text-gray-300 outline-none placeholder:text-gray-700"
                    />

                    <button
                      title="Emoji"
                      className="mb-1 mr-1 flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 hover:text-gray-400"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="mb-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-2 hidden text-center text-[9px] text-gray-800 sm:block">
                  Press Enter to send • Shift + Enter
                  for a new line
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ============================================================
   CLIENT LIST ITEM
============================================================ */

function ClientListItem({
  client,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b border-white/5 px-4 py-4 text-left transition ${
        selected
          ? "bg-[#00C2FF]/10"
          : "hover:bg-white/[0.03]"
      }`}
    >
      <Avatar
        initials={client.avatar}
        online={client.status === "Online"}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-white">
            {client.name}
          </p>

          <span className="flex-shrink-0 text-[9px] text-gray-700">
            {client.time}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-[10px] text-gray-600">
            {client.lastMessage}
          </p>

          {client.unread > 0 && (
            <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00C2FF] px-1.5 text-[9px] font-bold text-slate-950">
              {client.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ============================================================
   AVATAR
============================================================ */

function Avatar({
  initials,
  online,
}) {
  return (
    <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00C2FF]/30 to-[#00FF88]/20 text-xs font-bold text-[#00C2FF]">
      {initials}

      {online && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#111827] bg-[#00FF88]" />
      )}
    </div>
  );
}

/* ============================================================
   MESSAGE BUBBLE
============================================================ */

function MessageBubble({
  message,
}) {
  const isAdvocate =
    message.sender === "advocate";

  return (
    <div
      className={`flex ${
        isAdvocate
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] md:max-w-[65%] ${
          isAdvocate
            ? "items-end"
            : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isAdvocate
              ? "rounded-br-md bg-gradient-to-r from-[#00C2FF] to-[#00a8dc] text-white"
              : "rounded-bl-md border border-white/10 bg-white/5 text-gray-300"
          }`}
        >
          {message.text}
        </div>

        <div
          className={`mt-1 flex items-center gap-1 ${
            isAdvocate
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <span className="text-[9px] text-gray-700">
            {message.time}
          </span>

          {isAdvocate && (
            <CheckCheck className="h-3 w-3 text-[#00C2FF]" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CLIENT DETAILS
============================================================ */

function ClientDetails({
  client,
  onClose,
}) {
  return (
    <div className="border-b border-white/10 bg-[#111827] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400">
          Client Information
        </p>

        <button
          onClick={onClose}
          className="text-gray-700 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Info
          icon={User}
          label="Client"
          value={client.name}
        />

        <Info
          icon={FileText}
          label="Case"
          value={client.case}
        />

        <Info
          icon={User}
          label="Email"
          value={client.email}
        />
      </div>
    </div>
  );
}

/* ============================================================
   INFO
============================================================ */

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[#00C2FF]" />

        <span className="text-[9px] text-gray-700">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-xs text-gray-400">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   EMPTY CHAT
============================================================ */

function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00C2FF]/10">
        <Send className="h-7 w-7 text-[#00C2FF]" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        Your Client Messages
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">
        Select a client from the list to start
        communicating about their case.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-[#00FF88]/10 bg-[#00FF88]/5 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#00FF88]" />

        <span className="text-[10px] text-gray-500">
          Secure advocate-client communication
        </span>
      </div>
    </div>
  );
}