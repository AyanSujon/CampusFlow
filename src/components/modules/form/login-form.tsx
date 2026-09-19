





// "use client";

// import { useState } from "react";
// import { toast } from "@/components/ui/toast";
// import { useForm } from "@tanstack/react-form";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
//   FieldSeparator,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";

// import Image from "next/image";
// import Link from "next/link";

// import { useLogin } from "@/hooks/auth.hook";
// import { useRouter } from "next/navigation";

// import { Eye, EyeClosed } from "lucide-react";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const router = useRouter();

//   const { mutate: login, isPending: loginPending } = useLogin();

//   const form = useForm({
//     defaultValues: {
//       email: "superadmin@gmail.com",
//       password: "Super@admin12345",
//     },

//     // validators: {
//     //   onSubmit: loginSchema,
//     // },

//     onSubmit: ({ value }) => {
//       const loginData = {
//         email: value.email,
//         password: value.password,
//       };

//       login(loginData, {
//         onSuccess: () => {
//           toast.add({
//             title: "Login Success",
//             description: "Welcome back",
//             type: "success",
//           });

//           router.push("/");
//         },

//         onError: (err) => {
//           toast.add({
//             title: "Authorization failure",
//             description:
//               err.message || "Something went wrong. Please try again",
//             type: "error",
//           });
//         },
//       });
//     },
//   });

//   return (
//     <div className="flex flex-col gap-6">
//       <Card className="overflow-hidden p-0">
//         <CardContent className="grid p-0 md:grid-cols-2">
//           <form
//             className="p-6 md:p-8"
//             onSubmit={(event) => {
//               event.preventDefault();
//               form.handleSubmit();
//             }}
//           >
//             <FieldGroup>
//               {/* Header */}
//               <div className="flex flex-col items-center gap-2 text-center">
//                 <h1 className="text-2xl font-bold">Welcome back</h1>

//                 <p className="text-balance text-muted-foreground">
//                   Login to your Acme Inc account
//                 </p>
//               </div>

//               {/* Email */}
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>

//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="yourname@example.com"
//                     //  value={field.state.value}
//                   value={email}
//                   onChange={(event) => setEmail(event.target.value)}
//                   className="h-10"
//                   required
//                 />
//               </Field>

//               {/* Password */}
//               <Field>
//                 <div className="mb-2 flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>

//                   <Link
//                     href="/forgot-password"
//                     className="ml-auto text-sm underline-offset-2 hover:underline"
//                   >
//                     Forgot your password?
//                   </Link>
//                 </div>

//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     className="h-10 pr-10"
//                     required
//                   />

//                   <button
//                     type="button"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
//                   >
//                     {showPassword ? (
//                       <EyeClosed className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </Field>

//               {/* Login Button */}
//               <Field>
//                 <Button
//                   type="submit"
//                   disabled={loginPending}
//                   className="w-full"
//                 >
//                   {loginPending ? "Logging in..." : "Login"}
//                 </Button>
//               </Field>

//               {/* Separator */}
//               <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
//                 Or continue with
//               </FieldSeparator>

//               {/* Google Login */}
//               <Field className="grid grid-cols-1 gap-4">
//                 <Button
//                   variant="outline"
//                   type="button"
//                   className="w-full"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     className="size-5"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.42Z"
//                       fill="#4285F4"
//                     />

//                     <path
//                       d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.5Z"
//                       fill="#34A853"
//                     />

//                     <path
//                       d="M6.54 13.58A5.86 5.86 0 0 1 6.23 12c0-.55.11-1.09.31-1.58V7.89H3.29A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.11l3.25-2.53Z"
//                       fill="#FBBC05"
//                     />

//                     <path
//                       d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.39l3.25 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
//                       fill="#EA4335"
//                     />
//                   </svg>

//                   <span>Continue with Google</span>
//                 </Button>
//               </Field>

//               {/* Register Link */}
//               <FieldDescription className="text-center">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   href="/register"
//                   className="underline-offset-2 hover:underline"
//                 >
//                   Sign up
//                 </Link>
//               </FieldDescription>
//             </FieldGroup>
//           </form>

