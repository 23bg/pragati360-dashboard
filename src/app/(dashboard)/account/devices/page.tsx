"use client";

import PageWrapper from "@/components/custom/page-wrapper";
import React from "react";
import { useGetUserDevicesQuery } from "@/features/user/services/userApi";
import { AlertCircle, Info, Monitor, Smartphone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountDevicesPage() {
    const { data, isLoading, isError } = useGetUserDevicesQuery();

    if (isLoading) {
        return (
            <PageWrapper
                title="Account Devices"
                subtitle="View and manage logged-in devices."
                backHref="/account"
                showBackButton
                showInitialLoadingOnly={false}
            >
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
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
                title="Account Devices"
                subtitle="View and manage logged-in devices."
                backHref="/account"
                showBackButton
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-red-500">
                    <AlertCircle className="h-12 w-12 mb-4" />
                    <p className="text-lg">Failed to load devices.</p>
                </div>
            </PageWrapper>
        );
    }

    const devices = data?.data || [];

    if (devices.length === 0) {
        return (
            <PageWrapper
                title="Account Devices"
                subtitle="View and manage logged-in devices."
                backHref="/account"
                showBackButton
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No devices logged in.</p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Account Devices"
            subtitle="View and manage logged-in devices."
            backHref="/account"
            showBackButton
            showInitialLoadingOnly={false}
        >
            <div className="space-y-4">
                {devices.map((device) => (
                    <Card key={device.id} className="shadow-sm">
                        <CardContent className="p-4 flex items-start space-x-4">
                            <div className="pt-1">
                                {device.type === "Mobile App" ? (
                                    <Smartphone className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Monitor className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">
                                    {device.os} {device.browser ? `(${device.browser})` : ''}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    IP: {device.ipAddress} | Last Login: {new Date(device.lastLogin).toLocaleString()}
                                </p>
                                {device.isCurrent && (
                                    <span className="text-xs font-semibold text-blue-500">
                                        (Current Device)
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PageWrapper>
    );
}
