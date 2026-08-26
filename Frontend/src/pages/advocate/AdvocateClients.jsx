import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Users,
  MessageCircle,
  FileText,
  Calendar,
  MoreVertical,
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Briefcase,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function AdvocateClients() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed.khan@email.com",
      phone: "+92 300 1234567",
      caseTitle: "Contract Review",
      caseType: "Corporate Law",
      status: "Active",
      joined: "August 12, 2026",
      lastActivity: "10 minutes ago",
      documents: 5,
      appointments: 2,
      unread: 2,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara.ali@email.com",
      phone: "+92 301 9876543",
      caseTitle: "Property Dispute",
      caseType: "Property Law",
      status: "Active",
      joined: "August 8, 2026",
      lastActivity: "32 minutes ago",
      documents: 8,
      appointments: 3,
      unread: 1,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    },
    {
      id: 3,
      name: "Usman Raza",
      email: "usman.raza@email.com",
      phone: "+92 302 4567891",
      caseTitle: "Business Agreement",
      caseType: "Business Law",
      status: "Pending",
      joined: "August 4, 2026",
      lastActivity: "1 hour ago",
      documents: 3,
      appointments: 1,
      unread: 3,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    },
    {
      id: 4,
      name: "Fatima Noor",
      email: "fatima.noor@email.com",
      phone: "+92 303 3456789",
      caseTitle: "Family Matter",
      caseType: "Family Law",
      status: "Active",
      joined: "July 29, 2026",
      lastActivity: "2 hours ago",
      documents: 6,
      appointments: 4,
      unread: 0,
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300",
    },
    {
      id: 5,
      name: "Hassan Malik",
      email: "hassan.malik@email.com",
      phone: "+92 304 7891234",
      caseTitle: "Employment Contract",
      caseType: "Employment Law",
      status: "Completed",
      joined: "July 20, 2026",
      lastActivity: "Yesterday",
      documents: 4,
      appointments: 3,
      unread: 0,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
    },
    {
      id: 6,
      name: "Ayesha Shah",
      email: "ayesha.shah@email.com",
      phone: "+92 305 5678912",
      caseTitle: "Divorce Consultation",
      caseType: "Family Law",
      status: "Active",
      joined: "July 18, 2026",
      lastActivity: "Yesterday",
      documents: 7,
      appointments: 2,
      unread: 1,
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300",
    },
    {
      id: 7,
      name: "Bilal Ahmed",
      email: "bilal.ahmed@email.com",
      phone: "+92 306 6789123",
      caseTitle: "Criminal Defense",
      caseType: "Criminal Law",
      status: "Pending",
      joined: "July 15, 2026",
      lastActivity: "2 days ago",
      documents: 2,
      appointments: 1,
      unread: 0,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
    },
    {
      id: 8,
      name: "Maryam Hassan",
      email: "maryam.hassan@email.com",
      phone: "+92 307 7891234",
      caseTitle: "Lease Agreement",
      caseType: "Property Law",
      status: "Completed",
      joined: "July 10, 2026",
      lastActivity: "3 days ago",
      documents: 5,
      appointments: 2,
      unread: 0,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
    },
  ];

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        client.name.toLowerCase().includes(searchText) ||
        client.email.toLowerCase().includes(searchText) ||
        client.caseTitle.toLowerCase().includes(searchText) ||
        client.caseType.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const activeClients = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const pendingClients = clients.filter(
    (client) => client.status === "Pending"
  ).length;

  const completedClients = clients.filter(
    (client) => client.status === "Completed"
  ).length;

  return (
    <DashboardLayout role="advocate">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PageHeader
        title="My Clients"
        description="Manage your clients, cases, documents, and communication."
      />

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Clients"
          value={clients.length}
          icon={Users}
          iconClass="text-[#00C2FF]"
          bgClass="bg-[#00C2FF]/10"
        />

        <SummaryCard
          title="Active Cases"
          value={activeClients}
          icon={CheckCircle2}
          iconClass="text-[#00FF88]"
          bgClass="bg-[#00FF88]/10"
        />

        <SummaryCard
          title="Pending Cases"
          value={pendingClients}
          icon={Clock}
          iconClass="text-yellow-400"
          bgClass="bg-yellow-400/10"
        />

        <SummaryCard
          title="Completed"
          value={completedClients}
          icon={Briefcase}
          iconClass="text-purple-400"
          bgClass="bg-purple-400/10"
        />
      </div>

      {/* =====================================================
          SEARCH + FILTERS
      ===================================================== */}

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search clients, cases, or email..."
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-11 pr-10 text-sm text-white outline-none placeholder:text-gray-700 transition focus:border-[#00C2FF]/40"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-600 hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter */}

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#00C2FF]/40"
            >
              <option value="All">All Clients</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Results */}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-600">
            Showing{" "}
            <span className="text-gray-400">
              {filteredClients.length}
            </span>{" "}
            of{" "}
            <span className="text-gray-400">
              {clients.length}
            </span>{" "}
            clients
          </p>

          {(search || statusFilter !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
              className="text-xs text-[#00C2FF] hover:text-[#00FF88]"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* =====================================================
          CLIENT LIST
      ===================================================== */}

      <div className="mt-6 space-y-4">
        {filteredClients.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-700" />

            <h3 className="mt-5 text-lg font-semibold text-white">
              No clients found
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Try changing your search or filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
              className="mt-5 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-400 hover:bg-white/5"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onView={() => setSelectedClient(client)}
              onChat={() =>
                navigate("/advocate/client-chat")
              }
              onDocuments={() =>
                navigate("/advocate/documents")
              }
              onAppointment={() =>
                navigate("/advocate/appointments")
              }
            />
          ))
        )}
      </div>

      {/* =====================================================
          CLIENT DETAILS MODAL
      ===================================================== */}

      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onChat={() =>
            navigate("/advocate/client-chat")
          }
          onDocuments={() =>
            navigate("/advocate/documents")
          }
          onAppointments={() =>
            navigate("/advocate/appointments")
          }
        />
      )}
    </DashboardLayout>
  );
}

