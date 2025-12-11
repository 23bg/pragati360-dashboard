import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    createTicket,
    resetTicketState,
    clearTicketMessages,
} from "../slices/ticketSlice";
import { Ticket } from "../types/ticket.type";

export const useTicket = () => {
    const dispatch = useAppDispatch();

    const {
        currentTicket,
        loading,
        error,
        successMessage,
    } = useAppSelector((state) => state.ticket);

    // ------------------------------
    // Actions / Thunks
    // ------------------------------
    const createNewTicket = (payload: Partial<Ticket>) =>
        dispatch(createTicket({ payload }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------
    const resetState = () => dispatch(resetTicketState());
    const clearMessages = () => dispatch(clearTicketMessages());

    // ------------------------------
    // Return Combined Interface
    // ------------------------------
    return {
        currentTicket,
        loading,
        error,
        successMessage,
        createNewTicket,
        resetState,
        clearMessages,
    };
};
