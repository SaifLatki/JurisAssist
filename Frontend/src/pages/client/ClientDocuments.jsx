import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function ClientDocuments() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showUpload, setShowUpload] = useState(false);

  const documents = [
    {
      id: 1,
      name: "Rental Agreement.pdf",
      type: "Rental Agreement",
      size: "2.4 MB",
      date: "Aug 25, 2026",
      status: "Analyzed",
      risk: "Medium",
    },
    {
      id: 2,
      name: "Freelance Contract.pdf",
      type: "Service Contract",
      size: "1.8 MB",
      date: "Aug 22, 2026",
      status: "Analyzed",
      risk: "Low",
    },
    {
      id: 3,
      name: "Employment Offer.pdf",
      type: "Employment Contract",
      size: "3.1 MB",
      date: "Aug 20, 2026",
      status: "Analyzing",
      risk: "Pending",
    },
    {
      id: 4,
      name: "NDA Agreement.pdf",
      type: "Non-Disclosure Agreement",
      size: "1.2 MB",
      date: "Aug 18, 2026",
      status: "Analyzed",
      risk: "Low",
    },
    {
      id: 5,
      name: "Partnership Agreement.pdf",
      type: "Business Agreement",
      size: "4.7 MB",
      date: "Aug 15, 2026",
      status: "Analyzed",
      risk: "High",
    },
  ];

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch = document.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || document.risk === filter;

    return matchesSearch && matchesFilter;
  });

  const getRiskStyle = (risk) => {
    if (risk === "Low") {
      return "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/20";
    }

    if (risk === "Medium") {
      return "bg-yellow-400/10 text-yellow-300 border-yellow-400/20";
    }

    if (risk === "High") {
      return "bg-red-400/10 text-red-300 border-red-400/20";
    }

    return "bg-white/5 text-gray-400 border-white/10";
  };

  const getStatusIcon = (status) => {
    if (status === "Analyzed") {
      return <CheckCircle2 className="h-4 w-4 text-[#00FF88]" />;
    }

    return (
      <Clock className="h-4 w-4 text-yellow-400 animate-pulse" />
    );
  };

  return (
    <DashboardLayout role="client">

      {/* ================= HEADER ================= */}

      <PageHeader
        title="My Documents"
        description="Upload, analyze, and manage your legal documents."
        action={
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 font-semibold text-slate-950 transition-all duration-300 hover:shadow-lg hover:shadow-[#00C2FF]/20"
          >
            <UploadCloud className="h-5 w-5" />
            Upload Document
          </button>
        }
      />

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C2FF]/10">
              <FileText className="h-5 w-5 text-[#00C2FF]" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-sm text-gray-400">
                Total Documents
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF88]/10">
              <CheckCircle2 className="h-5 w-5 text-[#00FF88]" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">9</p>
              <p className="text-sm text-gray-400">
                Analyzed
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-sm text-gray-400">
                Medium Risk
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-sm text-gray-400">
                High Risk
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ================= SEARCH + FILTER ================= */}

      <div className="mt-8 flex flex-col gap-4 lg:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#00C2FF]/40"
          />

        </div>

        {/* Filter */}

        <div className="flex items-center gap-2">

          <Filter className="h-5 w-5 text-gray-500" />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
          >
            <option value="All">All Risks</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
            <option value="Pending">Pending</option>
          </select>

        </div>

      </div>

      {/* ================= DOCUMENT LIST ================= */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

        {/* Desktop Header */}

        <div className="hidden border-b border-white/10 px-6 py-4 md:grid md:grid-cols-12 md:gap-4">

          <p className="col-span-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Document
          </p>

          <p className="col-span-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Date
          </p>

          <p className="col-span-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Status
          </p>

          <p className="col-span-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Risk
          </p>

          <p className="col-span-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Action
          </p>

        </div>

        {filteredDocuments.length === 0 ? (

          <div className="px-6 py-16 text-center">

            <FileText className="mx-auto h-12 w-12 text-gray-600" />

            <h3 className="mt-4 text-lg font-semibold text-white">
              No documents found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-white/10">

            {filteredDocuments.map((document) => (

              <div
                key={document.id}
                className="group px-6 py-5 transition-colors hover:bg-white/[0.03]"
              >

                {/* Desktop */}

                <div className="hidden md:grid md:grid-cols-12 md:items-center md:gap-4">

                  {/* Document */}

                  <div className="col-span-5 flex items-center gap-4">

                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00C2FF]/10">
                      <FileText className="h-5 w-5 text-[#00C2FF]" />
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-medium text-white">
                        {document.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {document.type} • {document.size}
                      </p>

                    </div>

                  </div>

                  {/* Date */}

                  <div className="col-span-2">
                    <p className="text-sm text-gray-400">
                      {document.date}
                    </p>
                  </div>

                  {/* Status */}

                  <div className="col-span-2">

                    <div className="flex items-center gap-2 text-sm">
                      {getStatusIcon(document.status)}

                      <span className="text-gray-400">
                        {document.status}
                      </span>
                    </div>

                  </div>

                  {/* Risk */}

                  <div className="col-span-2">

                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getRiskStyle(
                        document.risk
                      )}`}
                    >
                      {document.risk === "Pending"
                        ? "Pending"
                        : `${document.risk} Risk`}
                    </span>

                  </div>

                  {/* Actions */}

                  <div className="col-span-1">

                    <button
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
                      title="More actions"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>

                  </div>

                </div>


                {/* Mobile */}

                <div className="md:hidden">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00C2FF]/10">
                      <FileText className="h-5 w-5 text-[#00C2FF]" />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <p className="truncate font-medium text-white">
                            {document.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {document.type}
                          </p>

                        </div>

                        <button className="text-gray-500">
                          <MoreVertical className="h-5 w-5" />
                        </button>

                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">

                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${getRiskStyle(
                            document.risk
                          )}`}
                        >
                          {document.risk} Risk
                        </span>

                        <span className="text-xs text-gray-500">
                          {document.date}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* ================= AI ANALYSIS BANNER ================= */}

      <div className="mt-8 rounded-2xl border border-[#00C2FF]/20 bg-gradient-to-r from-[#00C2FF]/10 to-[#00FF88]/5 p-6">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C2FF] to-[#00FF88] text-slate-950">

            <Bot className="h-6 w-6" />

          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-white">
              Need help understanding a document?
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Use JurisAssist AI to summarize contracts, identify risks,
              and explain difficult legal clauses.
            </p>

          </div>

          <button
            onClick={() => {
              window.location.href = "/client/ai-chat";
            }}
            className="rounded-xl border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-5 py-3 text-sm font-semibold text-[#00C2FF] transition hover:bg-[#00C2FF]/20"
          >
            Open AI Assistant
          </button>

        </div>

      </div>


      {/* ================= UPLOAD MODAL ================= */}

      {showUpload && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-white/10 p-6">

              <div>

                <h2 className="text-xl font-semibold text-white">
                  Upload Document
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Upload a PDF or legal document for analysis.
                </p>

              </div>

              <button
                onClick={() => setShowUpload(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

            </div>


            {/* Upload Area */}

            <div className="p-6">

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center transition hover:border-[#00C2FF]/40 hover:bg-[#00C2FF]/5">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C2FF]/10">

                  <UploadCloud className="h-8 w-8 text-[#00C2FF]" />

                </div>

                <p className="mt-5 font-medium text-white">
                  Click to upload a document
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  PDF, DOC, DOCX up to 10MB
                </p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

              </label>


              <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-400/10 bg-yellow-400/[0.03] p-4">

                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />

                <p className="text-xs leading-5 text-gray-500">
                  Your document will be processed by JurisAssist AI.
                  Avoid uploading highly sensitive information unless
                  necessary.
                </p>

              </div>

            </div>


            {/* Modal Footer */}

            <div className="flex justify-end gap-3 border-t border-white/10 p-6">

              <button
                onClick={() => setShowUpload(false)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                className="rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-2.5 text-sm font-semibold text-slate-950"
              >
                Upload & Analyze
              </button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}