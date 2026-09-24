# CampusFlow — Dashboard Navigation Architecture

Role-based sidebar/navigation structure for the CampusFlow Next.js App
Router dashboard, built strictly from the actual schema (Units 1–9),
API contract (`API_INSTRUCTION.md`), and the six roles' real
responsibilities (`ORGANIZATIONAL_HIERARCHY.md`) — nothing invented.

**One reconciliation with a generic "shared `/dashboard/*`" layout:**
`FRONTEND_IMPLEMENTATION_GUIDE.md` already established **per-role route
segments** (`/admin`, `/department`, `/instructor`, `/student`,
`/accountant`) with a `middleware.ts` guard keyed on exactly those
prefixes. This document keeps that structure rather than a single shared
`/dashboard/*` tree, so it stays consistent with the middleware, the
`(dashboard)/` folder layout, and the `NAV_BY_ROLE` config already in
that guide — this document extends `NAV_BY_ROLE`, it doesn't replace the
routing model underneath it. `SUPER_ADMIN` and `ADMIN` continue to share
the `/admin/*` prefix (as already decided), differing only in which nav
items and which specific pages they can reach — not in URL namespace.

Two features requested in spirit but with no backing schema table today
are marked **optional/future** rather than treated as shipped: **Course
Materials** and **Academic Transcript**. Both are called out explicitly
where they'd otherwise appear.

---

## 1. Global Route Architecture

```
/(auth)
├── /login
└── /register

/(dashboard)
├── /admin                          — SUPER_ADMIN + ADMIN (shared prefix, item-level gating)
│   ├── /admin                       (dashboard home)
│   ├── /admin/users
│   │   └── /admin/users/[id]
│   ├── /admin/users/[id]/permissions        (SUPER_ADMIN only)
│   ├── /admin/faculties
│   │   └── /admin/faculties/[id]
│   ├── /admin/departments
│   │   └── /admin/departments/[id]
│   ├── /admin/programs
│   │   └── /admin/programs/[id]
│   ├── /admin/courses
│   │   ├── /admin/courses/[id]
│   │   └── /admin/courses/[id]/instructors   (assign/unassign)
│   ├── /admin/subjects
│   ├── /admin/academic-terms
│   │   ├── /admin/academic-terms/sessions
│   │   └── /admin/academic-terms/semesters
│   ├── /admin/schedules
│   ├── /admin/enrollments
│   ├── /admin/attendance
│   ├── /admin/exams
│   ├── /admin/grades
│   ├── /admin/results
│   ├── /admin/invoices
│   ├── /admin/payments
│   ├── /admin/scholarships
│   ├── /admin/reports
│   ├── /admin/notices
│   ├── /admin/events
│   ├── /admin/audit-logs                     (ADMIN: scoped, excludes SUPER_ADMIN actions)
│   ├── /admin/system-settings                (SUPER_ADMIN only)
│   └── /admin/settings                        (own profile)
│
├── /department                      — DEPARTMENT_HEAD
│   ├── /department                   (department overview)
│   ├── /department/instructors
│   │   └── /department/instructors/[id]
│   ├── /department/students
│   │   └── /department/students/[id]
│   ├── /department/programs
│   ├── /department/courses
│   │   ├── /department/courses/[id]
│   │   └── /department/courses/[id]/assign-instructor
│   ├── /department/subjects
│   ├── /department/schedules
│   ├── /department/enrollments
│   ├── /department/attendance
│   ├── /department/exams
│   ├── /department/grades
│   ├── /department/results
│   ├── /department/reports
│   ├── /department/notices
│   └── /department/settings
│
├── /instructor                      — INSTRUCTOR
│   ├── /instructor                   (dashboard home)
│   ├── /instructor/courses            (assigned courses — read)
│   ├── /instructor/sections           ("My Classes" — assigned sections)
│   │   └── /instructor/sections/[id]/students
│   ├── /instructor/schedule
│   ├── /instructor/attendance
│   ├── /instructor/assignments
│   │   └── /instructor/assignments/[id]/submissions
│   ├── /instructor/exams
│   ├── /instructor/grades
│   ├── /instructor/results
│   ├── /instructor/materials           (OPTIONAL — no backing table yet)
│   ├── /instructor/events
│   └── /instructor/settings
│
├── /student                         — STUDENT
│   ├── /student                      (dashboard home)
│   ├── /student/profile
│   ├── /student/program               (read-only)
│   ├── /student/courses
│   ├── /student/enrollments            ("Course Registration")
│   ├── /student/schedule
│   ├── /student/attendance
│   ├── /student/assignments
│   ├── /student/exams
│   ├── /student/results
│   ├── /student/transcript             (OPTIONAL — aggregated view, no dedicated table)
│   ├── /student/invoices
│   ├── /student/payments
│   ├── /student/scholarships
│   ├── /student/events                 ("Academic Calendar")
│   └── /student/settings
│
└── /accountant                      — ACCOUNTANT
    ├── /accountant                    (dashboard home)
    ├── /accountant/students            (financial-relevant fields only)
    ├── /accountant/invoices             (Outstanding Fees = ?status=OVERDUE filter, not a separate route)
    ├── /accountant/payments             (Payment History = this same page, not separate)
    ├── /accountant/transactions
    ├── /accountant/scholarships
    ├── /accountant/reports
    └── /accountant/settings
```

