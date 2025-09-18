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
    <div className="flex flex-col">
      <Navbar />
      <ProjectDiv handleEdit={handleEdit} />
      <Sidebar />
      {/* Pop Up Modal */}
      <Modal handleSubmit={handleSubmit} />
      <Toaster position="bottom-center" />
    </div>
  );
}

type ProjectDivProps = {
  handleEdit: () => void;
};

function ProjectDiv({ handleEdit }: ProjectDivProps) {
  const { setModalType, setIsModalOpen, selectedProject } =
    useTodowinnContext();

  const handleViewClick = () => {
    handleEdit();
    setModalType(ModalType.VIEW_PROJECT);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    handleEdit();
    setModalType(ModalType.EDIT_PROJECT);
    setIsModalOpen(true);
  };

  if (!selectedProject)
    return (
      <p className="text-gray-500 text-center italic mt-10">
        Please select a project from the sidebar.
      </p>
    );

  return (
    <div className="proj-info-div">
      <div>
        <h2 className="text-xl font-bold">{selectedProject.name}</h2>
        <p className="leading-none">{selectedProject.description}</p>
      </div>
      <div className="flex flex-row gap-x-3 mt-5">
        <button
          onClick={handleViewClick}
          className="proj-buttons bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        >
          View
        </button>
        <button
          onClick={handleEditClick}
          className="proj-buttons bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

function TasksDiv() {
  return <div className="tasks-container"></div>;
}
