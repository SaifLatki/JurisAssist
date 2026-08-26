import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Lock,
  Camera,
  Save,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout, {
  PageHeader,
} from "../../components/DashboardLayout";

export default function ClientProfile() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Asad",
    email: "latki@gmail.com",
    phone: "",
    location: "Pakistan",
    bio: "JurisAssist client",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    appointment: true,
    messages: true,
    documents: true,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toggleNotification = (name) => {
    setNotifications((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    console.log("Updated profile:", profile);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!passwords.current) {
      alert("Please enter your current password.");
      return;
    }

    if (!passwords.newPassword) {
      alert("Please enter a new password.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    console.log("Password change requested");

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    alert("Password updated successfully.");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      id: "profile",
      label: "Profile Information",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
  ];

  return (
    <DashboardLayout role="client">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PageHeader
        title="Profile & Settings"
        description="Manage your account information, security, and preferences."
      />

      {/* =====================================================
          PROFILE HEADER CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="h-28 bg-gradient-to-r from-[#00C2FF]/10 via-[#00C2FF]/5 to-[#00FF88]/10" />

        <div className="relative px-6 pb-6">
          {/* Avatar */}

          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#0d1626] bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/20">
                <User className="h-10 w-10 text-[#00C2FF]" />
              </div>

              <button
                className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#0d1626] bg-[#00C2FF] text-slate-950 shadow-lg transition hover:bg-[#00FF88]"
                title="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="pb-1">
              <h2 className="text-2xl font-bold text-white">
                {profile.name}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">
                  {profile.email}
                </span>

                <span className="rounded-full border border-[#00FF88]/20 bg-[#00FF88]/10 px-2.5 py-1 text-[10px] font-medium text-[#00FF88]">
                  Client
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* ===================================================
            SETTINGS NAVIGATION
        =================================================== */}

        <aside>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveSection(item.id)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                    activeSection === item.id
                      ? "bg-[#00C2FF]/10 text-[#00C2FF]"
                      : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/5 px-4 py-3 text-sm text-red-400 transition hover:bg-red-400/10"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </aside>

        {/* ===================================================
            SETTINGS CONTENT
        =================================================== */}

        <main>
          {/* =================================================
              PROFILE
          ================================================= */}

          {activeSection === "profile" && (
            <div className="rounded-2xl border border-white/10 bg-white/5">
              <div className="border-b border-white/10 p-6">
                <h2 className="text-lg font-semibold text-white">
                  Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your personal information and contact
                  details.
                </p>
              </div>

              <form
                onSubmit={handleSaveProfile}
                className="space-y-6 p-6"
              >
                {/* Name */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#00C2FF]/40"
                    />
                  </div>
                </div>

                {/* Email */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#00C2FF]/40"
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-gray-600">
                    We'll use this email for account and
                    consultation notifications.
                  </p>
                </div>

                {/* Phone + Location */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        placeholder="+92 XXX XXXXXXX"
                        className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-[#00C2FF]/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Location
                    </label>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#00C2FF]/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    About
                  </label>

                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0d1626] p-4 text-sm text-white outline-none transition focus:border-[#00C2FF]/40"
                  />
                </div>

                {/* Save */}

                <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {saved ? (
                    <div className="flex items-center gap-2 text-sm text-[#00FF88]">
                      <CheckCircle2 className="h-4 w-4" />
                      Changes saved successfully.
                    </div>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#00C2FF]/20"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =================================================
              SECURITY
          ================================================= */}

          {activeSection === "security" && (
            <div className="space-y-6">
              {/* Change Password */}

              <div className="rounded-2xl border border-white/10 bg-white/5">
                <div className="border-b border-white/10 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C2FF]/10">
                      <Lock className="h-5 w-5 text-[#00C2FF]" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        Change Password
                      </h2>

                      <p className="text-sm text-gray-500">
                        Keep your account secure with a strong
                        password.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleChangePassword}
                  className="space-y-5 p-6"
                >
                  <PasswordInput
                    label="Current Password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    show={showPasswords.current}
                    onToggle={() =>
                      setShowPasswords((previous) => ({
                        ...previous,
                        current:
                          !previous.current,
                      }))
                    }
                  />

                  <PasswordInput
                    label="New Password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    show={showPasswords.newPassword}
                    onToggle={() =>
                      setShowPasswords((previous) => ({
                        ...previous,
                        newPassword:
                          !previous.newPassword,
                      }))
                    }
                  />

                  <PasswordInput
                    label="Confirm New Password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    show={showPasswords.confirm}
                    onToggle={() =>
                      setShowPasswords((previous) => ({
                        ...previous,
                        confirm:
                          !previous.confirm,
                      }))
                    }
                  />

                  <div className="rounded-xl border border-[#00C2FF]/10 bg-[#00C2FF]/5 p-4">
                    <div className="flex gap-3">
                      <Shield className="h-5 w-5 flex-shrink-0 text-[#00C2FF]" />

                      <div>
                        <p className="text-sm font-medium text-gray-300">
                          Password security
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-600">
                          Use at least 8 characters with a mix of
                          letters, numbers, and special characters.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-white/10 pt-6">
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#00FF88] px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      <Lock className="h-4 w-4" />
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Account Security */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="font-semibold text-white">
                  Account Security
                </h2>

                <div className="mt-5 space-y-4">
                  <SecurityRow
                    icon={Shield}
                    title="Account Protection"
                    description="Your account is protected."
                    status="Protected"
                  />

                  <SecurityRow
                    icon={Mail}
                    title="Email Verification"
                    description={profile.email}
                    status="Verified"
                  />

                  <SecurityRow
                    icon={Lock}
                    title="Password"
                    description="Your password is securely encrypted."
                    status="Secure"
                  />
                </div>
              </div>

              {/* Danger Zone */}

              <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.02] p-6">
                <h2 className="font-semibold text-red-400">
                  Danger Zone
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  These actions can affect your JurisAssist
                  account permanently.
                </p>

                <button
                  onClick={() =>
                    alert(
                      "Account deletion would be handled by your backend."
                    )
                  }
                  className="mt-5 rounded-xl border border-red-400/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-400/10"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {activeSection === "notifications" && (
            <div className="rounded-2xl border border-white/10 bg-white/5">
              <div className="border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF88]/10">
                    <Bell className="h-5 w-5 text-[#00FF88]" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Notification Preferences
                    </h2>

                    <p className="text-sm text-gray-500">
                      Choose which notifications you'd like to
                      receive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                <NotificationRow
                  title="Email Notifications"
                  description="Receive important account updates by email."
                  enabled={notifications.email}
                  onToggle={() =>
                    toggleNotification("email")
                  }
                />

                <NotificationRow
                  title="Appointment Reminders"
                  description="Get reminders about upcoming consultations."
                  enabled={notifications.appointment}
                  onToggle={() =>
                    toggleNotification("appointment")
                  }
                />

                <NotificationRow
                  title="Advocate Messages"
                  description="Receive notifications when an advocate sends you a message."
                  enabled={notifications.messages}
                  onToggle={() =>
                    toggleNotification("messages")
                  }
                />

                <NotificationRow
                  title="Document Updates"
                  description="Get notified when document analysis is completed."
                  enabled={notifications.documents}
                  onToggle={() =>
                    toggleNotification("documents")
                  }
                />

                <NotificationRow
                  title="Product & Marketing"
                  description="Receive news, product updates, and promotional content."
                  enabled={notifications.marketing}
                  onToggle={() =>
                    toggleNotification("marketing")
                  }
                />
              </div>

              <div className="border-t border-white/10 p-6">
                <div className="flex items-start gap-3 rounded-xl border border-yellow-400/10 bg-yellow-400/[0.03] p-4">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-400" />

                  <p className="text-xs leading-5 text-gray-500">
                    Critical security and account notifications
                    cannot be disabled.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}

/* ============================================================
   PASSWORD INPUT
============================================================ */

function PasswordInput({
  label,
  name,
  value,
  onChange,
  show,
  onToggle,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-white/10 bg-[#0d1626] py-3 pl-11 pr-12 text-sm text-white outline-none transition focus:border-[#00C2FF]/40"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-600 hover:text-gray-300"
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   SECURITY ROW
============================================================ */

function SecurityRow({
  icon: Icon,
  title,
  description,
  status,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
        <Icon className="h-4 w-4 text-[#00C2FF]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-300">
          {title}
        </p>

        <p className="mt-1 truncate text-xs text-gray-600">
          {description}
        </p>
      </div>

      <span className="flex items-center gap-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-medium text-[#00FF88]">
        <CheckCircle2 className="h-3 w-3" />
        {status}
      </span>
    </div>
  );
}

/* ============================================================
   NOTIFICATION ROW
============================================================ */

function NotificationRow({
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="flex items-center gap-4 p-6">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-300">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-600">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${
          enabled
            ? "bg-[#00C2FF]"
            : "bg-white/10"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}