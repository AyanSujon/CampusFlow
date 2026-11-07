



// import {
//   LayoutDashboard,
//   Building2,
//   BookOpen,
//   BarChart3,
//   Bell,
//   Settings2,
// } from "lucide-react";


// export const departmentHeadRoutes = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//   },

//   {
//     title: "Department",
//     url: "/department-head/department",
//     icon: Building2,
//     items: [
//       {
//         title: "Overview",
//         url: "/department-head/department",
//       },
//       {
//         title: "Students",
//         url: "/department-head/students",
//       },
//       {
//         title: "Faculty",
//         url: "/department-head/instructors",
//       },
//     ],
//   },

//   {
//     title: "Academic",
//     url: "/department-head/academic",
//     icon: BookOpen,
//     items: [
//       {
//         title: "Overview",
//         url: "/department-head/academic",
//       },
//       {
//         title: "Programs",
//         url: "/department-head/programs",
//       },
//       {
//         title: "Courses",
//         url: "/department-head/courses",
//       },
//       {
//         title: "Subjects",
//         url: "/department-head/subjects",
//       },
//       {
//         title: "Course Assignments",
//         url: "/department-head/course-assignments",
//       },
//       {
//         title: "Enrollments",
//         url: "/department-head/enrollments",
//       },
//       {
//         title: "Class Schedules",
//         url: "/department-head/schedules",
//       },
//       {
//         title: "Attendance",
//         url: "/department-head/attendance",
//       },
//       {
//         title: "Exams",
//         url: "/department-head/exams",
//       },
//       {
//         title: "Grades",
//         url: "/department-head/grades",
//       },
//     ],
//   },

//   {
//     title: "Reports",
//     url: "/department-head/reports",
//     icon: BarChart3,
//     items: [
//       {
//         title: "Overview",
//         url: "/department-head/reports",
//       },
//       {
//         title: "Academic Reports",
//         url: "/department-head/reports/academic",
//       },
//       {
//         title: "Student Performance",
//         url: "/department-head/reports/student-performance",
//       },
//     ],
//   },

//   {
//     title: "Communication",
//     url: "/department-head/notifications",
//     icon: Bell,
//     items: [
//       {
//         title: "Notifications",
//         url: "/department-head/notifications",
//       },
//     ],
//   },

//   {
//     title: "Account",
//     url: "/department-head/profile",
//     icon: Settings2,
//     items: [
//       {
//         title: "Profile",
//         url: "/department-head/profile",
//       },
//       {
//         title: "Settings",
//         url: "/department-head/settings",
//       },
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
  ClipboardCheck,
  Users,
  GraduationCap,
  FlaskConical,
  ShieldCheck,
  MessageSquare,
  CalendarDays,
  Wallet,
  FileText,
  BriefcaseBusiness,
  ClipboardList,
} from "lucide-react";

