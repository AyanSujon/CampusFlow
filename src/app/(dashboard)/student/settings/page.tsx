
"use client";

import React, { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Eye,
  Globe2,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  Sun,
  User,
  Volume2,
} from "lucide-react";

type SettingSection =
  | "account"
  | "notifications"
  | "appearance"
  | "privacy"
  | "security";

export default function Settings() {
  const [activeSection, setActiveSection] =
    useState<SettingSection>("account");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [examNotifications, setExamNotifications] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);
  const [announcementNotifications, setAnnouncementNotifications] =
    useState(true);
  const [attendanceNotifications, setAttendanceNotifications] = useState(true);

  const [profileVisibility, setProfileVisibility] = useState("university");
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("system");

  const renderContent = () => {
    switch (activeSection) {
      case "notifications":
        return (
          <NotificationsSettings
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
            examNotifications={examNotifications}
            setExamNotifications={setExamNotifications}
            paymentNotifications={paymentNotifications}
            setPaymentNotifications={setPaymentNotifications}
            announcementNotifications={announcementNotifications}
            setAnnouncementNotifications={setAnnouncementNotifications}
            attendanceNotifications={attendanceNotifications}
            setAttendanceNotifications={setAttendanceNotifications}
          />
        );

      case "appearance":
        return (
          <AppearanceSettings
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
          />
        );

      case "privacy":
        return (
          <PrivacySettings
            profileVisibility={profileVisibility}
            setProfileVisibility={setProfileVisibility}
          />
        );

      case "security":
        return <SecuritySettings />;

      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your account, notifications, privacy and security
            preferences.
          </p>
        </div>

        {/* Settings Layout */}
        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="p-3">
              <SettingsNavItem
                active={activeSection === "account"}
                icon={<User className="h-4 w-4" />}
                label="Account"
                description="Basic account information"
                onClick={() => setActiveSection("account")}
              />

              <SettingsNavItem
                active={activeSection === "notifications"}
                icon={<Bell className="h-4 w-4" />}
                label="Notifications"
                description="Notification preferences"
                onClick={() => setActiveSection("notifications")}
              />

              <SettingsNavItem
                active={activeSection === "appearance"}
                icon={<Palette className="h-4 w-4" />}
                label="Appearance"
                description="Theme and language"
                onClick={() => setActiveSection("appearance")}
              />

              <SettingsNavItem
                active={activeSection === "privacy"}
                icon={<Eye className="h-4 w-4" />}
                label="Privacy"
                description="Profile visibility"
                onClick={() => setActiveSection("privacy")}
              />

              <SettingsNavItem
                active={activeSection === "security"}
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Security"
                description="Password and sessions"
                onClick={() => setActiveSection("security")}
              />
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Account Settings                                                            */
/* -------------------------------------------------------------------------- */

function AccountSettings() {
  return (
    <SettingsCard
      icon={<User className="h-5 w-5" />}
      title="Account Settings"
      description="Manage your basic student account information."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SettingField
          label="Full Name"
          value="Ayan Sujon"
          readOnly
        />

        <SettingField
          label="Student ID"
          value="STU-2026-CSE-0012"
          readOnly
        />

        <SettingField
          label="Email Address"
          value="ayan@example.com"
          readOnly
        />

        <SettingField
          label="Phone Number"
          value="+880 1XXX-XXXXXX"
          readOnly
        />

        <SettingField
          label="Program"
          value="B.Sc. in Computer Science & Engineering"
          readOnly
        />

        <SettingField
          label="Current Semester"
          value="6th Semester"
          readOnly
        />
      </div>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              Account managed by university
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-300">
              Some student information can only be changed by the university
              administration.
            </p>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

/* -------------------------------------------------------------------------- */
/* Notification Settings                                                       */
/* -------------------------------------------------------------------------- */

function NotificationsSettings({
  emailNotifications,
  setEmailNotifications,
  examNotifications,
  setExamNotifications,
  paymentNotifications,
  setPaymentNotifications,
  announcementNotifications,
  setAnnouncementNotifications,
  attendanceNotifications,
  setAttendanceNotifications,
}: {
  emailNotifications: boolean;
  setEmailNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  examNotifications: boolean;
  setExamNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  paymentNotifications: boolean;
  setPaymentNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  announcementNotifications: boolean;
  setAnnouncementNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  attendanceNotifications: boolean;
  setAttendanceNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <SettingsCard
      icon={<Bell className="h-5 w-5" />}
      title="Notification Settings"
      description="Choose which notifications you want to receive."
    >
      <div className="space-y-1">
        <ToggleSetting
          icon={<Mail className="h-5 w-5" />}
          title="Email Notifications"
          description="Receive important notifications through email."
          enabled={emailNotifications}
          onChange={setEmailNotifications}
        />

        <ToggleSetting
          icon={<GraduationCap className="h-5 w-5" />}
          title="Exam Notifications"
          description="Get notified about exam schedules and changes."
          enabled={examNotifications}
          onChange={setExamNotifications}
        />

        <ToggleSetting
          icon={<Volume2 className="h-5 w-5" />}
          title="Payment Notifications"
          description="Receive reminders about tuition and invoice payments."
          enabled={paymentNotifications}
          onChange={setPaymentNotifications}
        />

        <ToggleSetting
          icon={<Bell className="h-5 w-5" />}
          title="University Announcements"
          description="Receive important university announcements."
          enabled={announcementNotifications}
          onChange={setAnnouncementNotifications}
        />

        <ToggleSetting
          icon={<User className="h-5 w-5" />}
          title="Attendance Alerts"
          description="Get notified when your attendance requires attention."
          enabled={attendanceNotifications}
          onChange={setAttendanceNotifications}
        />
      </div>

      <SaveButton />
    </SettingsCard>
  );
}

/* -------------------------------------------------------------------------- */
/* Appearance Settings                                                         */
/* -------------------------------------------------------------------------- */

function AppearanceSettings({
  theme,
  setTheme,
  language,
  setLanguage,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <SettingsCard
      icon={<Palette className="h-5 w-5" />}
      title="Appearance"
      description="Customize how the student portal looks and feels."
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Theme
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Choose your preferred appearance.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <ThemeOption
            icon={<Sun className="h-5 w-5" />}
            title="Light"
            active={theme === "light"}
            onClick={() => setTheme("light")}
          />

          <ThemeOption
            icon={<Moon className="h-5 w-5" />}
            title="Dark"
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
          />

          <ThemeOption
            icon={<Smartphone className="h-5 w-5" />}
            title="System"
            active={theme === "system"}
            onClick={() => setTheme("system")}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">
          Language
        </div>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Select the language used throughout the portal.
        </p>

        <div className="relative mt-4 max-w-sm">
          <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
          >
            <option>English</option>
            <option>বাংলা</option>
          </select>
        </div>
      </div>

      <SaveButton />
    </SettingsCard>
  );
}

/* -------------------------------------------------------------------------- */
/* Privacy Settings                                                            */
/* -------------------------------------------------------------------------- */

function PrivacySettings({
  profileVisibility,
  setProfileVisibility,
}: {
  profileVisibility: string;
  setProfileVisibility: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <SettingsCard
      icon={<Eye className="h-5 w-5" />}
      title="Privacy Settings"
      description="Control who can view your student profile information."
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Profile Visibility
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Choose who can access your basic profile information.
        </p>

        <div className="mt-4 space-y-3">
          <RadioOption
            value="university"
            selected={profileVisibility}
            onChange={setProfileVisibility}
            title="University Only"
            description="Only authorized university users can view your profile."
          />

          <RadioOption
            value="department"
            selected={profileVisibility}
            onChange={setProfileVisibility}
            title="Department"
            description="Allow users within your department to view your profile."
          />

          <RadioOption
            value="private"
            selected={profileVisibility}
            onChange={setProfileVisibility}
            title="Private"
            description="Keep your profile visible only to authorized staff."
          />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
        <div className="flex gap-3">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />

          <div>
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              Privacy reminder
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700 dark:text-amber-300">
              University administrators may still access information required
              for academic and administrative purposes.
            </p>
          </div>
        </div>
      </div>

      <SaveButton />
    </SettingsCard>
  );
}

/* -------------------------------------------------------------------------- */
/* Security Settings                                                           */
/* -------------------------------------------------------------------------- */

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <SettingsCard
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Security"
        description="Protect your account and manage active sessions."
      >
        <div className="space-y-3">
          <ActionSetting
            icon={<KeyRound className="h-5 w-5" />}
            title="Change Password"
            description="Update your account password regularly for better security."
            action="Change"
          />

          <ActionSetting
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Two-Factor Authentication"
            description="Add an additional layer of protection to your account."
            action="Configure"
          />

          <ActionSetting
            icon={<Smartphone className="h-5 w-5" />}
            title="Active Sessions"
            description="Review devices that are currently signed in to your account."
            action="View"
          />
        </div>
      </SettingsCard>

      <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
        <div className="flex gap-3">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />

          <div>
            <h3 className="text-sm font-semibold text-red-900 dark:text-red-200">
              Account security
            </h3>

            <p className="mt-1 text-xs leading-5 text-red-700 dark:text-red-300">
              Never share your password or verification codes with anyone,
              including university staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable Components                                                         */
/* -------------------------------------------------------------------------- */

function SettingsCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function SettingsNavItem({
  active,
  icon,
  label,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg p-3 text-left transition ${
        active
          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
          : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          active
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
        }`}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>

        <span className="mt-0.5 block truncate text-[11px] opacity-70">
          {description}
        </span>
      </span>

      <ChevronRight
        className={`h-4 w-4 shrink-0 transition ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </button>
  );
}

function ToggleSetting({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg p-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange((current) => !current)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function ThemeOption({
  icon,
  title,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border p-4 transition ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/10 dark:border-blue-500 dark:bg-blue-950/30 dark:text-blue-300"
          : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
      }`}
    >
      {active && (
        <span className="absolute right-2 top-2">
          <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </span>
      )}

      {icon}

      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}

function RadioOption({
  value,
  selected,
  onChange,
  title,
  description,
}: {
  value: string;
  selected: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  description: string;
}) {
  const active = value === selected;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition ${
        active
          ? "border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20"
          : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          active
            ? "border-blue-600"
            : "border-slate-300 dark:border-slate-600"
        }`}
      >
        {active && <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
      </span>

      <span>
        <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
          {title}
        </span>

        <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </span>
    </button>
  );
}

function ActionSetting({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center dark:border-slate-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {action}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function SettingField({
  label,
  value,
  readOnly = false,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>

      <input
        type="text"
        defaultValue={value}
        readOnly={readOnly}
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
      />
    </div>
  );
}

function SaveButton() {
  return (
    <div className="mt-6 flex justify-end border-t border-slate-200 pt-5 dark:border-slate-800">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        <Save className="h-4 w-4" />
        Save Changes
      </button>
    </div>
  );
}

