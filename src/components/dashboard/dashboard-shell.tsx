

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DeshboardSidebar } from "./dashboard-sidebar"
import { ReactNode } from "react"
import { UserRole } from "@/types"
import ThemeSwitcher from "../shared/ThemeSwitcher"
import UserMenu from "../shared/user-menu"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Bell } from "lucide-react"

export default function DeshboardShell({ children, userRole }: { children: ReactNode, userRole: UserRole }) {
  return (
    <SidebarProvider>
      <DeshboardSidebar userRole={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>

          <div className="ml-auto">
            <div className="flex items-center justify-end gap-2 mr-6">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {/* Badge */}
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-destructive-foreground">
                  3
                </span>
              </Button>
              <ThemeSwitcher />
              <UserMenu />
            </div>
          </div>

        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
