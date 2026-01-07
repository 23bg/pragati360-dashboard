import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Removed: apiGet, apiPut, API
import { User } from "../types/user.type";
import { AppError } from "@/shared/types/api"; // Keep AppError for other potential local error states

// ------------------------------
// State Interface
// ------------------------------
interface UserState {
    users: User[]; // For admin/all users list
    // Removed: currentUser (now managed by RTK Query)
    loading: boolean; // Keep for other potential local loading states if needed
    error: any | null; // Keep for other potential local error states if needed (changed to any for flexibility)
    successMessage: string | null; // Keep for other potential local success states if needed
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: UserState = {
    users: [],
    // Removed: currentUser: null,
    loading: false,
    error: null,
    successMessage: null,
};

// Removed: Thunk Argument Types (UpdateUserParams)

// Removed: Async Thunks (fetchCurrentUser, updateUserProfile)

// ------------------------------
// Slice Definition
// ------------------------------
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: () => initialState,
        clearUserMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        // If there are other actions that modify 'users' array, keep them.
        // For now, only local state management actions are kept.
    },
    // Removed: extraReducers
});

// ------------------------------
// Exports
// ------------------------------
export const { resetUserState, clearUserMessages } = userSlice.actions;
export default userSlice.reducer;
