"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "@/lib/validation/taskSchema";
import { Button } from "@/components/ui/button";
import { useCreateTask, useUpdateTask } from "@/hooks/useTasks";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types/task";
import { useEffect } from "react";

interface TaskFormProps {
  onSuccess?: () => void;
  initialValues?: Task;
}

export const TaskForm = ({ onSuccess, initialValues }: TaskFormProps) => {
  const isEdit = !!initialValues;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "To Do",
      priority: "Medium",
    },
  });

  const create = useCreateTask();
  const update = useUpdateTask();

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const onSubmit = (data: TaskFormData) => {
    const task = isEdit
      ? { ...initialValues, ...data }
      : { id: uuidv4(), ...data };

    if (isEdit) {
      update.mutate(task);
    } else {
      create.mutate(task);
    }

    reset();
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white border rounded-lg p-6 mt-6"
    >
      <div>
        <label className="block font-medium">Title</label>
        <Input {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <Textarea {...register("description")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Status</label>
          <select
            {...register("status")}
            className="w-full border p-2 rounded-md"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Priority</label>
          <select
            {...register("priority")}
            className="w-full border p-2 rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium">Due Date</label>
        <Input type="date" {...register("dueDate")} />
      </div>

      <div>
        <label className="block font-medium">Assignee</label>
        <Input {...register("assignee")} />
      </div>

      <Button type="submit">{isEdit ? "Update Task" : "Add Task"}</Button>
    </form>
  );
};
