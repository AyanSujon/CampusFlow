
// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   MoreHorizontal,
//   Eye,
//   Pencil,
//   Search,
//   CheckCircle2,
//   Lock,
//   Unlock,
//   Clock3,
// } from "lucide-react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Button } from "@/components/ui/button";

// type GradeStatus = "PUBLISHED" | "DRAFT" | "LOCKED";

// type Grade = {
//   id: string;
//   student: {
//     name: string;
//     studentId: string;
//   };
//   course: {
//     code: string;
//     title: string;
//   };
//   term: string;
//   marks: number;
//   grade: string;
//   gpa: number;
//   status: GradeStatus;
//   updatedAt: string;
// };

// const gradesData: Grade[] = [
//   {
//     id: "1",
//     student: {
//       name: "Ayan Sujon",
//       studentId: "STU-2026-CSE-0001",
//     },
//     course: {
//       code: "CSE-101",
//       title: "Introduction to Programming",
//     },
//     term: "Fall 2026",
//     marks: 86,
//     grade: "A+",
//     gpa: 4.0,
//     status: "PUBLISHED",
//     updatedAt: "Oct 05, 2026",
//   },
//   {
//     id: "2",
//     student: {
//       name: "Nusrat Jahan",
//       studentId: "STU-2026-CSE-0002",
//     },
//     course: {
//       code: "CSE-101",
//       title: "Introduction to Programming",
//     },
//     term: "Fall 2026",
//     marks: 78,
//     grade: "A",
//     gpa: 3.75,
//     status: "DRAFT",
//     updatedAt: "Oct 05, 2026",
//   },
//   {
//     id: "3",
//     student: {
//       name: "Rakib Hasan",
//       studentId: "STU-2026-BBA-0003",
//     },
//     course: {
//       code: "BBA-201",
//       title: "Principles of Management",
//     },
//     term: "Fall 2026",
//     marks: 68,
//     grade: "B+",
//     gpa: 3.25,
//     status: "LOCKED",
//     updatedAt: "Oct 04, 2026",
//   },
//   {
//     id: "4",
//     student: {
//       name: "Sadia Rahman",
//       studentId: "STU-2026-EEE-0004",
//     },
//     course: {
//       code: "EEE-205",
//       title: "Digital Electronics",
//     },
//     term: "Fall 2026",
//     marks: 59,
//     grade: "B-",
//     gpa: 2.75,
//     status: "PUBLISHED",
//     updatedAt: "Oct 03, 2026",
//   },
//   {
//     id: "5",
//     student: {
//       name: "Tanvir Ahmed",
//       studentId: "STU-2026-CSE-0005",
//     },
//     course: {
//       code: "CSE-205",
//       title: "Data Structures",
//     },
//     term: "Fall 2026",
//     marks: 91,
//     grade: "A+",
//     gpa: 4.0,
//     status: "PUBLISHED",
//     updatedAt: "Oct 02, 2026",
//   },
//   {
//     id: "6",
//     student: {
//       name: "Mim Akter",
//       studentId: "STU-2026-CSE-0006",
//     },
//     course: {
//       code: "CSE-205",
//       title: "Data Structures",
//     },
//     term: "Fall 2026",
//     marks: 73,
//     grade: "A-",
//     gpa: 3.5,
//     status: "DRAFT",
//     updatedAt: "Oct 01, 2026",
//   },
// ];

// const statusConfig: Record<
//   GradeStatus,
//   {
//     label: string;
//     className: string;
//     icon: React.ElementType;
//   }
// > = {
//   PUBLISHED: {
//     label: "Published",
//     className:
//       "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
//     icon: CheckCircle2,
//   },
//   DRAFT: {
//     label: "Draft",
//     className:
//       "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
//     icon: Clock3,
//   },
//   LOCKED: {
//     label: "Locked",
//     className:
//       "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800",
//     icon: Lock,
//   },
// };

// export default function Grades() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [term, setTerm] = useState("ALL");
//   const [status, setStatus] = useState("ALL");

//   const filteredGrades = useMemo(() => {
//     return gradesData.filter((grade) => {
//       const search = searchTerm.toLowerCase().trim();

