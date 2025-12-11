import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { IGoogleReview } from "@/features/google-reviews/types/google-review.type";

// ------------------------------
// State Interface
// ------------------------------
interface GoogleReviewState {
    reviews: IGoogleReview[];
    selectedReview: IGoogleReview | null;
    loading: boolean;
    error: string | null;
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
// Async Thunks
// ------------------------------

// ✅ Fetch Reviews by Location
export const fetchReviewsByLocation = createAsyncThunk<
    IGoogleReview[],
    { locationId: string },
    { rejectValue: string }
>("googleReviews/fetchByLocation", async ({ locationId }, { rejectWithValue }) => {
    try {
        const res = await api.get(API.GOOGLE.REVIEW.BY_LOCATION(locationId));
        return res.data.data as IGoogleReview[];
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to fetch Google Reviews.";
        return rejectWithValue(message);
    }
});

// ✅ Reply to Google Review
export const replyToGoogleReview = createAsyncThunk<
    IGoogleReview,
    { reviewId: string; payload: { replyText: string; replyUserId?: string } },
    { rejectValue: string }
>("googleReviews/reply", async ({ reviewId, payload }, { rejectWithValue }) => {
    try {
        const res = await api.post(API.GOOGLE.REVIEW.REPLY(reviewId), payload);
        return res.data.data as IGoogleReview;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to reply to review.";
        return rejectWithValue(message);
    }
});

// ❗ Optional: Update existing reply
export const updateReviewReply = createAsyncThunk<
    IGoogleReview,
    { reviewId: string; payload: { replyText: string } },
    { rejectValue: string }
>("googleReviews/updateReply", async ({ reviewId, payload }, { rejectWithValue }) => {
    try {
        const res = await api.put(API.GOOGLE.REVIEW.UPDATE_REPLY(reviewId), payload);
        return res.data.data as IGoogleReview;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to update review reply.";
        return rejectWithValue(message);
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
            // ------------------------------
            // FETCH REVIEWS
            // ------------------------------
            .addCase(fetchReviewsByLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchReviewsByLocation.fulfilled,
                (state, action: PayloadAction<IGoogleReview[]>) => {
                    state.loading = false;
                    state.reviews = action.payload;
                }
            )
            .addCase(
                fetchReviewsByLocation.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to fetch reviews for this location.";
                }
            )

            // ------------------------------
            // CREATE REPLY
            // ------------------------------
            .addCase(replyToGoogleReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                replyToGoogleReview.fulfilled,
                (state, action: PayloadAction<IGoogleReview>) => {
                    state.loading = false;
                    const index = state.reviews.findIndex(
                        (r) => r.id === action.payload.id
                    );
                    if (index !== -1) state.reviews[index] = action.payload;
                    state.successMessage = "Reply posted successfully.";
                }
            )
            .addCase(
                replyToGoogleReview.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to reply to review.";
                }
            )

            // ------------------------------
            // UPDATE REPLY
            // ------------------------------
            .addCase(updateReviewReply.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateReviewReply.fulfilled,
                (state, action: PayloadAction<IGoogleReview>) => {
                    state.loading = false;
                    const index = state.reviews.findIndex(
                        (r) => r.id === action.payload.id
                    );
                    if (index !== -1) state.reviews[index] = action.payload;
                    state.successMessage = "Reply updated successfully.";
                }
            )
            .addCase(
                updateReviewReply.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to update reply.";
                }
            );
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
