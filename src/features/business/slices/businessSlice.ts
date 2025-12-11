/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { IBusiness, IBusinessListResponse } from "../types/business.type";

// ------------------------------
// State Interface
// ------------------------------
interface BusinessState {
    businesses: IBusiness[];
    currentBusiness: IBusiness | null;
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
const initialState: BusinessState = {
    businesses: [],
    currentBusiness: null,
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

// 📌 Fetch Business list with filters + pagination
export const fetchBusinessList = createAsyncThunk<
    IBusinessListResponse,
    any,
    { rejectValue: string }
>("business/fetchList", async (params, { rejectWithValue }) => {
    try {
        const res = await api.get(API.BUSINESS.GET_ALL, { params });
        return res.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to fetch businesses."
        );
    }
});

// 📌 Fetch single business by ID
export const fetchBusinessById = createAsyncThunk<
    IBusiness,
    { id: string },
    { rejectValue: string }
>("business/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(API.BUSINESS.GET(id));
        return res.data.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to fetch business."
        );
    }
});

// 📌 Create a new business
export const createBusiness = createAsyncThunk<
    IBusiness,
    any,
    { rejectValue: string }
>("business/create", async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post(API.BUSINESS.CREATE, payload);
        return res.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to create business."
        );
    }
});

// 📌 Update business
export const updateBusiness = createAsyncThunk<
    IBusiness,
    { id: string; data: any },
    { rejectValue: string }
>("business/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(API.BUSINESS.UPDATE(id), data);
        return res.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to update business."
        );
    }
});

// 📌 Delete business
export const deleteBusiness = createAsyncThunk<
    { message: string },
    { id: string },
    { rejectValue: string }
>("business/delete", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.delete(API.BUSINESS.DELETE(id));
        return res.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to delete business."
        );
    }
});

// ------------------------------
// Slice Definition
// ------------------------------
const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        resetBusinessState: () => initialState,
        clearBusinessMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ------------------------------
            // FETCH LIST
            // ------------------------------
            .addCase(fetchBusinessList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessList.fulfilled, (state, action: PayloadAction<IBusinessListResponse>) => {
                state.loading = false;
                state.businesses = action.payload.businesses;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(fetchBusinessList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load businesses.";
            })

            // ------------------------------
            // FETCH BY ID
            // ------------------------------
            .addCase(fetchBusinessById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessById.fulfilled, (state, action: PayloadAction<IBusiness>) => {
                state.loading = false;
                state.currentBusiness = action.payload;
            })
            .addCase(fetchBusinessById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch business.";
            })

            // ------------------------------
            // CREATE
            // ------------------------------
            .addCase(createBusiness.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBusiness.fulfilled, (state, action: PayloadAction<IBusiness>) => {
                state.loading = false;
                state.successMessage = "Business created successfully.";
                state.businesses.unshift(action.payload);
            })
            .addCase(createBusiness.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create business.";
            })

            // ------------------------------
            // UPDATE
            // ------------------------------
            .addCase(updateBusiness.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBusiness.fulfilled, (state, action: PayloadAction<IBusiness>) => {
                state.loading = false;
                state.successMessage = "Business updated successfully.";
                state.currentBusiness = action.payload;
                state.businesses = state.businesses.map((b) =>
                    b.id === action.payload.id ? action.payload : b
                );
            })
            .addCase(updateBusiness.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update business.";
            })

            // ------------------------------
            // DELETE
            // ------------------------------
            .addCase(deleteBusiness.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBusiness.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "Business deleted successfully.";
            })
            .addCase(deleteBusiness.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete business.";
            });
    },
});

// ------------------------------
// Exports
// ------------------------------
export const {
    resetBusinessState,
    clearBusinessMessages,
} = businessSlice.actions;

export default businessSlice.reducer;
