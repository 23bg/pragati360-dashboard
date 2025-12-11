import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/shared/lib/axios";
import { API } from "@/shared/constants";
import { IGooglePost } from "../types/google-post.type";

// ------------------------------
// State Interface
// ------------------------------
interface GooglePostState {
    posts: IGooglePost[];
    selectedPost: IGooglePost | null;
    loading: boolean;
    error: string | null;
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
// Async Thunks
// ------------------------------

// ✅ Fetch posts by location
export const fetchPostsByLocation = createAsyncThunk<
    IGooglePost[],
    { locationId: string },
    { rejectValue: string }
>("googlePosts/fetchByLocation", async ({ locationId }, { rejectWithValue }) => {
    try {
        const res = await api.get(API.GOOGLE.POST.BY_LOCATION(locationId));
        return res.data.data as IGooglePost[];
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to fetch Google Posts.";
        return rejectWithValue(message);
    }
});

// ✅ Create new Google Post
export const createGooglePost = createAsyncThunk<
    IGooglePost,
    { payload: Partial<IGooglePost> },
    { rejectValue: string }
>("googlePosts/create", async ({ payload }, { rejectWithValue }) => {
    try {
        const res = await api.post(API.GOOGLE.POST.CREATE, payload);
        return res.data.data as IGooglePost;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to create Google Post.";
        return rejectWithValue(message);
    }
});

// ✅ Update Google Post
export const updateGooglePost = createAsyncThunk<
    IGooglePost,
    { id: string; payload: Partial<IGooglePost> },
    { rejectValue: string }
>("googlePosts/update", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const res = await api.put(API.GOOGLE.POST.UPDATE(id), payload);
        return res.data.data as IGooglePost;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to update Google Post.";
        return rejectWithValue(message);
    }
});

// ❌ Optional: Delete Google Post
export const deleteGooglePost = createAsyncThunk<
    string,
    { id: string },
    { rejectValue: string }
>("googlePosts/delete", async ({ id }, { rejectWithValue }) => {
    try {
        await api.delete(API.GOOGLE.POST.DELETE(id));
        return id;
    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Failed to delete Google Post.";
        return rejectWithValue(message);
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
            // ------------------------------
            // FETCH POSTS
            // ------------------------------
            .addCase(fetchPostsByLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPostsByLocation.fulfilled,
                (state, action: PayloadAction<IGooglePost[]>) => {
                    state.loading = false;
                    state.posts = action.payload;
                }
            )
            .addCase(
                fetchPostsByLocation.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to fetch posts for this location.";
                }
            )

            // ------------------------------
            // CREATE POST
            // ------------------------------
            .addCase(createGooglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createGooglePost.fulfilled,
                (state, action: PayloadAction<IGooglePost>) => {
                    state.loading = false;
                    state.posts.push(action.payload);
                    state.successMessage = "Post created successfully.";
                }
            )
            .addCase(
                createGooglePost.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to create post.";
                }
            )

            // ------------------------------
            // UPDATE POST
            // ------------------------------
            .addCase(updateGooglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateGooglePost.fulfilled,
                (state, action: PayloadAction<IGooglePost>) => {
                    state.loading = false;
                    const index = state.posts.findIndex(
                        (p) => p.id === action.payload.id
                    );
                    if (index !== -1) state.posts[index] = action.payload;
                    state.successMessage = "Post updated successfully.";
                }
            )
            .addCase(
                updateGooglePost.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to update post.";
                }
            )

            // ------------------------------
            // DELETE POST
            // ------------------------------
            .addCase(deleteGooglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteGooglePost.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.posts = state.posts.filter((p) => p.id !== action.payload);
                    state.successMessage = "Post deleted successfully.";
                }
            )
            .addCase(
                deleteGooglePost.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to delete post.";
                }
            );
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
