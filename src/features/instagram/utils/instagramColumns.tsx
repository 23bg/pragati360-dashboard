import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "../types/instagram.type";
// import { format } from "date-fns";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const getInstagramColumns = (
    pageIndex: number,
    pageSize: number
): ColumnDef<Instagram>[] => {
    return [
        // -----------------------------
        // SERIAL NUMBER
        // -----------------------------
        {
            id: "sno",
            header: "S.No",
            cell: ({ row }) => (
                <span>{pageIndex * pageSize + row.index + 1}</span>
            ),
        },

        // -----------------------------
        // PROFILE + USERNAME
        // -----------------------------
        {
            accessorKey: "username",
            header: "Profile",
            cell: ({ row }) => {
                const p = row.original;

                return (
                    <div className="flex items-center gap-3">
                        <Image
                            src={p.profilePicUrl || "/placeholder.png"}
                            alt={p.username}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium">{p.username}</p>
                            <p className="text-xs text-muted-foreground">
                                @{p.username}
                            </p>
                        </div>
                    </div>
                );
            },
        },

        // -----------------------------
        // INSTAGRAM USER ID
        // -----------------------------
        {
            accessorKey: "instagramUserId",
            header: "Instagram ID",
            cell: ({ row }) => <span>{row.original.instagramUserId}</span>,
        },

        // -----------------------------
        // FOLLOWERS COUNT
        // -----------------------------
        {
            accessorKey: "followersCount",
            header: "Followers",
            cell: ({ row }) => (
                <span>{row.original.followersCount ?? 0}</span>
            ),
        },

        // -----------------------------
        // MEDIA COUNT
        // -----------------------------
        {
            accessorKey: "mediaCount",
            header: "Posts",
            cell: ({ row }) => (
                <span>{row.original.mediaCount ?? 0}</span>
            ),
        },

        // -----------------------------
        // BUSINESS ID
        // -----------------------------
        {
            accessorKey: "businessId",
            header: "Business ID",
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">
                    {row.original.businessId}
                </span>
            ),
        },

        // -----------------------------
        // CREATED AT
        // -----------------------------
        // {
        //     accessorKey: "createdAt",
        //     header: "Created",
        //     cell: ({ row }) => {
        //         const date = row.original.createdAt
        //             ? format(new Date(row.original.createdAt), "dd MMM yyyy")
        //             : "-";
        //         return <span>{date}</span>;
        //     },
        // },

        // -----------------------------
        // ACTIONS
        // -----------------------------
        {
            id: "actions",
            header: "",
            enableSorting: false,
            cell: ({ row }) => {
                const p = row.original;

                return (
                    <div className="flex items-center gap-2">
                        <Link href={`/instagram/${p.id}`}>
                            <Button size="sm" variant="outline">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </Link>

                        <Link href={`/instagram/${p.id}/edit`}>
                            <Button size="sm" variant="outline">
                                <Pencil className="w-4 h-4" />
                            </Button>
                        </Link>

                        <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];
};
