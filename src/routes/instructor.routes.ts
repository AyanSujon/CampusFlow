import {
  LayoutDashboard,
  GraduationCap,
  School,
  BookOpen,
  ClipboardCheck,
  Bell,
  Settings2,
} from "lucide-react"



// INSTRUCTOR
export const instructorRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Teaching",
    url: "/dashboard/courses",
    icon: BookOpen,
    items: [
      { title: "My Courses", url: "/dashboard/courses" },
      { title: "My Classes", url: "/dashboard/classes" },
      { title: "Class Schedule", url: "/dashboard/schedules" },
    ],
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: GraduationCap,
    items: [
      { title: "My Students", url: "/dashboard/students" },
    ],
  },
  {
    title: "Academic",
    url: "/dashboard/attendance",
    icon: ClipboardCheck,
    items: [
      { title: "Attendance", url: "/dashboard/attendance" },
      { title: "Exams", url: "/dashboard/exams" },
      { title: "Grades", url: "/dashboard/grades" },
      { title: "Course Materials", url: "/dashboard/materials" },
    ],
  },
  {
    title: "Academic Information",
    url: "/dashboard/calendar",
    icon: School,
    items: [
      { title: "Academic Calendar", url: "/dashboard/calendar" },
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
    title: "Account",
    url: "/dashboard/profile",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/dashboard/profile" },
      { title: "Settings", url: "/dashboard/settings" },
    ],
  },
]
