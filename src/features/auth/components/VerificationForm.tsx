"use client";

import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ROUTES from "@/shared/constants/route";
import { useEffect, useState } from "react";
import { appToast } from "@/components/common/AppToaster";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerificationForm() {
    const [codes, setCodes] = useState(["", "", "", "", "", ""]);

    const handleCodeChange = (index: number, value: string) => {
        const next = [...codes];
        next[index] = value.slice(0, 1);
        setCodes(next);

        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`)?.focus();
        }
    };

    const router = useRouter();
    const { verifyOTP, loading } = useAuth();

    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem("login_email");
        if (!storedEmail) {
            appToast.error("Session expired, please login again.");
            router.push(ROUTES.AUTH.LOG_IN);
            return;
        }
        setEmail(storedEmail);
    }, []);

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    const onSubmit = async (data: OtpFormData) => {
        if (!email) return;

        verifyOTP(
            { email, otp: data.otp },
            {
                onSuccess: () => {
                    appToast.success("OTP verified successfully.");
                    localStorage.removeItem("login_email");
                },
                onError: (err: any) => {
                    appToast.error(err || "Invalid OTP. Please try again.");
                },
            }
        );
    };

    if (email === null) return null;

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Verify your account</CardTitle>
                <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const finalOtp = codes.join("");
                        setValue("otp", finalOtp, { shouldValidate: true });
                        handleSubmit(onSubmit)(); // validation runs AFTER setting OTP
                    }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label className="block text-center">Verification Code</Label>

                        <div className="flex justify-center gap-2">
                            {codes.map((c, i) => (
                                <Input
                                    key={i}
                                    id={`code-${i}`}
                                    maxLength={1}
                                    inputMode="numeric"
                                    value={c}
                                    onChange={(e) => handleCodeChange(i, e.target.value)}
                                    className="w-12 h-12 text-xl text-center font-semibold"
                                    disabled={loading}
                                />
                            ))}
                        </div>

                        {errors.otp && (
                            <p className="text-red-500 text-sm text-center">{errors.otp.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading || codes.join("").length !== 6}
                        className="w-full bg-blue-600 text-white"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
