'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskForm } from './TaskForm';
import { useState } from 'react';

export const AddTaskModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>+ Add New Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
        </DialogHeader>
        <TaskForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
