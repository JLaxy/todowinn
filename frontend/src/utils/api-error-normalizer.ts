import axios, { AxiosError } from "axios";
import { ApiError } from "@/types/api-error";

// Normalize error to make it more readable at frontend
export const normalizeApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message: string; statusCode: number }>;
    return {
      statusCode: err.response?.status || 500,
      message: err.response?.data?.message || "Unexpected server error",
    };
  }

  return { statusCode: 500, message: "Unknown error occurred" };
};
