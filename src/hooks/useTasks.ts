'use client'
import { Task } from "@/types/task";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks, updateTask } from "@/app/api/tasks";
import { useTaskStore } from "@/lib/store/useTaskStore";

export const useTasks = () =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    // onSuccess: (tasks) => {
    //   useTaskStore.getState().setTasks(tasks);
    // },
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const addTask = useTaskStore.getState().addTask;

  return useMutation({
    mutationFn: createTask,
    onSuccess: (_res, task) => {
      addTask(task);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const updateTaskStore = useTaskStore.getState().updateTask;

  return useMutation({
    mutationFn: updateTask,

    onMutate: async (updatedTask: Task) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      updateTaskStore(updatedTask);
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
      );

      return { previousTasks };
    },

    onError: (_err, _task, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
        useTaskStore.getState().setTasks(context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const deleteTaskStore = useTaskStore.getState().deleteTask;

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_res, id) => {
      deleteTaskStore(id);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
