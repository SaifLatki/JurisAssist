import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  MoreVertical,
  ChevronRight,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function ClientAppointments() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [showBooking, setShowBooking] = useState(false);

  const [appointments] = useState([
    {
      id: 1,
      lawyer: "Sarah Ahmed",
      expertise: "Corporate Law",
      date: "August 29, 2026",
      time: "11:00 AM",
      duration: "45 minutes",
      type: "Video Consultation",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300",
    },
    {
      id: 2,
      lawyer: "Ali Hassan",
      expertise: "Criminal Law",
      date: "September 2, 2026",
      time: "3:30 PM",
      duration: "30 minutes",
      type: "Phone Consultation",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300",
    },
    {
      id: 3,
      lawyer: "Ayesha Khan",
      expertise: "Family Law",
      date: "August 20, 2026",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "Video Consultation",
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=300",
    },
    {
      id: 4,
      lawyer: "Usman Malik",
      expertise: "Property Law",
      date: "August 10, 2026",
      time: "1:00 PM",
      duration: "30 minutes",
      type: "Office Consultation",
      status: "Cancelled",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
    },
  ]);

  const tabs = ["Upcoming", "Completed", "Cancelled"];

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "Upcoming") {
      return (
        appointment.status === "Confirmed" ||
        appointment.status === "Pending"
      );
    }

    if (activeTab === "Completed") {
      return appointment.status === "Completed";
    }

    return appointment.status === "Cancelled";
  });

  const getStatusStyle = (status) => {
    if (status === "Confirmed") {
      return "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]";
    }

    if (status === "Pending") {
      return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";
    }

    if (status === "Completed") {
      return "border-[#00C2FF]/20 bg-[#00C2FF]/10 text-[#00C2FF]";
    }

    return "border-red-400/20 bg-red-400/10 text-red-400";
  };

  const getStatusIcon = (status) => {
    if (status === "Confirmed") {
      return <CheckCircle2 className="h-4 w-4" />;
    }

    if (status === "Pending") {
      return <Clock className="h-4 w-4" />;
    }

    if (status === "Completed") {
      return <CheckCircle2 className="h-4 w-4" />;
    }

    return <XCircle className="h-4 w-4" />;
  };

  const getAppointmentIcon = (type) => {
    if (type === "Video Consultation") {
      return <Video className="h-4 w-4" />;
    }

    if (type === "Phone Consultation") {
      return <Phone className="h-4 w-4" />;
    }

    return <MapPin className="h-4 w-4" />;
  };

  return (
    <DashboardLayout role="client">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PageHeader
        title="My Appointments"
        description="Manage your consultations and appointments with legal professionals."
        action={
          <button
            onClick={() => setShowBooking(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20"
          >
            <Plus className="h-5 w-5" />
            Book Consultation
          </button>
        }
      />

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Upcoming */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C2FF]/10">
              <Calendar className="h-5 w-5 text-[#00C2FF]" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                2
              </p>

              <p className="text-sm text-gray-500">
                Upcoming
              </p>
            </div>
          </div>
        </div>

        {/* Completed */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF88]/10">
              <CheckCircle2 className="h-5 w-5 text-[#00FF88]" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                8
              </p>

              <p className="text-sm text-gray-500">
                Completed
              </p>
            </div>
          </div>
        </div>

        {/* Pending */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                1
              </p>

              <p className="text-sm text-gray-500">
                Pending
              </p>
            </div>
          </div>
        </div>

        {/* Cancelled */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                1
              </p>

              <p className="text-sm text-gray-500">
                Cancelled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TABS
      ===================================================== */}

      <div className="mt-8 border-b border-white/10">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative whitespace-nowrap pb-4 text-sm font-medium transition ${
                activeTab === tab
                  ? "text-[#00C2FF]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab}

              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00C2FF] to-[#00FF88]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================
          APPOINTMENTS
      ===================================================== */}

      <div className="mt-6 space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-600" />

            <h3 className="mt-5 text-lg font-semibold text-white">
              No appointments
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              You don't have any appointments in this section.
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00C2FF]/20 hover:bg-white/[0.07]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                {/* Lawyer */}

                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <img
                    src={appointment.image}
                    alt={appointment.lawyer}
                    className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">
                      {appointment.lawyer}
                    </h3>

                    <p className="mt-1 text-sm text-[#00FF88]">
                      {appointment.expertise}
                    </p>

                    <div
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </div>
                  </div>
                </div>

                {/* Date */}

                <div className="flex items-center gap-3 lg:w-48">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
                    <Calendar className="h-4 w-4 text-[#00C2FF]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Date
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      {appointment.date}
                    </p>
                  </div>
                </div>

                {/* Time */}

                <div className="flex items-center gap-3 lg:w-40">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
                    <Clock className="h-4 w-4 text-[#00FF88]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Time
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      {appointment.time}
                    </p>

                    <p className="text-[10px] text-gray-600">
                      {appointment.duration}
                    </p>
                  </div>
                </div>

                {/* Type */}

                <div className="flex items-center gap-2 lg:w-44">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400">
                    {getAppointmentIcon(
                      appointment.type
                    )}
                  </div>

                  <span className="text-xs text-gray-400">
                    {appointment.type}
                  </span>
                </div>

                {/* Actions */}

                <div className="flex items-center gap-2 lg:w-auto">
                  {appointment.status === "Confirmed" && (
                    <button
                      onClick={() =>
                        navigate(
                          "/client/advocate-chat"
                        )
                      }
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-4 py-2.5 text-xs font-semibold text-slate-950"
                    >
                      <MessageCircleIcon />
                      Chat
                    </button>
                  )}

                  {appointment.status === "Pending" && (
                    <button className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-2.5 text-xs font-medium text-yellow-300">
                      Awaiting Confirmation
                    </button>
                  )}

                  {appointment.status === "Completed" && (
                    <button className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-white/5">
                      View Details
                    </button>
                  )}

                  {appointment.status === "Cancelled" && (
                    <button
                      onClick={() =>
                        setShowBooking(true)
                      }
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-white/5"
                    >
                      Book Again
                    </button>
                  )}

                  <button className="rounded-lg p-2 text-gray-600 hover:bg-white/5 hover:text-gray-300">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* =====================================================
          UPCOMING CONSULTATION BANNER
      ===================================================== */}

      {activeTab === "Upcoming" && (
        <div className="mt-8 rounded-2xl border border-[#00FF88]/10 bg-gradient-to-r from-[#00FF88]/5 to-[#00C2FF]/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00FF88]/10">
              <AlertCircle className="h-5 w-5 text-[#00FF88]" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-white">
                Upcoming consultation
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Make sure you have your relevant documents ready
                before speaking with your advocate.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/client/documents")
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10"
            >
              Documents
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          BOOKING MODAL
      ===================================================== */}

      {showBooking && (
        <BookingModal
          onClose={() => setShowBooking(false)}
        />
      )}
    </DashboardLayout>
  );
}

