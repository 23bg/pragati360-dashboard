export interface SecuritySettings {
    id: string;
    userId: string;
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    // Add other security-related settings as needed
}