//       const matchesSearch =
//         !search ||
//         grade.student.name.toLowerCase().includes(search) ||
//         grade.student.studentId.toLowerCase().includes(search) ||
//         grade.course.code.toLowerCase().includes(search) ||
//         grade.course.title.toLowerCase().includes(search);

//       const matchesTerm = term === "ALL" || grade.term === term;

//       const matchesStatus =
//         status === "ALL" || grade.status === status;

//       return matchesSearch && matchesTerm && matchesStatus;
//     });
//   }, [searchTerm, term, status]);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold tracking-tight">
//           Grades
//         </h1>
//         <p className="mt-1 text-sm text-muted-foreground">
//           Manage marks, grades, GPA, and academic result publishing.
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="rounded-xl border bg-card p-4">
//         <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
//           {/* Search */}
//           <div className="relative w-full lg:flex-1">
//             <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               placeholder="Search student, ID, course..."
//               value={searchTerm}
//               onChange={(event) =>
//                 setSearchTerm(event.target.value)
//               }
//               className="pl-9"
//             />
//           </div>

//           {/* Term */}
//           <Select value={term} onValueChange={setTerm}>
//             <SelectTrigger className="w-full lg:w-[180px]">
//               <SelectValue placeholder="Select term" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectItem value="ALL">All Terms</SelectItem>
//               <SelectItem value="Fall 2026">Fall 2026</SelectItem>
//               <SelectItem value="Spring 2026">
//                 Spring 2026
//               </SelectItem>
//               <SelectItem value="Summer 2026">
//                 Summer 2026
//               </SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Status */}
//           <Select value={status} onValueChange={setStatus}>
//             <SelectTrigger className="w-full lg:w-[160px]">
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectItem value="ALL">All Status</SelectItem>
//               <SelectItem value="PUBLISHED">Published</SelectItem>
//               <SelectItem value="DRAFT">Draft</SelectItem>
//               <SelectItem value="LOCKED">Locked</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Reset */}
//           {(searchTerm || term !== "ALL" || status !== "ALL") && (
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setSearchTerm("");
//                 setTerm("ALL");
//                 setStatus("ALL");
//               }}
//             >
//               Reset
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <div className="rounded-xl border bg-card p-4">
//           <p className="text-sm text-muted-foreground">
//             Total Results
//           </p>
//           <p className="mt-1 text-2xl font-semibold">
//             {gradesData.length}
//           </p>
//         </div>

//         <div className="rounded-xl border bg-card p-4">
//           <p className="text-sm text-muted-foreground">
//             Published
//           </p>
//           <p className="mt-1 text-2xl font-semibold">
//             {
//               gradesData.filter(
//                 (grade) => grade.status === "PUBLISHED"
//               ).length
//             }
//           </p>
//         </div>

//         <div className="rounded-xl border bg-card p-4">
//           <p className="text-sm text-muted-foreground">
//             Draft
//           </p>
//           <p className="mt-1 text-2xl font-semibold">
//             {
//               gradesData.filter(
//                 (grade) => grade.status === "DRAFT"
//               ).length
//             }
//           </p>
//         </div>

