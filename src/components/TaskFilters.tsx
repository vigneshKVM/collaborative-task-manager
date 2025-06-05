"use client";
import { useEffect, useState } from "react";
import { TaskPriority, TaskStatus } from "@/types/task";
import { Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    sort?: { key: "dueDate" | "priority"; direction: "asc" | "desc" }[];
    search?: string;
  }) => void;
}

export const TaskFilters = ({ onFilterChange }: Props) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [status, setStatus] = useState<TaskStatus | "All">("All");
  const [priority, setPriority] = useState<TaskPriority | "All">("All");
  const [search, setSearch] = useState<string>("");

  const [dueDateSort, setDueDateSort] = useState<"" | "asc" | "desc">("");
  const [prioritySort, setPrioritySort] = useState<"" | "asc" | "desc">("");

  useEffect(() => {
    const sort: { key: "dueDate" | "priority"; direction: "asc" | "desc" }[] =
      [];
    if (dueDateSort) sort.push({ key: "dueDate", direction: dueDateSort });
    if (prioritySort) sort.push({ key: "priority", direction: prioritySort });

    onFilterChange({
      status: status === "All" ? undefined : status,
      priority: priority === "All" ? undefined : priority,
      sort: sort.length > 0 ? sort : undefined,
      search: search.trim().toLowerCase() || undefined,
    });
  }, [status, priority, dueDateSort, prioritySort, search, onFilterChange]);

  const toggleFilters = () => {
    setShowFilters((prev) => {
      if (!prev) setShowSort(false);
      return !prev;
    });
  };

  const toggleSort = () => {
    setShowSort((prev) => {
      if (!prev) setShowFilters(false);
      return !prev;
    });
  };

  return (
    <div className="bg-white p-4 border rounded-md mb-6 space-y-4">
      {/* Top Controls */}
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleFilters}>
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={toggleSort}>
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort
          </Button>
        </div>

        <div className="min-w-[200px] max-w-xs flex-1">
          <label className="block text-sm font-medium">Search</label>
          <input
            type="text"
            className="border p-1 rounded w-full"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              className="border p-1 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus | "All")}
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              className="border p-1 rounded"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as TaskPriority | "All")
              }
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      )}

      {/* Sort Dropdowns */}
      {showSort && (
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium">
              Sort by Due Date
            </label>
            <select
              className="border p-1 rounded"
              value={dueDateSort}
              onChange={(e) =>
                setDueDateSort(e.target.value as "" | "asc" | "desc")
              }
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Sort by Priority
            </label>
            <select
              className="border p-1 rounded"
              value={prioritySort}
              onChange={(e) =>
                setPrioritySort(e.target.value as "" | "asc" | "desc")
              }
            >
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
