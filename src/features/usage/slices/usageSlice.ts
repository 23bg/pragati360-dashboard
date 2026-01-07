import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppError } from "@/shared/types/api";
import { UsageMetric } from "../types/usage.type"; // Import UsageMetric from its dedicated types file

// ------------------------------
// TYPES
// ------------------------------

interface UsageState {
    metrics: UsageMetric[];
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// INITIAL STATE
// ------------------------------

const initialState: UsageState = {
    metrics: [],
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// SLICE
// ------------------------------

const usageSlice = createSlice({
    name: "usage",
    initialState,
    reducers: {
        // Placeholder for future actions
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<AppError | null>) => {
            state.error = action.payload;
        },
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        // Placeholder for future thunks
    },
});

// ------------------------------
// EXPORTS
// ------------------------------

export const { setLoading, setError, clearMessages } = usageSlice.actions;

export default usageSlice.reducer;
