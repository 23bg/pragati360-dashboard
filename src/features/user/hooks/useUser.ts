import { useGetCurrentUserQuery, useUpdateUserProfileMutation } from "../services/userApi"; // Import RTK Query hooks
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

function extractErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string | null {
    if (!error) return null;

    if ("message" in error && typeof error.message === "string") {
        return error.message;
    }

    if ("data" in error && error.data && typeof error.data === "object" && "message" in error.data && typeof error.data.message === "string") {
        return error.data.message;
    }

    // Fallback for unexpected error structures
    return "An unexpected error occurred.";
}

export const useUser = () => {
    const { data, isLoading, isError, error, refetch } = useGetCurrentUserQuery();
    const [updateUserProfile, { isLoading: isUpdating, error: updateError }] = useUpdateUserProfileMutation();

    const currentUser = data?.data || null;
    const loading = isLoading || isUpdating;

    return {
        currentUser,
        loading,
        error: extractErrorMessage(error || updateError), // Combine and standardize errors
        getCurrentUser: refetch, // Expose refetch for manual refresh
        updateUserProfile,
    };
};
