"use client";

import { ModalType } from "@/types/modal-type";
import { Project } from "@/types/project";
import { Status } from "@/types/status";
import { createContext, useState, useContext } from "react";

interface TodowinnContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (b: boolean) => void;
  isAddingProject: boolean;
  setIsAddingProject: (b: boolean) => void;
  selectedProject: Project | undefined;
  setSelectedProject: (p: Project) => void;
  userProjects: Project[] | undefined;
  setUserProjects: (p: Project[]) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (b: boolean) => void;
  modalType: ModalType | undefined;
  setModalType: (m: ModalType) => void;
  name: string;
  setName: (n: string) => void;
  description: string;
  setDescription: (n: string) => void;
  dateTarget: string;
  setDateTarget: (d: string) => void;
  remarks: string;
  setRemarks: (d: string) => void;
  status: Status;
  setStatus: (d: Status) => void;
}

const TodowinnContext = createContext<TodowinnContextType | undefined>(
  undefined
); // or define a type for better safety

export const TodowinnProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [userProjects, setUserProjects] = useState<Project[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateTarget, setDateTarget] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.IN_PROGRESS);

  return (
    <TodowinnContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isAddingProject,
        setIsAddingProject,
        selectedProject,
        setSelectedProject,
        userProjects,
        setUserProjects,
        isLoading,
        setIsLoading,
        isModalOpen,
        setIsModalOpen,
        modalType,
        setModalType,
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
      }}
    >
      {children}
    </TodowinnContext.Provider>
  );
};

// Custom hook (optional but recommended)
export const useTodowinnContext = () => {
  const context = useContext(TodowinnContext);
  if (!context) {
    throw new Error(
      "TodowinnContext must be used within a TodowinnContextProvider"
    );
  }
  return context;
};