**Design Rule 2 applied:** "Outstanding Fees" and "Payment History" from
the brief are **not** separate nav items — they're filtered views of
`/accountant/invoices` (`?status=OVERDUE`) and `/accountant/payments`
respectively, exactly the kind of duplicate-menu-item-for-a-sub-page
pattern the brief itself asks to avoid.

---

## 2. SUPER_ADMIN Navigation

### Overview
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Dashboard | `/admin` | `LayoutDashboard` | System-wide KPIs: user counts, pending approvals, financial summary |

### Administration
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Users | `/admin/users` | `Users` | Full CRUD on every user, role changes, suspend/restore |
| Permissions | `/admin/users/[id]/permissions` | `ShieldCheck` | Grant/revoke an `ADMIN` account's resource permissions (R-8) |
| Audit Log | `/admin/audit-logs` | `History` | Unrestricted — every actor, every action |
| System Settings | `/admin/system-settings` | `Settings2` | Global config, including non-public/security-relevant keys |

### Organization
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Faculties | `/admin/faculties` | `Landmark` | Create/manage faculties, assign deans |
| Departments | `/admin/departments` | `Building2` | Create/manage departments, assign department heads |
| Programs | `/admin/programs` | `Library` | Degree programs per department |

### Academic
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Courses | `/admin/courses` | `BookOpen` | Course catalog, instructor assignment |
| Subjects | `/admin/subjects` | `BookMarked` | Reusable subject definitions |
| Academic Terms | `/admin/academic-terms` | `CalendarRange` | Sessions and semesters, mark current term |
| Schedules | `/admin/schedules` | `CalendarDays` | Weekly class-schedule oversight |
| Enrollments | `/admin/enrollments` | `ClipboardList` | University-wide enrollment oversight |
| Attendance | `/admin/attendance` | `ClipboardCheck` | Oversight/reporting only |
| Exams | `/admin/exams` | `FileQuestion` | Oversight only |
| Grades | `/admin/grades` | `ChartNoAxesColumn` | Oversight only |
| Results | `/admin/results` | `FileCheck2` | Publish approved results; full oversight |

### Students & Staff
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Students | `/admin/students` | `GraduationCap` | Full student directory |
| Instructors | `/admin/instructors` | `UserRoundCheck` | Full instructor directory |

### Finance
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Invoices | `/admin/invoices` | `Receipt` | Oversight |
| Payments | `/admin/payments` | `CreditCard` | Oversight |
| Scholarships | `/admin/scholarships` | `HandCoins` | Oversight |
| Reports | `/admin/reports` | `BarChart3` | University-wide academic + financial reports |

### Communication
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Notices | `/admin/notices` | `Megaphone` | University-wide notices |
| Events | `/admin/events` | `CalendarHeart` | University-wide events |

### Account
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Settings | `/admin/settings` | `Settings2` | Own profile, MFA, IP allowlist (`SuperAdminProfile`) |

