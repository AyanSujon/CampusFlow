import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Receipt,
  BarChart3,
  Bell,
  ShieldCheck,
} from "lucide-react"


// SUPER_ADMIN
export const superAdminRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "University Management",
    url: "/dashboard/users",
    icon: Building2,
    items: [
      { title: "Users", url: "/dashboard/users" },
      { title: "Students", url: "/dashboard/students" },
      { title: "Instructors", url: "/dashboard/instructors" },
      { title: "Faculties", url: "/dashboard/faculties" },
      { title: "Departments", url: "/dashboard/departments" },
      { title: "Programs", url: "/dashboard/programs" },
    ],
  },
  {
    title: "Academic Management",
    url: "/dashboard/courses",
    icon: BookOpen,
    items: [
      { title: "Academic Terms", url: "/dashboard/academic-terms" },
      { title: "Courses", url: "/dashboard/courses" },
      { title: "Subjects", url: "/dashboard/subjects" },
      { title: "Enrollments", url: "/dashboard/enrollments" },
      { title: "Class Schedules", url: "/dashboard/schedules" },
      { title: "Attendance", url: "/dashboard/attendance" },
      { title: "Exams", url: "/dashboard/exams" },
      { title: "Grades", url: "/dashboard/grades" },
    ],
  },
  {
    title: "Finance",
    url: "/dashboard/invoices",
    icon: Receipt,
    items: [
      { title: "Invoices", url: "/dashboard/invoices" },
      { title: "Payments", url: "/dashboard/payments" },
      { title: "Transactions", url: "/dashboard/transactions" },
    ],
  },
  {
    title: "Reports",
    url: "/dashboard/reports/academic",
    icon: BarChart3,
    items: [
      { title: "Academic Reports", url: "/dashboard/reports/academic" },
      { title: "Student Reports", url: "/dashboard/reports/students" },
      { title: "Financial Reports", url: "/dashboard/reports/financial" },
    ],
  },
  {
    title: "Communication",
    url: "/dashboard/notifications",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/dashboard/notifications" },
    ],
  },
  {
    title: "Administration",
    url: "/dashboard/audit-logs",
    icon: ShieldCheck,
    items: [
      { title: "Audit Logs", url: "/dashboard/audit-logs" },
      { title: "System Settings", url: "/dashboard/system-settings" },
    ],
  },
]
