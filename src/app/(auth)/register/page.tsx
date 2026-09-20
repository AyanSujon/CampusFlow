import { RegisterForm } from '@/components/modules/form/register-form'
import React from 'react'


export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm />
      </div>
    </div>

  )
}









































// "use client"
// // import { RegisterForm } from '@/components/modules/form/register-form'
// import { AccountStep } from '@/components/modules/form/AccountStep'
// import { AccountRegistrationSchema } from '@/components/modules/form/register.validation';
// import { StudentProfileStep } from '@/components/modules/form/StudentProfileStep'
// import React, { useState } from 'react'
// import { useForm } from "@tanstack/react-form";
// import Image from 'next/image';


// export default function RegisterPage() {

//     const [step, setStep] = useState(1);



//     const form = useForm({
//         defaultValues: {
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: "",

//             studentProfile: {
//                 programId: "",
//                 dateOfBirth: "",
//                 gender: undefined,
//                 phone: "",
//                 address: "",
//                 bloodGroup: "",
//                 guardianName: "",
//                 guardianPhone: "",
//             },
//         },

//         onSubmit: async ({ value }) => {
//             console.log("Registration Data:", value);
//         },
//     });









//     const handleNext = async () => {
//         const result = AccountRegistrationSchema.safeParse({
//             name: form.getFieldValue("name"),
//             email: form.getFieldValue("email"),
//             password: form.getFieldValue("password"),
//             confirmPassword: form.getFieldValue("confirmPassword"),
//         });

//         if (!result.success) {
//             // Show validation errors
//             return;
//         }

//         setStep(2);
//     };















//     return (
//         <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
//             <div className="w-full max-w-sm md:max-w-4xl">
//                 <div>
//                     {step === 1 && (
//                         <AccountStep
//                             form={form}
//                             onNext={() => setStep(2)}
//                         />
//                     )}

//                     {step === 2 && (
//                         <StudentProfileStep
//                             form={form}
//                             onBack={() => setStep(1)}
//                             onSubmit={() => form.handleSubmit()}
//                         />
//                     )}
//                 </div>
//             </div>


            
//                       {/* Login Image */}
//                       <div className="relative hidden bg-muted md:block">
//                         <Image
//                           width={700}
//                           height={700}
//                           src="/images/login-image.jpg"
//                           alt="Login Image"
//                           className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//                         />
//                       </div>

//         </div>

//     )
// }


