// types
import type { ID, Nullable, RichText } from 'shared/types';

export type Task = {
  id: ID;
  title: string;
  description: RichText;
  priority: TaskPriority;
  deadline: string;
  parentId: Nullable<ID>;
  status:TaskStatus;
};

export type TaskStatus = 'queue' | 'development' | 'done' | 'expired';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export type TasksState = {
  tasksById: Record<ID, Task>;
  tasksChildrenByParent: Record<Nullable<ID>, ID[]>;
};

export type ExpandedTasksState = Record<ID, boolean>;

export type TaskFormValues = Omit<Task, 'id' | 'parentId' | 'status'>;

export type ExpiredDeadlines = Record<ID, Task['deadline']>;
