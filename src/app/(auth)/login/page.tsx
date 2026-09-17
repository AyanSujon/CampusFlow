
// import { LoginForm } from "@/components/modules/form/login-form";
// import { useLogin } from "@/hooks/auth.hook";


// export default function LoginPage() {

//   const mutation = useLogin();

//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
//       <div className="w-full max-w-sm md:max-w-4xl">
//         <LoginForm />
//       </div>
//     </div>
//   )
// }








"use client";


import { LoginForm } from "@/components/modules/form/login-form";
import { useLogin } from "@/hooks/auth.hook";
import { useForm } from "@tanstack/react-form";
export default function LoginPage() {
  // const {mutate: login , isPending: loginPending} = useLogin();

  // // const handleLogin = (data: {
  // //   email: string;
  // //   password: string;
  // // }) => {
  // //   mutation.mutate(data);
  // // };


  // const form = useForm({
  //   defaultValues: {
  //     email: "",
  //     password: ""
  //   },
  //   // validators:{
  //   //   onsubmit: loginSchema
  //   // }

  //   onSubmit: ({value}) =>{
  //     console.log(value)
  //   }
  // })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm
        />
      </div>
    </div>
  );
}


