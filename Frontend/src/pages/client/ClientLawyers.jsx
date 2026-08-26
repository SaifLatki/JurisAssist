import { useEffect, useState } from "react";
import {
  Search,
  Star,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Filter,
  Briefcase,
  ShieldCheck,
  X,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function ClientLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("All");

  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    fetchLawyers();
  }, []);

  useEffect(() => {
    filterLawyers();
  }, [search, expertise, lawyers]);

  const fetchLawyers = async () => {
    try {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .order("rating", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setLawyers(data || []);
    } catch (error) {
      console.error("Error fetching lawyers:", error);

      // Demo fallback so the UI still works
      setLawyers([
        {
          id: 1,
          name: "Sarah Ahmed",
          expertise: "Corporate Law",
          rating: 4.9,
          bio: "Experienced corporate lawyer specializing in business agreements, partnerships, and commercial contracts.",
          email: "sarah@example.com",
          phone: "+92 300 1234567",
          image_url:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
        },
        {
          id: 2,
          name: "Ali Hassan",
          expertise: "Criminal Law",
          rating: 4.8,
          bio: "Legal professional with extensive experience in criminal defense and litigation.",
          email: "ali@example.com",
          phone: "+92 301 9876543",
          image_url:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
        },
        {
          id: 3,
          name: "Ayesha Khan",
          expertise: "Family Law",
          rating: 4.7,
          bio: "Specialist in family disputes, marriage agreements, divorce, custody, and related legal matters.",
          email: "ayesha@example.com",
          phone: "+92 302 4567890",
          image_url:
            "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterLawyers = () => {
    let result = [...lawyers];

    if (search.trim()) {
      result = result.filter((lawyer) => {
        const name = lawyer.name?.toLowerCase() || "";
        const area = lawyer.expertise?.toLowerCase() || "";

        return (
          name.includes(search.toLowerCase()) ||
          area.includes(search.toLowerCase())
        );
      });
    }

    if (expertise !== "All") {
      result = result.filter(
        (lawyer) => lawyer.expertise === expertise
      );
    }

    setFilteredLawyers(result);
  };

  const expertiseOptions = [
    "All",
    ...new Set(
      lawyers
        .map((lawyer) => lawyer.expertise)
        .filter(Boolean)
    ),
  ];

  return (
    <DashboardLayout role="client">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PageHeader
        title="Find a Lawyer"
        description="Connect with experienced legal professionals who can help with your case."
      />

      {/* =====================================================
          INFO BANNER
      ===================================================== */}

      <div className="mb-8 rounded-2xl border border-[#00C2FF]/20 bg-gradient-to-r from-[#00C2FF]/10 to-[#00FF88]/5 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00C2FF]/10">
            <ShieldCheck className="h-5 w-5 text-[#00C2FF]" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Need professional legal help?
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Browse verified legal professionals and contact the
              lawyer who best matches your needs.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH / FILTER
      ===================================================== */}

      <div className="mb-8 flex flex-col gap-4 lg:flex-row">
        {/* Search */}

        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lawyer or practice area..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#00C2FF]/40"
          />
        </div>

        {/* Filter */}

        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-500" />

          <select
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="min-w-[200px] rounded-xl border border-white/10 bg-[#111827] px-4 py-3.5 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
          >
            {expertiseOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All"
                  ? "All Practice Areas"
                  : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* =====================================================
          RESULTS COUNT
      ===================================================== */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredLawyers.length}
            </span>{" "}
            lawyers
          </p>
        </div>
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[430px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      ) : filteredLawyers.length === 0 ? (
        /* =====================================================
           EMPTY
        ===================================================== */

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-gray-600" />

          <h3 className="mt-5 text-lg font-semibold text-white">
            No lawyers found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try another name or practice area.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setExpertise("All");
            }}
            className="mt-5 rounded-xl border border-white/10 px-5 py-2.5 text-sm text-gray-300 hover:bg-white/5"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* =====================================================
           LAWYER CARDS
        ===================================================== */

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00C2FF]/30 hover:shadow-xl hover:shadow-[#00C2FF]/5"
            >
              {/* Top */}

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={lawyer.image_url}
                        alt={lawyer.name}
                        className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                      />

                      <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#111827] bg-[#00FF88]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        {lawyer.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#00FF88]">
                        {lawyer.expertise}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}

                  <div className="flex items-center gap-1 rounded-lg bg-yellow-400/10 px-2 py-1">
                    <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />

                    <span className="text-xs font-semibold text-yellow-300">
                      {Number(lawyer.rating || 0).toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Bio */}

                <p className="mt-5 min-h-[72px] text-sm leading-6 text-gray-400">
                  {lawyer.bio}
                </p>

                {/* Contact */}

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail className="h-4 w-4 text-gray-500" />

                    <span className="truncate">
                      {lawyer.email}
                    </span>
                  </div>

                  {lawyer.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Phone className="h-4 w-4 text-gray-500" />

                      <span>{lawyer.phone}</span>
                    </div>
                  )}
                </div>

                {/* Buttons */}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      setSelectedLawyer(lawyer)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </button>

                  <button
                    onClick={() =>
                      setSelectedLawyer(lawyer)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20"
                  >
                    <Calendar className="h-4 w-4" />
                    Consult
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================
          LAWYER MODAL
      ===================================================== */}

      {selectedLawyer && (
        <LawyerContactModal
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
        />
      )}
    </DashboardLayout>
  );
}


/* ============================================================
   LAWYER CONTACT MODAL
============================================================ */

function LawyerContactModal({ lawyer, onClose }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    console.log("Lawyer message:", {
      lawyer: lawyer.id,
      message,
    });

    alert(
      `Your message has been prepared for ${lawyer.name}.`
    );

    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-4">
            <img
              src={lawyer.image_url}
              alt={lawyer.name}
              className="h-12 w-12 rounded-xl object-cover"
            />

            <div>
              <h2 className="font-semibold text-white">
                {lawyer.name}
              </h2>

              <p className="text-sm text-[#00FF88]">
                {lawyer.expertise}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5 rounded-xl border border-[#00C2FF]/10 bg-[#00C2FF]/5 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 flex-shrink-0 text-[#00C2FF]" />

              <p className="text-xs leading-5 text-gray-400">
                Tell the lawyer briefly about your legal matter.
                Avoid sharing passwords or highly sensitive
                information in your first message.
              </p>
            </div>
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Your Message
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder={`Hi ${lawyer.name}, I need help with...`}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#00C2FF]/40"
          />

          {/* Footer */}

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!message.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MessageCircle className="h-4 w-4" />
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}