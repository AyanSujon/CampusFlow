import {
  LayoutDashboard,
  School,
  BookOpen,
  Receipt,
  Settings2,
} from "lucide-react"



// STUDENT
export const studentRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "My Academics",
    url: "/dashboard/courses",
    icon: BookOpen,
    items: [
      { title: "My Program", url: "/dashboard/program" },
      { title: "My Courses", url: "/dashboard/courses" },
      { title: "Course Registration", url: "/dashboard/enrollments" },
      { title: "Class Schedule", url: "/dashboard/schedules" },
      { title: "Attendance", url: "/dashboard/attendance" },
      { title: "Exams", url: "/dashboard/exams" },
      { title: "Results / Grades", url: "/dashboard/grades" },
      { title: "Academic Transcript", url: "/dashboard/transcript" },
    ],
  },
  {
    title: "Finance",
    url: "/dashboard/invoices",
    icon: Receipt,
    items: [
      { title: "My Invoices", url: "/dashboard/invoices" },
      { title: "Payment History", url: "/dashboard/payments/history" },
      { title: "Make Payment", url: "/dashboard/payments/new" },
    ],
  },
  {
    title: "University",
    url: "/dashboard/calendar",
    icon: School,
    items: [
      { title: "Academic Calendar", url: "/dashboard/calendar" },
      { title: "Notifications", url: "/dashboard/notifications" },
    ],
  },
  {
    title: "Account",
    url: "/dashboard/profile",
    icon: Settings2,
    items: [
      { title: "My Profile", url: "/dashboard/profile" },
      { title: "Settings", url: "/dashboard/settings" },
    ],
  },
]
