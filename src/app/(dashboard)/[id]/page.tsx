'use client'

import UserDetailPage from '@/features/instagram/components/InstagramDetailPage'
import { useParams } from 'next/navigation'

export default function page() {
    const params = useParams<{ id: string }>()
    const id = params?.id

    console.log(id)

    if (!id) return <p>Loading...</p>

    return <UserDetailPage id={id} />
}
