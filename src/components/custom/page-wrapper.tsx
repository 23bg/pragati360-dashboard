"use client";

import { ReactNode, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plus,
  Search,
  Download,
  RefreshCw,
  AlertCircle,

} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface PageWrapperProps {
  title?: string;
  subtitle?: string;
  dropdownSlot?: ReactNode;
  sortSlot?: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
  showBackButton?: boolean;
  showCreateButton?: boolean;
  showDialogButton?: ReactNode;
  createHref?: string;
  createLabel?: string;
  createAction?: () => void | Promise<void>;
  showInitialLoadingOnly: boolean
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showFilters?: ReactNode;
  // onFilterClick?: ReactNode;
  showExport?: boolean;
  onExport?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: ReactNode;
    color?: 'green' | 'blue' | 'orange' | 'red' | 'purple';
    trend?: 'up' | 'down' | 'neutral';
  }>;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export default function PageWrapper({
  title,
  subtitle,
  children,
  isLoading = false,
  error = null,
  onRetry,
  backHref,
  backLabel = "Back",
  showBackButton = false,
  showCreateButton = false,
  showDialogButton,
  createHref,
  createLabel = "Create",
  createAction,
  showSearch = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  showFilters,
  showExport = false,
  onExport,
  showRefresh = false,
  dropdownSlot,
  sortSlot,
  showInitialLoadingOnly,
  onRefresh,
  stats = [],
  className = "",
  headerClassName = "",
  contentClassName = "",
}: PageWrapperProps) {

  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    if (!isLoading) hasLoadedOnce.current = true;
  }, [isLoading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'blue':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'orange':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      case 'red':
        return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'purple':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // eslint-disable-next-line react-hooks/refs
  if (isLoading && (!showInitialLoadingOnly || !hasLoadedOnce.current)) {
    // Default skeleton grid size
    const rows = 4;
    const columns = 1;
    return (
      <div className={`space-y-6 ${className}`}>
        <div className={`flex justify-between items-center ${headerClassName}`}>
          <div className="space-y-2">
            <Skeleton className="h-14 w-48" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-16 w-10" />
          </div>
        </div>
        <div className="space-y-2">
          {[...Array(rows)].map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-1 ">
              {[...Array(columns)].map((_, colIdx) => (
                <Skeleton key={colIdx} className="h-10 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {

    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <div className="text-center max-w-md w-full animate-in fade-in duration-300 space-y-6">
          <div className="flex justify-center">
            <div className="bg-destructive/10 p-4 rounded-full">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground">
              Something went wrong
            </h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>

          {onRetry && (
            <Button
              onClick={onRetry}
              className="inline-flex items-center gap-2 mx-auto"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 animate-spin-slow" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (


    <div className={`space-y-6 space-x-4 p-10 pb-50 ${className}`}>
      {/* Header Row */}


      <div className={`space-y-6 ${className}`}>
        {/* Header Row */}
        <div className="flex flex-col gap-4 w-full">
          {/* Title + Back + Subtitle */}
          <div className="flex items-center gap-4">
            {showBackButton && backHref && (
              <Link href={backHref}>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {backLabel}
                </Button>
              </Link>
            )}

            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
          </div>

          {/* Search + Buttons Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
            {/* Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 ">
              {showFilters && (<div>{showFilters}</div>)}
              {showSearch && (
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={handleSearchChange}
                    color="bg-white"
                    className="!bg-white !text-foreground placeholder:text-muted-foreground pl-10 border border-input rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                  />
                </div>
              )}
            </div>

            {/* Buttons aligned with search bar */}
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              {/* {showFilters && onFilterClick && (
                <Button
                  // variant="outline"
                  onClick={onFilterClick}
                  className="flex items-center gap-2  border shadow-xs hover:text-white"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              )} */}

              {showExport && onExport && (
                <Button
                  // variant="outline"
                  onClick={onExport}
                  className="flex items-center gap-2  border shadow "
                >
                  <Download className="h-4 w-4" />

                </Button>
              )}

              {showRefresh && onRefresh && (
                <Button
                  // variant="outline"
                  onClick={onRefresh}
                  className="flex items-center gap-2  border shadow "
                >
                  <RefreshCw className="h-4 w-4" />

                </Button>
              )}

              {dropdownSlot && <div>{dropdownSlot}</div>}
              {sortSlot && <div>{sortSlot}</div>}

              {showCreateButton && (
                createHref ? (
                  <Link href={createHref}>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {createLabel}
                    </Button>
                  </Link>
                ) : (
                  <Button onClick={createAction} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {createLabel}
                  </Button>
                )
              )}
              {showDialogButton && (<div>{showDialogButton}</div>)}

            </div>
          </div>
        </div>
      </div>



      {/* Stats Cards */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="card-shadow hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {stat.icon && (
                    <div className={`p-2 rounded-lg ${getColorClasses(stat.color || 'gray')}`}>
                      {stat.icon}
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Content */}
      <div className={contentClassName}>
        {children}
      </div>
    </div>

  );
}

// Specialized page wrappers for common use cases
export function ListPageWrapper({
  title,
  subtitle,
  children,
  createHref,
  createLabel = "Create New",
  showSearch = true,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  stats = [],
  ...props
}: Omit<PageWrapperProps, 'showCreateButton'> & {
  createHref?: string;
  createLabel?: string;
}) {
  return (
    <PageWrapper
      title={title}
      subtitle={subtitle}
      showCreateButton={!!createHref}
      createHref={createHref}
      createLabel={createLabel}
      showSearch={showSearch}
      searchPlaceholder={searchPlaceholder}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      stats={stats}
      {...props}
    >
      {children}
    </PageWrapper>
  );
}

export function DetailPageWrapper({
  title,
  subtitle,
  children,
  backHref,
  showEditButton = false,
  editHref,
  editLabel = "Edit",
  stats = [],
  ...props
}: Omit<PageWrapperProps, 'showBackButton' | 'showCreateButton'> & {
  editHref?: string;
  editLabel?: string;
  showEditButton?: boolean;
}) {
  return (
    <PageWrapper
      title={title}
      subtitle={subtitle}
      showBackButton={!!backHref}
      backHref={backHref}
      showCreateButton={showEditButton && !!editHref}
      createHref={editHref}
      createLabel={editLabel}
      stats={stats}
      {...props}
    >
      {children}
    </PageWrapper>
  );
} 