---

## 3. ADMIN Navigation

Same shell as `SUPER_ADMIN` (`/admin/*`), with **Permissions** and
**System Settings** removed, and **Audit Log** scoped (excludes
`SUPER_ADMIN` actor rows).

### Overview
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Dashboard | `/admin` | `LayoutDashboard` | Operational KPIs |

### Administration
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Users | `/admin/users` | `Users` | Manage non-`SUPER_ADMIN` users; create other `ADMIN`s with default permissions only |
| Audit Log | `/admin/audit-logs` | `History` | Scoped — own-tier and below only |

### Organization
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Faculties | `/admin/faculties` | `Landmark` | Manage |
| Departments | `/admin/departments` | `Building2` | Manage, assign department heads |
| Programs | `/admin/programs` | `Library` | Manage |

### Academic
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Courses | `/admin/courses` | `BookOpen` | Manage, assign instructors |
| Subjects | `/admin/subjects` | `BookMarked` | Manage |
| Academic Terms | `/admin/academic-terms` | `CalendarRange` | Manage sessions/semesters |
| Schedules | `/admin/schedules` | `CalendarDays` | Manage |
| Enrollments | `/admin/enrollments` | `ClipboardList` | Review/approve exceptions |
| Attendance | `/admin/attendance` | `ClipboardCheck` | Read |
| Exams | `/admin/exams` | `FileQuestion` | Read |
| Grades | `/admin/grades` | `ChartNoAxesColumn` | Read |
| Results | `/admin/results` | `FileCheck2` | Publish approved results |

### Students & Staff
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Students | `/admin/students` | `GraduationCap` | Manage |
| Instructors | `/admin/instructors` | `UserRoundCheck` | Manage |

### Finance
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Invoices | `/admin/invoices` | `Receipt` | Read |
| Payments | `/admin/payments` | `CreditCard` | Read |
| Scholarships | `/admin/scholarships` | `HandCoins` | Read |
| Reports | `/admin/reports` | `BarChart3` | Read/generate |

### Communication
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Notices | `/admin/notices` | `Megaphone` | Manage (university/faculty scope) |
| Events | `/admin/events` | `CalendarHeart` | Manage (university/faculty scope) |

### Account
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Settings | `/admin/settings` | `Settings2` | Own profile |

---

## 4. DEPARTMENT_HEAD Navigation

Everything below is implicitly scoped to the caller's own department
(R-2) — the backend filters data; the nav items themselves are the same
shape as `ADMIN`'s, just without any university-wide item.

### Overview
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Dashboard | `/department` | `LayoutDashboard` | Department KPIs — pending approvals, instructor load |

### Department
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Instructors | `/department/instructors` | `UserRoundCheck` | Manage department instructors |
| Students | `/department/students` | `GraduationCap` | Read department students |
| Programs | `/department/programs` | `Library` | Read |

### Academic
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Courses | `/department/courses` | `BookOpen` | Manage, assign instructors (own dept) |
| Subjects | `/department/subjects` | `BookMarked` | Read |
| Schedules | `/department/schedules` | `CalendarDays` | Manage |
| Enrollments | `/department/enrollments` | `ClipboardList` | Approve/reject |
| Attendance | `/department/attendance` | `ClipboardCheck` | Read |
| Exams | `/department/exams` | `FileQuestion` | Read |
| Grades | `/department/grades` | `ChartNoAxesColumn` | Read |
| Results | `/department/results` | `FileCheck2` | Approve/reject submitted results |

### Reports & Communication
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Reports | `/department/reports` | `BarChart3` | Department academic reports |
| Notices | `/department/notices` | `Megaphone` | Department-scoped notices |

### Account
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Settings | `/department/settings` | `Settings2` | Own profile |

---

## 5. INSTRUCTOR Navigation

Everything scoped to sections the instructor is assigned to via
`CourseInstructor` (R-3) — no administrative modules at all.

### Overview
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Dashboard | `/instructor` | `LayoutDashboard` | Today's classes, pending grading |

