

// "use client";

// import { useGetAllUsers } from "@/hooks/users.hook";

// export default function Users() {
//     const { data, isLoading, isError } = useGetAllUsers({
//         page: 1,
//         limit: 10,
//     });


//     // console.log(data, "users data")
//     if (isLoading) {
//         return <div>Loading users...</div>;
//     }

//     if (isError) {
//         return <div>Failed to load users.</div>;
//     }

//     const users = data?.data.data ?? [];

    
//     console.log(users, "users users")

//     return (
//         <div>
//             <h1>Users</h1>

//             {users.map((user) => (
//                 <div key={user.id}>
//                     <p>{user.name}</p>
//                     <p>{user.email}</p>
//                     <p>{user.role}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }














"use client";

import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    AlertCircle,
    Eye,
    RotateCcw,
    Search,
    Users as UsersIcon,
} from "lucide-react";

import { useGetAllUsers } from "@/hooks/users.hook";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

/*
 * =========================================================
 * TYPES
 * =========================================================
 */

type UserRole =
    | "SUPER_ADMIN"
    | "ADMIN"
    | "DEPARTMENT_HEAD"
    | "INSTRUCTOR"
    | "STUDENT"
    | "ACCOUNTANT";


export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
/*
 * =========================================================
 * CONSTANTS
 * =========================================================
 */

const ROLE_LABELS: Record<UserRole, string> = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    DEPARTMENT_HEAD: "Department Head",
    INSTRUCTOR: "Instructor",
    STUDENT: "Student",
    ACCOUNTANT: "Accountant",
};

const VALID_ROLES = Object.keys(ROLE_LABELS) as UserRole[];

const VALID_SORT_FIELDS = [
    "createdAt",
    "name",
    "email",
    "role",
    "updatedAt",
] as const;

const PAGE_SIZES = [10, 20, 50, 100] as const;

/*
 * =========================================================
 * HELPERS
 * =========================================================
 */

function getPositiveNumber(
    value: string | null,
    fallback: number,
): number {
    const parsed = Number(value);

    return Number.isInteger(parsed) && parsed > 0
        ? parsed
        : fallback;
}

function getValidRole(
    value: string | null,
): UserRole | undefined {
    if (!value) return undefined;

    return VALID_ROLES.includes(value as UserRole)
        ? (value as UserRole)
        : undefined;
}

function getValidSortField(
    value: string | null,
): (typeof VALID_SORT_FIELDS)[number] {
    return VALID_SORT_FIELDS.includes(
        value as (typeof VALID_SORT_FIELDS)[number],
    )
        ? (value as (typeof VALID_SORT_FIELDS)[number])
        : "createdAt";
}

function getValidSortOrder(
    value: string | null,
): "asc" | "desc" {
    return value === "asc" ? "asc" : "desc";
}

function formatDate(date: string | Date) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "N/A";
    }

    return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function getRoleLabel(role: string) {
    return (
        ROLE_LABELS[role as UserRole] ??
        role.replaceAll("_", " ")
    );
}

/*
 * =========================================================
 * BADGES
 * =========================================================
 */

function RoleBadge({ role }: { role: string }) {
    return (
        <Badge
            variant="outline"
            className="whitespace-nowrap font-medium"
        >
            {getRoleLabel(role)}
        </Badge>
    );
}

