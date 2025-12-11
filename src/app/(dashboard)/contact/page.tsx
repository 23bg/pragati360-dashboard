'use client'

import PageWrapper from "@/components/custom/page-wrapper"
import { CreateTicketForm } from "@/features/tickets/components/CreateTicketForm"


export default function page() {
    return (
        <PageWrapper
            title="Contact"
            subtitle="Frequently Asked Questions"
            showBackButton
            // backHref="/dashboard"
            backLabel="Back to Dashboard"
            showInitialLoadingOnly={false}
        >

            <CreateTicketForm />
        </PageWrapper>

    )
}
