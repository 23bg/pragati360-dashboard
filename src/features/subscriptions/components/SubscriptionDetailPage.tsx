"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ROUTES from "@/shared/constants/route";

export default function SubscriptionDetailPage({ id }: { id?: string }) {
    const { currentPayment, loading, error, getPaymentById } = useSubscriptions();

    useEffect(() => {
        if (id) getPaymentById(id);
    }, [id]);

    return (
        <PageWrapper
            title="Subscription / Payment Details"
            showInitialLoadingOnly={false}
            isLoading={loading}
            error={error}
            onRetry={() => id && getPaymentById(id)}
            showBackButton
            backHref={ROUTES.CONSOLE.SUBSCRIPTIONS}
            backLabel="Back to Subscriptions"
        >
            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}

            {/* Payment Details */}
            {!loading && currentPayment && (
                <Card className="max-w-3xl mx-auto mt-6 border-white/10 bg-neutral-900 text-white">
                    <CardHeader>
                        <CardTitle>
                            Payment #{currentPayment.id}
                        </CardTitle>
                        <p className="text-sm text-gray-400">
                            Status: <span className="capitalize">{currentPayment.status}</span>
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-4 text-gray-300">

                        <div>
                            <strong>Amount:</strong> ₹{currentPayment.amount}
                        </div>

                        <div>
                            <strong>Currency:</strong> {currentPayment.currency}
                        </div>

                        <div>
                            <strong>Payment Method:</strong>{" "}
                            {currentPayment.paymentMethod || "N/A"}
                        </div>

                        <div>
                            <strong>Razorpay Order ID:</strong>{" "}
                            {currentPayment.razorpayOrderId || "N/A"}
                        </div>

                        <div>
                            <strong>Razorpay Payment ID:</strong>{" "}
                            {currentPayment.razorpayPaymentId || "N/A"}
                        </div>

                        {currentPayment.description && (
                            <div>
                                <strong>Description:</strong> {currentPayment.description}
                            </div>
                        )}

                        {/* Metadata */}
                        {currentPayment.metadata && (
                            <div>
                                <strong>Metadata:</strong>
                                <pre className="bg-neutral-800 rounded p-3 mt-1 text-sm">
                                    {JSON.stringify(currentPayment.metadata, null, 2)}
                                </pre>
                            </div>
                        )}

                        {/* Refund */}
                        <div>
                            <strong>Refunded At:</strong>{" "}
                            {currentPayment.refundedAt
                                ? new Date(currentPayment.refundedAt).toLocaleString()
                                : "Not Refunded"}
                        </div>

                        {/* Timestamps */}
                        <div className="pt-4 border-t border-white/10">
                            <strong>Created At:</strong>{" "}
                            {new Date(currentPayment.createdAt).toLocaleString()}
                        </div>

                        <div>
                            <strong>Updated At:</strong>{" "}
                            {new Date(currentPayment.updatedAt).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            )}
        </PageWrapper>
    );
}
