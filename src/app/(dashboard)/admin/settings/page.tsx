// import React from 'react'

// export default function settings() {
//   return (
//     <div>settings</div>
//   )
// }

























"use client";

import { useState } from "react";
import {
    Bell,
    Check,
    Clock,
    Globe,
    GraduationCap,
    Languages,
    LockKeyhole,
    Palette,
    Save,
    Settings2,
    ShieldCheck,
    SunMoon,
    RotateCcw,
    Monitor,
    Moon,
    Sun,
    Database,
    Mail,
    CalendarDays,
    AlertTriangle,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type ThemePreference = "light" | "dark" | "system";

type SettingsData = {
    universityName: string;
    supportEmail: string;
    timezone: string;
    language: string;
    dateFormat: string;
    academicYear: string;
    semester: string;
    emailNotifications: boolean;
    securityAlerts: boolean;
    academicNotifications: boolean;
    financeNotifications: boolean;
    sessionTimeout: string;
    maintenanceMode: boolean;
};

const defaultSettings: SettingsData = {
    universityName: "CampusFlow University",
    supportEmail: "support@campusflow.edu",
    timezone: "Asia/Dhaka",
    language: "en",
    dateFormat: "DD MMM YYYY",
    academicYear: "2026-2027",
    semester: "Fall",
    emailNotifications: true,
    securityAlerts: true,
    academicNotifications: true,
    financeNotifications: false,
    sessionTimeout: "30",
    maintenanceMode: false,
};

function PreferenceSwitch({
    checked,
    onChange,
    label,
    description,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description: string;
}) {
    return (
        <label className="flex cursor-pointer items-start justify-between gap-4 py-3">
            <div className="min-w-0">
                <p className="text-sm font-medium">{label}</p>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={label}
                onClick={() => onChange(!checked)}
                className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${checked ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
            >
                <span
                    className={`inline-block size-5 rounded-full bg-background shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"
                        }`}
                />
            </button>
        </label>
    );
}

export default function SettingsPage() {
    const [settings, setSettings] =
        useState<SettingsData>(defaultSettings);
    const [savedSettings, setSavedSettings] =
        useState<SettingsData>(defaultSettings);
    const [theme, setTheme] = useState<ThemePreference>("system");
    const [saved, setSaved] = useState(false);

    function updateSetting<K extends keyof SettingsData>(
        key: K,
        value: SettingsData[K],
    ) {
        setSettings((current) => ({ ...current, [key]: value }));
        setSaved(false);
    }

    function saveSettings(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSavedSettings(settings);
        setSaved(true);

        // Connect this handler to your settings API to persist changes.
        // Apply the theme through your application's theme provider.
    }

    function resetSettings() {
        setSettings(savedSettings);
        setSaved(false);
    }

    function restoreDefaults() {
        setSettings(defaultSettings);
        setTheme("system");
        setSaved(false);
    }

    return (
        <main className="w-full min-w-0 space-y-6 overflow-x-clip p-4 pb-8 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Settings2 className="size-5" />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Settings
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Configure your university system, preferences, and security.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={resetSettings}
                    >
                        <RotateCcw className="size-4" />
                        Discard changes
                    </Button>

                    <Button
                        type="submit"
                        form="settings-form"
                        className="gap-2"
                    >
                        <Save className="size-4" />
                        Save settings
                    </Button>
                </div>
            </div>

            {saved && (
                <div
                    role="status"
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400"
                >
                    <Check className="size-4 shrink-0" />
                    Settings saved in this session. Connect your settings API to persist them.
                </div>
            )}

            {/* Overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center gap-3 p-5">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <GraduationCap className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">Academic year</p>
                            <p className="mt-1 font-semibold">{settings.academicYear}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-3 p-5">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <SunMoon className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">Appearance</p>
                            <p className="mt-1 font-semibold capitalize">{theme} mode</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-3 p-5">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">Security</p>
                            <p className="mt-1 font-semibold">Configuration</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <form id="settings-form" onSubmit={saveSettings}>
                <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.75fr)]">
                    {/* Main settings */}
                    <div className="min-w-0 space-y-6">
                        {/* General */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Globe className="size-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">
                                            General Settings
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Basic information and regional preferences.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="min-w-0 space-y-2 sm:col-span-2">
                                        <Label htmlFor="universityName">
                                            University name
                                        </Label>
                                        <Input
                                            id="universityName"
                                            value={settings.universityName}
                                            onChange={(event) =>
                                                updateSetting("universityName", event.target.value)
                                            }
                                            maxLength={150}
                                            required
                                        />
                                    </div>

                                    <div className="min-w-0 space-y-2 sm:col-span-2">
                                        <Label htmlFor="supportEmail">
                                            Support email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="supportEmail"
                                                type="email"
                                                className="pl-9"
                                                value={settings.supportEmail}
                                                onChange={(event) =>
                                                    updateSetting("supportEmail", event.target.value)
                                                }
                                                maxLength={254}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="timezone">Time zone</Label>
                                        <Select
                                            value={settings.timezone}
                                            onValueChange={(value) => {
                                                if (value) updateSetting("timezone", value);
                                            }}
                                        >
                                            <SelectTrigger id="timezone" className="w-full">
                                                <SelectValue placeholder="Select time zone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Asia/Dhaka">
                                                    Dhaka (UTC+6)
                                                </SelectItem>
                                                <SelectItem value="Asia/Kolkata">
                                                    Kolkata (UTC+5:30)
                                                </SelectItem>
                                                <SelectItem value="Europe/London">
                                                    London
                                                </SelectItem>
                                                <SelectItem value="Europe/Berlin">
                                                    Berlin
                                                </SelectItem>
                                                <SelectItem value="America/New_York">
                                                    New York
                                                </SelectItem>
                                                <SelectItem value="UTC">UTC</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Select
                                            value={settings.language}
                                            onValueChange={(value) => {
                                                if (value) updateSetting("language", value);
                                            }}
                                        >
                                            <SelectTrigger id="language" className="w-full">
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="bn">বাংলা</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <Label htmlFor="dateFormat">Date format</Label>
                                        <Select
                                            value={settings.dateFormat}
                                            onValueChange={(value) => {
                                                if (value) updateSetting("dateFormat", value);
                                            }}
                                        >
                                            <SelectTrigger id="dateFormat" className="w-full">
                                                <SelectValue placeholder="Select date format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DD MMM YYYY">
                                                    29 Oct 2026
                                                </SelectItem>
                                                <SelectItem value="DD/MM/YYYY">
                                                    29/10/2026
                                                </SelectItem>
                                                <SelectItem value="MM/DD/YYYY">
                                                    10/29/2026
                                                </SelectItem>
                                                <SelectItem value="YYYY-MM-DD">
                                                    2026-10-29
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Academic settings */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                        <CalendarDays className="size-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">
                                            Academic Settings
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Configure the current academic period.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="min-w-0 space-y-2">
                                    <Label htmlFor="academicYear">Academic year</Label>
                                    <Select
                                        value={settings.academicYear}
                                        onValueChange={(value) => {
                                            if (value) updateSetting("academicYear", value);
                                        }}
                                    >
                                        <SelectTrigger id="academicYear" className="w-full">
                                            <SelectValue placeholder="Select academic year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2025-2026">2025–2026</SelectItem>
                                            <SelectItem value="2026-2027">2026–2027</SelectItem>
                                            <SelectItem value="2027-2028">2027–2028</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="min-w-0 space-y-2">
                                    <Label htmlFor="semester">Current semester</Label>
                                    <Select
                                        value={settings.semester}
                                        onValueChange={(value) => {
                                            if (value) updateSetting("semester", value);
                                        }}
                                    >
                                        <SelectTrigger id="semester" className="w-full">
                                            <SelectValue placeholder="Select semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Spring">Spring</SelectItem>
                                            <SelectItem value="Summer">Summer</SelectItem>
                                            <SelectItem value="Fall">Fall</SelectItem>
                                            <SelectItem value="Winter">Winter</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">
                                    These values are configuration defaults. Connect them to
                                    your academic calendar and enrollment rules before using
                                    them across the university.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                                        <Bell className="size-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">
                                            Notification Preferences
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Choose which events should trigger notifications.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="divide-y">
                                <PreferenceSwitch
                                    label="Email notifications"
                                    description="Receive general updates and important system announcements."
                                    checked={settings.emailNotifications}
                                    onChange={(value) =>
                                        updateSetting("emailNotifications", value)
                                    }
                                />
                                <PreferenceSwitch
                                    label="Security alerts"
                                    description="Get notified about failed sign-ins and suspicious account activity."
                                    checked={settings.securityAlerts}
                                    onChange={(value) =>
                                        updateSetting("securityAlerts", value)
                                    }
                                />
                                <PreferenceSwitch
                                    label="Academic notifications"
                                    description="Receive updates about enrollment, departments, and academic records."
                                    checked={settings.academicNotifications}
                                    onChange={(value) =>
                                        updateSetting("academicNotifications", value)
                                    }
                                />
                                <PreferenceSwitch
                                    label="Finance notifications"
                                    description="Receive alerts about fee payments and financial workflows."
                                    checked={settings.financeNotifications}
                                    onChange={(value) =>
                                        updateSetting("financeNotifications", value)
                                    }
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Side settings */}
                    <div className="min-w-0 space-y-6">
                        {/* Appearance */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Palette className="size-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">
                                            Appearance
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Choose your preferred interface theme.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {[
                                    {
                                        value: "light" as const,
                                        label: "Light",
                                        description: "Bright interface",
                                        Icon: Sun,
                                    },
                                    {
                                        value: "dark" as const,
                                        label: "Dark",
                                        description: "Low-light interface",
                                        Icon: Moon,
                                    },
                                    {
                                        value: "system" as const,
                                        label: "System",
                                        description: "Follow device settings",
                                        Icon: Monitor,
                                    },
                                ].map(({ value, label, description, Icon }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => {
                                            setTheme(value);
                                            setSaved(false);
                                        }}
                                        aria-pressed={theme === value}
                                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-accent/50 ${theme === value
                                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                            : "border-border"
                                            }`}
                                    >
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                            <Icon className="size-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium">{label}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {description}
                                            </p>
                                        </div>
                                        {theme === value && (
                                            <Check className="size-4 shrink-0 text-primary" />
                                        )}
                                    </button>
                                ))}

                                <p className="text-xs leading-5 text-muted-foreground">
                                    The selection is stored in this page's state. Connect
                                    your theme provider to apply it across the application.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Security */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <LockKeyhole className="size-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">
                                            Security & Sessions
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Configure session-related preferences.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="sessionTimeout">
                                        Session timeout
                                    </Label>
                                    <Select
                                        value={settings.sessionTimeout}
                                        onValueChange={(value) => {
                                            if (value) updateSetting("sessionTimeout", value);
                                        }}
                                    >
                                        <SelectTrigger id="sessionTimeout" className="w-full">
                                            <SelectValue placeholder="Select timeout" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="15">15 minutes</SelectItem>
                                            <SelectItem value="30">30 minutes</SelectItem>
                                            <SelectItem value="60">60 minutes</SelectItem>
                                            <SelectItem value="120">2 hours</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs leading-5 text-muted-foreground">
                                        The backend must enforce this timeout for authenticated
                                        sessions.
                                    </p>
                                </div>

                                <Separator />

                                <PreferenceSwitch
                                    label="Maintenance mode"
                                    description="Restrict normal access while administrators perform maintenance."
                                    checked={settings.maintenanceMode}
                                    onChange={(value) =>
                                        updateSetting("maintenanceMode", value)
                                    }
                                />

                                {settings.maintenanceMode && (
                                    <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-amber-700 dark:text-amber-400">
                                        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                                        Maintenance mode is only selected in this form. It does
                                        not restrict access until implemented on the server.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* System info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Database className="size-5 text-primary" />
                                    System Information
                                </CardTitle>
                                <CardDescription>
                                    CampusFlow configuration overview.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">Platform</span>
                                    <span className="font-medium">CampusFlow UMS</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">Environment</span>
                                    <Badge variant="outline">Application</Badge>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">Language</span>
                                    <span className="flex items-center gap-2 font-medium">
                                        <Languages className="size-4 text-muted-foreground" />
                                        {settings.language === "bn" ? "বাংলা" : "English"}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">Time zone</span>
                                    <span className="flex items-center gap-2 font-medium">
                                        <Clock className="size-4 text-muted-foreground" />
                                        {settings.timezone}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom actions */}
                <div className="sticky bottom-3 z-10 mt-6 flex flex-col gap-3 rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-4">
                    <p className="text-xs leading-5 text-muted-foreground">
                        Review your changes before saving.
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            onClick={restoreDefaults}
                        >
                            <RotateCcw className="size-4" />
                            Restore defaults
                        </Button>
                        <Button type="submit" className="gap-2">
                            <Save className="size-4" />
                            Save settings
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    );
}
