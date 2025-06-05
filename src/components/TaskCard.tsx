"use client";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { EditTaskModal } from "./EditTaskModal";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { useDeleteTask } from "@/hooks/useTasks";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

interface TaskCardProps {
  task: Task;
  searchTerm?: string;
}

export const TaskCard = ({ task, searchTerm }: TaskCardProps) => {
  const { mutate } = useDeleteTask();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-gray-800";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const highlightText = (text: string, highlight?: string) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-black">
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="relative bg-white hover:shadow-lg rounded-xl border border-gray-200 p-4 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-base text-gray-900 leading-tight">
          {highlightText(task.title, searchTerm)}
        </h3>
        <Badge variant="outline" className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="text-xs text-gray-500 space-y-1 mb-3">
        <div>
          <span className="font-medium text-gray-700">Status:</span>{" "}
          {task.status}
        </div>
        {task.assignee && (
          <div>
            <span className="font-medium text-gray-700">Assignee:</span>{" "}
            {task.assignee}
          </div>
        )}
        {task.dueDate && (
          <div>
            <span className="font-medium text-gray-700">Due:</span>{" "}
            {task.dueDate}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <EditTaskModal task={task}>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </EditTaskModal>

        <ConfirmDeleteModal task={task} onConfirm={() => mutate(task.id)} />
      </div>
    </div>
  );
};
