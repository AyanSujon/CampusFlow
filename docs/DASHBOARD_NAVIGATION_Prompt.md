I am building **CampusFlow**, a University Management System using Next.js, TypeScript, Tailwind CSS, shadcn/ui, and role-based access control.

I need you to generate **separate sidebar navigation data for each user role**.

The navigation structure must follow this exact style:

```ts
navMain: [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
]
```

## CampusFlow Roles

The system has exactly these roles:

* SUPER_ADMIN
* ADMIN
* DEPARTMENT_HEAD
* INSTRUCTOR
* STUDENT
* ACCOUNTANT

There is NO DEAN role.

---

# Important Requirements

Generate **6 completely separate `navMain` configurations**, one for each role.

Do NOT create one huge navigation configuration and filter it afterward.

I want:

1. SUPER_ADMIN `navMain`
2. ADMIN `navMain`
3. DEPARTMENT_HEAD `navMain`
4. INSTRUCTOR `navMain`
5. STUDENT `navMain`
6. ACCOUNTANT `navMain`

Each role must only contain navigation items that are actually relevant to that role.

Do not show irrelevant administrative features to students or instructors.

---

# CampusFlow Core Features

CampusFlow is a university management system containing these modules:

* Dashboard
* Users
* Students
* Instructors
* Faculties
* Departments
* Programs
* Courses
* Subjects
* Academic Terms
* Enrollments
* Class Schedules
* Attendance
* Exams
* Grades
* Academic Transcript
* Invoices
* Payments
* Transactions
* Financial Reports
* Academic Reports
* Notifications
* Profile
* Settings
* Audit Logs
* System Settings

Some features may be nested under logical parent categories.

---

# Navigation Design Rules

## 1. Use realistic university terminology

Use labels such as:

* Students
* Faculty
* Departments
* Programs
* Courses
* Subjects
* Enrollments
* Academic Terms
* Class Schedule
* Attendance
* Exams
* Grades
* Transcript
* Invoices
* Payments
* Reports

Do NOT use generic SaaS items such as:

* Playground
* Models
* Workspace
* Projects
* CRM
* Team
* Billing

unless the feature genuinely exists in CampusFlow.

---

# 2. Organize navigation into logical groups

For example:

```ts
{
  title: "Academic",
  url: "/dashboard/academic",
  icon: BookOpen,
  items: [
    {
      title: "Courses",
      url: "/dashboard/courses",
    },
    {
      title: "Subjects",
      url: "/dashboard/subjects",
    },
  ],
}
```

Possible parent groups include:

* Overview
* Academic
* Students
* Faculty
* Organization
* Finance
* Reports
* Communication
* Administration
* Account

Do not force every group into every role.

---

# 3. Dashboard should be the first item

Every role should have:

```ts
{
  title: "Dashboard",
  url: "/dashboard",
  icon: LayoutDashboard,
  isActive: true,
}
```

Dashboard does NOT need children unless there is a strong reason.

---

# 4. Use nested items intelligently

For example:

```ts
{
  title: "Academic",
  url: "/dashboard/academic",
  icon: BookOpen,
  items: [
    {
      title: "Programs",
      url: "/dashboard/programs",
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
    },
    {
      title: "Subjects",
      url: "/dashboard/subjects",
    },
    {
      title: "Enrollments",
      url: "/dashboard/enrollments",
    },
  ],
}
```

Avoid unnecessarily deep nesting.

Maximum recommended nesting:

Parent → Child

Do not create:

Parent → Child → Grandchild → Great Grandchild

unless absolutely necessary.

---

# 5. Routes must be realistic

Use routes such as:

```text
/dashboard
/dashboard/students
/dashboard/instructors
/dashboard/faculties
/dashboard/departments
/dashboard/programs
/dashboard/courses
/dashboard/subjects
/dashboard/academic-terms
/dashboard/enrollments
/dashboard/schedules
/dashboard/attendance
/dashboard/exams
/dashboard/grades
/dashboard/transcript
/dashboard/invoices
/dashboard/payments
/dashboard/transactions
/dashboard/reports
/dashboard/notifications
/dashboard/profile
/dashboard/settings
/dashboard/audit-logs
```

Do not use `#`.

Every URL should be a realistic CampusFlow route.

---

# 6. Use Lucide React icons

Use appropriate Lucide icons.

Examples:

```ts
LayoutDashboard
Users
GraduationCap
UserRoundCheck
Building2
School
Library
BookOpen
CalendarDays
ClipboardCheck
FileQuestion
ChartNoAxesColumn
Receipt
CreditCard
WalletCards
BarChart3
Bell
Settings2
ShieldCheck
ScrollText
User
```

Do not import icons from other icon libraries.

