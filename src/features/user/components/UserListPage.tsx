"use client";

import React from "react";
// import { ListPageWrapper } from "@/components/custom/list-page-wrapper";
import { Receipt } from "lucide-react";
// import useSubsciptions from "@/features/subscriptions/hooks/useSubsciption";


import { CommonTableComponent } from "@/components/common/common-table-component";
import PaginationControls from "@/components/common/PaginationControls";
import { ISubsciption } from "@/features/subscriptions";
import { getSubscriptionColumns } from "@/features/subscriptions/utils/getSubscriptionColumns";
import { useUser } from "../hooks/useUser";
import { User } from "@/shared/types";
import { getUserColumns } from "../utils/userColunms";
import { ListPageWrapper } from "@/components/custom/list-page-wrapper";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { appToast } from "@/components/common/AppToaster";
// import { ListPageWrapper } from "@/components/custom/page-wrapper";

export default function UserListPage() {
    const {
        users,
        loading,
        error,
        getUsers,
    } = useUser();

    const [inputQuery, setInputQuery] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize] = React.useState(10);
    const [delayedRender, setDelayedRender] = React.useState(false);

    // Fetch payments for current user
    React.useEffect(() => {
        getUsers(); // or userId
    }, []);

    // Debounce search
    React.useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(inputQuery), 400);
        return () => clearTimeout(timeout);
    }, [inputQuery]);

    // Delay for skeleton effect
    React.useEffect(() => {
        const timer = setTimeout(() => setDelayedRender(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Local filtering
    const filteredData = React.useMemo(() => {
        if (!users || users.length === 0) return [];
        if (!searchQuery) return users;

        const query = searchQuery.toLowerCase();
        return users.filter((p: User) =>
            p.name.toLowerCase().includes(query) ||
            p.email?.toLowerCase().includes(query) ||
            p.phoneNumber?.toLowerCase().includes(query)
        );
    }, [searchQuery, users]);

    // Columns
    const columns = getUserColumns(pageIndex, pageSize);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <ListPageWrapper
            title="Members"
            subtitle="View and manage all your members"
            showSearch
            searchPlaceholder="Search by status, method..."
            searchValue={inputQuery}
            onSearchChange={setInputQuery}
            isLoading={loading || !delayedRender}
            error={error}
            onRetry={() => appToast.info("Profile updated!", {
                description: "Your changes are live 🎉"
            })}
            showExport
            showRefresh
            // showBackButton

            createHref="/"
            createLabel="Add Member"

        // showInitialLoadingOnly

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
                            <h3 className="text-lg font-medium mb-2">No Payments Found</h3>
                            <p className="text-sm max-w-sm">
                                {searchQuery
                                    ? "Try adjusting your search filters."
                                    : "No payments recorded yet."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ListPageWrapper>
    );
}