/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
  title,
  value,
  icon: Icon,
  iconClass,
  bgClass,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass}`}
        >
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>

        <div>
          <p className="text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CLIENT CARD
============================================================ */

function ClientCard({
  client,
  onView,
  onChat,
  onDocuments,
  onAppointment,
}) {
  const getStatusStyle = () => {
    if (client.status === "Active") {
      return "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]";
    }

    if (client.status === "Pending") {
      return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";
    }

    return "border-purple-400/20 bg-purple-400/10 text-purple-300";
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00C2FF]/20 hover:bg-white/[0.07]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        {/* =================================================
            CLIENT INFO
        ================================================= */}

        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="relative">
            <img
              src={client.image}
              alt={client.name}
              className="h-14 w-14 rounded-xl object-cover"
            />

            {client.status === "Active" && (
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#111827] bg-[#00FF88]" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-white">
                {client.name}
              </h3>

              <span
                className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${getStatusStyle()}`}
              >
                {client.status}
              </span>

              {client.unread > 0 && (
                <span className="rounded-full bg-[#00C2FF] px-2 py-0.5 text-[9px] font-bold text-slate-950">
                  {client.unread} new
                </span>
              )}
            </div>

            <p className="mt-1 truncate text-xs text-gray-600">
              {client.email}
            </p>

            <p className="mt-1 text-xs text-[#00FF88]">
              {client.caseTitle}
            </p>
          </div>
        </div>

        {/* =================================================
            CASE
        ================================================= */}

        <div className="xl:w-44">
          <p className="text-[10px] uppercase tracking-wider text-gray-700">
            Practice Area
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {client.caseType}
          </p>

          <p className="mt-2 text-[10px] text-gray-700">
            Joined {client.joined}
          </p>
        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="flex items-center gap-5 xl:w-48">
          <div className="text-center">
            <p className="text-sm font-semibold text-white">
              {client.documents}
            </p>

            <p className="mt-1 text-[9px] text-gray-700">
              Documents
            </p>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div className="text-center">
            <p className="text-sm font-semibold text-white">
              {client.appointments}
            </p>

            <p className="mt-1 text-[9px] text-gray-700">
              Appointments
            </p>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex items-center gap-2">
          <button
            onClick={onChat}
            title="Chat"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 hover:text-[#00C2FF]"
          >
            <MessageCircle className="h-4 w-4" />
          </button>

          <button
            onClick={onDocuments}
            title="Documents"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition hover:border-[#00FF88]/30 hover:bg-[#00FF88]/5 hover:text-[#00FF88]"
          >
            <FileText className="h-4 w-4" />
          </button>

          <button
            onClick={onAppointment}
            title="Appointments"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition hover:border-purple-400/30 hover:bg-purple-400/5 hover:text-purple-400"
          >
            <Calendar className="h-4 w-4" />
          </button>

          <button
            onClick={onView}
            title="View Client"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            View
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          <button className="hidden rounded-lg p-2 text-gray-700 hover:bg-white/5 hover:text-gray-400 sm:block">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Last activity */}

      <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
        <Clock className="h-3 w-3 text-gray-700" />

        <span className="text-[10px] text-gray-700">
          Last activity: {client.lastActivity}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   CLIENT DETAILS MODAL
============================================================ */

function ClientDetailsModal({
  client,
  onClose,
  onChat,
  onDocuments,
  onAppointments,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-4">
            <img
              src={client.image}
              alt={client.name}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div>
              <h2 className="text-xl font-semibold text-white">
                {client.name}
              </h2>

              <p className="mt-1 text-xs text-[#00FF88]">
                {client.caseTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Details */}

        <div className="space-y-6 p-6">
          {/* Contact */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Contact Information
            </h3>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoBox
                icon={User}
                label="Full Name"
                value={client.name}
              />

              <InfoBox
                icon={FileText}
                label="Email"
                value={client.email}
              />

              <InfoBox
                icon={Briefcase}
                label="Practice Area"
                value={client.caseType}
              />

              <InfoBox
                icon={Calendar}
                label="Joined"
                value={client.joined}
              />
            </div>
          </div>

          {/* Case */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Case Information
            </h3>

            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">
                    Current Case
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {client.caseTitle}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] ${
                    client.status === "Active"
                      ? "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]"
                      : client.status === "Pending"
                      ? "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                      : "border-purple-400/20 bg-purple-400/10 text-purple-300"
                  }`}
                >
                  {client.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-lg font-bold text-white">
                    {client.documents}
                  </p>

                  <p className="text-[10px] text-gray-700">
                    Documents
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-white">
                    {client.appointments}
                  </p>

                  <p className="text-[10px] text-gray-700">
                    Appointments
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-white">
                    {client.unread}
                  </p>

                  <p className="text-[10px] text-gray-700">
                    Unread
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}

          {client.status === "Pending" && (
            <div className="flex gap-3 rounded-xl border border-yellow-400/10 bg-yellow-400/[0.03] p-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-400" />

              <div>
                <p className="text-sm font-medium text-yellow-300">
                  Case requires attention
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  This client has a pending case that may require
                  your review.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              onClick={onChat}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-4 py-3 text-sm font-semibold text-slate-950"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </button>

            <button
              onClick={onDocuments}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/10"
            >
              <FileText className="h-4 w-4" />
              Documents
            </button>

            <button
              onClick={onAppointments}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" />
              Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[#00C2FF]" />

        <span className="text-[10px] uppercase tracking-wider text-gray-700">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs text-gray-300">
        {value}
      </p>
    </div>
  );
}