'use client'

import UserDetailPage from '@/features/user/components/IntegrationsPage'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const { userId } = useParams<{ userId: string }>()

    if (!userId) return <>No User</>

    return (
        <div><UserDetailPage id={userId} /></div>
    )
}
