import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchSubscriptionsByUser,
    fetchSubscriptionById,
    createSubscription,
    resetSubscriptionState,
    clearSubscriptionMessages,
    setCurrentSubscription,
} from "@/features/subscriptions/slices/userSubsciption"; // <-- Your slice path
import { ISubsciption } from "../types/subsciption.type";


const useSubsciptions = () => {
    const dispatch = useAppDispatch();

    const {
        subscriptions,
        currentSubscription,
        loading,
        error,
        successMessage,
    } = useAppSelector((state) => state.subscriptions); // <-- must match reducer key

    // ------------------------------
    // Thunk Actions
    // ------------------------------

    const getSubscriptionsByUser = (userId: string) =>
        dispatch(fetchSubscriptionsByUser({ userId }));

    const getSubscriptionById = (id: string) =>
        dispatch(fetchSubscriptionById({ id }));

    const createNewSubscription = (payload: Partial<ISubsciption>) =>
        dispatch(createSubscription({ payload }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetSubscriptionState());

    const clearMessages = () => dispatch(clearSubscriptionMessages());

    const selectSubscription = (subscription: ISubsciption | null) =>
        dispatch(setCurrentSubscription(subscription));

    // ------------------------------
    // Return Combined Hook API
    // ------------------------------

    return {
        subscriptions,
        currentSubscription,
        loading,
        error,
        successMessage,

        // CRUD
        getSubscriptionsByUser,
        getSubscriptionById,
        createNewSubscription,

        // Helpers
        resetState,
        clearMessages,
        selectSubscription,
    };
};


export default useSubsciptions;