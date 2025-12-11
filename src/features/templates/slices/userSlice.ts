import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { User } from "@/shared/types";

// ------------------------------
// State Interface
// ------------------------------
interface UserState {
    users: User[]; // For admin/all users list
    currentUser: User | null; // For profile info
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: UserState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// Async Thunks
// ------------------------------

// ✅ Get Current User (Profile)
export const fetchUserById = createAsyncThunk<
    User,
    { id: string },
    { rejectValue: string }
>("user/fetchCurrentUser", async ({ id }, { rejectWithValue }) => {
    try {
        const response = await api.get(API.USERS.GET(id));
        console.log(response.data.data)
        return response.data.data as User;
    } catch (error: any) {
        console.error("Fetch current user error:", error);
        const message =
            error?.response?.data?.message || "Failed to fetch user profile.";
        return rejectWithValue(message);
    }
});

// ✅ Update User Profile
export const updateUserProfile = createAsyncThunk<
    User,
    { id: string, payload: Partial<User> },
    { rejectValue: string }
>("user/updateUserProfile", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const response = await api.put(API.USERS.UPDATE(id), payload);
        return response.data as User;
    } catch (error: any) {
        console.error("Update user error:", error);
        const message =
            error?.response?.data?.message || "Failed to update profile.";
        return rejectWithValue(message);
    }
});

// ✅ Fetch All Users (Admin only)
export const fetchAllUsers = createAsyncThunk<
    User[],
    void,
    { rejectValue: string }
>("user/fetchAllUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(API.USERS.ALL);
        return response.data.data.users;
    } catch (error: any) {
        console.error("Fetch all users error:", error);
        const message =
            error?.response?.data?.message || "Failed to fetch users list.";
        return rejectWithValue(message);
    }
});


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
    },
    extraReducers: (builder) => {
        builder
            // ------------------------------
            // FETCH CURRENT USER
            // ------------------------------
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUserById.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.currentUser = action.payload;
                    state.error = null;
                }
            )
            .addCase(
                fetchUserById.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to load profile.";
                }
            )

            // ------------------------------
            // UPDATE USER PROFILE
            // ------------------------------
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(
                updateUserProfile.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.currentUser = action.payload;
                    state.successMessage = "Profile updated successfully.";
                }
            )
            .addCase(
                updateUserProfile.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to update profile.";
                }
            )

            // ------------------------------
            // FETCH ALL USERS
            // ------------------------------
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(
                fetchAllUsers.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch users.";
                }
            )
    },
});

// ------------------------------
// Exports
// ------------------------------
export const { resetUserState, clearUserMessages } = userSlice.actions;
export default userSlice.reducer;
