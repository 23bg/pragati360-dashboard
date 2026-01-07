import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api, { handleApiCall } from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import {
    IBusinessLocation,
    IBusinessLocationListResponse,
} from "../types/google-business-locations.type";
import { AppError } from "@/shared/types/api";

// ------------------------------
// State Interface
// ------------------------------
interface BusinessLocationState {
    locations: IBusinessLocation[];
    currentLocation: IBusinessLocation | null;
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: BusinessLocationState = {
    locations: [],
    currentLocation: null,
    loading: false,
    error: null,
    successMessage: null,
    total: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
};

// ------------------------------
// Thunk Argument Types
// ------------------------------
interface FetchListParams {
    page?: number;
    limit?: number;
    search?: string;
}

interface UpdateParams {
    id: string;
    data: Partial<IBusinessLocation>;
}

// ------------------------------
// Async Thunks
// ------------------------------

export const fetchBusinessLocationList = createAsyncThunk<
    IBusinessLocationListResponse,
    FetchListParams,
    { rejectValue: AppError }
>("businessLocation/fetchList", async (params, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.get<IBusinessLocationListResponse>(API.GOOGLE_BUSINESS.LOCATION.GET_ALL, { params }));
        return data as IBusinessLocationListResponse;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const fetchBusinessLocationById = createAsyncThunk<
    IBusinessLocation,
    { id: string },
    { rejectValue: AppError }
>("businessLocation/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.get<IBusinessLocation>(API.GOOGLE_BUSINESS.LOCATION.GET(id)));
        return data as IBusinessLocation;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const updateBusinessLocation = createAsyncThunk<
    IBusinessLocation,
    UpdateParams,
    { rejectValue: AppError }
>("businessLocation/update", async ({ id, data: payload }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.put<IBusinessLocation>(API.GOOGLE_BUSINESS.LOCATION.UPDATE(id), payload));
        return data as IBusinessLocation;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const deleteBusinessLocation = createAsyncThunk<
    string, // Returns ID of deleted location
    { id: string },
    { rejectValue: AppError }
>("businessLocation/delete", async ({ id }, { rejectWithValue }) => {
    try {
        await handleApiCall(api.delete(API.GOOGLE_BUSINESS.LOCATION.DELETE(id)));
        return id;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

// ------------------------------
// Slice Definition
// ------------------------------
const businessLocationSlice = createSlice({
    name: "businessLocation",
    initialState,
    reducers: {
        resetBusinessLocationState: () => initialState,
        clearBusinessLocationMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH LIST
            .addCase(fetchBusinessLocationList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessLocationList.fulfilled, (state, action: PayloadAction<IBusinessLocationListResponse>) => {
                state.loading = false;
                state.locations = action.payload.locations;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(fetchBusinessLocationList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to load business locations." };
            })

            // FETCH BY ID
            .addCase(fetchBusinessLocationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessLocationById.fulfilled, (state, action: PayloadAction<IBusinessLocation>) => {
                state.loading = false;
                state.currentLocation = action.payload;
            })
            .addCase(fetchBusinessLocationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to fetch business location." };
            })

            // UPDATE
            .addCase(updateBusinessLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBusinessLocation.fulfilled, (state, action: PayloadAction<IBusinessLocation>) => {
                state.loading = false;
                state.successMessage = "Location updated successfully.";
                state.currentLocation = action.payload;
                state.locations = state.locations.map((loc) =>
                    loc.id === action.payload.id ? action.payload : loc
                );
            })
            .addCase(updateBusinessLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to update business location." };
            })

            // DELETE
            .addCase(deleteBusinessLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBusinessLocation.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.successMessage = "Location deleted successfully.";
                state.locations = state.locations.filter(loc => loc.id !== action.payload);
            })
            .addCase(deleteBusinessLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to delete business location." };
            });
    },
});

// ------------------------------
// Exports
// ------------------------------
export const {
    resetBusinessLocationState,
    clearBusinessLocationMessages,
} = businessLocationSlice.actions;

export default businessLocationSlice.reducer;
