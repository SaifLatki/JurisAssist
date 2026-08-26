import { useState } from "react";
import {
  Briefcase,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Calendar,
  User,
  ArrowRight,
  X,
} from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function ClientCases() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [cases, setCases] = useState([
    {
      id: "CASE-2026-001",
      title: "Employment Contract Dispute",
      category: "Employment Law",
      advocate: "Muhammad Ahmed",
      advocateSpecialization: "Corporate & Employment Law",
      status: "Active",
      priority: "High",
      date: "Aug 20, 2026",
      nextAppointment: "Aug 30, 2026",
      description:
        "Review and legal assistance regarding an employment contract dispute with a previous employer.",
    },
    {
      id: "CASE-2026-002",
      title: "Rental Agreement Review",
      category: "Property Law",
      advocate: "Sara Malik",
      advocateSpecialization: "Property & Civil Law",
      status: "Pending",
      priority: "Medium",
      date: "Aug 23, 2026",
      nextAppointment: "Sep 02, 2026",
      description:
        "Legal review of a residential rental agreement and identification of unfavorable clauses.",
    },
    {
      id: "CASE-2026-003",
      title: "Business Partnership Agreement",
      category: "Business Law",
      advocate: "Ali Raza",
      advocateSpecialization: "Business & Corporate Law",
      status: "Completed",
      priority: "Low",
      date: "Jul 15, 2026",
      nextAppointment: "Completed",
      description:
        "Review and consultation regarding a partnership agreement for a new business.",
    },
    {
      id: "CASE-2026-004",
      title: "Freelance Service Agreement",
      category: "Contract Law",
      advocate: "Fatima Khan",
      advocateSpecialization: "Contract & Commercial Law",
      status: "Active",
      priority: "Medium",
      date: "Aug 25, 2026",
      nextAppointment: "Sep 05, 2026",
      description:
        "Review of freelance service terms and recommendations for protecting contractual rights.",
    },
  ]);

  const filteredCases = cases.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.advocate.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeCases = cases.filter(
    (item) => item.status === "Active"
  ).length;

  const pendingCases = cases.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCases = cases.filter(
    (item) => item.status === "Completed"
  ).length;

  const handleCreateCase = (newCase) => {
    setCases((current) => [
      {
        ...newCase,
        id: `CASE-2026-${String(
          current.length + 5
        ).padStart(3, "0")}`,
        status: "Pending",
        date: "Aug 27, 2026",
        nextAppointment: "Not scheduled",
        description:
          "New legal case submitted through JurisAssist.",
      },
      ...current,
    ]);

    setShowModal(false);
  };

  return (
    <DashboardLayout role="client">

      <PageHeader
        title="My Cases"
        description="Track your legal cases, advocates, appointments, and case progress."
      />

      {/* =====================================================
          TOP ACTION
      ===================================================== */}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Case Management
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            Manage all your legal matters from one place.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20"
        >
          <Plus className="h-4 w-4" />
          New Case
        </button>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard
          icon={Briefcase}
          label="Total Cases"
          value={cases.length}
        />

        <StatCard
          icon={Clock}
          label="Active Cases"
          value={activeCases}
        />

        <StatCard
          icon={AlertCircle}
          label="Pending Cases"
          value={pendingCases}
        />

        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={completedCases}
        />

      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

            <input
              type="text"
              placeholder="Search cases..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-10 pr-4 text-sm text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-[#00C2FF]/40"
            />

          </div>

          {/* Status */}

          <div className="flex flex-wrap gap-2">

            {[
              "All",
              "Active",
              "Pending",
              "Completed",
            ].map((status) => (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(status)
                }
                className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                  statusFilter === status
                    ? "bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30"
                    : "border border-white/10 bg-white/5 text-gray-600 hover:text-gray-300"
                }`}
              >
                {status}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CASE LIST
      ===================================================== */}

      <section className="mt-6">

        {filteredCases.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">

            {filteredCases.map((item) => (
              <CaseCard
                key={item.id}
                caseData={item}
              />
            ))}

          </div>
        )}

      </section>

      {/* =====================================================
          NEW CASE MODAL
      ===================================================== */}

      {showModal && (
        <NewCaseModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateCase}
        />
      )}

    </DashboardLayout>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C2FF]/10">
          <Icon className="h-5 w-5 text-[#00C2FF]" />
        </div>

      </div>

      <p className="mt-4 text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-gray-600">
        {label}
      </p>

    </div>
  );
}


/* ============================================================
   CASE CARD
============================================================ */

function CaseCard({ caseData }) {
  const statusStyles = {
    Active:
      "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/20",

    Pending:
      "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",

    Completed:
      "bg-[#00C2FF]/10 text-[#00C2FF] border-[#00C2FF]/20",
  };

  const priorityStyles = {
    High: "text-red-400",
    Medium: "text-yellow-400",
    Low: "text-gray-500",
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 transition hover:border-[#00C2FF]/20 hover:bg-white/[0.07]">

      <div className="p-5">

        {/* Top */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/10">
              <Briefcase className="h-5 w-5 text-[#00C2FF]" />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h3 className="text-base font-semibold text-white">
                  {caseData.title}
                </h3>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[9px] font-medium ${
                    statusStyles[caseData.status]
                  }`}
                >
                  {caseData.status}
                </span>

              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3">

                <span className="text-[10px] text-gray-700">
                  {caseData.id}
                </span>

                <span className="text-[10px] text-gray-800">
                  •
                </span>

                <span className="text-[10px] text-[#00C2FF]">
                  {caseData.category}
                </span>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <span className="text-[9px] uppercase tracking-wider text-gray-700">
              Priority
            </span>

            <span
              className={`text-xs font-semibold ${
                priorityStyles[caseData.priority]
              }`}
            >
              {caseData.priority}
            </span>

          </div>

        </div>

        {/* Description */}

        <p className="mt-5 max-w-4xl text-xs leading-6 text-gray-600">
          {caseData.description}
        </p>

        {/* Information */}

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-white/5 pt-5 md:grid-cols-3">

          <InfoItem
            icon={User}
            label="Advocate"
            value={caseData.advocate}
          />

          <InfoItem
            icon={Calendar}
            label="Created"
            value={caseData.date}
          />

          <InfoItem
            icon={Clock}
            label="Next Appointment"
            value={caseData.nextAppointment}
          />

        </div>

        {/* Actions */}

        <div className="mt-5 flex flex-col gap-2 border-t border-white/5 pt-5 sm:flex-row sm:justify-end">

          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-gray-500 transition hover:bg-white/10 hover:text-white">
            <MessageCircle className="h-4 w-4" />
            Message Advocate
          </button>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-[#00C2FF]/10 px-4 py-2.5 text-xs font-medium text-[#00C2FF] transition hover:bg-[#00C2FF]/20">
            View Case
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0d1626]/60 p-3">

      <Icon className="h-4 w-4 flex-shrink-0 text-gray-700" />

      <div className="min-w-0">

        <p className="text-[9px] uppercase tracking-wider text-gray-700">
          {label}
        </p>

        <p className="mt-1 truncate text-xs text-gray-400">
          {value}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00C2FF]/10">
        <Briefcase className="h-7 w-7 text-[#00C2FF]" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        No Cases Found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-gray-600">
        We couldn't find any cases matching your search or selected filter.
      </p>

    </div>
  );
}


