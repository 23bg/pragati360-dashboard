"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import { Building2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { ListPageWrapper } from "@/components/custom/page-wrapper";
import CommonTableComponent from "@/components/common/common-table-component";
import { getUserColumns } from "./user-column";

import { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/user.store";

export function UserTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { users: list, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize] = React.useState(10);
  const [inputQuery, setInputQuery] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [delayedRender, setDelayedRender] = React.useState(false);

  // ✅ Fetch users from RTK on mount
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ✅ Debounce search input
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(inputQuery);
      setPageIndex(0); // reset to first page
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputQuery]);

  // ✅ Small delay for skeleton/loader UX
  React.useEffect(() => {
    const timer = setTimeout(() => setDelayedRender(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Columns for table
  const columns = getUserColumns(pageIndex, pageSize);

  // ✅ Local filter
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return list;
    return list.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, list]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: { pageIndex, pageSize },
    },
  });

  return (
    <ListPageWrapper
      title="Users"
      subtitle="Manage and view all registered users"
      createHref="/users/create"
      createLabel="Add User"
      showSearch
      searchPlaceholder="Search users by name or email..."
      searchValue={inputQuery}
      onSearchChange={setInputQuery}
      isLoading={loading || !delayedRender}
      error={error}
      onRetry={() => dispatch(fetchUsers())}
      showExport
      showRefresh
      showBackButton
      showInitialLoadingOnly
    >
      <div className="space-y-4">
        {table.getRowModel().rows.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto border rounded-lg shadow-sm bg-white">
              <div className="min-w-[700px]">
                <CommonTableComponent table={table} columns={columns} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Page {pageIndex + 1} of {pageCount}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-lg border-gray-300">
            <div className="text-center mb-6">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <Building2 className="h-full w-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Users found
              </h3>
              <p className="text-sm text-gray-600 max-w-sm">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "Get started by adding a new user."}
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        )}
      </div>
    </ListPageWrapper>
  );
}
