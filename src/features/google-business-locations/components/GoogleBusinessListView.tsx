"use client";

import React from "react";
import { Receipt } from "lucide-react";
import { CommonTableComponent } from "@/components/common/common-table-component";
import PaginationControls from "@/components/common/PaginationControls";
import { ListPageWrapper } from "@/components/custom/list-page-wrapper";
import { appToast } from "@/components/common/AppToaster";

import { useBusinessLocation } from "../hooks/useGoogleBusinessLocation";
import { getBusinessLocationColumns } from "../utils/businessLocationColumns";
import { IBusinessLocation } from "../types/google-business-locations.type";

export default function BusinessLocationListPage() {
    const {
        locations,
        loading,
        error,
        getLocationList,
    } = useBusinessLocation();

    const [inputQuery, setInputQuery] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize] = React.useState(10);
    const [delayedRender, setDelayedRender] = React.useState(false);

    // Initial fetch
    React.useEffect(() => {
        getLocationList();
    }, []);

    // Debounce search input
    React.useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(inputQuery), 400);
        return () => clearTimeout(timeout);
    }, [inputQuery]);

    // Delay for skeleton effect
    React.useEffect(() => {
        const timer = setTimeout(() => setDelayedRender(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Local search filter
    const filteredData = React.useMemo(() => {
        if (!locations || locations.length === 0) return [];
        if (!searchQuery) return locations;

        const query = searchQuery.toLowerCase();
        return locations.filter((loc: IBusinessLocation) =>
            loc.name?.toLowerCase().includes(query) ||
            loc.address?.toLowerCase().includes(query) ||
            loc.phone?.toLowerCase().includes(query)
        );
    }, [searchQuery, locations]);

    // Columns for table
    const columns = getBusinessLocationColumns(pageIndex, pageSize);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <ListPageWrapper
            title="Business Locations"
            subtitle="View and manage all your business locations"
            showSearch
            searchPlaceholder="Search by name, address, or phone..."
            searchValue={inputQuery}
            onSearchChange={setInputQuery}
            isLoading={loading || !delayedRender}
            error={error}
            onRetry={() =>
                appToast.info("Retrying...", { description: "Fetching locations again..." })
            }
            showExport
            showRefresh
            createHref="/app/business/locations/create"
            createLabel="Add Location"
        >
            <div className="space-y-4">
                {filteredData.length > 0 ? (
                    <>
                        <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
                            <div className="min-w-[900px]">
                                <CommonTableComponent data={filteredData} columns={columns} />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-sm text-muted-foreground">
                                Page {pageIndex + 1} of {totalPages || 1}
                            </div>
                            <PaginationControls
                                pageIndex={pageIndex}
                                onPageChange={setPageIndex}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-lg">
                        <div className="text-center mb-6">
                            <div className="mx-auto h-16 w-16 mb-4">
                                <Receipt className="h-full w-full" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No Locations Found</h3>
                            <p className="text-sm max-w-sm">
                                {searchQuery
                                    ? "Try adjusting your search filters."
                                    : "No locations have been added yet."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ListPageWrapper>
    );
}
