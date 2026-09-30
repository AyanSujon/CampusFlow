"use client";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Mail,
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
import { Badge } from "@/components/ui/badge";
import { Student } from "./student.types";


interface StudentsTableProps {
  students: Student[];
  isLoading?: boolean;
}

export default function StudentsTable({
  students,
  isLoading = false,
}: StudentsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border">
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading students...
          </p>
        </div>
      </div>
    );
  }

  if (!students.length) {
    return (
      <div className="rounded-lg border">
        <div className="flex h-64 flex-col items-center justify-center gap-2">
          <p className="font-medium">No students found</p>

          <p className="text-sm text-muted-foreground">
            Try changing your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px] text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                {/* Student */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {student.name}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {student.email}
                    </span>
                  </div>
                </TableCell>

                {/* Student ID */}
                <TableCell className="font-mono text-sm">
                  {student.studentId}
                </TableCell>

                {/* Department */}
                <TableCell>
                  {student.department?.name ?? (
                    <span className="text-muted-foreground">
                      N/A
                    </span>
                  )}
                </TableCell>

                {/* Program */}
                <TableCell>
                  {student.program?.name ?? (
                    <span className="text-muted-foreground">
                      N/A
                    </span>
                  )}
                </TableCell>

                {/* Status */}
                <TableCell>
                  {student.isActive ? (
                    <Badge variant="default">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Inactive
                    </Badge>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">
                          Open actions
                        </span>
                      </Button>
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

                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}