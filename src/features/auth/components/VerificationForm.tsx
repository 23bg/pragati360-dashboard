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
import loading from "@/app/loading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { register } from "module";
import Link from "next/link";
import { Label } from "recharts";

// Validation schema
const otpSchema = z.object({
    otp: z.string().min(5, "OTP must be 5 digits"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerificationForm() {
    const [codes, setCodes] = useState(["", "", "", "", "", ""])

    const handleCodeChange = (index: number, value: string) => {
        const newCodes = [...codes]
        newCodes[index] = value.slice(0, 1)
        setCodes(newCodes)

        // Move focus to next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            nextInput?.focus()
        }
    }

    const router = useRouter();
    const { verifyOTP, loading } = useAuth();

    const [email, setEmail] = useState<string | null>(null);

    // Load email from localStorage (on client only)
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
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
    });

    const onSubmit = async (data: OtpFormData) => {
        if (!email) return;

        verifyOTP(
            { email, otp: data.otp },

            {
                onSuccess: () => {
                    appToast.success("OTP verified successfully!");

                    // Remove stored email
                    localStorage.removeItem("login_email");

                    // router.push(ROUTES.APP.ROOT);
                    reset();
                },

                onError: (err) => {
                    appToast.error(err || "Invalid OTP. Please try again.");
                },
            }
        );
    };

    // Prevent UI from flashing while email loads
    if (email === null) return null;

    return (

        <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your details to continue
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="space-y-2">
                        <Label className="text-center block">Enter verification code</Label>
                        <div className="flex gap-2 justify-center">
                            {codes.map((code, index) => (
                                <Input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={code}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    className="w-12 h-12 text-center text-xl font-semibold"
                                    disabled={loading}
                                />
                            ))}

                            {errors.otp && (
                                <p className="text-red-500 text-sm">{errors.otp.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </Button>


                </form>
            </CardContent>
        </Card>

    );
}

