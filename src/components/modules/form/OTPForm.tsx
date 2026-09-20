


"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";

interface OTPFormProps {
    otp: string;
    setOtp: (value: string) => void;
    onVerify: () => void;
    onResend: () => void;
    handleBack: () => void;
    loading?: boolean;
    resendLoading?: boolean;
}

export function OTPForm({
    otp,
    setOtp,
    onVerify,
    onResend,
    handleBack,
    loading = false,
    resendLoading = false,
}: OTPFormProps) {
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleResend = () => {
        if (resendTimer > 0 || resendLoading) return;

        onResend();
        setResendTimer(60);
    };

    return (
        <div className="space-y-6 relative">
            {/* Back Button - Top Left */}
            <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="absolute -top-12 left-0 rounded-full"

                disabled={loading || resendLoading}
            >
                <ArrowLeft />
            </Button>


            <div className="text-center">
                <h1 className="text-2xl font-bold">Verify Your Email</h1>
                <p className="text-balance text-muted-foreground">Enter the 6-digit OTP sent to your email address.</p>
            </div>
            {/* OTP Input */}
            <div className="flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    pattern="^[0-9]+$"
                    inputMode="numeric"
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
            </div>

            {/* Resend OTP */}
            <div className="text-center text-sm">
                <span className="text-muted-foreground">
                    Didn&apos;t receive the code?{" "}
                </span>

                <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0"
                    onClick={handleResend}
                    disabled={resendTimer > 0 || resendLoading}
                >
                    {resendLoading
                        ? "Resending..."
                        : resendTimer > 0
                            ? `Resend in ${resendTimer}s`
                            : "Resend OTP"}
                </Button>
            </div>

            {/* Buttons */}
            <div className="text-center">

                <Button
                    type="button"
                    onClick={onVerify}
                    disabled={otp.length !== 6 || loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </Button>
            </div>
        </div>
    );
}

