"use client";

import PageWrapper from "@/components/custom/page-wrapper";
import React from "react";
import { useGetActivityLogsQuery } from "@/features/activity-logs/services/activityLogsApi";
import { AlertCircle, Info, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ActivityLogsPage() {
    const { data, isLoading, isError } = useGetActivityLogsQuery();

    if (isLoading) {
        return (
            <PageWrapper
                title="Activity & Logs"
                subtitle="Track user activities and system logs."
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
                title="Activity & Logs"
                subtitle="Track user activities and system logs."
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-red-500">
                    <AlertCircle className="h-12 w-12 mb-4" />
                    <p className="text-lg">Failed to load activity logs.</p>
                </div>
            </PageWrapper>
        );
    }

    const activityLogs = data?.data || [];

    if (activityLogs.length === 0) {
        return (
            <PageWrapper
                title="Activity & Logs"
                subtitle="Track user activities and system logs."
                showInitialLoadingOnly={false}
            >
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No activity logs to display.</p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Activity & Logs"
            subtitle="Track user activities and system logs."
            showInitialLoadingOnly={false}
        >
            <div className="space-y-4">
                {activityLogs.map((log) => (
                    <Card key={log.id} className="shadow-sm">
                        <CardContent className="p-4 flex items-start space-x-4">
                            <div className="pt-1">
                                <History className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">
                                    {log.action}
                                </p>
                                {log.details && (
                                    <p className="text-xs text-muted-foreground">
                                        {JSON.stringify(log.details)}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    User ID: {log.userId} at {new Date(log.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PageWrapper>
    );
}
