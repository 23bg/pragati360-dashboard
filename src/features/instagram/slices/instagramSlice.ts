import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/shared/lib/apiService";
import { API } from "@/shared/constants";
import { Instagram, InstagramListResponse } from "../types/instagram.type";
import { AppError } from "@/shared/types/api";

// ----------------------------------
// State Interface
// ----------------------------------
interface InstagramState {
    profiles: Instagram[];
    currentProfile: Instagram | null;
    loading: boolean;
    error: AppError | null;
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
// Thunk Argument Types
// ----------------------------------
interface FetchListParams {
    username?: string;
    businessId?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

interface UpdateParams {
    id: string;
    payload: Partial<Instagram>;
}


// ----------------------------------
// Async Thunks
// ----------------------------------

export const fetchInstagramList = createAsyncThunk<
    InstagramListResponse,
    FetchListParams | undefined,
    { rejectValue: AppError }
>("instagram/fetchList", async (params, { rejectWithValue }) => {
    try {
        return await apiGet<InstagramListResponse>(API.INSTAGRAM.LIST + (params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''));
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const fetchInstagramById = createAsyncThunk<
    Instagram,
    { id: string },
    { rejectValue: AppError }
>("instagram/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        return await apiGet<Instagram>(API.INSTAGRAM.GET(id));
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const fetchByBusinessId = createAsyncThunk<
    Instagram,
    { businessId: string },
    { rejectValue: AppError }
>("instagram/fetchByBusinessId", async ({ businessId }, { rejectWithValue }) => {
    try {
        return await apiGet<Instagram>(API.INSTAGRAM.GET_BY_BUSINESS(businessId));
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const createInstagram = createAsyncThunk<
    Instagram,
    { payload: Partial<Instagram> },
    { rejectValue: AppError }
>("instagram/create", async ({ payload }, { rejectWithValue }) => {
    try {
        return await apiPost<Instagram>(API.INSTAGRAM.CREATE, payload);
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const updateInstagram = createAsyncThunk<
    Instagram,
    UpdateParams,
    { rejectValue: AppError }
>("instagram/update", async ({ id, payload }, { rejectWithValue }) => {
    try {
        return await apiPatch<Instagram>(API.INSTAGRAM.UPDATE(id), payload);
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const deleteInstagram = createAsyncThunk<
    string, // return id on success
    { id: string },
    { rejectValue: AppError }
>("instagram/delete", async ({ id }, { rejectWithValue }) => {
    try {
        await apiDelete(API.INSTAGRAM.DELETE(id));
        return id;
    } catch (error) {
        return rejectWithValue(error as AppError);
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
            // FETCH LIST
            .addCase(fetchInstagramList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInstagramList.fulfilled, (state, action: PayloadAction<InstagramListResponse>) => {
                state.loading = false;
                state.profiles = action.payload.profiles;
            })
            .addCase(fetchInstagramList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // FETCH BY ID
            .addCase(fetchInstagramById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInstagramById.fulfilled, (state, action: PayloadAction<Instagram>) => {
                state.loading = false;
                state.currentProfile = action.payload;
            })
            .addCase(fetchInstagramById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // FETCH BY BUSINESS ID
            .addCase(fetchByBusinessId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchByBusinessId.fulfilled, (state, action: PayloadAction<Instagram>) => {
                state.loading = false;
                state.currentProfile = action.payload;
            })
            .addCase(fetchByBusinessId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // CREATE PROFILE
            .addCase(createInstagram.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createInstagram.fulfilled, (state, action: PayloadAction<Instagram>) => {
                state.loading = false;
                state.successMessage = "Instagram profile created successfully.";
                state.currentProfile = action.payload;
            })
            .addCase(createInstagram.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // UPDATE PROFILE
            .addCase(updateInstagram.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateInstagram.fulfilled, (state, action: PayloadAction<Instagram>) => {
                state.loading = false;
                state.currentProfile = action.payload;
                state.successMessage = "Instagram profile updated successfully.";
            })
            .addCase(updateInstagram.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // DELETE PROFILE
            .addCase(deleteInstagram.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteInstagram.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.currentProfile = null;
                state.profiles = state.profiles.filter(p => p.id !== action.payload);
                state.successMessage = "Instagram profile disconnected successfully.";
            })
            .addCase(deleteInstagram.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            });
    },
});

// ----------------------------------
// Exports
// ----------------------------------
export const { resetInstagramState, clearInstagramMessages } =
    instagramSlice.actions;

export default instagramSlice.reducer;