### Teaching
| Label | Route | Icon | Purpose |
|---|---|---|---|
| My Courses | `/instructor/courses` | `BookOpen` | Assigned courses (read) |
| My Classes | `/instructor/sections` | `Users` | Assigned sections and rosters |
| Class Schedule | `/instructor/schedule` | `CalendarDays` | Own weekly schedule |

### Academic Activity
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Attendance | `/instructor/attendance` | `ClipboardCheck` | Mark/edit attendance for own sections |
| Assignments | `/instructor/assignments` | `FileEdit` | Create assignments, review submissions, grade |
| Exams | `/instructor/exams` | `FileQuestion` | Create/manage exams |
| Grades | `/instructor/grades` | `ChartNoAxesColumn` | Enter per-exam marks |
| Results | `/instructor/results` | `FileCheck2` | Create draft results, submit for approval |
| Course Materials *(optional)* | `/instructor/materials` | `FolderOpen` | Not in current schema — flagged as future work, not a shipped feature |

### Calendar
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Academic Calendar | `/instructor/events` | `CalendarHeart` | University/faculty/department events relevant to instructor |

### Account
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Settings | `/instructor/settings` | `Settings2` | Own profile |

---

## 6. STUDENT Navigation

Everything scoped to the caller's own `StudentProfile` (R-1) — no
visibility into any other student's data anywhere in this nav.

### Overview
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Dashboard | `/student` | `LayoutDashboard` | Today's schedule, pending fees, recent results |

### Academics
| Label | Route | Icon | Purpose |
|---|---|---|---|
| My Profile | `/student/profile` | `CircleUserRound` | Editable self-service fields |
| My Program | `/student/program` | `Library` | Read-only program info |
| My Courses | `/student/courses` | `BookOpen` | Enrolled sections |
| Course Registration | `/student/enrollments` | `ClipboardList` | Browse sections, request enrollment, track status |
| Class Schedule | `/student/schedule` | `CalendarDays` | Own weekly schedule |
| Attendance | `/student/attendance` | `ClipboardCheck` | Own attendance history |
| Assignments | `/student/assignments` | `FileEdit` | View + submit assignments |
| Exams | `/student/exams` | `FileQuestion` | Upcoming exams for enrolled sections |
| Results | `/student/results` | `FileCheck2` | Published results only |
| Academic Transcript *(optional)* | `/student/transcript` | `FileBadge2` | Aggregated view across all `PUBLISHED` results — no dedicated schema table yet, computed from `Result` |

### Finance
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Invoices | `/student/invoices` | `Receipt` | Own invoices |
| Payments | `/student/payments` | `CreditCard` | Initiate/track payments |
| Scholarships | `/student/scholarships` | `HandCoins` | Apply, track status |

### Calendar
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Academic Calendar | `/student/events` | `CalendarHeart` | University/faculty/department/section events |

### Account
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Settings | `/student/settings` | `Settings2` | Password, notification preferences |

---

## 7. ACCOUNTANT Navigation

Purely financial — zero academic modules, matching the isolation rule
(R-4).

### Overview
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Dashboard | `/accountant` | `LayoutDashboard` | Outstanding balance total, pending verifications |

### Finance
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Students | `/accountant/students` | `GraduationCap` | Billing-relevant fields only (`studentId`, `academicStatus`) |
| Invoices | `/accountant/invoices` | `Receipt` | Create/manage; filter `?status=OVERDUE` for "Outstanding Fees" |
| Payments | `/accountant/payments` | `CreditCard` | Verify/reconcile; this page *is* "Payment History" |
| Transactions | `/accountant/transactions` | `ArrowLeftRight` | Read-only append-only ledger (`FinancialTransaction`) |
| Scholarships | `/accountant/scholarships` | `HandCoins` | Approve applications |
| Reports | `/accountant/reports` | `BarChart3` | Generate/export financial reports |

### Account
| Label | Route | Icon | Purpose |
|---|---|---|---|
| Settings | `/accountant/settings` | `Settings2` | Own profile |

---

## 8. Shared Routes

Same underlying page component, mounted at each role's prefix, rendering
role-scoped data because the API call — not the component — determines
what comes back:

