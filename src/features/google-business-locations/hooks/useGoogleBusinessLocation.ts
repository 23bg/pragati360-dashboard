import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchBusinessLocationList,
    fetchBusinessLocationById,
    updateBusinessLocation,
    deleteBusinessLocation,
    resetBusinessLocationState,
    clearBusinessLocationMessages,
} from "../slices/googleBusinessLocationsSlice";

export const useBusinessLocation = () => {
    const dispatch = useAppDispatch();

    const {
        locations,
        currentLocation,
        loading,
        error,
        successMessage,
        total,
        totalPages,
        currentPage,
        pageSize,
    } = useAppSelector((state) => state.businessLocations);

    // ------------------------------
    // Actions / Thunks
    // ------------------------------

    const getLocationList = (params?: any) =>
        dispatch(fetchBusinessLocationList(params));

    const getLocationById = (id: string) =>
        dispatch(fetchBusinessLocationById({ id }));

    const updateLocation = (id: string, data: any) =>
        dispatch(updateBusinessLocation({ id, data }));

    const removeLocation = (id: string) =>
        dispatch(deleteBusinessLocation({ id }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetBusinessLocationState());
    const clearMessages = () => dispatch(clearBusinessLocationMessages());

    // ------------------------------
    // Return Combined Interface
    // ------------------------------
    return {
        locations,
        currentLocation,
        loading,
        error,
        successMessage,
        total,
        totalPages,
        currentPage,
        pageSize,

        getLocationList,
        getLocationById,
        updateLocation,
        removeLocation,

        resetState,
        clearMessages,
    };
};
