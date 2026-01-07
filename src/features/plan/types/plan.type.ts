// Placeholder for plan-related types if they become more complex than defined in the slice
export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    features: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
