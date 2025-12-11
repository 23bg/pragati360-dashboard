import AuthLayout from '@/components/layouts/auth/AuthLayout'
import ROUTES from '@/shared/constants/route';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {

    // ⬅ cookies() is async
    // const cookieStore = await cookies();
    // const token = cookieStore.get("access_token")?.value;

    // if (token) redirect(ROUTES.APP.ROOT);

    return <AuthLayout>{children}</AuthLayout>
}
