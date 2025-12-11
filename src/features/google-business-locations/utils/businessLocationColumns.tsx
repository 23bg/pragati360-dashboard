import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MapPin, Phone, RefreshCcw } from "lucide-react";
import Link from "next/link";

import { IBusinessLocation } from "../types/google-business-locations.type";
import ROUTES from "@/shared/constants/route";

export const getBusinessLocationColumns = (
    pageIndex: number,
    pageSize: number
): ColumnDef<IBusinessLocation>[] => [
        {
            header: "S. No.",
            cell: ({ row }) => row.index + 1 + pageIndex * pageSize,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="font-medium">
                    {row.getValue("name") || "N/A"}
                </div>
            ),
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    {row.getValue("address") || "N/A"}
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{row.getValue("phone") || "N/A"}</span>
                </div>
            ),
        },
        {
            accessorKey: "syncedAt",
            header: "Synced",
            cell: ({ row }) => {
                const syncedAt = row.getValue("syncedAt");
                const label = syncedAt
                    ? new Date(syncedAt as string).toLocaleString()
                    : "Not Synced";

                return (
                    <Badge variant={syncedAt ? "outline" : "secondary"}>
                        {label}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const location = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {/* View */}
                            <DropdownMenuItem asChild>
                                <Link href={ROUTES.APP.BUSINESS.LOCATIONS.DETAIL(location.id)}>
                                    View Details
                                </Link>
                            </DropdownMenuItem>

                            {/* Posts */}
                            <DropdownMenuItem asChild>
                                <Link href={ROUTES.APP.BUSINESS.LOCATIONS.POSTS.ROOT(location.id)}>
                                    View Posts
                                </Link>
                            </DropdownMenuItem>

                            {/* Reviews */}
                            <DropdownMenuItem asChild>
                                <Link href={ROUTES.APP.BUSINESS.LOCATIONS.REVIEWS.ROOT(location.id)}>
                                    View Reviews
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Edit */}
                            <DropdownMenuItem onClick={() => console.log("Edit", location.id)}>
                                Edit
                            </DropdownMenuItem>

                            {/* Delete */}
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => console.log("Delete", location.id)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
