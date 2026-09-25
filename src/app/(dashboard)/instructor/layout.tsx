// import RoleGuard from '@/components/auth/role-guard'
// import React, { ReactNode } from 'react'

// export default function InstructorLayout({children}: {children: ReactNode}) {
//   return (
//     <RoleGuard roles={["INSTRUCTOR"]}>InstructorLayout {children}</RoleGuard>
//   )
// }




import RoleGuard from '@/components/auth/role-guard'
import DeshboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

export default function InstructorLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <RoleGuard roles={['INSTRUCTOR']}>
      <DeshboardShell userRole="INSTRUCTOR">
        {children}
      </DeshboardShell>
    </RoleGuard>
  )
}