import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MoreVertical,
  Plus,
  X,
} from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function AdvocateAppointments() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    "2026-08-27"
  );

  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const appointments = [
    {
      id: 1,
      client: "Ahmed Khan",
      email: "ahmed.khan@email.com",
      caseTitle: "Contract Review",
      caseType: "Corporate Law",
      date: "2026-08-27",
      time: "09:30 AM",
      duration: "45 min",
      type: "Video Call",
      status: "Confirmed",
      notes:
        "Review employment contract and discuss termination clauses.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    },
    {
      id: 2,
      client: "Sara Ali",
      email: "sara.ali@email.com",
      caseTitle: "Property Dispute",
      caseType: "Property Law",
      date: "2026-08-27",
      time: "11:00 AM",
      duration: "60 min",
      type: "Office Meeting",
      status: "Confirmed",
      notes:
        "Discuss property ownership documents and dispute timeline.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    },
    {
      id: 3,
      client: "Usman Raza",
      email: "usman.raza@email.com",
      caseTitle: "Business Agreement",
      caseType: "Business Law",
      date: "2026-08-27",
      time: "02:30 PM",
      duration: "30 min",
      type: "Phone Call",
      status: "Pending",
      notes:
        "Initial consultation regarding a partnership agreement.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    },
    {
      id: 4,
      client: "Fatima Noor",
      email: "fatima.noor@email.com",
      caseTitle: "Family Matter",
      caseType: "Family Law",
      date: "2026-08-28",
      time: "10:00 AM",
      duration: "45 min",
      type: "Video Call",
      status: "Confirmed",
      notes:
        "Follow-up consultation regarding family legal matter.",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300",
    },
    {
      id: 5,
      client: "Hassan Malik",
      email: "hassan.malik@email.com",
      caseTitle: "Employment Contract",
      caseType: "Employment Law",
      date: "2026-08-28",
      time: "01:00 PM",
      duration: "45 min",
      type: "Office Meeting",
      status: "Completed",
      notes:
        "Final review of employment agreement.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
    },
    {
      id: 6,
      client: "Ayesha Shah",
      email: "ayesha.shah@email.com",
      caseTitle: "Divorce Consultation",
      caseType: "Family Law",
      date: "2026-08-29",
      time: "11:30 AM",
      duration: "60 min",
      type: "Video Call",
      status: "Pending",
      notes:
        "Initial consultation and document review.",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300",
    },
    {
      id: 7,
      client: "Bilal Ahmed",
      email: "bilal.ahmed@email.com",
      caseTitle: "Criminal Defense",
      caseType: "Criminal Law",
      date: "2026-08-30",
      time: "03:00 PM",
      duration: "60 min",
      type: "Office Meeting",
      status: "Confirmed",
      notes:
        "Discuss case details and upcoming legal proceedings.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
    },
    {
      id: 8,
      client: "Maryam Hassan",
      email: "maryam.hassan@email.com",
      caseTitle: "Lease Agreement",
      caseType: "Property Law",
      date: "2026-08-26",
      time: "04:00 PM",
      duration: "30 min",
      type: "Phone Call",
      status: "Completed",
      notes:
        "Final discussion regarding lease agreement.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
    },
  ];

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.date === "2026-08-27"
  );

  const confirmedCount = appointments.filter(
    (appointment) =>
      appointment.status === "Confirmed"
  ).length;

  const pendingCount = appointments.filter(
    (appointment) =>
      appointment.status === "Pending"
  ).length;

  const completedCount = appointments.filter(
    (appointment) =>
      appointment.status === "Completed"
  ).length;

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.date === selectedDate
      )
      .filter((appointment) => {
        const query = search.toLowerCase();

        return (
          !query ||
          appointment.client
            .toLowerCase()
            .includes(query) ||
          appointment.caseTitle
            .toLowerCase()
            .includes(query) ||
          appointment.caseType
            .toLowerCase()
            .includes(query)
        );
      })
      .filter(
        (appointment) =>
          statusFilter === "All" ||
          appointment.status === statusFilter
      );
  }, [
    selectedDate,
    search,
    statusFilter,
  ]);

  const changeDate = (days) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);

    const year = current.getFullYear();
    const month = String(
      current.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      current.getDate()
    ).padStart(2, "0");

    setSelectedDate(
      `${year}-${month}-${day}`
    );
  };

  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <DashboardLayout role="advocate">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        title="Appointments"
        description="Manage consultations, meetings, and client appointments."
      />

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AppointmentStat
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={Calendar}
          color="blue"
        />

        <AppointmentStat
          title="Confirmed"
          value={confirmedCount}
          icon={CheckCircle2}
          color="green"
        />

        <AppointmentStat
          title="Pending Requests"
          value={pendingCount}
          icon={AlertCircle}
          color="yellow"
        />

        <AppointmentStat
          title="Completed"
          value={completedCount}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* =====================================================
          CALENDAR DATE NAVIGATION
      ===================================================== */}

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700">
              Selected Date
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {formattedDate}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => changeDate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() =>
                setSelectedDate("2026-08-27")
              }
              className="rounded-xl border border-[#00C2FF]/20 bg-[#00C2FF]/5 px-5 py-2.5 text-xs font-medium text-[#00C2FF]"
            >
              Today
            </button>

            <button
              onClick={() => changeDate(1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">
              Pick date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-[#0d1626] px-3 py-2.5 text-xs text-gray-400 outline-none focus:border-[#00C2FF]/40"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div className="mt-5 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search client or case..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/30"
          />
        </div>

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
              All Statuses
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>
        </div>

        <button
          onClick={() =>
            setSelectedAppointment({
              newAppointment: true,
            })
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950"
        >
          <Plus className="h-4 w-4" />
          New Appointment
        </button>
      </div>

      {/* =====================================================
          APPOINTMENT LIST
      ===================================================== */}

      <div className="mt-6">
        {filteredAppointments.length === 0 ? (
          <EmptyAppointments
            date={formattedDate}
            onCreate={() =>
              setSelectedAppointment({
                newAppointment: true,
              })
            }
          />
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map(
              (appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onView={() =>
                    setSelectedAppointment(
                      appointment
                    )
                  }
                  onChat={() =>
                    navigate(
                      "/advocate/client-chat"
                    )
                  }
                />
              )
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() =>
            setSelectedAppointment(null)
          }
          onChat={() =>
            navigate(
              "/advocate/client-chat"
            )
          }
        />
      )}
    </DashboardLayout>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function AppointmentStat({
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
    purple: {
      bg: "bg-purple-400/10",
      text: "text-purple-400",
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
   APPOINTMENT CARD
============================================================ */

function AppointmentCard({
  appointment,
  onView,
  onChat,
}) {
  const statusStyles = {
    Confirmed:
      "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]",

    Pending:
      "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",

    Completed:
      "border-purple-400/20 bg-purple-400/10 text-purple-300",
  };

  const typeIcon =
    appointment.type === "Video Call"
      ? Video
      : appointment.type === "Phone Call"
      ? Phone
      : MapPin;

  const TypeIcon = typeIcon;

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00C2FF]/20 hover:bg-white/[0.07]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* =================================================
            TIME
        ================================================= */}

        <div className="flex items-center gap-4 lg:w-40">
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-[#00C2FF]/5">
            <Clock className="h-4 w-4 text-[#00C2FF]" />

            <span className="mt-1 text-[8px] text-gray-600">
              TIME
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              {appointment.time}
            </p>

            <p className="mt-1 text-[10px] text-gray-600">
              {appointment.duration}
            </p>
          </div>
        </div>

        {/* =================================================
            CLIENT
        ================================================= */}

        <div className="flex min-w-0 flex-1 items-center gap-4">
          <img
            src={appointment.image}
            alt={appointment.client}
            className="h-12 w-12 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-white">
                {appointment.client}
              </h3>

              <span
                className={`rounded-full border px-2 py-0.5 text-[9px] ${statusStyles[appointment.status]}`}
              >
                {appointment.status}
              </span>
            </div>

            <p className="mt-1 truncate text-xs text-[#00FF88]">
              {appointment.caseTitle}
            </p>

            <p className="mt-1 text-[10px] text-gray-700">
              {appointment.caseType}
            </p>
          </div>
        </div>

        {/* =================================================
            APPOINTMENT TYPE
        ================================================= */}

        <div className="flex items-center gap-3 lg:w-40">
          <TypeIcon className="h-4 w-4 text-gray-500" />

          <div>
            <p className="text-xs text-gray-400">
              {appointment.type}
            </p>

            <p className="mt-1 text-[9px] text-gray-700">
              Consultation
            </p>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex items-center gap-2">
          {appointment.status ===
            "Confirmed" &&
            appointment.type ===
              "Video Call" && (
              <button
                title="Start Meeting"
                className="flex h-9 items-center gap-2 rounded-lg bg-[#00FF88]/10 px-3 text-xs font-medium text-[#00FF88] hover:bg-[#00FF88]/20"
              >
                <Video className="h-3.5 w-3.5" />
                Join
              </button>
            )}

          <button
            onClick={onChat}
            title="Message client"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:border-[#00C2FF]/30 hover:text-[#00C2FF]"
          >
            <MessageCircle className="h-4 w-4" />
          </button>

          <button
            onClick={onView}
            title="View details"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:bg-white/5 hover:text-white"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notes */}

      <div className="mt-4 border-t border-white/5 pt-4">
        <p className="line-clamp-1 text-[10px] text-gray-700">
          {appointment.notes}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyAppointments({
  date,
  onCreate,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
      <Calendar className="mx-auto h-12 w-12 text-gray-700" />

      <h3 className="mt-5 text-lg font-semibold text-white">
        No appointments
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
        You don't have any appointments scheduled
        for {date}.
      </p>

      <button
        onClick={onCreate}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950"
      >
        <Plus className="h-4 w-4" />
        Schedule Appointment
      </button>
    </div>
  );
}

/* ============================================================
   APPOINTMENT MODAL
============================================================ */

function AppointmentModal({
  appointment,
  onClose,
  onChat,
}) {
  if (appointment.newAppointment) {
    return (
      <NewAppointmentModal
        onClose={onClose}
      />
    );
  }

  const statusStyles = {
    Confirmed:
      "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]",

    Pending:
      "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",

    Completed:
      "border-purple-400/20 bg-purple-400/10 text-purple-300",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700">
              Appointment Details
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {appointment.caseTitle}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Client */}

          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <img
              src={appointment.image}
              alt={appointment.client}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-semibold text-white">
                {appointment.client}
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                {appointment.email}
              </p>

              <p className="mt-1 text-xs text-[#00FF88]">
                {appointment.caseType}
              </p>
            </div>
          </div>

          {/* Details */}

          <div className="grid grid-cols-2 gap-3">
            <Detail
              icon={Calendar}
              label="Date"
              value={new Date(
                `${appointment.date}T00:00:00`
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            />

            <Detail
              icon={Clock}
              label="Time"
              value={`${appointment.time} • ${appointment.duration}`}
            />

            <Detail
              icon={
                appointment.type ===
                "Video Call"
                  ? Video
                  : appointment.type ===
                    "Phone Call"
                  ? Phone
                  : MapPin
              }
              label="Meeting Type"
              value={appointment.type}
            />

            <Detail
              icon={CheckCircle2}
              label="Status"
              value={appointment.status}
              className={
                statusStyles[appointment.status]
              }
            />
          </div>

          {/* Notes */}

          <div>
            <p className="text-xs font-semibold text-white">
              Client Notes
            </p>

            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs leading-6 text-gray-500">
                {appointment.notes}
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-col gap-3 sm:flex-row">
            {appointment.status ===
              "Pending" && (
              <>
                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] py-3 text-sm font-semibold text-slate-950"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Accept
                </button>

                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 py-3 text-sm font-medium text-red-300 hover:bg-red-400/10"
                >
                  <XCircle className="h-4 w-4" />
                  Decline
                </button>
              </>
            )}

            <button
              onClick={onChat}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-300 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Message Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DETAIL
============================================================ */

function Detail({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[#00C2FF]" />

        <span className="text-[9px] uppercase tracking-wider text-gray-700">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xs text-gray-300">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   NEW APPOINTMENT MODAL
============================================================ */

function NewAppointmentModal({
  onClose,
}) {
  const [client, setClient] = useState("");
  const [date, setDate] = useState(
    "2026-08-27"
  );
  const [time, setTime] = useState("10:00");
  const [type, setType] =
    useState("Video Call");
  const [duration, setDuration] =
    useState("30");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      client,
      date,
      time,
      type,
      duration,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700">
              Schedule
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              New Appointment
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <FormField label="Select Client">
            <select
              value={client}
              onChange={(e) =>
                setClient(e.target.value)
              }
              required
              className="form-input"
            >
              <option value="">
                Choose a client
              </option>

              <option value="Ahmed Khan">
                Ahmed Khan
              </option>

              <option value="Sara Ali">
                Sara Ali
              </option>

              <option value="Usman Raza">
                Usman Raza
              </option>

              <option value="Fatima Noor">
                Fatima Noor
              </option>

              <option value="Ayesha Shah">
                Ayesha Shah
              </option>
            </select>
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
                className="form-input"
              />
            </FormField>

            <FormField label="Time">
              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                required
                className="form-input"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Meeting Type">
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
                className="form-input"
              >
                <option>
                  Video Call
                </option>

                <option>
                  Phone Call
                </option>

                <option>
                  Office Meeting
                </option>
              </select>
            </FormField>

            <FormField label="Duration">
              <select
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
                className="form-input"
              >
                <option value="30">
                  30 minutes
                </option>

                <option value="45">
                  45 minutes
                </option>

                <option value="60">
                  60 minutes
                </option>

                <option value="90">
                  90 minutes
                </option>
              </select>
            </FormField>
          </div>

          <FormField label="Notes">
            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              rows={4}
              placeholder="Add appointment notes..."
              className="form-input resize-none"
            />
          </FormField>

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
              <Calendar className="h-4 w-4" />
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-500">
        {label}
      </label>

      {children}
    </div>
  );
}