
"use client";

import React, { useMemo, useState } from "react";
import {
    MoreHorizontal,
    Eye,
    Pencil,
    Search,
    CheckCircle2,
    Clock3,
    AlertCircle,
    XCircle,
    Receipt,
    Plus,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "@/components/dashboard/shared/Pagination";

type InvoiceStatus = "PAID" | "PENDING" | "OVERDUE" | "CANCELLED";

type Invoice = {
    id: string;
    invoiceNumber: string;
    studentName: string;
    studentId: string;
    feeType: string;
    amount: number;
    dueDate: string;
    status: InvoiceStatus;
    createdAt: string;
};

const invoicesData: Invoice[] = [
    {
        id: "1",
        invoiceNumber: "INV-2026-0001",
        studentName: "Arafat Hossain",
        studentId: "STU-2026-CSE-0001",
        feeType: "Tuition Fee",
        amount: 25000,
        dueDate: "2026-10-15",
        status: "PENDING",
        createdAt: "2026-10-01",
    },
    {
        id: "2",
        invoiceNumber: "INV-2026-0002",
        studentName: "Nusrat Jahan",
        studentId: "STU-2026-BBA-0002",
        feeType: "Semester Fee",
        amount: 18000,
        dueDate: "2026-10-05",
        status: "PAID",
        createdAt: "2026-09-20",
    },
    {
        id: "3",
        invoiceNumber: "INV-2026-0003",
        studentName: "Tanvir Ahmed",
        studentId: "STU-2026-CSE-0003",
        feeType: "Tuition Fee",
        amount: 25000,
        dueDate: "2026-09-25",
        status: "OVERDUE",
        createdAt: "2026-09-01",
    },
    {
        id: "4",
        invoiceNumber: "INV-2026-0004",
        studentName: "Sadia Akter",
        studentId: "STU-2026-EEE-0004",
        feeType: "Lab Fee",
        amount: 5000,
        dueDate: "2026-10-20",
        status: "PENDING",
        createdAt: "2026-10-02",
    },
    {
        id: "5",
        invoiceNumber: "INV-2026-0005",
        studentName: "Rakib Hasan",
        studentId: "STU-2026-MAT-0005",
        feeType: "Admission Fee",
        amount: 12000,
        dueDate: "2026-09-10",
        status: "CANCELLED",
        createdAt: "2026-08-25",
    },
    {
        id: "6",
        invoiceNumber: "INV-2026-0006",
        studentName: "Mehedi Hasan",
        studentId: "STU-2026-CSE-0006",
        feeType: "Tuition Fee",
        amount: 25000,
        dueDate: "2026-10-10",
        status: "PAID",
        createdAt: "2026-09-15",
    },
];

const statusConfig: Record<
    InvoiceStatus,
    {
        label: string;
        className: string;
        icon: React.ElementType;
    }
> = {
    PAID: {
        label: "Paid",
        className:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
        icon: CheckCircle2,
    },
    PENDING: {
        label: "Pending",
        className:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
        icon: Clock3,
    },
    OVERDUE: {
        label: "Overdue",
        className:
            "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
        icon: AlertCircle,
    },
    CANCELLED: {
        label: "Cancelled",
        className:
            "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
        icon: XCircle,
    },
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));

export default function Invoices() {
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState<string>("ALL");
    const [feeType, setFeeType] = useState<string>("ALL");
    const [page, setPage] = useState(1);

    const itemsPerPage = 5;

    const filteredInvoices = useMemo(() => {
        return invoicesData.filter((invoice) => {
            const search = searchTerm.toLowerCase();

            const matchesSearch =
                invoice.studentName.toLowerCase().includes(search) ||
                invoice.studentId.toLowerCase().includes(search) ||
                invoice.invoiceNumber.toLowerCase().includes(search);

            const matchesStatus =
                status === "ALL" || invoice.status === status;

            const matchesFeeType =
                feeType === "ALL" || invoice.feeType === feeType;

            return matchesSearch && matchesStatus && matchesFeeType;
        });
    }, [searchTerm, status, feeType]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredInvoices.length / itemsPerPage)
    );

    const paginatedInvoices = filteredInvoices.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleStatusChange = (value: string | null) => {
        setStatus(value ?? "ALL");
        setPage(1);
    };

    const handleFeeTypeChange = (value: string | null) => {
        setFeeType(value ?? "ALL");
        setPage(1);
    };

    return (
        <div className="space-y-6 p-3">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Receipt className="h-6 w-6 text-primary" />

                        <h1 className="text-2xl font-bold tracking-tight">
                            Invoices
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Create and track student financial obligations.
                    </p>
                </div>

                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Invoice
                </Button>
            </div>

            {/* Filters */}
            <div className="rounded-lg border bg-card p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            value={searchTerm}
                            onChange={(event) =>
                                handleSearch(event.target.value)
                            }
                            placeholder="Search student or invoice..."
                            className="pl-9"
                        />
                    </div>

                    {/* Status */}
                    <Select
                        value={status}
                        onValueChange={handleStatusChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ALL">All Statuses</SelectItem>
                            <SelectItem value="PAID">Paid</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="OVERDUE">Overdue</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Fee Type */}
                    <Select
                        value={feeType}
                        onValueChange={handleFeeTypeChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by fee type" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ALL">All Fee Types</SelectItem>
                            <SelectItem value="Tuition Fee">
                                Tuition Fee
                            </SelectItem>
                            <SelectItem value="Semester Fee">
                                Semester Fee
                            </SelectItem>
                            <SelectItem value="Admission Fee">
                                Admission Fee
                            </SelectItem>
                            <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Result Count */}
                    <div className="flex items-center justify-end rounded-md border px-3 text-sm text-muted-foreground">
                        {filteredInvoices.length} invoice
                        {filteredInvoices.length !== 1 ? "s" : ""} found
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Fee Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedInvoices.length > 0 ? (
                            paginatedInvoices.map((invoice) => {
                                const config = statusConfig[invoice.status];
                                const StatusIcon = config.icon;

                                return (
                                    <TableRow key={invoice.id}>
                                        {/* Invoice */}
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">
                                                    {invoice.invoiceNumber}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    Created {formatDate(invoice.createdAt)}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Student */}
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">
                                                    {invoice.studentName}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {invoice.studentId}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Fee Type */}
                                        <TableCell>
                                            {invoice.feeType}
                                        </TableCell>

                                        {/* Amount */}
                                        <TableCell>
                                            <span className="font-semibold">
                                                {formatCurrency(invoice.amount)}
                                            </span>
                                        </TableCell>

                                        {/* Due Date */}
                                        <TableCell>
                                            {formatDate(invoice.dueDate)}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
                                            >
                                                <StatusIcon className="h-3.5 w-3.5" />
                                                {config.label}
                                            </span>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={<Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label="Invoice actions"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>}>

                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-32 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Receipt className="h-8 w-8 text-muted-foreground/50" />

                                        <p className="font-medium">
                                            No invoices found
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Try changing your search or filters.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={false}
            />
        </div>
    );
}

