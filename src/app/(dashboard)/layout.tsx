import AuthGuard from '@/components/auth/auth-guard'
import React, { ReactNode } from 'react'

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <AuthGuard>General DashboardLayout {children}</AuthGuard>
  )
}