//         <div className="rounded-xl border bg-card p-4">
//           <p className="text-sm text-muted-foreground">
//             Locked
//           </p>
//           <p className="mt-1 text-2xl font-semibold">
//             {
//               gradesData.filter(
//                 (grade) => grade.status === "LOCKED"
//               ).length
//             }
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden rounded-xl border bg-card">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Student</TableHead>
//                 <TableHead>Course</TableHead>
//                 <TableHead>Term</TableHead>
//                 <TableHead>Marks</TableHead>
//                 <TableHead>Grade</TableHead>
//                 <TableHead>GPA</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Updated</TableHead>
//                 <TableHead className="w-[60px] text-right">
//                   Actions
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {filteredGrades.length > 0 ? (
//                 filteredGrades.map((grade) => {
//                   const statusInfo = statusConfig[grade.status];
//                   const StatusIcon = statusInfo.icon;

//                   return (
//                     <TableRow key={grade.id}>
//                       {/* Student */}
//                       <TableCell>
//                         <div>
//                           <p className="font-medium">
//                             {grade.student.name}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {grade.student.studentId}
//                           </p>
//                         </div>
//                       </TableCell>

//                       {/* Course */}
//                       <TableCell>
//                         <div>
//                           <p className="font-medium">
//                             {grade.course.code}
//                           </p>
//                           <p className="max-w-[220px] truncate text-xs text-muted-foreground">
//                             {grade.course.title}
//                           </p>
//                         </div>
//                       </TableCell>

//                       {/* Term */}
//                       <TableCell className="whitespace-nowrap">
//                         {grade.term}
//                       </TableCell>

//                       {/* Marks */}
//                       <TableCell>
//                         <span className="font-medium">
//                           {grade.marks}
//                         </span>
//                         <span className="text-muted-foreground">
//                           {" "}
//                           / 100
//                         </span>
//                       </TableCell>

//                       {/* Grade */}
//                       <TableCell>
//                         <span className="inline-flex min-w-10 items-center justify-center rounded-md border px-2 py-1 text-sm font-semibold">
//                           {grade.grade}
//                         </span>
//                       </TableCell>

//                       {/* GPA */}
//                       <TableCell>
//                         <span className="font-semibold">
//                           {grade.gpa.toFixed(2)}
//                         </span>
//                       </TableCell>

//                       {/* Status */}
//                       <TableCell>
//                         <span
//                           className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
//                         >
//                           <StatusIcon className="size-3.5" />
//                           {statusInfo.label}
//                         </span>
//                       </TableCell>

//                       {/* Updated */}
//                       <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
//                         {grade.updatedAt}
//                       </TableCell>

//                       {/* Actions */}
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger render={() => (
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="size-8"
//                             >
//                               <MoreHorizontal className="size-4" />
//                               <span className="sr-only">
//                                 Open actions
//                               </span>
//                             </Button>
//                           )}>
//                           </DropdownMenuTrigger>

//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem>
//                               <Eye className="mr-2 size-4" />
//                               View Result
//                             </DropdownMenuItem>

//                             {grade.status !== "LOCKED" && (
//                               <DropdownMenuItem>
//                                 <Pencil className="mr-2 size-4" />
//                                 Edit Grade
//                               </DropdownMenuItem>
//                             )}

//                             {grade.status === "DRAFT" && (
//                               <DropdownMenuItem>
//                                 <CheckCircle2 className="mr-2 size-4" />
//                                 Publish Result
//                               </DropdownMenuItem>
//                             )}

//                             {grade.status === "PUBLISHED" && (
//                               <DropdownMenuItem>
//                                 <Lock className="mr-2 size-4" />
//                                 Lock Result
//                               </DropdownMenuItem>
//                             )}

//                             {grade.status === "LOCKED" && (
//                               <DropdownMenuItem>
//                                 <Unlock className="mr-2 size-4" />
//                                 Unlock Result
//                               </DropdownMenuItem>
//                             )}
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={9}
//                     className="h-32 text-center"
//                   >
//                     <div className="flex flex-col items-center justify-center">
//                       <Search className="mb-2 size-5 text-muted-foreground" />
//                       <p className="font-medium">
//                         No grades found
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         Try changing your search or filters.
//                       </p>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Table Footer */}
//         <div className="flex items-center justify-between border-t px-4 py-3">
//           <p className="text-sm text-muted-foreground">
//             Showing{" "}
//             <span className="font-medium text-foreground">
//               {filteredGrades.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-medium text-foreground">
//               {gradesData.length}
//             </span>{" "}
//             results
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



































"use client";

import React, { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Search,
  CheckCircle2,
  Lock,
  Unlock,
  Clock3,
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

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

type GradeStatus = "PUBLISHED" | "DRAFT" | "LOCKED";

type Grade = {
  id: string;
  student: {
    name: string;
    studentId: string;
  };
  course: {
    code: string;
    title: string;
  };
  term: string;
  marks: number;
  grade: string;
  gpa: number;
  status: GradeStatus;
  updatedAt: string;
};

const gradesData: Grade[] = [
  {
    id: "1",
    student: {
      name: "Ayan Sujon",
      studentId: "STU-2026-CSE-0001",
    },
    course: {
      code: "CSE-101",
      title: "Introduction to Programming",
    },
    term: "Fall 2026",
    marks: 86,
    grade: "A+",
    gpa: 4.0,
    status: "PUBLISHED",
    updatedAt: "Oct 05, 2026",
  },
  {
    id: "2",
    student: {
      name: "Nusrat Jahan",
      studentId: "STU-2026-CSE-0002",
    },
    course: {
      code: "CSE-101",
      title: "Introduction to Programming",
    },
    term: "Fall 2026",
    marks: 78,
    grade: "A",
    gpa: 3.75,
    status: "DRAFT",
    updatedAt: "Oct 05, 2026",
  },
  {
    id: "3",
    student: {
      name: "Rakib Hasan",
      studentId: "STU-2026-BBA-0003",
    },
    course: {
      code: "BBA-201",
      title: "Principles of Management",
    },
    term: "Fall 2026",
    marks: 68,
    grade: "B+",
    gpa: 3.25,
    status: "LOCKED",
    updatedAt: "Oct 04, 2026",
  },
  {
    id: "4",
    student: {
      name: "Sadia Rahman",
      studentId: "STU-2026-EEE-0004",
    },
    course: {
      code: "EEE-205",
      title: "Digital Electronics",
    },
    term: "Fall 2026",
    marks: 59,
    grade: "B-",
    gpa: 2.75,
    status: "PUBLISHED",
    updatedAt: "Oct 03, 2026",
  },
  {
    id: "5",
    student: {
      name: "Tanvir Ahmed",
      studentId: "STU-2026-CSE-0005",
    },
    course: {
      code: "CSE-205",
      title: "Data Structures",
    },
    term: "Fall 2026",
    marks: 91,
    grade: "A+",
    gpa: 4.0,
    status: "PUBLISHED",
    updatedAt: "Oct 02, 2026",
  },
  {
    id: "6",
    student: {
      name: "Mim Akter",
      studentId: "STU-2026-CSE-0006",
    },
    course: {
      code: "CSE-205",
      title: "Data Structures",
    },
    term: "Fall 2026",
    marks: 73,
    grade: "A-",
    gpa: 3.5,
    status: "DRAFT",
    updatedAt: "Oct 01, 2026",
  },
];

const statusConfig: Record<
  GradeStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  PUBLISHED: {
    label: "Published",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
    icon: CheckCircle2,
  },
  DRAFT: {
    label: "Draft",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
    icon: Clock3,
  },
  LOCKED: {
    label: "Locked",
    className:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800",
    icon: Lock,
  },
};

export default function Grades() {
  const [searchTerm, setSearchTerm] = useState("");
  const [term, setTerm] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const filteredGrades = useMemo(() => {
    return gradesData.filter((grade) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        grade.student.name.toLowerCase().includes(search) ||
        grade.student.studentId.toLowerCase().includes(search) ||
        grade.course.code.toLowerCase().includes(search) ||
        grade.course.title.toLowerCase().includes(search);

      const matchesTerm = term === "ALL" || grade.term === term;

      const matchesStatus =
        status === "ALL" || grade.status === status;

      return matchesSearch && matchesTerm && matchesStatus;
    });
  }, [searchTerm, term, status]);

  return (
    <div className="space-y-6 p-3">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Grades
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage marks, grades, GPA, and academic result publishing.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search student, ID, course..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="pl-9"
            />
          </div>

          {/* Term */}
          <Select
            value={term}
            onValueChange={(value) =>
              setTerm(value ?? "ALL")
            }
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Terms
              </SelectItem>

              <SelectItem value="Fall 2026">
                Fall 2026
              </SelectItem>

              <SelectItem value="Spring 2026">
                Spring 2026
              </SelectItem>

              <SelectItem value="Summer 2026">
                Summer 2026
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value ?? "ALL")
            }
          >
            <SelectTrigger className="w-full lg:w-[160px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Status
              </SelectItem>

              <SelectItem value="PUBLISHED">
                Published
              </SelectItem>

              <SelectItem value="DRAFT">
                Draft
              </SelectItem>

              <SelectItem value="LOCKED">
                Locked
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Reset */}
          {(searchTerm ||
            term !== "ALL" ||
            status !== "ALL") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setTerm("ALL");
                setStatus("ALL");
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Total Results
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {gradesData.length}
          </p>
        </div>

        {/* Published */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Published
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {
              gradesData.filter(
                (grade) => grade.status === "PUBLISHED"
              ).length
            }
          </p>
        </div>

        {/* Draft */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Draft
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {
              gradesData.filter(
                (grade) => grade.status === "DRAFT"
              ).length
            }
          </p>
        </div>

        {/* Locked */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Locked
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {
              gradesData.filter(
                (grade) => grade.status === "LOCKED"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Student
                </TableHead>

                <TableHead>
                  Course
                </TableHead>

                <TableHead>
                  Term
                </TableHead>

                <TableHead>
                  Marks
                </TableHead>

                <TableHead>
                  Grade
                </TableHead>

                <TableHead>
                  GPA
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead>
                  Updated
                </TableHead>

                <TableHead className="w-[60px] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade) => {
                  const statusInfo =
                    statusConfig[grade.status];

                  const StatusIcon =
                    statusInfo.icon;

                  return (
                    <TableRow key={grade.id}>
                      {/* Student */}
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {grade.student.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {grade.student.studentId}
                          </p>
                        </div>
                      </TableCell>

                      {/* Course */}
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {grade.course.code}
                          </p>

                          <p className="max-w-[220px] truncate text-xs text-muted-foreground">
                            {grade.course.title}
                          </p>
                        </div>
                      </TableCell>

                      {/* Term */}
                      <TableCell className="whitespace-nowrap">
                        {grade.term}
                      </TableCell>

                      {/* Marks */}
                      <TableCell>
                        <span className="font-medium">
                          {grade.marks}
                        </span>

                        <span className="text-muted-foreground">
                          {" "}
                          / 100
                        </span>
                      </TableCell>

                      {/* Grade */}
                      <TableCell>
                        <span className="inline-flex min-w-10 items-center justify-center rounded-md border px-2 py-1 text-sm font-semibold">
                          {grade.grade}
                        </span>
                      </TableCell>

                      {/* GPA */}
                      <TableCell>
                        <span className="font-semibold">
                          {grade.gpa.toFixed(2)}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
                        >
                          <StatusIcon className="size-3.5" />

                          {statusInfo.label}
                        </span>
                      </TableCell>

                      {/* Updated */}
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {grade.updatedAt}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                              >
                                <MoreHorizontal className="size-4" />

                                <span className="sr-only">
                                  Open actions
                                </span>
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end">
                            {/* View */}
                            <DropdownMenuItem>
                              <Eye className="mr-2 size-4" />
                              View Result
                            </DropdownMenuItem>

                            {/* Edit */}
                            {grade.status !== "LOCKED" && (
                              <DropdownMenuItem>
                                <Pencil className="mr-2 size-4" />
                                Edit Grade
                              </DropdownMenuItem>
                            )}

                            {/* Publish */}
                            {grade.status === "DRAFT" && (
                              <DropdownMenuItem>
                                <CheckCircle2 className="mr-2 size-4" />
                                Publish Result
                              </DropdownMenuItem>
                            )}

                            {/* Lock */}
                            {grade.status === "PUBLISHED" && (
                              <DropdownMenuItem>
                                <Lock className="mr-2 size-4" />
                                Lock Result
                              </DropdownMenuItem>
                            )}

                            {/* Unlock */}
                            {grade.status === "LOCKED" && (
                              <DropdownMenuItem>
                                <Unlock className="mr-2 size-4" />
                                Unlock Result
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Search className="mb-2 size-5 text-muted-foreground" />

                      <p className="font-medium">
                        No grades found
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

        {/* Table Footer */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredGrades.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {gradesData.length}
            </span>{" "}
            results
          </p>
        </div>
      </div>
    </div>
  );
}
