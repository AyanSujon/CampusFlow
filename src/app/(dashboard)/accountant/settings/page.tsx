// import React from 'react'

// export default function settings() {
//   return (
//     <div>settings</div>
//   )
// }













"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Bell,
    Check,
    ChevronRight,
    Clock,
    Globe,
    KeyRound,
    Laptop,
    LockKeyhole,
    Mail,
    Moon,
    Palette,
    RotateCcw,
    Save,
    Settings2,
    ShieldCheck,
    Sun,
    UserRound,
    Wallet,
    Smartphone,
    MessageSquare,
    AlertTriangle,
    Eye,
    EyeOff,
    CheckCircle2,
} from "lucide-react";

type NotificationSettings = {
    emailNotifications: boolean;
    paymentNotifications: boolean;
    invoiceNotifications: boolean;
    overdueReminders: boolean;
    refundNotifications: boolean;
    securityAlerts: boolean;
    weeklySummary: boolean;
    systemAnnouncements: boolean;
};

type Preferences = {
    theme: "light" | "dark" | "system";
    language: string;
    dateFormat: string;
    timezone: string;
    currency: string;
    compactTables: boolean;
    confirmBeforeActions: boolean;
};

const defaultNotifications: NotificationSettings = {
    emailNotifications: true,
    paymentNotifications: true,
    invoiceNotifications: true,
    overdueReminders: true,
    refundNotifications: true,
    securityAlerts: true,
    weeklySummary: false,
    systemAnnouncements: true,
};

