import type { LucideIcon } from "lucide-react"

export interface SidebarItem {
  title: string
  url: string
}

export interface SidebarGroup {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: SidebarItem[]
}

export type SidebarItems = SidebarGroup[];