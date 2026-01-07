import axios from "axios";
import api from "./axios";
import { AppError, ApiResponse } from "../types/api";

async function apiService<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  payload: unknown = null
): Promise<T> {
  try {
    const response = await api[method]<ApiResponse<T>>(url, ...[payload].filter(Boolean));
    const apiResponse = response.data;

    if (apiResponse.success && apiResponse.data !== null && apiResponse.data !== undefined) {
      return apiResponse.data;
    }

    throw apiResponse.error || { message: `API error: ${method.toUpperCase()} to ${url} failed.` };
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const backendError = error.response?.data?.error;
        if (backendError) {
            throw backendError as AppError;
        }
        throw {
            message: error.message || "An unknown network error occurred.",
        } as AppError;
    }
    throw error; // Re-throw the AppError from the backend or other exceptions
  }
}

export const apiGet = <T>(url: string) => apiService<T>("get", url);
export const apiPost = <T>(url:string, data: unknown) => apiService<T>("post", url, data);
export const apiPut = <T>(url:string, data: unknown) => apiService<T>("put", url, data);
export const apiPatch = <T>(url:string, data: unknown) => apiService<T>("patch", url, data);
export const apiDelete = <T>(url:string) => apiService<T>("delete", url);

