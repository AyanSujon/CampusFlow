// import React from 'react'

// export default function financial() {
//     return (
//         <div>financial </div>
//     )
// }















"use client";

import { useMemo, useState } from "react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    Banknote,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Ellipsis,
    Eye,
    FileText,
    GraduationCap,
    Plus,
    Receipt,
    Search,
    Wallet,
    XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type PaymentStatus = "PAID" | "PENDING" | "OVERDUE" | "REFUNDED";
type PaymentMethod = "Bank Transfer" | "Card" | "Cash" | "Mobile Banking";

type Transaction = {
    id: string;
    studentId: string;
    studentName: string;
    description: string;
    category: string;
    amount: number;
    method: PaymentMethod;
    date: string;
    status: PaymentStatus;
};

type StatusFilter = "ALL" | PaymentStatus;
type MethodFilter = "ALL" | PaymentMethod;

const initialTransactions: Transaction[] = [
    {
        id: "TXN-2026-001",
        studentId: "STU-2026-CSE-0001",
        studentName: "Nusrat Jahan",
        description: "Fall Semester Tuition",
        category: "Tuition Fee",
        amount: 45000,
        method: "Bank Transfer",
        date: "2026-10-28",
        status: "PAID",
    },
    {
        id: "TXN-2026-002",
        studentId: "STU-2026-BBA-0008",
        studentName: "Rahim Ahmed",
        description: "Semester Registration",
        category: "Registration",
        amount: 8500,
        method: "Mobile Banking",
        date: "2026-10-28",
        status: "PENDING",
    },
    {
        id: "TXN-2026-003",
        studentId: "STU-2025-CSE-0015",
        studentName: "Sadia Islam",
        description: "Laboratory Fee",
        category: "Lab Fee",
        amount: 6000,
        method: "Card",
        date: "2026-10-27",
        status: "PAID",
    },
    {
        id: "TXN-2026-004",
        studentId: "STU-2025-EEE-0012",
        studentName: "Tanvir Hasan",
        description: "Fall Semester Tuition",
        category: "Tuition Fee",
        amount: 38000,
        method: "Bank Transfer",
        date: "2026-10-20",
        status: "OVERDUE",
    },
    {
        id: "TXN-2026-005",
        studentId: "STU-2026-ENG-0021",
        studentName: "Mim Akter",
        description: "Library Fee",
        category: "Library Fee",
        amount: 1500,
        method: "Cash",
        date: "2026-10-25",
        status: "PAID",
    },
    {
        id: "TXN-2026-006",
        studentId: "STU-2025-CSE-0028",
        studentName: "Fahim Chowdhury",
        description: "Examination Fee",
        category: "Exam Fee",
        amount: 4000,
        method: "Mobile Banking",
        date: "2026-10-18",
        status: "REFUNDED",
    },
    {
        id: "TXN-2026-007",
        studentId: "STU-2026-BBA-0019",
        studentName: "Ayesha Rahman",
        description: "Fall Semester Tuition",
        category: "Tuition Fee",
        amount: 42000,
        method: "Card",
        date: "2026-10-26",
        status: "PAID",
    },
    {
        id: "TXN-2026-008",
        studentId: "STU-2025-EEE-0024",
        studentName: "Sabbir Hossain",
        description: "Semester Registration",
        category: "Registration",
        amount: 8500,
        method: "Bank Transfer",
        date: "2026-10-15",
        status: "OVERDUE",
    },
];

const statusStyles: Record<PaymentStatus, string> = {
    PAID: "border-emerald-200 bg-emerald-50 text-emerald-700",
    PENDING: "border-amber-200 bg-amber-50 text-amber-700",
    OVERDUE: "border-rose-200 bg-rose-50 text-rose-700",
    REFUNDED: "border-slate-200 bg-slate-100 text-slate-600",
};

