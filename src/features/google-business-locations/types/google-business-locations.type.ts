import { IGooglePost } from "@/features/google-posts/types/google-post.type";
import { IGoogleReview } from "@/features/google-reviews/types/google-review.type";

export interface IBusinessLocation {
    id: string;
    googleLocationId: string;
    name?: string;
    address?: string;
    phone?: string;
    lat?: number;
    lng?: number;
    syncedAt?: string;
    createdAt: string;
    updatedAt: string;
    posts?: IGooglePost[];
    reviews?: IGoogleReview[];
}

export interface IBusinessLocationListResponse {
    locations: IBusinessLocation[];
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
