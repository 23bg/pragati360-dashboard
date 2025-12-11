import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchPaymentsByUser,
    fetchPaymentById,
    createPayment,
    resetPaymentState,
    clearPaymentMessages,
    setCurrentPayment,
} from "@/features/subscriptions/slices/userSubsciption"; // <-- Your slice path
import { ISubsciption } from "../types/subsciption.type";


const useSubsciptions = () => {
    const dispatch = useAppDispatch();

    const {
        payments,
        currentPayment,
        loading,
        error,
        successMessage,
    } = useAppSelector((state) => state.subscriptions); // <-- must match reducer key

    // ------------------------------
    // Thunk Actions
    // ------------------------------

    const getPaymentsByUser = (userId: string) =>
        dispatch(fetchPaymentsByUser({ userId }));

    const getPaymentById = (id: string) =>
        dispatch(fetchPaymentById({ id }));

    const createNewPayment = (payload: Partial<ISubsciption>) =>
        dispatch(createPayment({ payload }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetPaymentState());

    const clearMessages = () => dispatch(clearPaymentMessages());

    const selectPayment = (payment: ISubsciption | null) =>
        dispatch(setCurrentPayment(payment));

    // ------------------------------
    // Return Combined Hook API
    // ------------------------------

    return {
        payments,
        currentPayment,
        loading,
        error,
        successMessage,

        // CRUD
        getPaymentsByUser,
        getPaymentById,
        createNewPayment,

        // Helpers
        resetState,
        clearMessages,
        selectPayment,
    };
};


export default useSubsciptions;