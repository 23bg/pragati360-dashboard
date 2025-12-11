export interface IGoogleReview {
    id: string; // ObjectId
    googleReviewId: string; // unique from Google
    googleLocationId: string;
    googleAccountId: string;

    // Review content
    authorName?: string | null;
    authorUrl?: string | null;
    rating?: number | null;
    comment?: string | null;
    languageCode?: string | null;
    reviewTime?: Date | null;
    reviewState?: string | null;
    metadata?: any;

    // Reply
    replyText?: string | null;
    replyUserId?: string | null;
    replyAt?: Date | null;
    replySynced: boolean;

    // Sync/debug
    rawResponse?: any;
    syncedAt?: Date | null;

    createdAt: Date;
    updatedAt: Date;

    // Optional relations
    location?: IGoogleLocation;
    googleAccount?: IGoogleAccount;
}
