"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect } from "react";
import { useInstagram } from "@/features/instagram/hooks/useInstagram";
import PageWrapper from "@/components/custom/page-wrapper";

export default function InstagramDetailPage() {
    const {
        currentProfile,
        loading,
        error,
        getInstagramById,
    } = useInstagram();

    // Auto-load profile on mount
    useEffect(() => {
        getInstagramById("69220661848efbcd043201a0");
    }, []);

    const profile = currentProfile;

    return (
        <PageWrapper showInitialLoadingOnly={false}>
            <div className="pb-20">
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-1 flex-col gap-6">

                        {loading && (
                            <p className="text-center py-10 text-muted-foreground">Loading profile...</p>
                        )}

                        {error && (
                            <p className="text-center py-10 text-red-500">{error}</p>
                        )}

                        {profile && (
                            <div>
                                {/* --- Instagram Profile Header --- */}
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    {/* Profile */}
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={profile.profilePicUrl || "/placeholder.png"}
                                            alt="profile"
                                            width={70}
                                            height={70}
                                            className="rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-xl font-medium">
                                                {profile.username || "N/A"}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                @{profile.username}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Followers: {profile.followersCount ?? 0}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => getInstagramById(profile.id)}
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

                                {/* Tabs */}
                                <Tabs defaultValue="overview" className="mt-6">
                                    <TabsList>
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="posts">Posts</TabsTrigger>
                                        <TabsTrigger value="messages">Messages</TabsTrigger>
                                        <TabsTrigger value="competitors">Competitors</TabsTrigger>
                                    </TabsList>

                                    {/* --- Overview Content --- */}
                                    <TabsContent value="overview" className="mt-6 space-y-8">
                                        {/* Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="border rounded-xl p-4 shadow-sm">
                                                <p className="text-sm text-muted-foreground">Followers</p>
                                                <p className="text-2xl font-semibold mt-3">
                                                    {profile.followersCount ?? 0}
                                                </p>
                                            </div>

                                            <div className="border rounded-xl p-4 shadow-sm">
                                                <p className="text-sm text-muted-foreground">Media Count</p>
                                                <p className="text-2xl font-semibold mt-3">
                                                    {profile.mediaCount ?? 0}
                                                </p>
                                            </div>

                                            <div className="border rounded-xl p-4 shadow-sm">
                                                <p className="text-sm text-muted-foreground">Account ID</p>
                                                <p className="text-sm mt-3">{profile.instagramUserId}</p>
                                            </div>

                                            <div className="border rounded-xl p-4 shadow-sm">
                                                <p className="text-sm text-muted-foreground">Token Expiry</p>
                                                <p className="text-sm mt-3">
                                                    {profile.tokenExpiresAt
                                                        ? new Date(profile.tokenExpiresAt).toLocaleDateString()
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-sm mt-10">
                                            Analytics sections (Top Posts, Alerts, etc.) can be plugged in from your service.
                                        </p>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
