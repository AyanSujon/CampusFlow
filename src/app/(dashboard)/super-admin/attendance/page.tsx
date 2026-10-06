
// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   MoreHorizontal,
//   Eye,
//   Pencil,
//   CalendarDays,
//   Search,
//   CheckCircle2,
//   XCircle,
//   Clock3,
//   AlertCircle,
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

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

// type AttendanceRecord = {
//   id: string;
//   student: {
//     id: string;
//     name: string;
//     studentId: string;
//     email: string;
//   };
//   course: {
//     id: string;
//     code: string;
//     title: string;
//   };
//   date: string;
//   status: AttendanceStatus;
//   attendancePercentage: number;
// };

// const attendanceData: AttendanceRecord[] = [
//   {
//     id: "ATT-001",
//     student: {
//       id: "STU-001",
//       name: "Ayan Sujon",
//       studentId: "STU-2026-CSE-0001",
//       email: "ayan@example.com",
//     },
//     course: {
//       id: "CRS-001",
//       code: "CSE-101",
//       title: "Introduction to Computer Science",
//     },
//     date: "2026-10-06",
//     status: "PRESENT",
//     attendancePercentage: 92,
//   },
//   {
//     id: "ATT-002",
//     student: {
//       id: "STU-002",
//       name: "Rahim Ahmed",
//       studentId: "STU-2026-CSE-0002",
//       email: "rahim@example.com",
//     },
//     course: {
//       id: "CRS-002",
//       code: "CSE-203",
//       title: "Data Structures",
//     },
//     date: "2026-10-06",
//     status: "ABSENT",
//     attendancePercentage: 68,
//   },
//   {
//     id: "ATT-003",
//     student: {
//       id: "STU-003",
//       name: "Nusrat Jahan",
//       studentId: "STU-2026-CSE-0003",
//       email: "nusrat@example.com",
//     },
//     course: {
//       id: "CRS-003",
//       code: "CSE-205",
//       title: "Database Management Systems",
//     },
//     date: "2026-10-05",
//     status: "LATE",
//     attendancePercentage: 81,
//   },
//   {
//     id: "ATT-004",
//     student: {
//       id: "STU-004",
//       name: "Sakib Hasan",
//       studentId: "STU-2026-CSE-0004",
//       email: "sakib@example.com",
//     },
//     course: {
//       id: "CRS-001",
//       code: "CSE-101",
//       title: "Introduction to Computer Science",
//     },
//     date: "2026-10-05",
//     status: "PRESENT",
//     attendancePercentage: 95,
//   },
//   {
//     id: "ATT-005",
//     student: {
//       id: "STU-005",
//       name: "Mim Akter",
//       studentId: "STU-2026-BBA-0001",
//       email: "mim@example.com",
//     },
//     course: {
//       id: "BBA-101",
//       code: "BBA-101",
//       title: "Principles of Management",
//     },
//     date: "2026-10-04",
//     status: "EXCUSED",
//     attendancePercentage: 76,
//   },
// ];

// const statusConfig: Record<
//   AttendanceStatus,
//   {
//     label: string;
//     className: string;
//     icon: React.ElementType;
//   }
// > = {
//   PRESENT: {
//     label: "Present",
//     className:
//       "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400",
//     icon: CheckCircle2,
//   },
//   ABSENT: {
//     label: "Absent",
//     className:
//       "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
//     icon: XCircle,
//   },
//   LATE: {
//     label: "Late",
//     className:
//       "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
//     icon: Clock3,
//   },
//   EXCUSED: {
//     label: "Excused",
//     className:
//       "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
//     icon: AlertCircle,
//   },
// };

// function getAttendanceColor(percentage: number) {
//   if (percentage >= 80) {
//     return "text-green-600 dark:text-green-400";
//   }

//   if (percentage >= 70) {
//     return "text-yellow-600 dark:text-yellow-400";
//   }

//   return "text-red-600 dark:text-red-400";
// }

