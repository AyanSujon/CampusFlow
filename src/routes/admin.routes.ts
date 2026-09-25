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
  },
  {
    title: "University Management",
    url: "#",
    icon: Building2,
    items: [
      { title: "Students", url: "/admin/students" },
      { title: "Instructors", url: "/admin/instructors" },
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
    ],
  },
  {
    title: "Finance",
    url: "#",
    icon: Receipt,
    items: [
      { title: "Invoices", url: "/admin/invoices" },
      { title: "Payments", url: "/admin/payments" },
    ],
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Communication",
    url: "#",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/admin/notifications" },
    ],
  },
  {
    title: "Account",
    url: "#",
    icon: Settings2,
    items: [
      { title: "Settings", url: "/admin/settings" },
    ],
  },
]