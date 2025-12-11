/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBusinessLocation {
    id: string;
    googleLocationId: string;
    name?: string;
    address?: string;
    phone?: string;
    lat?: number;
    lng?: number;
    syncedAt?: string;
    createdAt: string;
    updatedAt: string;
    posts?: any[];
    reviews?: any[];
}

export interface IBusinessLocationListResponse {
    locations: IBusinessLocation[];
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
