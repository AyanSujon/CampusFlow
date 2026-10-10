// "use client";   


// import { useGetMe } from '@/hooks/auth.hook';
// import React from 'react'

// export default async function profile() {
//     const me = await useGetMe()

//     console.log("Accountant Profile Page - Current User:", me);


//   return (
//     <div>profile</div>
//   )
// }








"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Edit3,
    MapPin,
    Phone,
    RefreshCw,
    Save,
    ShieldCheck,
    UserRound,
    X,
    Mail,
} from "lucide-react";

type EmploymentStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TERMINATED";

type AccountantProfileData = {
    id: string;
    userId: string;
    employeeId: string;
    name: string;
    email: string;
    avatar: string;
    designation: string;
    joiningDate: string;
    phone: string;
    officeRoom: string;
    employmentStatus: EmploymentStatus;
    createdAt?: string;
    updatedAt?: string;
};

type ProfileFormData = Pick<
    AccountantProfileData,
    "name" | "email" | "phone" | "designation" | "joiningDate" | "officeRoom"
>;

const DEMO_PROFILE: AccountantProfileData = {
    id: "demo-accountant-profile-001",
    userId: "demo-user-001",
    employeeId: "ACC-2026-001",
    name: "Mohammad Rahman",
    email: "mohammad.rahman@campusflow.edu",
    avatar: "",
    designation: "Senior Accountant",
    joiningDate: "2023-01-15",
    phone: "+880 1712-345678",
    officeRoom: "Finance Block, Room 204",
    employmentStatus: "ACTIVE",
    createdAt: "2023-01-15T09:00:00.000Z",
    updatedAt: "2026-10-08T10:30:00.000Z",
};

const inputClass =
    "mt-2 h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "text-sm font-medium text-foreground";

function formatDate(date: string) {
    if (!date) return "Not provided";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Not provided";

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(parsed);
}

function getInitials(name: string) {
    return (
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase() || "AC"
    );
}

function getStatusStyle(status: EmploymentStatus) {
    switch (status) {
        case "ACTIVE":
            return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400";
        case "ON_LEAVE":
            return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400";
        case "INACTIVE":
            return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
        case "TERMINATED":
            return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400";
        default:
            return "border-border bg-muted text-muted-foreground";
    }
}

function InfoItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground">
                <Icon size={18} />
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-xs font-medium text-muted-foreground">
                    {label}
                </p>
                <p className="mt-1 break-words text-sm font-medium text-foreground">
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );
}

function FormField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
    required = false,
}: {
    label: string;
    name: keyof ProfileFormData;
    value: string;
    onChange: (name: keyof ProfileFormData, value: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
}) {
    return (
        <div className="min-w-0">
            <label htmlFor={name} className={labelClass}>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={inputClass}
            />
        </div>
    );
}

