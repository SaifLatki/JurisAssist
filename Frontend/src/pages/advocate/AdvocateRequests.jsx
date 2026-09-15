import { Check, Clock3, X } from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

const requests = [
  {
    id: 1,
    client: "Ayesha Malik",
    matter: "Employment contract review",
    type: "Employment Law",
    received: "Today, 9:20 AM",
    status: "Pending",
  },
  {
    id: 2,
    client: "Bilal Ahmed",
    matter: "Property ownership dispute",
    type: "Property Law",
    received: "Yesterday, 4:45 PM",
    status: "Pending",
  },
  {
    id: 3,
    client: "Hina Raza",
    matter: "Business partnership agreement",
    type: "Business Law",
    received: "Aug 24, 2026",
    status: "Pending",
  },
];

export default function AdvocateRequests() {
  return (
    <DashboardLayout role="advocate">
      <PageHeader
        title="Client Requests"
        description="Review consultation requests from prospective clients."
      />

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock3 className="h-4 w-4 text-[#00C2FF]" />
            {requests.length} requests awaiting your response
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {requests.map((request) => (
            <article
              key={request.id}
              className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <h2 className="font-semibold text-white">{request.client}</h2>
                <p className="mt-1 text-sm text-gray-300">{request.matter}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {request.type} <span className="px-1">|</span> {request.received}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#00FF88]/30 px-3 py-2 text-sm text-[#00FF88] transition hover:bg-[#00FF88]/10"
                >
                  <Check className="h-4 w-4" />
                  Accept
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-sm text-red-300 transition hover:bg-red-400/10"
                >
                  <X className="h-4 w-4" />
                  Decline
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
