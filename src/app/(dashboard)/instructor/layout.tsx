import RoleGuard from '@/components/auth/role-guard'
import React, { ReactNode } from 'react'

export default function InstructorLayout({children}: {children: ReactNode}) {
  return (
    <RoleGuard roles={["INSTRUCTOR"]}>InstructorLayout {children}</RoleGuard>
  )
}



