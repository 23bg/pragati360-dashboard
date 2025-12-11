"use client";

import React from "react";
import { ListPageWrapper } from "@/components/custom/list-page-wrapper";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, Users } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { getUserColumns } from "../utils/userColunms";
import { User } from "@/shared/types";
import { CommonTableComponent } from "@/components/common/common-table-component";
import PaginationControls from "@/components/common/PaginationControls";

export default function UserListPage() {
    const {
        users,
        loading,
        error,
        getAllUsers,
    } = useUser();

    const [inputQuery, setInputQuery] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize] = React.useState(10);
    const [delayedRender, setDelayedRender] = React.useState(false);

    // ------------------------------
    // Fetch Users on Mount
    // ------------------------------
    React.useEffect(() => {
        getAllUsers();
    }, []);

    // ------------------------------
    // Debounce Search Input
    // ------------------------------
    React.useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(inputQuery), 400);
        return () => clearTimeout(timeout);
    }, [inputQuery]);

    // ------------------------------
    // Add small delay for skeletons / UX
    // ------------------------------
    React.useEffect(() => {
        const timer = setTimeout(() => setDelayedRender(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // ------------------------------
    // Filter Users Locally
    // ------------------------------
    const filteredData = React.useMemo(() => {
        if (!users || users.length === 0) return [];
        if (!searchQuery) return users;

        const query = searchQuery.toLowerCase();
        return users.filter((user: User) =>
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query)
        );
    }, [searchQuery, users]);

    // ------------------------------
    // Columns Setup
    // ------------------------------
    const columns = getUserColumns(pageIndex, pageSize);

    // ------------------------------
    // Pagination Calculations
    // ------------------------------
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <ListPageWrapper
            title="Users"
            subtitle="Manage and monitor all users"
            createHref="/users/create"
            createLabel="Add User"
            showSearch
            searchPlaceholder="Search users..."
            searchValue={inputQuery}
            onSearchChange={setInputQuery}
            isLoading={loading || !delayedRender}
            error={error}
            onRetry={getAllUsers}
            showExport
            showRefresh
            showBackButton
        >
            <div className="space-y-4">
                {filteredData.length > 0 ? (
                    <>
                        <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
                            <div className="min-w-[700px]">
                                <CommonTableComponent data={filteredData} columns={columns} />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-sm text-muted-foreground">
                                Page {pageIndex + 1} of {totalPages || 1}
                            </div>
                            <PaginationControls pageIndex={pageIndex} onPageChange={function (newPage: number): void {
                                throw new Error("Function not implemented.");
                            }} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-lg">
                        <div className="text-center mb-6">
                            <div className="mx-auto h-16 w-16 mb-4">
                                <Users className="h-full w-full" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No Users Found</h3>
                            <p className="text-sm max-w-sm">
                                {searchQuery
                                    ? "Try adjusting your search terms."
                                    : "Get started by adding a new user."}
                            </p>
                        </div>

                    </div>
                )}
            </div>
        </ListPageWrapper>
    );
}
