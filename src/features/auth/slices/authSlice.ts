import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { User } from "@/shared/types";
import { LoginPayload, SignupPayload, verificationPayload } from "@/features/auth/types/auth.type";

// ------------------------------
// TYPES
// ------------------------------

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    successMessage: string | null;
}

// ------------------------------
// INITIAL STATE
// ------------------------------

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    successMessage: null,
};

// ------------------------------
// ASYNC THUNKS
// ------------------------------

// LOGIN (returns user + tokens)
export const loginUser = createAsyncThunk<
    AuthResponse,
    LoginPayload,
    { rejectValue: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
    try {
        const response = await api.post(API.AUTH.LOG_IN, payload);
        return response.data as AuthResponse;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Login failed. Please try again.";
        return rejectWithValue(message);
    }
});

// SIGNUP (returns user + tokens)
export const signupUser = createAsyncThunk<
    AuthResponse,
    SignupPayload,
    { rejectValue: string }
>("auth/signupUser", async (payload, { rejectWithValue }) => {
    try {
        const response = await api.post(API.AUTH.SIGN_UP, payload);
        return response.data as AuthResponse;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Signup failed. Please try again.";
        return rejectWithValue(message);
    }
});

// VERIFY OTP (returns user + tokens)
export const verifyOtp = createAsyncThunk<
    AuthResponse,
    verificationPayload,
    { rejectValue: string }
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
    try {
        const response = await api.post(API.AUTH.VERIFY, payload);
        return response.data.data as AuthResponse;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Invalid or expired OTP.";
        return rejectWithValue(message);
    }
});

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    try {
        await api.post(API.AUTH.LOG_OUT);
        return true;
    } catch {
        return true; // always clear state on frontend
    }
});

// ------------------------------
// SLICE
// ------------------------------

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: () => initialState,

        setUserFromStorage: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // ------------------------------
            // LOGIN
            // ------------------------------
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.error = null;

                    // Save token (if storing client-side)
                    localStorage.setItem("accessToken", action.payload.accessToken);
                    localStorage.setItem("refreshToken", action.payload.refreshToken);
                }
            )
            .addCase(
                loginUser.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Login failed.";
                }
            )

            // ------------------------------
            // SIGNUP
            // ------------------------------
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                signupUser.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.successMessage = "Account created successfully.";

                    localStorage.setItem("accessToken", action.payload.accessToken);
                    localStorage.setItem("refreshToken", action.payload.refreshToken);
                }
            )
            .addCase(
                signupUser.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Signup failed.";
                }
            )

            // ------------------------------
            // VERIFY OTP
            // ------------------------------
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(
                verifyOtp.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.successMessage = "OTP verified successfully.";

                    localStorage.setItem("accessToken", action.payload.accessToken);
                    localStorage.setItem("refreshToken", action.payload.refreshToken);
                }
            )
            .addCase(
                verifyOtp.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Invalid OTP.";
                }
            )

            // ------------------------------
            // LOGOUT
            // ------------------------------
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
                state.successMessage = null;

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            });
    },
});

// ------------------------------
// EXPORTS
// ------------------------------

export const { resetAuthState, setUserFromStorage, clearMessages } =
    authSlice.actions;

export default authSlice.reducer;
