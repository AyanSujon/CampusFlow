// import React from 'react'

// export default function rolesPermissions() {
//   return (
//     <div>roles-permissions</div>
//   )
// }













"use client";

import { useMemo, useState } from "react";
import {
    ShieldCheck,
    Shield,
    Users,
    GraduationCap,
    BookOpen,
    Wallet,
    Building2,
    Search,
    Check,
    X,
    RotateCcw,
    LockKeyhole,
    Settings2,
    ChevronRight,
    Info,
    KeyRound,
    UserCog,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type RoleKey =
    | "SUPER_ADMIN"
    | "ADMIN"
    | "DEPARTMENT_HEAD"
    | "INSTRUCTOR"
    | "STUDENT"
    | "ACCOUNTANT";

type PermissionKey =
    | "dashboard.view"
    | "users.view"
    | "users.create"
    | "users.edit"
    | "users.delete"
    | "courses.view"
    | "courses.create"
    | "courses.edit"
    | "courses.delete"
    | "departments.manage"
    | "enrollments.manage"
    | "finance.view"
    | "finance.manage"
    | "announcements.manage"
    | "notifications.view"
    | "roles.manage"
    | "settings.manage";

type PermissionDefinition = {
    key: PermissionKey;
    label: string;
    description: string;
};

type PermissionGroup = {
    label: string;
    icon: typeof Shield;
    permissions: PermissionDefinition[];
};

type RoleDefinition = {
    key: RoleKey;
    name: string;
    description: string;
    icon: typeof Shield;
    color: string;
    badge: string;
};

const roles: RoleDefinition[] = [
    {
        key: "SUPER_ADMIN",
        name: "Super Admin",
        description: "Full system administration and access control.",
        icon: ShieldCheck,
        color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
        badge: "System",
    },
    {
        key: "ADMIN",
        name: "Admin",
        description: "Manage university operations and academic resources.",
        icon: Shield,
        color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        badge: "Administration",
    },
    {
        key: "DEPARTMENT_HEAD",
        name: "Department Head",
        description: "Oversee department activities, courses, and instructors.",
        icon: Building2,
        color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        badge: "Academic",
    },
    {
        key: "INSTRUCTOR",
        name: "Instructor",
        description: "Access teaching resources and assigned course information.",
        icon: GraduationCap,
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        badge: "Academic",
    },
    {
        key: "STUDENT",
        name: "Student",
        description: "Access personal academic records and course information.",
        icon: Users,
        color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
        badge: "Academic",
    },
    {
        key: "ACCOUNTANT",
        name: "Accountant",
        description: "Manage financial records and review payment information.",
        icon: Wallet,
        color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
        badge: "Finance",
    },
];

const permissionGroups: PermissionGroup[] = [
    {
        label: "Dashboard",
        icon: Shield,
        permissions: [
            {
                key: "dashboard.view",
                label: "View dashboard",
                description: "Access dashboard summaries and activity information.",
            },
        ],
    },
    {
        label: "User Management",
        icon: Users,
        permissions: [
            {
                key: "users.view",
                label: "View users",
                description: "View student, instructor, and staff records.",
            },
            {
                key: "users.create",
                label: "Create users",
                description: "Create user accounts and profiles.",
            },
            {
                key: "users.edit",
                label: "Edit users",
                description: "Update user information and account details.",
            },
            {
                key: "users.delete",
                label: "Delete users",
                description: "Remove user accounts from the system.",
            },
        ],
    },
    {
        label: "Academic Management",
        icon: BookOpen,
        permissions: [
            {
                key: "courses.view",
                label: "View courses",
                description: "View courses and their academic information.",
            },
            {
                key: "courses.create",
                label: "Create courses",
                description: "Add new courses to the university catalog.",
            },
            {
                key: "courses.edit",
                label: "Edit courses",
                description: "Update course details and academic settings.",
            },
            {
                key: "courses.delete",
                label: "Delete courses",
                description: "Remove courses from the catalog.",
            },
            {
                key: "departments.manage",
                label: "Manage departments",
                description: "Create and update department information.",
            },
            {
                key: "enrollments.manage",
                label: "Manage enrollments",
                description: "Manage student course enrollment records.",
            },
        ],
    },
    {
        label: "Finance",
        icon: Wallet,
        permissions: [
            {
                key: "finance.view",
                label: "View financial records",
                description: "View tuition, payment, and finance information.",
            },
            {
                key: "finance.manage",
                label: "Manage finances",
                description: "Update payment records and finance workflows.",
            },
        ],
    },
    {
        label: "Communication",
        icon: Users,
        permissions: [
            {
                key: "announcements.manage",
                label: "Manage announcements",
                description: "Create, edit, publish, and archive announcements.",
            },
            {
                key: "notifications.view",
                label: "View notifications",
                description: "Access system and administrative notifications.",
            },
        ],
    },
    {
        label: "System Administration",
        icon: LockKeyhole,
        permissions: [
            {
                key: "roles.manage",
                label: "Manage roles and permissions",
                description: "Configure role access and permission assignments.",
            },
            {
                key: "settings.manage",
                label: "Manage system settings",
                description: "Access and update system-wide configuration.",
            },
        ],
    },
];

const allPermissionKeys = permissionGroups.flatMap((group) =>
    group.permissions.map((permission) => permission.key),
);

const defaultPermissions: Record<RoleKey, PermissionKey[]> = {
    SUPER_ADMIN: [...allPermissionKeys],
    ADMIN: [
        "dashboard.view",
        "users.view",
        "users.create",
        "users.edit",
        "users.delete",
        "courses.view",
        "courses.create",
        "courses.edit",
        "courses.delete",
        "departments.manage",
        "enrollments.manage",
        "finance.view",
        "finance.manage",
        "announcements.manage",
        "notifications.view",
    ],
    DEPARTMENT_HEAD: [
        "dashboard.view",
        "users.view",
        "users.edit",
        "courses.view",
        "courses.create",
        "courses.edit",
        "enrollments.manage",
        "announcements.manage",
        "notifications.view",
    ],
    INSTRUCTOR: [
        "dashboard.view",
        "courses.view",
        "enrollments.manage",
        "announcements.manage",
        "notifications.view",
    ],
    STUDENT: [
        "dashboard.view",
        "courses.view",
        "notifications.view",
    ],
    ACCOUNTANT: [
        "dashboard.view",
        "users.view",
        "finance.view",
        "finance.manage",
        "notifications.view",
    ],
};

export default function RolesPermissionsPage() {
    const [selectedRole, setSelectedRole] =
        useState<RoleKey>("ADMIN");

    const [permissions, setPermissions] =
        useState<Record<RoleKey, PermissionKey[]>>(() =>
            Object.fromEntries(
                roles.map((role) => [
                    role.key,
                    [...defaultPermissions[role.key]],
                ]),
            ) as Record<RoleKey, PermissionKey[]>,
        );

    const [search, setSearch] = useState("");
    const [permissionSearch, setPermissionSearch] = useState("");
    const [showOnlyEnabled, setShowOnlyEnabled] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const filteredRoles = useMemo(() => {
        const query = search.trim().toLowerCase();

        return roles.filter(
            (role) =>
                role.name.toLowerCase().includes(query) ||
                role.key.toLowerCase().includes(query) ||
                role.description.toLowerCase().includes(query),
        );
    }, [search]);

    const activeRole = roles.find((role) => role.key === selectedRole)!;
    const activePermissions = permissions[selectedRole];

    const visibleGroups = useMemo(() => {
        const query = permissionSearch.trim().toLowerCase();

        return permissionGroups
            .map((group) => ({
                ...group,
                permissions: group.permissions.filter((permission) => {
                    const matchesSearch =
                        !query ||
                        permission.label.toLowerCase().includes(query) ||
                        permission.description.toLowerCase().includes(query) ||
                        group.label.toLowerCase().includes(query);

                    const matchesEnabled =
                        !showOnlyEnabled ||
                        activePermissions.includes(permission.key);

                    return matchesSearch && matchesEnabled;
                }),
            }))
            .filter((group) => group.permissions.length > 0);
    }, [
        permissionSearch,
        showOnlyEnabled,
        activePermissions,
    ]);

    const enabledCount = activePermissions.length;
    const totalCount = allPermissionKeys.length;

    function togglePermission(key: PermissionKey) {
        if (selectedRole === "SUPER_ADMIN") return;

        setPermissions((current) => {
            const currentPermissions = current[selectedRole];
            const isEnabled = currentPermissions.includes(key);

            return {
                ...current,
                [selectedRole]: isEnabled
                    ? currentPermissions.filter((permission) => permission !== key)
                    : [...currentPermissions, key],
            };
        });

        setHasChanges(true);
    }

    function toggleGroup(group: PermissionGroup) {
        if (selectedRole === "SUPER_ADMIN") return;

        const keys = group.permissions.map((permission) => permission.key);
        const allEnabled = keys.every((key) =>
            activePermissions.includes(key),
        );

        setPermissions((current) => {
            const existing = current[selectedRole];

            return {
                ...current,
                [selectedRole]: allEnabled
                    ? existing.filter((key) => !keys.includes(key))
                    : [...new Set([...existing, ...keys])],
            };
        });

        setHasChanges(true);
    }

    function resetSelectedRole() {
        if (selectedRole === "SUPER_ADMIN") return;

        setPermissions((current) => ({
            ...current,
            [selectedRole]: [...defaultPermissions[selectedRole]],
        }));

        setHasChanges(true);
    }

    function resetAllPermissions() {
        setPermissions(
            Object.fromEntries(
                roles.map((role) => [
                    role.key,
                    [...defaultPermissions[role.key]],
                ]),
            ) as Record<RoleKey, PermissionKey[]>,
        );

        setHasChanges(false);
    }

    function savePermissions() {
        // Connect this handler to your backend permission API.
        setHasChanges(false);
        window.alert(
            "Demo only: connect this action to your backend API to persist permissions.",
        );
    }

    return (
        <div className="w-full min-w-0 space-y-6 overflow-x-clip pb-8 p-4">
            {/* Header */}
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Roles & Permissions
                        </h1>
                        <Badge variant="secondary">{roles.length} roles</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground sm:text-base">
                        Control access to CampusFlow UMS features and resources.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={resetAllPermissions}
                    >
                        <RotateCcw className="mr-2 size-4" />
                        Reset defaults
                    </Button>

                    <Button
                        type="button"
                        className="flex-1 sm:flex-none"
                        onClick={savePermissions}
                        disabled={!hasChanges}
                    >
                        <Check className="mr-2 size-4" />
                        Save changes
                    </Button>
                </div>
            </div>

            {/* Summary */}
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">System Roles</p>
                            <p className="text-2xl font-bold tabular-nums">
                                {roles.length}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Defined access levels
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <UserCog className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Available Permissions
                            </p>
                            <p className="text-2xl font-bold tabular-nums">
                                {totalCount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Across all modules
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <KeyRound className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Selected Role Access
                            </p>
                            <p className="text-2xl font-bold tabular-nums">
                                {enabledCount}
                                <span className="text-sm font-normal text-muted-foreground">
                                    {" "}
                                    / {totalCount}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Enabled permissions
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            <ShieldCheck className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Restricted Access</p>
                            <p className="text-2xl font-bold tabular-nums">
                                {totalCount - enabledCount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Disabled for selected role
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                            <LockKeyhole className="size-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Info banner */}
            <div className="flex min-w-0 items-start gap-3 rounded-xl border bg-muted/30 p-4">
                <Info className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                    <p className="text-sm font-medium">Manage access carefully</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Select a role to review its permissions. The Super Admin role has
                        full access in this demo and cannot be modified here. Permission
                        changes remain local until you connect the save action to your
                        backend.
                    </p>
                </div>
            </div>

            {/* Main layout */}
            <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
                {/* Role list */}
                <Card className="min-w-0 overflow-hidden">
                    <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <CardTitle className="text-base">System Roles</CardTitle>
                            <Badge variant="outline">{filteredRoles.length}</Badge>
                        </div>

                        <div className="relative min-w-0">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search roles..."
                                aria-label="Search roles"
                                className="w-full min-w-0 pl-9"
                            />
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        {filteredRoles.map((role) => {
                            const Icon = role.icon;
                            const isSelected = selectedRole === role.key;
                            const count = permissions[role.key].length;

                            return (
                                <button
                                    key={role.key}
                                    type="button"
                                    onClick={() => setSelectedRole(role.key)}
                                    className={`flex w-full min-w-0 items-start gap-3 rounded-xl border p-3 text-left transition-colors ${isSelected
                                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                        : "border-transparent hover:border-border hover:bg-muted/50"
                                        }`}
                                >
                                    <div
                                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${role.color}`}
                                    >
                                        <Icon className="size-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                                            <span className="break-words text-sm font-semibold">
                                                {role.name}
                                            </span>
                                            {role.key === "SUPER_ADMIN" && (
                                                <LockKeyhole className="size-3.5 shrink-0 text-muted-foreground" />
                                            )}
                                        </div>

                                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                            {role.description}
                                        </p>

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <Badge variant="secondary" className="text-[10px]">
                                                {role.badge}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {count}/{totalCount} permissions
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        className={`mt-1 size-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"
                                            }`}
                                    />
                                </button>
                            );
                        })}

                        {filteredRoles.length === 0 && (
                            <div className="py-8 text-center">
                                <p className="text-sm font-medium">No roles found</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Try a different search.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Permissions panel */}
                <div className="min-w-0 space-y-5">
                    <Card className="min-w-0 overflow-hidden">
                        <CardContent className="p-4 sm:p-5">
                            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex min-w-0 items-start gap-3">
                                    <div
                                        className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${activeRole.color}`}
                                    >
                                        <activeRole.icon className="size-6" />
                                    </div>

                                    <div className="min-w-0 space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="break-words text-lg font-semibold">
                                                {activeRole.name}
                                            </h2>
                                            {selectedRole === "SUPER_ADMIN" && (
                                                <Badge variant="outline" className="gap-1">
                                                    <LockKeyhole className="size-3" />
                                                    Protected
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {activeRole.description}
                                        </p>
                                        <p className="break-all font-mono text-xs text-muted-foreground">
                                            {activeRole.key}
                                        </p>
                                    </div>
                                </div>

                                {selectedRole !== "SUPER_ADMIN" && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="shrink-0"
                                        onClick={resetSelectedRole}
                                    >
                                        <RotateCcw className="mr-2 size-4" />
                                        Reset role
                                    </Button>
                                )}
                            </div>

                            <Separator className="my-5" />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">
                                        Permission coverage
                                    </span>
                                    <span className="font-semibold tabular-nums">
                                        {Math.round((enabledCount / totalCount) * 100)}%
                                    </span>
                                </div>

                                <div
                                    className="h-2 w-full overflow-hidden rounded-full bg-muted"
                                    role="progressbar"
                                    aria-label="Permission coverage"
                                    aria-valuemin={0}
                                    aria-valuemax={totalCount}
                                    aria-valuenow={enabledCount}
                                >
                                    <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{
                                            width: `${(enabledCount / totalCount) * 100}%`,
                                        }}
                                    />
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    {enabledCount} of {totalCount} permissions enabled for this
                                    role.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Permission controls */}
                    <Card className="min-w-0 overflow-hidden">
                        <CardHeader className="space-y-4">
                            <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                    <CardTitle className="text-base">
                                        Permission Settings
                                    </CardTitle>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Configure access by module and action.
                                    </p>
                                </div>

                                {selectedRole === "SUPER_ADMIN" ? (
                                    <Badge variant="secondary" className="w-fit">
                                        Read only
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="w-fit">
                                        Editable
                                    </Badge>
                                )}
                            </div>

                            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                                <div className="relative min-w-0">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={permissionSearch}
                                        onChange={(event) =>
                                            setPermissionSearch(event.target.value)
                                        }
                                        placeholder="Search permissions..."
                                        aria-label="Search permissions"
                                        className="w-full min-w-0 pl-9"
                                    />
                                </div>

                                <Button
                                    type="button"
                                    variant={showOnlyEnabled ? "secondary" : "outline"}
                                    onClick={() => setShowOnlyEnabled((current) => !current)}
                                    className="w-full sm:w-auto"
                                >
                                    <Settings2 className="mr-2 size-4" />
                                    {showOnlyEnabled ? "Show all" : "Enabled only"}
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="min-w-0 space-y-5">
                            {visibleGroups.map((group) => {
                                const Icon = group.icon;
                                const keys = group.permissions.map(
                                    (permission) => permission.key,
                                );
                                const enabledInGroup = keys.filter((key) =>
                                    activePermissions.includes(key),
                                ).length;
                                const allEnabled = keys.every((key) =>
                                    activePermissions.includes(key),
                                );

                                return (
                                    <section
                                        key={group.label}
                                        className="min-w-0 overflow-hidden rounded-xl border"
                                    >
                                        <div className="flex min-w-0 flex-col gap-3 border-b bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background">
                                                    <Icon className="size-4 text-muted-foreground" />
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="break-words text-sm font-semibold">
                                                        {group.label}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        {enabledInGroup} of {keys.length} enabled
                                                    </p>
                                                </div>
                                            </div>

                                            {selectedRole !== "SUPER_ADMIN" && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-fit"
                                                    onClick={() => toggleGroup(group)}
                                                >
                                                    {allEnabled ? "Disable all" : "Enable all"}
                                                </Button>
                                            )}
                                        </div>

                                        <div className="divide-y">
                                            {group.permissions.map((permission) => {
                                                const enabled = activePermissions.includes(
                                                    permission.key,
                                                );

                                                return (
                                                    <label
                                                        key={permission.key}
                                                        className={`flex min-w-0 items-start gap-3 p-4 transition-colors ${selectedRole !== "SUPER_ADMIN"
                                                            ? "cursor-pointer hover:bg-muted/30"
                                                            : "cursor-default"
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={enabled}
                                                            disabled={selectedRole === "SUPER_ADMIN"}
                                                            onChange={() =>
                                                                togglePermission(permission.key)
                                                            }
                                                            className="mt-1 size-4 shrink-0 accent-primary disabled:cursor-not-allowed"
                                                            aria-label={permission.label}
                                                        />

                                                        <div className="min-w-0 flex-1">
                                                            <p className="break-words text-sm font-medium">
                                                                {permission.label}
                                                            </p>
                                                            <p className="mt-1 break-words text-xs leading-relaxed text-muted-foreground">
                                                                {permission.description}
                                                            </p>
                                                            <p className="mt-1.5 break-all font-mono text-[10px] text-muted-foreground">
                                                                {permission.key}
                                                            </p>
                                                        </div>

                                                        <span className="shrink-0 pt-0.5">
                                                            {enabled ? (
                                                                <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                                                            ) : (
                                                                <X className="size-4 text-muted-foreground/50" />
                                                            )}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </section>
                                );
                            })}

                            {visibleGroups.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Search className="mb-3 size-8 text-muted-foreground" />
                                    <p className="font-medium">No permissions found</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Try another search or show all permissions.
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-4"
                                        onClick={() => {
                                            setPermissionSearch("");
                                            setShowOnlyEnabled(false);
                                        }}
                                    >
                                        Clear filters
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Save footer */}
                    <div className="flex min-w-0 flex-col gap-3 rounded-xl border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-start gap-2">
                            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Changes are local to this page until saved through your
                                backend. Review access carefully before applying permissions
                                to real users.
                            </p>
                        </div>

                        <Button
                            type="button"
                            onClick={savePermissions}
                            disabled={!hasChanges}
                            className="w-full shrink-0 sm:w-auto"
                        >
                            <Check className="mr-2 size-4" />
                            Save changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
