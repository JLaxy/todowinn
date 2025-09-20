"use client";

import React, { useState } from "react";
import {
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "@/types/task";
import { Status } from "@/types/status";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import TaskCard from "@/components/ui/task-card";
import ScrollContainer from "../containers/scrollable";
import toast from "react-hot-toast";
import { taskService } from "@/services/tasks-service";
import "@/styles/ui/tasks-kanban.css";

// Define your columns
const STATUSES: Status[] = [
  Status.TODO,
  Status.IN_PROGRESS,
  Status.FINISHED,
  Status.CANCELLED,
];

function DroppableColumn({
  status,
  tasks,
  children,
}: {
  status: Status;
  tasks: Task[];
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
    data: { type: "column" },
  });

  const getColumnColor = (status: Status): string => {
    switch (status) {
      case Status.TODO:
        return "bg-blue-100 border-2 border-blue-400";
      case Status.IN_PROGRESS:
        return "bg-yellow-100 border-2 border-yellow-400";
      case Status.FINISHED:
        return "bg-green-100 border-2 border-green-400";
      case Status.CANCELLED:
        return "bg-red-100 border-2 border-red-400";
    }
  };

  return (
    <div
      ref={setNodeRef}
      id={status}
      className={`droppable-col ${
        isOver ? getColumnColor(status) : "bg-gray-100"
      }`}
    >
      <h2 className="text-lg font-bold mb-2">{status}</h2>
      <div className="tasks-div">
        <SortableContext
          items={tasks.map((t) => t.task_id)}
          strategy={rectSortingStrategy}
        >
          {children}
        </SortableContext>
      </div>
    </div>
  );
}

export default function TasksKanban() {
  const { selectedProject, projectTasks, setProjectTasks } =
    useTodowinnContext();

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setIsDragging(false);

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as Status;

    if (!STATUSES.includes(newStatus)) return;

    const oldTask = projectTasks.find((t) => t.task_id === taskId);
    if (!oldTask) return;

    // Optimistic UI
    setProjectTasks((prev) =>
      prev.map((task) =>
        task.task_id === taskId ? { ...task, status: newStatus } : task
      )
    );

    await updateTask(oldTask, newStatus, taskId);
  };

  const updateTask = async (
    oldTask: Task,
    newStatus: Status,
    taskId: number
  ) => {
    try {
      await taskService.updateTask({ ...oldTask, status: newStatus });
      toast.success("Successfully updated task");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
      // Rollback
      setProjectTasks((prev) =>
        prev.map((task) =>
          task.task_id === taskId ? { ...task, status: oldTask.status } : task
        )
      );
    }
  };

  const collisionDetection: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      // Only keep collisions with droppable type 'column'
      return pointerCollisions.filter((collision) =>
        args.droppableContainers.find(
          (c) => c.id === collision.id && c.data.current?.type === "column"
        )
      );
    }
    return rectIntersection(args);
  };

  if (!selectedProject) return null;

  return (
    <div className="kanban-div">
      <ScrollContainer isDragging={isDragging}>
        <DndContext
          collisionDetection={collisionDetection}
          onDragStart={({ active }) => {
            const dragged =
              projectTasks.find((t) => t.task_id === active.id) || null;
            setActiveTask(dragged);
            setIsDragging(true);
          }}
          onDragEnd={handleDragEnd}
        >
          <div className="col-div">
            {/* If there are tasks in project */}
            {projectTasks !== undefined ? (
              STATUSES.map((status) => {
                const columnTasks = projectTasks.filter(
                  (t) => t.status === status
                );

                return (
                  <DroppableColumn
                    key={status}
                    status={status}
                    tasks={columnTasks}
                  >
                    {columnTasks.map((task) => (
                      <TaskCard key={task.task_id} task={task} />
                    ))}
                  </DroppableColumn>
                );
              })
            ) : (
              // return empty if none
              <></>
            )}
          </div>

          {/* ✅ Overlay fixes ghost glitch */}
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} dragOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </ScrollContainer>
    </div>
  );
}
