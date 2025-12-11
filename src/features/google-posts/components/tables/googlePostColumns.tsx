"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IGooglePost } from "../../types/google-post.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const getGooglePostColumns = (): ColumnDef<IGooglePost>[] => [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => row.original.title || "-",
    },

    {
        accessorKey: "postType",
        header: "Type",
        cell: ({ row }) => (
            <Badge>
                {row.original.postType?.toLowerCase() || "update"}
            </Badge>
        ),
    },

    {
        accessorKey: "summary",
        header: "Summary",
        cell: ({ row }) => (
            <span className="line-clamp-1 text-muted-foreground max-w-[300px]" >
                {row.original.summary || "-"}
            </span>
        ),
    },

    {
        accessorKey: "updateTime",
        header: "Updated",
        cell: ({ row }) =>
            row.original.updateTime
                ? new Date(row.original.updateTime).toLocaleString()
                : "-",
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge className="capitalize" >
                {row.original.status || "draft"}
            </Badge>
        ),
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const post = row.original;

            return (
                <Link href={`/google-posts/${post.id}/edit`
                }>
                    <Button variant="secondary" size="sm" >
                        Edit
                    </Button>
                </Link>
            );
        },
    },
];
