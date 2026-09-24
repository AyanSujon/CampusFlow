// import React from 'react'

// export default function RoleGuard() {
//   return (
//     <div>RoleGuard</div>
//   )
// }









"use client";

import { useGetMe } from '@/hooks/auth.hook'
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'
import AuthLoading from './auth-loading';
import { UserRole } from '@/types';
import AccessDenied from './access-denied';


interface IProps {
  children: ReactNode,
  roles: UserRole[]
}

export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();

  const { data, isPending, isError } = useGetMe();

  const user = data.data;

  const isAuthorized = !!user && roles.includes(user.role);

console.log("RoleGuard Debug:", {
  user,
  userRole: user?.role,
  allowedRoles: roles,
  isAuthorized,
});

  // console.log(user);

  useEffect(() => {
    // Wait until authentication request is completed
    if (isPending) {
      return;
    }
    // Redirect if authentication failed or no user exists
    if (isError || !user) {
      router.push("/login");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label='Redirecting...' />;
  }


  if(isAuthorized){
    return <>{children}</>;
  }

  return (
   <AccessDenied/>
  )
}