/* ============================================================
   NEW CASE MODAL
============================================================ */

function NewCaseModal({
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General Legal");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title,
      category,
      priority,
      advocate: "Not Assigned",
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Create New Case
            </h3>

            <p className="mt-1 text-xs text-gray-600">
              Submit a new legal matter for review.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Case Title */}

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              Case Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Employment Contract Dispute"
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/40"
            />

          </div>

          {/* Category */}

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              Legal Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#00C2FF]/40"
            >
              <option>General Legal</option>
              <option>Contract Law</option>
              <option>Employment Law</option>
              <option>Property Law</option>
              <option>Business Law</option>
              <option>Family Law</option>
              <option>Civil Law</option>
              <option>Criminal Law</option>
              <option>Intellectual Property</option>
            </select>

          </div>

          {/* Priority */}

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              Priority
            </label>

            <div className="grid grid-cols-3 gap-2">

              {["Low", "Medium", "High"].map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() =>
                      setPriority(item)
                    }
                    className={`rounded-xl border py-2.5 text-xs font-medium transition ${
                      priority === item
                        ? item === "High"
                          ? "border-red-400/30 bg-red-400/10 text-red-400"
                          : item === "Medium"
                          ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
                          : "border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88]"
                        : "border-white/10 bg-white/5 text-gray-600"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

          {/* Notice */}

          <div className="rounded-xl border border-[#00C2FF]/10 bg-[#00C2FF]/5 p-4">

            <div className="flex gap-3">

              <AlertCircle className="h-4 w-4 flex-shrink-0 text-[#00C2FF]" />

              <p className="text-[10px] leading-5 text-gray-600">
                After submitting your case, an advocate can review
                your request and you can begin a consultation.
              </p>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-medium text-gray-500 transition hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] py-3 text-xs font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20"
            >
              Create Case
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}