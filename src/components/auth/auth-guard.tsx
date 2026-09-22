"use client";

import { useGetMe } from '@/hooks/auth.hook'
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'

export default function AuthGuard({children} : {children: ReactNode}) {
    const router = useRouter();

const {data, isPending, isError} =useGetMe();

const user = data;


console.log(user);

  useEffect(() => {
    // Wait until authentication request is completed
    if(isPending){
        return; 
    }
    // Redirect if authentication failed or no user exists
    if (isError || !user) {
      router.push("/login");
    }
  }, [isPending, isError, user, router]);


  return (
    <>{children}</>
  )
}



