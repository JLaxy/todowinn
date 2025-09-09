import api from "@/lib/axios";
import { normalizeApiError } from "@/utils/api-error-normalizer";

// Object with functions
export const authService = {
  // Signup function
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

  // Login function
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

  logout: async () => {
    try {
      const res = await api.post("/auth/logout");
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },
};
