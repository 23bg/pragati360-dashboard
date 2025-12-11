import InstagramLayout from "@/features/instagram/components/InstagramLayout";
import React from "react";

export default async function MembersLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <InstagramLayout>{children}</InstagramLayout>
    )
}
