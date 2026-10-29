// import React from 'react'

// export default function AdminProfile() {
//     return (
//         <div>AdminProfile</div>
//     )
// }






















"use client";

import { useState } from "react";
import {
    Activity,
    ArrowLeft,
    BadgeCheck,
    Bell,
    Camera,
    Check,
    ChevronRight,
    Clock3,
    KeyRound,
    LockKeyhole,
    Mail,
    MapPin,
    Pencil,
    Phone,
    Save,
    ShieldCheck,
    UserRound,
    X,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type ProfileData = {
    fullName: string;
    email: string;
    phone: string;
    designation: string;
    department: string;
    location: string;
};

const initialProfile: ProfileData = {
    fullName: "Ayan Sujon",
    email: "ayan@example.com",
    phone: "",
    designation: "System Administrator",
    department: "Administration",
    location: "Noakhali, Bangladesh",
};

export default function AdminProfile() {
    const [profile, setProfile] = useState<ProfileData>(initialProfile);
    const [draft, setDraft] = useState<ProfileData>(initialProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    const initials = profile.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    function startEditing() {
        setDraft(profile);
        setSaved(false);
        setIsEditing(true);
    }

    function cancelEditing() {
        setDraft(profile);
        setIsEditing(false);
    }

    function saveProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setProfile(draft);
        setIsEditing(false);
        setSaved(true);
    }

    function updateDraft(field: keyof ProfileData, value: string) {
        setDraft((current) => ({ ...current, [field]: value }));
        setSaved(false);
    }

    return (
        <main className="w-full min-w-0 space-y-6 overflow-x-clip p-4 pb-8 sm:p-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <UserRound className="size-5" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                My Profile
                            </h1>
                            <Badge variant="secondary">Administrator</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your personal information, account settings, and security.
                        </p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full gap-2 sm:w-auto"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="size-4" />
                    Go back
                </Button>
            </div>

            {saved && (
                <div
                    role="status"
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400"
                >
                    <Check className="size-4 shrink-0" />
                    Profile changes have been saved in this session.
                </div>
            )}

            {/* Profile overview */}
            <Card className="overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-primary via-blue-700 to-indigo-500 sm:h-36" />

                <CardContent className="-mt-12 p-5 sm:-mt-14 sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                            <div className="relative flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-background bg-primary text-2xl font-bold text-primary-foreground shadow-sm sm:size-28">
                                {initials || "AD"}
                                <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-emerald-500 text-white">
                                    <Check className="size-3.5" />
                                </span>
                            </div>

                            <div className="min-w-0 pb-1">
                                <h2 className="break-words text-xl font-bold sm:text-2xl">
                                    {profile.fullName || "Administrator"}
                                </h2>
                                <p className="mt-1 break-all text-sm text-muted-foreground">
                                    {profile.email}
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <Badge className="gap-1">
                                        <ShieldCheck className="size-3.5" />
                                        ADMIN
                                    </Badge>
                                    <Badge variant="outline" className="gap-1">
                                        <BadgeCheck className="size-3.5 text-emerald-600" />
                                        Active account
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {!isEditing && (
                            <Button
                                onClick={startEditing}
                                className="w-full gap-2 sm:w-auto"
                            >
                                <Pencil className="size-4" />
                                Edit profile
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,1fr)]">
                {/* Personal information */}
                <div className="min-w-0 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
                            <div>
                                <CardTitle className="text-base">
                                    Personal Information
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Your contact details and professional information.
                                </CardDescription>
                            </div>

                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <UserRound className="size-5" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={saveProfile} className="space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="fullName">Full name</Label>
                                        <Input
                                            id="fullName"
                                            value={isEditing ? draft.fullName : profile.fullName}
                                            onChange={(event) =>
                                                updateDraft("fullName", event.target.value)
                                            }
                                            disabled={!isEditing}
                                            required
                                            maxLength={100}
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                className="pl-9"
                                                value={isEditing ? draft.email : profile.email}
                                                onChange={(event) =>
                                                    updateDraft("email", event.target.value)
                                                }
                                                disabled={!isEditing}
                                                required
                                                maxLength={254}
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="phone">Phone number</Label>
                                        <div className="relative">
                                            <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                className="pl-9"
                                                value={isEditing ? draft.phone : profile.phone}
                                                onChange={(event) =>
                                                    updateDraft("phone", event.target.value)
                                                }
                                                disabled={!isEditing}
                                                maxLength={30}
                                                placeholder="Add your phone number"
                                            />
                                        </div>
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="designation">Designation</Label>
                                        <Input
                                            id="designation"
                                            value={
                                                isEditing
                                                    ? draft.designation
                                                    : profile.designation
                                            }
                                            onChange={(event) =>
                                                updateDraft("designation", event.target.value)
                                            }
                                            disabled={!isEditing}
                                            maxLength={100}
                                            placeholder="Your job title"
                                        />
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            value={
                                                isEditing ? draft.department : profile.department
                                            }
                                            onChange={(event) =>
                                                updateDraft("department", event.target.value)
                                            }
                                            disabled={!isEditing}
                                            maxLength={100}
                                            placeholder="Your department"
                                        />
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <div className="relative">
                                            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="location"
                                                className="pl-9"
                                                value={
                                                    isEditing ? draft.location : profile.location
                                                }
                                                onChange={(event) =>
                                                    updateDraft("location", event.target.value)
                                                }
                                                disabled={!isEditing}
                                                maxLength={120}
                                                placeholder="City, country"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <>
                                        <Separator />
                                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={cancelEditing}
                                                className="gap-2"
                                            >
                                                <X className="size-4" />
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="gap-2">
                                                <Save className="size-4" />
                                                Save changes
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </CardContent>
                    </Card>

                    {/* Account permissions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ShieldCheck className="size-5 text-primary" />
                                Account & Permissions
                            </CardTitle>
                            <CardDescription>
                                Your assigned access level within CampusFlow UMS.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <LockKeyhole className="size-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium">System role</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Full administrative access
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary">ADMIN</Badge>
                            </div>

                            <div className="space-y-3">
                                {[
                                    "Manage users and account access",
                                    "Manage academic departments and records",
                                    "Review financial workflows",
                                    "Access system audit logs",
                                ].map((permission) => (
                                    <div
                                        key={permission}
                                        className="flex items-start gap-2.5 text-sm"
                                    >
                                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                                        <span>{permission}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs leading-5 text-muted-foreground">
                                Permissions shown are illustrative. Enforce actual permissions
                                through your backend authorization rules.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="min-w-0 space-y-6">
                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <KeyRound className="size-5 text-primary" />
                                Security
                            </CardTitle>
                            <CardDescription>
                                Keep your administrator account protected.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <LockKeyhole className="size-5 text-muted-foreground" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">Password</p>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Change your password regularly to help protect your account.
                                    </p>
                                </div>
                                <Badge variant="outline">Private</Badge>
                            </div>

                            <Separator />

                            <div className="flex items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <ShieldCheck className="size-5 text-muted-foreground" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">Two-factor authentication</p>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Add an extra verification step when signing in.
                                    </p>
                                </div>
                                <Badge variant="outline">Check settings</Badge>
                            </div>

                            <p className="rounded-lg bg-muted/50 p-3 text-xs leading-5 text-muted-foreground">
                                Password changes and two-factor authentication need to be
                                connected to your authentication API before they can be used.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Bell className="size-5 text-primary" />
                                Notifications
                            </CardTitle>
                            <CardDescription>
                                Choose which notifications you want to receive.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <label className="flex cursor-pointer items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium">Email notifications</p>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Receive general account and activity updates.
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={emailNotifications}
                                    onChange={(event) =>
                                        setEmailNotifications(event.target.checked)
                                    }
                                    aria-label="Enable email notifications"
                                    className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
                                />
                            </label>

                            <Separator />

                            <label className="flex cursor-pointer items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium">Security alerts</p>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Receive alerts about suspicious account activity.
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={securityAlerts}
                                    onChange={(event) =>
                                        setSecurityAlerts(event.target.checked)
                                    }
                                    aria-label="Enable security alerts"
                                    className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
                                />
                            </label>

                            <p className="text-xs leading-5 text-muted-foreground">
                                These preferences currently apply to this page session only.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Account activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Activity className="size-5 text-primary" />
                                Account Activity
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <Clock3 className="size-4 text-muted-foreground" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium">Account status</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Active
                                    </p>
                                </div>
                                <span className="ml-auto mt-1 size-2 rounded-full bg-emerald-500" />
                            </div>

                            <Separator />

                            <div className="flex items-start gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <BadgeCheck className="size-4 text-muted-foreground" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium">Account role</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Super Administrator
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <p className="text-xs leading-5 text-muted-foreground">
                                Recent sign-in times, devices, and account creation details
                                should be loaded from your authentication and audit-log APIs.
                            </p>

                            <Button
                                variant="outline"
                                className="w-full gap-2"
                                onClick={() => {
                                    window.location.href = "/admin/audit-logs";
                                }}
                            >
                                View audit logs
                                <ChevronRight className="size-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
                CampusFlow UMS · Profile & Account Settings
            </p>
        </main>
    );
}
