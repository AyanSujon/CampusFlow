// import {
//   LayoutDashboard,
//   Building2,
//   BookOpen,
//   Receipt,
//   BarChart3,
//   Bell,
//   Settings2,
// } from "lucide-react"


// // ADMIN
// export const adminRoutes = [
//   {
//     title: "Dashboard",
//     url: "/admin",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "University Management",
//     url: "#",
//     icon: Building2,
//     items: [
//       { title: "Students", url: "/admin/students" },
//       { title: "Instructors", url: "/admin/instructors" },
//       { title: "Faculties", url: "/admin/faculties" },
//       { title: "Departments", url: "/admin/departments" },
//       { title: "Programs", url: "/admin/programs" },
//     ],
//   },
//   {
//     title: "Academic",
//     url: "#",
//     icon: BookOpen,
//     items: [
//       { title: "Academic Terms", url: "/admin/academic-terms" },
//       { title: "Courses", url: "/admin/courses" },
//       { title: "Subjects", url: "/admin/subjects" },
//       { title: "Enrollments", url: "/admin/enrollments" },
//       { title: "Class Schedules", url: "/admin/schedules" },
//       { title: "Attendance", url: "/admin/attendance" },
//       { title: "Exams", url: "/admin/exams" },
//       { title: "Grades", url: "/admin/grades" },
//     ],
//   },
//   {
//     title: "Finance",
//     url: "#",
//     icon: Receipt,
//     items: [
//       { title: "Invoices", url: "/admin/invoices" },
//       { title: "Payments", url: "/admin/payments" },
//     ],
//   },
//   {
//     title: "Reports",
//     url: "/admin/reports",
//     icon: BarChart3,
//   },
//   {
//     title: "Communication",
//     url: "#",
//     icon: Bell,
//     items: [
//       { title: "Notifications", url: "/admin/notifications" },
//     ],
//   },
//   {
//     title: "Account",
//     url: "#",
//     icon: Settings2,
//     items: [
//       { title: "Settings", url: "/admin/settings" },
//     ],
//   },
// ]



















import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Receipt,
  BarChart3,
  Bell,
  Settings2,
  Users,
  ShieldCheck,
  ClipboardCheck,
  Wallet,
  FileText,
  Megaphone,
} from "lucide-react";

// ADMIN
export const adminRoutes = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "University Management",
    url: "#",
    icon: Building2,
    items: [
      { title: "Users", url: "/admin/users" },
      { title: "Students", url: "/admin/students" },
      { title: "Instructors", url: "/admin/instructors" },
      {
        title: "Instructor Verification",
        url: "/admin/instructor-verification",
      },
      { title: "Faculties", url: "/admin/faculties" },
      { title: "Departments", url: "/admin/departments" },
      { title: "Programs", url: "/admin/programs" },
    ],
  },

  {
    title: "Academic",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Academic Terms", url: "/admin/academic-terms" },
      { title: "Courses", url: "/admin/courses" },
      { title: "Subjects", url: "/admin/subjects" },
      { title: "Enrollments", url: "/admin/enrollments" },
      { title: "Class Schedules", url: "/admin/schedules" },
      { title: "Attendance", url: "/admin/attendance" },
      { title: "Exams", url: "/admin/exams" },
      { title: "Grades", url: "/admin/grades" },
      { title: "Grade Scales", url: "/admin/grade-scales" },
      { title: "Transcripts", url: "/admin/transcripts" },
    ],
  },

  {
    title: "Finance",
    url: "#",
    icon: Receipt,
    items: [
      { title: "Invoices", url: "/admin/invoices" },
      { title: "Payments", url: "/admin/payments" },
      { title: "Transactions", url: "/admin/transactions" },
      { title: "Outstanding Fees", url: "/admin/outstanding-fees" },
      { title: "Scholarships", url: "/admin/scholarships" },
      { title: "Refunds", url: "/admin/refunds" },
    ],
  },

  {
    title: "Reports",
    url: "/admin/reports",
    icon: BarChart3,
    items: [
      { title: "Overview", url: "/admin/reports" },
      { title: "Academic Reports", url: "/admin/reports/academic" },
      { title: "Enrollment Reports", url: "/admin/reports/enrollment" },
      { title: "Attendance Reports", url: "/admin/reports/attendance" },
      { title: "Financial Reports", url: "/admin/reports/financial" },
      { title: "Course Reports", url: "/admin/reports/courses" },
      { title: "Instructor Reports", url: "/admin/reports/instructors" },
    ],
  },

  {
    title: "Communication",
    url: "#",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/admin/notifications" },
      { title: "Announcements", url: "/admin/announcements" },
    ],
  },

  {
    title: "Security & Access",
    url: "#",
    icon: ShieldCheck,
    items: [
      { title: "Roles & Permissions", url: "/admin/roles-permissions" },
      { title: "Audit Logs", url: "/admin/audit-logs" },
    ],
  },

  {
    title: "Account",
    url: "#",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/admin/profile" },
      { title: "Settings", url: "/admin/settings" },
    ],
  },
];