/* ============================================================
   MESSAGE ICON
============================================================ */

function MessageCircleIcon() {
  return <User className="h-4 w-4" />;
}

/* ============================================================
   BOOKING MODAL
============================================================ */

function BookingModal({ onClose }) {
  const [lawyer, setLawyer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Video Consultation");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!lawyer || !date || !time) {
      alert("Please select a lawyer, date, and time.");
      return;
    }

    console.log({
      lawyer,
      date,
      time,
      type,
      notes,
    });

    alert("Consultation request submitted successfully.");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Book Consultation
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Request a consultation with an advocate.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Lawyer */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Select Advocate
            </label>

            <select
              value={lawyer}
              onChange={(e) =>
                setLawyer(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
            >
              <option value="">
                Select an advocate
              </option>

              <option value="Sarah Ahmed">
                Sarah Ahmed — Corporate Law
              </option>

              <option value="Ali Hassan">
                Ali Hassan — Criminal Law
              </option>

              <option value="Ayesha Khan">
                Ayesha Khan — Family Law
              </option>

              <option value="Usman Malik">
                Usman Malik — Property Law
              </option>
            </select>
          </div>

          {/* Date + Time */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
              />
            </div>
          </div>

          {/* Consultation Type */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Consultation Type
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Video",
                  value: "Video Consultation",
                  icon: Video,
                },
                {
                  label: "Phone",
                  value: "Phone Consultation",
                  icon: Phone,
                },
                {
                  label: "Office",
                  value: "Office Consultation",
                  icon: MapPin,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setType(item.value)
                    }
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs transition ${
                      type === item.value
                        ? "border-[#00C2FF]/50 bg-[#00C2FF]/10 text-[#00C2FF]"
                        : "border-white/10 bg-white/5 text-gray-500 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Brief Description
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Briefly describe what you need help with..."
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0d1626] p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#00C2FF]/40"
            />
          </div>

          {/* Notice */}

          <div className="rounded-xl border border-yellow-400/10 bg-yellow-400/[0.03] p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-400" />

              <p className="text-xs leading-5 text-gray-500">
                Your appointment request will need to be confirmed
                by the advocate before the consultation is finalized.
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950 hover:shadow-lg hover:shadow-[#00C2FF]/20"
            >
              Request Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}