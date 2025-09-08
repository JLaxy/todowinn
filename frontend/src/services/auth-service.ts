import api from "@/lib/axios";
import { handleApiError } from "@/utils/api-error-handler";

// Object with functions
export const authService = {
  // Login function
  login: async (email: string, pass: string) => {
    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: pass,
      });
      return res;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Signup function
  signup: async (email: string, pass: string) => {
    try {
      const res = await api.post("/members", {
        email: email,
        password: pass,
      });
      return res;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
