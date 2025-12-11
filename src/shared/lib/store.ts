import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/features/auth/slices/authSlice"
import userReducer from "@/features/user/slices/userSlice"
import ticketReducer from "@/features/tickets/slices/ticketSlice"
import googleBusinessReducer from '@/features/google-business-locations/slices/googleBusinessLocationsSlice'
import googlePostReducer from '@/features/google-posts/slices/postSlice'
import googleReviewReducer from '@/features/google-reviews/slices/googleReviewSlice'
import subscriptionReducer from '@/features/subscriptions/slices/userSubsciption'
import templateReducer from '@/features/templates/slices/userSlice'
import instagramReducer from '@/features/instagram/slices/instagramSlice'
import businessReducer from '@/features/business/slices/businessSlice'

export const store = configureStore({
  reducer: {
    // Auth Reducer
    auth: authReducer,

    // User Reducer
    users: userReducer,

    // Ticket Reducer
    tickets: ticketReducer,

    // Google Business Reducer
    googleBusiness: googleBusinessReducer,

    // Google Post Reducer
    googlePosts: googlePostReducer,

    // Google Review Reducer
    googleReviews: googleReviewReducer,

    // Subscription Reducer
    subscriptions: subscriptionReducer,

    // Templates Reducer
    templates: templateReducer,

    // Templates Reducer
    instagram: instagramReducer,

    // Templates Reducer
    business: businessReducer,

    businessLocations: googleBusinessReducer
  },
})

// ✅ Typed versions for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;