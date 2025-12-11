"use client";

import { useBusinessLocation } from "@/features/google-business-locations/hooks/useGoogleBusinessLocation";
import { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import ROUTES from "@/shared/constants/route";

export default function LocationLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locationId: string };
}) {
    const { getLocationById, currentLocation, loading, error } = useBusinessLocation();
    const id = params.locationId;

    useEffect(() => {
        if (id) getLocationById(id);
    }, [id]);

    return (
        <PageWrapper
            showInitialLoadingOnly
            title={currentLocation?.name || "Location Details"}
            isLoading={loading}
            error={error}
            showBackButton
            backHref={ROUTES.APP.BUSINESS.LOCATIONS.ROOT}
        >
            {/* Location Header */}
            {!loading && currentLocation && (
                <div className="mb-6 p-4 rounded-lg bg-neutral-900 border border-white/10">
                    <h2 className="text-xl font-semibold">{currentLocation.name}</h2>
                    <p className="text-muted-foreground">{currentLocation.address}</p>
                </div>
            )}

            {children}
        </PageWrapper>
    );
}
