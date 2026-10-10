

"use client";

import React, { useState } from "react";
import {
    ShieldCheck,
    UserCog,
    GraduationCap,
    BookOpen,
    Wallet,
    Users,
    Copy,
    ChevronDown,
    ChevronUp,
    FlaskConical,
    Check,
    X,
    Sparkles,
} from "lucide-react";

export type DemoCredentials = {
    email: string;
    password: string;
};

type DemoRole = {
    id: string;
    name: string;
    description: string;
    email: string;
    password: string;
    icon: React.ElementType;
    color: string;
};

type DemoLoginProps = {
    onFillCredentials: (credentials: DemoCredentials) => void;
};

const demoAccounts: DemoRole[] = [
    {
        id: "super-admin",
        name: "Super Admin",
        description: "Full system access",
        email: "superadmin@gmail.com",
        password: "Super@admin12345",
        icon: ShieldCheck,
        color: "text-violet-600 bg-violet-100 dark:bg-violet-500/15",
    },
    {
        id: "admin",
        name: "Admin",
        description: "University administration",
        email: "admin@gmail.com",
        password: "Admin@12345",
        icon: UserCog,
        color: "text-blue-600 bg-blue-100 dark:bg-blue-500/15",
    },
    {
        id: "department-head",
        name: "Department Head",
        description: "Department management",
        email: "departmenthead@gmail.com",
        password: "DepartmentHead@12345",
        icon: BookOpen,
        color: "text-amber-600 bg-amber-100 dark:bg-amber-500/15",
    },
    {
        id: "instructor",
        name: "Instructor",
        description: "Teaching and courses",
        email: "instructor@gmail.com",
        password: "Instructor@12345",
        icon: GraduationCap,
        color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/15",
    },
    {
        id: "student",
        name: "Student",
        description: "Student portal access",
        email: "student@gmail.com",
        password: "Student@12345",
        icon: Users,
        color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-500/15",
    },
    {
        id: "accountant",
        name: "Accountant",
        description: "Finance and payments",
        email: "accountant@gmail.com",
        password: "Accountant@12345",
        icon: Wallet,
        color: "text-rose-600 bg-rose-100 dark:bg-rose-500/15",
    },
];

export default function DemoLogin({
    onFillCredentials,
}: DemoLoginProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [copiedRole, setCopiedRole] = useState<string | null>(null);

    const handleSelect = (account: DemoRole) => {
        setSelectedRole(account.id);

        onFillCredentials({
            email: account.email,
            password: account.password,
        });
    };

    const handleCopy = async (
        event: React.MouseEvent<HTMLButtonElement>,
        account: DemoRole
    ) => {
        event.stopPropagation();

        try {
            await navigator.clipboard.writeText(
                `Email: ${account.email} \nPassword: ${account.password} `
            );

            setCopiedRole(account.id);
        } catch {
            setCopiedRole(null);
        }
    };

    return (
        <div className="relative w-full">
            {/* Small highlighted toggle button */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => setIsExpanded((previous) => !previous)}
                    aria-expanded={isExpanded}
                    aria-controls="demo-login-panel"
                    title="Try a demo account"
                    className="
                        group relative inline-flex items-center justify-center gap-2
                        overflow-hidden rounded-full border border-amber-300/70
                        bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500
                        px-3.5 py-2 text-xs font-bold text-slate-950
                        shadow-[0_4px_18px_rgba(245,158,11,0.30)]
                        transition-all duration-300
                        hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(245,158,11,0.45)]
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-amber-500 focus-visible:ring-offset-2
                        active:translate-y-0
                        dark:border-amber-400/40
                    "
                >
                    <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />

                    <span className="relative flex size-5 items-center justify-center rounded-full bg-slate-950/10">
                        <FlaskConical size={13} />
                    </span>

                    <span className="relative whitespace-nowrap">
                        Demo Login
                    </span>

                    <span className="relative flex items-center">
                        {isExpanded ? (
                            <X size={14} />
                        ) : (
                            <ChevronDown size={14} />
                        )}
                    </span>
                </button>
            </div>

            {/* Expandable credentials panel */}
            {isExpanded && (
                <section
                    id="demo-login-panel"
                    className="
                        absolute right-0 top-full z-50 mt-3
                        w-[min(92vw,440px)] overflow-hidden
                        rounded-2xl border border-slate-200
                        bg-white shadow-2xl shadow-slate-950/15
                        dark:border-slate-800 dark:bg-slate-950
                        animate-in fade-in slide-in-from-top-2 duration-200
                    "
                >
                    <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 p-3.5 dark:border-slate-800 dark:bg-slate-900/80">
                        <div className="flex min-w-0 items-center gap-2.5">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                                <Sparkles size={18} />
                            </span>

                            <div className="min-w-0">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Explore CampusFlow
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Select a role to autofill login details
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            aria-label="Close demo login panel"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            <X size={17} />
                        </button>
                    </div>

                    <div className="max-h-[65vh] overflow-y-auto p-3">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {demoAccounts.map((account) => {
                                const Icon = account.icon;
                                const isSelected = selectedRole === account.id;

                                return (
                                    <div
                                        key={account.id}
                                        className={`min - w - 0 rounded - xl border transition - all ${isSelected
                                            ? "border-blue-500 bg-blue-50/70 ring-1 ring-blue-500/20 dark:bg-blue-500/10"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                                            } `}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(account)}
                                            aria-pressed={isSelected}
                                            className="flex w-full min-w-0 items-center gap-2.5 p-2.5 text-left"
                                        >
                                            <span
                                                className={`flex size - 9 shrink - 0 items - center justify - center rounded - lg ${account.color} `}
                                            >
                                                <Icon size={18} />
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                                                    {account.name}
                                                </span>
                                                <span className="mt-0.5 block truncate text-[11px] text-slate-500 dark:text-slate-400">
                                                    {account.description}
                                                </span>
                                            </span>

                                            {isSelected && (
                                                <Check
                                                    size={16}
                                                    className="shrink-0 text-blue-600 dark:text-blue-400"
                                                />
                                            )}
                                        </button>

                                        <div className="flex min-w-0 items-center justify-between gap-2 border-t border-slate-100 px-2.5 py-2 dark:border-slate-800">
                                            <span className="min-w-0 break-all font-mono text-[10px] leading-4 text-slate-500 dark:text-slate-400">
                                                {account.email}
                                                <span className="block text-slate-700 dark:text-slate-300">
                                                    {account.password}
                                                </span>
                                            </span>

                                            <button
                                                type="button"
                                                onClick={(event) =>
                                                    handleCopy(event, account)
                                                }
                                                aria-label={`Copy ${account.name} credentials`}
                                                title="Copy credentials"
                                                className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                            >
                                                {copiedRole === account.id ? (
                                                    <Check size={13} />
                                                ) : (
                                                    <Copy size={13} />
                                                )}
                                                <span className="text-[11px]">
                                                    {copiedRole === account.id
                                                        ? "Copied"
                                                        : "Copy"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="mt-3 rounded-lg bg-slate-50 p-2.5 text-[11px] leading-5 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                            Select an account to autofill the login form.
                            You must still click your regular Sign In button.
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
}
