"use client";

import { useState, useEffect, FormEvent } from "react";
import { projectsService } from "@/services/projects-service";
import { Project } from "@/types/project";
import { Status } from "@/types/status";
import { authService } from "@/services/auth-service";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateTarget, setDateTarget] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<Status>(Status.IN_PROGRESS);
  const router = useRouter();

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsService.getProjects();
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("An error has occured while fetching projects!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      // Call Logout
      const res = await authService.logout();

      // If okay
      if (res.status === 200) {
        toast.success("Logging out...");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(`An error has occured while trying to log out!`);
      console.log(error);
      return;
    }
  };

  // Create or Update project
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectsService.updateProject({
          project_id: editingProject.project_id,
          name,
          description,
          remarks,
          status,
          date_target: dateTarget
            ? new Date(dateTarget).toISOString()
            : undefined,
        } as Project);
        setEditingProject(null);
      } else {
        await projectsService.createProject({
          name,
          description,
          remarks,
          date_target: dateTarget
            ? new Date(dateTarget).toISOString()
            : undefined,
        } as Project);
      }
      setName("");
      setDescription("");
      setDateTarget("");
      setRemarks("");
      setStatus(Status.IN_PROGRESS);
      fetchProjects();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  // Soft delete (mark as FINISHED)
  const handleFinish = async (project_id: number) => {
    try {
      // If currently editing this project, clear the form
      if (editingProject?.project_id === project_id) {
        setEditingProject(null);
        setName("");
        setDescription("");
        setDateTarget("");
        setRemarks("");
        setStatus(Status.IN_PROGRESS);
      }

      await projectsService.updateProject({
        project_id,
        status: Status.FINISHED,
      } as Project);

      fetchProjects();
    } catch (error) {
      console.error("Failed to finish project:", error);
      toast.error("Failed to finish project!");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setName(project.name);
    setDescription(project.description);
    setDateTarget(project.date_target?.split("T")[0] || "");
    setRemarks(project.remarks || "");
    setStatus(project.status);
  };

  return (
    // Logout button
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium mb-1">
            Project Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter project name"
            className="border rounded p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium mb-1">
            Project Description
          </label>
          <textarea
            id="description"
            placeholder="Enter project description"
            className="border rounded p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateTarget" className="font-medium mb-1">
            Target Date
          </label>
          <input
            id="dateTarget"
            type="date"
            className="border rounded p-2 w-full"
            value={dateTarget}
            onChange={(e) => setDateTarget(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="remarks" className="font-medium mb-1">
            Remarks
          </label>
          <input
            id="remarks"
            type="text"
            placeholder="Optional remarks"
            className="border rounded p-2 w-full"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {editingProject && (
          <div className="flex flex-col">
            <label htmlFor="status" className="font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              className="border rounded p-2 w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              {Object.values(Status).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 flex-1"
          >
            {editingProject ? "Update Project" : "Create Project"}
          </button>
          {editingProject && (
            <button
              type="button"
              onClick={() => {
                setEditingProject(null);
                setName("");
                setDescription("");
                setDateTarget("");
                setRemarks("");
                setStatus(Status.IN_PROGRESS);
              }}
              className="bg-gray-300 text-black rounded p-2 hover:bg-gray-400 flex-1"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Projects Table */}
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        GetProjectsTable(projects, handleEdit, handleFinish)
      )}
      <Toaster position="bottom-center" />
    </div>
  );
}

function GetProjectsTable(
  projects: Project[],
  handleEdit: (project: Project) => void,
  handleFinish: (id: number) => void
) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2 text-left">Description</th>
          <th className="border p-2 text-left">Status</th>
          <th className="border p-2 text-left">Remarks</th>
          <th className="border p-2 text-left">Target Date</th>
          <th className="border p-2 text-left">Date Finished</th>
          <th className="border p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.project_id}>
            <td className="border p-2">{project.name}</td>
            <td className="border p-2">{project.description}</td>
            <td className="border p-2">{project.status}</td>
            <td className="border p-2">{project.remarks || "-"}</td>
            <td className="border p-2">
              {project.date_target ? project.date_target.split("T")[0] : "-"}
            </td>
            <td className="border p-2">
              {project.date_finished
                ? project.date_finished.split("T")[0]
                : "-"}
            </td>
            <td className="border p-2 flex gap-2">
              {project.status !== Status.FINISHED &&
                project.status !== Status.CANCELLED && (
                  <>
                    <button
                      onClick={() => handleEdit(project)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleFinish(project.project_id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Finish
                    </button>
                  </>
                )}
              {project.status === Status.FINISHED ? (
                <span className="text-green-600 italic">Finished</span>
              ) : project.status === Status.CANCELLED ? (
                <span className="text-red-500 italic">Cancelled</span>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