| Concept | Shared across | Notes |
|---|---|---|
| Attendance | `ADMIN`, `DEPARTMENT_HEAD`, `INSTRUCTOR`, `STUDENT` | Same `AttendanceTable` component; `INSTRUCTOR` gets write access, everyone else read-only |
| Exams / Grades | `ADMIN`, `DEPARTMENT_HEAD`, `INSTRUCTOR`, `STUDENT` | Same pattern — write scoped to `INSTRUCTOR` via R-3 |
| Results | `ADMIN`, `DEPARTMENT_HEAD`, `INSTRUCTOR`, `STUDENT` | Same `ResultsTable`/`StatusBadge`, different action buttons per role (§10 of `API_INSTRUCTION.md`) |
| Courses / Subjects | `ADMIN`, `DEPARTMENT_HEAD`, `INSTRUCTOR` (read), `STUDENT` (read) | `ADMIN` gets full CRUD, others get scoped read/manage |
| Schedules | `ADMIN`, `DEPARTMENT_HEAD`, `INSTRUCTOR`, `STUDENT` | |
| Notices / Events | Every role | Server filters by scope automatically |
| Settings | Every role | Same shell (`Settings2` icon), field set differs — `SUPER_ADMIN` gets MFA/IP fields, others don't |
| Enrollments | `ADMIN`, `DEPARTMENT_HEAD` (approve), `INSTRUCTOR` (read), `STUDENT` (create/read own) | One `EnrollmentsTable`, action column conditional on role |
| Invoices / Payments / Scholarships | `ADMIN` (read), `STUDENT` (own), `ACCOUNTANT` (manage) | |

Building one shared component per resource (matching
`FRONTEND_IMPLEMENTATION_GUIDE.md`'s `features/<unit>/<resource>/`
folders) rather than one page per role is what makes this list possible
— the role only changes *props/permissions passed in*, never the
component itself.

---

## 9. Role Permission Matrix

`Full Access` / `Manage` / `Read` / `Own Data` / `No Access` — consistent
with the Role Capability Matrix already in `ORGANIZATIONAL_HIERARCHY.md`
§3, reduced to the modules this navigation surfaces.

| Module | SUPER_ADMIN | ADMIN | DEPARTMENT_HEAD | INSTRUCTOR | STUDENT | ACCOUNTANT |
|---|---|---|---|---|---|---|
| Users | Full Access | Manage | Read (own dept) | Own Data | Own Data | Own Data |
| Faculties | Full Access | Manage | Read | Read | Read | Read |
| Departments | Full Access | Manage | Read/Manage (own) | Read | Read | Read |
| Programs | Full Access | Manage | Read | Read | Read | No Access |
| Courses | Full Access | Manage | Manage (own dept) | Read (assigned) | Read | No Access |
| Subjects | Full Access | Manage | Read | Read | Read | No Access |
| Academic Terms | Full Access | Manage | Read | Read | Read | Read |
| Schedules | Full Access | Manage | Manage (own dept) | Manage (own) | Read | No Access |
| Enrollments | Full Access | Manage | Manage (own dept) | Read (own) | Own Data | No Access |
| Attendance | Full Access | Read | Read (own dept) | Manage (own) | Own Data | No Access |
| Exams | Full Access | Read | Read (own dept) | Manage (own) | Read (own) | No Access |
| Grades | Full Access | Read | Read (own dept) | Manage (own) | Own Data | No Access |
| Results | Full Access | Manage (publish) | Manage (approve, own dept) | Manage (submit, own) | Own Data | No Access |
| Invoices | Full Access | Read | No Access | No Access | Own Data | Manage |
| Payments | Full Access | Read | No Access | No Access | Own Data (create) | Manage (verify) |
| Scholarships | Full Access | Read | No Access | No Access | Own Data (apply) | Manage (approve) |
| Financial Transactions | Full Access | Read | No Access | No Access | Own Data | Read (append-only) |
| Notices | Full Access | Manage | Manage (own dept) | Manage (own sections) | Read | Read |
| Events | Full Access | Manage | Manage (own dept) | Read | Read | Read |
| Reports | Full Access | Read/Generate | Read (own dept) | No Access | No Access | Read/Generate (financial) |
| Audit Log | Full Access | Read (scoped) | No Access | No Access | No Access | Read (financial actions) |
| System Settings | Full Access | Read (public) | No Access | No Access | No Access | No Access |