function StatusBadge({
    isActive,
}: {
    isActive: boolean;
}) {
    return (
        <Badge
            variant={isActive ? "default" : "secondary"}
            className="whitespace-nowrap font-medium"
        >
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}

/*
 * =========================================================
 * TABLE SKELETON
 * =========================================================
 */

function UsersTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border bg-card ">
            <div className="overflow-x-auto">
                <Table className="min-w-[900px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-48">
                                Name
                            </TableHead>

                            <TableHead className="min-w-64">
                                Email
                            </TableHead>

                            <TableHead>
                                Role
                            </TableHead>

                            <TableHead>
                                Status
                            </TableHead>

                            <TableHead>
                                Created
                            </TableHead>

                            <TableHead className="w-28 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Array.from({ length: 6 }).map(
                            (_, index) => (
                                <TableRow key={index}>
                                    {/* NAME */}
                                    <TableCell>
                                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                                    </TableCell>

                                    {/* EMAIL */}
                                    <TableCell>
                                        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                                    </TableCell>

                                    {/* ROLE */}
                                    <TableCell>
                                        <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                                    </TableCell>

                                    {/* STATUS */}
                                    <TableCell>
                                        <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
                                    </TableCell>

                                    {/* CREATED */}
                                    <TableCell>
                                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                    </TableCell>

                                    {/* ACTION */}
                                    <TableCell>
                                        <div className="ml-auto h-8 w-20 animate-pulse rounded-md bg-muted" />
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

/*
 * =========================================================
 * MAIN USERS PAGE
 * =========================================================
 */

export default function Users() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] =
        useTransition();

    /*
     * =====================================================
     * URL PARAMETERS
     * =====================================================
     */

    const page = getPositiveNumber(
        searchParams.get("page"),
        1,
    );

    const rawLimit = getPositiveNumber(
        searchParams.get("limit"),
        10,
    );

    const limit = PAGE_SIZES.includes(
        rawLimit as (typeof PAGE_SIZES)[number],
    )
        ? rawLimit
        : 10;

    const searchTerm =
        searchParams.get("searchTerm") || undefined;

    const role = getValidRole(
        searchParams.get("role"),
    );

    const isActiveParam =
        searchParams.get("isActive");

    const isActive =
        isActiveParam === null
            ? undefined
            : isActiveParam === "true"
                ? true
                : isActiveParam === "false"
                    ? false
                    : undefined;

    const sortBy = getValidSortField(
        searchParams.get("sortBy"),
    );

    const sortOrder = getValidSortOrder(
        searchParams.get("sortOrder"),
    );

    /*
     * =====================================================
     * API
     * =====================================================
     */

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetAllUsers({
        page,
        limit,
        searchTerm,
        role,
        isActive,
        sortBy,
        sortOrder,
    });


    

    console.log(data, "usrs data")
    /*
     * =====================================================
     * URL UPDATE
     * =====================================================
     */

    const updateQuery = useCallback(
        (
            key: string,
            value?: string | null,
        ) => {
            const params = new URLSearchParams(
                searchParams.toString(),
            );

            /*
             * Remove empty values
             */
            if (
                value === undefined ||
                value === null ||
                value === "" ||
                value === "all"
            ) {
                params.delete(key);
            } else {
                params.set(key, value);
            }

            /*
             * Any filter change returns
             * the user to page 1.
             */
            if (key !== "page") {
                params.set("page", "1");
            }

            startTransition(() => {
                router.replace(
                    `${pathname}?${params.toString()}`,
                );
            });
        },
        [
            pathname,
            router,
            searchParams,
        ],
    );

    /*
     * =====================================================
     * RESET FILTERS
     * =====================================================
     */

    const resetFilters = useCallback(() => {
        startTransition(() => {
            router.replace(
                `${pathname}?page=1&limit=10`,
            );
        });
    }, [pathname, router]);

    /*
     * =====================================================
     * PAGINATION
     * =====================================================
     */

    const meta = data?.data.meta;

    const goToPage = useCallback(
        (newPage: number) => {
            if (newPage < 1) return;

            if (
                meta &&
                newPage > meta.totalPages
            ) {
                return;
            }

            updateQuery(
                "page",
                String(newPage),
            );
        },
        [meta, updateQuery],
    );

    /*
     * =====================================================
     * LOADING STATE
     * =====================================================
     */

    if (isLoading) {
        return (
            <div className="space-y-6">
                <PageHeader
                    onReset={resetFilters}
                    isPending={isPending}
                />

                <Filters
                    searchTerm={searchTerm}
                    role={role}
                    isActiveParam={isActiveParam}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    limit={limit}
                    updateQuery={updateQuery}
                    isPending={isPending}
                />

                <UsersTableSkeleton />
            </div>
        );
    }

    /*
     * =====================================================
     * ERROR STATE
     * =====================================================
     */

    if (isError) {
        return (
            <div className="space-y-6">
                <PageHeader
                    onReset={resetFilters}
                    isPending={isPending}
                />

                <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-card p-8 text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                        <AlertCircle className="size-6 text-destructive" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        Unable to load users
                    </h2>

                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                        Something went wrong while loading
                        the users. Please try again.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-5"
                        onClick={() => refetch()}
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    /*
     * =====================================================
     * DATA
     * =====================================================
     */

    const users = data?.data.data ?? [];

    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <div
            className={`space-y-6 transition-opacity p-3 ${
                isFetching
                    ? "opacity-70"
                    : "opacity-100"
            }`}
        >
            {/* ================= HEADER ================= */}

            <PageHeader
                onReset={resetFilters}
                isPending={isPending}
            />

            {/* ================= FILTERS ================= */}

            <Filters
                searchTerm={searchTerm}
                role={role}
                isActiveParam={isActiveParam}
                sortBy={sortBy}
                sortOrder={sortOrder}
                limit={limit}
                updateQuery={updateQuery}
                isPending={isPending}
            />

            {/* ================= TABLE ================= */}

            <div className="overflow-hidden rounded-xl border bg-card ">
                <div className="overflow-x-auto ">
                    <Table className="min-w-[900px] p-3">
                        <TableHeader>
                            <TableRow className="bg-muted/40">
                                <TableHead className="min-w-48">
                                    Name
                                </TableHead>

                                <TableHead className="min-w-64">
                                    Email
                                </TableHead>

                                <TableHead>
                                    Role
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                                <TableHead>
                                    Created
                                </TableHead>

                                <TableHead className="w-28 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-64"
                                    >
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                                                <UsersIcon className="size-6 text-muted-foreground" />
                                            </div>

                                            <h3 className="font-semibold">
                                                No users found
                                            </h3>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your
                                                search or filters.
                                            </p>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-3"
                                                onClick={
                                                    resetFilters
                                                }
                                            >
                                                Clear filters
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user : User) => (
                                    <TableRow
                                        key={user.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        {/* NAME */}
                                        <TableCell>
                                            <div className="max-w-48 truncate font-medium">
                                                {user.name ??
                                                    "N/A"}
                                            </div>
                                        </TableCell>

                                        {/* EMAIL */}
                                        <TableCell className="text-muted-foreground">
                                            <div className="max-w-64 truncate">
                                                {user.email}
                                            </div>
                                        </TableCell>

                                        {/* ROLE */}
                                        <TableCell>
                                            <RoleBadge
                                                role={
                                                    user.role
                                                }
                                            />
                                        </TableCell>

                                        {/* STATUS */}
                                        <TableCell>
                                            <StatusBadge
                                                isActive={
                                                    user.isActive
                                                }
                                            />
                                        </TableCell>

                                        {/* CREATED */}
                                        <TableCell className="whitespace-nowrap text-muted-foreground">
                                            {formatDate(
                                                user.createdAt,
                                            )}
                                        </TableCell>

                                        {/* ACTIONS */}
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2"
                                                onClick={() =>
                                                    router.push(
                                                        `${pathname}/${user.id}`,
                                                    )
                                                }
                                            >
                                                <Eye className="size-4" />

                                                <span className="hidden sm:inline">
                                                    View
                                                </span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* ================= PAGINATION ================= */}

            {meta && meta.total > 0 && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-center text-sm text-muted-foreground sm:text-left">
                        Showing{" "}
                        <span className="font-medium text-foreground">
                            {users.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-foreground">
                            {meta.total}
                        </span>{" "}
                        users
                    </p>

                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={
                                page <= 1 ||
                                isPending
                            }
                            onClick={() =>
                                goToPage(page - 1)
                            }
                        >
                            Previous
                        </Button>

                        <div className="min-w-20 text-center text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                                {meta.page}
                            </span>{" "}
                            / {meta.totalPages}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={
                                page >=
                                    meta.totalPages ||
                                isPending
                            }
                            onClick={() =>
                                goToPage(page + 1)
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

/*
 * =========================================================
 * PAGE HEADER
 * =========================================================
 */

function PageHeader({
    onReset,
    isPending,
}: {
    onReset: () => void;
    isPending: boolean;
}) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Users
                    </h1>

                    {isPending && (
                        <span className="text-xs text-muted-foreground">
                            Updating...
                        </span>
                    )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage and monitor users across the
                    university system.
                </p>
            </div>

            <Button
                variant="outline"
                onClick={onReset}
                disabled={isPending}
                className="w-full sm:w-auto"
            >
                <RotateCcw className="mr-2 size-4" />
                Reset Filters
            </Button>
        </div>
    );
}

/*
 * =========================================================
 * FILTERS
 * =========================================================
 */

function Filters({
    searchTerm,
    role,
    isActiveParam,
    sortBy,
    sortOrder,
    limit,
    updateQuery,
    isPending,
}: {
    searchTerm?: string;
    role?: UserRole;
    isActiveParam: string | null;
    sortBy: string;
    sortOrder: "asc" | "desc";
    limit: number;
    updateQuery: (
        key: string,
        value?: string | null,
    ) => void;
    isPending: boolean;
}) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-col gap-4">
                {/* =========================================
                    SEARCH + FILTERS
                ========================================== */}

                <div className="flex flex-col gap-3 lg:flex-row">
                    {/* SEARCH */}

                    <div className="relative w-full lg:max-w-sm">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            aria-label="Search users"
                            className="h-10 pl-9"
                            placeholder="Search by name or email..."
                            value={searchTerm ?? ""}
                            disabled={isPending}
                            onChange={(event) =>
                                updateQuery(
                                    "searchTerm",
                                    event.target.value,
                                )
                            }
                        />
                    </div>

                    {/* FILTERS */}

                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {/* ROLE */}

                        <Select
                            value={role ?? "all"}
                            disabled={isPending}
                            onValueChange={(value) =>
                                updateQuery(
                                    "role",
                                    value,
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    All Roles
                                </SelectItem>

                                {VALID_ROLES.map(
                                    (userRole) => (
                                        <SelectItem
                                            key={userRole}
                                            value={
                                                userRole
                                            }
                                        >
                                            {
                                                ROLE_LABELS[
                                                    userRole
                                                ]
                                            }
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>

                        {/* STATUS */}

                        <Select
                            value={
                                isActiveParam ??
                                "all"
                            }
                            disabled={isPending}
                            onValueChange={(value) =>
                                updateQuery(
                                    "isActive",
                                    value,
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    All Status
                                </SelectItem>

                                <SelectItem value="true">
                                    Active
                                </SelectItem>

                                <SelectItem value="false">
                                    Inactive
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* SORT FIELD */}

                        <Select
                            value={sortBy}
                            disabled={isPending}
                            onValueChange={(value) =>
                                updateQuery(
                                    "sortBy",
                                    value,
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="createdAt">
                                    Created Date
                                </SelectItem>

                                <SelectItem value="name">
                                    Name
                                </SelectItem>

                                <SelectItem value="email">
                                    Email
                                </SelectItem>

                                <SelectItem value="role">
                                    Role
                                </SelectItem>

                                <SelectItem value="updatedAt">
                                    Updated Date
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* SORT ORDER */}

                        <Select
                            value={sortOrder}
                            disabled={isPending}
                            onValueChange={(value) =>
                                updateQuery(
                                    "sortOrder",
                                    value,
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort order" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="desc">
                                    Descending
                                </SelectItem>

                                <SelectItem value="asc">
                                    Ascending
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* =========================================
                    PAGE SIZE
                ========================================== */}

                <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        Users per page
                    </p>

                    <Select
                        value={String(limit)}
                        disabled={isPending}
                        onValueChange={(value) =>
                            updateQuery(
                                "limit",
                                value,
                            )
                        }
                    >
                        <SelectTrigger className="w-full sm:w-32">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {PAGE_SIZES.map((size) => (
                                <SelectItem
                                    key={size}
                                    value={String(size)}
                                >
                                    {size} / page
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}