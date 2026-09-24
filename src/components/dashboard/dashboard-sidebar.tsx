// "use client"

// import * as React from "react"
// import {
//   BookOpen,
//   Bot,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { DeshboardItems } from "./deshboard-items"
// import { DeshboardUser } from "./deshboard-user"

// // This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
// }

// export function DeshboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//       <p>Logo</p>
//       </SidebarHeader>
//       <SidebarContent>
//         <DeshboardItems items={data.navMain} />
//       </SidebarContent>
//       <SidebarFooter>
//         <DeshboardUser user={data.user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   )
// }






















"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DeshboardItems } from "./deshboard-items"
import { DeshboardUser } from "./deshboard-user"
import { UserRole } from "@/types"
import { accountantRoutes, adminRoutes, departmentHeadRoutes, instructorRoutes, studentRoutes, superAdminRoutes } from "@/routes"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}


const sidebarRoutes = {
  SUPER_ADMIN: superAdminRoutes,
  ADMIN: adminRoutes,
  DEPARTMENT_HEAD: departmentHeadRoutes,
  INSTRUCTOR: instructorRoutes,
  STUDENT: studentRoutes,
  ACCOUNTANT: accountantRoutes
}





export function DeshboardSidebar({role}: {role: UserRole}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
      <p>Logo</p>
      </SidebarHeader>
      <SidebarContent>
        <DeshboardItems items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <DeshboardUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
