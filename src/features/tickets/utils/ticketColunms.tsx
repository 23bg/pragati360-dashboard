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
import ROUTES from "@/shared/constants/route";
import { Ticket } from "@/features/tickets/types/ticket.type";

// ---------------------------------------
// Utility: Status + Priority Colors
// ---------------------------------------
const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
        case "open":
            return "bg-blue-500/10 text-blue-600 border-blue-500/30";
        case "in_progress":
            return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
        case "closed":
            return "bg-green-500/10 text-green-600 border-green-500/30";
        default:
            return "bg-gray-500/10 text-gray-600 border-gray-500/30";
    }
};

const getPriorityColor = (priority?: Ticket["priority"]) => {
    switch (priority) {
        case "high":
            return "bg-red-500/10 text-red-600 border-red-500/30";
        case "medium":
            return "bg-orange-500/10 text-orange-600 border-orange-500/30";
        case "low":
            return "bg-green-500/10 text-green-600 border-green-500/30";
        default:
            return "bg-gray-500/10 text-gray-600 border-gray-500/30";
    }
};

// ---------------------------------------
// Columns
// ---------------------------------------
export const getTicketColumns = (
    pageIndex: number,
    pageSize: number
): ColumnDef<Ticket>[] => [
        {
            header: "S. No.",
            cell: ({ row }) => row.index + 1 + pageIndex * pageSize,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Ticket ID",
            cell: ({ row }) => (
                <div className="font-mono text-sm text-muted-foreground">
                    {row.getValue("id")}
                </div>
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="font-medium text-foreground">
                    {row.getValue("title") || "N/A"}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as Ticket["status"];
                return (
                    <Badge
                        variant="outline"
                        className={`text-xs capitalize ${getStatusColor(status)}`}
                    >
                        {status.replace("_", " ")}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "priority",
            header: "Priority",
            cell: ({ row }) => {
                const priority = row.getValue("priority") as Ticket["priority"];
                return (
                    <Badge
                        variant="outline"
                        className={`text-xs capitalize ${getPriorityColor(priority)}`}
                    >
                        {priority || "N/A"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "assignedTo",
            header: "Assigned To",
            cell: ({ row }) => (
                <div className="text-sm text-muted-foreground">
                    {row.getValue("assignedTo") || "Unassigned"}
                </div>
            ),
        },
        {
            accessorKey: "createdBy",
            header: "Created By",
            cell: ({ row }) => (
                <div className="text-sm text-muted-foreground">
                    {row.getValue("createdBy") || "N/A"}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created",
            cell: ({ row }) => {
                const date = new Date(row.getValue("createdAt"));
                return (
                    <div className="text-sm text-muted-foreground">
                        {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const ticket = row.original;

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
                                <Link href={''}>
                                    View details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log("Edit", ticket.id)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => console.log("Delete", ticket.id)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
