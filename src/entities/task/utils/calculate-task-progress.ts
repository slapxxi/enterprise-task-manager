import type { ID } from 'shared/types';

import type { TasksState } from 'entities/task';

export const calculateTaskProgress = (tasks: TasksState, taskId: ID): number => {
  const childIds = tasks.tasksChildrenByParent[taskId];

  if (!childIds) {
    return 0;
  }

  return childIds.reduce((acc, childId) => (acc + (tasks.tasksById[childId].status === 'done' ? 1 : 0)), 0) / childIds.length;
};
