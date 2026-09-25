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
    url: "/student",
    icon: LayoutDashboard,
  },
  {
    title: "My Academics",
    url: "/student/courses",
    icon: BookOpen,
    items: [
      { title: "My Program", url: "/student/program" },
      { title: "My Courses", url: "/student/courses" },
      { title: "Course Registration", url: "/student/enrollments" },
      { title: "Class Schedule", url: "/student/schedules" },
      { title: "Attendance", url: "/student/attendance" },
      { title: "Exams", url: "/student/exams" },
      { title: "Results / Grades", url: "/student/grades" },
      { title: "Academic Transcript", url: "/student/transcript" },
    ],
  },
  {
    title: "Finance",
    url: "/student/invoices",
    icon: Receipt,
    items: [
      { title: "My Invoices", url: "/student/invoices" },
      { title: "Payment History", url: "/student/payments/history" },
      { title: "Make Payment", url: "/student/payments/new" },
    ],
  },
  {
    title: "University",
    url: "/student/calendar",
    icon: School,
    items: [
      { title: "Academic Calendar", url: "/student/calendar" },
      { title: "Notifications", url: "/student/notifications" },
    ],
  },
  {
    title: "Account",
    url: "/student/profile",
    icon: Settings2,
    items: [
      { title: "My Profile", url: "/student/profile" },
      { title: "Settings", url: "/student/settings" },
    ],
  },
]
