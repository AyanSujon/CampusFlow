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
    url: "/instructor",
    icon: LayoutDashboard,
  },
  {
    title: "Teaching",
    url: "/instructor/courses",
    icon: BookOpen,
    items: [
      { title: "My Courses", url: "/instructor/courses" },
      { title: "My Classes", url: "/instructor/classes" },
      { title: "Class Schedule", url: "/instructor/schedules" },
    ],
  },
  {
    title: "Students",
    url: "/instructor/students",
    icon: GraduationCap,
    items: [
      { title: "My Students", url: "/instructor/students" },
    ],
  },
  {
    title: "Academic",
    url: "/instructor/attendance",
    icon: ClipboardCheck,
    items: [
      { title: "Attendance", url: "/instructor/attendance" },
      { title: "Exams", url: "/instructor/exams" },
      { title: "Grades", url: "/instructor/grades" },
      { title: "Course Materials", url: "/instructor/materials" },
    ],
  },
  {
    title: "Academic Information",
    url: "/instructor/calendar",
    icon: School,
    items: [
      { title: "Academic Calendar", url: "/instructor/calendar" },
    ],
  },
  {
    title: "Communication",
    url: "/instructor/notifications",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/instructor/notifications" },
    ],
  },
  {
    title: "Account",
    url: "/instructor/profile",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/instructor/profile" },
      { title: "Settings", url: "/instructor/settings" },
    ],
  },
]
