import { useTodowinnContext } from "@/contexts/todowinn-context";
import { ModalType } from "@/types/modal-type";
import React from "react";

type ProjectDivProps = {
  handleEdit: () => void;
};

export default function ProjectDiv({ handleEdit }: ProjectDivProps) {
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

  const handleAddTaskClick = () => {
    setModalType(ModalType.ADD_TASK);
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
      <h2 className="text-xl font-bold text-center">{selectedProject.name}</h2>
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
      <button
        onClick={handleAddTaskClick}
        className="w-full proj-buttons bg-green-400 mt-3 cursor-pointer"
      >
        Add Task
      </button>
    </div>
  );
}
