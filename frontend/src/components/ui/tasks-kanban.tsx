// TASK KANBAN

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

  return (
    <div
      ref={setNodeRef}
      id={status}
      className={`min-w-[97vw] sm:min-w-[300px] rounded-2xl p-3 flex-shrink-0 transition-colors ${
        isOver ? "bg-blue-100 border-2 border-blue-400" : "bg-gray-100"
      }`}
    >
      <h2 className="text-lg font-bold mb-2">{status}</h2>
      <SortableContext
        items={tasks.map((t) => t.task_id)}
        strategy={rectSortingStrategy}
      >
        {children}
      </SortableContext>
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
    <div className="flex-1 h-full">
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
          <div className="flex gap-4">
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
