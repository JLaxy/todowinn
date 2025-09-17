"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import "@/styles/ui/sidebar.css";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth-service";

type SidebarProps = {
  projects: string[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (e: boolean) => void;
  onSelectProject: (project: string) => void;
};

const iconSize = 30;

export default function Sidebar({
  projects,
  isSidebarOpen,
  setIsSidebarOpen,
  onSelectProject,
}: SidebarProps) {
  const [memberName, setMemberName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchLoggedInMember = async () => {
    setIsLoading(true);
    // Retrieve logged in member
    const userDetails = await authService.getLoggedInMember();
    setMemberName(userDetails.email.split("@")[0]);
    setIsLoading(false);
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
              onClick={() => setIsSidebarOpen(false)}
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
                <CiCirclePlus size={iconSize} />
              </div>

              {/* Scrollable section (3/4 height) */}
              <ProjectsDiv
                projects={projects}
                onSelectProject={onSelectProject}
                setIsSidebarOpen={setIsSidebarOpen}
              />
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

type ProjectsDivProps = {
  projects: string[];
  onSelectProject: (s: string) => void;
  setIsSidebarOpen: (b: boolean) => void;
};

function ProjectsDiv({
  projects,
  onSelectProject,
  setIsSidebarOpen,
}: ProjectsDivProps) {
  return (
    <div className="projects-list-div">
      {projects.map((project, idx) => (
        <button
          key={idx}
          className="project-div"
          onClick={() => {
            onSelectProject(project);
            setIsSidebarOpen(false);
          }}
        >
          {project}
        </button>
      ))}
    </div>
  );
}
