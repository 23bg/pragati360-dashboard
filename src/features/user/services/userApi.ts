import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/shared/types/api';
import { User } from '../types/user.type';
import { Device } from '../types/device.type';
import { SecuritySettings } from '../types/security.type'; // Import SecuritySettings type

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<ApiResponse<User[]>, void>({
            query: () => 'users', // Assuming '/api/users' is the endpoint for all users
        }),
        getCurrentUser: builder.query<ApiResponse<User>, void>({
            query: () => 'users/current',
        }),
        updateUserProfile: builder.mutation<ApiResponse<User>, { id: string; payload: Partial<User> }>({
            query: ({ id, payload }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: payload,
            }),
        }),
        getUserDevices: builder.query<ApiResponse<Device[]>, void>({
            query: () => 'users/devices',
        }),
        getSecuritySettings: builder.query<ApiResponse<SecuritySettings>, void>({ // New endpoint for security settings
            query: () => 'users/security', // Adjust this endpoint as needed
        }),
        updateSecuritySettings: builder.mutation<ApiResponse<SecuritySettings>, Partial<SecuritySettings>>({ // New endpoint for updating security settings
            query: (payload) => ({
                url: `users/security`, // Adjust this endpoint as needed
                method: 'PUT',
                body: payload,
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useGetCurrentUserQuery, useUpdateUserProfileMutation, useGetUserDevicesQuery, useGetSecuritySettingsQuery, useUpdateSecuritySettingsMutation } = userApi;
