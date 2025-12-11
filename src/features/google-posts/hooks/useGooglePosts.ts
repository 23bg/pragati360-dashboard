import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
    fetchPostsByLocation,
    createGooglePost,
    updateGooglePost,
    deleteGooglePost,
    resetGooglePostState,
    clearGooglePostMessages,
    setSelectedPost,
} from "@/features/google-posts/slices/postSlice";
import { IGooglePost } from "../types/google-post.type";

export const useGooglePosts = () => {
    const dispatch = useAppDispatch();

    const {
        posts,
        selectedPost,
        loading,
        error,
        successMessage,
    } = useAppSelector((state) => state.googlePosts);

    // ------------------------------
    // Thunk Actions
    // ------------------------------

    const getPostsByLocation = (locationId: string) =>
        dispatch(fetchPostsByLocation({ locationId }));

    const createPost = (payload: Partial<IGooglePost>) =>
        dispatch(createGooglePost({ payload }));

    const updatePost = (id: string, payload: Partial<IGooglePost>) =>
        dispatch(updateGooglePost({ id, payload }));

    const removePost = (id: string) => dispatch(deleteGooglePost({ id }));

    // ------------------------------
    // Local Reducer Actions
    // ------------------------------

    const resetState = () => dispatch(resetGooglePostState());
    const clearMessages = () => dispatch(clearGooglePostMessages());
    const selectPost = (post: IGooglePost | null) =>
        dispatch(setSelectedPost(post));

    // ------------------------------
    // Return Combined Hook API
    // ------------------------------

    return {
        posts,
        selectedPost,
        loading,
        error,
        successMessage,

        // CRUD functions
        getPostsByLocation,
        createPost,
        updatePost,
        removePost,

        // reducer helpers
        resetState,
        clearMessages,
        selectPost,
    };
};
