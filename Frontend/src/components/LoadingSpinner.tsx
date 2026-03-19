import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 max-w-sm mx-4 text-center shadow-xl shadow-[#00C2FF]/20">
        <Loader2 className="h-16 w-16 text-[#00C2FF] animate-spin mx-auto mb-6" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
          Analyzing Message
        </h3>
        <p className="text-gray-300 text-lg">
          Our AI is reviewing your legal message...
        </p>
      </div>
    </div>
  );
}
