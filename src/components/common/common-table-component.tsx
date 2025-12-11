"use client";

import * as React from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  Table as ReactTableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CommonTableComponentProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  table?: ReactTableType<TData>; // Optional external table instance
}

export function CommonTableComponent<TData>({
  columns,
  data,
  table: externalTable,
}: CommonTableComponentProps<TData>) {
  // ✅ Create table if not passed externally
  const table =
    externalTable ??
    useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

  // ✅ Safeguard against undefined table
  if (!table) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        ⚠️ Table not initialized properly
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border border-border shadow-sm bg-background text-foreground transition-colors">
      <Table  className="min-w-[700px] w-full table-auto">
        {/* ---------- HEADER ---------- */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted/40 hover:bg-muted/60 transition-colors"
            >
              {headerGroup.headers.map((header) => {
                const columnId = header.column?.id;
                const alignClass =
                  columnId === "index"
                    ? "text-center"
                    : columnId === "actions"
                      ? "text-right"
                      : "text-left";

                return (
                  <TableHead
                    key={header.id}
                    className={`px-4 py-3 font-semibold text-sm ${alignClass} border-b border-border`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* ---------- BODY ---------- */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-muted/30 border-b border-border transition-colors"
              >
                {row.getVisibleCells().map((cell) => {
                  const isIndex = cell.column.id === "index";
                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-4 py-3 text-sm ${isIndex
                          ? "text-center font-medium text-muted-foreground"
                          : "text-left"
                        }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center text-muted-foreground"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
