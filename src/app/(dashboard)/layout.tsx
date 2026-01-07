import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import ROUTES from "@/shared/constants/route";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next"; // Add this import

export const metadata: Metadata = {
    title: "Dashboard",
    description:
      "Join StackOS early access - an AI-powered growth intelligence suite for modern businesses.",
};

export default async function AppLayout({
    children
}: {
    children: React.ReactNode
}) {

    // ⬅ cookies() is async
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) redirect(ROUTES.AUTH.LOG_IN);

    return <DashboardLayout>{children}</DashboardLayout>;
}
