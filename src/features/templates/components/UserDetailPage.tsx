"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useUser } from "../hooks/useUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Router } from "next/router";
import ROUTES from "@/shared/constants/route";

export default function UserDetailPage({ id }: { id?: string }) {

    const { currentUser, loading, error, getCurrentUser } = useUser();

    useEffect(() => {
        if (id) {
            getCurrentUser(id);

        }
    }, []);

    return (
        <PageWrapper
            title="User Details"
            showInitialLoadingOnly={false}
            isLoading={loading}
            error={error}
            onRetry={() => id && getCurrentUser(id)}
            showBackButton
            backHref={ROUTES.CONSOLE.USERS}
            backLabel="Back to Users"
        >
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}

            {!loading && currentUser && (
                <Card className="max-w-2xl mx-auto mt-6">
                    <CardHeader>
                        <CardTitle>{currentUser.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>
                            <strong>Name:</strong> {currentUser.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {currentUser.email}
                        </p>
                    </CardContent>
                </Card>
            )}
        </PageWrapper>
    );
}
