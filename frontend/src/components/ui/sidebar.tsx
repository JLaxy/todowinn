"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SidebarProps = {
  projects: string[];
  onSelectProject: (project: string) => void;
};

export default function Sidebar({ projects, onSelectProject }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Top fixed section (1/4 height) */}
              <div className="h-1/4 flex items-center justify-center border-b font-bold text-lg text-gray-700">
                Projects
              </div>

              {/* Scrollable section (3/4 height) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {projects.map((project, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition font-medium"
                    onClick={() => {
                      onSelectProject(project);
                      setIsOpen(false);
                    }}
                  >
                    {project}
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
