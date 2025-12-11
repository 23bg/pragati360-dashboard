"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useBusiness } from "../hooks/useBusiness";
import ROUTES from "@/shared/constants/route";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        currentBusiness,
        loading,
        error,
        getBusinessById,
    } = useBusiness();

    useEffect(() => {
        getBusinessById("6922ff3ace4fd8cba0949df8"); // Load single user/business
    }, []);

    const business = currentBusiness;

    return (
        <PageWrapper showInitialLoadingOnly isLoading={loading}>
            <div className="pb-20 flex flex-col gap-6">

                {/* Loading */}
                {loading && (
                    <p className="text-center text-muted-foreground py-6 flex gap-2 justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" /> Loading business...
                    </p>
                )}

                {/* Error */}
                {error && (
                    <p className="text-center text-red-500 py-6">{error}</p>
                )}

                {/* Header */}
                {business && (
                    <>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            {/* Left Block */}
                            <div className="flex items-center gap-4">
                                <Image
                                    src={business.logoUrl || "/placeholder.png"}
                                    alt="business logo"
                                    width={70}
                                    height={70}
                                    className="rounded-lg object-cover border border-white/10"
                                />

                                <div>
                                    <h3 className="text-xl font-medium">
                                        {business.name}
                                    </h3>

                                    <p className="text-muted-foreground text-sm">
                                        {business.city || "No city added"}
                                    </p>

                                    {business.category && (
                                        <p className="text-muted-foreground text-sm capitalize">
                                            {business.category}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right Block */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                        getBusinessById("6922ff3ace4fd8cba0949df8")
                                    }
                                    disabled={loading}
                                    className="flex gap-2 items-center"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* TABS */}
                        <Tabs activationMode="automatic" defaultValue="overview" className="mt-6">
                            <TabsList>
                                {/* Overview */}
                                <Link href={ROUTES.APP.BUSINESS.ROOT}>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                </Link>

                                {/* Locations */}
                                <Link href={ROUTES.APP.BUSINESS.LOCATIONS.ROOT}>
                                    <TabsTrigger value="locations">Locations</TabsTrigger>
                                </Link>
                            </TabsList>
                        </Tabs>
                    </>
                )}

                {/* Nested Pages */}
                <div>{children}</div>
            </div>
        </PageWrapper>
    );
}
