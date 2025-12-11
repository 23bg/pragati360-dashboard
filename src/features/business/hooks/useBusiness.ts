import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchBusinessList,
    fetchBusinessById,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    resetBusinessState,
    clearBusinessMessages,
} from "../slices/businessSlice";

export const useBusiness = () => {
    const dispatch = useAppDispatch();

    const {
        businesses,
        currentBusiness,
        loading,
        error,
        successMessage,
        total,
        totalPages,
        currentPage,
        pageSize,
    } = useAppSelector((state) => state.business);

    // ------------------------------
    // Actions / Thunks
    // ------------------------------

    const getBusinessList = (params?: any) =>
        dispatch(fetchBusinessList(params));

    const getBusinessById = (id: string) =>
        dispatch(fetchBusinessById({ id }));

    const createNewBusiness = (data: any) =>
        dispatch(createBusiness(data));

    const updateExistingBusiness = (id: string, data: any) =>
        dispatch(updateBusiness({ id, data }));

    const removeBusiness = (id: string) =>
        dispatch(deleteBusiness({ id }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetBusinessState());
    const clearMessages = () => dispatch(clearBusinessMessages());

    // ------------------------------
    // Return Combined Interface
    // ------------------------------
    return {
        businesses,
        currentBusiness,
        loading,
        error,
        successMessage,
        total,
        totalPages,
        currentPage,
        pageSize,

        getBusinessList,
        getBusinessById,
        createNewBusiness,
        updateExistingBusiness,
        removeBusiness,

        resetState,
        clearMessages,
    };
};