const statusOptions: { label: string; value: StatusFilter }[] = [
    { label: "All statuses", value: "ALL" },
    { label: "Paid", value: "PAID" },
    { label: "Pending", value: "PENDING" },
    { label: "Overdue", value: "OVERDUE" },
    { label: "Refunded", value: "REFUNDED" },
];

const methodOptions: { label: string; value: MethodFilter }[] = [
    { label: "All methods", value: "ALL" },
    { label: "Bank Transfer", value: "Bank Transfer" },
    { label: "Card", value: "Card" },
    { label: "Cash", value: "Cash" },
    { label: "Mobile Banking", value: "Mobile Banking" },
];

function formatBDT(amount: number) {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
}

function SummaryCard({
    title,
    amount,
    description,
    icon: Icon,
    iconClassName,
    trend,
}: {
    title: string;
    amount: string;
    description: string;
    icon: typeof Wallet;
    iconClassName: string;
    trend?: "up" | "down";
}) {
    return (
        <Card className="min-w-0 border-border/70 shadow-sm">
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <p className="mt-2 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                            {amount}
                        </p>
                    </div>
                    <div className={`shrink-0 rounded-xl p-3 ${iconClassName}`}>
                        <Icon className="size-5" />
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                    {trend === "up" && (
                        <ArrowUpRight className="size-4 text-emerald-600" />
                    )}
                    {trend === "down" && (
                        <ArrowDownLeft className="size-4 text-amber-600" />
                    )}
                    <span>{description}</span>
                </div>
            </CardContent>
        </Card>
    );
}

