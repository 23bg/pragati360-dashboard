"use client";

import React from "react";
import { ListPageWrapper } from "@/components/custom/list-page-wrapper";
import { Users, MessageSquare } from "lucide-react";
import { useGoogleReviews } from "../hooks/useGoogleReviews";
import { IGoogleReview } from "@/features/google-reviews/types/google-review.type";
import { CommonTableComponent } from "@/components/common/common-table-component";
import PaginationControls from "@/components/common/PaginationControls";
import { getGoogleReviewColumns } from "./getGoogleReviewColumns";

export default function GoogleReviewListPage({ locationId }: { locationId: string }) {
    const {
        reviews,
        loading,
        error,
        getReviewsByLocation,
    } = useGoogleReviews();

    const [inputQuery, setInputQuery] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize] = React.useState(10);
    const [delayedRender, setDelayedRender] = React.useState(false);

    // Fetch reviews on mount
    React.useEffect(() => {
        if (locationId) getReviewsByLocation(locationId);
    }, [locationId]);

    // Debounce search
    React.useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(inputQuery), 400);
        return () => clearTimeout(timeout);
    }, [inputQuery]);

    // Delay for skeletons
    React.useEffect(() => {
        const timer = setTimeout(() => setDelayedRender(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Filter reviews locally
    const filteredData = React.useMemo(() => {
        if (!reviews || reviews.length === 0) return [];
        if (!searchQuery) return reviews;

        const q = searchQuery.toLowerCase();
        return reviews.filter((r: IGoogleReview) =>
            r.authorName?.toLowerCase().includes(q) ||
            r.comment?.toLowerCase().includes(q) ||
            String(r.rating)?.includes(q)
        );
    }, [searchQuery, reviews]);

    // Columns
    const columns = getGoogleReviewColumns();

    // Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <ListPageWrapper
            title="Google Reviews"
            subtitle="Manage reviews for this Google Business location"
            showSearch
            searchPlaceholder="Search by author, comment or rating..."
            searchValue={inputQuery}
            onSearchChange={setInputQuery}
            isLoading={loading || !delayedRender}
            error={error}
            onRetry={() => locationId && getReviewsByLocation(locationId)}
            showBackButton
        // backHref="/console/locations"
        >
            <div className="space-y-4">
                {filteredData.length > 0 ? (
                    <>
                        <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
                            <div className="min-w-[800px]">
                                <CommonTableComponent data={filteredData} columns={columns} />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-sm text-muted-foreground">
                                Page {pageIndex + 1} of {totalPages || 1}
                            </div>
                            <PaginationControls
                                pageIndex={pageIndex}
                                onPageChange={(newPage: number) => setPageIndex(newPage)}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-lg">
                        <div className="text-center mb-6">
                            <div className="mx-auto h-16 w-16 mb-4">
                                <MessageSquare className="h-full w-full" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No Reviews Found</h3>
                            <p className="text-sm max-w-sm">
                                {searchQuery
                                    ? "Try adjusting your search terms."
                                    : "Once customers leave reviews on Google, they will appear here."}
                            </p>
                        </div>

                    </div>
                )}
            </div>
        </ListPageWrapper>
    );
}