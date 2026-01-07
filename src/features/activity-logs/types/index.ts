export interface ActivityLog {
    id: string;
    userId: string;
    action: string; // e.g., "User logged in", "Report generated"
    timestamp: string;
    details?: Record<string, unknown>; // Optional: more details about the action
}
