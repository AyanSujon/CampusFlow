You are a senior product designer and full-stack architect designing the dashboard navigation for **CampusFlow**, a production-ready University Management System.

Create a realistic, scalable dashboard sidebar/navigation route structure based strictly on the university-management features and roles described below.

## CampusFlow Context

CampusFlow is a university management platform that manages:

* Users and authentication
* Students
* Instructors
* Faculties
* Departments
* Academic programs
* Courses
* Subjects
* Course enrollment
* Academic terms/semesters
* Class schedules
* Attendance
* Exams and grades
* Student academic records
* Fees and invoices
* Payments
* Notifications
* University organization
* Role-based access control

Current roles:

* SUPER_ADMIN
* ADMIN
* DEPARTMENT_HEAD
* INSTRUCTOR
* STUDENT
* ACCOUNTANT

There is NO DEAN role.

## Task

Design the dashboard route/navigation items for each role.

The navigation must be:

1. Realistic for a university management system
2. Relevant to the user's role
3. Free from unnecessary generic SaaS menu items
4. Scalable for future features
5. Organized into logical sidebar groups
6. Suitable for a Next.js App Router application
7. Compatible with role-based route protection
8. Easy to implement using a reusable navigation configuration
9. Clear enough for both developers and users

## Required Dashboard Structure

Create navigation groups such as:

* Overview
* Academic
* Students
* Faculty / Staff
* Organization
* Finance
* Communication
* Administration
* Account / Settings

Do NOT blindly include every group for every role. Only show groups that are genuinely relevant to that role.

## Role Requirements

### SUPER_ADMIN

The SUPER_ADMIN should have university-wide management access.

Consider routes such as:

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
* Invoices
* Payments
* Reports
* Notifications
* Audit Logs
* System Settings

### ADMIN

ADMIN should manage day-to-day university operations but should not necessarily have the same system-level controls as SUPER_ADMIN.

Consider:

* Dashboard
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
* Finance overview
* Invoices
* Payments
* Reports
* Notifications
* Settings

### DEPARTMENT_HEAD

DEPARTMENT_HEAD should primarily manage their own department.

Consider:

* Dashboard
* Department Overview
* Students
* Instructors
* Programs
* Courses
* Subjects
* Course Assignments
* Class Schedules
* Enrollments
* Attendance
* Exams
* Grades
* Academic Reports
* Notifications
* Profile / Settings

The UI should avoid exposing university-wide administrative controls that are outside their department.

### INSTRUCTOR

INSTRUCTOR should focus on teaching and student academic management.

Consider:

* Dashboard
* My Courses
* My Classes
* Class Schedule
* Students
* Attendance
* Exams
* Grades
* Course Materials
* Academic Calendar
* Notifications
* Profile / Settings

Avoid showing administrative modules such as user management, faculty management, payments, or system settings.

### STUDENT

STUDENT should have a simple student-focused dashboard.

Consider:

* Dashboard
* My Profile
* My Program
* My Courses
* Course Registration / Enrollment
* Class Schedule
* Attendance
* Exams
* Results / Grades
* Academic Transcript
* Fees / Invoices
* Payments
* Notifications
* Academic Calendar
* Settings

The student navigation should prioritize the student's daily academic tasks.

### ACCOUNTANT

ACCOUNTANT should focus on university financial operations.

Consider:

* Dashboard
* Students
* Invoices
* Payments
* Transactions
* Outstanding Fees
* Payment History
* Financial Reports
* Notifications
* Profile / Settings

Do not expose academic administration that is unrelated to accounting.

## Important Design Rules

### 1. Use nested routes where appropriate

For example:

/dashboard
/dashboard/students
/dashboard/students/[id]
/dashboard/instructors
/dashboard/faculties
/dashboard/departments
/dashboard/programs
/dashboard/courses
/dashboard/subjects
/dashboard/enrollments
/dashboard/schedules
/dashboard/attendance
/dashboard/exams
/dashboard/grades
/dashboard/invoices
/dashboard/payments
/dashboard/reports
/dashboard/settings

Use logical nested routes rather than creating unnecessarily deep routes.

### 2. Avoid duplicate navigation

Do not create separate menu items for things that should be sub-pages.

For example:

Instead of:

* Courses
* Course Details
* Course Subjects
* Course Students

Use:

Courses
├── All Courses
├── Subjects
└── Enrollments

### 3. Use real university terminology

Prefer:

* Academic Terms
* Programs
* Departments
* Courses
* Subjects
* Enrollments
* Attendance
* Exams
* Grades
* Transcript
* Invoices
* Payments

Avoid generic SaaS terminology such as:

* Workspace
* Projects
* Tasks
* CRM
* Team
* Pipeline

unless there is an actual CampusFlow feature supporting it.

### 4. Role-based navigation

The frontend navigation must NOT be the only security layer.

The final architecture should assume:

* Frontend navigation hides unauthorized routes
* Route guards protect dashboard pages
* Backend authorization independently validates permissions
* Users cannot access restricted APIs simply by manually entering a URL

### 5. Navigation configuration

Design the result so it can eventually be represented by a TypeScript configuration similar to:

```ts
type DashboardNavItem = {
  title: string
  href: string
  icon: React.ComponentType
  roles: UserRole[]
  children?: DashboardNavItem[]
}
```

Do not hardcode navigation separately inside every sidebar component.

### 6. Icons

Recommend appropriate icons for each navigation item using Lucide React icons.

Use semantically accurate icons.

Examples:

* Dashboard → LayoutDashboard
* Students → GraduationCap
* Instructors → UserRoundCheck
* Departments → Building2
* Programs → Library
* Courses → BookOpen
* Schedule → CalendarDays
* Attendance → ClipboardCheck
* Exams → FileQuestion
* Grades → ChartNoAxesColumn
* Invoices → Receipt
* Payments → CreditCard
* Reports → BarChart3
* Notifications → Bell
* Settings → Settings2

### 7. Output format

Return the result in this exact structure:

## 1. Global Route Architecture

Show the complete route hierarchy.

## 2. SUPER_ADMIN Navigation

Show grouped sidebar items with:

* Label
* Route
* Icon
* Purpose

## 3. ADMIN Navigation

Same format.

## 4. DEPARTMENT_HEAD Navigation

Same format.

## 5. INSTRUCTOR Navigation

Same format.

## 6. STUDENT Navigation

Same format.

## 7. ACCOUNTANT Navigation

Same format.

## 8. Shared Routes

Identify routes that can be shared between multiple roles.

## 9. Role Permission Matrix

Create a matrix showing which roles can access each major module.

Use:

* Full Access
* Manage
* Read
* Own Data
* No Access

Do not assign permissions arbitrarily. Keep them consistent with the responsibilities of each role.

## 10. Recommended TypeScript Navigation Config

Finally, generate a clean production-ready TypeScript navigation configuration that supports:

* Role-based visibility
* Nested navigation
* Icons
* Active route detection
* Future permission-based access
* Type safety

Keep the architecture simple enough to integrate into a Next.js App Router + shadcn/ui dashboard.

Important:

Do not invent features that are not reasonably expected in a university management system. If a feature is optional, clearly mark it as optional instead of treating it as a core CampusFlow feature.
