"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>();

  return (
    <div>
      <Navbar
        setIsSidebarOpen={setIsSidebarOpen}
        selectedProject={selectedProject}
      />
      <Sidebar
        projects={[
          "Project A",
          "Project B",
          "Project C",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
          "Project D",
        ]}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onSelectProject={(p) => setSelectedProject(p)}
      />
      <p>hello</p>
      <Toaster position="bottom-center" />
    </div>
  );
}
