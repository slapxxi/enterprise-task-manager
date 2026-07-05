// types
import type { ID } from 'shared/types';

import { type ExpandedTasksState, type TasksState } from 'entities/task';

const ESTIMATED_TASK_SIZE = 48;

const ESTIMATED_EXPANDED_TASK_SIZE = 92;

const TASK_GAP = 8;

export const estimateTaskSize = (tasks: TasksState, expandedTasks: ExpandedTasksState, taskId: ID): number => {
  const selfSize = expandedTasks[taskId] ? ESTIMATED_EXPANDED_TASK_SIZE : ESTIMATED_TASK_SIZE;
  const childrenIds = tasks.tasksChildrenByParent[taskId];

  if (childrenIds.length === 0) {
    return selfSize;
  }

  return childrenIds.reduce((acc, childId) => {
    const childSize = estimateTaskSize(tasks, expandedTasks, childId);

    return acc + childSize + TASK_GAP;
  }, selfSize);
};
