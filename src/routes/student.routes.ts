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




/*
হ্যাঁ। তোমার বর্তমান **Student Routes** দেখে বললে, Student Dashboard-এর মূল উদ্দেশ্য হওয়া উচিত:

> **এক নজরে student-এর academic progress, আজকের class, attendance, upcoming exam, outstanding payment এবং important notification দেখানো।**

Dashboard-এ সবকিছু দেখানো উচিত না; বরং যেসব তথ্য student-কে **প্রতিদিন/প্রতি সপ্তাহে decision নিতে সাহায্য করে**, সেগুলো priority পাবে।

### Student Dashboard-এ কী কী থাকা উচিত

| Section / Widget               | কী দেখাবে                                                                 | কেন থাকা উচিত                                                       | Priority  |
| ------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------- |
| **Welcome / Student Summary**  | Student name, student ID, program, department, current semester           | Student বর্তমানে কোন academic context-এ আছে সেটা instantly বোঝা যায় | 🔴 Must   |
| **Current Semester**           | Current semester, academic status, enrolled credits                       | Student কোন semester-এ এবং কত credit নিচ্ছে তা বোঝার জন্য           | 🔴 Must   |
| **Today's Classes**            | আজকের class, course, time, room/online link, instructor                   | Dashboard খুলেই আজ কী class আছে দেখতে পারবে                         | 🔴 Must   |
| **Attendance Overview**        | Overall attendance %, course-wise attendance এবং warning                  | Attendance কমে গেলে দ্রুত action নিতে পারে                          | 🔴 Must   |
| **Upcoming Exams**             | Exam name, course, date, time, room                                       | পরীক্ষার preparation ও schedule planning-এর জন্য                    | 🔴 Must   |
| **Recent Results / Grades**    | সর্বশেষ প্রকাশিত grades, GPA/CGPA                                         | Academic performance দ্রুত monitor করার জন্য                        | 🔴 Must   |
| **Academic Progress**          | Completed credits, required credits, progress percentage                  | Graduation-এর দিকে কতটা এগিয়েছে তা বোঝার জন্য                       | 🟠 High   |
| **Current Courses**            | বর্তমানে enrolled courses, course code, instructor                        | কোন কোন course বর্তমানে active তা দেখার জন্য                        | 🔴 Must   |
| **Outstanding Fees**           | Total due, overdue amount, upcoming due date                              | Payment deadline miss করা ঠেকাতে                                    | 🔴 Must   |
| **Recent Payments**            | সর্বশেষ payment, amount, date, status                                     | Payment সফল হয়েছে কিনা verify করার জন্য                             | 🟠 High   |
| **Important Notifications**    | University/admin announcements, academic alerts, payment alerts           | গুরুত্বপূর্ণ information miss না করার জন্য                          | 🔴 Must   |
| **Academic Calendar**          | গুরুত্বপূর্ণ academic dates                                               | Registration, exam, semester start/end ইত্যাদি মনে রাখতে            | 🟠 High   |
| **Quick Actions**              | Register Course, Pay Invoice, View Result, View Schedule, View Transcript | বারবার sidebar navigation করতে হয় না                                | 🔴 Must   |
| **Announcements**              | University notices, department notices                                    | নতুন academic/admin information জানার জন্য                          | 🟠 High   |
| **Course Registration Status** | Registration open/closed, deadline, registered courses                    | Registration period-এ খুব গুরুত্বপূর্ণ                              | 🟠 High   |
| **Transcript Shortcut**        | View/download transcript                                                  | Frequently needed academic document দ্রুত access করার জন্য          | 🟡 Medium |
| **Profile Completion**         | Profile কত % complete                                                     | Missing student information complete করতে                           | 🟡 Medium |

---

## Dashboard-এর উপরিভাগে KPI Cards

আমি তোমার CampusFlow-এর জন্য প্রথম row-তে **৪–৬টা compact KPI card** রাখতাম।

| KPI                  |    Example | কেন                         |
| -------------------- | ---------: | --------------------------- |
| **Current Semester** | Semester 5 | Current academic position   |
| **Enrolled Credits** | 18 Credits | Current workload            |
| **Attendance**       |        87% | Academic risk monitoring    |
| **Current GPA**      |       3.62 | Performance monitoring      |
| **Outstanding Fees** |    ৳12,500 | Financial awareness         |
| **Upcoming Exam**    |    3 Exams | Immediate academic planning |

তবে সবগুলো একসাথে খুব বড় card করা উচিত না। Desktop-এ:

**Current Semester → Credits → Attendance → GPA → Fees → Upcoming Exam**

এইভাবে compact রাখলে ভালো হবে।

---

# Dashboard-এর Recommended Layout

তোমার existing routes অনুযায়ী আমি এই structure recommend করব:

```text
┌─────────────────────────────────────────────────────────────┐
│ Good Evening, Ayan 👋                                      │
│ STU-2026-CSE-0012 • B.Sc. in Computer Science • Sem 5     │
└─────────────────────────────────────────────────────────────┘

┌────────────┬────────────┬────────────┬────────────┬─────────┐
│ Semester 5 │ 18 Credits │ Attendance │ GPA 3.62   │ Due     │
│            │             │ 87%        │            │ ৳12,500 │
└────────────┴────────────┴────────────┴────────────┴─────────┘


┌──────────────────────────────┐  ┌───────────────────────────┐
│ Today's Classes              │  │ Upcoming Exams            │
│                              │  │                           │
│ 09:00  Database Systems      │  │ Database Systems           │
│ 11:00  Software Engineering │  │ Oct 12 • 10:00 AM         │
│ 02:00  Web Engineering      │  │                           │
└──────────────────────────────┘  └───────────────────────────┘


┌──────────────────────────────┐  ┌───────────────────────────┐
│ Attendance Overview          │  │ Academic Progress          │
│                              │  │                           │
│ Overall       87%            │  │ ████████████░░ 72%        │
│ Database      92%            │  │ 86 / 120 Credits          │
│ Networking    78% ⚠          │  │                           │
└──────────────────────────────┘  └───────────────────────────┘


┌──────────────────────────────┐  ┌───────────────────────────┐
│ Recent Results               │  │ Finance                    │
│                              │  │                           │
│ Database      A              │  │ Outstanding: ৳12,500      │
│ Networking    A-             │  │ Due: Oct 15                │
│ Mathematics   B+             │  │                           │
│                              │  │ [Make Payment]              │
└──────────────────────────────┘  └───────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│ Important Notifications                                     │
│ • Course registration deadline is Oct 10                    │
│ • Midterm exam schedule published                            │
│ • Tuition payment due on Oct 15                              │
└─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│ Quick Actions                                                │
│ [Register Courses] [View Schedule] [View Results]            │
│ [Pay Fees]        [Transcript]      [Calendar]               │
└─────────────────────────────────────────────────────────────┘
```

---

# কোন route-এর data Dashboard-এ আসবে?

তোমার existing navigation-এর সাথে mapping করলে:

| Dashboard Section   | Existing Route / Data       |
| ------------------- | --------------------------- |
| Student Summary     | `/student/profile`          |
| Current Program     | `/student/program`          |
| Current Courses     | `/student/courses`          |
| Course Registration | `/student/enrollments`      |
| Today's Classes     | `/student/schedules`        |
| Attendance          | `/student/attendance`       |
| Upcoming Exams      | `/student/exams`            |
| Results / GPA       | `/student/grades`           |
| Transcript          | `/student/transcript`       |
| Outstanding Fees    | `/student/invoices`         |
| Payment History     | `/student/payments/history` |
| Make Payment        | `/student/payments/new`     |
| Academic Calendar   | `/student/calendar`         |
| Notifications       | `/student/notifications`    |
| Profile             | `/student/profile`          |

এটা ভালো architecture কারণ **Dashboard নতুন কোনো আলাদা feature না**—এটা existing modules-এর গুরুত্বপূর্ণ data-এর **summary layer**।

---

## আমার মতে সবচেয়ে গুরুত্বপূর্ণ ৮টি

যদি তুমি MVP বানাও, প্রথম version-এ শুধু এগুলো রাখো:

| # | Feature                     | গুরুত্ব      |
| - | --------------------------- | ------------ |
| 1 | **Student Profile Summary** | 🔴 Essential |
| 2 | **Today's Classes**         | 🔴 Essential |
| 3 | **Attendance Overview**     | 🔴 Essential |
| 4 | **Upcoming Exams**          | 🔴 Essential |
| 5 | **Current Courses**         | 🔴 Essential |
| 6 | **GPA / Recent Results**    | 🔴 Essential |
| 7 | **Outstanding Fees**        | 🔴 Essential |
| 8 | **Important Notifications** | 🔴 Essential |

তারপর second phase-এ **Academic Progress, Calendar, Recent Payments, Quick Actions, Announcements** যোগ করতে পারো।

### একটা গুরুত্বপূর্ণ architectural point

Student Dashboard-এ **CRUD table-heavy UI** করা উচিত না। Super Admin-এর dashboard-এর মতো অনেক table/filter রাখার দরকার নেই।

Student Dashboard হওয়া উচিত:

**Status → Today → Upcoming → Risk/Alert → Quick Action**

অর্থাৎ student dashboard খুলে যেন **৫–১০ সেকেন্ডের মধ্যে বুঝতে পারে:**

> **“আমি এখন কোথায় আছি, আজ কী করতে হবে, সামনে কী আছে, কোথায় সমস্যা আছে এবং আমাকে এখন কী action নিতে হবে।”**

তোমার বর্তমান `studentRoutes` অনুযায়ী এই approach-টাই সবচেয়ে clean এবং production-grade হবে।



*/
