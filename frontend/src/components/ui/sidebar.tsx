"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import "@/styles/ui/sidebar.css";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth-service";
import { Project } from "@/types/project";
import { Status } from "@/types/status";
import { ModalType } from "@/types/modal-type";
import { useTodowinnContext } from "@/contexts/todowinn-context";

const iconSize = 30;

export default function Sidebar() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    setModalType,
    setIsModalOpen,
    setIsAddingProject,
  } = useTodowinnContext();
  const [memberName, setMemberName] = useState("");

  const fetchLoggedInMember = async () => {
    // Retrieve logged in member
    const userDetails = await authService.getLoggedInMember();
    setMemberName(userDetails.email.split("@")[0]);
  };

  useEffect(() => {
    fetchLoggedInMember();
  }, []);

  return (
    <>
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddingProject(false);
                setIsSidebarOpen(false);
              }}
            />

            {/* Sidebar panel */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-3/4 bg-white shadow-xl z-50 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", stiffness: 300, damping: 30 }}
            >
              <div className="close-icon-div">
                <button onClick={() => setIsSidebarOpen(false)}>
                  <IoCloseCircleOutline size={iconSize} />
                </button>
              </div>

              {/* Top fixed section (1/4 height) */}
              <MemberIconDiv memberName={memberName} />

              <div className="flex justify-between items-end p-2">
                <h1 className="font-bold pl-2 mt-5">Your Projects</h1>
                <button
                  onClick={() => {
                    setModalType(ModalType.ADD_PROJECT);
                    setIsAddingProject(true);
                    setIsSidebarOpen(false);
                    setIsModalOpen(true);
                  }}
                >
                  <CiCirclePlus size={iconSize} />
                </button>
              </div>

              {/* Scrollable section (3/4 height) */}
              <ProjectsDiv />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

type MemberIconDivProps = {
  memberName: string;
};

function MemberIconDiv({ memberName }: MemberIconDivProps) {
  return (
    <>
      <div className="icon" />
      <p className="font-bold mt-4 flex justify-center">Hi, {memberName}!</p>
    </>
  );
}

function ProjectsDiv() {
  const { userProjects, setSelectedProject, setIsSidebarOpen } =
    useTodowinnContext();

  // First check if have project
  if (!userProjects || userProjects.length === 0)
    return (
      <div className="projects-list-div text-gray-500 italic p-4">
        No projects available.
      </div>
    );

  return (
    <div className="projects-list-div">
      {userProjects.map((project, idx) => (
        <button
          key={idx}
          className={`project-div ${getOutlineColor(project)}`}
          onClick={() => {
            setIsSidebarOpen(false);
            setSelectedProject(project); // don’t forget to call this too
          }}
        >
          <h4 className="project-div-title ">{project.name}</h4>
          <p>{project.description}</p>
        </button>
      ))}
    </div>
  );
}

function getOutlineColor(project: Project) {
  switch (project.status as Status) {
    case Status.TODO:
      return "outline-gray-300";
      break;
    case Status.IN_PROGRESS:
      return "outline-amber-200";
      break;
    case Status.FINISHED:
      return "outline-green-300";
      break;
    case Status.CANCELLED:
      return "outline-red-400";
      break;
  }
}
