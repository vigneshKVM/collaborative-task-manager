"use client";

import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useTasks, useUpdateTask } from "@/hooks/useTasks";

const columns: TaskStatus[] = ["To Do", "In Progress", "Done"];

interface Props {
  filters?: {
    status?: TaskStatus;
    priority?: TaskPriority;
    sort?: { key: "dueDate" | "priority"; direction: "asc" | "desc" }[];
    search?: string;
  };
}

export const TaskBoard = ({ filters }: Props) => {
  const { data = [], isLoading } = useTasks();
  const allTasks: Task[] = data;
  const { mutate: updateTask } = useUpdateTask();

  const applyFilters = (tasks: Task[]): Task[] => {
    let filtered = [...tasks];

    if (filters?.search) {
      const keyword = filters.search.toLowerCase();
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(keyword)
      );
    }

    if (filters?.status) {
      filtered = filtered.filter((t) => t.status === filters.status);
    }

    if (filters?.priority) {
      filtered = filtered.filter((t) => t.priority === filters.priority);
    }

    if (filters?.sort?.length) {
      filtered.sort((a, b) => {
        for (const { key, direction } of filters.sort!) {
          let aValue: number | string;
          let bValue: number | string;

          if (key === "priority") {
            aValue = getPriorityRank(a.priority);
            bValue = getPriorityRank(b.priority);
          } else if (key === "dueDate") {
            aValue = a.dueDate ? new Date(a.dueDate).getTime() : 0;
            bValue = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          } else {
            continue;
          }

          if (aValue < bValue) return direction === "asc" ? -1 : 1;
          if (aValue > bValue) return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const getPriorityRank = (priority: TaskPriority): number => {
    const rank: Record<TaskPriority, number> = { Low: 1, Medium: 2, High: 3 };
    return rank[priority];
  };

  const filteredTasks = applyFilters(allTasks);

  const handleDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const draggedTask = allTasks.find((t) => t.id === draggableId);
    if (draggedTask && draggedTask.status !== destination.droppableId) {
      updateTask({
        ...draggedTask,
        status: destination.droppableId as TaskStatus,
      });
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (allTasks.length === 0)
    return <p className="text-gray-500">No tasks available.</p>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {columns.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-50 p-4 rounded-lg border min-h-[200px]"
              >
                <h2 className="text-lg font-semibold mb-4">{status}</h2>
                {filteredTasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} searchTerm={filters?.search} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
