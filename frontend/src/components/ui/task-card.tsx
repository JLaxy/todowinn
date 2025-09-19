// TASK CARD
"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/task";
import { GripVertical } from "lucide-react";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import { ModalType } from "@/types/modal-type";

export default function TaskCard({
  task,
  dragOverlay = false,
}: {
  task: Task;
  dragOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef, // 👈 needed for handle-only dragging
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.task_id,
    data: { type: "task", columnId: task.status },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging && !dragOverlay ? 0.5 : 1,
  };

  const { setModalType, setIsModalOpen, setSelectedTask, prefillData } =
    useTodowinnContext();

  const handleClick = (type: ModalType) => {
    setSelectedTask(task);
    prefillData(task);
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 rounded-xl shadow-md select-none flex items-center gap-2 bg-red-300 w-full"
    >
      {/* ✅ Drag handle only */}
      <button
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
        aria-label="Drag task"
      >
        <GripVertical size={18} />
      </button>

      {/* Task Content */}
      <div className="flex flex-row bg-amber-200 w-full justify-between">
        <button
          className="bg-amber-800 flex-1 text-left cursor-pointer"
          onClick={() => handleClick(ModalType.VIEW_TASK)}
        >
          <h3 className="font-semibold">{task.name}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </button>
        <button
          onClick={() => handleClick(ModalType.EDIT_TASK)}
          className="cursor-pointer"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
