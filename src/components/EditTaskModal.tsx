'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskForm } from './TaskForm';
import { Task } from '@/types/task';
import { useState, ReactNode } from 'react';

interface EditTaskModalProps {
  task: Task;
  children?: ReactNode;
}

export const EditTaskModal = ({ task, children }: EditTaskModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <button
            onClick={() => setOpen(true)}
            title="Edit"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Edit
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm initialValues={task} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
