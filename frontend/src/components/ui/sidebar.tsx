"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import "@/styles/ui/sidebar.css";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth-service";
import { ModalType } from "@/types/modal-type";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import ProjectsAccordion from "./projects-accordion";

const iconSize = 30;

export default function Sidebar({
  fetchTasks,
}: {
  fetchTasks: (p: number) => void;
}) {
  const { isSidebarOpen, setIsSidebarOpen, setModalType, setIsModalOpen } =
    useTodowinnContext();
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
                setIsSidebarOpen(false);
              }}
            />

            {/* Sidebar panel */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-3/4 sm:max-w-lg bg-white shadow-xl z-50 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-end">
                <button
                  className="close-icon-btn"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <IoCloseCircleOutline size={iconSize} />
                </button>
              </div>

              {/* Top fixed section (1/4 height) */}
              <div className="shrink-0">
                <MemberIconDiv memberName={memberName} />
                <div className="flex justify-between items-end p-2">
                  <h1 className="font-bold pl-2 mt-5">Your Projects</h1>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setModalType(ModalType.ADD_PROJECT);
                      setIsSidebarOpen(false);
                      setIsModalOpen(true);
                    }}
                  >
                    <CiCirclePlus size={iconSize} />
                  </button>
                </div>
              </div>

              {/* Scrollable section (3/4 height) */}
              <div className="flex-1 overflow-hidden">
                <ProjectsAccordion fetchTasks={fetchTasks} />
              </div>
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
    <div>
      <div className="icon" />
      <p className="font-bold mt-4 flex justify-center">Hi, {memberName}!</p>
    </div>
  );
}
