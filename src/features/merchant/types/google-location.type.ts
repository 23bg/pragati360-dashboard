import { IGooglePost } from "@/features/google-posts/types/google-post.type";
import { IGoogleReview } from "@/features/google-reviews/types/google-review.type";

export interface IGoogleLocation {
    id: string; // ObjectId
    googleLocationId: string; // "locations/12345"
    googleAccountId: string;
    businessId?: string | null;

    name?: string | null;
    address?: string | null;
    phone?: string | null;
    lat?: number | null;
    lng?: number | null;

    syncedAt?: Date | null;
    rawPayload?: any;

    createdAt: Date;
    updatedAt: Date;

    posts?: IGooglePost[];
    reviews?: IGoogleReview[];
}
