/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchInstagramList,
    fetchInstagramById,
    fetchByBusinessId,
    createInstagram,
    updateInstagram,
    deleteInstagram,
    resetInstagramState,
    clearInstagramMessages,
} from "../slices/instagramSlice";

export const useInstagram = () => {
    const dispatch = useAppDispatch();

    const {
        profiles,
        currentProfile,
        loading,
        error,
        successMessage,
    } = useAppSelector((state) => state.instagram);

    // ------------------------------
    // Actions / Thunks
    // ------------------------------

    const getInstagramList = (params?: {
        username?: string;
        businessId?: string;
        search?: string;
        sort?: string;
        page?: number;
        limit?: number;
    }) => dispatch(fetchInstagramList(params || {}));

    const getInstagramById = (id: string) =>
        dispatch(fetchInstagramById({ id }));

    const getByBusinessId = (businessId: string) =>
        dispatch(fetchByBusinessId({ businessId }));

    const createInstagramProfile = (payload: any) =>
        dispatch(createInstagram({ payload }));

    const updateInstagramProfile = (id: string, payload: any) =>
        dispatch(updateInstagram({ id, payload }));

    const removeInstagramProfile = (id: string) =>
        dispatch(deleteInstagram({ id }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetInstagramState());
    const clearMessages = () => dispatch(clearInstagramMessages());

    // ------------------------------
    // Return Combined Interface
    // ------------------------------
    return {
        profiles,
        currentProfile,
        loading,
        error,
        successMessage,

        getInstagramList,
        getInstagramById,
        getByBusinessId,
        createInstagramProfile,
        updateInstagramProfile,
        removeInstagramProfile,

        resetState,
        clearMessages,
    };
};
