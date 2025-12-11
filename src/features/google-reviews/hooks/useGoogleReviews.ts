import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchReviewsByLocation,
    replyToGoogleReview,
    updateReviewReply,
    resetGoogleReviewState,
    clearGoogleReviewMessages,
    setSelectedReview,
} from "../slices/googleReviewSlice";

import { IGoogleReview } from "../types/google-review.type";

export const useGoogleReviews = () => {
    const dispatch = useAppDispatch();

    const {
        reviews,
        selectedReview,
        loading,
        error,
        successMessage,
    } = useAppSelector((state) => state.googleReviews);

    // ------------------------------
    // Async Thunk Actions
    // ------------------------------

    const getReviewsByLocation = (locationId: string) =>
        dispatch(fetchReviewsByLocation({ locationId }));

    const replyReview = (reviewId: string, replyText: string, replyUserId?: string) =>
        dispatch(
            replyToGoogleReview({
                reviewId,
                payload: { replyText, replyUserId },
            })
        );

    const updateReply = (reviewId: string, replyText: string) =>
        dispatch(
            updateReviewReply({
                reviewId,
                payload: { replyText },
            })
        );

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetGoogleReviewState());
    const clearMessages = () => dispatch(clearGoogleReviewMessages());
    const selectReview = (review: IGoogleReview | null) =>
        dispatch(setSelectedReview(review));

    // ------------------------------
    // Combined Return API
    // ------------------------------
    return {
        // State
        reviews,
        selectedReview,
        loading,
        error,
        successMessage,

        // Thunks
        getReviewsByLocation,
        replyReview,
        updateReply,

        // Local reducers
        resetState,
        clearMessages,
        selectReview,
    };
};
