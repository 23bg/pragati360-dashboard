import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/shared/types/api';
import { ActivityLog } from '../types';

export const activityLogsApi = createApi({
    reducerPath: 'activityLogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Assuming your API base path
    endpoints: (builder) => ({
        getActivityLogs: builder.query<ApiResponse<ActivityLog[]>, void>({
            query: () => 'activity-logs', // Adjust this endpoint as needed
        }),
    }),
});

export const { useGetActivityLogsQuery } = activityLogsApi;
