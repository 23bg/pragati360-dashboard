'use client'

import GoogleBusinessLocationDetailPage from '@/features/google-business-locations/components/GoogleBusinessLocationDetailPage'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const { id } = useParams<{ id: string }>()
    return (
        <GoogleBusinessLocationDetailPage id={id} />
    )
}
