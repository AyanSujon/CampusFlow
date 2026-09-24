import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Receipt,
  BarChart3,
  Bell,
  Settings2,
} from "lucide-react"


// ADMIN
export const adminRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "University Management",
    url: "/dashboard/students",
    icon: Building2,
    items: [
      { title: "Students", url: "/dashboard/students" },
      { title: "Instructors", url: "/dashboard/instructors" },
      { title: "Faculties", url: "/dashboard/faculties" },
      { title: "Departments", url: "/dashboard/departments" },
      { title: "Programs", url: "/dashboard/programs" },
    ],
  },
  {
    title: "Academic",
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
    ],
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: BarChart3,
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
    title: "Account",
    url: "/dashboard/settings",
    icon: Settings2,
    items: [
      { title: "Settings", url: "/dashboard/settings" },
    ],
  },
]