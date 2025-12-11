/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { Instagram } from "../types/instagram.type";

// ----------------------------------
// State Interface
// ----------------------------------
interface InstagramState {
    profiles: Instagram[];
    currentProfile: Instagram | null;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

// ----------------------------------
// Initial State
// ----------------------------------
const initialState: InstagramState = {
    profiles: [],
    currentProfile: null,
    loading: false,
    error: null,
    successMessage: null,
};

// ----------------------------------
// Async Thunks
// ----------------------------------

// ✅ Fetch List of Profiles
export const fetchInstagramList = createAsyncThunk<
    Instagram[],
    {
        username?: string;
        businessId?: string;
        search?: string;
        sort?: string;
        page?: number;
        limit?: number;
    },
    { rejectValue: string }
>("instagram/fetchList", async (params, { rejectWithValue }) => {
    try {
        const response = await api.get(API.INSTAGRAM.LIST, { params });
        return response.data.data.profiles as Instagram[];
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to fetch Instagram profiles.";
        return rejectWithValue(message);
    }
});

// ✅ Fetch Instagram by ID
export const fetchInstagramById = createAsyncThunk<
    Instagram,
    { id: string },
    { rejectValue: string }
>("instagram/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        const response = await api.get(API.INSTAGRAM.GET(id));
        return response.data.data as Instagram;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            "Failed to fetch Instagram profile by ID.";
        return rejectWithValue(message);
    }
});

// ✅ Fetch Profile by Business ID
export const fetchByBusinessId = createAsyncThunk<
    Instagram,
    { businessId: string },
    { rejectValue: string }
>("instagram/fetchByBusinessId", async ({ businessId }, { rejectWithValue }) => {
    try {
        const response = await api.get(API.INSTAGRAM.GET_BY_BUSINESS(businessId));
        return response.data.data as Instagram;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            "Failed to fetch Instagram profile by businessId.";
        return rejectWithValue(message);
    }
});

// ✅ Create Instagram Profile
export const createInstagram = createAsyncThunk<
    Instagram,
    { payload: Partial<Instagram> },
    { rejectValue: string }
>("instagram/create", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await api.post(API.INSTAGRAM.CREATE, payload);
        return response.data.data as Instagram;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to create Instagram profile.";
        return rejectWithValue(message);
    }
});

// ✅ Update Instagram Profile
export const updateInstagram = createAsyncThunk<
    Instagram,
    { id: string; payload: Partial<Instagram> },
    { rejectValue: string }
>("instagram/update", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const response = await api.patch(API.INSTAGRAM.UPDATE(id), payload);
        return response.data.data as Instagram;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to update Instagram profile.";
        return rejectWithValue(message);
    }
});

// ✅ Delete / Disconnect Instagram Profile
export const deleteInstagram = createAsyncThunk<
    Instagram,
    { id: string },
    { rejectValue: string }
>("instagram/delete", async ({ id }, { rejectWithValue }) => {
    try {
        const response = await api.delete(API.INSTAGRAM.DELETE(id));
        return response.data.data as Instagram;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to delete Instagram profile.";
        return rejectWithValue(message);
    }
});

// ----------------------------------
// Slice Definition
// ----------------------------------
const instagramSlice = createSlice({
    name: "instagram",
    initialState,
    reducers: {
        resetInstagramState: () => initialState,
        clearInstagramMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ------------------------------
            // FETCH LIST
            // ------------------------------
            .addCase(fetchInstagramList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchInstagramList.fulfilled,
                (state, action: PayloadAction<Instagram[]>) => {
                    state.loading = false;
                    state.profiles = action.payload;
                }
            )
            .addCase(
                fetchInstagramList.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to load Instagram profiles list.";
                }
            )

            // ------------------------------
            // FETCH BY ID
            // ------------------------------
            .addCase(fetchInstagramById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchInstagramById.fulfilled,
                (state, action: PayloadAction<Instagram>) => {
                    state.loading = false;
                    state.currentProfile = action.payload;
                }
            )
            .addCase(
                fetchInstagramById.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to load Instagram profile by ID.";
                }
            )

            // ------------------------------
            // FETCH BY BUSINESS ID
            // ------------------------------
            .addCase(fetchByBusinessId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchByBusinessId.fulfilled,
                (state, action: PayloadAction<Instagram>) => {
                    state.loading = false;
                    state.currentProfile = action.payload;
                }
            )
            .addCase(
                fetchByBusinessId.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload ||
                        "Failed to load Instagram profile by businessId.";
                }
            )

            // ------------------------------
            // CREATE PROFILE
            // ------------------------------
            .addCase(createInstagram.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(
                createInstagram.fulfilled,
                (state, action: PayloadAction<Instagram>) => {
                    state.loading = false;
                    state.successMessage = "Instagram profile created successfully.";
                    state.currentProfile = action.payload;
                }
            )
            .addCase(
                createInstagram.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to create Instagram profile.";
                }
            )

            // ------------------------------
            // UPDATE PROFILE
            // ------------------------------
            .addCase(updateInstagram.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(
                updateInstagram.fulfilled,
                (state, action: PayloadAction<Instagram>) => {
                    state.loading = false;
                    state.currentProfile = action.payload;
                    state.successMessage = "Instagram profile updated successfully.";
                }
            )
            .addCase(
                updateInstagram.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to update Instagram profile.";
                }
            )

            // ------------------------------
            // DELETE PROFILE
            // ------------------------------
            .addCase(deleteInstagram.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteInstagram.fulfilled,
                (state) => {
                    state.loading = false;
                    state.currentProfile = null;
                    state.successMessage = "Instagram profile disconnected successfully.";
                }
            )
            .addCase(
                deleteInstagram.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to delete Instagram profile.";
                }
            );
    },
});

// ----------------------------------
// Exports
// ----------------------------------
export const { resetInstagramState, clearInstagramMessages } =
    instagramSlice.actions;

export default instagramSlice.reducer;
