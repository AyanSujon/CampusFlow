import RoleGuard from '@/components/auth/role-guard'
import React, { ReactNode } from 'react'

export default function SuperAdminLayout({children}: {children: ReactNode}) {
  return (
    <RoleGuard roles={["SUPER_ADMIN"]}>SuperAdminLayout {children}</RoleGuard>
  )
}
