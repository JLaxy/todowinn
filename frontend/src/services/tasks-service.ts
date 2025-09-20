import api from "@/lib/axios";
import { Task } from "@/types/task";
import { normalizeApiError } from "@/utils/api-error-normalizer";

export const taskService = {
  // Get all tasks of a project
  getTasks: async (project_id: number) => {
    console.log(`fetching projects of project_id ${project_id}`);
    try {
      const res = await api.get(`/tasks/${project_id}`);
      return res.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },

  // Create tasks
  createTask: async (task: Task) => {
    try {
      const res = await api.post(`/tasks/`, {
        name: task.name,
        description: task.description,
        dateTarget: task?.date_target,
        remarks: task?.remarks,
        project_id: task.project_id,
      });
      console.log(`successfully created task: ${task.name}`);
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },

  updateTask: async (task: Task) => {
    try {
      const res = await api.patch(`/tasks/${task.task_id}`, {
        name: task.name,
        description: task.description,
        dateTarget: task?.date_target,
        remarks: task?.remarks,
        dateFinished: task?.date_finished,
        status: task?.status,
      });
      console.log(`successfully updated task: ${task.name}`);
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },
};
