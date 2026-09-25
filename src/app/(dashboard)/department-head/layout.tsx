
// import RoleGuard from '@/components/auth/role-guard'
// import React, { ReactNode } from 'react'

// export default function DepartmentHeadLayout({children}: {children: ReactNode}) {
//   return (
//     <RoleGuard roles={["DEPARTMENT_HEAD"]}>DepartmentHeadLayout {children}</RoleGuard>
//   )
// }











import RoleGuard from '@/components/auth/role-guard'
import DeshboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

export default function DepartmentHeadLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <RoleGuard roles={['DEPARTMENT_HEAD']}>
      <DeshboardShell userRole="DEPARTMENT_HEAD">
        {children}
      </DeshboardShell>
    </RoleGuard>
  )
}