import { NextRequest, NextResponse } from 'next/server';
import { deleteTask, updateTask, findTask } from '@/lib/data/taskStore';

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await request.json();

  const task = findTask(id);
  if (!task) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  updateTask(id, body);
  return NextResponse.json({ message: 'Task updated' });
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const task = findTask(id);
  if (!task) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  deleteTask(id);
  return NextResponse.json({ message: 'Task deleted' });
}
