import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { Ticket } from "@/features/tickets/types/ticket.type";

// ------------------------------
// State Interface
// ------------------------------
interface TicketState {
    currentTicket: Ticket | null;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: TicketState = {
    currentTicket: null,
    loading: false,
    error: null,
    successMessage: null,
};




// ✅ Create new ticket
export const createTicket = createAsyncThunk<
    Ticket,
    { payload: Partial<Ticket> },
    { rejectValue: string }
>("ticket/create", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await api.post(API.TICKETS.CREATE, payload);
        return response.data.data as Ticket;
    } catch (error: any) {
        console.error("Create ticket error:", error);
        const message =
            error?.response?.data?.message || "Failed to create ticket.";
        return rejectWithValue(message);
    }
});

// ------------------------------
// Slice Definition
// ------------------------------
const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        resetTicketState: () => initialState,
        clearTicketMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets.unshift(action.payload);
                state.successMessage = "Ticket created successfully.";
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create ticket.";
            })

    },
});

// ------------------------------
// Exports
// ------------------------------
export const { resetTicketState, clearTicketMessages } = ticketSlice.actions;
export default ticketSlice.reducer;
