import { useMemo, useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Upload,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  X,
  File,
  FileCheck,
  Clock,
  AlertCircle,
  FolderOpen,
  Plus,
} from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function AdvocateDocuments() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Employment Agreement - Ahmed Khan.pdf",
      client: "Ahmed Khan",
      type: "Contract",
      size: "2.4 MB",
      date: "Aug 27, 2026",
      status: "Reviewed",
    },
    {
      id: 2,
      name: "Property Ownership Documents.pdf",
      client: "Sara Ali",
      type: "Property",
      size: "4.8 MB",
      date: "Aug 26, 2026",
      status: "Pending Review",
    },
    {
      id: 3,
      name: "Partnership Agreement.docx",
      client: "Usman Raza",
      type: "Business",
      size: "1.2 MB",
      date: "Aug 25, 2026",
      status: "Reviewed",
    },
    {
      id: 4,
      name: "Divorce Petition.pdf",
      client: "Fatima Noor",
      type: "Family",
      size: "3.1 MB",
      date: "Aug 24, 2026",
      status: "Needs Attention",
    },
    {
      id: 5,
      name: "Lease Agreement.pdf",
      client: "Maryam Hassan",
      type: "Property",
      size: "890 KB",
      date: "Aug 22, 2026",
      status: "Reviewed",
    },
    {
      id: 6,
      name: "Criminal Case Evidence.zip",
      client: "Bilal Ahmed",
      type: "Criminal",
      size: "18.5 MB",
      date: "Aug 20, 2026",
      status: "Pending Review",
    },
    {
      id: 7,
      name: "Employee Termination Notice.pdf",
      client: "Hassan Malik",
      type: "Employment",
      size: "780 KB",
      date: "Aug 18, 2026",
      status: "Reviewed",
    },
    {
      id: 8,
      name: "Business Registration.pdf",
      client: "Ayesha Shah",
      type: "Business",
      size: "1.7 MB",
      date: "Aug 15, 2026",
      status: "Reviewed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDocument, setSelectedDocument] =
    useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const query = search.toLowerCase();

      const matchesSearch =
        document.name.toLowerCase().includes(query) ||
        document.client.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" ||
        document.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        document.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    documents,
    search,
    typeFilter,
    statusFilter,
  ]);

  const reviewedCount = documents.filter(
    (document) =>
      document.status === "Reviewed"
  ).length;

  const pendingCount = documents.filter(
    (document) =>
      document.status === "Pending Review"
  ).length;

  const attentionCount = documents.filter(
    (document) =>
      document.status === "Needs Attention"
  ).length;

  const handleDelete = (id) => {
    setDocuments((current) =>
      current.filter(
        (document) => document.id !== id
      )
    );

    setSelectedDocument(null);
  };

  const handleUpload = (newDocument) => {
    setDocuments((current) => [
      {
        id: Date.now(),
        ...newDocument,
        status: "Pending Review",
      },
      ...current,
    ]);

    setShowUpload(false);
  };

  return (
    <DashboardLayout role="advocate">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PageHeader
        title="Documents"
        description="Manage, review, and organize your clients' legal documents."
      />

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DocumentStat
          title="Total Documents"
          value={documents.length}
          icon={FolderOpen}
          color="blue"
        />

        <DocumentStat
          title="Reviewed"
          value={reviewedCount}
          icon={FileCheck}
          color="green"
        />

        <DocumentStat
          title="Pending Review"
          value={pendingCount}
          icon={Clock}
          color="yellow"
        />

        <DocumentStat
          title="Needs Attention"
          value={attentionCount}
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* =====================================================
          SEARCH + FILTERS
      ===================================================== */}

      <div className="mt-8 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search documents or clients..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-700" />

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 outline-none"
          >
            <option value="All">
              All Types
            </option>
            <option value="Contract">
              Contract
            </option>
            <option value="Property">
              Property
            </option>
            <option value="Business">
              Business
            </option>
            <option value="Family">
              Family
            </option>
            <option value="Criminal">
              Criminal
            </option>
            <option value="Employment">
              Employment
            </option>
          </select>
        </div>

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
          <option value="Reviewed">
            Reviewed
          </option>
          <option value="Pending Review">
            Pending Review
          </option>
          <option value="Needs Attention">
            Needs Attention
          </option>
        </select>

        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950"
        >
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {/* =====================================================
          DOCUMENTS
      ===================================================== */}

      <div className="mt-6">
        {filteredDocuments.length === 0 ? (
          <EmptyDocuments
            onUpload={() => setShowUpload(true)}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredDocuments.map(
              (document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onView={() =>
                    setSelectedDocument(
                      document
                    )
                  }
                  onDelete={() =>
                    handleDelete(document.id)
                  }
                />
              )
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          PREVIEW MODAL
      ===================================================== */}

      {selectedDocument && (
        <DocumentPreview
          document={selectedDocument}
          onClose={() =>
            setSelectedDocument(null)
          }
          onDelete={() =>
            handleDelete(
              selectedDocument.id
            )
          }
        />
      )}

      {/* =====================================================
          UPLOAD MODAL
      ===================================================== */}

      {showUpload && (
        <UploadDocumentModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </DashboardLayout>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function DocumentStat({
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
   DOCUMENT CARD
============================================================ */

function DocumentCard({
  document,
  onView,
  onDelete,
}) {
  const statusStyles = {
    Reviewed:
      "border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88]",

    "Pending Review":
      "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",

    "Needs Attention":
      "border-red-400/20 bg-red-400/10 text-red-300",
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00C2FF]/20 hover:bg-white/[0.07]">
      <div className="flex items-start gap-4">
        {/* Icon */}

        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#00C2FF]/10">
          <FileText className="h-6 w-6 text-[#00C2FF]" />
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                {document.name}
              </h3>

              <p className="mt-1 text-xs text-[#00FF88]">
                {document.client}
              </p>
            </div>

            <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-gray-700 hover:bg-white/5 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] text-gray-500">
              {document.type}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] text-gray-600">
              {document.size}
            </span>

            <span
              className={`rounded-full border px-2.5 py-1 text-[9px] ${statusStyles[document.status]}`}
            >
              {document.status}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
            <p className="text-[10px] text-gray-700">
              Uploaded {document.date}
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={onView}
                title="Preview"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-[#00C2FF]/10 hover:text-[#00C2FF]"
              >
                <Eye className="h-4 w-4" />
              </button>

              <button
                title="Download"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-[#00FF88]/10 hover:text-[#00FF88]"
              >
                <Download className="h-4 w-4" />
              </button>

              <button
                onClick={onDelete}
                title="Delete"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-red-400/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyDocuments({
  onUpload,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
      <File className="mx-auto h-12 w-12 text-gray-700" />

      <h3 className="mt-5 text-lg font-semibold text-white">
        No documents found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
        Try changing your search or filters, or
        upload a new legal document.
      </p>

      <button
        onClick={onUpload}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950"
      >
        <Upload className="h-4 w-4" />
        Upload Document
      </button>
    </div>
  );
}

/* ============================================================
   PREVIEW MODAL
============================================================ */

function DocumentPreview({
  document,
  onClose,
  onDelete,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00C2FF]/10">
              <FileText className="h-5 w-5 text-[#00C2FF]" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-white">
                {document.name}
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                {document.client} •{" "}
                {document.size}
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

        {/* Document Preview */}

        <div className="p-6">
          <div className="min-h-[420px] rounded-xl border border-white/10 bg-[#0d1626] p-8">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="border-b border-white/10 pb-5">
                <div className="h-3 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-2 w-1/3 rounded bg-white/5" />
              </div>

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="space-y-2"
                  >
                    <div className="h-2 w-1/3 rounded bg-white/10" />

                    <div className="h-2 w-full rounded bg-white/5" />

                    <div className="h-2 w-11/12 rounded bg-white/5" />

                    <div className="h-2 w-4/5 rounded bg-white/5" />
                  </div>
                )
              )}
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] text-gray-700">
            Document preview placeholder — connect
            your storage/API to display the actual
            document.
          </p>
        </div>

        {/* Actions */}

        <div className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-300 hover:bg-white/10">
            <Download className="h-4 w-4" />
            Download
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 py-3 text-sm font-medium text-red-300 hover:bg-red-400/10">
            <Trash2 className="h-4 w-4" />
            Delete
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
   UPLOAD MODAL
============================================================ */

function UploadDocumentModal({
  onClose,
  onUpload,
}) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [type, setType] =
    useState("Contract");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !client) return;

    onUpload({
      name,
      client,
      type,
      size: file
        ? `${(
            file.size /
            (1024 * 1024)
          ).toFixed(1)} MB`
        : "1.0 MB",
      date: new Date().toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700">
              Documents
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Upload Document
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
          {/* File */}

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#00C2FF]/30 bg-[#00C2FF]/5 px-6 py-10 text-center transition hover:bg-[#00C2FF]/10">
            <Upload className="h-8 w-8 text-[#00C2FF]" />

            <p className="mt-3 text-sm font-medium text-white">
              {file
                ? file.name
                : "Choose a document"}
            </p>

            <p className="mt-1 text-[10px] text-gray-700">
              PDF, DOC, DOCX, ZIP up to 25MB
            </p>

            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.zip"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] ||
                    null
                )
              }
            />
          </label>

          {/* Document Name */}

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              Document Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Employment Agreement"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/40"
            />
          </div>

          {/* Client */}

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
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
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
                Hassan Malik
              </option>

              <option>
                Ayesha Shah
              </option>
            </select>
          </div>

          {/* Type */}

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              Document Type
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#0d1626] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
            >
              <option>
                Contract
              </option>

              <option>
                Property
              </option>

              <option>
                Business
              </option>

              <option>
                Family
              </option>

              <option>
                Criminal
              </option>

              <option>
                Employment
              </option>
            </select>
          </div>

          {/* Buttons */}

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
              <Upload className="h-4 w-4" />
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}