const defaultPreferences: Preferences = {
    theme: "system",
    language: "en",
    dateFormat: "DD MMM YYYY",
    timezone: "Asia/Dhaka",
    currency: "BDT",
    compactTables: false,
    confirmBeforeActions: true,
};

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${checked ? "bg-primary" : "bg-muted-foreground/30"
                }`}
        >
            <span
                className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    );
}

function SectionCard({
    title,
    description,
    icon: Icon,
    children,
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b border-border p-4 sm:p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                </div>
                <div className="min-w-0">
                    <h2 className="font-semibold tracking-tight">{title}</h2>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
            <div className="divide-y divide-border px-4 sm:px-5">{children}</div>
        </section>
    );
}

function SettingRow({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {description}
                </p>
            </div>
            <div className="flex shrink-0 items-center">{children}</div>
        </div>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
}) {
    return (
        <div className="w-full sm:w-52">
            <label className="sr-only">{label}</label>
            <select
                aria-label={label}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-10 w-full min-w-0 rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function NotificationRow({
    title,
    description,
    checked,
    onChange,
}: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <SettingRow title={title} description={description}>
            <Toggle checked={checked} onChange={onChange} label={title} />
        </SettingRow>
    );
}

export default function AccountantSettings() {
    const [notifications, setNotifications] =
        useState<NotificationSettings>(defaultNotifications);

    const [preferences, setPreferences] =
        useState<Preferences>(defaultPreferences);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showEmail, setShowEmail] = useState(true);
    const [activeSection, setActiveSection] = useState("general");

    const updateNotification = (
        key: keyof NotificationSettings,
        value: boolean
    ) => {
        setNotifications((previous) => ({
            ...previous,
            [key]: value,
        }));
        setShowSuccess(false);
    };

    const updatePreference = <K extends keyof Preferences>(
        key: K,
        value: Preferences[K]
    ) => {
        setPreferences((previous) => ({
            ...previous,
            [key]: value,
        }));
        setShowSuccess(false);
    };

    const handleSave = () => {
        // Demo only: connect this handler to your settings API.
        setShowSuccess(true);
    };

    const handleReset = () => {
        setNotifications(defaultNotifications);
        setPreferences(defaultPreferences);
        setShowSuccess(false);
    };

    const navigation = [
        { id: "general", label: "General", icon: Settings2 },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "security", label: "Security", icon: ShieldCheck },
    ];

    return (
        <main className="min-h-screen min-w-0 overflow-x-clip bg-background text-foreground">
            <div className="mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Page header */}
                <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Settings
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Manage your personal preferences, notifications, appearance and
                            security options.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </header>

                {/* Save feedback */}
                {showSuccess && (
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm"
                    >
                        <CheckCircle2
                            size={19}
                            className="mt-0.5 shrink-0 text-emerald-600"
                        />
                        <div>
                            <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                                Settings ready
                            </p>
                            <p className="mt-1 text-muted-foreground">
                                These changes are currently stored in page state only. Connect
                                the save action to your backend to persist them.
                            </p>
                        </div>
                    </div>
                )}

                {/* Account summary */}
                <section className="flex min-w-0 flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
                        AC
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-semibold">Accountant Account</h2>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                <Check size={13} />
                                Active
                            </span>
                        </div>
                        <p className="mt-1 break-all text-sm text-muted-foreground">
                            Manage your account preferences for CampusFlow.
                        </p>
                    </div>

                    <Link
                        href="/accountant/profile"
                        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                    >
                        <UserRound size={16} />
                        View Profile
                        <ChevronRight size={15} />
                    </Link>
                </section>

                <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
                    {/* Settings navigation */}
                    <aside className="min-w-0 lg:sticky lg:top-6">
                        <nav
                            aria-label="Settings sections"
                            className="flex gap-2 overflow-x-auto rounded-xl border border-border bg-card p-2 lg:flex-col lg:overflow-visible"
                        >
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const active = activeSection === item.id;

                                return (
                                    <button
                                        type="button"
                                        key={item.id}
                                        onClick={() => {
                                            setActiveSection(item.id);
                                            document
                                                .getElementById(item.id)
                                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }}
                                        className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition lg:w-full ${active
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        <Icon size={17} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="mt-4 hidden rounded-xl border border-border bg-card p-4 lg:block">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-emerald-600" />
                                <p className="text-sm font-semibold">Account security</p>
                            </div>
                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                Keep your credentials private and review unfamiliar account
                                activity promptly.
                            </p>
                            <Link
                                href="/accountant/profile"
                                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                            >
                                Account details <ChevronRight size={13} />
                            </Link>
                        </div>
                    </aside>

                    {/* Settings content */}
                    <div className="min-w-0 space-y-6">
                        {/* General */}
                        <div id="general" className="scroll-mt-6">
                            <SectionCard
                                title="General Preferences"
                                description="Set your regional and financial display preferences."
                                icon={Globe}
                            >
                                <SettingRow
                                    title="Language"
                                    description="Choose the language used for your interface."
                                >
                                    <SelectField
                                        label="Language"
                                        value={preferences.language}
                                        onChange={(value) =>
                                            updatePreference("language", value)
                                        }
                                        options={[
                                            { label: "English", value: "en" },
                                            { label: "বাংলা", value: "bn" },
                                        ]}
                                    />
                                </SettingRow>

                                <SettingRow
                                    title="Timezone"
                                    description="Used when displaying financial activity dates."
                                >
                                    <SelectField
                                        label="Timezone"
                                        value={preferences.timezone}
                                        onChange={(value) =>
                                            updatePreference("timezone", value)
                                        }
                                        options={[
                                            {
                                                label: "Asia / Dhaka (UTC+6)",
                                                value: "Asia/Dhaka",
                                            },
                                            {
                                                label: "UTC",
                                                value: "UTC",
                                            },
                                            {
                                                label: "Asia / Kolkata",
                                                value: "Asia/Kolkata",
                                            },
                                        ]}
                                    />
                                </SettingRow>

                                <SettingRow
                                    title="Date Format"
                                    description="Choose how dates appear in tables and reports."
                                >
                                    <SelectField
                                        label="Date format"
                                        value={preferences.dateFormat}
                                        onChange={(value) =>
                                            updatePreference("dateFormat", value)
                                        }
                                        options={[
                                            { label: "09 Oct 2026", value: "DD MMM YYYY" },
                                            { label: "09/10/2026", value: "DD/MM/YYYY" },
                                            { label: "2026-10-09", value: "YYYY-MM-DD" },
                                            { label: "10/09/2026", value: "MM/DD/YYYY" },
                                        ]}
                                    />
                                </SettingRow>

                                <SettingRow
                                    title="Display Currency"
                                    description="Currency format used for financial amounts."
                                >
                                    <SelectField
                                        label="Display currency"
                                        value={preferences.currency}
                                        onChange={(value) =>
                                            updatePreference("currency", value)
                                        }
                                        options={[
                                            { label: "BDT — ৳ Taka", value: "BDT" },
                                        ]}
                                    />
                                </SettingRow>
                            </SectionCard>
                        </div>

                        {/* Notifications */}
                        <div id="notifications" className="scroll-mt-6">
                            <SectionCard
                                title="Notification Preferences"
                                description="Choose which financial and account updates you want to receive."
                                icon={Bell}
                            >
                                <SettingRow
                                    title="Email Notifications"
                                    description="Master switch for optional email notifications."
                                >
                                    <Toggle
                                        label="Email notifications"
                                        checked={notifications.emailNotifications}
                                        onChange={(value) =>
                                            updateNotification("emailNotifications", value)
                                        }
                                    />
                                </SettingRow>

                                <NotificationRow
                                    title="Payment Notifications"
                                    description="Updates when payments are received, verified or fail."
                                    checked={
                                        notifications.paymentNotifications &&
                                        notifications.emailNotifications
                                    }
                                    onChange={(value) =>
                                        updateNotification("paymentNotifications", value)
                                    }
                                />

                                <NotificationRow
                                    title="Invoice Notifications"
                                    description="Updates about newly issued or changed invoices."
                                    checked={
                                        notifications.invoiceNotifications &&
                                        notifications.emailNotifications
                                    }
                                    onChange={(value) =>
                                        updateNotification("invoiceNotifications", value)
                                    }
                                />

                                <NotificationRow
                                    title="Overdue Fee Reminders"
                                    description="Alerts when student invoices become overdue."
                                    checked={
                                        notifications.overdueReminders &&
                                        notifications.emailNotifications
                                    }
                                    onChange={(value) =>
                                        updateNotification("overdueReminders", value)
                                    }
                                />

                                <NotificationRow
                                    title="Refund Notifications"
                                    description="Updates about refund requests and processing."
                                    checked={
                                        notifications.refundNotifications &&
                                        notifications.emailNotifications
                                    }
                                    onChange={(value) =>
                                        updateNotification("refundNotifications", value)
                                    }
                                />

                                <NotificationRow
                                    title="Weekly Financial Summary"
                                    description="Receive a weekly collection and outstanding-fees summary."
                                    checked={
                                        notifications.weeklySummary &&
                                        notifications.emailNotifications
                                    }
                                    onChange={(value) =>
                                        updateNotification("weeklySummary", value)
                                    }
                                />

                                <NotificationRow
                                    title="System Announcements"
                                    description="Important CampusFlow updates and maintenance notices."
                                    checked={
                                        notifications.systemAnnouncements &&
                                        notifications.emailNotifications
                                    }
                                    onChange={(value) =>
                                        updateNotification("systemAnnouncements", value)
                                    }
                                />

                                <NotificationRow
                                    title="Security Alerts"
                                    description="Important account security and sign-in notifications."
                                    checked={notifications.securityAlerts}
                                    onChange={(value) =>
                                        updateNotification("securityAlerts", value)
                                    }
                                />
                            </SectionCard>
                        </div>

                        {/* Appearance */}
                        <div id="appearance" className="scroll-mt-6">
                            <SectionCard
                                title="Appearance & Display"
                                description="Personalize the dashboard display."
                                icon={Palette}
                            >
                                <SettingRow
                                    title="Theme"
                                    description="Choose your preferred color scheme."
                                >
                                    <div className="grid w-full grid-cols-3 gap-2 sm:w-auto">
                                        {[
                                            { value: "light", label: "Light", icon: Sun },
                                            { value: "dark", label: "Dark", icon: Moon },
                                            { value: "system", label: "System", icon: Laptop },
                                        ].map((theme) => {
                                            const Icon = theme.icon;
                                            const active = preferences.theme === theme.value;

                                            return (
                                                <button
                                                    type="button"
                                                    key={theme.value}
                                                    onClick={() =>
                                                        updatePreference(
                                                            "theme",
                                                            theme.value as Preferences["theme"]
                                                        )
                                                    }
                                                    className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${active
                                                        ? "border-primary bg-primary/10 font-semibold text-primary"
                                                        : "border-border hover:bg-muted"
                                                        }`}
                                                >
                                                    <Icon size={15} />
                                                    {theme.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </SettingRow>

                                <SettingRow
                                    title="Compact Tables"
                                    description="Use denser rows in invoice and payment tables."
                                >
                                    <Toggle
                                        label="Compact tables"
                                        checked={preferences.compactTables}
                                        onChange={(value) =>
                                            updatePreference("compactTables", value)
                                        }
                                    />
                                </SettingRow>

                                <SettingRow
                                    title="Confirm Important Actions"
                                    description="Show confirmation before potentially sensitive actions."
                                >
                                    <Toggle
                                        label="Confirm important actions"
                                        checked={preferences.confirmBeforeActions}
                                        onChange={(value) =>
                                            updatePreference("confirmBeforeActions", value)
                                        }
                                    />
                                </SettingRow>
                            </SectionCard>
                        </div>

                        {/* Security */}
                        <div id="security" className="scroll-mt-6">
                            <SectionCard
                                title="Privacy & Security"
                                description="Review account security options."
                                icon={ShieldCheck}
                            >
                                <SettingRow
                                    title="Account Profile"
                                    description="Update your name, email and contact information."
                                >
                                    <Link
                                        href="/accountant/profile"
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                                    >
                                        <UserRound size={16} />
                                        Edit Profile
                                        <ChevronRight size={15} />
                                    </Link>
                                </SettingRow>

                                <SettingRow
                                    title="Password"
                                    description="Use a strong, unique password for your account."
                                >
                                    <Link
                                        href="/forgot-password"
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                                    >
                                        <KeyRound size={16} />
                                        Reset Password
                                        <ChevronRight size={15} />
                                    </Link>
                                </SettingRow>

                                <SettingRow
                                    title="Security Notifications"
                                    description="Receive important alerts about account security."
                                >
                                    <Toggle
                                        label="Security notifications"
                                        checked={notifications.securityAlerts}
                                        onChange={(value) =>
                                            updateNotification("securityAlerts", value)
                                        }
                                    />
                                </SettingRow>

                                <div className="my-4 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                                    <LockKeyhole
                                        size={19}
                                        className="mt-0.5 shrink-0 text-amber-600"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Financial access protection
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                            Account preferences do not grant additional permissions.
                                            Invoice, refund, adjustment and payment permissions must
                                            be enforced by the backend.
                                        </p>
                                    </div>
                                </div>
                            </SectionCard>
                        </div>

                        {/* Bottom actions */}
                        <div className="flex flex-col-reverse justify-between gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                            <p className="text-xs leading-5 text-muted-foreground">
                                Remember to save your changes before leaving this page.
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition hover:bg-muted sm:flex-none"
                                >
                                    <RotateCcw size={15} />
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:flex-none"
                                >
                                    <Save size={16} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
