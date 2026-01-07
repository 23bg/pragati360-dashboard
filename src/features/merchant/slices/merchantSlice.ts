import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "@/shared/lib/apiService";
import { API } from "@/shared/constants";
import { Merchant, IMerchantListResponse } from "../types/merchant.type";
import { AppError } from "@/shared/types/api";

// ------------------------------
// State Interface
// ------------------------------
interface MerchantState {
    merchants: Merchant[];
    currentMerchant: Merchant | null;
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
const initialState: MerchantState = {
    merchants: [],
    currentMerchant: null,
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
    data: Partial<Merchant>;
}

// ------------------------------
// Async Thunks
// ------------------------------

export const fetchMerchantList = createAsyncThunk<
    IMerchantListResponse,
    FetchListParams | undefined, // params can be undefined
    { rejectValue: AppError }
>("merchant/fetchList", async (params, { rejectWithValue }) => {
    try {
        return await apiGet<IMerchantListResponse>(API.BUSINESS.GET_ALL + (params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''));
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const fetchMerchantById = createAsyncThunk<
    Merchant,
    { id: string },
    { rejectValue: AppError }
>("merchant/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        return await apiGet<Merchant>(API.BUSINESS.GET(id));
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const createMerchant = createAsyncThunk<
    Merchant,
    Partial<Merchant>,
    { rejectValue: AppError }
>("merchant/create", async (payload, { rejectWithValue }) => {
    try {
        return await apiPost<Merchant>(API.BUSINESS.CREATE, payload);
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const updateMerchant = createAsyncThunk<
    Merchant,
    UpdateParams,
    { rejectValue: AppError }
>("merchant/update", async ({ id, data: payload }, { rejectWithValue }) => {
    try {
        return await apiPut<Merchant>(API.BUSINESS.UPDATE(id), payload);
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const deleteMerchant = createAsyncThunk<
    { message: string },
    { id: string },
    { rejectValue: AppError }
>("merchant/delete", async ({ id }, { rejectWithValue }) => {
    try {
        return await apiDelete<{ message: string }>(API.BUSINESS.DELETE(id));
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

// ------------------------------
// Slice Definition
// ------------------------------
const merchantSlice = createSlice({
    name: "merchant",
    initialState,
    reducers: {
        resetMerchantState: () => initialState,
        clearMerchantMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH LIST
            .addCase(fetchMerchantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMerchantList.fulfilled, (state, action: PayloadAction<IMerchantListResponse>) => {
                state.loading = false;
                state.merchants = action.payload.businesses;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(fetchMerchantList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // FETCH BY ID
            .addCase(fetchMerchantById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMerchantById.fulfilled, (state, action: PayloadAction<Merchant>) => {
                state.loading = false;
                state.currentMerchant = action.payload;
            })
            .addCase(fetchMerchantById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // CREATE
            .addCase(createMerchant.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMerchant.fulfilled, (state, action: PayloadAction<Merchant>) => {
                state.loading = false;
                state.successMessage = "Merchant created successfully.";
                state.merchants.unshift(action.payload);
            })
            .addCase(createMerchant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // UPDATE
            .addCase(updateMerchant.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMerchant.fulfilled, (state, action: PayloadAction<Merchant>) => {
                state.loading = false;
                state.successMessage = "Merchant updated successfully.";
                state.currentMerchant = action.payload;
                state.merchants = state.merchants.map((b) =>
                    b.id === action.payload.id ? action.payload : b
                );
            })
            .addCase(updateMerchant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // DELETE
            .addCase(deleteMerchant.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMerchant.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Merchant deleted successfully.";
                // Note: You might want to remove the deleted Merchant from the state here
            })
            .addCase(deleteMerchant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            });
    },
});

// ------------------------------
// Exports
// ------------------------------
export const {
    resetMerchantState,
    clearMerchantMessages,
} = merchantSlice.actions;

export default merchantSlice.reducer;
