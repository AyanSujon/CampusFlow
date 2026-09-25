// import RoleGuard from '@/components/auth/role-guard'
// import React, { ReactNode } from 'react'

// export default function SuperAdminLayout({children}: {children: ReactNode}) {
//   return (
//     <RoleGuard roles={["SUPER_ADMIN"]}>SuperAdminLayout {children}</RoleGuard>
//   )
// }




import RoleGuard from '@/components/auth/role-guard'
import DeshboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <RoleGuard roles={['SUPER_ADMIN']}>
      <DeshboardShell userRole="SUPER_ADMIN">
        {children}
      </DeshboardShell>
    </RoleGuard>
  )
}