//           {/* Login Image */}
//           <div className="relative hidden bg-muted md:block">
//             <Image
//               width={700}
//               height={700}
//               src="/images/login-image.jpg"
//               alt="Login Image"
//               className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Terms */}
//       <FieldDescription className="px-6 text-center">
//         By clicking continue, you agree to our{" "}
//         <Link
//           href="/terms"
//           className="underline-offset-2 hover:underline"
//         >
//           Terms of Service
//         </Link>{" "}
//         and{" "}
//         <Link
//           href="/privacy-policy"
//           className="underline-offset-2 hover:underline"
//         >
//           Privacy Policy
//         </Link>
//         .
//       </FieldDescription>
//     </div>
//   );
// }

























// "use client";

// import { useForm } from "@tanstack/react-form";

// // import {
// //   Field,
// //   FieldError,
// //   FieldGroup,
// //   FieldLabel,
// //   FieldSeparator,
// // } from "../ui/field";

// import { useState } from "react";
// import { Eye, EyeClosed } from "lucide-react";

// import { useRouter } from "next/navigation";

// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/toast";
// import { useLogin } from "@/hooks/auth.hook";
// import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";

// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const { mutate: login, isPending: loginPending } = useLogin();

//   const form = useForm({
//     defaultValues: {
//       email: "superadmin@gmail.com",
//       password: "Super@admin12345",
//     },
//     // validators: {
//     //   onSubmit: loginSchema,
//     // },
//     onSubmit: ({ value }) => {
//       const loginData = {
//         email: value.email,
//         password: value.password,
//       };

//       login(loginData, {
//         onSuccess: (res) => {
//           toast.add({
//             title: "Login Success",
//             description: "Welcome back",
//             type: "success",
//           });
//           router.push("/");
//         },
//         onError: (err) => {
//           toast.add({
//             title: "Authorization failure",
//             description:
//               err.message || "Something went wrong. Please try again",
//             type: "error",
//           });
//         },
//       });
//     },
//   });

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold tracking-tight">
//           Login to your account
//         </h1>
//         <p className="text-balance text-sm text-muted-foreground">
//           Enter your email below to login to your account
//         </p>
//       </div>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           form.handleSubmit();
//         }}
//       >
//         <FieldGroup>
//           <form.Field name="email">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     onBlur={field.handleBlur}
//                     value={field.state.value}
//                     autoComplete="off"
//                     aria-invalid={isInvalid}
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <form.Field name="password">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                   <div className="relative">
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type={showPassword ? "text" : "password"}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       onBlur={field.handleBlur}
//                       value={field.state.value}
//                       autoComplete="off"
//                       aria-invalid={isInvalid}
//                     />
//                     <button
//                       className="absolute right-3 top-1/2 -translate-y-1/2"
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                     >
//                       {showPassword ? (
//                         <EyeClosed className="size-4" />
//                       ) : (
//                         <Eye className="size-4" />
//                       )}
//                     </button>
//                   </div>
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <Button disabled={loginPending} type="submit">
//             {loginPending ? (
//               <>
//                 <Spinner /> submitting
//               </>
//             ) : (
//               "Submit"
//             )}
//           </Button>
//         </FieldGroup>
//       </form>

//       <FieldSeparator>Or continue with</FieldSeparator>

//       {/* <GoogleLoginComponent /> */}

//       <div className="text-center text-sm text-muted-foreground">
//         Don&apos;t have an account?{" "}
//         <Link
//           href="/register"
//           className="font-medium underline underline-offset-4 hover:text-primary"
//         >
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// }








































"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import Link from "next/link";

import { useLogin } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";

import { Eye, EyeClosed } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import GoogleLoginComponent from "../google-login/GoogleLogin";


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "Super@admin12345",
    },

    // validators: {
    //   onSubmit: loginSchema,
    // },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });
          console.log(res, "login data: __________________")

          router.push("/");
        },

        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });





  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >

            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>

              <p className="text-balance text-muted-foreground">
                Login to your CampusFlow account
              </p>
            </div>



            <FieldGroup>
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">

                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>

                      <div className="mb-2 flex items-center">

                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                        <Link
                          href="/forgot-password"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          aria-invalid={isInvalid}
                        />
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeClosed className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              </form.Field>

              <Button disabled={loginPending} type="submit">
                {loginPending ? (
                  <>
                    <Spinner /> Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>

              {/* Separator */}
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {/* Google Login */}
              <GoogleLoginComponent/>

              {/* Register Link */}
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="underline-offset-2 hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>

            </FieldGroup>

          </form>

          {/* Login Image */}
          <div className="relative hidden bg-muted md:block">
            <Image
              width={700}
              height={700}
              src="/images/login-image.jpg"
              alt="Login Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline-offset-2 hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy-policy"
          className="underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}







