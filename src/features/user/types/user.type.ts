export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;

    // OAuth Flags
    isGoogleOAuthConnected?: boolean;
    isInstagramOAuthConnected?: boolean;
    isNotificationEnable?: boolean;
    isWhatsappAlertsEnable?: boolean;
    isBiometricEnable?: boolean;
    isEmailAlertsEnable?: boolean;

    // OAuth Token Objects (from Prisma Json fields)
    googleOAuthTokens?: {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
        scope?: string;
        token_type?: string;
        id_token?: string;
        [key: string]: any; // in case Google adds more fields
    };

    instagramOAuthTokens?: {
        access_token?: string;
        user_id?: string | number;
        expires_in?: number;
        [key: string]: any; // IG sometimes adds fields
    };
}
