import api from "@/lib/axios";
import { normalizeApiError } from "@/utils/api-error-normalizer";

// API service for authentication
export const authService = {
  // Signup endpoint
  signup: async (email: string, pass: string) => {
    try {
      const res = await api.post("/members", {
        email: email,
        password: pass,
      });
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },

  // Login endpoint
  login: async (email: string, pass: string) => {
    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: pass,
      });
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },

  // Logout endpoint
  logout: async () => {
    try {
      const res = await api.post("/auth/logout");
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },
};
