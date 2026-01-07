import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api, { handleApiCall } from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { IGoogleReview } from "@/features/google-reviews/types/google-review.type";
import { AppError } from "@/shared/types/api";

// ------------------------------
// State Interface
// ------------------------------
interface GoogleReviewState {
    reviews: IGoogleReview[];
    selectedReview: IGoogleReview | null;
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: GoogleReviewState = {
    reviews: [],
    selectedReview: null,
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// Thunk Argument Types
// ------------------------------
interface ReplyParams {
    reviewId: string;
    payload: { replyText: string; replyUserId?: string };
}

interface UpdateReplyParams {
    reviewId: string;
    payload: { replyText: string };
}


// ------------------------------
// Async Thunks
// ------------------------------

export const fetchReviewById = createAsyncThunk<
    IGoogleReview,
    { id: string },
    { rejectValue: AppError }
>("googleReviews/fetchById", async ({ id }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.get<IGoogleReview>(API.GOOGLE_BUSINESS.REVIEW.GET(id)));
        return data as IGoogleReview;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const fetchReviewsByLocation = createAsyncThunk<
    IGoogleReview[],
    { locationId: string },
    { rejectValue: AppError }
>("googleReviews/fetchByLocation", async ({ locationId }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.get<IGoogleReview[]>(API.GOOGLE_BUSINESS.REVIEW.BY_LOCATION(locationId)));
        return data as IGoogleReview[];
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const replyToGoogleReview = createAsyncThunk<
    IGoogleReview,
    ReplyParams,
    { rejectValue: AppError }
>("googleReviews/reply", async ({ reviewId, payload }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.post<IGoogleReview>(API.GOOGLE_BUSINESS.REVIEW.REPLY(reviewId), payload));
        return data as IGoogleReview;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const updateReviewReply = createAsyncThunk<
    IGoogleReview,
    UpdateReplyParams,
    { rejectValue: AppError }
>("googleReviews/updateReply", async ({ reviewId, payload }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.put<IGoogleReview>(API.GOOGLE_BUSINESS.REVIEW.UPDATE_REPLY(reviewId), payload));
        return data as IGoogleReview;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

// ------------------------------
// Slice Definition
// ------------------------------
const googleReviewSlice = createSlice({
    name: "googleReviews",
    initialState,
    reducers: {
        resetGoogleReviewState: () => initialState,
        clearGoogleReviewMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setSelectedReview: (state, action: PayloadAction<IGoogleReview | null>) => {
            state.selectedReview = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // FETCH REVIEW BY ID
            .addCase(fetchReviewById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedReview = null; // Clear previous selected review
            })
            .addCase(fetchReviewById.fulfilled, (state, action: PayloadAction<IGoogleReview>) => {
                state.loading = false;
                state.selectedReview = action.payload;
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to fetch review." };
            })

            // FETCH REVIEWS
            .addCase(fetchReviewsByLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewsByLocation.fulfilled, (state, action: PayloadAction<IGoogleReview[]>) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviewsByLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to fetch reviews for this location." };
            })

            // CREATE REPLY
            .addCase(replyToGoogleReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(replyToGoogleReview.fulfilled, (state, action: PayloadAction<IGoogleReview>) => {
                state.loading = false;
                const index = state.reviews.findIndex((r) => r.id === action.payload.id);
                if (index !== -1) state.reviews[index] = action.payload;
                state.successMessage = "Reply posted successfully.";
            })
            .addCase(replyToGoogleReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to reply to review." };
            })

            // UPDATE REPLY
            .addCase(updateReviewReply.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReviewReply.fulfilled, (state, action: PayloadAction<IGoogleReview>) => {
                state.loading = false;
                const index = state.reviews.findIndex((r) => r.id === action.payload.id);
                if (index !== -1) state.reviews[index] = action.payload;
                state.successMessage = "Reply updated successfully.";
            })
            .addCase(updateReviewReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to update reply." };
            });
    },
});

// ------------------------------
// Exports
// ------------------------------
export const {
    resetGoogleReviewState,
    clearGoogleReviewMessages,
    setSelectedReview,
} = googleReviewSlice.actions;

export default googleReviewSlice.reducer;
