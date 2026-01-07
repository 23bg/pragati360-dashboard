// Placeholder for system health related types if they become more complex than defined in the slice
export interface SystemStatus {
    id: string;
    serviceName: string;
    status: "operational" | "degraded" | "outage";
    message: string;
    lastChecked: string;
}