// export default function Attendance() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [status, setStatus] = useState<AttendanceStatus | "ALL">("ALL");
//   const [course, setCourse] = useState("ALL");
//   const [date, setDate] = useState("");

//   const courses = useMemo(() => {
//     return Array.from(
//       new Map(
//         attendanceData.map((item) => [
//           item.course.code,
//           `${item.course.code} - ${item.course.title}`,
//         ]),
//       ).entries(),
//     );
//   }, []);

//   const filteredAttendance = useMemo(() => {
//     return attendanceData.filter((item) => {
//       const search = searchTerm.toLowerCase().trim();

//       const matchesSearch =
//         !search ||
//         item.student.name.toLowerCase().includes(search) ||
//         item.student.studentId.toLowerCase().includes(search) ||
//         item.student.email.toLowerCase().includes(search) ||
//         item.course.code.toLowerCase().includes(search) ||
//         item.course.title.toLowerCase().includes(search);

//       const matchesStatus =
//         status === "ALL" || item.status === status;

//       const matchesCourse =
//         course === "ALL" || item.course.code === course;

//       const matchesDate = !date || item.date === date;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesCourse &&
//         matchesDate
//       );
//     });
//   }, [searchTerm, status, course, date]);

//   const averageAttendance = filteredAttendance.length
//     ? Math.round(
//         filteredAttendance.reduce(
//           (total, item) => total + item.attendancePercentage,
//           0,
//         ) / filteredAttendance.length,
//       )
//     : 0;

//   return (
//     <div className="w-full min-w-0 space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="min-w-0">
//           <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
//             Attendance
//           </h1>

//           <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
//             Monitor student attendance across courses and academic sessions.
//           </p>
//         </div>

//         <Button className="w-full shrink-0 gap-2 sm:w-auto">
//           <CalendarDays className="size-4" />
//           <span>Mark Attendance</span>
//         </Button>
//       </div>

//       {/* Filters */}
//       <div className="rounded-lg border bg-card p-3 sm:p-4">
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//           {/* Search */}
//           <div className="relative min-w-0 sm:col-span-2 lg:col-span-2">
//             <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               placeholder="Search student, ID, course..."
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//               className="h-10 pl-9"
//             />
//           </div>

//           {/* Course */}
//           <Select
//             value={course}
//             onValueChange={(value) => {
//               setCourse(value ?? "ALL");
//             }}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Filter by course" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectItem value="ALL">All Courses</SelectItem>

//               {courses.map(([code, label]) => (
//                 <SelectItem key={code} value={code}>
//                   {label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Status */}
//           <Select
//             value={status}
//             onValueChange={(value) => {
//               setStatus(
//                 (value ?? "ALL") as AttendanceStatus | "ALL",
//               );
//             }}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectItem value="ALL">All Status</SelectItem>
//               <SelectItem value="PRESENT">Present</SelectItem>
//               <SelectItem value="ABSENT">Absent</SelectItem>
//               <SelectItem value="LATE">Late</SelectItem>
//               <SelectItem value="EXCUSED">Excused</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Date */}
//           <div className="relative min-w-0 sm:col-span-2 lg:col-span-1">
//             <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               type="date"
//               value={date}
//               onChange={(event) => setDate(event.target.value)}
//               className="h-10 pl-9"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
//         <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
//           <p className="truncate text-xs text-muted-foreground sm:text-sm">
//             Total Records
//           </p>

//           <p className="mt-1 text-xl font-semibold sm:text-2xl">
//             {filteredAttendance.length}
//           </p>
//         </div>

//         <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
//           <p className="truncate text-xs text-muted-foreground sm:text-sm">
//             Present
//           </p>

//           <p className="mt-1 text-xl font-semibold text-green-600 sm:text-2xl">
//             {
//               filteredAttendance.filter(
//                 (item) => item.status === "PRESENT",
//               ).length
//             }
//           </p>
//         </div>

//         <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
//           <p className="truncate text-xs text-muted-foreground sm:text-sm">
//             Absent
//           </p>

