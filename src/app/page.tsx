'use client';

import { TaskBoard } from '@/components/TaskBoard';
import { AddTaskModal } from '@/components/AddTaskModal';
import { TaskFilters } from '@/components/TaskFilters';
import { useState } from 'react';
import { TaskPriority, TaskStatus } from '@/types/task';

export default function Home() {
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
    sortBy?: 'dueDate' | 'priority';
  }>({});

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Collaborative Task Manager</h1>
        <AddTaskModal />
      </div>

      <TaskFilters onFilterChange={setFilters} />
      <TaskBoard filters={filters} />
    </main>
  );
}
