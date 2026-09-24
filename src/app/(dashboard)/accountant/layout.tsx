
import RoleGuard from '@/components/auth/role-guard'
import React, { ReactNode } from 'react'

export default function AccountantLayout({children}: {children: ReactNode}) {
  return (
    <RoleGuard roles={["ACCOUNTANT"]}>AccountantLayout {children}</RoleGuard>
  )
}
