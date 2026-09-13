






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

type Gender = "MALE" | "FEMALE" | "OTHER";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;

    studentProfile: {
        programId: string;
        dateOfBirth: string;
        gender: Gender | "";
        phone: string;
        address: string;
        bloodGroup: string;
        guardianName: string;
        guardianPhone: string;
    };
}

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

        if (!formData.name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!formData.email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!formData.password) {
            setError("Please enter your password.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
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
        const payload = buildPayload(false);

        console.log("Register Payload:", payload);

        // TODO:
        // Call your registration API here.
        //
        // Example:
        // await registerStudent(payload);
    };

    const handleRegister = () => {
        const payload = buildPayload(true);

        console.log("Register Payload:", payload);

        // TODO:
        // Call your registration API here.
        //
        // Example:
        // await registerStudent(payload);
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
                                <>
                                    <Field>
                                        <FieldLabel htmlFor="programId">
                                            Program
                                        </FieldLabel>

                                        <Input
                                            id="programId"
                                            type="text"
                                            placeholder="Enter program ID"
                                            value={
                                                formData.studentProfile
                                                    .programId
                                            }
                                            onChange={(e) =>
                                                updateProfileField(
                                                    "programId",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="dateOfBirth">
                                                Date of Birth
                                            </FieldLabel>

                                            <Input
                                                id="dateOfBirth"
                                                type="date"
                                                value={
                                                    formData.studentProfile
                                                        .dateOfBirth
                                                }
                                                onChange={(e) =>
                                                    updateProfileField(
                                                        "dateOfBirth",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="gender">
                                                Gender
                                            </FieldLabel>

                                            <select
                                                id="gender"
                                                value={
                                                    formData.studentProfile
                                                        .gender
                                                }
                                                onChange={(e) =>
                                                    updateProfileField(
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                <option value="">
                                                    Select gender
                                                </option>
                                                <option value="MALE">
                                                    Male
                                                </option>
                                                <option value="FEMALE">
                                                    Female
                                                </option>
                                                <option value="OTHER">
                                                    Other
                                                </option>
                                            </select>
                                        </Field>
                                    </div>



                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                        <Field>
                                            <FieldLabel htmlFor="phone">
                                                Phone
                                            </FieldLabel>

                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+880 1XXXXXXXXX"
                                                value={
                                                    formData.studentProfile.phone
                                                }
                                                onChange={(e) =>
                                                    updateProfileField(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="bloodGroup">
                                                Blood Group
                                            </FieldLabel>

                                            <Input
                                                id="bloodGroup"
                                                type="text"
                                                placeholder="e.g. A+, B+, O+"
                                                value={
                                                    formData.studentProfile
                                                        .bloodGroup
                                                }
                                                onChange={(e) =>
                                                    updateProfileField(
                                                        "bloodGroup",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>
                                    </div>

                                    <Field>
                                        <FieldLabel htmlFor="address">
                                            Address
                                        </FieldLabel>

                                        <Input
                                            id="address"
                                            type="text"
                                            placeholder="Your current address"
                                            value={
                                                formData.studentProfile
                                                    .address
                                            }
                                            onChange={(e) =>
                                                updateProfileField(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>



                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="guardianName">
                                                Guardian Name
                                            </FieldLabel>

                                            <Input
                                                id="guardianName"
                                                type="text"
                                                placeholder="Guardian name"
                                                value={
                                                    formData.studentProfile
                                                        .guardianName
                                                }
                                                onChange={(e) =>
                                                    updateProfileField(
                                                        "guardianName",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="guardianPhone">
                                                Guardian Phone
                                            </FieldLabel>

                                            <Input
                                                id="guardianPhone"
                                                type="tel"
                                                placeholder="Guardian phone"
                                                value={
                                                    formData.studentProfile
                                                        .guardianPhone
                                                }
                                                onChange={(e) =>
                                                    updateProfileField(
                                                        "guardianPhone",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleSkip}
                                        >
                                            Skip for later
                                        </Button>

                                        <Button
                                            type="button"
                                            onClick={handleRegister}
                                        >
                                            Complete Registration
                                        </Button>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            setError("");
                                            setStep(1);
                                        }}
                                        className="w-full"
                                    >
                                        Back
                                    </Button>
                                </>
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



































