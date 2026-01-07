"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import useSubscriptions from "../hooks/useSubsciption";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ROUTES from "@/shared/constants/route";

export default function SubscriptionDetailPage({ id }: { id?: string }) {
    const { currentSubscription, loading, error, getSubscriptionById } = useSubscriptions();

    useEffect(() => {
        if (id) getSubscriptionById(id);
    }, [id]);

    return (
        <PageWrapper
            title="Subscription / Payment Details"
            showInitialLoadingOnly={false}
            isLoading={loading}
            error={error?.message}
            onRetry={() => id && getSubscriptionById(id)}
            showBackButton
            backHref={ROUTES.APP.SUBSCRIPTION.ROOT}
            backLabel="Back to Subscriptions"
        >
            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}

            {/* Payment Details */}
            {!loading && currentSubscription && (
                <Card className="max-w-3xl mx-auto mt-6 border-white/10 bg-neutral-900 text-white">
                    <CardHeader>
                        <CardTitle>
                            Payment #{currentSubscription.id}
                        </CardTitle>
                        <p className="text-sm text-gray-400">
                            Status: <span className="capitalize">{currentSubscription.status}</span>
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-4 text-gray-300">

                        <div>
                            <strong>Amount:</strong> ₹{currentSubscription.amount}
                        </div>

                        <div>
                            <strong>Currency:</strong> {currentSubscription.currency}
                        </div>

                        <div>
                            <strong>Payment Method:</strong>{" "}
                            {currentSubscription.paymentMethod || "N/A"}
                        </div>

                        <div>
                            <strong>Razorpay Order ID:</strong>{" "}
                            {currentSubscription.razorpayOrderId || "N/A"}
                        </div>

                        <div>
                            <strong>Razorpay Payment ID:</strong>{" "}
                            {currentSubscription.razorpayPaymentId || "N/A"}
                        </div>

                        {currentSubscription.description && (
                            <div>
                                <strong>Description:</strong> {currentSubscription.description}
                            </div>
                        )}

                        {/* Metadata */}
                        {currentSubscription.metadata && (
                            <div>
                                <strong>Metadata:</strong>
                                <pre className="bg-neutral-800 rounded p-3 mt-1 text-sm">
                                    {JSON.stringify(currentSubscription.metadata, null, 2)}
                                </pre>
                            </div>
                        )}

                        {/* Refund */}
                        <div>
                            <strong>Refunded At:</strong>{" "}
                            {currentSubscription.refundedAt
                                ? new Date(currentSubscription.refundedAt).toLocaleString()
                                : "Not Refunded"}
                        </div>

                        {/* Timestamps */}
                        <div className="pt-4 border-t border-white/10">
                            <strong>Created At:</strong>{" "}
                            {new Date(currentSubscription.createdAt).toLocaleString()}
                        </div>

                        <div>
                            <strong>Updated At:</strong>{" "}
                            {new Date(currentSubscription.updatedAt).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            )}
        </PageWrapper>
    );
}
