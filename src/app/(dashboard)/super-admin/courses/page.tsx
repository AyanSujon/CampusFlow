// // import React from 'react'

// // export default function Courses() {
// //   return (
// //     <div>courses</div>
// //   )
// // }




// "use client";

// import React, { useState } from "react";
// import {
//     BookOpen,
//     MoreHorizontal,
//     Eye,
//     Pencil,
//     Trash2,
//     Plus,
//     Search,
// } from "lucide-react";

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";

// type Course = {
//     id: string;
//     code: string;
//     name: string;
//     department: {
//         id: string;
//         code: string;
//         name: string;
//     };
//     credits: number;
//     courseType: "THEORY" | "LAB" | "PROJECT" | "SEMINAR";
//     isActive: boolean;
//     createdAt: string;
// };

// const mockCourses: Course[] = [
//     {
//         id: "1",
//         code: "CSE-101",
//         name: "Introduction to Computer Science",
//         department: {
//             id: "dept-1",
//             code: "CSE",
//             name: "Computer Science & Engineering",
//         },
//         credits: 3,
//         courseType: "THEORY",
//         isActive: true,
//         createdAt: "2026-08-01",
//     },
//     {
//         id: "2",
//         code: "CSE-102",
//         name: "Structured Programming",
//         department: {
//             id: "dept-1",
//             code: "CSE",
//             name: "Computer Science & Engineering",
//         },
//         credits: 3,
//         courseType: "THEORY",
//         isActive: true,
//         createdAt: "2026-08-02",
//     },
//     {
//         id: "3",
//         code: "CSE-103",
//         name: "Programming Lab",
//         department: {
//             id: "dept-1",
//             code: "CSE",
//             name: "Computer Science & Engineering",
//         },
//         credits: 1.5,
//         courseType: "LAB",
//         isActive: true,
//         createdAt: "2026-08-03",
//     },
//     {
//         id: "4",
//         code: "MAT-101",
//         name: "Differential Calculus",
//         department: {
//             id: "dept-2",
//             code: "MAT",
//             name: "Mathematics",
//         },
//         credits: 3,
//         courseType: "THEORY",
//         isActive: false,
//         createdAt: "2026-08-04",
//     },
// ];

// const courseTypeLabel: Record<Course["courseType"], string> = {
//     THEORY: "Theory",
//     LAB: "Lab",
//     PROJECT: "Project",
//     SEMINAR: "Seminar",
// };

// export default function Courses() {
//     const [searchTerm, setSearchTerm] = useState("");

//     // Replace mock data with your API hook.
//     //
//     // const {
//     //   data,
//     //   isLoading,
//     //   isError,
//     // } = useGetAllCourses({
//     //   page: "1",
//     //   limit: "10",
//     //   searchTerm,
//     // });

//     const courses = mockCourses;

//     const filteredCourses = courses.filter((course) => {
//         const search = searchTerm.toLowerCase();

//         return (
//             course.name.toLowerCase().includes(search) ||
//             course.code.toLowerCase().includes(search) ||
//             course.department.name.toLowerCase().includes(search) ||
//             course.department.code.toLowerCase().includes(search)
//         );
//     });

//     return (
//         <div className="space-y-6 p-3 sm:p-6 lg:p-8">
//             {/* Page Header */}
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                     <div className="flex items-center gap-2">
//                         <BookOpen className="h-5 w-5 text-primary" />

//                         <h1 className="text-2xl font-semibold tracking-tight">
//                             Courses
//                         </h1>
//                     </div>

//                     <p className="mt-1 text-sm text-muted-foreground">
//                         Manage university courses, credits, departments, and course types.
//                     </p>
//                 </div>

//                 <Button className="w-full sm:w-auto">
//                     <Plus className="mr-2 h-4 w-4" />
//                     Create Course
//                 </Button>
//             </div>

//             {/* Search */}
//             <div className="flex flex-col gap-3 sm:flex-row">
//                 <div className="relative w-full sm:max-w-sm">
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                     <Input
//                         placeholder="Search courses..."
//                         value={searchTerm}
//                         onChange={(event) => setSearchTerm(event.target.value)}
//                         className="pl-9"
//                     />
//                 </div>
//             </div>

