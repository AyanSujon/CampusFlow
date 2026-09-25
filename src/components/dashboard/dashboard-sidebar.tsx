



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
// import { SidebarItems, UserRole } from "@/types"
// import { accountantRoutes, adminRoutes, departmentHeadRoutes, instructorRoutes, studentRoutes, superAdminRoutes } from "@/routes"


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


// const sidebarRoutes : Record<UserRole, SidebarItems>  = {
//   SUPER_ADMIN: superAdminRoutes,
//   ADMIN: adminRoutes,
//   DEPARTMENT_HEAD: departmentHeadRoutes,
//   INSTRUCTOR: instructorRoutes,
//   STUDENT: studentRoutes,
//   ACCOUNTANT: accountantRoutes
// };





// export function DeshboardSidebar({role}: {role: UserRole}) {
//   const routes: SidebarItems = sidebarRoutes[role] || [];




//   return (
//     <Sidebar collapsible="icon">
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
  ChevronRight,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { DeshboardUser } from "./deshboard-user"
import { SidebarItems, UserRole } from "@/types"
import { accountantRoutes, adminRoutes, departmentHeadRoutes, instructorRoutes, studentRoutes, superAdminRoutes } from "@/routes"
import { usePathname } from "next/navigation"
import Link from "next/link"

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  SUPER_ADMIN: superAdminRoutes,
  ADMIN: adminRoutes,
  DEPARTMENT_HEAD: departmentHeadRoutes,
  INSTRUCTOR: instructorRoutes,
  STUDENT: studentRoutes,
  ACCOUNTANT: accountantRoutes
};





export function DeshboardSidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();
  const routes: SidebarItems = sidebarRoutes[userRole] || [];

  console.log(pathname);


  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <p>Logo</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>

          <SidebarMenu>
            {routes.map((item) => {
              const Icon = item.icon

              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton tooltip={item.title} />
                      }
                    >
                      {Icon && <Icon />}

                      <span>{item.title}</span>

                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              render={
                                <Link href={subItem.url} />
                              }
                              isActive= {pathname === subItem.url}
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <DeshboardUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
