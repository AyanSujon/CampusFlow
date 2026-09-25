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
    url: "/super-admin",
    icon: LayoutDashboard,
  },
  {
    title: "University Management",
    url: "/super-admin/users",
    icon: Building2,
    items: [
      { title: "Users", url: "/super-admin/users" },
      { title: "Students", url: "/super-admin/students" },
      { title: "Instructors", url: "/super-admin/instructors" },
      { title: "Faculties", url: "/super-admin/faculties" },
      { title: "Departments", url: "/super-admin/departments" },
      { title: "Programs", url: "/super-admin/programs" },
    ],
  },
  {
    title: "Academic Management",
    url: "/super-admin/courses",
    icon: BookOpen,
    items: [
      { title: "Academic Terms", url: "/super-admin/academic-terms" },
      { title: "Courses", url: "/super-admin/courses" },
      { title: "Subjects", url: "/super-admin/subjects" },
      { title: "Enrollments", url: "/super-admin/enrollments" },
      { title: "Class Schedules", url: "/super-admin/schedules" },
      { title: "Attendance", url: "/super-admin/attendance" },
      { title: "Exams", url: "/super-admin/exams" },
      { title: "Grades", url: "/super-admin/grades" },
    ],
  },
  {
    title: "Finance",
    url: "/super-admin/invoices",
    icon: Receipt,
    items: [
      { title: "Invoices", url: "/super-admin/invoices" },
      { title: "Payments", url: "/super-admin/payments" },
      { title: "Transactions", url: "/super-admin/transactions" },
    ],
  },
  {
    title: "Reports",
    url: "/super-admin/reports/academic",
    icon: BarChart3,
    items: [
      { title: "Academic Reports", url: "/super-admin/reports/academic" },
      { title: "Student Reports", url: "/super-admin/reports/students" },
      { title: "Financial Reports", url: "/super-admin/reports/financial" },
    ],
  },
  {
    title: "Communication",
    url: "/super-admin/notifications",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/super-admin/notifications" },
    ],
  },
  {
    title: "Administration",
    url: "/super-admin/audit-logs",
    icon: ShieldCheck,
    items: [
      { title: "Audit Logs", url: "/super-admin/audit-logs" },
      { title: "System Settings", url: "/super-admin/system-settings" },
    ],
  },
]
