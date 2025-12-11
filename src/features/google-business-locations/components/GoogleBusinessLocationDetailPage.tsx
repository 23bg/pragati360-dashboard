"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useBusinessLocation } from "../hooks/useGoogleBusinessLocation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import ROUTES from "@/shared/constants/route";

export default function GoogleBusinessLocationDetailPage({ id }: { id?: string }) {
    const {
        currentLocation,
        loading,
        error,
        getLocationById,
    } = useBusinessLocation();

    // Fetch on mount or when ID changes
    useEffect(() => {
        if (id) getLocationById(id);
    }, [id]);

    const handleRefresh = () => {
        if (id) getLocationById(id);
    };

    return (
        <PageWrapper
            title="Business Location Details"
            showInitialLoadingOnly={false}
            isLoading={loading}
            error={error}
            onRetry={() => id && getLocationById(id)}
            showBackButton
            backHref={ROUTES.APP.BUSINESS.LOCATIONS.ROOT}
            backLabel="Back to Locations"
        >
            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}

            {/* Content */}
            {!loading && currentLocation && (
                <Card className="max-w-3xl mx-auto mt-6 bg-neutral-900 border border-white/10">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-white">
                            {currentLocation.name || "Location Details"}
                        </CardTitle>

                        <Button
                            variant="secondary"
                            onClick={handleRefresh}
                            className="flex items-center gap-2"
                            disabled={loading}
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-6 text-white">
                        {/* Basic Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Location Info</h3>
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong>Location ID:</strong> {currentLocation.id}
                                </p>
                                <p>
                                    <strong>Google Location ID:</strong> {currentLocation.googleLocationId}
                                </p>
                                <p>
                                    <strong>Address:</strong> {currentLocation.address || "N/A"}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {currentLocation.phone || "N/A"}
                                </p>
                                <p>
                                    <strong>Latitude:</strong> {currentLocation.lat ?? "N/A"}
                                </p>
                                <p>
                                    <strong>Longitude:</strong> {currentLocation.lng ?? "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Location Stats</h3>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 rounded-lg bg-neutral-800 border border-white/10">
                                    <p className="text-2xl font-bold">
                                        {currentLocation.posts?.length || 0}
                                    </p>
                                    <p className="text-sm">Posts</p>
                                </div>

                                <div className="p-4 rounded-lg bg-neutral-800 border border-white/10">
                                    <p className="text-2xl font-bold">
                                        {currentLocation.reviews?.length || 0}
                                    </p>
                                    <p className="text-sm">Reviews</p>
                                </div>

                                <div className="p-4 rounded-lg bg-neutral-800 border border-white/10">
                                    <p className="text-lg font-bold">
                                        {currentLocation.syncedAt
                                            ? new Date(currentLocation.syncedAt).toLocaleString()
                                            : "Never"}
                                    </p>
                                    <p className="text-sm">Synced At</p>
                                </div>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="text-sm text-muted-foreground">
                            <p>
                                <strong>Created:</strong>{" "}
                                {new Date(currentLocation.createdAt).toLocaleString()}
                            </p>
                            <p>
                                <strong>Updated:</strong>{" "}
                                {new Date(currentLocation.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </PageWrapper>
    );
}