---

## 10. Recommended TypeScript Navigation Config

One config, one source of truth — every sidebar in the app (all five
role shells) reads from this same file. Shared items (§8) simply list
more than one role in `roles`, instead of being duplicated per role.

### `lib/nav/types.ts`

```typescript
import type { LucideIcon } from "lucide-react";

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "DEPARTMENT_HEAD"
  | "INSTRUCTOR"
  | "STUDENT"
  | "ACCOUNTANT";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
  /** Optional — for future permission-based filtering on top of role (e.g. Permission.SYSTEM_SETTING_MANAGE) */
  permission?: string;
  children?: DashboardNavItem[];
}

export interface DashboardNavGroup {
  label: string;
  items: DashboardNavItem[];
}
```

### `lib/nav/config.ts`

```typescript
import {
  LayoutDashboard, Users, ShieldCheck, History, Settings2,
  Landmark, Building2, Library, BookOpen, BookMarked, CalendarRange,
  CalendarDays, ClipboardList, ClipboardCheck, FileQuestion,
  ChartNoAxesColumn, FileCheck2, GraduationCap, UserRoundCheck,
  Receipt, CreditCard, HandCoins, BarChart3, Megaphone, CalendarHeart,
  CircleUserRound, FileEdit, FileBadge2, ArrowLeftRight, FolderOpen,
} from "lucide-react";
import { DashboardNavGroup } from "./types";

export const NAV_CONFIG: DashboardNavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Dashboard",
        href: "/department",
        icon: LayoutDashboard,
        roles: ["DEPARTMENT_HEAD"],
      },
      {
        title: "Dashboard",
        href: "/instructor",
        icon: LayoutDashboard,
        roles: ["INSTRUCTOR"],
      },
      {
        title: "Dashboard",
        href: "/student",
        icon: LayoutDashboard,
        roles: ["STUDENT"],
      },
      {
        title: "Dashboard",
        href: "/accountant",
        icon: LayoutDashboard,
        roles: ["ACCOUNTANT"],
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
        roles: ["SUPER_ADMIN", "ADMIN"],
        permission: "USER_READ",
      },
      {
        title: "Permissions",
        href: "/admin/users/permissions",
        icon: ShieldCheck,
        roles: ["SUPER_ADMIN"],
        permission: "ADMIN_PERMISSION_UPDATE",
      },
      {
        title: "Audit Log",
        href: "/admin/audit-logs",
        icon: History,
        roles: ["SUPER_ADMIN", "ADMIN"],
        permission: "AUDIT_LOG_READ",
      },
      {
        title: "System Settings",
        href: "/admin/system-settings",
        icon: Settings2,
        roles: ["SUPER_ADMIN"],
        permission: "SYSTEM_SETTING_MANAGE",
      },
    ],
  },
  {
    label: "Organization",
    items: [
      {
        title: "Faculties",
        href: "/admin/faculties",
        icon: Landmark,
        roles: ["SUPER_ADMIN", "ADMIN"],
        permission: "FACULTY_READ",
      },
      {
        title: "Departments",
        href: "/admin/departments",
        icon: Building2,
        roles: ["SUPER_ADMIN", "ADMIN"],
        permission: "DEPARTMENT_READ",
      },
      {
        title: "Programs",
        href: "/admin/programs",
        icon: Library,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD"],
        permission: "PROGRAM_READ",
      },
    ],
  },
  {
    label: "Academic",
    items: [
      {
        title: "Courses",
        href: "/admin/courses",
        icon: BookOpen,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD"],
        permission: "COURSE_READ",
        children: [
          { title: "Assign Instructor", href: "/admin/courses/[id]/instructors", icon: UserRoundCheck, roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD"], permission: "COURSE_ASSIGN_INSTRUCTOR" },
        ],
      },
      {
        title: "My Courses",
        href: "/instructor/courses",
        icon: BookOpen,
        roles: ["INSTRUCTOR"],
      },
      {
        title: "My Courses",
        href: "/student/courses",
        icon: BookOpen,
        roles: ["STUDENT"],
      },
      {
        title: "Subjects",
        href: "/admin/subjects",
        icon: BookMarked,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "INSTRUCTOR", "STUDENT"],
        permission: "SUBJECT_READ",
      },
      {
        title: "Academic Terms",
        href: "/admin/academic-terms",
        icon: CalendarRange,
        roles: ["SUPER_ADMIN", "ADMIN"],
        permission: "ACADEMIC_SESSION_READ",
        children: [
          { title: "Sessions", href: "/admin/academic-terms/sessions", icon: CalendarRange, roles: ["SUPER_ADMIN", "ADMIN"] },
          { title: "Semesters", href: "/admin/academic-terms/semesters", icon: CalendarDays, roles: ["SUPER_ADMIN", "ADMIN"] },
        ],
      },
      {
        title: "Schedules",
        href: "/admin/schedules",
        icon: CalendarDays,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD"],
      },
      {
        title: "Class Schedule",
        href: "/instructor/schedule",
        icon: CalendarDays,
        roles: ["INSTRUCTOR"],
      },
      {
        title: "Class Schedule",
        href: "/student/schedule",
        icon: CalendarDays,
        roles: ["STUDENT"],
      },
      {
        title: "Enrollments",
        href: "/admin/enrollments",
        icon: ClipboardList,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD"],
        permission: "ENROLLMENT_READ",
      },
      {
        title: "Course Registration",
        href: "/student/enrollments",
        icon: ClipboardList,
        roles: ["STUDENT"],
        permission: "ENROLLMENT_CREATE",
      },
      {
        title: "Attendance",
        href: "/admin/attendance",
        icon: ClipboardCheck,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "INSTRUCTOR", "STUDENT"],
        permission: "ATTENDANCE_READ",
      },
      {
        title: "Exams",
        href: "/admin/exams",
        icon: FileQuestion,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "INSTRUCTOR", "STUDENT"],
        permission: "EXAM_READ",
      },
      {
        title: "Grades",
        href: "/admin/grades",
        icon: ChartNoAxesColumn,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "INSTRUCTOR", "STUDENT"],
        permission: "RESULT_READ",
      },
      {
        title: "Results",
        href: "/admin/results",
        icon: FileCheck2,
        roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "INSTRUCTOR", "STUDENT"],
        permission: "RESULT_READ",
      },
      {
        title: "Assignments",
        href: "/instructor/assignments",
        icon: FileEdit,
        roles: ["INSTRUCTOR", "STUDENT"],
        permission: "ASSIGNMENT_READ",
      },
      {
        title: "Academic Transcript",
        href: "/student/transcript",
        icon: FileBadge2,
        roles: ["STUDENT"], // optional/future — see §6 note
      },
      {
        title: "Course Materials",
        href: "/instructor/materials",
        icon: FolderOpen,
        roles: ["INSTRUCTOR"], // optional/future — no backing table yet
      },
    ],
  },
  {
    label: "Students & Staff",
    items: [
      { title: "Students", href: "/admin/students", icon: GraduationCap, roles: ["SUPER_ADMIN", "ADMIN"], permission: "STUDENT_READ" },
      { title: "Students", href: "/department/students", icon: GraduationCap, roles: ["DEPARTMENT_HEAD"] },
      { title: "Students", href: "/accountant/students", icon: GraduationCap, roles: ["ACCOUNTANT"] },
      { title: "Instructors", href: "/admin/instructors", icon: UserRoundCheck, roles: ["SUPER_ADMIN", "ADMIN"], permission: "INSTRUCTOR_READ" },
      { title: "Instructors", href: "/department/instructors", icon: UserRoundCheck, roles: ["DEPARTMENT_HEAD"] },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Invoices", href: "/admin/invoices", icon: Receipt, roles: ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT"], permission: "INVOICE_READ" },
      { title: "Invoices", href: "/student/invoices", icon: Receipt, roles: ["STUDENT"] },
      { title: "Payments", href: "/admin/payments", icon: CreditCard, roles: ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT"], permission: "PAYMENT_READ" },
      { title: "Payments", href: "/student/payments", icon: CreditCard, roles: ["STUDENT"] },
      { title: "Scholarships", href: "/admin/scholarships", icon: HandCoins, roles: ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT"], permission: "SCHOLARSHIP_READ" },
      { title: "Scholarships", href: "/student/scholarships", icon: HandCoins, roles: ["STUDENT"] },
      { title: "Transactions", href: "/accountant/transactions", icon: ArrowLeftRight, roles: ["ACCOUNTANT"], permission: "FINANCIAL_REPORT_READ" },
      { title: "Reports", href: "/admin/reports", icon: BarChart3, roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "ACCOUNTANT"] },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Notices", href: "/admin/notices", icon: Megaphone, roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "INSTRUCTOR", "STUDENT", "ACCOUNTANT"], permission: "NOTICE_READ" },
      { title: "Academic Calendar", href: "/admin/events", icon: CalendarHeart, roles: ["SUPER_ADMIN", "ADMIN", "DEPARTMENT_HEAD", "INSTRUCTOR", "STUDENT", "ACCOUNTANT"], permission: "EVENT_READ" },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Settings", href: "/admin/settings", icon: CircleUserRound, roles: ["SUPER_ADMIN", "ADMIN"] },
      { title: "Settings", href: "/department/settings", icon: CircleUserRound, roles: ["DEPARTMENT_HEAD"] },
      { title: "Settings", href: "/instructor/settings", icon: CircleUserRound, roles: ["INSTRUCTOR"] },
      { title: "Settings", href: "/student/settings", icon: CircleUserRound, roles: ["STUDENT"] },
      { title: "Settings", href: "/accountant/settings", icon: CircleUserRound, roles: ["ACCOUNTANT"] },
    ],
  },
];
```