export default function AccountantProfilePage() {
    const [profile, setProfile] =
        useState<AccountantProfileData>(DEMO_PROFILE);

    const [form, setForm] = useState<ProfileFormData>({
        name: DEMO_PROFILE.name,
        email: DEMO_PROFILE.email,
        phone: DEMO_PROFILE.phone,
        designation: DEMO_PROFILE.designation,
        joiningDate: DEMO_PROFILE.joiningDate,
        officeRoom: DEMO_PROFILE.officeRoom,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Demo mode: no backend request is made.
    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setProfile(DEMO_PROFILE);
            setForm({
                name: DEMO_PROFILE.name,
                email: DEMO_PROFILE.email,
                phone: DEMO_PROFILE.phone,
                designation: DEMO_PROFILE.designation,
                joiningDate: DEMO_PROFILE.joiningDate,
                officeRoom: DEMO_PROFILE.officeRoom,
            });
            setIsLoading(false);
        }, 350);

        return () => window.clearTimeout(timeout);
    }, []);

    function fetchProfile() {
        setIsLoading(true);
        setError("");
        setSuccess("");
        setIsEditing(false);

        window.setTimeout(() => {
            setProfile((current) => ({ ...current }));
            setForm({
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                designation: profile.designation,
                joiningDate: profile.joiningDate,
                officeRoom: profile.officeRoom,
            });
            setIsLoading(false);
        }, 350);
    }

    function handleChange(name: keyof ProfileFormData, value: string) {
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSuccess("");
        setError("");
    }

    function handleCancel() {
        setForm({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            designation: profile.designation,
            joiningDate: profile.joiningDate,
            officeRoom: profile.officeRoom,
        });

        setIsEditing(false);
        setError("");
        setSuccess("");
    }

    async function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!form.name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!form.email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsSaving(true);

        try {
            await new Promise((resolve) => window.setTimeout(resolve, 400));

            const updatedProfile: AccountantProfileData = {
                ...profile,
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                designation: form.designation.trim(),
                joiningDate: form.joiningDate,
                officeRoom: form.officeRoom.trim(),
                updatedAt: new Date().toISOString(),
            };

            setProfile(updatedProfile);
            setForm({
                name: updatedProfile.name,
                email: updatedProfile.email,
                phone: updatedProfile.phone,
                designation: updatedProfile.designation,
                joiningDate: updatedProfile.joiningDate,
                officeRoom: updatedProfile.officeRoom,
            });

            setIsEditing(false);
            setSuccess("Demo profile updated successfully.");
        } catch {
            setError("Unable to update the demo profile.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="min-h-screen min-w-0 bg-background text-foreground">
            <div className="mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Page header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0">

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            My Profile
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Manage your professional information and contact
                            details.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={fetchProfile}
                            disabled={isLoading || isSaving}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
                        >
                            <RefreshCw
                                size={16}
                                className={isLoading ? "animate-spin" : ""}
                            />
                            Refresh
                        </button>

                        {!isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(true);
                                    setError("");
                                    setSuccess("");
                                }}
                                disabled={isLoading || !profile.id}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                            >
                                <Edit3 size={16} />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Demo notice */}
                <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">
                    <BadgeCheck size={19} className="mt-0.5 shrink-0" />
                    <p className="leading-6">
                        <strong>Demo mode:</strong> This page uses sample
                        accountant data. Changes are stored in component state
                        only and will reset when you reload the page.
                    </p>
                </div>

                {/* Alerts */}
                {error && (
                    <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                    >
                        <X size={18} className="mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">{error}</div>
                        <button
                            type="button"
                            onClick={() => setError("")}
                            aria-label="Dismiss error"
                            className="rounded p-1 hover:bg-red-100 dark:hover:bg-red-900/50"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {success && (
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                    >
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                        <span className="min-w-0 flex-1">{success}</span>
                        <button
                            type="button"
                            onClick={() => setSuccess("")}
                            aria-label="Dismiss success message"
                            className="rounded p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="h-80 animate-pulse rounded-2xl border border-border bg-muted/50" />
                        <div className="h-[500px] animate-pulse rounded-2xl border border-border bg-muted/50 lg:col-span-2" />
                    </div>
                ) : (
                    <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-3">
                        {/* Left column */}
                        <div className="min-w-0 space-y-6">
                            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                                <div className="h-28 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 sm:h-32" />

                                <div className="px-5 pb-6 sm:px-6">
                                    <div className="-mt-12 flex flex-wrap items-end justify-between gap-3">
                                        <div className="flex size-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-card bg-blue-100 text-2xl font-bold text-blue-800 shadow-sm dark:bg-blue-950 dark:text-blue-300">
                                            {profile.avatar ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={profile.avatar}
                                                    alt={`${profile.name} 's avatar`}
                                                    className="size-full object-cover"
                                                />
                                            ) : (
                                                getInitials(profile.name)
                                            )}
                                        </div >

                                        <span
                                            className={`mb-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(profile.employmentStatus)}`}
                                        >
                                            <span className="size-1.5 rounded-full bg-current" />
                                            {profile.employmentStatus.replace("_", " ")}
                                        </span>
                                    </div >

                                    <div className="mt-4 min-w-0">
                                        <h2 className="break-words text-xl font-bold tracking-tight">
                                            {profile.name || "Accountant"}
                                        </h2>
                                        <p className="mt-1 break-all text-sm text-muted-foreground">
                                            {profile.email || "No email provided"}
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-primary">
                                            {profile.designation || "Accountant"}
                                        </p>
                                    </div>

                                    <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                            <BadgeCheck size={16} />
                                            Employee ID
                                        </div>
                                        <p className="mt-2 break-all font-mono text-base font-bold tracking-wide">
                                            {profile.employeeId || "Not assigned"}
                                        </p>
                                    </div>

                                    <div className="mt-5 space-y-4">
                                        <InfoItem
                                            icon={BriefcaseBusiness}
                                            label="Designation"
                                            value={profile.designation}
                                        />
                                        <InfoItem
                                            icon={CalendarDays}
                                            label="Joining Date"
                                            value={formatDate(profile.joiningDate)}
                                        />
                                        <InfoItem
                                            icon={Phone}
                                            label="Phone Number"
                                            value={profile.phone}
                                        />
                                        <InfoItem
                                            icon={MapPin}
                                            label="Office Room"
                                            value={profile.officeRoom}
                                        />
                                    </div>

                                    <div className="mt-6 border-t border-border pt-5">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Account Information
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between gap-3 text-sm">
                                                <span className="text-muted-foreground">
                                                    Account status
                                                </span>
                                                <span className="font-medium">
                                                    {profile.employmentStatus === "ACTIVE"
                                                        ? "Active"
                                                        : profile.employmentStatus.replace("_", " ")}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 text-sm">
                                                <span className="text-muted-foreground">
                                                    Profile ID
                                                </span>
                                                <span className="max-w-[150px] truncate font-mono text-xs">
                                                    {profile.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </section >

                            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                        <ShieldCheck size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold">
                                            Account Security
                                        </h3>
                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                            Your profile is associated with your
                                            authenticated CampusFlow account.
                                        </p>

                                        <Link
                                            href="/accountant/settings"
                                            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                                        >
                                            Account settings <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div >

                        {/* Right column */}
                        < div className="min-w-0 space-y-6 lg:col-span-2" >
                            <section className="min-w-0 rounded-2xl border border-border bg-card shadow-sm">
                                <div className="flex flex-col justify-between gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:px-6">
                                    <div>
                                        <h2 className="text-base font-semibold">
                                            Personal Information
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Your professional and contact information.
                                        </p>
                                    </div>

                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(true);
                                                setError("");
                                                setSuccess("");
                                            }}
                                            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted sm:self-auto"
                                        >
                                            <Edit3 size={15} />
                                            Edit details
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSave}>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
                                        <FormField
                                            label="Full Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            disabled={!isEditing || isSaving}
                                            required
                                        />

                                        <FormField
                                            label="Email Address"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="accountant@university.edu"
                                            type="email"
                                            disabled={!isEditing || isSaving}
                                            required
                                        />

                                        <FormField
                                            label="Phone Number"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+880 1XXX-XXXXXX"
                                            type="tel"
                                            disabled={!isEditing || isSaving}
                                        />

                                        <FormField
                                            label="Designation"
                                            name="designation"
                                            value={form.designation}
                                            onChange={handleChange}
                                            placeholder="Senior Accountant"
                                            disabled={!isEditing || isSaving}
                                        />

                                        <FormField
                                            label="Joining Date"
                                            name="joiningDate"
                                            value={form.joiningDate}
                                            onChange={handleChange}
                                            type="date"
                                            disabled={!isEditing || isSaving}
                                        />

                                        <FormField
                                            label="Office Room"
                                            name="officeRoom"
                                            value={form.officeRoom}
                                            onChange={handleChange}
                                            placeholder="Finance Block, Room 204"
                                            disabled={!isEditing || isSaving}
                                        />

                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>
                                                Employee ID
                                            </label>
                                            <div className="mt-2 flex h-11 min-w-0 items-center gap-3 rounded-lg border border-border bg-muted/40 px-3">
                                                <BadgeCheck
                                                    size={17}
                                                    className="shrink-0 text-muted-foreground"
                                                />
                                                <span className="truncate font-mono text-sm font-medium">
                                                    {profile.employeeId || "Not assigned"}
                                                </span>
                                                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                                                    Read-only
                                                </span>
                                            </div>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Employee ID is managed by the
                                                university and cannot be edited here.
                                            </p>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>
                                                Employment Status
                                            </label>
                                            <div className="mt-2 flex min-h-11 flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(profile.employmentStatus)}`}
                                                >
                                                    <span className="size-1.5 rounded-full bg-current" />
                                                    {profile.employmentStatus.replace("_", " ")}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Managed by authorized university administrators.
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/20 p-5 sm:flex-row sm:justify-end sm:px-6">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                disabled={isSaving}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
                                            >
                                                <X size={16} />
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                disabled={isSaving}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <RefreshCw
                                                            size={16}
                                                            className="animate-spin"
                                                        />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save size={16} />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </section>

                            {/* Profile activity */}
                            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                                        <Clock3 size={19} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold">
                                            Profile Activity
                                        </h2>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Record timestamps maintained by the system.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="rounded-xl border border-border p-4">
                                        <p className="text-xs text-muted-foreground">
                                            Profile created
                                        </p>
                                        <p className="mt-2 text-sm font-semibold">
                                            {formatDate(profile.createdAt ?? "")}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-border p-4">
                                        <p className="text-xs text-muted-foreground">
                                            Last updated
                                        </p>
                                        <p className="mt-2 text-sm font-semibold">
                                            {formatDate(profile.updatedAt ?? "")}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                                        <Mail size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-sm font-semibold">
                                            Contact Information
                                        </h2>
                                        <p className="mt-1 break-all text-sm text-muted-foreground">
                                            {profile.email}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {profile.phone || "No phone number provided"}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div >
                    </div >
                )}

                <footer className="flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>CampusFlow · Accountant Portal · Demo</p>
                    <Link
                        href="/accountant"
                        className="inline-flex items-center gap-1 transition hover:text-foreground"
                    >
                        <ArrowLeft size={13} />
                        Back to Dashboard
                    </Link>
                </footer>
            </div >
        </main >
    );
}
