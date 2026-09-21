










// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useForm } from "@tanstack/react-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";

// import { toast } from "@/components/ui/toast";
// import { verifyUserAccount } from "@/api";

// // OTP Validation Schema
// const VerifyUserAccountSchema = z.object({
//   otp: z
//     .string()
//     .length(6, "OTP must be exactly 6 digits")
//     .regex(/^\d+$/, "OTP must contain only numbers"),
// });

// export default function VerifyAccountForm() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const email = searchParams.get("email");

//   const form = useForm({
//     defaultValues: {
//       otp: "",
//     },

//     validators: {
//       onSubmit: VerifyUserAccountSchema,
//     },

//     onSubmit: async ({ value }) => {
//       if (!email) {
//         toast.add({
//           title: "Email is missing",
//           description:
//             "Please check your email and verify your account.",
//           type: "error",
//         });
//         return;
//       }

//       const verificationData = {
//         email,
//         otp: value.otp,
//       };


//       try {
//         console.log("Verification Data:", verificationData);

//         // TODO: Call your verify OTP API
//         await verifyUserAccount(verificationData);

//         toast.add({
//           title: "OTP verified successfully!",
//           description: "Your account has been verified.",
//           type: "success",
//         });

//         router.push("/login");
//       } catch (error) {
//         toast.add({
//           title: "OTP verification failed",
//           description: "Please try again.",
//           type: "error",
//         });
//       }
//     },
//   });

//   return (
//     <Card className="mx-auto w-full max-w-md">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">
//           Verify Your Account
//         </CardTitle>

//         <CardDescription>
//           Enter the 6-digit OTP sent to your email.
//         </CardDescription>

//         {email && (
//           <p className="text-sm font-medium text-muted-foreground">
//             {email}
//           </p>
//         )}
//       </CardHeader>

//       <CardContent>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             form.handleSubmit();
//           }}
//           className="space-y-6"
//         >
//           <form.Field
//             name="otp"
//             validators={{
//               onChange: VerifyUserAccountSchema.shape.otp,
//             }}
//           >
//             {(field) => (
//               <div className="flex flex-col items-center space-y-3">
//                 <label
//                   htmlFor="otp"
//                   className="self-start text-sm font-medium"
//                 >
//                   Enter OTP
//                 </label>

//                 <InputOTP
//                   id="otp"
//                   maxLength={6}
//                   value={field.state.value}
//                   onChange={(value) => {
//                     const numericValue = value
//                       .replace(/\D/g, "")
//                       .slice(0, 6);

//                     field.handleChange(numericValue);
//                   }}
//                   inputMode="numeric"
//                   autoComplete="one-time-code"
//                 >
//                   <InputOTPGroup>
//                     <InputOTPSlot index={0} />
//                     <InputOTPSlot index={1} />
//                     <InputOTPSlot index={2} />
//                     <InputOTPSlot index={3} />
//                     <InputOTPSlot index={4} />
//                     <InputOTPSlot index={5} />
//                   </InputOTPGroup>
//                 </InputOTP>

//                 {field.state.meta.isTouched &&
//                   field.state.meta.errors.length > 0 && (
//                     <p className="self-start text-sm text-red-500">
//                       {field.state.meta.errors
//                         .map((error) =>
//                           typeof error === "string"
//                             ? error
//                             : error?.message
//                         )
//                         .join(", ")}
//                     </p>
//                   )}
//               </div>
//             )}
//           </form.Field>

//           <form.Subscribe
//             selector={(state) => ({
//               isSubmitting: state.isSubmitting,
//               otp: state.values.otp,
//             })}
//           >
//             {({ isSubmitting, otp }) => (
//               <Button
//                 type="submit"
//                 className="w-full"
//                 disabled={
//                   isSubmitting || otp.length !== 6
//                 }
//               >
//                 {isSubmitting
//                   ? "Verifying..."
//                   : "Verify Account"}
//               </Button>
//             )}
//           </form.Subscribe>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
















"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "@/components/ui/toast";
import { resendOTP, verifyUserAccount } from "@/api";

// ============================================
// Constants
// ============================================