//             {/* Courses Table */}
//             <div className="rounded-lg border bg-background">
//                 <div className="overflow-x-auto">
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Course</TableHead>
//                                 <TableHead>Code</TableHead>
//                                 <TableHead>Department</TableHead>
//                                 <TableHead>Credits</TableHead>
//                                 <TableHead>Type</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead className="text-right">Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>

//                         <TableBody>
//                             {filteredCourses.length > 0 ? (
//                                 filteredCourses.map((course) => (
//                                     <TableRow key={course.id}>
//                                         {/* Course */}
//                                         <TableCell>
//                                             <div className="min-w-[200px]">
//                                                 <p className="font-medium">{course.name}</p>
//                                             </div>
//                                         </TableCell>

//                                         {/* Code */}
//                                         <TableCell>
//                                             <span className="font-mono text-sm text-muted-foreground">
//                                                 {course.code}
//                                             </span>
//                                         </TableCell>

//                                         {/* Department */}
//                                         <TableCell>
//                                             <div className="min-w-[180px]">
//                                                 <p className="font-medium">
//                                                     {course.department.code}
//                                                 </p>

//                                                 <p className="text-xs text-muted-foreground">
//                                                     {course.department.name}
//                                                 </p>
//                                             </div>
//                                         </TableCell>

//                                         {/* Credits */}
//                                         <TableCell>
//                                             <span className="font-medium">
//                                                 {course.credits}
//                                             </span>
//                                         </TableCell>

//                                         {/* Course Type */}
//                                         <TableCell>
//                                             <Badge variant="outline">
//                                                 {courseTypeLabel[course.courseType]}
//                                             </Badge>
//                                         </TableCell>

//                                         {/* Status */}
//                                         <TableCell>
//                                             {course.isActive ? (
//                                                 <Badge variant="secondary">Active</Badge>
//                                             ) : (
//                                                 <Badge variant="outline">Inactive</Badge>
//                                             )}
//                                         </TableCell>

