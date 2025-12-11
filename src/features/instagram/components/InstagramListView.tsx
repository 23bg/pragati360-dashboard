"use client";

import React from "react";
import { Receipt } from "lucide-react";
import { ListPageWrapper } from "@/components/custom/list-page-wrapper";
import { CommonTableComponent } from "@/components/common/common-table-component";
import PaginationControls from "@/components/common/PaginationControls";

import { useInstagram } from "../hooks/useInstagram";
import { Instagram } from "../types/instagram.type";
import { getInstagramColumns } from "../utils/instagramColumns";

export default function InstagramListPage() {

    const {
        profiles,
        loading,
        error,
        getInstagramList,
    } = useInstagram();

    const [inputQuery, setInputQuery] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize] = React.useState(10);
    const [delayedRender, setDelayedRender] = React.useState(false);

    // Fetch instagram profiles
    React.useEffect(() => {
        getInstagramList();
    }, []);

    // Debounce search
    React.useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(inputQuery), 400);
        return () => clearTimeout(timeout);
    }, [inputQuery]);

    // Delay skeleton effect
    React.useEffect(() => {
        const timer = setTimeout(() => setDelayedRender(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Local filtering
    const filteredData = React.useMemo(() => {
        if (!profiles || profiles.length === 0) return [];
        if (!searchQuery) return profiles;

        const query = searchQuery.toLowerCase();
        return profiles.filter((p: Instagram) =>
            p.username.toLowerCase().includes(query) ||
            p.instagramUserId.toLowerCase().includes(query) ||
            p.businessId.toLowerCase().includes(query)
        );
    }, [searchQuery, profiles]);

    // Columns for table
    const columns = getInstagramColumns(pageIndex, pageSize);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <ListPageWrapper
            title="Instagram Profiles"
            subtitle="Manage connected Instagram accounts"
            // showSearch
            // searchPlaceholder="Search by username, IG ID, business ID..."
            // searchValue={inputQuery}
            // onSearchChange={setInputQuery}
            isLoading={loading || !delayedRender}
            error={error}
            onRetry={() => getInstagramList()}
        // showExport
        // showRefresh
        // showBackButton
        // createHref="/instagram/create"
        // createLabel="Add Profile"
        >
            <div className="">
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
                            <h3 className="text-lg font-medium mb-2">No Profiles Found</h3>
                            <p className="text-sm max-w-sm">
                                {searchQuery
                                    ? "Try adjusting your search filters."
                                    : "No Instagram profiles connected yet."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ListPageWrapper>
    );
}