const RESEND_COOLDOWN = 60; // 1 minutes

// ============================================
// OTP Validation Schema
// ============================================

const VerifyUserAccountSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  // ============================================
  // Resend OTP State
  // ============================================

  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  // ============================================
  // Countdown Timer
  // ============================================

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // ============================================
  // Format Timer
  // ============================================

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // ============================================
  // Verify Account Form
  // ============================================

  const form = useForm({
    defaultValues: {
      otp: "",
    },

    validators: {
      onSubmit: VerifyUserAccountSchema,
    },

    onSubmit: async ({ value }) => {
      if (!email) {
        toast.add({
          title: "Email is missing",
          description:
            "Please check your email and verify your account.",
          type: "error",
        });

        return;
      }

      const verificationData = {
        email,
        otp: value.otp,
      };

      try {
        await verifyUserAccount(verificationData);

        toast.add({
          title: "OTP verified successfully!",
          description: "Your account has been verified.",
          type: "success",
        });

        router.push("/login");
      } catch (error: any) {
        toast.add({
          title: "OTP verification failed",
          description:
            error?.response?.data?.message ||
            error?.message ||
            "The OTP is invalid or has expired. Please try again.",
          type: "error",
        });
      }
    },
  });

  // ============================================
  // Resend OTP
  // ============================================

  const handleResendOTP = async () => {
    // Prevent resend without email
    if (!email) {
      toast.add({
        title: "Email is missing",
        description:
          "Unable to resend OTP because your email address is missing.",
        type: "error",
      });

      return;
    }

    // Prevent multiple requests
    if (isResending) {
      return;
    }

    // Prevent resend during cooldown
    if (resendTimer > 0) {
      return;
    }

    try {
      setIsResending(true);

      const response = await resendOTP(email);

      toast.add({
        title: "OTP sent successfully",
        description:
          response?.message ||
          "A new OTP has been sent to your email.",
        type: "success",
      });

      // Clear old OTP
      form.setFieldValue("otp", "");

      // Restart 5-minute cooldown
      setResendTimer(RESEND_COOLDOWN);
    } catch (error: any) {
      toast.add({
        title: "Failed to resend OTP",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Please try again later.",
        type: "error",
      });
    } finally {
      setIsResending(false);
    }
  };

  // ============================================
  // Render
  // ============================================

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Verify Your Account
        </CardTitle>

        <CardDescription>
          Enter the 6-digit OTP sent to your email.
        </CardDescription>

        {email && (
          <p className="text-sm font-medium text-muted-foreground">
            {email}
          </p>
        )}
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* ============================================
              OTP Input
          ============================================ */}

          <form.Field
            name="otp"
            validators={{
              onChange: VerifyUserAccountSchema.shape.otp,
            }}
          >
            {(field) => (
              <div className="flex flex-col items-center space-y-3">
                <label
                  htmlFor="otp"
                  className="self-start text-sm font-medium"
                >
                  Enter OTP
                </label>

                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={field.state.value}
                  onChange={(value) => {
                    const numericValue = value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                    field.handleChange(numericValue);
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="self-start text-sm text-red-500">
                      {field.state.meta.errors
                        .map((error) =>
                          typeof error === "string"
                            ? error
                            : error?.message
                        )
                        .join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {/* ============================================
              Resend OTP
          ============================================ */}

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the OTP?
            </p>

            <Button
              type="button"
              variant="link"
              onClick={handleResendOTP}
              disabled={isResending || resendTimer > 0}
              className="h-auto p-0"
            >
              {isResending
                ? "Sending OTP..."
                : resendTimer > 0
                ? `Resend OTP in ${formatTime(resendTimer)}`
                : "Resend OTP"}
            </Button>
          </div>

          {/* ============================================
              Verify Button
          ============================================ */}

          <form.Subscribe
            selector={(state) => ({
              isSubmitting: state.isSubmitting,
              otp: state.values.otp,
            })}
          >
            {({ isSubmitting, otp }) => (
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || otp.length !== 6}
              >
                {isSubmitting
                  ? "Verifying..."
                  : "Verify Account"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}