---

# ROLE 1 — SUPER_ADMIN

SUPER_ADMIN has university-wide system management responsibilities.

Include relevant navigation for:

### Overview

* Dashboard

### University Management

* Users
* Students
* Instructors
* Faculties
* Departments
* Programs

### Academic Management

* Academic Terms
* Courses
* Subjects
* Enrollments
* Class Schedules
* Attendance
* Exams
* Grades

### Finance

* Invoices
* Payments
* Transactions
* Financial Reports

### Reports

* Academic Reports
* Student Reports
* Financial Reports

### Communication

* Notifications

### Administration

* Audit Logs
* System Settings

Create a clean sidebar hierarchy instead of putting everything at the top level.

---

# ROLE 2 — ADMIN

ADMIN manages normal university operations.

Include relevant access to:

* Dashboard
* Students
* Instructors
* Faculties
* Departments
* Programs
* Academic Terms
* Courses
* Subjects
* Enrollments
* Schedules
* Attendance
* Exams
* Grades
* Invoices
* Payments
* Reports
* Notifications
* Settings

Do NOT give ADMIN unnecessary SUPER_ADMIN-only system controls such as Audit Logs if those are intended to be system-level.

---

# ROLE 3 — DEPARTMENT_HEAD

DEPARTMENT_HEAD manages their own academic department.

Navigation should focus on:

### Overview

* Dashboard
* Department Overview

### Students

* Department Students

### Faculty

* Department Instructors

### Academic

* Programs
* Courses
* Subjects
* Course Assignments
* Enrollments
* Class Schedules
* Attendance
* Exams
* Grades

### Reports

* Academic Reports
* Student Performance

### Communication

* Notifications

### Account

* Profile
* Settings

Do NOT include:

* User Management
* University-wide system settings
* Audit Logs
* Financial administration
* Payment processing

unless there is a strong university-management reason.

---

# ROLE 4 — INSTRUCTOR

INSTRUCTOR is primarily responsible for teaching and managing their assigned students/courses.

Navigation should include:

### Overview

* Dashboard

### Teaching

* My Courses
* My Classes
* Class Schedule

### Students

* My Students

### Academic

* Attendance
* Exams
* Grades
* Course Materials

### Academic Information

* Academic Calendar

### Communication

* Notifications

### Account

* Profile
* Settings

Do NOT include:

* Users
* Faculties
* Departments
* Programs management
* Finance
* Invoices
* Payments
* System Settings
* Audit Logs

---

# ROLE 5 — STUDENT

STUDENT should have a simple and student-focused navigation.

Include:

### Overview

* Dashboard

### My Academics

* My Program
* My Courses
* Course Registration
* Class Schedule
* Attendance
* Exams
* Results / Grades
* Academic Transcript

### Finance

* My Invoices
* Payment History
* Make Payment

### University

* Academic Calendar
* Notifications

### Account

* My Profile
* Settings

Do NOT expose administrative navigation.

The student should only see information and actions relevant to their own account.

---

# ROLE 6 — ACCOUNTANT

ACCOUNTANT focuses on university financial management.

Include:

### Overview

* Dashboard

### Students

* Students

### Finance

* Invoices
* Payments
* Transactions
* Outstanding Fees
* Payment History

### Reports

* Financial Reports
* Revenue Reports
* Outstanding Fees Report

### Communication

* Notifications

### Account

* Profile
* Settings

Do NOT include:

* Course management
* Subject management
* Exams
* Grades
* Attendance management
* System administration
* Audit Logs

unless absolutely necessary.

---

# Output Requirements

Return ONLY the navigation configurations.

Do not generate React components.

Do not generate sidebar components.

Do not generate permission middleware.

Do not generate API code.

Do not generate explanations.

Generate six separate sections.

Use this exact structure:

```ts
// SUPER_ADMIN
export const superAdminNavMain = [
  // navigation
]

// ADMIN
export const adminNavMain = [
  // navigation
]

// DEPARTMENT_HEAD
export const departmentHeadNavMain = [
  // navigation
]

// INSTRUCTOR
export const instructorNavMain = [
  // navigation
]

// STUDENT
export const studentNavMain = [
  // navigation
]

// ACCOUNTANT
export const accountantNavMain = [
  // navigation
]
```

Use actual Lucide icon references such as:

```ts
icon: LayoutDashboard
```

Do not put icon names inside strings.

Use:

```ts
url: "/dashboard/students"
```

not:

```ts
url: "#"
```

Use `isActive: true` ONLY for the Dashboard item of each role.

Make the navigation production-ready, clean, minimal, realistic, and easy to maintain.

The final result should look like a real university ERP / University Management System sidebar, not a generic admin dashboard.
