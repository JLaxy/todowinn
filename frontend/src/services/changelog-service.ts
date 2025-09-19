import api from "@/lib/axios";
import { normalizeApiError } from "@/utils/api-error-normalizer";

export const changelogService = {
  getTaskHistory: async (task_id: number) => {
    try {
      const res = await api.get(`/tasks/history/${task_id}`);
      return res.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },
};
