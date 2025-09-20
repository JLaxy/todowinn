"use client";

import { FormEvent, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import toast, { Toaster } from "react-hot-toast";
import { Project } from "@/types/project";
import { projectsService } from "@/services/projects-service";
import "@/styles/pages/projects.css";
import Modal from "@/components/ui/modal";
import { ModalType } from "@/types/modal-type";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import ProjectDiv from "@/components/ui/project-div";
import TasksKanban from "@/components/ui/tasks-kanban";
import { taskService } from "@/services/tasks-service";
import { Task } from "@/types/task";

export default function ProjectsPage() {
  const {
    setIsLoading,
    setUserProjects,
    setIsModalOpen,
    setIsSidebarOpen,
    selectedProject,
    setSelectedProject,
    selectedTask,
    name,
    description,
    dateTarget,
    remarks,
    status,
    resetFields,
    modalType,
    setProjectTasks,
  } = useTodowinnContext();

  const fetchProjects = async () => {
    setIsLoading(true);

    try {
      // Send API rquest
      const res = await projectsService.getProjects();
      setUserProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to fetch projects! see console");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async (project_id: number) => {
    try {
      // Send API rquest
      const tasks = await taskService.getTasks(project_id);
      setProjectTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to fetch tasks! see console");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    switch (modalType) {
      case ModalType.ADD_PROJECT:
        handleAddProject();
        break;
      case ModalType.EDIT_PROJECT:
        handleEditProject();
        break;
      case ModalType.ADD_TASK:
        handleAddTask();
        break;
      case ModalType.EDIT_TASK:
        handleEditTask();
        break;
      default:
        break;
    }
  };

  const handleAddProject = async () => {
    try {
      // Add project
      const res = await projectsService.createProject({
        name,
        description,
        date_target: dateTarget
          ? new Date(dateTarget).toISOString()
          : undefined,
        remarks: remarks ? remarks : undefined,
      } as Project);

      toast.success("Successfully added project!");
      setSelectedProject(
        await projectsService.getProject(res.data["project_id"] as number)
      );
      setIsModalOpen(false);
      resetFields();
      await fetchTasks(res.data.project_id);
      await fetchProjects();
    } catch (error) {
      toast.error(`Failed to add project!`);
      console.log(`Failed to update project: ${error}`);
    }
  };

  const handleEditProject = async () => {
    try {
      if (selectedProject === undefined) return;

      // Update project
      await projectsService.updateProject({
        project_id: selectedProject.project_id,
        name,
        description,
        remarks: remarks ? remarks : undefined,
        status,
        date_target: dateTarget
          ? new Date(dateTarget).toISOString()
          : undefined,
      } as Project);

      setIsModalOpen(false);
      toast.success("Successfully updated project!");
      await fetchProjects();
      setSelectedProject(
        await projectsService.getProject(selectedProject.project_id)
      );
      resetFields();
    } catch (error) {
      toast.error(`Failed to update project!`);
      console.log(`Failed to update project: ${error}`);
    }
  };

  const handleAddTask = async () => {
    if (selectedProject === undefined) return;

    try {
      // Add project
      const res = await taskService.createTask({
        name,
        description,
        date_target: dateTarget
          ? new Date(dateTarget).toISOString()
          : undefined,
        remarks: remarks ? remarks : undefined,
        project_id: selectedProject.project_id,
      } as Task);

      toast.success("Successfully added task!");
      setIsModalOpen(false);
      resetFields();
      await fetchTasks(selectedProject.project_id);
    } catch (error) {
      toast.error(`Failed to add task!`);
      console.log(`Failed to update task: ${error}`);
    }
  };

  const handleEditTask = async () => {
    try {
      if (selectedTask === undefined || selectedProject === undefined) return;

      // Update project
      await taskService.updateTask({
        task_id: selectedTask.task_id,
        name,
        description,
        remarks: remarks ? remarks : undefined,
        status,
        date_target: dateTarget
          ? new Date(dateTarget).toISOString()
          : undefined,
      } as Task);

      setIsModalOpen(false);
      toast.success("Successfully updated task!");
      fetchTasks(selectedProject.project_id);
      resetFields();
    } catch (error) {
      toast.error(`Failed to update task!`);
      console.log(`Failed to update task: ${error}`);
    }
  };

  useEffect(() => {
    fetchProjects();
    setIsSidebarOpen(true);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Sidebar fetchTasks={fetchTasks} />
      <ProjectDiv />
      <TasksKanban />
      {/* Pop Up Modal */}
      <Modal handleSubmit={handleSubmit} />
      <Toaster position="bottom-center" />
    </div>
  );
}
