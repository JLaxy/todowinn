// TASK CARD
"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/task";
import { GripVertical } from "lucide-react";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import { ModalType } from "@/types/modal-type";
import { changelogService } from "@/services/changelog-service";
import toast from "react-hot-toast";
import "@/styles/ui/task-card.css";
import { dateFormatter } from "@/utils/date-formatter";

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
    setActivatorNodeRef,
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

  const {
    setModalType,
    setIsModalOpen,
    setSelectedTask,
    prefillData,
    setTaskHistory,
  } = useTodowinnContext();

  const fetchTaskHistory = async () => {
    try {
      const history = await changelogService.getTaskHistory(task.task_id);
      setTaskHistory(history);
    } catch (error) {
      console.error("Failed to fetch task history:", error);
      toast.error("Failed to fetch task history! see console");
    }
  };

  const handleClick = (type: ModalType) => {
    setSelectedTask(task);
    if (ModalType.VIEW_TASK) fetchTaskHistory();
    prefillData(task);
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div ref={setNodeRef} style={style} className="card-div">
      <button
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="drag-handle"
        aria-label="Drag task"
      >
        <GripVertical size={25} />
      </button>

      {/* Task Content */}
      <div className="task-content-div">
        <button
          className="task-btn min-w-0"
          onClick={() => handleClick(ModalType.VIEW_TASK)}
        >
          <h3 className="task-name">{task.name}</h3>
          <p className="text-sm text-gray-600 truncate w-full">
            Due: {task.date_target ? dateFormatter(task.date_target) : "None"}
          </p>
        </button>
        <button
          onClick={() => handleClick(ModalType.EDIT_TASK)}
          className="edit-btn"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
