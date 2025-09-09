import api from "@/lib/axios";
import { normalizeApiError } from "@/utils/api-error-normalizer";

export const apiTestService = {
  protectedTest: async () => {
    try {
      const res = await api.get("/protected-test");
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },

  publicTest: async () => {
    try {
      const res = await api.get("/public-test");
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },
};
