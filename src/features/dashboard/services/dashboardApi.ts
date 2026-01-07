import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/shared/types/api';
import { DashboardStats } from '../types';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Assuming your API base path
    endpoints: (builder) => ({
        getDashboardStats: builder.query<ApiResponse<DashboardStats>, void>({
            query: () => 'dashboard/stats', // Adjust this endpoint as needed
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
