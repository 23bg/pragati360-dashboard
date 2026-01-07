"use client";

import PageWrapper from "@/components/custom/page-wrapper";
import React from "react";
import { useGetSecuritySettingsQuery, useUpdateSecuritySettingsMutation } from "@/features/user/services/userApi";
import { AlertCircle, Info, Lock, KeyRound } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { appToast } from "@/components/common/AppToaster";

export default function AccountSecurityPage() {
    const { data, isLoading, isError } = useGetSecuritySettingsQuery();
    const [updateSecuritySettings] = useUpdateSecuritySettingsMutation();

    const handleTwoFactorToggle = async (checked: boolean) => {
        if (data?.data?.id) {
            try {
                await updateSecuritySettings({ twoFactorEnabled: checked }).unwrap();
                appToast.success(`Two-factor authentication ${checked ? "enabled" : "disabled"}.`);
            } catch (err) {
                appToast.error("Failed to update 2FA setting.");
                console.error("Failed to update 2FA setting:", err);
            }
        }
    };

    if (isLoading) {
        return (
            <PageWrapper
                title="Account Security"
                subtitle="Manage your account security settings."
                backHref="/account"
                showBackButton
                showInitialLoadingOnly={false}
            >
                <div className="space-y-4">
                    {[...Array(2)].map((_, index) => (
                        <Card key={index}>
                            <CardContent className="p-4 flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </PageWrapper>
        );
    }

    if (isError) {
        return (
            <PageWrapper
                title="Account Security"
                subtitle="Manage your account security settings."
                backHref="/account"
                showBackButton
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-red-500">
                    <AlertCircle className="h-12 w-12 mb-4" />
                    <p className="text-lg">Failed to load security settings.</p>
                </div>
            </PageWrapper>
        );
    }

    const securitySettings = data?.data;

    if (!securitySettings) {
        return (
            <PageWrapper
                title="Account Security"
                subtitle="Manage your account security settings."
                backHref="/account"
                showBackButton
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No security settings to display.</p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Account Security"
            subtitle="Manage your account security settings."
            backHref="/account"
            showBackButton
            showInitialLoadingOnly={false}
        >
            <div className="space-y-4">
                <Card className="shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <Lock className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                                <p className="text-xs text-muted-foreground">
                                    Add an extra layer of security to your account.
                                </p>
                            </div>
                        </div>
                        <Switch
                            checked={securitySettings.twoFactorEnabled}
                            onCheckedChange={handleTwoFactorToggle}
                        />
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="p-4 flex items-center space-x-4">
                        <KeyRound className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Last Password Change</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(securitySettings.lastPasswordChange).toLocaleString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    );
}
