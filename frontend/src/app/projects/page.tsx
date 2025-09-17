"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState("Welcome");
  return (
    <div>
      <Navbar />
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
        onSelectProject={(p) => setSelectedProject(p)}
      />
      <p>hello</p>
      <Toaster position="bottom-center" />
    </div>
  );
}
