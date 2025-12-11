import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const getUserColumns = (pageIndex: number, pageSize: number): ColumnDef<any>[] => [
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
        enableHiding: false,
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
            <div className="font-mono text-sm text-muted-foreground">
                {row.getValue("email") || "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <Badge variant="outline" className="text-xs">
                {row.getValue("role") || "N/A"}
            </Badge>
        ),
    },
];
