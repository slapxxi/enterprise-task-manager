import type { Intent } from '@blueprintjs/core';

import type { TaskPriority, TaskStatus } from 'entities/task/model';

export const TASK_PRIORITY_TO_INTENT: Record<TaskPriority, Intent> = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
};

export const TASK_STATUS_TO_INTENT: Record<TaskStatus, Intent> = {
  done: 'success',
  development: 'primary',
  queue: 'none',
  expired: 'danger',
};
