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
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: GraduationCap,
  },
  {
    title: "Finance",
    url: "/dashboard/invoices",
    icon: Receipt,
    items: [
      { title: "Invoices", url: "/dashboard/invoices" },
      { title: "Payments", url: "/dashboard/payments" },
      { title: "Transactions", url: "/dashboard/transactions" },
      { title: "Outstanding Fees", url: "/dashboard/outstanding-fees" },
      { title: "Payment History", url: "/dashboard/payments/history" },
    ],
  },
  {
    title: "Reports",
    url: "/dashboard/reports/financial",
    icon: BarChart3,
    items: [
      { title: "Financial Reports", url: "/dashboard/reports/financial" },
      { title: "Revenue Reports", url: "/dashboard/reports/revenue" },
      { title: "Outstanding Fees Report", url: "/dashboard/reports/outstanding-fees" },
    ],
  },
  {
    title: "Communication",
    url: "/dashboard/notifications",
    icon: Bell,
    items: [
      { title: "Notifications", url: "/dashboard/notifications" },
    ],
  },
  {
    title: "Account",
    url: "/dashboard/profile",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/dashboard/profile" },
      { title: "Settings", url: "/dashboard/settings" },
    ],
  },
]


