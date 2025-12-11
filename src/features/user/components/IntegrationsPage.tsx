"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useUser } from "../hooks/useUser";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdateUserForm from "./UpdateUserForm";

export default function IntegrationPage() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");


    const { currentUser, loading, error, getCurrentUser } = useUser();

    useEffect(() => {

        getCurrentUser();
        // setName(currentUser?.name);

    }, []);

    if (loading) {
        return (
            <PageWrapper
                title="Integrations"
                subtitle="Connect your accounts to Pragati360"
                isLoading={loading}
                showInitialLoadingOnly={false}
                error={error}
                onRetry={() => getCurrentUser()}
                // showBackButton
                // backHref={ROUTES.CONSOLE.USERS}
                backLabel="Back to Users"
            >
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin " />
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Integrations"
            subtitle="Connect your accounts to Pragati360"
            showInitialLoadingOnly={false}
            isLoading={loading}
            error={error}
            onRetry={() => getCurrentUser()}
            showBackButton
            // backHref={Router().backHref}
            backLabel="Back to Users"
        >





            <div className="space-y-4 ">

                {/* Google */}
                <div className="flex items-center justify-between p-4  rounded-lg border ">
                    <div>
                        <p className="font-medium">Google</p>
                        <p className="text-sm text-gray-400">
                            {currentUser?.isGoogleOAuthConnected
                                ? `Connected · Valid for: ${getRemainingTime(currentUser.googleOAuthTokens)}`
                                : "Not Connected"}
                        </p>
                    </div>

                    {currentUser?.isGoogleOAuthConnected ? (
                        <Button variant="outline" className=" ">
                            Reconnect
                        </Button>
                    ) : (
                        <Button className="bg-blue-600 hover:bg-blue-700 ">
                            Connect
                        </Button>
                    )}
                </div>

                {/* Instagram */}
                <div className="flex items-center justify-between p-4  rounded-lg border ">
                    <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-gray-400">
                            {currentUser?.isInstagramOAuthConnected
                                ? `Connected · Valid for: ${getRemainingTime(currentUser.instagramOAuthTokens)}`
                                : "Not Connected"}
                        </p>
                    </div>

                    {currentUser?.isInstagramOAuthConnected ? (
                        <Button variant="outline" className=" ">
                            Reconnect
                        </Button>
                    ) : (
                        <Button className="bg-blue-600 hover:bg-blue-700 ">
                            Connect
                        </Button>
                    )}
                </div>

            </div>


            <UpdateUserForm open={open} setOpen={setOpen} />
        </PageWrapper>
    );
}


function getRemainingTime(token?: any) {
    if (!token?.expires_in || !token?.created_at) return null;

    const expiry = token.created_at + token.expires_in * 1000;
    const now = Date.now();

    const diff = expiry - now;

    if (diff <= 0) return "Expired";

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
}
