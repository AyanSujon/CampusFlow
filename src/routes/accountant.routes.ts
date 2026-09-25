import {
  LayoutDashboard,
  GraduationCap,
  Receipt,
  BarChart3,
  Bell,
  Settings2,
} from "lucide-react"



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
  },
  {
    title: "Finance",
    url: "/accountant/invoices",
    icon: Receipt,
    items: [
      { title: "Invoices", url: "/accountant/invoices" },
      { title: "Payments", url: "/accountant/payments" },
      { title: "Transactions", url: "/accountant/transactions" },
      { title: "Outstanding Fees", url: "/accountant/outstanding-fees" },
      { title: "Payment History", url: "/accountant/payments/history" },
    ],
  },
  {
    title: "Reports",
    url: "/accountant/reports/financial",
    icon: BarChart3,
    items: [
      { title: "Financial Reports", url: "/accountant/reports/financial" },
      { title: "Revenue Reports", url: "/accountant/reports/revenue" },
      { title: "Outstanding Fees Report", url: "/accountant/reports/outstanding-fees" },
    ],
  },
  {
    title: "Communication",
    url: "/accountant/notifications",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/accountant/notifications" },
    ],
  },
  {
    title: "Account",
    url: "/accountant/profile",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/accountant/profile" },
      { title: "Settings", url: "/accountant/settings" },
    ],
  },
]


