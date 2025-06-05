// lib/data/taskStore.ts
import { Task } from '@/types/task';

const globalForTasks = globalThis as unknown as {
  tasks: Task[];
};

globalForTasks.tasks = globalForTasks.tasks || [];

export const getTasks = () => globalForTasks.tasks;

export const createTask = (task: Task) => {
  globalForTasks.tasks.push(task);
};

export const updateTask = (id: string, updated: Partial<Task>) => {
  globalForTasks.tasks = globalForTasks.tasks.map((t) =>
    t.id === id ? { ...t, ...updated } : t
  );
};

export const deleteTask = (id: string) => {
  globalForTasks.tasks = globalForTasks.tasks.filter((t) => t.id !== id);
};

export const findTask = (id: string) => {
  const normalizedId = id.trim();
  return globalForTasks.tasks.find((t) => t.id.trim() === normalizedId);
};
