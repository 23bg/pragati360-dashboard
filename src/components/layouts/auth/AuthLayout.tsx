"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ROUTES from "@/shared/constants/route";
import { useEffect } from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("accessToken");
    //     if (token) {
    //         router.replace(ROUTES.APP.ROOT);
    //     }
    // }, [router]);

    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 flex-col justify-between p-8 text-white"
            >
                <div>
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Welcome back</h1>
                    <p className="text-indigo-100 text-lg leading-relaxed">
                        Access your account to manage your workspace, collaborate with your
                        team, and build amazing things.
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-indigo-200" />
                        <span>Secure and encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-indigo-200" />
                        <span>Real-time collaboration</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-indigo-200" />
                        <span>24/7 support included</span>
                    </div>
                </div>

                <p className="text-xs text-indigo-200">
                    © 2025 Your Company. All rights reserved.
                </p>
            </motion.div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
