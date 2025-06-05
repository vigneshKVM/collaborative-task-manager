import { Task } from '@/types/task';

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch('/api/tasks');
  return res.json();
};

export const createTask = async (task: Task) => {
  await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
};

export const updateTask = async (task: Task) => {
  await fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (id: string) => {
  await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
};
