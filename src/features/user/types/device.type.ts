export interface Device {
    id: string;
    userId: string;
    type: string; // e.g., "Browser", "Mobile App"
    os: string; // e.g., "Windows", "iOS", "Android"
    browser?: string; // e.g., "Chrome", "Safari"
    ipAddress: string;
    lastLogin: string;
    isCurrent: boolean;
}
