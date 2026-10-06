import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Receipt,
  BarChart3,
  Bell,
  ShieldCheck,
} from "lucide-react"


// SUPER_ADMIN
export const superAdminRoutes = [
  {
    title: "Dashboard",
    url: "/super-admin",
    icon: LayoutDashboard,
  },
  {
    title: "University Management",
    url: "/super-admin/users",
    icon: Building2,
    items: [
      { title: "Users", url: "/super-admin/users" },
      { title: "Students", url: "/super-admin/students" },
      { title: "Instructors", url: "/super-admin/instructors" },
      { title: "Faculties", url: "/super-admin/faculties" },
      { title: "Departments", url: "/super-admin/departments" },
      { title: "Programs", url: "/super-admin/programs" },
    ],
  },
  {
    title: "Academic Management",
    url: "/super-admin/courses",
    icon: BookOpen,
    items: [
      { title: "Academic Terms", url: "/super-admin/academic-terms" },
      { title: "Courses", url: "/super-admin/courses" },
      { title: "Subjects", url: "/super-admin/subjects" },
      { title: "Enrollments", url: "/super-admin/enrollments" },
      { title: "Class Schedules", url: "/super-admin/schedules" },
      { title: "Attendance", url: "/super-admin/attendance" },
      { title: "Exams", url: "/super-admin/exams" },
      { title: "Grades", url: "/super-admin/grades" },
    ],
  },
  {
    title: "Finance",
    url: "/super-admin/invoices",
    icon: Receipt,
    items: [
      { title: "Invoices", url: "/super-admin/invoices" },
      { title: "Payments", url: "/super-admin/payments" },
      { title: "Transactions", url: "/super-admin/transactions" },
    ],
  },
  {
    title: "Reports",
    url: "/super-admin/academic-reports",
    icon: BarChart3,
    items: [
      { title: "Academic Reports", url: "/super-admin/academic-reports" },
      { title: "Student Reports", url: "/super-admin/students-reports" },
      { title: "Financial Reports", url: "/super-admin/financial-reports" },
    ],
  },
  {
    title: "Communication",
    url: "/super-admin/notifications",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/super-admin/notifications" },
    ],
  },
  {
    title: "Administration",
    url: "/super-admin/audit-logs",
    icon: ShieldCheck,
    items: [
      { title: "Audit Logs", url: "/super-admin/audit-logs" },
      { title: "System Settings", url: "/super-admin/system-settings" },
    ],
  },
]

















































