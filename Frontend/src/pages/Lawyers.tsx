import { useState, useEffect } from "react";
import { Mail, Phone, Star, MessageCircle } from "lucide-react";
import { supabase } from "../lib/supabase"
import { Lawyer } from "../types";
import ContactLawyerModal from "../components/ContactLawyerModal";

function Lawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .order("rating", { ascending: false });

      if (error) throw error;
      setLawyers(data || []);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Find Expert Lawyers
          </h1>
          <p className="text-gray-300 text-xl">
            Connect with experienced legal professionals in various practice areas
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 border-4 border-[#00C2FF]/50 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:shadow-slate-800 transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={lawyer.image_url}
                      alt={lawyer.name}
                      className="w-20 h-20 rounded-full object-cover border border-white/10 shadow-sm"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{lawyer.name}</h3>
                      <p className="text-[#00FF88] font-medium">{lawyer.expertise}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-300">
                          {lawyer.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{lawyer.bio}</p>

                  <div className="space-y-2 mb-4 text-gray-300">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{lawyer.email}</span>
                    </div>
                    {lawyer.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{lawyer.phone}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedLawyer(lawyer)}
                    className="w-full bg-gradient-to-r from-gray-600 to-slate-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg  hover:opacity-90 transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact Lawyer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLawyer && (
        <ContactLawyerModal
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
        />
      )}
    </div>
  );
}
export default Lawyers;
