"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useGooglePosts } from "@/features/posts/hooks/useGooglePosts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ROUTES from "@/shared/constants/route";

export default function GooglePostDetailPage({ id }: { id?: string }) {
    const {
        selectedPost,
        loading,
        error,
        selectPost,
        getPostsByLocation,
        posts,
    } = useGooglePosts();

    // -----------------------------------------
    // Fetch + Select Post on Initial Render
    // -----------------------------------------
    useEffect(() => {
        if (!id) return;

        // If posts already exist → pick directly
        const found = posts.find((p) => p.id === id);
        if (found) {
            selectPost(found);
        }
    }, [id, posts]);

    return (
        <PageWrapper
            title="Google Post Details"
            showInitialLoadingOnly={false}
            isLoading={loading}
            error={error}
            onRetry={() => id && selectPost(posts.find((p) => p.id === id) || null)}
            showBackButton
            backHref={ROUTES.CONSOLE.GOOGLE_POSTS}
            backLabel="Back to Posts"
        >
            {/* ------------- Loading Spinner ------------- */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}

            {/* ------------- Post Details ------------- */}
            {!loading && selectedPost && (
                <Card className="max-w-3xl mx-auto mt-6 bg-neutral-900 border-white/10 text-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {selectedPost.title || "Untitled Post"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 text-gray-300">
                        {/* Summary */}
                        {selectedPost.summary && (
                            <p>
                                <strong className="text-white">Summary:</strong> <br />
                                {selectedPost.summary}
                            </p>
                        )}

                        {/* Post Type */}
                        <p>
                            <strong className="text-white">Type:</strong>{" "}
                            {selectedPost.postType || "N/A"}
                        </p>

                        {/* Dates */}
                        <p>
                            <strong className="text-white">Created:</strong>{" "}
                            {selectedPost.createdAt
                                ? new Date(selectedPost.createdAt).toLocaleString()
                                : "N/A"}
                        </p>

                        <p>
                            <strong className="text-white">Updated:</strong>{" "}
                            {selectedPost.updatedAt
                                ? new Date(selectedPost.updatedAt).toLocaleString()
                                : "N/A"}
                        </p>

                        {/* Media URLs */}
                        {selectedPost.mediaUrls?.length > 0 && (
                            <div>
                                <strong className="text-white">Images:</strong>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                                    {selectedPost.mediaUrls.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt="Google Post Media"
                                            className="rounded-md shadow border border-white/10"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Call To Action */}
                        {selectedPost.callToAction && (
                            <div>
                                <strong className="text-white">Call To Action:</strong>
                                <pre className="mt-2 p-3 bg-neutral-800 rounded-md text-sm text-gray-200 overflow-x-auto">
                                    {JSON.stringify(selectedPost.callToAction, null, 2)}
                                </pre>
                            </div>
                        )}

                        {/* Status */}
                        <p>
                            <strong className="text-white">Status:</strong>{" "}
                            {selectedPost.status || "draft"}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* ------------- No Post Found ------------- */}
            {!loading && !selectedPost && (
                <div className="py-20 text-center text-gray-400">
                    <p>No post found with this ID.</p>
                </div>
            )}
        </PageWrapper>
    );
}
