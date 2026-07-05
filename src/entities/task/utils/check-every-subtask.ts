import type { ID } from 'shared/types';

import type { Task, TasksState } from 'entities/task';

export const checkEverySubtask = (tasks: TasksState, taskId: ID, callback: (task: Task) => void): boolean => {
  const childIds = tasks.tasksChildrenByParent[taskId];

  if (!childIds) {
    return true;
  }

  return childIds.every((childId) => callback(tasks.tasksById[childId]));
};
