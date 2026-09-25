
// import RoleGuard from '@/components/auth/role-guard'
// import React, { ReactNode } from 'react'

// export default function AccountantLayout({children}: {children: ReactNode}) {
//   return (
//     <RoleGuard roles={["ACCOUNTANT"]}>AccountantLayout {children}</RoleGuard>
//   )
// }





import RoleGuard from '@/components/auth/role-guard'
import DeshboardShell from '@/components/dashboard/dashboard-shell'
import React, { ReactNode } from 'react'

export default function AccountantLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <RoleGuard roles={['ACCOUNTANT']}>
      <DeshboardShell userRole="ACCOUNTANT">
        {children}
      </DeshboardShell>
    </RoleGuard>
  )
}