import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Search,
  Filter,
  Plus,
  X,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  MoreVertical,
} from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function AdvocateCases() {
  const [cases, setCases] = useState([
    {
      id: "CAS-2026-001",
      title: "Employment Contract Dispute",
      client: "Ahmed Khan",
      category: "Employment",
      status: "Active",
      priority: "High",
      nextHearing: "Sep 04, 2026",
      updated: "Aug 27, 2026",
      description:
        "Dispute regarding termination clauses and unpaid compensation.",
    },
    {
      id: "CAS-2026-002",
      title: "Property Ownership Dispute",
      client: "Sara Ali",
      category: "Property",
      status: "Active",
      priority: "Medium",
      nextHearing: "Sep 12, 2026",
      updated: "Aug 26, 2026",
      description:
        "Property ownership dispute involving inherited residential land.",
    },
    {
      id: "CAS-2026-003",
      title: "Business Partnership Agreement",
      client: "Usman Raza",
      category: "Corporate",
      status: "Pending",
      priority: "Medium",
      nextHearing: "Sep 18, 2026",
      updated: "Aug 25, 2026",
      description:
        "Review and negotiation of a business partnership agreement.",
    },
    {
      id: "CAS-2026-004",
      title: "Divorce & Custody Case",
      client: "Fatima Noor",
      category: "Family",
      status: "Active",
      priority: "High",
      nextHearing: "Aug 31, 2026",
      updated: "Aug 24, 2026",
      description:
        "Family law case involving divorce proceedings and child custody.",
    },
    {
      id: "CAS-2026-005",
      title: "Residential Lease Dispute",
      client: "Maryam Hassan",
      category: "Property",
      status: "Closed",
      priority: "Low",
      nextHearing: "Completed",
      updated: "Aug 22, 2026",
      description:
        "Dispute concerning lease termination and security deposit.",
    },
    {
      id: "CAS-2026-006",
      title: "Criminal Defense Case",
      client: "Bilal Ahmed",
      category: "Criminal",
      status: "Active",
      priority: "High",
      nextHearing: "Sep 02, 2026",
      updated: "Aug 20, 2026",
      description:
        "Criminal defense case requiring preparation of evidence and witnesses.",
    },
    {
      id: "CAS-2026-007",
      title: "Employee Termination Dispute",
      client: "Hassan Malik",
      category: "Employment",
      status: "Pending",
      priority: "Low",
      nextHearing: "Sep 20, 2026",
      updated: "Aug 18, 2026",
      description:
        "Review of employee termination and compensation claim.",
    },
    {
      id: "CAS-2026-008",
      title: "Company Registration Matter",
      client: "Ayesha Shah",
      category: "Corporate",
      status: "Closed",
      priority: "Low",
      nextHearing: "Completed",
      updated: "Aug 15, 2026",
      description:
        "Legal assistance related to company registration and compliance.",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedCase, setSelectedCase] = useState(null);
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const activeCases = cases.filter(
    (item) => item.status === "Active"
  ).length;

  const pendingCases = cases.filter(
    (item) => item.status === "Pending"
  ).length;

  const closedCases = cases.filter(
    (item) => item.status === "Closed"
  ).length;

  const highPriorityCases = cases.filter(
    (item) => item.priority === "High"
  ).length;

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.client.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [
    cases,
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
  ]);

  const handleDelete = (id) => {
    setCases((current) =>
      current.filter((item) => item.id !== id)
    );

    setSelectedCase(null);
  };

  const handleCreateCase = (newCase) => {
    setCases((current) => [
      {
        id: `CAS-2026-${String(
          current.length + 1
        ).padStart(3, "0")}`,
        ...newCase,
        status: "Pending",
        updated: "Aug 27, 2026",
      },
      ...current,
    ]);

    setShowCreateModal(false);
  };

  return (
    <DashboardLayout role="advocate">
      {/* HEADER */}

      <PageHeader
        title="Cases"
        description="Manage your legal cases, clients, hearings, and case progress."
      />

      {/* STATS */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <CaseStat
          title="Active Cases"
          value={activeCases}
          icon={BriefcaseBusiness}
          color="blue"
        />

        <CaseStat
          title="Pending Cases"
          value={pendingCases}
          icon={Clock}
          color="yellow"
        />

        <CaseStat
          title="High Priority"
          value={highPriorityCases}
          icon={AlertTriangle}
          color="red"
        />

        <CaseStat
          title="Closed Cases"
          value={closedCases}
          icon={CheckCircle2}
          color="green"
        />
      </div>

      {/* TOOLBAR */}

      <div className="mt-8 flex flex-col gap-3 xl:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by case title, client, or case ID..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/30"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-700" />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 outline-none"
            >
              <option value="All">
                All Status
              </option>
              <option value="Active">
                Active
              </option>
              <option value="Pending">
                Pending
              </option>
              <option value="Closed">
                Closed
              </option>
            </select>
          </div>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 outline-none"
          >
            <option value="All">
              All Priority
            </option>
            <option value="High">
              High
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">
              Low
            </option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 outline-none"
          >
            <option value="All">
              All Categories
            </option>
            <option value="Employment">
              Employment
            </option>
            <option value="Property">
              Property
            </option>
            <option value="Corporate">
              Corporate
            </option>
            <option value="Family">
              Family
            </option>
            <option value="Criminal">
              Criminal
            </option>
          </select>

          <button
            onClick={() =>
              setShowCreateModal(true)
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950"
          >
            <Plus className="h-4 w-4" />
            New Case
          </button>
        </div>
      </div>

      {/* CASE LIST */}

      <div className="mt-6 space-y-4">
        {filteredCases.length === 0 ? (
          <EmptyCases
            onCreate={() =>
              setShowCreateModal(true)
            }
          />
        ) : (
          filteredCases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              onView={() =>
                setSelectedCase(caseItem)
              }
              onDelete={() =>
                handleDelete(caseItem.id)
              }
            />
          ))
        )}
      </div>

      {/* CASE DETAILS */}

      {selectedCase && (
        <CaseDetailsModal
          caseItem={selectedCase}
          onClose={() =>
            setSelectedCase(null)
          }
          onDelete={() =>
            handleDelete(selectedCase.id)
          }
        />
      )}

      {/* CREATE CASE */}

      {showCreateModal && (
        <CreateCaseModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onCreate={handleCreateCase}
        />
      )}
    </DashboardLayout>
  );
}

/* ============================================================
   STAT
============================================================ */

function CaseStat({
  title,
  value,
  icon: Icon,
  color,
}) {
  const styles = {
    blue: {
      bg: "bg-[#00C2FF]/10",
      text: "text-[#00C2FF]",
    },
    green: {
      bg: "bg-[#00FF88]/10",
      text: "text-[#00FF88]",
    },
    yellow: {
      bg: "bg-yellow-400/10",
      text: "text-yellow-400",
    },
    red: {
      bg: "bg-red-400/10",
      text: "text-red-400",
    },
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[color].bg}`}
        >
          <Icon
            className={`h-5 w-5 ${styles[color].text}`}
          />
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
   CASE CARD
============================================================ */

function CaseCard({
  caseItem,
  onView,
  onDelete,
}) {
  const statusStyles = {
    Active:
      "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]",

    Pending:
      "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",

    Closed:
      "border-gray-500/20 bg-gray-500/10 text-gray-400",
  };

  const priorityStyles = {
    High: "text-red-400",
    Medium: "text-yellow-400",
    Low: "text-green-400",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00C2FF]/20 hover:bg-white/[0.07]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* CASE ICON */}

        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#00C2FF]/10">
          <BriefcaseBusiness className="h-6 w-6 text-[#00C2FF]" />
        </div>

        {/* MAIN */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-white">
              {caseItem.title}
            </h3>

            <span
              className={`rounded-full border px-2.5 py-1 text-[9px] ${statusStyles[caseItem.status]}`}
            >
              {caseItem.status}
            </span>
          </div>

          <p className="mt-1 text-xs text-[#00FF88]">
            {caseItem.client}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {caseItem.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <span className="text-[10px] text-gray-600">
              Case ID:{" "}
              <span className="text-gray-400">
                {caseItem.id}
              </span>
            </span>

            <span className="text-[10px] text-gray-600">
              Category:{" "}
              <span className="text-gray-400">
                {caseItem.category}
              </span>
            </span>

            <span
              className={`text-[10px] ${priorityStyles[caseItem.priority]}`}
            >
              ● {caseItem.priority} Priority
            </span>
          </div>
        </div>

        {/* HEARING */}

        <div className="flex-shrink-0 rounded-xl border border-white/5 bg-white/[0.02] p-4 lg:w-44">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />

            <span className="text-[10px]">
              Next Hearing
            </span>
          </div>

          <p className="mt-2 text-sm font-medium text-gray-300">
            {caseItem.nextHearing}
          </p>
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-2">
          <button
            onClick={onView}
            title="View case"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-600 hover:border-[#00C2FF]/20 hover:bg-[#00C2FF]/10 hover:text-[#00C2FF]"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            title="Edit case"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-600 hover:bg-white/5 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </button>

          <button
            onClick={onDelete}
            title="Delete case"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-600 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY
============================================================ */

function EmptyCases({
  onCreate,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
      <BriefcaseBusiness className="mx-auto h-12 w-12 text-gray-700" />

      <h3 className="mt-5 text-lg font-semibold text-white">
        No cases found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
        No cases match your current search or
        filters.
      </p>

      <button
        onClick={onCreate}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950"
      >
        <Plus className="h-4 w-4" />
        Create New Case
      </button>
    </div>
  );
}

/* ============================================================
   CASE DETAILS MODAL
============================================================ */

function CaseDetailsModal({
  caseItem,
  onClose,
  onDelete,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00C2FF]/10">
              <BriefcaseBusiness className="h-6 w-6 text-[#00C2FF]" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700">
                {caseItem.id}
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                {caseItem.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CONTENT */}

        <div className="space-y-6 p-6">
          {/* CLIENT */}

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00FF88]/10">
                <User className="h-5 w-5 text-[#00FF88]" />
              </div>

              <div>
                <p className="text-[10px] text-gray-700">
                  Client
                </p>

                <p className="text-sm font-medium text-white">
                  {caseItem.client}
                </p>
              </div>
            </div>
          </div>

          {/* INFO GRID */}

          <div className="grid grid-cols-2 gap-4">
            <DetailItem
              label="Status"
              value={caseItem.status}
              icon={CircleDot}
            />

            <DetailItem
              label="Priority"
              value={caseItem.priority}
              icon={AlertTriangle}
            />

            <DetailItem
              label="Category"
              value={caseItem.category}
              icon={BriefcaseBusiness}
            />

            <DetailItem
              label="Next Hearing"
              value={caseItem.nextHearing}
              icon={Calendar}
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <p className="mb-2 text-xs font-medium text-gray-500">
              Case Description
            </p>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm leading-6 text-gray-400">
                {caseItem.description}
              </p>
            </div>
          </div>

          {/* TIMELINE */}

          <div>
            <p className="mb-4 text-xs font-medium text-gray-500">
              Case Timeline
            </p>

            <div className="space-y-4">
              <TimelineItem
                title="Case created"
                date={caseItem.updated}
                completed
              />

              <TimelineItem
                title="Documents submitted"
                date="Aug 26, 2026"
                completed
              />

              <TimelineItem
                title="Initial review"
                date="Aug 27, 2026"
                completed
              />

              <TimelineItem
                title="Next hearing"
                date={caseItem.nextHearing}
                completed={false}
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex gap-3 border-t border-white/10 p-6">
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-5 py-3 text-sm font-medium text-red-300 hover:bg-red-400/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-300 hover:bg-white/10">
            <Edit className="h-4 w-4" />
            Edit Case
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] py-3 text-sm font-semibold text-slate-950"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DETAIL ITEM
============================================================ */

function DetailItem({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Icon className="h-4 w-4" />

        <span className="text-[10px]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-gray-300">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   TIMELINE
============================================================ */

function TimelineItem({
  title,
  date,
  completed,
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${
          completed
            ? "bg-[#00FF88]/10"
            : "bg-white/5"
        }`}
      >
        <CheckCircle2
          className={`h-4 w-4 ${
            completed
              ? "text-[#00FF88]"
              : "text-gray-700"
          }`}
        />
      </div>

      <div>
        <p className="text-sm text-gray-300">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-gray-700">
          {date}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   CREATE CASE MODAL
============================================================ */

function CreateCaseModal({
  onClose,
  onCreate,
}) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [category, setCategory] =
    useState("Employment");
  const [priority, setPriority] =
    useState("Medium");
  const [nextHearing, setNextHearing] =
    useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !client) return;

    onCreate({
      title,
      client,
      category,
      priority,
      nextHearing:
        nextHearing || "Not scheduled",
      description:
        description ||
        "No case description provided.",
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700">
              Case Management
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Create New Case
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* TITLE */}

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              Case Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter case title"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/40"
            />
          </div>

          {/* CLIENT */}

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              Client
            </label>

            <select
              value={client}
              onChange={(e) =>
                setClient(e.target.value)
              }
              required
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none"
            >
              <option value="">
                Select client
              </option>

              <option>
                Ahmed Khan
              </option>

              <option>
                Sara Ali
              </option>

              <option>
                Usman Raza
              </option>

              <option>
                Fatima Noor
              </option>

              <option>
                Maryam Hassan
              </option>

              <option>
                Bilal Ahmed
              </option>

              <option>
                Hassan Malik
              </option>

              <option>
                Ayesha Shah
              </option>
            </select>
          </div>

          {/* CATEGORY + PRIORITY */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none"
              >
                <option>
                  Employment
                </option>

                <option>
                  Property
                </option>

                <option>
                  Corporate
                </option>

                <option>
                  Family
                </option>

                <option>
                  Criminal
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none"
              >
                <option>
                  High
                </option>

                <option>
                  Medium
                </option>

                <option>
                  Low
                </option>
              </select>
            </div>
          </div>

          {/* HEARING */}

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              Next Hearing
            </label>

            <input
              type="date"
              value={nextHearing}
              onChange={(e) =>
                setNextHearing(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              Case Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe the case..."
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/40"
            />
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-400 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] py-3 text-sm font-semibold text-slate-950"
            >
              <Plus className="h-4 w-4" />
              Create Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}