import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppError } from "@/shared/types/api";
import { SystemStatus } from "../types/systemHealth.type"; // Import SystemStatus from its dedicated types file

// ------------------------------
// TYPES
// ------------------------------

interface SystemHealthState {
    statuses: SystemStatus[];
    overallStatus: "operational" | "degraded" | "outage";
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// INITIAL STATE
// ------------------------------

const initialState: SystemHealthState = {
    statuses: [],
    overallStatus: "operational",
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// SLICE
// ------------------------------

const systemHealthSlice = createSlice({
    name: "systemHealth",
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

export const { setLoading, setError, clearMessages } = systemHealthSlice.actions;

export default systemHealthSlice.reducer;
