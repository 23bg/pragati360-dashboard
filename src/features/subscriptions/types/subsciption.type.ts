export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

export interface ISubsciption {
    id: string;

    userId?: string | null;
    organizationId?: string | null;

    amount: number;
    currency: string; // "INR"
    status: PaymentStatus;

    paymentMethod?: string | null;

    razorpayOrderId?: string | null;
    razorpayPaymentId?: string | null;

    description?: string | null;
    metadata?: any | null;

    refundedAt?: Date | null;

    createdAt: Date;
    updatedAt: Date;

    // Optional relation fields if needed later
    // user?: IUser;
    // organization?: IOrganization;
}
