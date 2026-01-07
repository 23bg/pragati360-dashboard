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
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { User } from "@/shared/types";
import ROUTES from "@/shared/constants/route";

export const getUserColumns = (pageIndex: number, pageSize: number): ColumnDef<User>[] => [
    {
        header: "S. No.",
        cell: ({ row }) => row.index + 1 + pageIndex * pageSize,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "User ID",
        cell: ({ row }) => (
            <div className="font-mono text-sm text-muted-foreground">
                {row.getValue("id")}
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="font-medium text-foreground">
                {row.getValue("name") || "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <Badge variant="outline" className="text-xs">
                {row.getValue("email") || "N/A"}
            </Badge>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={''}>View details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Edit", user.id)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => console.log("Delete", user.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
