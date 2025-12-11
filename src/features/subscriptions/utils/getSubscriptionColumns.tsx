import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ROUTES from "@/shared/constants/route";
import { ArrowRight } from "lucide-react";
import { ISubsciption } from "../types/subsciption.type";

export const getSubscriptionColumns = (): ColumnDef<ISubsciption>[] => [
  // ------------------------------
  // Payment ID
  // ------------------------------
  {
    header: "Payment ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-gray-400">{row.original.id}</span>
    ),
  },

  // ------------------------------
  // Amount
  // ------------------------------
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <span className="font-semibold">
        ₹{row.original.amount.toFixed(2)}
      </span>
    ),
  },

  // ------------------------------
  // Status Badge
  // ------------------------------
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;

      const colorMap: Record<string, string> = {
        pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        success: "bg-green-500/20 text-green-400 border-green-500/30",
        failed: "bg-red-500/20 text-red-400 border-red-500/30",
        refunded: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      };

      return (
        <Badge
          className={`capitalize border ${colorMap[status] || ""}`}
        >
          {status}
        </Badge>
      );
    },
  },

  // ------------------------------
  // Payment Method
  // ------------------------------
  {
    header: "Method",
    accessorKey: "paymentMethod",
    cell: ({ row }) => (
      <span className="text-gray-300">
        {row.original.paymentMethod || "—"}
      </span>
    ),
  },

  // ------------------------------
  // Razorpay Order ID
  // ------------------------------
  {
    header: "Order ID",
    accessorKey: "razorpayOrderId",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-gray-400">
        {row.original.razorpayOrderId || "—"}
      </span>
    ),
  },

  // ------------------------------
  // Razorpay Payment ID
  // ------------------------------
  {
    header: "Payment ID",
    accessorKey: "razorpayPaymentId",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-gray-400">
        {row.original.razorpayPaymentId || "—"}
      </span>
    ),
  },

  // ------------------------------
  // Created At
  // ------------------------------
  {
    header: "Created",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span className="text-gray-400 text-sm">
        {new Date(row.original.createdAt).toLocaleString()}
      </span>
    ),
  },

  // ------------------------------
  // Actions
  // ------------------------------
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Link
          href={ROUTES.APP.SUBSCRIPTION_DETAIL(payment.id)}
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          View <ArrowRight className="w-4 h-4" />
        </Link>
      );
    },
  },
];
