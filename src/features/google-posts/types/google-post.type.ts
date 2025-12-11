export interface IGooglePost {
    id: string; // ObjectId
    googlePostId?: string | null; // Returned by Google

    googleLocationId: string;
    googleAccountId: string;

    postType?: string | null;
    title?: string | null;
    summary?: string | null;
    languageCode?: string | null;

    mediaUrls: string[]; // default []

    callToAction?: any | null;
    startTime?: Date | null;
    endTime?: Date | null;
    createTime?: Date | null;
    updateTime?: Date | null;

    status?: string | null; // draft/published/etc.

    rawResponse?: any;
    syncedAt?: Date | null;

    createdAt: Date;
    updatedAt: Date;

    // Optional relations
    location?: IGoogleLocation;
    googleAccount?: IGoogleAccount;
}
