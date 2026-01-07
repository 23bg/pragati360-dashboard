// Placeholder for alert-related types if they become more complex than defined in the slice
export interface Alert {
    id: string;
    userId: string;
    type: "info" | "warning" | "error" | "success";
    message: string;
    isRead: boolean;
    createdAt: string;
}
