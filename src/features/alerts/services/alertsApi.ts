import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/shared/types/api';
import { Alert } from '../types/alert.type'; // Import Alert interface from its dedicated types file

export const alertsApi = createApi({
    reducerPath: 'alertsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Assuming your API base path
    endpoints: (builder) => ({
        getAlerts: builder.query<ApiResponse<Alert[]>, void>({
            query: () => 'alerts', // Adjust this endpoint as needed
        }),
        // You can add more endpoints here for marking as read, deleting, etc.
    }),
});

export const { useGetAlertsQuery } = alertsApi;
