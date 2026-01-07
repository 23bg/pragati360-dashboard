import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API } from "@/shared/constants";
import { Ticket } from "@/features/tickets/types/ticket.type";
import { AppError } from "@/shared/types/api";
import api, { handleApiCall } from "@/shared/lib/axios";

// ------------------------------
// State Interface
// ------------------------------
interface TicketState {
    tickets: Ticket[];
    currentTicket: Ticket | null;
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: TicketState = {
    tickets: [],
    currentTicket: null,
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// Thunk Argument Types
// ------------------------------
interface CreateTicketParams {
    payload: Partial<Ticket>;
}

// ------------------------------
// Async Thunks
// ------------------------------

export const createTicket = createAsyncThunk<
    Ticket,
    CreateTicketParams,
    { rejectValue: AppError }
>("ticket/create", async ({ payload }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.post<Ticket>(API.TICKETS.CREATE, payload));
        return data as Ticket;
    } catch (error) {
        return rejectWithValue(error as AppError);
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
            .addCase(createTicket.fulfilled, (state, action: PayloadAction<Ticket>) => {
                state.loading = false;
                state.tickets.unshift(action.payload);
                state.currentTicket = action.payload;
                state.successMessage = "Ticket created successfully.";
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to create ticket." };
            })

    },
});

// ------------------------------
// Exports
// ------------------------------
export const { resetTicketState, clearTicketMessages } = ticketSlice.actions;
export default ticketSlice.reducer;


