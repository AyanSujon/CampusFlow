// import React from 'react'

// export default function DepartmentOverview() {
//     return (
//         <div> Department Overview</div>
//     )
// }







"use client";

import {
    Building2,
    GraduationCap,
    Users,
    BookOpen,
    CalendarDays,
    MapPin,
    Mail,
    Phone,
    Globe,
    UserCheck,
    BriefcaseBusiness,
    TrendingUp,
    MoreHorizontal,
    ArrowUpRight,
    ArrowRight,
    Clock3,
    BookMarked,
    Award,
    FlaskConical,
    CheckCircle2,
    Pencil,
    FileText,
    Target,
    Layers3,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

// --------------------------------------------------
// Demo Data
// Replace with your API responses.
// --------------------------------------------------

const department = {
    name: "Computer Science & Engineering",
    shortName: "CSE",
    code: "CSE-001",
    status: "Active",
    established: "2012",
    faculty: "Faculty of Engineering",
    head: "Dr. Ayan Ahmed",
    email: "cse@university.edu",
    phone: "+880 1700-000000",
    location: "Academic Building, Floor 4",
    website: "https://university.edu/cse",
    description:
        "The Department of Computer Science & Engineering focuses on providing quality education, advanced research opportunities, and practical technical skills. Our mission is to prepare students to become innovative engineers, researchers, and technology leaders.",
};

const statistics = [
    {
        title: "Total Students",
        value: "1,284",
        subtitle: "Across all academic batches",
        icon: GraduationCap,
        color: "text-blue-600",
        bg: "bg-blue-500/10",
        growth: "+12.5%",
    },
    {
        title: "Faculty Members",
        value: "48",
        subtitle: "Full-time and part-time",
        icon: Users,
        color: "text-violet-600",
        bg: "bg-violet-500/10",
        growth: "+4.2%",
    },
    {
        title: "Academic Programs",
        value: "04",
        subtitle: "Active degree programs",
        icon: BookOpen,
        color: "text-emerald-600",
        bg: "bg-emerald-500/10",
        growth: "Active",
    },
    {
        title: "Active Courses",
        value: "36",
        subtitle: "Current academic semester",
        icon: BookMarked,
        color: "text-orange-600",
        bg: "bg-orange-500/10",
        growth: "+8.1%",
    },
];

const programs = [
    {
        name: "B.Sc. in Computer Science & Engineering",
        code: "BSC-CSE",
        duration: "4 Years",
        students: 980,
        status: "Active",
    },
    {
        name: "M.Sc. in Computer Science & Engineering",
        code: "MSC-CSE",
        duration: "2 Years",
        students: 180,
        status: "Active",
    },
    {
        name: "Diploma in Computer Technology",
        code: "DIP-CT",
        duration: "4 Years",
        students: 84,
        status: "Active",
    },
    {
        name: "Postgraduate Diploma in IT",
        code: "PGD-IT",
        duration: "1 Year",
        students: 40,
        status: "Active",
    },
];

const facultyMembers = [
    {
        name: "Dr. Sarah Ahmed",
        designation: "Professor",
        specialization: "Artificial Intelligence",
        email: "sarah@university.edu",
        initials: "SA",
    },
    {
        name: "Prof. Rahman",
        designation: "Associate Professor",
        specialization: "Database Systems",
        email: "rahman@university.edu",
        initials: "PR",
    },
    {
        name: "Dr. Nusrat Jahan",
        designation: "Assistant Professor",
        specialization: "Software Engineering",
        email: "nusrat@university.edu",
        initials: "NJ",
    },
    {
        name: "Md. Hasan",
        designation: "Lecturer",
        specialization: "Computer Networks",
        email: "hasan@university.edu",
        initials: "MH",
    },
];

const studentDistribution = [
    { label: "1st Year", students: 320, percentage: 25 },
    { label: "2nd Year", students: 350, percentage: 27 },
    { label: "3rd Year", students: 310, percentage: 24 },
    { label: "4th Year", students: 224, percentage: 17 },
    { label: "Postgraduate", students: 80, percentage: 7 },
];

const researchAreas = [
    "Artificial Intelligence & Machine Learning",
    "Data Science & Big Data Analytics",
    "Cybersecurity & Network Security",
    "Software Engineering",
    "Cloud Computing & Distributed Systems",
    "Human-Computer Interaction",
];

const activities = [
    {
        title: "New academic program approved",
        description: "M.Sc. in Computer Science & Engineering",
        time: "Today, 10:30 AM",
        icon: CheckCircle2,
    },
    {
        title: "Faculty member added",
        description: "Dr. Nusrat Jahan joined the department",
        time: "Yesterday",
        icon: UserCheck,
    },
    {
        title: "Research project registered",
        description: "AI-Based Educational Research",
        time: "November 4, 2026",
        icon: FlaskConical,
    },
];

export default function DepartmentOverview() {
    return (
        <div className="min-h-screen space-y-6 bg-background p-4 md:p-6 lg:p-8">

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="size-4" />
                        Department Management
                        <span>/</span>
                        Overview
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Department Overview
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        View your department profile, academic structure, faculty, and performance.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="gap-2">
                        <FileText className="size-4" />
                        Department Report
                    </Button>

                    <Button className="gap-2">
                        <Pencil className="size-4" />
                        Edit Department
                    </Button>
                </div>
            </div>

            {/* Department Profile Banner */}
            <Card className="overflow-hidden">
                <div className="h-2 bg-primary" />

                <CardContent className="p-5 md:p-7">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Building2 className="size-10" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-xl font-bold md:text-2xl">
                                        {department.name}
                                    </h2>

                                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                                        {department.status}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                    <span>
                                        Department Code:{" "}
                                        <strong className="text-foreground">
                                            {department.code}
                                        </strong>
                                    </span>

                                    <span>
                                        Short Name:{" "}
                                        <strong className="text-foreground">
                                            {department.shortName}
                                        </strong>
                                    </span>

                                    <span>
                                        Established:{" "}
                                        <strong className="text-foreground">
                                            {department.established}
                                        </strong>
                                    </span>
                                </div>

                                <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                                    {department.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <Badge variant="secondary">
                                        {department.faculty}
                                    </Badge>
                                    <Badge variant="outline">
                                        Academic Department
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex shrink-0 flex-col gap-3 rounded-xl border bg-muted/20 p-4 lg:min-w-[220px]">
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Department Head
                            </p>

                            <div className="flex items-center gap-3">
                                <Avatar className="size-11">
                                    <AvatarFallback>AA</AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className="text-sm font-semibold">
                                        {department.head}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Department Head
                                    </p>
                                </div>
                            </div>

                            <Button variant="outline" size="sm" className="w-full">
                                View Profile
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>

                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statistics.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.title}>
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <div className={`rounded-lg p-2 ${stat.bg}`}>
                                        <Icon className={`size-5 ${stat.color}`} />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <h3 className="text-3xl font-bold">
                                        {stat.value}
                                    </h3>

                                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                                        <ArrowUpRight className="size-3.5" />
                                        {stat.growth}
                                    </span>
                                </div>

                                <p className="mt-2 text-xs text-muted-foreground">
                                    {stat.subtitle}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-5">

                <TabsList className="h-auto flex-wrap justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="programs">Academic Programs</TabsTrigger>
                    <TabsTrigger value="faculty">Faculty</TabsTrigger>
                    <TabsTrigger value="research">Research Areas</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">

                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Department Information */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Department Information</CardTitle>
                                <CardDescription>
                                    Official contact and organizational details
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-5 sm:grid-cols-2">

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                            <Mail className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Official Email
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {department.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                            <Phone className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Contact Number
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {department.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                            <MapPin className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Department Location
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {department.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                            <Globe className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Website
                                            </p>
                                            <a
                                                href={department.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 block text-sm font-medium text-primary hover:underline"
                                            >
                                                Visit Department Website
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                            <CalendarDays className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Established
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {department.established}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                            <Layers3 className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Faculty
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {department.faculty}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>

                        {/* Student Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Distribution</CardTitle>
                                <CardDescription>
                                    Students by academic level
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                {studentDistribution.map((item) => (
                                    <div key={item.label} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.label}
                                            </span>
                                            <span className="font-semibold">
                                                {item.students}
                                            </span>
                                        </div>

                                        <Progress
                                            value={item.percentage}
                                            className="h-2"
                                        />
                                    </div>
                                ))}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Total Students
                                        </span>
                                        <span className="font-bold">1,284</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Academic Programs */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Academic Programs</CardTitle>
                                <CardDescription>
                                    Degree programs offered by the department
                                </CardDescription>
                            </div>

                            <Button variant="outline" size="sm">
                                Manage Programs
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </CardHeader>

                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left text-muted-foreground">
                                            <th className="pb-3 font-medium">Program Name</th>
                                            <th className="pb-3 font-medium">Program Code</th>
                                            <th className="pb-3 font-medium">Duration</th>
                                            <th className="pb-3 font-medium">Students</th>
                                            <th className="pb-3 font-medium">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {programs.map((program) => (
                                            <tr
                                                key={program.code}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4 font-medium">
                                                    {program.name}
                                                </td>
                                                <td className="py-4 text-muted-foreground">
                                                    {program.code}
                                                </td>
                                                <td className="py-4 text-muted-foreground">
                                                    {program.duration}
                                                </td>
                                                <td className="py-4 font-medium">
                                                    {program.students}
                                                </td>
                                                <td className="py-4">
                                                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                                                        {program.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Department Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Department Activities</CardTitle>
                            <CardDescription>
                                Latest organizational updates
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-5">
                                {activities.map((activity) => {
                                    const Icon = activity.icon;

                                    return (
                                        <div
                                            key={activity.title}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                                <Icon className="size-4" />
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-medium">
                                                    {activity.title}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {activity.description}
                                                </p>
                                            </div>

                                            <span className="whitespace-nowrap text-xs text-muted-foreground">
                                                {activity.time}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Programs Tab */}
                <TabsContent value="programs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Academic Programs</CardTitle>
                            <CardDescription>
                                All programs under this department
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {programs.map((program) => (
                                    <div
                                        key={program.code}
                                        className="rounded-xl border p-5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                                <BookOpen className="size-5" />
                                            </div>
                                            <Badge variant="outline">{program.status}</Badge>
                                        </div>

                                        <h3 className="mt-4 font-semibold">
                                            {program.name}
                                        </h3>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {program.code}
                                        </p>

                                        <div className="mt-5 flex justify-between border-t pt-4 text-sm">
                                            <span className="text-muted-foreground">
                                                Duration: {program.duration}
                                            </span>
                                            <span className="font-semibold">
                                                {program.students} Students
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Faculty Tab */}
                <TabsContent value="faculty">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Department Faculty</CardTitle>
                                <CardDescription>
                                    Faculty members and their specializations
                                </CardDescription>
                            </div>

                            <Button size="sm">
                                <UserCheck className="mr-2 size-4" />
                                Manage Faculty
                            </Button>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {facultyMembers.map((member) => (
                                    <div
                                        key={member.email}
                                        className="flex items-center gap-4 rounded-xl border p-4"
                                    >
                                        <Avatar className="size-12">
                                            <AvatarFallback>
                                                {member.initials}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold">
                                                {member.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {member.designation}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {member.specialization}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-primary">
                                                {member.email}
                                            </p>
                                        </div>

                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Research Tab */}
                <TabsContent value="research">
                    <Card>
                        <CardHeader>
                            <CardTitle>Research & Development</CardTitle>
                            <CardDescription>
                                Primary research areas of the department
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {researchAreas.map((area, index) => (
                                    <div
                                        key={area}
                                        className="rounded-xl border p-5 transition-colors hover:bg-muted/30"
                                    >
                                        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <FlaskConical className="size-5" />
                                        </div>

                                        <h3 className="font-semibold">{area}</h3>

                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Research Area {index + 1}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>

            {/* Department Mission */}
            <Card className="border-primary/20 bg-primary/[0.03]">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Target className="size-6" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold">Department Mission & Vision</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            To deliver quality education, promote innovative research,
                            encourage critical thinking, and prepare graduates to
                            contribute meaningfully to society and the global technology
                            industry.
                        </p>
                    </div>

                    <Button variant="outline" size="sm">
                        View Details
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
}
