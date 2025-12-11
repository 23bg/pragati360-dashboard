import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { ISubsciption } from "../types/subsciption.type";

// ------------------------------
// State Interface
// ------------------------------
interface PaymentState {
    payments: ISubsciption[];
    currentPayment: ISubsciption | null;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: PaymentState = {
    payments: [],
    currentPayment: null,
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// Async Thunks
// ------------------------------

// 🚀 Fetch Payments for a User
export const fetchPaymentsByUser = createAsyncThunk<
    ISubsciption[],
    { userId: string },
    { rejectValue: string }
>("payments/fetchByUser", async ({ userId }, { rejectWithValue }) => {
    try {
        const res = await api.get(API.SUBSCRIPTION.GET(userId));
        return res.data.data as ISubsciption[];
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to load payments."
        );
    }
});

// 🚀 Fetch Payment by ID
export const fetchPaymentById = createAsyncThunk<
    ISubsciption,
    { id: string },
    { rejectValue: string }
>("payments/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(API.SUBSCRIPTION.GET(id));
        return res.data.data as ISubsciption;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to load payment."
        );
    }
});

// 🚀 Create Payment (usually after Razorpay order create)
export const createPayment = createAsyncThunk<
    ISubsciption,
    { payload: Partial<ISubsciption> },
    { rejectValue: string }
>("payments/create", async ({ payload }, { rejectWithValue }) => {
    try {
        const res = await api.post(API.SUBSCRIPTION.CREATE, payload);
        return res.data.data as ISubsciption;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Failed to create payment."
        );
    }
});



// ------------------------------
// Slice
// ------------------------------
const subsciptionSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        resetPaymentState: () => initialState,
        clearPaymentMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setCurrentPayment: (state, action: PayloadAction<ISubsciption | null>) => {
            state.currentPayment = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // FETCH BY USER
            .addCase(fetchPaymentsByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchPaymentsByUser.fulfilled,
                (state, action: PayloadAction<ISubsciption[]>) => {
                    state.loading = false;
                    state.payments = action.payload;
                }
            )
            .addCase(
                fetchPaymentsByUser.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch payments.";
                }
            )

            // FETCH BY ID
            .addCase(fetchPaymentById.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchPaymentById.fulfilled,
                (state, action: PayloadAction<ISubsciption>) => {
                    state.loading = false;
                    state.currentPayment = action.payload;
                }
            )
            .addCase(
                fetchPaymentById.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to load payment.";
                }
            )

            // CREATE
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                createPayment.fulfilled,
                (state, action: PayloadAction<ISubsciption>) => {
                    state.loading = false;
                    state.payments.push(action.payload);
                    state.successMessage = "Payment created successfully.";
                }
            )
            .addCase(
                createPayment.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to create payment.";
                }
            )
    },
});

// ------------------------------
// Exports
// ------------------------------
export const {
    resetPaymentState,
    clearPaymentMessages,
    setCurrentPayment,
} = subsciptionSlice.actions;

export default subsciptionSlice.reducer;
