import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/features/auth/slices/authSlice"
import userReducer from "@/features/user/slices/userSlice"
import ticketReducer from "@/features/tickets/slices/ticketSlice"
import googleBusinessReducer from '@/features/google-business-locations/slices/googleBusinessLocationsSlice'
import googlePostReducer from '@/features/google-posts/slices/postSlice'
import googleReviewReducer from '@/features/google-reviews/slices/googleReviewSlice'
import subscriptionReducer from '@/features/subscriptions/slices/userSubsciption'
import instagramReducer from '@/features/instagram/slices/instagramSlice'
import merchantReducer from '@/features/merchant/slices/merchantSlice'
import planReducer from '@/features/plan/slices/planSlice'
import usageReducer from '@/features/usage/slices/usageSlice'
import alertReducer from '@/features/alerts/slices/alertSlice'
import systemHealthReducer from "@/features/system-health/slices/systemHealthSlice"

// Import the dashboard API
import { dashboardApi } from "@/features/dashboard/services/dashboardApi"
// Import the alerts API
import { alertsApi } from "@/features/alerts/services/alertsApi"
// Import the activity logs API
import { activityLogsApi } from "@/features/activity-logs/services/activityLogsApi"
// Import the user API
import { userApi } from "@/features/user/services/userApi"

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
    instagram: instagramReducer,

    // Templates Reducer
    merchant: merchantReducer,

    // New Reducers
    plan: planReducer,
    usage: usageReducer,
    alerts: alertReducer,
    systemHealth: systemHealthReducer,

    businessLocations: googleBusinessReducer,

    // Add the dashboard API reducer
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    // Add the alerts API reducer
    [alertsApi.reducerPath]: alertsApi.reducer,
    // Add the activity logs API reducer
    [activityLogsApi.reducerPath]: activityLogsApi.reducer,
    // Add the user API reducer
    [userApi.reducerPath]: userApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dashboardApi.middleware)
      .concat(alertsApi.middleware)
      .concat(activityLogsApi.middleware)
      .concat(userApi.middleware), // Add user API middleware
})

// ✅ Typed versions for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;