//           <p className="mt-1 text-xl font-semibold text-red-600 sm:text-2xl">
//             {
//               filteredAttendance.filter(
//                 (item) => item.status === "ABSENT",
//               ).length
//             }
//           </p>
//         </div>

//         <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
//           <p className="truncate text-xs text-muted-foreground sm:text-sm">
//             Avg. Attendance
//           </p>

//           <p className="mt-1 text-xl font-semibold sm:text-2xl">
//             {averageAttendance}%
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="w-full min-w-0 overflow-hidden rounded-lg border bg-card">
//         <div className="w-full overflow-x-auto">
//           <Table className="min-w-[850px]">
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="whitespace-nowrap">
//                   Student
//                 </TableHead>

//                 <TableHead className="whitespace-nowrap">
//                   Course
//                 </TableHead>

//                 <TableHead className="whitespace-nowrap">
//                   Date
//                 </TableHead>

//                 <TableHead className="whitespace-nowrap">
//                   Status
//                 </TableHead>

//                 <TableHead className="whitespace-nowrap">
//                   Attendance
//                 </TableHead>

//                 <TableHead className="w-12 text-right">
//                   Actions
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {filteredAttendance.length > 0 ? (
//                 filteredAttendance.map((item) => {
//                   const statusInfo = statusConfig[item.status];
//                   const StatusIcon = statusInfo.icon;

//                   return (
//                     <TableRow key={item.id}>
//                       {/* Student */}
//                       <TableCell className="max-w-[220px]">
//                         <div className="min-w-0">
//                           <p className="truncate font-medium">
//                             {item.student.name}
//                           </p>

//                           <p className="truncate text-xs text-muted-foreground">
//                             {item.student.studentId}
//                           </p>
//                         </div>
//                       </TableCell>

//                       {/* Course */}
//                       <TableCell className="max-w-[280px]">
//                         <div className="min-w-0">
//                           <p className="font-medium">
//                             {item.course.code}
//                           </p>

//                           <p className="truncate text-xs text-muted-foreground">
//                             {item.course.title}
//                           </p>
//                         </div>
//                       </TableCell>

//                       {/* Date */}
//                       <TableCell className="whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <CalendarDays className="size-4 shrink-0 text-muted-foreground" />

//                           <span>
//                             {new Date(
//                               item.date,
//                             ).toLocaleDateString("en-US", {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                             })}
//                           </span>
//                         </div>
//                       </TableCell>

//                       {/* Status */}
//                       <TableCell>
//                         <span
//                           className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
//                         >
//                           <StatusIcon className="size-3.5 shrink-0" />
//                           {statusInfo.label}
//                         </span>
//                       </TableCell>

//                       {/* Attendance */}
//                       <TableCell>
//                         <span
//                           className={`font-semibold ${getAttendanceColor(
//                             item.attendancePercentage,
//                           )}`}
//                         >
//                           {item.attendancePercentage}%
//                         </span>
//                       </TableCell>

//                       {/* Actions */}
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger
//                             render={
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                               >
//                                 <MoreHorizontal className="size-4" />

//                                 <span className="sr-only">
//                                   Open actions
//                                 </span>
//                               </Button>
//                             }
//                           />

//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem>
//                               <Eye className="mr-2 size-4" />
//                               View Details
//                             </DropdownMenuItem>

//                             <DropdownMenuItem>
//                               <Pencil className="mr-2 size-4" />
//                               Edit Attendance
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={6}
//                     className="h-32 text-center"
//                   >
//                     <div className="flex flex-col items-center justify-center gap-2 px-4">
//                       <CalendarDays className="size-8 text-muted-foreground" />

//                       <p className="font-medium">
//                         No attendance records found
//                       </p>

//                       <p className="text-sm text-muted-foreground">
//                         Try changing your filters or search term.
//                       </p>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
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
  CalendarDays,
  Search,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

type AttendanceRecord = {
  id: string;

  student: {
    id: string;
    name: string;
    studentId: string;
    email: string;
  };

  course: {
    id: string;
    code: string;
    title: string;
  };

  date: string;
  status: AttendanceStatus;
  attendancePercentage: number;
};

const attendanceData: AttendanceRecord[] = [
  {
    id: "ATT-001",
    student: {
      id: "STU-001",
      name: "Ayan Sujon",
      studentId: "STU-2026-CSE-0001",
      email: "ayan@example.com",
    },
    course: {
      id: "CRS-001",
      code: "CSE-101",
      title: "Introduction to Computer Science",
    },
    date: "2026-10-06",
    status: "PRESENT",
    attendancePercentage: 92,
  },

  {
    id: "ATT-002",
    student: {
      id: "STU-002",
      name: "Rahim Ahmed",
      studentId: "STU-2026-CSE-0002",
      email: "rahim@example.com",
    },
    course: {
      id: "CRS-002",
      code: "CSE-203",
      title: "Data Structures",
    },
    date: "2026-10-06",
    status: "ABSENT",
    attendancePercentage: 68,
  },

  {
    id: "ATT-003",
    student: {
      id: "STU-003",
      name: "Nusrat Jahan",
      studentId: "STU-2026-CSE-0003",
      email: "nusrat@example.com",
    },
    course: {
      id: "CRS-003",
      code: "CSE-205",
      title: "Database Management Systems",
    },
    date: "2026-10-05",
    status: "LATE",
    attendancePercentage: 81,
  },

  {
    id: "ATT-004",
    student: {
      id: "STU-004",
      name: "Sakib Hasan",
      studentId: "STU-2026-CSE-0004",
      email: "sakib@example.com",
    },
    course: {
      id: "CRS-001",
      code: "CSE-101",
      title: "Introduction to Computer Science",
    },
    date: "2026-10-05",
    status: "PRESENT",
    attendancePercentage: 95,
  },

  {
    id: "ATT-005",
    student: {
      id: "STU-005",
      name: "Mim Akter",
      studentId: "STU-2026-BBA-0001",
      email: "mim@example.com",
    },
    course: {
      id: "BBA-101",
      code: "BBA-101",
      title: "Principles of Management",
    },
    date: "2026-10-04",
    status: "EXCUSED",
    attendancePercentage: 76,
  },
];

const statusConfig: Record<
  AttendanceStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  PRESENT: {
    label: "Present",
    className:
      "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400",
    icon: CheckCircle2,
  },

  ABSENT: {
    label: "Absent",
    className:
      "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    icon: XCircle,
  },

  LATE: {
    label: "Late",
    className:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
    icon: Clock3,
  },

  EXCUSED: {
    label: "Excused",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    icon: AlertCircle,
  },
};

function getAttendanceColor(percentage: number) {
  if (percentage >= 80) {
    return "text-green-600 dark:text-green-400";
  }

  if (percentage >= 70) {
    return "text-yellow-600 dark:text-yellow-400";
  }

  return "text-red-600 dark:text-red-400";
}

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] =
    useState<AttendanceStatus | "ALL">("ALL");

  const [course, setCourse] = useState("ALL");
  const [date, setDate] = useState("");

  const courses = useMemo(() => {
    return Array.from(
      new Map(
        attendanceData.map((item) => [
          item.course.code,
          `${item.course.code} - ${item.course.title}`,
        ]),
      ).entries(),
    );
  }, []);

  const filteredAttendance = useMemo(() => {
    return attendanceData.filter((item) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        item.student.name.toLowerCase().includes(search) ||
        item.student.studentId.toLowerCase().includes(search) ||
        item.student.email.toLowerCase().includes(search) ||
        item.course.code.toLowerCase().includes(search) ||
        item.course.title.toLowerCase().includes(search);

      const matchesStatus =
        status === "ALL" || item.status === status;

      const matchesCourse =
        course === "ALL" || item.course.code === course;

      const matchesDate =
        !date || item.date === date;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCourse &&
        matchesDate
      );
    });
  }, [searchTerm, status, course, date]);

  const averageAttendance = filteredAttendance.length
    ? Math.round(
        filteredAttendance.reduce(
          (total, item) =>
            total + item.attendancePercentage,
          0,
        ) / filteredAttendance.length,
      )
    : 0;

  const presentCount = filteredAttendance.filter(
    (item) => item.status === "PRESENT",
  ).length;

  const absentCount = filteredAttendance.filter(
    (item) => item.status === "ABSENT",
  ).length;

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6 p-3">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Attendance
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Monitor student attendance across courses and
            academic sessions.
          </p>
        </div>

        <Button className="w-full shrink-0 gap-2 sm:w-auto">
          <CalendarDays className="size-4" />

          <span>Mark Attendance</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="rounded-lg border bg-card p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1.5fr_1.25fr_1.25fr]">
          {/* Search */}
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search student, ID, course..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="h-10 pl-9"
            />
          </div>

          {/* Course */}
          <Select
            value={course}
            onValueChange={(value) => {
              setCourse(value ?? "ALL");
            }}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Courses
              </SelectItem>

              {courses.map(([code, label]) => (
                <SelectItem key={code} value={code}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(
                (value ?? "ALL") as
                  | AttendanceStatus
                  | "ALL",
              );
            }}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Status
              </SelectItem>

              <SelectItem value="PRESENT">
                Present
              </SelectItem>

              <SelectItem value="ABSENT">
                Absent
              </SelectItem>

              <SelectItem value="LATE">
                Late
              </SelectItem>

              <SelectItem value="EXCUSED">
                Excused
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Date */}
          <div className="relative min-w-0">
            <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              className="h-10 pl-9"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {/* Total */}
        <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Total Records
          </p>

          <p className="mt-1 text-xl font-semibold sm:text-2xl">
            {filteredAttendance.length}
          </p>
        </div>

        {/* Present */}
        <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Present
          </p>

          <p className="mt-1 text-xl font-semibold text-green-600 sm:text-2xl">
            {presentCount}
          </p>
        </div>

        {/* Absent */}
        <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Absent
          </p>

          <p className="mt-1 text-xl font-semibold text-red-600 sm:text-2xl">
            {absentCount}
          </p>
        </div>

        {/* Average */}
        <div className="min-w-0 rounded-lg border bg-card p-3 sm:p-4">
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Avg. Attendance
          </p>

          <p className="mt-1 text-xl font-semibold sm:text-2xl">
            {averageAttendance}%
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="w-full min-w-0 overflow-hidden rounded-lg border bg-card">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  Student
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Course
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Date
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Status
                </TableHead>

                <TableHead className="whitespace-nowrap">
                  Attendance
                </TableHead>

                <TableHead className="w-12 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((item) => {
                  const statusInfo =
                    statusConfig[item.status];

                  const StatusIcon = statusInfo.icon;

                  return (
                    <TableRow key={item.id}>
                      {/* Student */}
                      <TableCell className="max-w-[220px]">
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {item.student.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {item.student.studentId}
                          </p>
                        </div>
                      </TableCell>

                      {/* Course */}
                      <TableCell className="max-w-[280px]">
                        <div className="min-w-0">
                          <p className="font-medium">
                            {item.course.code}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {item.course.title}
                          </p>
                        </div>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />

                          <span>
                            {new Date(
                              item.date,
                            ).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
                        >
                          <StatusIcon className="size-3.5 shrink-0" />

                          {statusInfo.label}
                        </span>
                      </TableCell>

                      {/* Attendance */}
                      <TableCell>
                        <span
                          className={`font-semibold ${getAttendanceColor(
                            item.attendancePercentage,
                          )}`}
                        >
                          {item.attendancePercentage}%
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                              >
                                <MoreHorizontal className="size-4" />

                                <span className="sr-only">
                                  Open actions
                                </span>
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 size-4" />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <Pencil className="mr-2 size-4" />
                              Edit Attendance
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
                    colSpan={6}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 px-4">
                      <CalendarDays className="size-8 text-muted-foreground" />

                      <p className="font-medium">
                        No attendance records found
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Try changing your filters or search
                        term.
                      </p>
                    </div>
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

