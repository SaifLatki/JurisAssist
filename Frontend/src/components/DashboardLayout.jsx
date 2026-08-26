import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Bot,
  MessageCircle,
  CalendarDays,
  UserRound,
  Users,
  ClipboardList,
  Menu,
  X,
  LogOut,
  Scale,
} from "lucide-react";

const clientItems = [
  {
    label: "Dashboard",
    path: "/client/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Documents",
    path: "/client/documents",
    icon: FileText,
  },
  {
    label: "AI Legal Assistant",
    path: "/client/ai-chat",
    icon: Bot,
  },
  {
    label: "Find Lawyers",
    path: "/client/lawyers",
    icon: Scale,
  },
  {
    label: "Messages",
    path: "/client/messages",
    icon: MessageCircle,
  },
  {
    label: "Appointments",
    path: "/client/appointments",
    icon: CalendarDays,
  },
  {
    label: "Profile",
    path: "/client/profile",
    icon: UserRound,
  },
];

const advocateItems = [
  {
    label: "Dashboard",
    path: "/advocate/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Client Requests",
    path: "/advocate/requests",
    icon: ClipboardList,
  },
  {
    label: "My Clients",
    path: "/advocate/clients",
    icon: Users,
  },
  {
    label: "Messages",
    path: "/advocate/messages",
    icon: MessageCircle,
  },
  {
    label: "Appointments",
    path: "/advocate/appointments",
    icon: CalendarDays,
  },
  {
    label: "Documents",
    path: "/advocate/documents",
    icon: FileText,
  },
  {
    label: "Profile",
    path: "/advocate/profile",
    icon: UserRound,
  },
];

export default function DashboardLayout({
  role = "client",
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const items =
    role === "advocate" ? advocateItems : clientItems;

  const portalTitle =
    role === "advocate"
      ? "Advocate Portal"
      : "Client Portal";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#0b1220]/95 backdrop-blur-xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Scale className="h-8 w-8 text-[#00C2FF]" />

              <div className="absolute inset-0 bg-[#00C2FF] blur-xl opacity-30" />
            </div>

            <span className="text-xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">
              JurisAssist
            </span>
          </button>

          {/* Mobile close */}

          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>

        </div>

        {/* Portal information */}

        <div className="px-5 py-6">

          <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">

            <p className="text-xs uppercase tracking-wider text-gray-500">
              {portalTitle}
            </p>

            <p className="mt-1 font-semibold">
              {role === "advocate"
                ? "Legal Professional"
                : "Legal Client"}
            </p>

          </div>

          {/* Navigation */}

          <nav className="space-y-1">

            {items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/20 shadow-lg shadow-[#00C2FF]/5"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-5 right-5 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 transition-all hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-5 w-5" />

          <span>Sign out</span>
        </button>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <div className="lg:pl-72">

        {/* Top Header */}

        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-[#0b1220]/80 px-4 backdrop-blur-xl sm:px-8">

          {/* Mobile menu */}

          <button
            className="rounded-lg p-2 text-gray-300 hover:bg-white/5 hover:text-[#00C2FF] lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* User information */}

          <div className="ml-auto flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold">
                {role === "advocate"
                  ? "Advocate"
                  : "Client"}
              </p>

              <p className="text-xs text-gray-500">
                JurisAssist account
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00C2FF]/30 bg-white/5 text-[#00C2FF]">
              <UserRound className="h-5 w-5" />
            </div>

          </div>

        </header>

        {/* Page Content */}

        <main className="p-4 sm:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}


/* =====================================================
   PAGE HEADER
===================================================== */

export function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-gray-400">
            {description}
          </p>
        )}

      </div>

      {action && (
        <div>
          {action}
        </div>
      )}

    </div>
  );
}


/* =====================================================
   STAT CARD
===================================================== */

export function StatCard({
  icon: Icon,
  label,
  value,
  note,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#00C2FF]/30 hover:bg-white/[0.07]">

      <div className="mb-4 flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C2FF]/10 text-[#00C2FF]">
          <Icon className="h-5 w-5" />
        </div>

        {note && (
          <span className="text-xs text-[#00FF88]">
            {note}
          </span>
        )}

      </div>

      <p className="text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-400">
        {label}
      </p>

    </div>
  );
}