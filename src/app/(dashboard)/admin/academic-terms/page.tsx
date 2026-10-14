"use client";

import React, { useState } from "react";
import {
    CalendarDays,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    Plus,
    Search,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Replace with your actual hook
// import { useGetAllAcademicTerms } from "@/hooks/academic-terms.hook";

type AcademicTerm = {
    id: string;
    name: string;
    code: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    isActive: boolean;
    createdAt: string;
};

const mockAcademicTerms: AcademicTerm[] = [
    {
        id: "1",
        name: "Fall 2026",
        code: "FALL-2026",
        startDate: "2026-09-01",
        endDate: "2026-12-31",
        isCurrent: true,
        isActive: true,
        createdAt: "2026-08-01",
    },
    {
        id: "2",
        name: "Spring 2026",
        code: "SPRING-2026",
        startDate: "2026-01-01",
        endDate: "2026-04-30",
        isCurrent: false,
        isActive: true,
        createdAt: "2025-12-01",
    },
    {
        id: "3",
        name: "Summer 2026",
        code: "SUMMER-2026",
        startDate: "2026-05-01",
        endDate: "2026-08-31",
        isCurrent: false,
        isActive: false,
        createdAt: "2026-04-01",
    },
];

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(new Date(date));
};

export default function AcademicTerms() {
    const [searchTerm, setSearchTerm] = useState("");

    // Replace mock data with API data
    // const {
    //   data,
    //   isLoading,
    //   isError,
    // } = useGetAllAcademicTerms({
    //   page: "1",
    //   limit: "10",
    //   searchTerm,
    // });

    const academicTerms = mockAcademicTerms;

    const filteredTerms = academicTerms.filter((term) => {
        const search = searchTerm.toLowerCase();

        return (
            term.name.toLowerCase().includes(search) ||
            term.code.toLowerCase().includes(search)
        );
    });

    return (
        <div className="space-y-6  p-3 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Academic Terms
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage semesters, academic sessions, dates, and active terms.
                    </p>
                </div>

                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Academic Term
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search terms..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border bg-background">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Term</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Current</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredTerms.length > 0 ? (
                                filteredTerms.map((term) => (
                                    <TableRow key={term.id}>
                                        {/* Term */}
                                        <TableCell>
                                            <div className="font-medium">{term.name}</div>
                                        </TableCell>

                                        {/* Code */}
                                        <TableCell>
                                            <span className="font-mono text-sm text-muted-foreground">
                                                {term.code}
                                            </span>
                                        </TableCell>

                                        {/* Start Date */}
                                        <TableCell className="whitespace-nowrap">
                                            {formatDate(term.startDate)}
                                        </TableCell>

                                        {/* End Date */}
                                        <TableCell className="whitespace-nowrap">
                                            {formatDate(term.endDate)}
                                        </TableCell>

                                        {/* Current */}
                                        <TableCell>
                                            {term.isCurrent ? (
                                                <Badge>Current</Badge>
                                            ) : (
                                                <Badge variant="outline">No</Badge>
                                            )}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            {term.isActive ? (
                                                <Badge variant="secondary">Active</Badge>
                                            ) : (
                                                <Badge variant="outline">Inactive</Badge>
                                            )}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    render={<Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Actions for ${term.name}`}
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

                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        No academic terms found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}