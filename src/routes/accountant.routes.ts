import {
  LayoutDashboard,
  GraduationCap,
  Receipt,
  BarChart3,
  Bell,
  Settings2,
} from "lucide-react";


// ACCOUNTANT 
export const accountantRoutes = [
  {
    title: "Dashboard",
    url: "/accountant",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    url: "/accountant/students",
    icon: GraduationCap,
    items: [
      {
        title: "All Students",
        url: "/accountant/students",
      },
    ],
  },
  {
    title: "Finance",
    url: "/accountant/invoices",
    icon: Receipt,
    items: [
      // Invoice Management
      {
        title: "Invoices",
        url: "/accountant/invoices",
      },

      // Payment Management
      {
        title: "Payments",
        url: "/accountant/payments",
      },

      // Payment Gateway & Ledger Transactions
      {
        title: "Transactions",
        url: "/accountant/transactions",
      },

      // Students with unpaid or overdue invoices
      {
        title: "Outstanding Fees",
        url: "/accountant/outstanding-fees",
      },

      // Refund management
      {
        title: "Refunds",
        url: "/accountant/refunds",
      },

      // Financial correction requests
      {
        title: "Adjustments",
        url: "/accountant/adjustments",
      },

      // Scholarships and tuition waivers
      {
        title: "Scholarships",
        url: "/accountant/scholarships",
      },

      // Payment receipts
      {
        title: "Receipts",
        url: "/accountant/receipts",
      },
    ],
  },
  {
    title: "Reports",
    url: "/accountant/reports/financial",
    icon: BarChart3,
    items: [
      {
        title: "Financial Reports",
        url: "/accountant/reports/financial",
      },
      {
        title: "Revenue Reports",
        url: "/accountant/reports/revenue",
      },
      {
        title: "Outstanding Fees",
        url: "/accountant/reports/outstanding-fees",
      },
      {
        title: "Payment Reports",
        url: "/accountant/reports/payments",
      },
      {
        title: "Transaction Reports",
        url: "/accountant/reports/transactions",
      },
      {
        title: "Refund Reports",
        url: "/accountant/reports/refunds",
      },
      {
        title: "Scholarship Reports",
        url: "/accountant/reports/scholarships",
      },
    ],
  },
  {
    title: "Communication",
    url: "/accountant/notifications",
    icon: Bell,
    items: [
      {
        title: "Notifications",
        url: "/accountant/notifications",
      },
    ],
  },
  {
    title: "Account",
    url: "/accountant/profile",
    icon: Settings2,
    items: [
      {
        title: "Profile",
        url: "/accountant/profile",
      },
      {
        title: "Settings",
        url: "/accountant/settings",
      },
    ],
  },
];

// https://chatgpt.com/c/6ac7c5e5-d9a8-83ee-bc28-c2628f6dc890 ChatGPT instracton





