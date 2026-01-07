import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api, { handleApiCall } from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { ISubsciption } from "../types/subsciption.type";
import { AppError } from "@/shared/types/api";

// ------------------------------
// State Interface
// ------------------------------
interface SubscriptionState {
    subscriptions: ISubsciption[];
    currentSubscription: ISubsciption | null;
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: SubscriptionState = {
    subscriptions: [],
    currentSubscription: null,
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// Thunk Argument Types
// ------------------------------
interface CreateSubscriptionParams {
    payload: Partial<ISubsciption>;
}

// ------------------------------
// Async Thunks
// ------------------------------

export const fetchSubscriptionsByUser = createAsyncThunk<
    ISubsciption[],
    { userId: string },
    { rejectValue: AppError }
>("subscriptions/fetchByUser", async ({ userId }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.get<ISubsciption[]>(API.SUBSCRIPTION.GET(userId)));
        return data as ISubsciption[];
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const fetchSubscriptionById = createAsyncThunk<
    ISubsciption,
    { id: string },
    { rejectValue: AppError }
>("subscriptions/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.get<ISubsciption>(API.SUBSCRIPTION.GET(id)));
        return data as ISubsciption;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const createSubscription = createAsyncThunk<
    ISubsciption,
    CreateSubscriptionParams,
    { rejectValue: AppError }
>("subscriptions/create", async ({ payload }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.post<ISubsciption>(API.SUBSCRIPTION.CREATE, payload));
        return data as ISubsciption;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});



// ------------------------------
// Slice
// ------------------------------
const subscriptionSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {
        resetSubscriptionState: () => initialState,
        clearSubscriptionMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setCurrentSubscription: (state, action: PayloadAction<ISubsciption | null>) => {
            state.currentSubscription = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // FETCH BY USER
            .addCase(fetchSubscriptionsByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubscriptionsByUser.fulfilled, (state, action: PayloadAction<ISubsciption[]>) => {
                state.loading = false;
                state.subscriptions = action.payload;
            })
            .addCase(fetchSubscriptionsByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to fetch subscriptions." };
            })

            // FETCH BY ID
            .addCase(fetchSubscriptionById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubscriptionById.fulfilled, (state, action: PayloadAction<ISubsciption>) => {
                state.loading = false;
                state.currentSubscription = action.payload;
            })
            .addCase(fetchSubscriptionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to load subscription." };
            })

            // CREATE
            .addCase(createSubscription.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSubscription.fulfilled, (state, action: PayloadAction<ISubsciption>) => {
                state.loading = false;
                state.subscriptions.push(action.payload);
                state.successMessage = "Subscription created successfully.";
            })
            .addCase(createSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to create subscription." };
            })
    },
});

// ------------------------------
// Exports
// ------------------------------
export const {
    resetSubscriptionState,
    clearSubscriptionMessages,
    setCurrentSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
