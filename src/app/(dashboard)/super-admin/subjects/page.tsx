"use client";

import React, { useState } from "react";
import {
    Eye,
    MoreHorizontal,
    Pencil,
    Plus,
    Search,
    BookOpen,
    Filter,
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type SubjectType = "THEORY" | "LAB" | "PRACTICAL" | "PROJECT";

type Subject = {
    id: string;
    code: string;
    name: string;
    credits: number;
    type: SubjectType;
    prerequisite?: string | null;
    isActive: boolean;
};

const subjects: Subject[] = [
    {
        id: "1",
        code: "CSE-101",
        name: "Introduction to Programming",
        credits: 3,
        type: "THEORY",
        prerequisite: null,
        isActive: true,
    },
    {
        id: "2",
        code: "CSE-102",
        name: "Programming Lab",
        credits: 1.5,
        type: "LAB",
        prerequisite: "CSE-101",
        isActive: true,
    },
    {
        id: "3",
        code: "CSE-201",
        name: "Data Structures",
        credits: 3,
        type: "THEORY",
        prerequisite: "CSE-101",
        isActive: true,
    },
    {
        id: "4",
        code: "CSE-202",
        name: "Data Structures Lab",
        credits: 1.5,
        type: "LAB",
        prerequisite: "CSE-201",
        isActive: true,
    },
    {
        id: "5",
        code: "CSE-301",
        name: "Software Engineering",
        credits: 3,
        type: "THEORY",
        prerequisite: "CSE-201",
        isActive: true,
    },

];

export default function Subjects() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<"ALL" | SubjectType>("ALL");

    const filteredSubjects = subjects.filter((subject) => {
        const matchesSearch =
            subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
            typeFilter === "ALL" || subject.type === typeFilter;

        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="size-6 text-primary" />

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Subjects
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage academic subject definitions, credits, prerequisites, and
                        subject types.
                    </p>
                </div>

                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 size-4" />
                    Add Subject
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search by subject code or name..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="pl-9"
                    />
                </div>

                {/* Type Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="size-4 text-muted-foreground" />

                    <select
                        value={typeFilter}
                        onChange={(event) =>
                            setTypeFilter(event.target.value as "ALL" | SubjectType)
                        }
                        className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="ALL">All Types</option>
                        <option value="THEORY">Theory</option>
                        <option value="LAB">Lab</option>
                        <option value="PRACTICAL">Practical</option>
                        <option value="PROJECT">Project</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject Code</TableHead>
                            <TableHead>Subject Name</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Prerequisite</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[60px] text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredSubjects.length > 0 ? (
                            filteredSubjects.map((subject) => (
                                <TableRow key={subject.id}>
                                    {/* Code */}
                                    <TableCell className="font-medium">
                                        {subject.code}
                                    </TableCell>

                                    {/* Name */}
                                    <TableCell>
                                        <div className="min-w-[180px]">
                                            <p className="font-medium">{subject.name}</p>
                                        </div>
                                    </TableCell>

                                    {/* Credits */}
                                    <TableCell>{subject.credits}</TableCell>

                                    {/* Type */}
                                    <TableCell>
                                        <Badge variant="outline">
                                            {subject.type}
                                        </Badge>
                                    </TableCell>

                                    {/* Prerequisite */}
                                    <TableCell>
                                        {subject.prerequisite ? (
                                            <Badge variant="secondary">
                                                {subject.prerequisite}
                                            </Badge>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                None
                                            </span>
                                        )}
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <Badge
                                            variant={
                                                subject.isActive ? "default" : "secondary"
                                            }
                                        >
                                            {subject.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger render={<Button
                                                variant="ghost"
                                                size="icon"
                                                aria-label={`Actions for ${subject.name}`}
                                            >
                                                <MoreHorizontal className="size-4" />
                                            </Button>}>

                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 size-4" />
                                                    View
                                                </DropdownMenuItem>

                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 size-4" />
                                                    Edit
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
                                    No subjects found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Result summary */}
            <div className="text-sm text-muted-foreground">
                Showing {filteredSubjects.length} of {subjects.length} subjects
            </div>
        </div>
    );
}