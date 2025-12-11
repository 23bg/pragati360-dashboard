"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInstagram } from "@/features/instagram/hooks/useInstagram";
import ROUTES from "@/shared/constants/route";
import PageWrapper from "@/components/custom/page-wrapper";

export default function InstagramLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentProfile, loading, error, getInstagramById } = useInstagram();

    useEffect(() => {
        getInstagramById("69220661848efbcd043201a0");
    }, []);

    const profile = currentProfile;

    return (
        <PageWrapper
            showInitialLoadingOnly
        >
            <div className="pb-20">
                <div className="flex flex-col gap-6">

                    {/* Loading & Error */}
                    {loading && <p className="text-center text-muted-foreground py-6">Loading...</p>}
                    {error && <p className="text-center text-red-500 py-6">{error}</p>}

                    {profile && (
                        <>
                            {/* --- Profile Header --- */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={profile.profilePicUrl || "/placeholder.png"}
                                        alt="profile"
                                        width={70}
                                        height={70}
                                        className="rounded-full object-cover"
                                    />

                                    <div>
                                        <h3 className="text-xl font-medium">{profile.username}</h3>
                                        <p className="text-muted-foreground">@{profile.username}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Followers: {profile.followersCount}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => getInstagramById("69220661848efbcd043201a0")}
                                        className="px-4 py-2 border rounded-lg text-sm shadow-sm hover:bg-muted/20"
                                    >
                                        ⟳ Refresh
                                    </button>

                                    <button
                                        onClick={() =>
                                            window.open(`https://instagram.com/${profile.username}`, "_blank")
                                        }
                                        className="px-4 py-2 border rounded-lg text-sm shadow-sm hover:bg-muted/20"
                                    >
                                        Go to Instagram
                                    </button>
                                </div>
                            </div>

                            {/* --- Tabs --- */}
                            <Tabs activationMode="automatic" defaultValue="overview" className="mt-6">
                                <TabsList>
                                    <Link href={ROUTES.APP.INSTAGRAM.ROOT}>
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                    </Link>

                                    <Link href={ROUTES.APP.INSTAGRAM.POSTS}>
                                        <TabsTrigger value="posts">Posts</TabsTrigger>
                                    </Link>



                                    <Link href={ROUTES.APP.INSTAGRAM.COMPETITORS}>
                                        <TabsTrigger value="competitors">Competitors</TabsTrigger>
                                    </Link>
                                </TabsList>
                            </Tabs>
                        </>
                    )}

                    {/* Render Tab Page */}
                    <div >{children}</div>
                </div>
            </div>

        </PageWrapper>
    );
}