export const departmentHeadRoutes = [
  // Dashboard
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  // Department
  {
    title: "Department",
    url: "/department-head/department",
    icon: Building2,
    items: [
      {
        title: "Department Overview",
        url: "/department-head/department",
      },
      {
        title: "Faculty Members",
        url: "/department-head/department/faculty",
      },
      {
        title: "Students",
        url: "/department-head/department/students",
      },
      {
        title: "Programs",
        url: "/department-head/department/programs",
      },
    ],
  },

  // Academics
  {
    title: "Academics",
    url: "/department-head/academics",
    icon: BookOpen,
    items: [
      {
        title: "Courses",
        url: "/department-head/academics/courses",
      },
      {
        title: "Class Schedule",
        url: "/department-head/academics/schedule",
      },
      {
        title: "Attendance",
        url: "/department-head/academics/attendance",
      },
      {
        title: "Examinations",
        url: "/department-head/academics/examinations",
      },
      {
        title: "Results & Grades",
        url: "/department-head/academics/results",
      },
    ],
  },

  // Approvals & Requests
  {
    title: "Approvals & Requests",
    url: "/department-head/approvals",
    icon: ClipboardCheck,
    items: [
      {
        title: "Pending Approvals",
        url: "/department-head/approvals",
      },
      {
        title: "Course Approvals",
        url: "/department-head/approvals/courses",
      },
      {
        title: "Grade Approvals",
        url: "/department-head/approvals/grades",
      },
      {
        title: "Enrollment Requests",
        url: "/department-head/approvals/enrollments",
      },
      {
        title: "Schedule Changes",
        url: "/department-head/approvals/schedules",
      },
      {
        title: "Faculty Requests",
        url: "/department-head/approvals/faculty",
      },
    ],
  },

  // Research & Development
  {
    title: "Research & Development",
    url: "/department-head/research",
    icon: FlaskConical,
    items: [
      {
        title: "Research Projects",
        url: "/department-head/research/projects",
      },
      {
        title: "Publications",
        url: "/department-head/research/publications",
      },
      {
        title: "Research Proposals",
        url: "/department-head/research/proposals",
      },
      {
        title: "Research Funding",
        url: "/department-head/research/funding",
      },
      {
        title: "Conferences",
        url: "/department-head/research/conferences",
      },
    ],
  },

  // Quality Assurance
  {
    title: "Quality Assurance",
    url: "/department-head/quality",
    icon: ShieldCheck,
    items: [
      {
        title: "Course Evaluation",
        url: "/department-head/quality/course-evaluation",
      },
      {
        title: "Faculty Evaluation",
        url: "/department-head/quality/faculty-evaluation",
      },
      {
        title: "Academic Audit",
        url: "/department-head/quality/academic-audit",
      },
      {
        title: "Accreditation",
        url: "/department-head/quality/accreditation",
      },
      {
        title: "Improvement Plans",
        url: "/department-head/quality/improvement-plans",
      },
    ],
  },

  // Administration
  {
    title: "Administration",
    url: "/department-head/administration",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Department Budget",
        url: "/department-head/administration/budget",
      },
      {
        title: "Expenses",
        url: "/department-head/administration/expenses",
      },
      {
        title: "Assets & Equipment",
        url: "/department-head/administration/assets",
      },
      {
        title: "Documents",
        url: "/department-head/administration/documents",
      },
      {
        title: "Committees",
        url: "/department-head/administration/committees",
      },
    ],
  },

  // Reports & Analytics
  {
    title: "Reports & Analytics",
    url: "/department-head/reports",
    icon: BarChart3,
    items: [
      {
        title: "Academic Reports",
        url: "/department-head/reports/academic",
      },
      {
        title: "Faculty Reports",
        url: "/department-head/reports/faculty",
      },
      {
        title: "Student Reports",
        url: "/department-head/reports/students",
      },
      {
        title: "Financial Reports",
        url: "/department-head/reports/financial",
      },
    ],
  },

  // Communication
  {
    title: "Communication",
    url: "/department-head/communication",
    icon: MessageSquare,
    items: [
      {
        title: "Announcements",
        url: "/department-head/communication/announcements",
      },
      {
        title: "Messages",
        url: "/department-head/communication/messages",
      },
      {
        title: "Notifications",
        url: "/department-head/communication/notifications",
      },
    ],
  },

  // Events & Calendar
  {
    title: "Events & Calendar",
    url: "/department-head/events",
    icon: CalendarDays,
    items: [
      {
        title: "Academic Calendar",
        url: "/department-head/events/calendar",
      },
      {
        title: "Department Events",
        url: "/department-head/events/department",
      },
      {
        title: "Meetings",
        url: "/department-head/events/meetings",
      },
    ],
  },

  // Staff & Faculty
  {
    title: "Staff & Faculty",
    url: "/department-head/staff",
    icon: Users,
    items: [
      {
        title: "Faculty Directory",
        url: "/department-head/staff/faculty",
      },
      {
        title: "Staff Directory",
        url: "/department-head/staff/directory",
      },
      {
        title: "Faculty Workload",
        url: "/department-head/staff/workload",
      },
      {
        title: "Leave Requests",
        url: "/department-head/staff/leave-requests",
      },
    ],
  },

  // Student Management
  {
    title: "Student Management",
    url: "/department-head/students",
    icon: GraduationCap,
    items: [
      {
        title: "Student Directory",
        url: "/department-head/students",
      },
      {
        title: "Enrollment",
        url: "/department-head/students/enrollment",
      },
      {
        title: "Academic Progress",
        url: "/department-head/students/progress",
      },
      {
        title: "Advising",
        url: "/department-head/students/advising",
      },
    ],
  },

  // Finance
  {
    title: "Finance",
    url: "/department-head/finance",
    icon: Wallet,
    items: [
      {
        title: "Budget Overview",
        url: "/department-head/finance/budget",
      },
      {
        title: "Transactions",
        url: "/department-head/finance/transactions",
      },
      {
        title: "Scholarships",
        url: "/department-head/finance/scholarships",
      },
    ],
  },

  // Documents
  {
    title: "Documents & Resources",
    url: "/department-head/documents",
    icon: FileText,
    items: [
      {
        title: "Department Documents",
        url: "/department-head/documents",
      },
      {
        title: "Policies",
        url: "/department-head/documents/policies",
      },
      {
        title: "Templates",
        url: "/department-head/documents/templates",
      },
    ],
  },

  // Tasks
  {
    title: "Tasks & Activities",
    url: "/department-head/tasks",
    icon: ClipboardList,
    items: [
      {
        title: "My Tasks",
        url: "/department-head/tasks",
      },
      {
        title: "Assigned Tasks",
        url: "/department-head/tasks/assigned",
      },
      {
        title: "Task History",
        url: "/department-head/tasks/history",
      },
    ],
  },

  // Notifications
  {
    title: "Notifications",
    url: "/department-head/notifications",
    icon: Bell,
  },

  // Settings
  {
    title: "Settings",
    url: "/department-head/settings",
    icon: Settings2,
  },
];