> This config demonstrates the full pattern across every group in §2–§7
> — extend the remaining rows (e.g. `/instructor/sections`,
> `/department/courses`, `/accountant/invoices`) by copying the same
> item shape from the tables above; nothing about the pattern changes
> per item.

### `lib/nav/getNavForRole.ts`

```typescript
import { NAV_CONFIG } from "./config";
import { DashboardNavGroup, UserRole } from "./types";

export function getNavForRole(role: UserRole, userPermissions: string[] = []): DashboardNavGroup[] {
  return NAV_CONFIG
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => item.roles.includes(role))
        // Permission is a future refinement, not yet enforced client-side —
        // uncomment once every item's `permission` field is fully populated:
        // .filter((item) => !item.permission || userPermissions.includes(item.permission))
        .map((item) => ({
          ...item,
          children: item.children?.filter((child) => child.roles.includes(role)),
        })),
    }))
    .filter((group) => group.items.length > 0);
}
```

Remember: this filtering is **UX only** (`FRONTEND_IMPLEMENTATION_GUIDE.md`
§5) — it decides what renders in the sidebar, never what the API allows.
An item with no `permission` set is visible to every role listed in
`roles`; the commented-out permission filter is ready to enable once
every row above has its `permission` value confirmed against
`API_INSTRUCTION.md`.

### `components/shared/Sidebar.tsx` — active-route detection

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardNavGroup } from "@/lib/nav/types";

export function Sidebar({ groups }: { groups: DashboardNavGroup[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r p-4 space-y-6">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="text-xs font-medium text-muted-foreground mb-2">{group.label}</div>
          <nav className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                    isActive ? "bg-brand-primary text-white" : "text-foreground hover:bg-muted",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
```

### Usage in the dashboard layout

```tsx
// app/(dashboard)/layout.tsx
import { getSession } from "@/lib/auth/session";
import { getNavForRole } from "@/lib/nav/getNavForRole";
import { Sidebar } from "@/components/shared/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const groups = getNavForRole(session!.role, session!.permissions);

  return (
    <div className="flex min-h-screen">
      <Sidebar groups={groups} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

This replaces the flat `NAV_BY_ROLE` map sketched in
`FRONTEND_IMPLEMENTATION_GUIDE.md` §11 with the grouped, nested,
permission-ready version — same call site, same `Sidebar` component,
richer config underneath it.
