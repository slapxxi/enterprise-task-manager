import type { Task, TasksState } from 'entities/task';

export const serializeTasksState = (state: TasksState): Task[] => {
  return Object.values(state.tasksById);
};
