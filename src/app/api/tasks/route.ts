import { NextResponse } from 'next/server';
import { createTask, getTasks } from '@/lib/data/taskStore';

export async function GET() {
  return NextResponse.json(getTasks());
}

export async function POST(request: Request) {
  const task = await request.json();
  createTask(task);
  return NextResponse.json({ message: 'Task added' }, { status: 201 });
}
