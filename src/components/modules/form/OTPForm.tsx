
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSlot,
// } from "@/components/ui/input-otp";

// interface OTPFormProps {
//     otp: string;
//     setOtp: (value: string) => void;
//     onVerify: () => void;
//     handleBack: () => void;
//     loading?: boolean;
// }

// export function OTPForm({
//     otp,
//     setOtp,
//     onVerify,
//     handleBack,
//     loading = false,
// }: OTPFormProps) {
//     return (
//         <div className="space-y-6">
//             <div className="flex justify-center">
//                 <InputOTP
//                     maxLength={6}
//                     value={otp}
//                     onChange={setOtp}
//                 >
//                     <InputOTPGroup>
//                         <InputOTPSlot index={0} />
//                         <InputOTPSlot index={1} />
//                         <InputOTPSlot index={2} />
//                         <InputOTPSlot index={3} />
//                         <InputOTPSlot index={4} />
//                         <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                 </InputOTP>
//             </div>

//             <div className="flex items-center justify-between gap-4">
//                 <Button
//                     type="button"
//                     variant="outline"
//                     onClick={handleBack}
//                 >
//                     Back
//                 </Button>

//                 <Button
//                     type="button"
//                     onClick={onVerify}
//                     disabled={otp.length !== 6 || loading}
//                 >
//                     {loading ? "Verifying..." : "Verify OTP"}
//                 </Button>
//             </div>
//         </div>
//     );
// }




























"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

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
        <div className="space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
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
            <div className="flex items-center justify-between gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={loading || resendLoading}
                >
                    Back
                </Button>

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

