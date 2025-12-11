"use client";

import React from "react";
import Link from "next/link";
import {
  RefreshCcw,
  Plus,
  Download,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type ListPageWrapperProps = {
  title: string;
  subtitle?: string;
  breadcrumbSlot?: React.ReactNode;

  createHref?: string;
  createLabel?: string;

  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  bulkActionSlot?: React.ReactNode;
  dropdownSlot?: React.ReactNode;
  filterChipsSlot?: React.ReactNode;

  paginationSlot?: React.ReactNode;

  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;

  showExport?: boolean;
  showRefresh?: boolean;
  showBackButton?: boolean;

  children: React.ReactNode;
  hasData?: boolean;
  emptyState?: React.ReactNode;
};

export function ListPageWrapper({
  title,
  subtitle,
  breadcrumbSlot,
  createHref,
  createLabel = "Create",
  showSearch,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  bulkActionSlot,
  dropdownSlot,
  filterChipsSlot,
  paginationSlot,
  isLoading,
  error,
  onRetry,
  showExport,
  showRefresh,
  showBackButton,
  children,
  hasData = true,
  emptyState,
}: ListPageWrapperProps) {
  return (
    <div className="w-full space-y-6 ">
      {/* Breadcrumb */}
      {breadcrumbSlot}

      {/* Header - Module Information Only */}
      <div className="  space-y-1">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}

          <div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Table Toolbar - All Data Actions */}
      {(showSearch || dropdownSlot || bulkActionSlot || createHref) && (
        <div
          role="toolbar"
          className="sticky top-[72px] z-20 bg-background flex items-center gap-3 flex-wrap justify-between pb-3 "
        >
          {/* Left Controls (filters/search/selectors) */}
          <div className="flex items-center gap-3 flex-1 flex-wrap">
            {showSearch && onSearchChange && (
              <div className="max-w-sm w-full">
                <Input
                  role="search"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            )}

            {dropdownSlot}
          </div>

          {/* Right Controls (actions on table data) */}
          <div className="flex items-center gap-2">
            {bulkActionSlot}

            {showRefresh && (
              <Button variant="outline" size="icon" onClick={onRetry} disabled={isLoading}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            )}

            {showExport && (
              <Button variant="outline" size="icon" onClick={() => alert("Export coming soon")}>
                <Download className="h-4 w-4" />
              </Button>
            )}

            {createHref && (
              <Button asChild className="gap-2 whitespace-nowrap">
                <Link href={createHref}>
                  <Plus className="h-4 w-4" />
                  {createLabel}
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {filterChipsSlot && (
        <div className=" ">{filterChipsSlot}</div>
      )}

      {/* Table Content */}
      <div className="relative min-h-[350px] ">
        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <p className="text-destructive font-medium">{error}</p>
            {onRetry && <Button variant="outline" onClick={onRetry}>Retry</Button>}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !hasData && (
          emptyState ?? (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              No records available.
            </div>
          )
        )}

        {/* Table Content */}
        {!isLoading && !error && hasData && children}
      </div>

      {/* Pagination */}
      {paginationSlot && (
        <div className="pt-2 flex justify-end">
          {paginationSlot}
        </div>
      )}
    </div>
  );
}
