"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useGoogleReviews } from "@/features/google-reviews/hooks/useGoogleReviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import ROUTES from "@/shared/constants/route";

export default function GoogleReviewDetailPage({ id }: { id?: string }) {
    const {
        selectedReview,
        loading,
        error,
        getReviewById,
    } = useGoogleReviews();

    useEffect(() => {
        if (id) getReviewById(id);
    }, [id]);

    return (
        <PageWrapper
            title="Review Details"
            showInitialLoadingOnly={false}
            isLoading={loading}
            error={error}
            onRetry={() => id && getReviewById(id)}
            showBackButton
            backHref={ROUTES.CONSOLE.REVIEWS}
            backLabel="Back to Reviews"
        >
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}

            {!loading && selectedReview && (
                <Card className="max-w-2xl mx-auto mt-6 bg-neutral-900 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            {selectedReview.authorName || "Anonymous User"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 text-gray-300">
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-yellow-400">
                            {Array.from({ length: selectedReview.rating || 0 }).map((_, i) => (
                                <Star key={i} size={18} fill="currentColor" />
                            ))}
                        </div>

                        {/* Comment */}
                        <p>
                            <strong className="text-white">Comment:</strong>{" "}
                            {selectedReview.comment || "No comment"}
                        </p>

                        {/* Time */}
                        <p>
                            <strong className="text-white">Posted:</strong>{" "}
                            {selectedReview.reviewTime
                                ? new Date(selectedReview.reviewTime).toLocaleString()
                                : "Unknown"}
                        </p>

                        {/* Reply */}
                        {selectedReview.replyText ? (
                            <div className="p-3 rounded-md bg-neutral-800 border border-white/10">
                                <p className="text-white font-semibold mb-1">Your Reply:</p>
                                <p>{selectedReview.replyText}</p>

                                {selectedReview.replyAt && (
                                    <p className="text-xs mt-2 text-gray-400">
                                        Replied at: {new Date(selectedReview.replyAt).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">No reply added yet.</p>
                        )}
                    </CardContent>
                </Card>
            )}
        </PageWrapper>
    );
}
