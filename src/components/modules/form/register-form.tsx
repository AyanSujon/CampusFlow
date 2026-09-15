


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
    const [step, setStep] = useState<1 | 2>(1);

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


    const handleRegister = () => {
        setError("");

        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            setError(result.error.issues[0]?.message ?? "Invalid form data.");
            return;
        }

        const payload = buildPayload(true);

        console.log("Register Payload:", payload);

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
                                </div>

                                <h1 className="text-2xl font-bold">
                                    {step === 1
                                        ? "Welcome to CampusFlow"
                                        : "Complete Your Profile"}
                                </h1>

                                <p className="text-balance text-muted-foreground">
                                    {step === 1
                                        ? "Create your CampusFlow account"
                                        : "Add your student information"}
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
                                        <Button
                                            variant="outline"
                                            type="button"
                                            className="w-full"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="size-5"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.42Z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.5Z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M6.54 13.58A5.86 5.86 0 0 1 6.23 12c0-.55.11-1.09.31-1.58V7.89H3.29A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.11l3.25-2.53Z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.39l3.25 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
                                                    fill="#EA4335"
                                                />
                                            </svg>

                                            <span>
                                                Continue with Google
                                            </span>
                                        </Button>
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





