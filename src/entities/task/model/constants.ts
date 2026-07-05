import type { TaskPriority, TaskStatus } from 'entities/task/model/types';

export const TaskStatuses: TaskStatus[] = ['queue', 'development', 'done', 'expired'];

export const TaskPriorities: TaskPriority[] = ['Low', 'Medium', 'High'] as const;
