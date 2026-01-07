import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchMerchantList,
    fetchMerchantById,
    createMerchant,
    updateMerchant,
    deleteMerchant,
    resetMerchantState,
    clearMerchantMessages,
} from "../slices/merchantSlice";
import { Merchant } from "../types/merchant.type"; // Assuming you will create this type

export const useMerchant = () => {
    const dispatch = useAppDispatch();

    const {
        merchants,
        currentMerchant,
        loading,
        error,
        successMessage,
        total,
        totalPages,
        currentPage,
        pageSize,
    } = useAppSelector((state) => state.merchant);

    // ------------------------------
    // Actions / Thunks
    // ------------------------------

    const getMerchantList = (params?: Record<string, unknown>) =>
        dispatch(fetchMerchantList(params));

    const getMerchantById = (id: string) =>
        dispatch(fetchMerchantById({ id }));

    const createNewMerchant = (data: Partial<Merchant>) =>
        dispatch(createMerchant(data));

    const updateExistingMerchant = (id: string, data: Partial<Merchant>) =>
        dispatch(updateMerchant({ id, data }));

    const removeMerchant = (id: string) =>
        dispatch(deleteMerchant({ id }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetMerchantState());
    const clearMessages = () => dispatch(clearMerchantMessages());

    // ------------------------------
    // Return Combined Interface
    // ------------------------------
    return {
        merchants,
        currentMerchant,
        loading,
        error,
        successMessage,
        total,
        totalPages,
        currentPage,
        pageSize,

        getMerchantList,
        getMerchantById,
        createNewMerchant,
        updateExistingMerchant,
        removeMerchant,

        resetState,
        clearMessages,
    };
};
