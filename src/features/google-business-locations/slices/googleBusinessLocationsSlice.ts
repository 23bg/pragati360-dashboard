/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import {
    IBusinessLocation,
    IBusinessLocationListResponse,
} from "../types/google-business-locations.type";

// ------------------------------
// State Interface
// ------------------------------
interface BusinessLocationState {
    locations: IBusinessLocation[];
    currentLocation: IBusinessLocation | null;
    loading: boolean;
    error: string | null;
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
// Async Thunks
// ------------------------------

// 📌 Fetch location list
export const fetchBusinessLocationList = createAsyncThunk<
    IBusinessLocationListResponse,
    any,
    { rejectValue: string }
>("businessLocation/fetchList", async (params, { rejectWithValue }) => {
    try {
        const res = await api.get(API.GOOGLE_BUSINESS.LOCATION.GET_ALL, { params });
        return res.data.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to fetch business locations."
        );
    }
});

// 📌 Fetch location by ID
export const fetchBusinessLocationById = createAsyncThunk<
    IBusinessLocation,
    { id: string },
    { rejectValue: string }
>("businessLocation/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(API.GOOGLE_BUSINESS.LOCATION.GET(id));
        return res.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to fetch business location."
        );
    }
});

// 📌 Update location
export const updateBusinessLocation = createAsyncThunk<
    IBusinessLocation,
    { id: string; data: any },
    { rejectValue: string }
>("businessLocation/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(API.GOOGLE_BUSINESS.LOCATION.UPDATE(id), data);
        return res.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to update business location."
        );
    }
});

// 📌 Delete location
export const deleteBusinessLocation = createAsyncThunk<
    { message: string },
    { id: string },
    { rejectValue: string }
>("businessLocation/delete", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.delete(API.GOOGLE_BUSINESS.LOCATION.DELETE(id));
        return res.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to delete business location."
        );
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
            // ------------------------------
            // FETCH LIST
            // ------------------------------
            .addCase(fetchBusinessLocationList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchBusinessLocationList.fulfilled,
                (state, action: PayloadAction<IBusinessLocationListResponse>) => {
                    state.loading = false;
                    state.locations = action.payload.locations;
                    state.total = action.payload.total;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.currentPage;
                    state.pageSize = action.payload.pageSize;
                }
            )
            .addCase(fetchBusinessLocationList.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to load business locations.";
            })

            // ------------------------------
            // FETCH BY ID
            // ------------------------------
            .addCase(fetchBusinessLocationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchBusinessLocationById.fulfilled,
                (state, action: PayloadAction<IBusinessLocation>) => {
                    state.loading = false;
                    state.currentLocation = action.payload;
                }
            )
            .addCase(fetchBusinessLocationById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to fetch business location.";
            })

            // ------------------------------
            // UPDATE
            // ------------------------------
            .addCase(updateBusinessLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                updateBusinessLocation.fulfilled,
                (state, action: PayloadAction<IBusinessLocation>) => {
                    state.loading = false;
                    state.successMessage = "Location updated successfully.";
                    state.currentLocation = action.payload;
                    state.locations = state.locations.map((loc) =>
                        loc.id === action.payload.id ? action.payload : loc
                    );
                }
            )
            .addCase(updateBusinessLocation.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to update business location.";
            })

            // ------------------------------
            // DELETE
            // ------------------------------
            .addCase(deleteBusinessLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBusinessLocation.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Location deleted successfully.";
            })
            .addCase(deleteBusinessLocation.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to delete business location.";
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
