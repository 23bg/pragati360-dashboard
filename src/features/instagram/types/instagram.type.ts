export interface Instagram {
    id: string;
    businessId: string;
    username: string;
    instagramUserId: string;
    profilePicUrl?: string | null;
    accessToken: string;
    refreshToken?: string | null;
    tokenExpiresAt?: string | null; // ISO date string

    followersCount?: number | null;
    mediaCount?: number | null;

    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
}
