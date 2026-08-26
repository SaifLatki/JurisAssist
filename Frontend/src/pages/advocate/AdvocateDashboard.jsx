import {
  Calendar,
  Users,
  MessageCircle,
  FileText,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Video,
  User,
  Briefcase,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function AdvocateDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Clients",
      value: "48",
      change: "+12%",
      description: "from last month",
      icon: Users,
      iconBg: "bg-[#00C2FF]/10",
      iconColor: "text-[#00C2FF]",
    },
    {
      title: "Appointments",
      value: "12",
      change: "+8%",
      description: "this month",
      icon: Calendar,
      iconBg: "bg-[#00FF88]/10",
      iconColor: "text-[#00FF88]",
    },
    {
      title: "Unread Messages",
      value: "7",
      change: "+3",
      description: "new messages",
      icon: MessageCircle,
      iconBg: "bg-purple-400/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Monthly Earnings",
      value: "$3,840",
      change: "+18%",
      description: "from last month",
      icon: DollarSign,
      iconBg: "bg-yellow-400/10",
      iconColor: "text-yellow-400",
    },
  ];

  const appointments = [
    {
      id: 1,
      client: "Ahmed Khan",
      case: "Contract Review",
      date: "Today",
      time: "11:00 AM",
      type: "Video Consultation",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
    {
      id: 2,
      client: "Sara Ali",
      case: "Property Dispute",
      date: "Today",
      time: "2:30 PM",
      type: "Office Consultation",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    {
      id: 3,
      client: "Usman Raza",
      case: "Business Agreement",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Phone Consultation",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    {
      id: 4,
      client: "Fatima Noor",
      case: "Family Matter",
      date: "Tomorrow",
      time: "4:00 PM",
      type: "Video Consultation",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200",
    },
  ];

  const recentClients = [
    {
      name: "Ahmed Khan",
      case: "Contract Review",
      lastMessage: "Thank you for reviewing the agreement.",
      time: "10 min ago",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
    {
      name: "Sara Ali",
      case: "Property Dispute",
      lastMessage: "I've uploaded the required documents.",
      time: "32 min ago",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    {
      name: "Usman Raza",
      case: "Business Agreement",
      lastMessage: "Can we discuss this tomorrow?",
      time: "1 hour ago",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    {
      name: "Fatima Noor",
      case: "Family Matter",
      lastMessage: "I have sent the court documents.",
      time: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200",
    },
  ];

  const activities = [
    {
      icon: FileText,
      title: "New document uploaded",
      description: "Ahmed Khan uploaded a contract.",
      time: "10 minutes ago",
      color: "text-[#00C2FF]",
      bg: "bg-[#00C2FF]/10",
    },
    {
      icon: MessageCircle,
      title: "New client message",
      description: "Sara Ali sent you a message.",
      time: "32 minutes ago",
      color: "text-[#00FF88]",
      bg: "bg-[#00FF88]/10",
    },
    {
      icon: Calendar,
      title: "Appointment confirmed",
      description: "Appointment with Fatima Noor confirmed.",
      time: "1 hour ago",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      icon: CheckCircle2,
      title: "Case completed",
      description: "Business Agreement case marked complete.",
      time: "3 hours ago",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <DashboardLayout role="advocate">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PageHeader
        title="Advocate Dashboard"
        description="Manage your clients, consultations, documents, and legal cases."
        action={
          <button
            onClick={() =>
              navigate("/advocate/appointments")
            }
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20"
          >
            <Calendar className="h-4 w-4" />
            View Appointments
          </button>
        }
      />

      {/* =====================================================
          WELCOME BANNER
      ===================================================== */}

      <div className="relative overflow-hidden rounded-2xl border border-[#00C2FF]/10 bg-gradient-to-r from-[#00C2FF]/10 via-white/[0.02] to-[#00FF88]/10 p-6">
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00FF88] shadow-lg shadow-[#00FF88]" />

              <span className="text-xs font-medium uppercase tracking-wider text-[#00FF88]">
                Advocate Account
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white">
              Good morning, Advocate
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              You have 4 upcoming consultations and 7 unread
              client messages that need your attention.
            </p>
          </div>

          <div className="hidden h-24 w-24 items-center justify-center rounded-2xl border border-[#00C2FF]/20 bg-[#00C2FF]/5 sm:flex">
            <Briefcase className="h-10 w-10 text-[#00C2FF]" />
          </div>
        </div>

        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#00C2FF]/5 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#00FF88]/5 blur-3xl" />
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00C2FF]/20 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon
                    className={`h-5 w-5 ${stat.iconColor}`}
                  />
                </div>

                <ArrowUpRight className="h-4 w-4 text-gray-700 transition group-hover:text-gray-400" />
              </div>

              <div className="mt-5">
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <div className="mt-1 flex items-end gap-3">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>

                  <span className="mb-1 text-xs font-medium text-[#00FF88]">
                    {stat.change}
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-gray-700">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* ===================================================
            UPCOMING APPOINTMENTS
        =================================================== */}

        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="font-semibold text-white">
                Upcoming Appointments
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Your next client consultations.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/advocate/appointments")
              }
              className="flex items-center gap-1 text-xs font-medium text-[#00C2FF] hover:text-[#00FF88]"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-5 transition hover:bg-white/[0.02]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Client */}

                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <img
                      src={appointment.image}
                      alt={appointment.client}
                      className="h-11 w-11 flex-shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {appointment.client}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-[#00FF88]">
                        {appointment.case}
                      </p>
                    </div>
                  </div>

                  {/* Date */}

                  <div className="flex items-center gap-3 sm:w-32">
                    <Calendar className="h-4 w-4 flex-shrink-0 text-[#00C2FF]" />

                    <div>
                      <p className="text-xs font-medium text-gray-300">
                        {appointment.date}
                      </p>

                      <p className="mt-0.5 text-[11px] text-gray-600">
                        {appointment.time}
                      </p>
                    </div>
                  </div>

                  {/* Type */}

                  <div className="flex items-center gap-2 sm:w-40">
                    {appointment.type ===
                    "Video Consultation" ? (
                      <Video className="h-4 w-4 text-gray-500" />
                    ) : appointment.type ===
                      "Phone Consultation" ? (
                      <MessageCircle className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-gray-500" />
                    )}

                    <span className="text-[11px] text-gray-500">
                      {appointment.type.replace(
                        " Consultation",
                        ""
                      )}
                    </span>
                  </div>

                  {/* Status */}

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                      appointment.status === "Confirmed"
                        ? "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]"
                        : "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 p-6">
            <h2 className="font-semibold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              Frequently used advocate tools.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-5">
            <QuickAction
              icon={Users}
              title="Clients"
              description="Manage clients"
              onClick={() =>
                navigate("/advocate/clients")
              }
            />

            <QuickAction
              icon={MessageCircle}
              title="Messages"
              description="Chat with clients"
              badge="7"
              onClick={() =>
                navigate("/advocate/client-chat")
              }
            />

            <QuickAction
              icon={FileText}
              title="Documents"
              description="Review documents"
              onClick={() =>
                navigate("/advocate/documents")
              }
            />

            <QuickAction
              icon={Calendar}
              title="Schedule"
              description="Manage appointments"
              onClick={() =>
                navigate("/advocate/appointments")
              }
            />

            <QuickAction
              icon={DollarSign}
              title="Earnings"
              description="View payments"
              onClick={() =>
                navigate("/advocate/earnings")
              }
            />

            <QuickAction
              icon={User}
              title="Profile"
              description="Edit profile"
              onClick={() =>
                navigate("/advocate/profile")
              }
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          SECOND GRID
      ===================================================== */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ===================================================
            RECENT CLIENTS
        =================================================== */}

        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="font-semibold text-white">
                Recent Clients
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Clients you've recently interacted with.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/advocate/clients")
              }
              className="text-xs font-medium text-[#00C2FF] hover:text-[#00FF88]"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {recentClients.map((client) => (
              <div
                key={client.name}
                className="flex items-center gap-4 p-5 transition hover:bg-white/[0.02]"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="h-11 w-11 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-white">
                      {client.name}
                    </p>

                    <span className="flex-shrink-0 text-[10px] text-gray-700">
                      {client.time}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] text-[#00FF88]">
                    {client.case}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-600">
                    {client.lastMessage}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/advocate/client-chat")
                  }
                  className="hidden rounded-lg p-2 text-gray-600 transition hover:bg-white/5 hover:text-[#00C2FF] sm:block"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            RECENT ACTIVITY
        =================================================== */}

        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="font-semibold text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Latest updates on your account.
              </p>
            </div>

            <button className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-gray-300">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div
                  key={index}
                  className="flex gap-4 p-5"
                >
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${activity.bg}`}
                  >
                    <Icon
                      className={`h-4 w-4 ${activity.color}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      {activity.description}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-[10px] text-gray-700">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          PERFORMANCE SECTION
      ===================================================== */}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Rating */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Client Rating
            </p>

            <span className="text-yellow-400">★</span>
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold text-white">
              4.9
            </span>

            <span className="mb-1 text-xs text-gray-600">
              / 5.0
            </span>
          </div>

          <p className="mt-2 text-xs text-[#00FF88]">
            Excellent client satisfaction
          </p>
        </div>

        {/* Response Time */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Response Time
            </p>

            <Clock className="h-4 w-4 text-[#00C2FF]" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold text-white">
              18
            </span>

            <span className="mb-1 text-xs text-gray-600">
              minutes
            </span>
          </div>

          <p className="mt-2 text-xs text-[#00FF88]">
            Faster than 92% of advocates
          </p>
        </div>

        {/* Completion */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Case Completion
            </p>

            <CheckCircle2 className="h-4 w-4 text-[#00FF88]" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold text-white">
              96%
            </span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-[#00C2FF] to-[#00FF88]" />
          </div>
        </div>
      </div>

      {/* =====================================================
          REMINDER
      ===================================================== */}

      <div className="mt-6 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.03] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-400/10">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300">
              You have 7 unread client messages
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Responding promptly helps maintain a high client
              satisfaction score.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/advocate/client-chat")
            }
            className="flex items-center justify-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-2.5 text-xs font-medium text-yellow-300 transition hover:bg-yellow-400/10"
          >
            Open Messages
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ============================================================
   QUICK ACTION COMPONENT
============================================================ */

function QuickAction({
  icon: Icon,
  title,
  description,
  badge,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition hover:border-[#00C2FF]/20 hover:bg-white/[0.05]"
    >
      {badge && (
        <span className="absolute right-3 top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00C2FF] px-1.5 text-[9px] font-bold text-slate-950">
          {badge}
        </span>
      )}

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition group-hover:bg-[#00C2FF]/10">
        <Icon className="h-4 w-4 text-gray-500 transition group-hover:text-[#00C2FF]" />
      </div>

      <p className="mt-3 text-xs font-semibold text-gray-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-gray-700">
        {description}
      </p>
    </button>
  );
}