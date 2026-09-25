
// import {
//   LayoutDashboard,
//   GraduationCap,
//   UserRoundCheck,
//   Building2,
//   BookOpen,
//   BarChart3,
//   Bell,
//   Settings2,
// } from "lucide-react"



// // DEPARTMENT_HEAD
// export const departmentHeadRoutes = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//     isActive: true,
//   },
//   {
//     title: "Department Overview",
//     url: "/dashboard/department",
//     icon: Building2,
//   },
//   {
//     title: "Students",
//     url: "/dashboard/students",
//     icon: GraduationCap,
//   },
//   {
//     title: "Faculty",
//     url: "/dashboard/instructors",
//     icon: UserRoundCheck,
//   },
//   {
//     title: "Academic",
//     url: "/dashboard/courses",
//     icon: BookOpen,
//     items: [
//       { title: "Programs", url: "/dashboard/programs" },
//       { title: "Courses", url: "/dashboard/courses" },
//       { title: "Subjects", url: "/dashboard/subjects" },
//       { title: "Course Assignments", url: "/dashboard/course-assignments" },
//       { title: "Enrollments", url: "/dashboard/enrollments" },
//       { title: "Class Schedules", url: "/dashboard/schedules" },
//       { title: "Attendance", url: "/dashboard/attendance" },
//       { title: "Exams", url: "/dashboard/exams" },
//       { title: "Grades", url: "/dashboard/grades" },
//     ],
//   },
//   {
//     title: "Reports",
//     url: "/dashboard/reports/academic",
//     icon: BarChart3,
//     items: [
//       { title: "Academic Reports", url: "/dashboard/reports/academic" },
//       { title: "Student Performance", url: "/dashboard/reports/student-performance" },
//     ],
//   },
//   {
//     title: "Communication",
//     url: "/dashboard/notifications",
//     icon: Bell,
//     items: [
//       { title: "Notifications", url: "/dashboard/notifications" },
//     ],
//   },
//   {
//     title: "Account",
//     url: "/dashboard/profile",
//     icon: Settings2,
//     items: [
//       { title: "Profile", url: "/dashboard/profile" },
//       { title: "Settings", url: "/dashboard/settings" },
//     ],
//   },
// ]














import {
  LayoutDashboard,
  Building2,
  BookOpen,
  BarChart3,
  Bell,
  Settings2,
} from "lucide-react";

export const departmentHeadRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Department",
    url: "/department-head/department",
    icon: Building2,
    items: [
      {
        title: "Overview",
        url: "/department-head/department",
      },
      {
        title: "Students",
        url: "/department-head/students",
      },
      {
        title: "Faculty",
        url: "/department-head/instructors",
      },
    ],
  },

  {
    title: "Academic",
    url: "/department-head/academic",
    icon: BookOpen,
    items: [
      {
        title: "Overview",
        url: "/department-head/academic",
      },
      {
        title: "Programs",
        url: "/department-head/programs",
      },
      {
        title: "Courses",
        url: "/department-head/courses",
      },
      {
        title: "Subjects",
        url: "/department-head/subjects",
      },
      {
        title: "Course Assignments",
        url: "/department-head/course-assignments",
      },
      {
        title: "Enrollments",
        url: "/department-head/enrollments",
      },
      {
        title: "Class Schedules",
        url: "/department-head/schedules",
      },
      {
        title: "Attendance",
        url: "/department-head/attendance",
      },
      {
        title: "Exams",
        url: "/department-head/exams",
      },
      {
        title: "Grades",
        url: "/department-head/grades",
      },
    ],
  },

  {
    title: "Reports",
    url: "/department-head/reports",
    icon: BarChart3,
    items: [
      {
        title: "Overview",
        url: "/department-head/reports",
      },
      {
        title: "Academic Reports",
        url: "/department-head/reports/academic",
      },
      {
        title: "Student Performance",
        url: "/department-head/reports/student-performance",
      },
    ],
  },

  {
    title: "Communication",
    url: "/department-head/notifications",
    icon: Bell,
    items: [
      {
        title: "Notifications",
        url: "/department-head/notifications",
      },
    ],
  },

  {
    title: "Account",
    url: "/department-head/profile",
    icon: Settings2,
    items: [
      {
        title: "Profile",
        url: "/department-head/profile",
      },
      {
        title: "Settings",
        url: "/department-head/settings",
      },
    ],
  },
]