export default function FinancialPage() {
    const [transactions, setTransactions] =
        useState<Transaction[]>(initialTransactions);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
    const [methodFilter, setMethodFilter] = useState<MethodFilter>("ALL");
    const [selectedDate, setSelectedDate] = useState("ALL");

    const dateOptions = useMemo(
        () => [...new Set(transactions.map((item) => item.date))].sort().reverse(),
        [transactions],
    );

    const stats = useMemo(() => {
        const paid = transactions
            .filter((item) => item.status === "PAID")
            .reduce((sum, item) => sum + item.amount, 0);

        const pending = transactions
            .filter((item) => item.status === "PENDING")
            .reduce((sum, item) => sum + item.amount, 0);

        const overdue = transactions
            .filter((item) => item.status === "OVERDUE")
            .reduce((sum, item) => sum + item.amount, 0);

        const refunded = transactions
            .filter((item) => item.status === "REFUNDED")
            .reduce((sum, item) => sum + item.amount, 0);

        return {
            paid,
            pending,
            overdue,
            refunded,
            completedCount: transactions.filter((item) => item.status === "PAID")
                .length,
            pendingCount: transactions.filter((item) => item.status === "PENDING")
                .length,
        };
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        const query = search.trim().toLowerCase();

        return transactions.filter((item) => {
            const matchesSearch =
                !query ||
                [
                    item.id,
                    item.studentId,
                    item.studentName,
                    item.description,
                    item.category,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === "ALL" || item.status === statusFilter;
            const matchesMethod =
                methodFilter === "ALL" || item.method === methodFilter;
            const matchesDate =
                selectedDate === "ALL" || item.date === selectedDate;

            return (
                matchesSearch && matchesStatus && matchesMethod && matchesDate
            );
        });
    }, [transactions, search, statusFilter, methodFilter, selectedDate]);

    function updateStatus(id: string, status: PaymentStatus) {
        setTransactions((current) =>
            current.map((item) => (item.id === id ? { ...item, status } : item)),
        );
    }

    function resetFilters() {
        setSearch("");
        setStatusFilter("ALL");
        setMethodFilter("ALL");
        setSelectedDate("ALL");
    }

    return (
        <div className="w-full min-w-0 space-y-6 pb-8 ">
            {/* Page heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 ">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="size-4" />
                        <span>Administration</span>
                        <span>/</span>
                        <span>Finance</span>
                    </div>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                        Financial Management
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Monitor tuition payments, outstanding balances, and financial
                        transactions.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => window.print()}>
                        <FileText className="mr-2 size-4" />
                        Print Report
                    </Button>
                    <Button
                        onClick={() =>
                            window.alert(
                                "Connect this button to your authorized payment or invoice creation workflow.",
                            )
                        }
                    >
                        <Plus className="mr-2 size-4" />
                        Record Payment
                    </Button>
                </div>
            </div>

            {/* Financial overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 p-4">
                <SummaryCard
                    title="Total Collected"
                    amount={formatBDT(stats.paid)}
                    description={`${stats.completedCount} completed transactions`}
                    icon={Wallet}
                    iconClassName="bg-emerald-50 text-emerald-700"
                    trend="up"
                />
                <SummaryCard
                    title="Pending Payments"
                    amount={formatBDT(stats.pending)}
                    description={`${stats.pendingCount} awaiting confirmation`}
                    icon={Clock3}
                    iconClassName="bg-amber-50 text-amber-700"
                />
                <SummaryCard
                    title="Overdue Payments"
                    amount={formatBDT(stats.overdue)}
                    description="Transactions marked overdue"
                    icon={CalendarDays}
                    iconClassName="bg-rose-50 text-rose-700"
                />
                <SummaryCard
                    title="Refunded Amount"
                    amount={formatBDT(stats.refunded)}
                    description="Transactions marked refunded"
                    icon={ArrowDownLeft}
                    iconClassName="bg-slate-100 text-slate-700"
                />
            </div>

            {/* Collection summary */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 p-4">
                <Card className="min-w-0 border-border/70 shadow-sm lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <div>
                            <CardTitle className="text-base">Collection Overview</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Payment status distribution across loaded transactions
                            </p>
                        </div>
                        <Banknote className="size-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {(
                            [
                                {
                                    label: "Paid",
                                    amount: stats.paid,
                                    color: "bg-emerald-500",
                                },
                                {
                                    label: "Pending",
                                    amount: stats.pending,
                                    color: "bg-amber-500",
                                },
                                {
                                    label: "Overdue",
                                    amount: stats.overdue,
                                    color: "bg-rose-500",
                                },
                                {
                                    label: "Refunded",
                                    amount: stats.refunded,
                                    color: "bg-slate-400",
                                },
                            ] as const
                        ).map((item) => {
                            const total =
                                stats.paid + stats.pending + stats.overdue + stats.refunded;
                            const percentage =
                                total > 0 ? (item.amount / total) * 100 : 0;

                            return (
                                <div key={item.label} className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="text-muted-foreground">
                                            {formatBDT(item.amount)} · {percentage.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className={`h-full rounded-full transition-all ${item.color}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card className="min-w-0 border-border/70 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Payment Insights</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Current transaction summary
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                                <CheckCircle2 className="size-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">Successful payments</p>
                                <p className="text-xs text-muted-foreground">
                                    {stats.completedCount} transactions
                                </p>
                            </div>
                            <span className="text-sm font-semibold">
                                {formatBDT(stats.paid)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                                <Clock3 className="size-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">Awaiting payment</p>
                                <p className="text-xs text-muted-foreground">
                                    {stats.pendingCount} pending transactions
                                </p>
                            </div>
                            <span className="text-sm font-semibold">
                                {formatBDT(stats.pending)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                                <Receipt className="size-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">Total records</p>
                                <p className="text-xs text-muted-foreground">
                                    All loaded transactions
                                </p>
                            </div>
                            <span className="text-lg font-bold">{transactions.length}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction list */}
            <Card className="min-w-0 border-border/70 shadow-sm">
                <CardHeader className="gap-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-lg">Financial Transactions</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Search and review student payments and fees.
                            </p>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                            {filteredTransactions.length} records
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="relative min-w-0 xl:col-span-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search student, ID, transaction..."
                                className="pl-9"
                                aria-label="Search transactions"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => {
                                const nextValue = value ?? "ALL";
                                if (statusOptions.some((item) => item.value === nextValue)) {
                                    setStatusFilter(nextValue as StatusFilter);
                                }
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Payment status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={methodFilter}
                            onValueChange={(value) => {
                                const nextValue = value ?? "ALL";
                                if (methodOptions.some((item) => item.value === nextValue)) {
                                    setMethodFilter(nextValue as MethodFilter);
                                }
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                {methodOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={selectedDate}
                            onValueChange={(value) => setSelectedDate(value ?? "ALL")}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Transaction date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All dates</SelectItem>
                                {dateOptions.map((date) => (
                                    <SelectItem key={date} value={date}>
                                        {formatDate(date)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent className="min-w-0">
                    <div className="w-full overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[150px]">Transaction</TableHead>
                                    <TableHead className="min-w-[190px]">Student</TableHead>
                                    <TableHead className="min-w-[170px]">Description</TableHead>
                                    <TableHead className="min-w-[130px]">Method</TableHead>
                                    <TableHead className="min-w-[120px]">Date</TableHead>
                                    <TableHead className="min-w-[120px] text-right">
                                        Amount
                                    </TableHead>
                                    <TableHead className="min-w-[120px]">Status</TableHead>
                                    <TableHead className="w-[60px] text-right">
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <p className="font-medium">{transaction.id}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {transaction.category}
                                            </p>
                                        </TableCell>

                                        <TableCell>
                                            <p className="font-medium">{transaction.studentName}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {transaction.studentId}
                                            </p>
                                        </TableCell>

                                        <TableCell className="text-sm">
                                            {transaction.description}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CreditCard className="size-4 shrink-0 text-muted-foreground" />
                                                {transaction.method}
                                            </div>
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                                            {formatDate(transaction.date)}
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap text-right font-semibold tabular-nums">
                                            {formatBDT(transaction.amount)}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={statusStyles[transaction.status]}
                                            >
                                                {transaction.status.charAt(0) +
                                                    transaction.status.slice(1).toLowerCase()}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            aria-label={`Actions for ${transaction.id}`}
                                                        >
                                                            <Ellipsis className="size-4" />
                                                        </Button>
                                                    }
                                                />
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            window.alert(
                                                                `Transaction: ${transaction.id}\nStudent: ${transaction.studentName}\nAmount: ${formatBDT(transaction.amount)}\nStatus: ${transaction.status}`,
                                                            )
                                                        }
                                                    >
                                                        <Eye className="mr-2 size-4" />
                                                        View details
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuItem
                                                        disabled={transaction.status === "PAID"}
                                                        onClick={() => updateStatus(transaction.id, "PAID")}
                                                    >
                                                        <CheckCircle2 className="mr-2 size-4" />
                                                        Mark as paid
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        disabled={transaction.status === "PENDING"}
                                                        onClick={() =>
                                                            updateStatus(transaction.id, "PENDING")
                                                        }
                                                    >
                                                        <Clock3 className="mr-2 size-4" />
                                                        Mark as pending
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        disabled={transaction.status === "OVERDUE"}
                                                        onClick={() =>
                                                            updateStatus(transaction.id, "OVERDUE")
                                                        }
                                                    >
                                                        <XCircle className="mr-2 size-4" />
                                                        Mark as overdue
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        disabled={transaction.status === "REFUNDED"}
                                                        onClick={() =>
                                                            updateStatus(transaction.id, "REFUNDED")
                                                        }
                                                    >
                                                        <ArrowDownLeft className="mr-2 size-4" />
                                                        Mark as refunded
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {filteredTransactions.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-36 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Receipt className="size-8 text-muted-foreground/60" />
                                                <p className="font-medium">No transactions found</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Try changing your search or filters.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={resetFilters}
                                                >
                                                    Clear filters
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Showing {filteredTransactions.length} of {transactions.length}{" "}
                            transactions
                        </p>
                        <p>Amounts shown in Bangladeshi Taka (BDT)</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
