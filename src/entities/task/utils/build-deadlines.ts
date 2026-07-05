import type { ExpiredDeadlines, TasksState } from 'entities/task';

export const buildDeadlines = (tasks: TasksState): ExpiredDeadlines => {
  const deadlines: ExpiredDeadlines = {};
  const { tasksById } = tasks;

  Object.keys(tasksById).forEach((taskId) => {
    const task = tasksById[taskId];

    if (task.deadline) {
      deadlines[taskId] = task.deadline;
    }
  });

  return deadlines;
};