/* 

তোমার CampusFlow UMS-এর Accountant Dashboard-এর প্রতিটি route-এর কাজ, কী কী feature থাকবে এবং কেন route-টি প্রয়োজন—নিচে উদাহরণসহ টেবিল আকারে সাজিয়ে দিলাম।

## 1. Dashboard ও Student Management

| Route                       | কী কাজ করবে?                                                                   | কেন প্রয়োজন?                                                     | Example                                            |
| --------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------- |
| `/accountant`               | Finance summary, total revenue, pending payments, overdue invoices দেখাবে।     | Accountant যেন এক নজরে বিশ্ববিদ্যালয়ের আর্থিক অবস্থা বুঝতে পারে। | Total collection ৳৫,০০,০০০, Outstanding ৳৮০,০০০    |
| `/accountant/students`      | Student search, filter এবং তাদের financial summary দেখাবে।                     | কোন Student-এর কত টাকা বকেয়া তা দ্রুত খুঁজে পেতে।                | Student ID `STU-2026-0012` খুঁজে তার invoice দেখা। |
| `/accountant/students/[id]` | নির্দিষ্ট Student-এর profile, invoices, payments ও outstanding balance দেখাবে। | একজন Student-এর সম্পূর্ণ financial history এক জায়গায় রাখতে।      | Ayan-এর মোট ফি ৳৫০,০০০, Paid ৳৩০,০০০, Due ৳২০,০০০। |

## 2. Finance Management

| Route                           | কী কাজ করবে?                                                                        | কেন প্রয়োজন?                                                      | Example                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------- |
| `/accountant/invoices`          | সব Invoice-এর list, search, filter এবং status দেখাবে।                               | তৈরি করা Invoice manage করতে।                                     | INV-001, Ayan, ৳২৫,০০০, ISSUED                           |
| `/accountant/invoices/new`      | Student নির্বাচন করে নতুন Invoice তৈরি করবে।                                        | Student-এর জন্য tuition fee, lab fee বা exam fee ধার্য করতে।      | Ayan-এর জন্য Semester Tuition Fee ৳২৫,০০০ তৈরি।          |
| `/accountant/invoices/[id]`     | Invoice details, due date, paid amount, balance এবং payment history দেখাবে।         | Invoice-এর বর্তমান অবস্থা ও সংশ্লিষ্ট payment বুঝতে।              | Invoice ৳২৫,০০০; Paid ৳১০,০০০; Due ৳১৫,০০০।              |
| `/accountant/payments`          | সব payment record, status, method ও date দেখাবে।                                    | Student-এর payment পর্যবেক্ষণ এবং failed/pending payment খুঁজতে।  | bKash payment ৳১০,০০০, Status: PENDING                   |
| `/accountant/payments/[id]`     | একটি payment-এর বিস্তারিত, invoice, gateway reference ও verification status দেখাবে। | Payment যাচাই ও সমস্যা তদন্ত করতে।                                | Payment gateway reference ও verified amount মিলিয়ে দেখা। |
| `/accountant/transactions`      | Financial ledger entries ও gateway transaction references অনুসন্ধান করবে।           | আর্থিক রেকর্ডের সাথে payment মিলিয়ে reconciliation করতে।          | ৳১০,০০০-এর posted credit entry খুঁজে দেখা।               |
| `/accountant/transactions/[id]` | একটি নির্দিষ্ট transaction-এর বিস্তারিত দেখাবে।                                     | নির্দিষ্ট ledger entry বা gateway reference audit করতে।           | একটি credit transaction কোন payment থেকে এসেছে দেখা।     |
| `/accountant/outstanding-fees`  | Unpaid, partially paid ও overdue Invoice দেখাবে।                                    | বকেয়া ফি সংগ্রহের জন্য follow-up করতে।                            | Due ৳১৫,০০০, Deadline পার হয়েছে।                         |
| `/accountant/refunds`           | Refund requests ও refund status track করবে।                                         | বাতিল বা ফেরতযোগ্য payment পরিচালনা করতে।                         | Duplicate payment-এর ৳৫,০০০ refund request।              |
| `/accountant/refunds/[id]`      | নির্দিষ্ট refund-এর amount, reason ও processing status দেখাবে।                      | Refund সঠিকভাবে প্রক্রিয়াকরণ ও audit করতে।                        | Refund pending, approval প্রয়োজন।                        |
| `/accountant/adjustments`       | Financial correction requests ও তাদের status দেখাবে।                                | ভুল fee বা accounting entry সংশোধনের অনুরোধ পরিচালনা করতে।        | ভুলভাবে অতিরিক্ত ৳১,০০০ charge করা হয়েছে।                |
| `/accountant/adjustments/[id]`  | Adjustment request-এর কারণ, প্রমাণ ও approval status দেখাবে।                        | সংশোধনের audit trail এবং অনুমোদন track করতে।                      | Admin adjustment approve করলে ledger-এ entry তৈরি হবে।   |
| `/accountant/scholarships`      | Scholarship, tuition waiver এবং সংশ্লিষ্ট financial records দেখাবে।                 | অনুমোদিত scholarship অনুযায়ী শিক্ষার্থীর payable fee হিসাব করতে।  | ৳১০,০০০ scholarship একটি tuition invoice-এ প্রয়োগ করা।   |
| `/accountant/scholarships/[id]` | Scholarship-এর amount, status, student ও financial impact দেখাবে।                   | নির্দিষ্ট scholarship-এর হিসাব যাচাই করতে।                        | অনুমোদিত waiver-এর পর student-এর বকেয়া হিসাব দেখা।       |
| `/accountant/receipts`          | Payment receipts খুঁজবে, দেখাবে ও প্রয়োজনমতো print/download করতে দেবে।              | Student-কে payment-এর প্রমাণ দিতে এবং receipt পুনরায় সরবরাহ করতে। | Verified payment-এর receipt PDF তৈরি।                    |
| `/accountant/receipts/[id]`     | নির্দিষ্ট receipt দেখাবে এবং print/download করতে দেবে।                              | নির্দিষ্ট payment-এর প্রমাণ সহজে পাওয়া।                           | INV-001-এর বিপরীতে দেওয়া payment receipt দেখা।           |

## 3. Financial Reports

| Route                                  | কী কাজ করবে?                                                                   | কেন প্রয়োজন?                                             | Example                                                |
| -------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------ |
| `/accountant/reports/financial`        | Revenue, collection, outstanding balance ও refunds-এর সামগ্রিক রিপোর্ট দেখাবে। | বিশ্ববিদ্যালয়ের আর্থিক অবস্থা পর্যালোচনা করতে।           | এই মাসে collection ৳৫,০০,০০০।                          |
| `/accountant/reports/revenue`          | সময়, department, program বা fee type অনুযায়ী revenue breakdown দেখাবে।         | কোন উৎস থেকে কত revenue এসেছে বুঝতে।                     | Tuition Fee থেকে ৳৩,০০,০০০ revenue।                    |
| `/accountant/reports/outstanding-fees` | বকেয়া ফি-এর পরিমাণ, aging এবং overdue distribution দেখাবে।                     | কোন বকেয়া আগে follow-up করা দরকার তা নির্ধারণ করতে।      | ৩০ দিনের বেশি overdue ৳৪০,০০০।                         |
| `/accountant/reports/payments`         | Payment method, status ও সময় অনুযায়ী payment summary দেখাবে।                   | Payment collection ও success/failure rate বিশ্লেষণ করতে। | bKash, card ও bank transfer-এর collection তুলনা।       |
| `/accountant/reports/transactions`     | Ledger entries, credits, debits ও adjustments-এর রিপোর্ট দেখাবে।               | হিসাবের সামঞ্জস্য ও financial audit-এর জন্য।             | একটি নির্দিষ্ট মাসের total credit ও debit মিলিয়ে দেখা। |
| `/accountant/reports/refunds`          | Refund amount, count ও status-এর রিপোর্ট দেখাবে।                               | কত টাকা ফেরত দেওয়া হয়েছে বা pending আছে তা বুঝতে।        | মাসে ৳১২,০০০ refund processed।                         |
| `/accountant/reports/scholarships`     | Scholarship ও fee waiver-এর পরিমাণ এবং distribution দেখাবে।                    | Financial aid-এর প্রভাব ও বিতরণ পর্যালোচনা করতে।         | Scholarship-এর কারণে মোট tuition payable কত কমেছে।     |

## 4. Communication ও Account

| Route                       | কী কাজ করবে?                                                                     | কেন প্রয়োজন?                                            | Example                                         |
| --------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| `/accountant/notifications` | Payment alerts, overdue reminders, refund updates ও system notifications দেখাবে। | গুরুত্বপূর্ণ finance-related event যেন মিস না হয়।       | একটি বড় payment verification-এর অপেক্ষায় আছে।   |
| `/accountant/profile`       | Accountant-এর নাম, email, designation ও profile information দেখাবে।              | ব্যবহারকারীর পরিচয় ও account information পরিচালনা করতে। | Accountant-এর নাম ও contact details update করা। |
| `/accountant/settings`      | অনুমোদিত personal preferences ও notification preferences নিয়ন্ত্রণ করবে।         | ব্যবহারকারীর নিজস্ব settings পরিচালনা করতে।             | Email notification preference পরিবর্তন।         |

## 5. একটি বাস্তব উদাহরণ: Student-এর Invoice থেকে Payment পর্যন্ত

ধরা যাক, Student Ayan-এর Semester Tuition Fee ৳২৫,০০০।

Step 1 — Invoice তৈরি

`/accountant/invoices/new`

Accountant Ayan-কে select করে ৳২৫,০০০-এর invoice তৈরি করবে। Database-এ invoice-এর `studentId` Ayan-এর StudentProfile-এর সঙ্গে যুক্ত হবে।

Step 2 — Student Invoice দেখতে পাবে

`/student/invoices`

Ayan নিজের dashboard-এ invoice দেখতে পাবে। অন্য Student এই invoice দেখতে পারবে না।

Step 3 — Payment করা

`/student/payments/new`

Ayan payment gateway-এর মাধ্যমে টাকা দেবে। Backend payment record তৈরি করবে এবং provider-এর response/webhook যাচাই করবে।

Step 4 — Payment যাচাই

`/accountant/payments`

Accountant payment status ও transaction details পর্যবেক্ষণ করবে। Gateway verification-এর আগে payment-কে সফল হিসেবে গণ্য করা যাবে না।

Step 5 — Receipt ও Ledger

`/accountant/receipts` এবং `/accountant/transactions`

Payment নিশ্চিত হওয়ার পর receipt পাওয়া যাবে এবং নিয়ম অনুযায়ী financial ledger update হবে।

## 6. কোনগুলো আগে তৈরি করবে?

| Priority             | Routes                                                                    | কারণ                                                     |
| -------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------- |
| Phase 1 — Core       | Dashboard, Students, Invoices, Invoice Details, Payments, Payment Details | Invoice তৈরি থেকে payment tracking পর্যন্ত মূল workflow। |
| Phase 2 — Accounting | Transactions, Outstanding Fees, Receipts                                  | Reconciliation, due collection ও payment proof।          |
| Phase 3 — Controls   | Refunds, Adjustments, Scholarships                                        | ব্যতিক্রমী financial workflow ও fee adjustment।          |
| Phase 4 — Reporting  | Financial, Revenue, Outstanding, Payment ও Transaction Reports            | Management reporting ও audit।                            |
| Phase 5 — Supporting | Notifications, Profile, Settings                                          | ব্যবহারকারীর অভিজ্ঞতা ও account management।              |

দুটি গুরুত্বপূর্ণ নিয়ম:

1. `Payments` এবং `Transactions` আলাদা রাখবে। Payment হলো payment-এর record; financial transaction হলো accounting ledger-এর entry। একটি payment-এর gateway attempt এবং ledger posting এক জিনিস নয়।

2. Accountant-এর UI-তে কোনো action দেখালেই তাকে সেই action করার অনুমতি দেওয়া যাবে না। Refund, adjustment approval এবং payment verification-এর জন্য backend-এ সঠিক role, permission ও audit trail নিশ্চিত করতে হবে।


*/



