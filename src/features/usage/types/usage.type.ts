// Placeholder for usage-related types if they become more complex than defined in the slice
export interface UsageMetric {
    id: string;
    userId: string;
    feature: string;
    usageCount: number;
    limit: number;
    unit: string; // e.g., "posts", "MB", "requests"
    period: string; // e.g., "monthly", "daily"
    updatedAt: string;
}
