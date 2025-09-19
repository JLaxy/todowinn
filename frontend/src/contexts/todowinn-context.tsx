"use client";

import { Changelog } from "@/types/changelog";
import { ModalType } from "@/types/modal-type";
import { Project } from "@/types/project";
import { Status } from "@/types/status";
import { Task } from "@/types/task";
import { toDateInputValue } from "@/utils/date-formatter";
import { createContext, useState, useContext } from "react";

interface TodowinnContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (b: boolean) => void;
  selectedProject: Project | undefined;
  setSelectedProject: (p: Project) => void;
  selectedTask: Task | undefined;
  setSelectedTask: (t: Task) => void;
  taskHistory: Changelog[] | undefined;
  setTaskHistory: (c: Changelog[]) => void;
  userProjects: Project[] | undefined;
  setUserProjects: (p: Project[]) => void;
  projectTasks: Task[];
  setProjectTasks: React.Dispatch<React.SetStateAction<Task[]>>;
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
  resetContext: () => void;
  resetFields: () => void;
  prefillData: (r: Project | Task) => void;
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
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [userProjects, setUserProjects] = useState<Project[]>();
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);
  const [taskHistory, setTaskHistory] = useState<Changelog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateTarget, setDateTarget] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.IN_PROGRESS);

  const resetContext = () => {
    setIsSidebarOpen(false);
    setSelectedProject(undefined);
    setUserProjects(undefined);
    setProjectTasks([]);
    setTaskHistory([]);
    setIsLoading(false);
    setIsModalOpen(false);
    setModalType(undefined);
    resetFields();
  };

  const resetFields = () => {
    console.log("resetting fields...");
    setName("");
    setDescription("");
    setDateTarget("");
    setRemarks("");
    setStatus(Status.IN_PROGRESS);
  };

  // Pre fills fields when Edit is pressed
  const prefillData = (resource: Project | Task) => {
    setName(resource.name);
    setDescription(resource.description);
    if (resource.date_target)
      setDateTarget(toDateInputValue(resource.date_target));
    if (resource.remarks) setRemarks(resource.remarks);
    setStatus(resource.status);
  };

  return (
    <TodowinnContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        selectedProject,
        setSelectedProject,
        selectedTask,
        setSelectedTask,
        userProjects,
        setUserProjects,
        projectTasks,
        setProjectTasks,
        taskHistory,
        setTaskHistory,
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
        resetContext,
        resetFields,
        prefillData,
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
