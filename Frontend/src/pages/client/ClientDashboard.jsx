import {
  FileText,
  Bot,
  MessageCircle,
  CalendarDays,
  ArrowRight,
  UploadCloud,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout, {
  PageHeader,
  StatCard,
} from "../../components/DashboardLayout";

export default function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="client">

      {/* ================= HEADER ================= */}

      <PageHeader
        title="Welcome back 👋"
        description="Manage your legal documents, AI conversations, lawyers, and appointments from one place."
      />

      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={FileText}
          value="12"
          label="My Documents"
          note="+2 this month"
        />

        <StatCard
          icon={Bot}
          value="28"
          label="AI Conversations"
          note="Active"
        />

        <StatCard
          icon={MessageCircle}
          value="3"
          label="Lawyer Conversations"
          note="2 unread"
        />

        <StatCard
          icon={CalendarDays}
          value="2"
          label="Upcoming Appointments"
          note="This week"
        />

      </div>


      {/* ================= MAIN GRID ================= */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ================= QUICK ACTIONS ================= */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-white">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Start your next legal task.
              </p>
            </div>

          </div>


          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Upload Document */}

            <button
              onClick={() => navigate("/client/documents")}
              className="group rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5 text-left transition-all duration-300 hover:border-[#00C2FF]/40 hover:bg-white/[0.07]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00C2FF]/10">
                <UploadCloud className="h-6 w-6 text-[#00C2FF]" />
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Upload Document
              </h3>

              <p className="mt-2 text-sm leading-5 text-gray-400">
                Upload a contract or legal document for AI analysis.
              </p>

              <ArrowRight className="mt-5 h-4 w-4 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#00FF88]" />

            </button>


            {/* AI Assistant */}

            <button
              onClick={() => navigate("/client/ai-chat")}
              className="group rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5 text-left transition-all duration-300 hover:border-[#00C2FF]/40 hover:bg-white/[0.07]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00FF88]/10">
                <Bot className="h-6 w-6 text-[#00FF88]" />
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Ask AI
              </h3>

              <p className="mt-2 text-sm leading-5 text-gray-400">
                Get simple explanations about legal questions and clauses.
              </p>

              <ArrowRight className="mt-5 h-4 w-4 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#00FF88]" />

            </button>


            {/* Find Lawyer */}

            <button
              onClick={() => navigate("/client/lawyers")}
              className="group rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5 text-left transition-all duration-300 hover:border-[#00C2FF]/40 hover:bg-white/[0.07]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00C2FF]/10">
                <MessageCircle className="h-6 w-6 text-[#00C2FF]" />
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Find a Lawyer
              </h3>

              <p className="mt-2 text-sm leading-5 text-gray-400">
                Connect with a qualified lawyer for expert assistance.
              </p>

              <ArrowRight className="mt-5 h-4 w-4 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#00FF88]" />

            </button>

          </div>

        </div>


        {/* ================= AI CARD ================= */}

        <div className="relative overflow-hidden rounded-2xl border border-[#00C2FF]/20 bg-gradient-to-br from-[#00C2FF]/10 to-[#00FF88]/5 p-6">

          {/* Background glow */}

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00C2FF]/10 blur-3xl" />

          <div className="relative">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C2FF] to-[#00FF88] text-slate-950">
              <Bot className="h-6 w-6" />
            </div>

            <p className="mt-5 text-xs font-semibold tracking-widest text-[#00C2FF]">
              JURISASSIST AI
            </p>

            <h2 className="mt-2 text-2xl font-bold leading-tight text-white">
              Need help understanding a legal issue?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Ask JurisAssist to explain legal concepts, review clauses,
              identify possible risks, or help you understand your documents.
            </p>

            <button
              onClick={() => navigate("/client/ai-chat")}
              className="mt-6 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 font-semibold text-slate-950 transition-all duration-300 hover:shadow-lg hover:shadow-[#00C2FF]/20"
            >
              Start AI Chat
            </button>

          </div>

        </div>

      </div>


      {/* ================= RECENT ACTIVITY ================= */}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Recent Documents */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-white">
                Recent Documents
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your recently uploaded documents
              </p>
            </div>

            <button
              onClick={() => navigate("/client/documents")}
              className="text-sm text-[#00C2FF] hover:text-[#00FF88]"
            >
              View all
            </button>

          </div>


          <div className="mt-5 space-y-3">

            {[
              {
                name: "Rental Agreement.pdf",
                type: "Rental Agreement",
                risk: "Medium Risk",
              },
              {
                name: "Freelance Contract.pdf",
                type: "Service Contract",
                risk: "Low Risk",
              },
              {
                name: "Employment Offer.pdf",
                type: "Employment Contract",
                risk: "Pending",
              },
            ].map((document) => (

              <div
                key={document.name}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#0b1220]/60 p-4 transition hover:border-[#00C2FF]/20"
              >

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#00C2FF]/10">
                  <FileText className="h-5 w-5 text-[#00C2FF]" />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-medium text-white">
                    {document.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {document.type}
                  </p>

                </div>

                <span
                  className={`hidden rounded-full px-3 py-1 text-xs sm:block ${
                    document.risk === "Medium Risk"
                      ? "bg-yellow-400/10 text-yellow-300"
                      : document.risk === "Low Risk"
                      ? "bg-[#00FF88]/10 text-[#00FF88]"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  {document.risk}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* Upcoming Appointments */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-white">
                Upcoming Appointments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your scheduled consultations
              </p>
            </div>

            <button
              onClick={() => navigate("/client/appointments")}
              className="text-sm text-[#00C2FF] hover:text-[#00FF88]"
            >
              View all
            </button>

          </div>


          <div className="mt-5 space-y-3">

            <div className="rounded-xl border border-white/10 bg-[#0b1220]/60 p-4">

              <div className="flex items-start justify-between">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00C2FF]/10">
                    <CalendarDays className="h-5 w-5 text-[#00C2FF]" />
                  </div>

                  <div>

                    <p className="font-medium text-white">
                      Sarah Ahmed
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Contract Consultation
                    </p>

                  </div>

                </div>

                <span className="rounded-full bg-[#00FF88]/10 px-3 py-1 text-xs text-[#00FF88]">
                  Confirmed
                </span>

              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">

                <span>
                  <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                  Aug 28, 2026
                </span>

                <span>
                  <Clock className="mr-1 inline h-3.5 w-3.5" />
                  11:00 AM
                </span>

              </div>

            </div>


            <div className="rounded-xl border border-white/10 bg-[#0b1220]/60 p-4">

              <div className="flex items-start justify-between">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FF88]/10">
                    <ShieldCheck className="h-5 w-5 text-[#00FF88]" />
                  </div>

                  <div>

                    <p className="font-medium text-white">
                      Usman Khan
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Document Review
                    </p>

                  </div>

                </div>

                <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
                  Pending
                </span>

              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">

                <span>
                  <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                  Sep 02, 2026
                </span>

                <span>
                  <Clock className="mr-1 inline h-3.5 w-3.5" />
                  03:30 PM
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= DISCLAIMER ================= */}

      <div className="mt-8 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.03] p-5">

        <div className="flex gap-3">

          <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />

          <div>

            <h3 className="text-sm font-semibold text-yellow-300">
              Legal Information Disclaimer
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              JurisAssist provides general legal information and AI-powered
              document analysis. It does not replace advice from a qualified
              legal professional. For important legal matters, consult a
              licensed advocate.
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}