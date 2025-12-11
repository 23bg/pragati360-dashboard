import BusinessLayout from "@/features/business/components/BusinessLayout";
import React from "react";

export default async function GoogleBusinessLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <BusinessLayout>
            {children}
        </BusinessLayout>
    )
}
