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
  DroppableContainer,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "@/types/task";
import { Status } from "@/types/status";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import TaskCard from "@/components/ui/task-card";
import ScrollContainer from "./containers/scrollable";

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
  const { selectedProject } = useTodowinnContext();
  const [tasks, setTasks] = useState<Task[]>([
    {
      task_id: 1,
      name: "Setup project",
      description: "setting up",
      status: Status.TODO,
      project_id: 1,
    },
    {
      task_id: 2,
      name: "Build Kanban",
      description: "building kanban",
      status: Status.IN_PROGRESS,
      project_id: 1,
    },
    {
      task_id: 3,
      name: "Write Docs",
      description: "writing docs",
      status: Status.FINISHED,
      project_id: 1,
    },
    {
      task_id: 4,
      name: "Deploy",
      description: "Deploying",
      status: Status.CANCELLED,
      project_id: 1,
    },
    {
      task_id: 5,
      name: "Deploy",
      description: "Deploying",
      status: Status.CANCELLED,
      project_id: 1,
    },
    {
      task_id: 6,
      name: "Deploy",
      description: "Deploying",
      status: Status.CANCELLED,
      project_id: 1,
    },
    {
      task_id: 7,
      name: "Deploy",
      description: "Deploying",
      status: Status.CANCELLED,
      project_id: 1,
    },
    {
      task_id: 8,
      name: "Deploy",
      description: "Deploying",
      status: Status.CANCELLED,
      project_id: 1,
    },
    {
      task_id: 9,
      name: "Deploy",
      description: "Deploying",
      status: Status.CANCELLED,
      project_id: 1,
    },
    {
      task_id: 10,
      name: "Deploy",
      description: "Deploying",
      status: Status.CANCELLED,
      project_id: 1,
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateTaskStatus = (taskId: number, newStatus: Status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setIsDragging(false);

    if (!over) return;
    const taskId = active.id as number;
    const newStatus = over.id as Status;

    if (STATUSES.includes(newStatus)) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  const collisionDetection: CollisionDetection = (args) => {
    // Get all collisions under the pointer
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions.map((collision) => {
        // Find the droppable container by id
        const container: DroppableContainer | undefined =
          args.droppableContainers.find((c) => c.id === collision.id);

        if (container && container.data.current?.type === "task") {
          // Replace task collision with its parent column
          return {
            ...collision,
            id: container.data.current?.columnId,
          };
        }

        return collision;
      });
    }

    // Fallback if no pointer collision
    return rectIntersection(args);
  };

  if (!selectedProject) return null;

  return (
    <div className="flex-1 h-full">
      <ScrollContainer isDragging={isDragging}>
        <DndContext
          collisionDetection={collisionDetection}
          onDragStart={({ active }) => {
            const dragged = tasks.find((t) => t.task_id === active.id) || null;
            setActiveTask(dragged);
            setIsDragging(true);
          }}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4">
            {STATUSES.map((status) => {
              const columnTasks = tasks.filter((t) => t.status === status);

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
            })}
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
