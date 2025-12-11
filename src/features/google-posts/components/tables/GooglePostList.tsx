"use client";

import React from "react";
import { ListPageWrapper } from "@/components/custom/list-page-wrapper";
import { Button } from "@/components/ui/button";
import { FilePlus2, FileText } from "lucide-react";


import { CommonTableComponent } from "@/components/common/common-table-component";
import PaginationControls from "@/components/common/PaginationControls";
import { useGooglePosts } from "../../hooks/useGooglePosts";
import { IGooglePost } from "../../types/google-post.type";
import { getGooglePostColumns } from "./googlePostColumns";

interface GooglePostListProps {
    locationId: string;
}

export default function GooglePostListPage({ locationId }: GooglePostListProps) {
    const {
        posts,
        loading,
        error,
        getPostsByLocation,
    } = useGooglePosts();

    const [inputQuery, setInputQuery] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize] = React.useState(10);
    const [delayedRender, setDelayedRender] = React.useState(false);

    // -----------------------------------
    // Fetch Google Posts on Mount
    // -----------------------------------
    React.useEffect(() => {
        if (locationId) getPostsByLocation(locationId);
    }, [locationId]);

    // -----------------------------------
    // Debounce Search
    // -----------------------------------
    React.useEffect(() => {
        const timer = setTimeout(() => setSearchQuery(inputQuery), 400);
        return () => clearTimeout(timer);
    }, [inputQuery]);

    // -----------------------------------
    // Loading delay (better UX)
    // -----------------------------------
    React.useEffect(() => {
        const t = setTimeout(() => setDelayedRender(true), 800);
        return () => clearTimeout(t);
    }, []);

    // -----------------------------------
    // Filter Posts Locally
    // -----------------------------------
    const filteredData = React.useMemo(() => {
        if (!posts || posts.length === 0) return [];

        if (!searchQuery) return posts;

        const q = searchQuery.toLowerCase();

        return posts.filter((p: IGooglePost) =>
            p.title?.toLowerCase().includes(q) ||
            p.summary?.toLowerCase().includes(q) ||
            p.postType?.toLowerCase().includes(q)
        );
    }, [searchQuery, posts]);

    // -----------------------------------
    // Pagination
    // -----------------------------------
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = React.useMemo(() => {
        const start = pageIndex * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, pageIndex, pageSize]);

    // -----------------------------------
    // Columns
    // -----------------------------------
    const columns = getGooglePostColumns();

    return (
        <ListPageWrapper
            title="Google Posts"
            subtitle="Manage synced Google Business Profile posts"
            createHref={`/google-posts/create?location=${locationId}`}
            createLabel="Create Post"
            showSearch
            searchPlaceholder="Search posts..."
            searchValue={inputQuery}
            onSearchChange={setInputQuery}
            isLoading={loading || !delayedRender}
            error={error}
            onRetry={() => getPostsByLocation(locationId)}
            showExport
            showRefresh
            showBackButton
        >
            <div className="space-y-4">

                {paginatedData.length > 0 ? (
                    <>
                        <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
                            <div className="min-w-[900px]">
                                <CommonTableComponent
                                    data={paginatedData}
                                    columns={columns}
                                />
                            </div>
                        </div>

                        {/* Pagination Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-sm text-muted-foreground">
                                Page {pageIndex + 1} of {totalPages || 1}
                            </div>

                            <PaginationControls
                                pageIndex={pageIndex}
                                onPageChange={(p) => setPageIndex(p)}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-lg">
                        <div className="text-center mb-6">
                            <div className="mx-auto h-16 w-16 mb-4">
                                <FileText className="h-full w-full" />
                            </div>

                            <h3 className="text-lg font-medium mb-2">No Posts Found</h3>

                            <p className="text-sm max-w-sm">
                                {searchQuery
                                    ? "Try adjusting your search terms."
                                    : "Start by creating your first Google Business post."}
                            </p>
                        </div>

                        <Button className="bg-blue-600 text-white">
                            <FilePlus2 className="mr-2 h-4 w-4" />
                            Create Post
                        </Button>
                    </div>
                )}

            </div>
        </ListPageWrapper>
    );
}
