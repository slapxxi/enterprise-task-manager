import type { ID } from 'shared/types';

import type { Task, TasksState } from 'entities/task';

export const updateTask = (state: TasksState, id: ID, patch: Partial<Task>): TasksState => {
  return {
    ...state,
    tasksById: {
      ...state.tasksById,
      [id]: { ...state.tasksById[id], ...patch },
    },
  };
};