/*


হ্যাঁ। **Senior Architect perspective** থেকে দেখলে তোমার বর্তমান route structure মোটামুটি ভালো, কিন্তু `Super Admin`-এর জন্য **resource ownership, workflow, operational responsibility, reporting, এবং system governance** আলাদা করে ভাবা উচিত।

বিশেষ করে `Users / Students / Instructors`, `Courses / Subjects`, এবং `Finance`-এর responsibility কিছুটা আরও পরিষ্কার করা দরকার।

### Recommended Super Admin Route Architecture

| Route / Section                  | কী থাকবে                                                                                                                                               | কেন থাকবে                                                                                | Priority     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------ |
| `/super-admin`                   | **Dashboard** — total students, instructors, faculties, departments, programs, active terms, pending approvals, revenue/payment summary, system alerts | Super Admin যেন login করেই পুরো university-এর health বুঝতে পারে                          | 🔴 Critical  |
| `/super-admin/users`             | **Users** — Admin, Student, Instructor, Accountant, Department Head ইত্যাদি                                                                            | Authentication/account-level identity management এখানে থাকবে                             | 🔴 Critical  |
| `/super-admin/students`          | **Students** — profile, student ID, program, academic status, semester, admission info                                                                 | Student হলো academic domain-এর core entity                                               | 🔴 Critical  |
| `/super-admin/instructors`       | **Instructors** — employee ID, department, designation, specialization, verification, employment status                                                | Teaching resource management                                                             | 🔴 Critical  |
| `/super-admin/faculties`         | **Faculties** — faculty info, dean, departments                                                                                                        | University-এর top-level academic structure                                               | 🔴 Critical  |
| `/super-admin/departments`       | **Departments** — faculty, head, programs                                                                                                              | Academic ownership এবং organizational hierarchy                                          | 🔴 Critical  |
| `/super-admin/programs`          | **Programs** — BSc CSE, BBA etc.; department, degree type, duration, credits                                                                           | Student-এর academic ownership নির্ধারণ করে                                               | 🔴 Critical  |
| `/super-admin/academic-terms`    | **Academic Terms** — semester/session, start/end date, current/active term                                                                             | Academic operation-এর timeline control করে                                               | 🔴 Critical  |
| `/super-admin/courses`           | **Courses** — course code, title, credits, department/program, instructor mapping                                                                      | Curriculum-এর actual course-level management                                             | 🔴 Critical  |
| `/super-admin/subjects`          | **Subjects** — subject/course definition, prerequisite, credit, type                                                                                   | এখানে একটা architectural decision দরকার: `Course` এবং `Subject` duplicate কিনা যাচাই করো | 🟡 Important |
| `/super-admin/enrollments`       | **Enrollments** — student → term → course/subject enrollment                                                                                           | Student academic lifecycle-এর central transaction                                        | 🔴 Critical  |
| `/super-admin/schedules`         | **Class Schedules** — course, instructor, room, day, time, term                                                                                        | Academic delivery পরিচালনা করার জন্য                                                     | 🔴 Critical  |
| `/super-admin/attendance`        | **Attendance** — student, course, date, status, attendance percentage                                                                                  | Academic performance এবং eligibility tracking                                            | 🟡 Important |
| `/super-admin/exams`             | **Exams** — exam type, course, term, schedule, marks configuration                                                                                     | Assessment lifecycle management                                                          | 🔴 Critical  |
| `/super-admin/grades`            | **Grades** — marks, grade, GPA, publish/lock status                                                                                                    | Academic result-এর authoritative source                                                  | 🔴 Critical  |
| `/super-admin/invoices`          | **Invoices** — student, fee type, amount, due date, status                                                                                             | Student financial obligation তৈরি/track করা                                              | 🔴 Critical  |
| `/super-admin/payments`          | **Payments** — payment attempt, gateway, student, invoice, status                                                                                      | কে কত টাকা দিয়েছে সেটা track করা                                                         | 🔴 Critical  |
| `/super-admin/transactions`      | **Transactions** — Stripe/SSLCommerz/bKash gateway-level transaction records                                                                           | Financial reconciliation এবং debugging-এর জন্য                                           | 🔴 Critical  |
| `/super-admin/reports/academic`  | Enrollment, course performance, GPA, attendance, pass/fail                                                                                             | Academic decision-making                                                                 | 🟡 Important |
| `/super-admin/reports/students`  | Admission, active/inactive, program-wise, semester-wise student analytics                                                                              | Student population analysis                                                              | 🟡 Important |
| `/super-admin/reports/financial` | Revenue, outstanding fees, paid/unpaid, transaction summary                                                                                            | Financial oversight                                                                      | 🟡 Important |
| `/super-admin/notifications`     | System notifications, academic announcements, payment reminders                                                                                        | University-wide communication                                                            | 🟡 Important |
| `/super-admin/audit-logs`        | Who did what, when, target entity, old/new values, IP/device if needed                                                                                 | Compliance, security এবং accountability                                                  | 🔴 Critical  |
| `/super-admin/system-settings`   | University config, grading config, notification config, payment config, system preferences                                                             | Global application behavior control                                                      | 🔴 Critical  |

### আমি তোমার architecture-এ আরও ৩টা জিনিস পরিবর্তন করতাম

| বর্তমান                 | Recommended                                          | কারণ                                                                                   |
| ----------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `University Management` | **University / Organization**                        | Faculty → Department → Program hierarchy-টা organizational domain হিসেবে বেশি পরিষ্কার |
| `Courses` + `Subjects`  | **আগে domain relationship নির্ধারণ করো**             | দুটো যদি একই concept হয় তাহলে unnecessary duplication হবে                              |
| `Reports`               | Reports রাখো, কিন্তু পরে **Analytics** আলাদা করা যায় | Report = predefined output, Analytics = interactive business intelligence              |

---

## সবচেয়ে গুরুত্বপূর্ণ: Course বনাম Subject

তোমার current structure-এ:

```text
Courses
Subjects
```

এখানে architect হিসেবে আমি প্রথমেই প্রশ্ন করব:

> **Course আর Subject কি তোমার system-এ আলাদা entity?**

যদি:

```text
CSE101 = Introduction to Programming
```

এটাই একটি academic teaching unit হয়, তাহলে সাধারণত:

```text
Subject
```

দিয়েই কাজ করা যায়।

অন্যদিকে যদি architecture হয়:

```text
Course
   ↓
Course Offering
   ↓
Subject/Class Section
```

তাহলে দুটো রাখা যুক্তিযুক্ত।

উদাহরণ:

```text
Course
CSE101 - Data Structures
        ↓
Course Offering
Fall 2026
        ↓
Section A
Instructor: Rahim
Room: 301
```

এটা তোমার **Enrollment + Schedule + Instructor + Term** architecture অনেক বেশি scalable করবে।

---

# তোমার sidebar-টা আমি এভাবে সাজাতাম

```text
SUPER ADMIN
│
├── Dashboard
│
├── University
│   ├── Users
│   ├── Students
│   ├── Instructors
│   ├── Faculties
│   ├── Departments
│   └── Programs
│
├── Academics
│   ├── Academic Terms
│   ├── Courses
│   ├── Enrollments
│   ├── Class Schedules
│   ├── Attendance
│   ├── Exams
│   └── Grades
│
├── Finance
│   ├── Invoices
│   ├── Payments
│   └── Transactions
│
├── Reports
│   ├── Academic
│   ├── Students
│   └── Financial
│
├── Communication
│   └── Notifications
│
└── Administration
    ├── Audit Logs
    └── System Settings
```

### কেন এই grouping ভালো?

**University → Academics → Finance → Reports → Communication → Administration**

এটা আসলে একটি logical lifecycle:

```text
University Structure
        ↓
Academic Operation
        ↓
Financial Operation
        ↓
Reporting
        ↓
Communication
        ↓
Governance
```

এতে নতুন developer project-এ ঢুকলেও domain বুঝতে সহজ হবে।

---

## আরেকটা গুরুত্বপূর্ণ architectural principle

**Sidebar route দেখে database model design করবে না।**

বরং:

```text
Domain
  ↓
Entity
  ↓
Relationship
  ↓
Business Workflow
  ↓
Permission
  ↓
API
  ↓
UI Route
```

উদাহরণ:

```text
Student
  ↓
Program
  ↓
Department
  ↓
Faculty
```

এটা শুধু UI navigation না—এটাই তোমার **academic ownership hierarchy**।

আবার:

```text
Student
  ↓
Enrollment
  ↓
Course Offering
  ↓
Academic Term
  ↓
Grade
```

এটা **academic lifecycle**।

আর:

```text
Student
  ↓
Invoice
  ↓
Payment
  ↓
Transaction
```

এটা **financial lifecycle**।

এইভাবে CampusFlow design করলে এটা শুধু সুন্দর admin dashboard হবে না; **একটা properly domain-modeled University Management System** হবে।







*/