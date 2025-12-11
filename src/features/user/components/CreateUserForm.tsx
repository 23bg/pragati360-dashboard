"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import PageWrapper from "@/components/custom/page-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, UserRound, Shield, Loader2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
// import { createUser } from "../slices/userSlice";

// -------------------------------------------
// Zod Schema
// -------------------------------------------
const createUserSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().optional(),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

export default function CreateUserPage() {
    const dispatch = useAppDispatch();
    const { loading, error, successMessage } = useAppSelector(
        (state) => state.users
    );

    const form = useForm<CreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "user",
        },
    });

    const onSubmit = (values: CreateUserForm) => {
        // dispatch(createUser({ payload: values }));
    };

    return (
        <PageWrapper
            title="Create New User"
            isLoading={false}
            error={error}
            showBackButton
            backLabel="Back to Users"
            showInitialLoadingOnly
        >
            <Card className="max-w-3xl mx-auto mt-6 bg-neutral-900 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <UserRound className="text-blue-400" /> Create User
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-white space-y-6">
                    {/* FORM */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Name */}
                        <div className="space-y-2">
                            <Label className="text-gray-300">Full Name</Label>
                            <div className="flex items-center gap-2 bg-neutral-800 rounded-lg px-3 border border-white/10">
                                <UserRound className="text-gray-400 w-4 h-4" />
                                <Input
                                    {...form.register("name")}
                                    placeholder="Enter user's full name"
                                    className="bg-transparent border-0 text-white"
                                />
                            </div>
                            {form.formState.errors.name && (
                                <p className="text-red-400 text-sm">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label className="text-gray-300">Email</Label>
                            <div className="flex items-center gap-2 bg-neutral-800 rounded-lg px-3 border border-white/10">
                                <Mail className="text-gray-400 w-4 h-4" />
                                <Input
                                    {...form.register("email")}
                                    placeholder="name@example.com"
                                    className="bg-transparent border-0 text-white"
                                />
                            </div>
                            {form.formState.errors.email && (
                                <p className="text-red-400 text-sm">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label className="text-gray-300">Password</Label>
                            <div className="flex items-center gap-2 bg-neutral-800 rounded-lg px-3 border border-white/10">
                                <Shield className="text-gray-400 w-4 h-4" />
                                <Input
                                    type="password"
                                    {...form.register("password")}
                                    placeholder="Enter a password"
                                    className="bg-transparent border-0 text-white"
                                />
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-red-400 text-sm">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <Label className="text-gray-300">Role</Label>
                            <select
                                {...form.register("role")}
                                className="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 border border-white/10"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                            </select>
                        </div>

                        {/* Submit */}
                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Create User"
                            )}
                        </Button>

                        {/* Success Message */}
                        {successMessage && (
                            <p className="text-green-400 text-center text-sm mt-2">
                                {successMessage}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </PageWrapper>
    );
}
