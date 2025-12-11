import * as React from "react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  pageIndex: number;
  totalPages?: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls = ({
  pageIndex,
  totalPages = 1,
  onPageChange,
}: PaginationControlsProps) => {
  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < totalPages - 1;

  return (
    <div className="flex items-center justify-between space-x-4 py-4">
      <div className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of {totalPages}
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={!canGoPrev}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={!canGoNext}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
