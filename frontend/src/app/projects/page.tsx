"use client";

import { FormEvent, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import toast, { Toaster } from "react-hot-toast";
import { Project } from "@/types/project";
import { projectsService } from "@/services/projects-service";
import "@/styles/pages/projects.css";
import Modal, { ModalBody } from "@/components/ui/modal";
import { ModalType } from "@/types/modal-type";
import { toDateInputValue } from "@/utils/date-formatter";
import { useTodowinnContext } from "@/contexts/todowinn-context";

export default function ProjectsPage() {
  const {
    setIsLoading,
    setUserProjects,
    isAddingProject,
    setIsModalOpen,
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
  } = useTodowinnContext();

  const fetchProjects = async () => {
    setIsLoading(true);

    try {
      // Send API rquest
      const res = await projectsService.getProjects();
      setUserProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("An error has occured while fetching projects!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // If adding project
    if (isAddingProject) {
      handleAddProject();
      return;
    }

    setIsModalOpen(false);

    if (selectedProject === undefined) return;

    // Update project
    await projectsService.updateProject({
      project_id: selectedProject.project_id,
      name,
      description,
      remarks,
      status,
      date_target: dateTarget ? new Date(dateTarget).toISOString() : undefined,
    } as Project);

    await fetchProjects();

    setSelectedProject(
      await projectsService.getProject(selectedProject.project_id)
    );

    toast.success("Successfully updated project!");
  };

  const handleAddProject = async () => {};

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
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <ProjectDiv handleEdit={handleEdit} />
      <Sidebar />

      {/* Modal */}
      <Modal>
        <ModalBody handleSubmit={handleSubmit} />
      </Modal>

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
        <h2 className="text-xl font-bold text-center pt-3 py-2">
          {selectedProject.name}
        </h2>
      </div>
      <div className="flex flex-row">
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
