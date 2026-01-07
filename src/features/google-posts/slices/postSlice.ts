import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api, { handleApiCall } from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { IGooglePost } from "../types/google-post.type";
import { AppError } from "@/shared/types/api";

// ------------------------------
// State Interface
// ------------------------------
interface GooglePostState {
    posts: IGooglePost[];
    selectedPost: IGooglePost | null;
    loading: boolean;
    error: AppError | null;
    successMessage: string | null;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: GooglePostState = {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
    successMessage: null,
};

// ------------------------------
// Thunk Argument Types
// ------------------------------
interface UpdatePostParams {
    id: string;
    payload: Partial<IGooglePost>;
}

// ------------------------------
// Async Thunks
// ------------------------------

export const fetchPostsByLocation = createAsyncThunk<
    IGooglePost[],
    { locationId: string },
    { rejectValue: AppError }
>("googlePosts/fetchByLocation", async ({ locationId }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.get<IGooglePost[]>(API.GOOGLE_BUSINESS.POST.BY_LOCATION(locationId)));
        return data as IGooglePost[];
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const createGooglePost = createAsyncThunk<
    IGooglePost,
    { payload: Partial<IGooglePost> },
    { rejectValue: AppError }
>("googlePosts/create", async ({ payload }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.post<IGooglePost>(API.GOOGLE_BUSINESS.POST.CREATE, payload));
        return data as IGooglePost;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const updateGooglePost = createAsyncThunk<
    IGooglePost,
    UpdatePostParams,
    { rejectValue: AppError }
>("googlePosts/update", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const data = await handleApiCall(api.put<IGooglePost>(API.GOOGLE_BUSINESS.POST.UPDATE(id), payload));
        return data as IGooglePost;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

export const deleteGooglePost = createAsyncThunk<
    string, // Returns the ID of the deleted post on success
    { id: string },
    { rejectValue: AppError }
>("googlePosts/delete", async ({ id }, { rejectWithValue }) => {
    try {
        await handleApiCall(api.delete(API.GOOGLE_BUSINESS.POST.DELETE(id)));
        return id;
    } catch (error) {
        return rejectWithValue(error as AppError);
    }
});

// ------------------------------
// Slice Definition
// ------------------------------
const googlePostSlice = createSlice({
    name: "googlePosts",
    initialState,
    reducers: {
        resetGooglePostState: () => initialState,
        clearGooglePostMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setSelectedPost: (state, action: PayloadAction<IGooglePost | null>) => {
            state.selectedPost = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH POSTS
            .addCase(fetchPostsByLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostsByLocation.fulfilled, (state, action: PayloadAction<IGooglePost[]>) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPostsByLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to fetch posts for this location." };
            })

            // CREATE POST
            .addCase(createGooglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGooglePost.fulfilled, (state, action: PayloadAction<IGooglePost>) => {
                state.loading = false;
                state.posts.push(action.payload);
                state.successMessage = "Post created successfully.";
            })
            .addCase(createGooglePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to create post." };
            })

            // UPDATE POST
            .addCase(updateGooglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGooglePost.fulfilled, (state, action: PayloadAction<IGooglePost>) => {
                state.loading = false;
                const index = state.posts.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) state.posts[index] = action.payload;
                state.successMessage = "Post updated successfully.";
            })
            .addCase(updateGooglePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to update post." };
            })

            // DELETE POST
            .addCase(deleteGooglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGooglePost.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.posts = state.posts.filter((p) => p.id !== action.payload);
                state.successMessage = "Post deleted successfully.";
            })
            .addCase(deleteGooglePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Failed to delete post." };
            });
    },
});

// ------------------------------
// Exports
// ------------------------------
export const {
    resetGooglePostState,
    clearGooglePostMessages,
    setSelectedPost,
} = googlePostSlice.actions;

export default googlePostSlice.reducer;
