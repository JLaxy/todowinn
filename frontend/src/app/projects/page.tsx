"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import toast, { Toaster } from "react-hot-toast";
import { Project } from "@/types/project";
import { projectsService } from "@/services/projects-service";
import "@/styles/pages/projects.css";
import "@/styles/ui/modals.css";
import Modal from "@/components/ui/modal";
import { ModalType } from "@/types/modal-type";
import { dateFormatter } from "@/utils/date-formatter";

export default function ProjectsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [userProjects, setUserProjects] = useState<Project[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();

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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar
        setIsSidebarOpen={setIsSidebarOpen}
        selectedProject={selectedProject}
      />
      <ProjectDiv
        selectedProject={selectedProject}
        setIsModalOpen={setIsModalOpen}
        setModalType={setModalType}
      />
      <Sidebar
        projects={userProjects}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onSelectProject={(p) => setSelectedProject(p)}
      />
      <Toaster position="bottom-center" />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        <ModalBody modalType={modalType} selectedProject={selectedProject} />
      </Modal>
    </div>
  );
}

type ModalBodyProps = {
  modalType: ModalType | undefined;
  selectedProject: Project | undefined;
};

function ModalBody({ modalType, selectedProject }: ModalBodyProps) {
  if (modalType === undefined || selectedProject === undefined) return <></>;

  switch (modalType) {
    case ModalType.VIEW_PROJECT:
      return (
        <div className="view-proj-div">
          {/* Name */}
          <h3 className="modal-item-label">{selectedProject.name}</h3>
          {/* Description */}
          <p className="pb-5">{selectedProject.description}</p>
          {/* Status */}
          <p>
            <span className="font-bold">Status:</span> {selectedProject.status}
          </p>
          {/* Remarks */}
          <p>
            {selectedProject.remarks && (
              <>
                <span className="font-bold">Remarks: </span>
                {selectedProject.remarks}
              </>
            )}
          </p>
          {/* Date Created */}
          <p>
            {selectedProject.date_created && (
              <>
                <span className="font-bold">Date Created</span>:{" "}
                {dateFormatter(selectedProject.date_created)}
              </>
            )}
          </p>
          {/* Date Target */}
          <p>
            {selectedProject.date_target && (
              <>
                <span className="font-bold">Date Target</span>:{" "}
                {dateFormatter(selectedProject.date_target)}
              </>
            )}
          </p>
          {/* Date Finished */}
          <p>
            {selectedProject.date_finished && (
              <>
                <span className="font-bold">Date Finished</span>:{" "}
                {dateFormatter(selectedProject.date_finished)}
              </>
            )}
          </p>
        </div>
      );
    case ModalType.EDIT_PROJECT:
      return <div>editing project</div>;
    case ModalType.VIEW_TASK:
      return <div>viewing task</div>;
    case ModalType.EDIT_TASK:
      return <div>editing task</div>;
  }
}

type ProjectDivProps = {
  selectedProject: Project | undefined;
  setModalType: (a: ModalType) => void;
  setIsModalOpen: (b: boolean) => void;
};

function ProjectDiv({
  selectedProject,
  setModalType,
  setIsModalOpen,
}: ProjectDivProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleViewClick = () => {
    setModalType(ModalType.VIEW_PROJECT);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
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
