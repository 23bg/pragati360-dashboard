"use client";

import PageWrapper from "@/components/custom/page-wrapper";
import React from "react";
import { useGetAlertsQuery } from "@/features/alerts/services/alertsApi";
import { AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlertsPage() {
    const { data, isLoading, isError } = useGetAlertsQuery();

    if (isLoading) {
        return (
            <PageWrapper
                title="Alerts"
                subtitle="View and manage your recent alerts and notifications."
                showInitialLoadingOnly={false}
            >
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <Card key={index}>
                            <CardContent className="p-4 flex items-center space-x-4">
                                <Skeleton className="h-8 w-8 rounded-full" />
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
                title="Alerts"
                subtitle="View and manage your recent alerts and notifications."
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-red-500">
                    <AlertCircle className="h-12 w-12 mb-4" />
                    <p className="text-lg">Failed to load alerts.</p>
                </div>
            </PageWrapper>
        );
    }

    const alerts = data?.data || [];

    if (alerts.length === 0) {
        return (
            <PageWrapper
                title="Alerts"
                subtitle="View and manage your recent alerts and notifications."
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No alerts to display.</p>
                </div>
            </PageWrapper>
        );
    }

    const getIconForAlertType = (type: string) => {
        switch (type) {
            case "info":
                return <Info className="h-5 w-5 text-blue-500" />;
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "warning":
                return <AlertCircle className="h-5 w-5 text-orange-500" />;
            case "error":
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Info className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <PageWrapper
            title="Alerts"
            subtitle="View and manage your recent alerts and notifications."
            showInitialLoadingOnly={false}
        >
            <div className="space-y-4">
                {alerts.map((alert) => (
                    <Card key={alert.id} className="shadow-sm">
                        <CardContent className="p-4 flex items-start space-x-4">
                            <div className="pt-1">{getIconForAlertType(alert.type)}</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">
                                    {alert.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(alert.createdAt).toLocaleString()}
                                </p>
                            </div>
                            {!alert.isRead && (
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PageWrapper>
    );
}
