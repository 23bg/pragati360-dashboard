"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IGoogleReview } from "@/features/google-reviews/types/google-review.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, MessageCircleReply } from "lucide-react";

// ⭐ Render stars
const Stars = ({ value }: { value?: number | null }) => {
    if (!value) return <span>-</span>;
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: value }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
        </div>
    );
};

export const getGoogleReviewColumns = (): ColumnDef<IGoogleReview>[] => [
    {
        accessorKey: "authorName",
        header: "Author",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.original.authorName || "-"}</span>
                {row.original.authorUrl && (
                    <a
                        href={row.original.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                    >
                        View Profile
                    </a>
                )}
            </div>
        ),
    },

    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <Stars value={row.original.rating} />,
    },

    {
        accessorKey: "comment",
        header: "Comment",
        cell: ({ row }) => (
            <span className="line-clamp-2 text-muted-foreground max-w-[300px]">
                {row.original.comment || "-"}
            </span>
        ),
    },

    {
        accessorKey: "reviewTime",
        header: "Date",
        cell: ({ row }) =>
            row.original.reviewTime
                ? new Date(row.original.reviewTime).toLocaleString()
                : "-",
    },

    {
        accessorKey: "reviewState",
        header: "State",
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize">
                {row.original.reviewState?.toLowerCase() || "published"}
            </Badge>
        ),
    },

    {
        accessorKey: "replyText",
        header: "Reply",
        cell: ({ row }) =>
            row.original.replyText ? (
                <span className="text-green-600 font-medium">Replied</span>
            ) : (
                <span className="text-red-500">No Reply</span>
            ),
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const review = row.original;

            return (
                <div className="flex gap-2">
                    {/* Reply or Edit reply */}
                    <Link href={`/google-reviews/${review.id}/reply`}>
                        <Button variant="secondary" size="sm">
                            <MessageCircleReply className="w-4 h-4 mr-1" />
                            {review.replyText ? "Edit Reply" : "Reply"}
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];
