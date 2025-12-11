import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchAllUsers,
    fetchUserById,
    updateUserProfile,
    resetUserState,
    clearUserMessages,
} from "../slices/userSlice";

export const useUser = () => {
    const dispatch = useAppDispatch();

    const {
        users,
        currentUser,
        loading,
        error,
        successMessage,
    } = useAppSelector((state) => state.users);

    // ------------------------------
    // Actions / Thunks
    // ------------------------------
    const getAllUsers = () => dispatch(fetchAllUsers());
    const getCurrentUser = (id: string) => dispatch(fetchUserById({ id }));
    const updateProfile = (id: string, payload: Partial<typeof currentUser>) =>
        dispatch(updateUserProfile({ id, payload }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------
    const resetState = () => dispatch(resetUserState());
    const clearMessages = () => dispatch(clearUserMessages());

    // ------------------------------
    // Return Combined Interface
    // ------------------------------
    return {
        users,
        currentUser,
        loading,
        error,
        successMessage,
        getAllUsers,
        getCurrentUser,
        updateProfile,
        resetState,
        clearMessages,
    };
};
