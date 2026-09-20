

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

import {  useRegistration } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";

import { Eye, EyeClosed } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import GoogleLoginComponent from "../google-login/GoogleLogin";
import { StudentRegistrationZodSchema } from "./register.validation";


export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const { mutate: registration, isPending: registrationPending } = useRegistration();

    const form = useForm({
        defaultValues: {
            name: "Ayan Sujon",
            email: "superadmin@gmail.com",
            password: "Super@admin12345",
            confirmPassword: "Super@admin12345",
        },

        validators: {
          onSubmit: StudentRegistrationZodSchema,
        },

        onSubmit: ({ value }) => {
            const registrationData = {
                name: value.name,
                email: value.email,
                password: value.password,
            };

            const params = new URLSearchParams({email: registrationData.email});

            registration(registrationData, {
                onSuccess: (res) => {
                    toast.add({
                        title: "Registration Successful",
                        description: "Please check your email and verify your account.",
                        type: "success",
                    });

                    router.push(`/register/verify-account?${params.toString()}`);
                },

                onError: (err) => {
                    toast.add({
                        title: "Registration Failed",
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
                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
                                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>


                                            {/* <div className="mb-2 flex items-center">


                                                <Link
                                                    href="/forgot-password"
                                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div> */}


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

                            <form.Field name="confirmPassword">

                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>

                                            <div className="mb-2 flex items-center">

                                                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                                                {/* <Link
                                                    href="/forgot-password"
                                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link> */}
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    value={field.state.value}
                                                    autoComplete="off"
                                                    aria-invalid={isInvalid}
                                                />
                                                <button
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                >
                                                    {showConfirmPassword ? (
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

                            <Button disabled={registrationPending} type="submit">
                                {registrationPending ? (
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
                            <GoogleLoginComponent />

                            {/* Register Link */}
                            <FieldDescription className="text-center">
                                Already have an account? {" "}
                                <Link
                                    href="/login"
                                    className="underline-offset-2 hover:underline"
                                >
                                    Login
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









