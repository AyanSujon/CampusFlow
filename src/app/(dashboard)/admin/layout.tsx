
import RoleGuard from '@/components/auth/role-guard'
import DeshboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <RoleGuard roles={['ADMIN']}>
      <DeshboardShell userRole="ADMIN">
        {children}
      </DeshboardShell>
    </RoleGuard>
  )
}