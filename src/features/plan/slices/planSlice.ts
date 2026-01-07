import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppError } from "@/shared/types/api";
import { Plan } from "../types/plan.type"; // Import Plan from its dedicated types file

// ------------------------------
// TYPES
// ------------------------------

interface PlanState {
    currentPlan: Plan | null;
    availablePlans: Plan[];
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// INITIAL STATE
// ------------------------------

const initialState: PlanState = {
    currentPlan: null,
    availablePlans: [],
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// SLICE
// ------------------------------

const planSlice = createSlice({
    name: "plan",
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

export const { setLoading, setError, clearMessages } = planSlice.actions;

export default planSlice.reducer;
