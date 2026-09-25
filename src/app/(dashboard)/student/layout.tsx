// import RoleGuard from '@/components/auth/role-guard'
// import React, { ReactNode } from 'react'

// export default function StudentLayout({children}: {children: ReactNode}) {
//   return (
//     <RoleGuard roles={['STUDENT']}>{children}</RoleGuard>
//   )
// }






import RoleGuard from '@/components/auth/role-guard'
import DeshboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

export default function StudentLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <RoleGuard roles={['STUDENT']}>
      <DeshboardShell userRole="STUDENT">
        {children}
      </DeshboardShell>
    </RoleGuard>
  )
}