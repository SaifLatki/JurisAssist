import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Star,
  Edit3,
  Save,
  Camera,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function AdvocateProfile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Muhammad Ahmed",
    email: "ahmed.advocate@jurisassist.com",
    phone: "+92 300 1234567",
    location: "Karachi, Pakistan",
    specialization: "Corporate & Business Law",
    experience: "8 Years",
    barCouncil: "Sindh Bar Council",
    licenseNumber: "SBC-2020-45821",
    bio: "Experienced legal professional specializing in corporate law, business agreements, contracts, and commercial disputes. I help individuals and businesses understand their legal rights and make informed decisions.",
  });

  const [stats] = useState({
    clients: 124,
    cases: 87,
    completed: 76,
    rating: 4.9,
  });

  const handleChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <DashboardLayout role="advocate">
      <PageHeader
        title="My Profile"
        description="Manage your professional information and advocate profile."
      />

      <div className="mt-6 space-y-6">

        {/* =====================================================
            PROFILE HEADER
        ===================================================== */}

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">

          {/* Cover */}

          <div className="relative h-36 bg-gradient-to-r from-[#00C2FF]/20 via-[#111827] to-[#00FF88]/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,194,255,0.15),transparent_40%)]" />
          </div>

          <div className="relative px-6 pb-6">

            <div className="-mt-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">

                {/* Profile Image */}

                <div className="relative">

                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-[#111827] bg-gradient-to-br from-[#00C2FF]/30 to-[#00FF88]/20 text-3xl font-bold text-[#00C2FF] shadow-xl">
                    MA
                  </div>

                  <button
                    title="Change profile photo"
                    className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-lg border border-[#111827] bg-[#00C2FF] text-slate-950 shadow-lg hover:bg-[#00FF88]"
                  >
                    <Camera className="h-4 w-4" />
                  </button>

                </div>

                {/* Name */}

                <div className="pb-1">

                  <div className="flex items-center gap-2">

                    <h2 className="text-2xl font-bold text-white">
                      {profile.name}
                    </h2>

                    <ShieldCheck className="h-5 w-5 text-[#00FF88]" />
                  </div>

                  <p className="mt-1 text-sm text-[#00C2FF]">
                    {profile.specialization}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">

                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {profile.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {profile.experience}
                    </span>

                  </div>

                </div>

              </div>

              {/* Edit */}

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-[#00C2FF]/30 hover:text-[#00C2FF]"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              )}

            </div>
          </div>
        </section>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          <StatCard
            icon={User}
            label="Total Clients"
            value={stats.clients}
          />

          <StatCard
            icon={Briefcase}
            label="Total Cases"
            value={stats.cases}
          />

          <StatCard
            icon={CheckCircle2}
            label="Completed Cases"
            value={stats.completed}
          />

          <StatCard
            icon={Star}
            label="Client Rating"
            value={stats.rating}
            rating
          />

        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ===================================================
              PERSONAL INFORMATION
          =================================================== */}

          <section className="xl:col-span-2 rounded-2xl border border-white/10 bg-white/5">

            <div className="border-b border-white/10 px-6 py-5">

              <h3 className="text-lg font-semibold text-white">
                Professional Information
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                Your information displayed to clients.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

              <InputField
                icon={User}
                label="Full Name"
                value={profile.name}
                editing={editing}
                onChange={(value) =>
                  handleChange("name", value)
                }
              />

              <InputField
                icon={Mail}
                label="Email Address"
                value={profile.email}
                editing={editing}
                onChange={(value) =>
                  handleChange("email", value)
                }
              />

              <InputField
                icon={Phone}
                label="Phone Number"
                value={profile.phone}
                editing={editing}
                onChange={(value) =>
                  handleChange("phone", value)
                }
              />

              <InputField
                icon={MapPin}
                label="Location"
                value={profile.location}
                editing={editing}
                onChange={(value) =>
                  handleChange("location", value)
                }
              />

              <InputField
                icon={Briefcase}
                label="Specialization"
                value={profile.specialization}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "specialization",
                    value
                  )
                }
              />

              <InputField
                icon={Clock}
                label="Experience"
                value={profile.experience}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "experience",
                    value
                  )
                }
              />

            </div>

            {/* Bio */}

            <div className="border-t border-white/10 p-6">

              <label className="mb-2 block text-xs font-medium text-gray-500">
                Professional Bio
              </label>

              {editing ? (
                <textarea
                  rows={5}
                  value={profile.bio}
                  onChange={(e) =>
                    handleChange(
                      "bio",
                      e.target.value
                    )
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0d1626] p-4 text-sm leading-6 text-gray-300 outline-none placeholder:text-gray-700 focus:border-[#00C2FF]/40"
                />
              ) : (
                <p className="rounded-xl border border-white/5 bg-[#0d1626]/60 p-4 text-sm leading-7 text-gray-500">
                  {profile.bio}
                </p>
              )}

            </div>

          </section>

          {/* ===================================================
              LICENSE / VERIFICATION
          =================================================== */}

          <div className="space-y-6">

            <section className="rounded-2xl border border-white/10 bg-white/5">

              <div className="border-b border-white/10 px-5 py-5">

                <div className="flex items-center gap-2">

                  <ShieldCheck className="h-5 w-5 text-[#00FF88]" />

                  <h3 className="font-semibold text-white">
                    Verification
                  </h3>

                </div>

                <p className="mt-1 text-xs text-gray-600">
                  Your professional verification details.
                </p>

              </div>

              <div className="space-y-4 p-5">

                <VerificationItem
                  label="Bar Council"
                  value={profile.barCouncil}
                />

                <VerificationItem
                  label="License Number"
                  value={profile.licenseNumber}
                />

                <div className="flex items-center gap-2 rounded-xl border border-[#00FF88]/10 bg-[#00FF88]/5 p-3">

                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#00FF88]" />

                  <div>
                    <p className="text-xs font-medium text-white">
                      Verified Advocate
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-600">
                      Your credentials have been verified.
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                SPECIALIZATIONS
            ================================================= */}

            <section className="rounded-2xl border border-white/10 bg-white/5">

              <div className="border-b border-white/10 px-5 py-5">

                <div className="flex items-center gap-2">

                  <Award className="h-5 w-5 text-[#00C2FF]" />

                  <h3 className="font-semibold text-white">
                    Practice Areas
                  </h3>

                </div>

              </div>

              <div className="flex flex-wrap gap-2 p-5">

                {[
                  "Corporate Law",
                  "Contract Law",
                  "Business Law",
                  "Commercial Disputes",
                  "Legal Consultation",
                  "Employment Law",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-gray-400"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </section>

          </div>

        </div>

        {/* =====================================================
            CLIENT REVIEWS
        ===================================================== */}

        <section className="rounded-2xl border border-white/10 bg-white/5">

          <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-lg font-semibold text-white">
                Client Reviews
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                Feedback from your clients.
              </p>
            </div>

            <div className="flex items-center gap-2">

              <Star className="h-5 w-5 fill-current text-yellow-400" />

              <span className="text-xl font-bold text-white">
                {stats.rating}
              </span>

              <span className="text-xs text-gray-600">
                / 5.0
              </span>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">

            <Review
              name="Ahmed Khan"
              rating={5}
              text="Very professional and explained my contract in a way that was easy to understand."
            />

            <Review
              name="Sara Ali"
              rating={5}
              text="Excellent legal guidance. The advocate was responsive and very helpful."
            />

            <Review
              name="Usman Raza"
              rating={4}
              text="Good experience overall. My business agreement was reviewed carefully."
            />

          </div>

        </section>

      </div>
    </DashboardLayout>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  rating = false,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C2FF]/10">
          <Icon className="h-5 w-5 text-[#00C2FF]" />
        </div>

        {rating && (
          <Star className="h-4 w-4 fill-current text-yellow-400" />
        )}

      </div>

      <p className="mt-4 text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-gray-600">
        {label}
      </p>

    </div>
  );
}

/* ============================================================
   INPUT FIELD
============================================================ */

function InputField({
  icon: Icon,
  label,
  value,
  editing,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-gray-500">
        {label}
      </label>

      <div className="relative">

        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

        {editing ? (
          <input
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-10 pr-3 text-sm text-gray-300 outline-none focus:border-[#00C2FF]/40"
          />
        ) : (
          <div className="w-full rounded-xl border border-white/5 bg-[#0d1626]/60 py-3 pl-10 pr-3 text-sm text-gray-400">
            {value}
          </div>
        )}

      </div>

    </div>
  );
}

/* ============================================================
   VERIFICATION ITEM
============================================================ */

function VerificationItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#0d1626]/60 p-3">

      <p className="text-[9px] uppercase tracking-wider text-gray-700">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-gray-400">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   REVIEW
============================================================ */

function Review({
  name,
  rating,
  text,
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#0d1626]/60 p-5">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-white">
          {name}
        </p>

        <div className="flex gap-0.5">

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= rating
                    ? "fill-current text-yellow-400"
                    : "text-gray-800"
                }`}
              />
            )
          )}

        </div>

      </div>

      <p className="mt-3 text-xs leading-6 text-gray-600">
        "{text}"
      </p>

    </div>
  );
}