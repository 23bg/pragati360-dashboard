import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppError } from "@/shared/types/api";
import { Alert } from "../types/alert.type";

// ------------------------------
// TYPES
// ------------------------------

interface AlertState {
    alerts: Alert[];
    unreadCount: number;
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// INITIAL STATE
// ------------------------------

const initialState: AlertState = {
    alerts: [],
    unreadCount: 0,
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// SLICE
// ------------------------------

const alertSlice = createSlice({
    name: "alert",
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

export const { setLoading, setError, clearMessages } = alertSlice.actions;

export default alertSlice.reducer;