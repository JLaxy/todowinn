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
import { toDateInputValue } from "@/utils/date-formatter";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import ProjectDiv from "@/components/ui/project-div";
import TasksKanban from "@/components/ui/tasks-kanban";

export default function ProjectsPage() {
  const {
    setIsLoading,
    setUserProjects,
    setIsModalOpen,
    setIsSidebarOpen,
    selectedProject,
    setSelectedProject,
    name,
    setName,
    description,
    setDescription,
    dateTarget,
    setDateTarget,
    remarks,
    setRemarks,
    status,
    setStatus,
    resetFields,
    modalType,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // If adding project
    if (modalType === ModalType.ADD_PROJECT) {
      handleAddProject();
      return;
    } else {
      try {
        if (selectedProject === undefined) return;

        console.log("handling edit project...");
        // Update project
        await projectsService.updateProject({
          project_id: selectedProject.project_id,
          name,
          description,
          remarks,
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
      } catch (error) {
        toast.error(`Failed to update project!`);
        console.log(`Failed to update project: ${error}`);
      }
    }

    resetFields();
  };

  const handleAddProject = async () => {
    console.log("handling add project...");
    try {
      // Add project
      const res = await projectsService.createProject({
        name,
        description,
        date_target: dateTarget
          ? new Date(dateTarget).toISOString()
          : undefined,
        remarks,
      } as Project);

      toast.success("Successfully added project!");
      setSelectedProject(
        await projectsService.getProject(res.data["project_id"] as number)
      );
      setIsModalOpen(false);
      resetFields();
      await fetchProjects();
    } catch (error) {
      toast.error(`Failed to add project!`);
      console.log(`Failed to update project: ${error}`);
    }
  };

  // Pre fills fields when Edit is pressed
  const handleEdit = () => {
    if (selectedProject === undefined) return;

    setName(selectedProject.name);
    setDescription(selectedProject.description);
    if (selectedProject.date_target)
      setDateTarget(toDateInputValue(selectedProject.date_target));
    if (selectedProject.remarks) setRemarks(selectedProject.remarks);
    setStatus(selectedProject.status);
  };

  useEffect(() => {
    fetchProjects();
    setIsSidebarOpen(true);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Sidebar />
      <ProjectDiv handleEdit={handleEdit} />
      <TasksKanban />
      {/* Pop Up Modal */}
      <Modal handleSubmit={handleSubmit} />
      <Toaster position="bottom-center" />
    </div>
  );
}
