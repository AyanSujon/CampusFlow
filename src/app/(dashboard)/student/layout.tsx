import RoleGuard from '@/components/auth/role-guard'
import React, { ReactNode } from 'react'

export default function StudentLayout({children}: {children: ReactNode}) {
  return (
    <RoleGuard roles={['STUDENT']}>{children}</RoleGuard>
  )
}
