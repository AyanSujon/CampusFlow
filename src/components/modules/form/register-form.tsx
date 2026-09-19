


"use client";

import React, { useState } from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { StudentProfileForm } from "./StudentProfileForm";
import { RegisterFormData } from "./register.interface";
import { accountSchema, registerSchema } from "./register.validation";
import { OTPForm } from "./OTPForm";
import GoogleLoginComponent from "../google-login/GoogleLogin";



const initialFormData: RegisterFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    studentProfile: {
        programId: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        address: "",
        bloodGroup: "",
        guardianName: "",
        guardianPhone: "",
    },
};



export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [otp, setOtp] = useState("");
    const [resendLoading, setResendLoading] = useState(false);
    const [loading, setLoading] = useState(false);



    const [formData, setFormData] =
        useState<RegisterFormData>(initialFormData);

    const [error, setError] = useState("");

    const updateAccountField = (
        field: keyof Pick<
            RegisterFormData,
            "name" | "email" | "password" | "confirmPassword"
        >,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateProfileField = (
        field: keyof RegisterFormData["studentProfile"],
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            studentProfile: {
                ...prev.studentProfile,
                [field]: value,
            },
        }));
    };


    const handleContinue = () => {
        setError("");

        const result = accountSchema.safeParse({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        if (!result.success) {
            setError(result.error.issues[0]?.message ?? "Invalid form data.");
            return;
        }

        setStep(2);
    };


    const handleResendOTP = async () => {
        try {
            setResendLoading(true);

            // Call your resend OTP API here
            // await resendOTP();

            // Optional: clear previous OTP
            setOtp("");
        } catch (error) {
            console.error("Failed to resend OTP:", error);
        } finally {
            setResendLoading(false);
        }
    };

    const buildPayload = (includeProfile: boolean) => {
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,

            ...(includeProfile && {
                studentProfile: {
                    ...(formData.studentProfile.programId && {
                        programId: formData.studentProfile.programId,
                    }),
                    ...(formData.studentProfile.dateOfBirth && {
                        dateOfBirth: formData.studentProfile.dateOfBirth,
                    }),
                    ...(formData.studentProfile.gender && {
                        gender: formData.studentProfile.gender,
                    }),
                    ...(formData.studentProfile.phone && {
                        phone: formData.studentProfile.phone,
                    }),
                    ...(formData.studentProfile.address && {
                        address: formData.studentProfile.address,
                    }),
                    ...(formData.studentProfile.bloodGroup && {
                        bloodGroup: formData.studentProfile.bloodGroup,
                    }),
                    ...(formData.studentProfile.guardianName && {
                        guardianName: formData.studentProfile.guardianName,
                    }),
                    ...(formData.studentProfile.guardianPhone && {
                        guardianPhone: formData.studentProfile.guardianPhone,
                    }),
                },
            }),
        };

        return payload;
    };


    const handleSkip = () => {
        setError("");

        const result = accountSchema.safeParse({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        if (!result.success) {
            setError(result.error.issues[0]?.message ?? "Invalid form data.");
            return;
        }

        const payload = buildPayload(false);

        console.log("Register Payload:", payload);

        // API call
    };


    const handleVerifyOTP = () => {
        console.log("OTP:", otp);

        // Call your OTP verification API here

        // Example:
        // await verifyOTP({ email: formData.email, otp });

        // If successful:
        // router.push("/dashboard");
    };



    const handleRegister = () => {
        setError("");

        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            setError(result.error.issues[0]?.message ?? "Invalid form data.");
            return;
        }

        const payload = buildPayload(true);

        console.log("Register Payload:", payload);

        setStep(3);

        // API call


    };













    return (
        <div
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        className="p-6 md:p-8"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <FieldGroup>
                            {/* =========================
                                HEADER
                            ========================== */}
                            <div className="flex flex-col gap-2 text-center">
                                <div className="mx-auto flex items-center gap-2 text-sm font-medium">
                                    {/* Step 1 */}
                                    <span
                                        className={cn(
                                            "flex size-7 items-center justify-center rounded-full text-xs",
                                            step === 1
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        1
                                    </span>

                                    <span className="h-px w-8 bg-border" />

                                    {/* Step 2 */}
                                    <span
                                        className={cn(
                                            "flex size-7 items-center justify-center rounded-full text-xs",
                                            step === 2
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        2
                                    </span>

                                    <span className="h-px w-8 bg-border" />

                                    {/* Step 3 */}
                                    <span
                                        className={cn(
                                            "flex size-7 items-center justify-center rounded-full text-xs",
                                            step === 3
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        3
                                    </span>
                                </div>

                                <h1 className="text-2xl font-bold">
                                    {step === 1
                                        ? "Welcome to CampusFlow"
                                        : step === 2
                                            ? "Complete Your Profile"
                                            : "Verify Your Email"}
                                </h1>

                                <p className="text-balance text-muted-foreground">
                                    {step === 1
                                        ? "Create your CampusFlow account"
                                        : step === 2
                                            ? "Add your student information. You can skip this step and complete it later."
                                            : "Enter the 6-digit OTP sent to your email address."}
                                </p>
                            </div>



                            {/* =========================
                                STEP 1
                            ========================== */}
                            {step === 1 && (
                                <>
                                    <Field>
                                        <FieldLabel htmlFor="name">
                                            Full Name
                                        </FieldLabel>

                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                updateAccountField(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>

                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="yourname@example.com"
                                            value={formData.email}
                                            onChange={(e) =>
                                                updateAccountField(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>

                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) =>
                                                updateAccountField(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">
                                            Confirm Password
                                        </FieldLabel>

                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={
                                                formData.confirmPassword
                                            }
                                            onChange={(e) =>
                                                updateAccountField(
                                                    "confirmPassword",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Field>

                                    {error && (
                                        <p className="text-sm text-destructive">
                                            {error}
                                        </p>
                                    )}

                                    <Field>
                                        <Button
                                            type="button"
                                            onClick={handleContinue}
                                            className="w-full"
                                        >
                                            Continue
                                        </Button>
                                    </Field>

                                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                        Or continue with
                                    </FieldSeparator>

                                    <Field>
                                        {/* Google Login */}
                                        <GoogleLoginComponent />

                                    </Field>
                                </>
                            )}

                            {/* =========================
                                STEP 2
                            ========================== */}
                            {step === 2 && (
                                <StudentProfileForm
                                    studentProfile={formData.studentProfile}
                                    updateProfileField={updateProfileField}
                                    handleSkip={handleSkip}
                                    handleRegister={handleRegister}
                                    handleBack={() => {
                                        setError("");
                                        setStep(1);
                                    }}
                                />

                            )}


                            {/* =========================
                                STEP 3
                            ========================== */}

                            {step === 3 && (
                                // <OTPForm
                                //     otp={otp}
                                //     setOtp={setOtp}
                                //     onVerify={handleVerifyOTP}
                                //     handleBack={() => {
                                //         setError("");
                                //         setStep(2);
                                //     }}
                                // />


                                <OTPForm
                                    otp={otp}
                                    setOtp={setOtp}
                                    onVerify={handleVerifyOTP}
                                    onResend={handleResendOTP}
                                    handleBack={() => {
                                        setError("");
                                        setStep(2);
                                    }}
                                    loading={loading}
                                    resendLoading={resendLoading}
                                />
                            )}


                            {/* LOGIN LINK */}
                            <FieldDescription className="text-center">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium underline underline-offset-4"
                                >
                                    Sign in
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    {/* IMAGE */}
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            width={700}
                            height={700}
                            src="/images/login-image.jpg"
                            alt="CampusFlow"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <Link href="/terms">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy-policy">
                    Privacy Policy
                </Link>
                .
            </FieldDescription>
        </div>
    );
}





