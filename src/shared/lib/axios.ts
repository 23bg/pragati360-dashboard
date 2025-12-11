
// src/lib/axios.ts
import axios from "axios";
import { API } from "../constants";
import ROUTES from "../constants/route";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1', // ✅ empty base URL — relative to the current domain
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000
});

// // 🔥 Used to avoid multiple refresh calls
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });

//   failedQueue = [];
// };

// // ------------------------------
// // 📌 RESPONSE INTERCEPTOR
// // ------------------------------
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If unauthorized (401) and token is expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         // Already refreshing → queue requests
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => api(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         console.log("🔄 Refreshing access token...");

//         // Backend must send a new cookie
//         await api.post(API.AUTH.REFRESH_TOKEN, {}, { withCredentials: true });

//         isRefreshing = false;
//         processQueue(null, null);

//         // 🔁 replay the failed request
//         return api(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         processQueue(refreshError, null);

//         console.error("❌ Refresh token failed", refreshError);

//         // Logout user (optional)
//         if (typeof window !== "undefined") {
//           window.location.href = ROUTES.AUTH.LOG_IN;
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;


