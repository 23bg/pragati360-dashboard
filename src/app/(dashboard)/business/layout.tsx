import MerchantLayout from "@/features/merchant/components/BusinessLayout";
import React from "react";

export default async function GoogleBusinessLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <MerchantLayout>
            {children}
        </MerchantLayout>
    )
}
