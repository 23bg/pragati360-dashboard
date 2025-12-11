export interface IBusiness {
    id: string;
    name: string;
    description?: string;
    category?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    city?: string;
    email?: string;
    phoneNumber1?: string;
    isActive: boolean;
    isVerified: boolean;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IBusinessListResponse {
    businesses: IBusiness[];
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