//                                         {/* Actions */}
//                                         <TableCell className="text-right">
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger render={<Button
//                                                     variant="ghost"
//                                                     size="icon"
//                                                     aria-label={`Actions for ${course.name}`}
//                                                 >
//                                                     <MoreHorizontal className="h-4 w-4" />
//                                                 </Button>}>

//                                                 </DropdownMenuTrigger>

//                                                 <DropdownMenuContent align="end">
//                                                     <DropdownMenuItem>
//                                                         <Eye className="mr-2 h-4 w-4" />
//                                                         View
//                                                     </DropdownMenuItem>

//                                                     <DropdownMenuItem>
//                                                         <Pencil className="mr-2 h-4 w-4" />
//                                                         Edit
//                                                     </DropdownMenuItem>

//                                                     <DropdownMenuSeparator />

//                                                     <DropdownMenuItem className="text-destructive focus:text-destructive">
//                                                         <Trash2 className="mr-2 h-4 w-4" />
//                                                         Delete
//                                                     </DropdownMenuItem>
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell
//                                         colSpan={7}
//                                         className="h-32 text-center text-muted-foreground"
//                                     >
//                                         No courses found.
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </div>
//             </div>
//         </div>
//     );
// }









































"use client";

import React, { useState } from "react";
import {
    BookOpen,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    Plus,
    Search,
    UserRound,
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

type Course = {
    id: string;
    code: string;
    title: string;
    credits: number;

    department: {
        id: string;
        code: string;
        name: string;
    };

    program: {
        id: string;
        code: string;
        name: string;
    };

    instructor: {
        id: string;
        name: string;
        employeeId: string;
    } | null;

    isActive: boolean;
    createdAt: string;
};

const mockCourses: Course[] = [
    {
        id: "course-1",
        code: "CSE-101",
        title: "Introduction to Computer Science",
        credits: 3,

        department: {
            id: "dept-1",
            code: "CSE",
            name: "Computer Science & Engineering",
        },

        program: {
            id: "program-1",
            code: "BSC-CSE",
            name: "BSc in Computer Science & Engineering",
        },

        instructor: {
            id: "instructor-1",
            name: "Dr. John Doe",
            employeeId: "INS-2026-001",
        },

        isActive: true,
        createdAt: "2026-08-01",
    },

    {
        id: "course-2",
        code: "CSE-102",
        title: "Structured Programming",
        credits: 3,

        department: {
            id: "dept-1",
            code: "CSE",
            name: "Computer Science & Engineering",
        },

        program: {
            id: "program-1",
            code: "BSC-CSE",
            name: "BSc in Computer Science & Engineering",
        },

        instructor: {
            id: "instructor-2",
            name: "Prof. Jane Smith",
            employeeId: "INS-2026-002",
        },

        isActive: true,
        createdAt: "2026-08-02",
    },

    {
        id: "course-3",
        code: "CSE-103",
        title: "Programming Lab",
        credits: 1.5,

        department: {
            id: "dept-1",
            code: "CSE",
            name: "Computer Science & Engineering",
        },

        program: {
            id: "program-1",
            code: "BSC-CSE",
            name: "BSc in Computer Science & Engineering",
        },

        instructor: {
            id: "instructor-3",
            name: "Md. Rahman",
            employeeId: "INS-2026-003",
        },

        isActive: true,
        createdAt: "2026-08-03",
    },

    {
        id: "course-4",
        code: "MAT-101",
        title: "Differential Calculus",
        credits: 3,

        department: {
            id: "dept-2",
            code: "MAT",
            name: "Mathematics",
        },

        program: {
            id: "program-2",
            code: "BSC-MATH",
            name: "BSc in Mathematics",
        },

        instructor: null,

        isActive: false,
        createdAt: "2026-08-04",
    },
];

export default function Courses() {
    const [searchTerm, setSearchTerm] = useState("");

    /*
     * Replace mockCourses with your API query.
     *
     * Example:
     *
     * const {
     *   data,
     *   isLoading,
     *   isError,
     * } = useGetAllCourses({
     *   page: "1",
     *   limit: "10",
     *   searchTerm,
     * });
     */

    const courses = mockCourses;

    const filteredCourses = courses.filter((course) => {
        const search = searchTerm.toLowerCase();

        return (
            course.code.toLowerCase().includes(search) ||
            course.title.toLowerCase().includes(search) ||
            course.department.code.toLowerCase().includes(search) ||
            course.department.name.toLowerCase().includes(search) ||
            course.program.code.toLowerCase().includes(search) ||
            course.program.name.toLowerCase().includes(search) ||
            course.instructor?.name.toLowerCase().includes(search)
        );
    });

    return (
        <div className="space-y-6  p-3 ">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Courses
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage course codes, titles, credits, academic programs, and
                        instructor assignments.
                    </p>
                </div>

                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Course
                </Button>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search courses..."
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
                                <TableHead>Course</TableHead>
                                <TableHead>Credits</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <TableRow key={course.id}>
                                        {/* Course */}
                                        <TableCell>
                                            <div className="min-w-[220px]">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-xs text-muted-foreground">
                                                        {course.code}
                                                    </span>
                                                </div>

                                                <p className="mt-1 font-medium">
                                                    {course.title}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Credits */}
                                        <TableCell>
                                            <span className="font-medium">
                                                {course.credits}
                                            </span>
                                        </TableCell>

                                        {/* Department */}
                                        <TableCell>
                                            <div className="min-w-[170px]">
                                                <p className="font-medium">
                                                    {course.department.code}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {course.department.name}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Program */}
                                        <TableCell>
                                            <div className="min-w-[200px]">
                                                <p className="font-medium">
                                                    {course.program.code}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {course.program.name}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Instructor */}
                                        <TableCell>
                                            {course.instructor ? (
                                                <div className="flex min-w-[170px] items-center gap-2">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                                        <UserRound className="h-4 w-4 text-muted-foreground" />
                                                    </div>

                                                    <div>
                                                        <p className="font-medium">
                                                            {course.instructor.name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {course.instructor.employeeId}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Badge variant="outline">
                                                    Not Assigned
                                                </Badge>
                                            )}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            {course.isActive ? (
                                                <Badge variant="secondary">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={<Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Actions for ${course.title}`}
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
                                        No courses found.
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