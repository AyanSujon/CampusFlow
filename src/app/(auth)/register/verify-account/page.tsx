// "use client"
// import { useSearchParams } from 'next/navigation';
// import React from 'react'

// export default function VerifyAccountPage() {
//   const searchParams = useSearchParams();

// const email = searchParams.get("email");



//   return (
//     <div>
//     <h1>user emai: {email}</h1>
    
//     VerifyAccountPage</div>
//   )
// }












// import Logo from "@/assets/svg/Logo";
import VerifyAccountForm from "@/components/modules/form/verify-account-form";
import Image from "next/image";
// import VerifyAccountForm from "@/components/form/verify-account-form";

import Link from "next/link";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div className="grid min-h-screen ">
        <div className="flex flex-1 items-center justify-center m-2">
          <div className="w-full max-w-sm">
            <Suspense fallback={<p>Loading...</p>}>
              <VerifyAccountForm/>
            </Suspense>
          </div>
        </div>
    </div>
  );
}