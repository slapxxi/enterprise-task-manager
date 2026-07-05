import type { TasksState } from 'entities/task/model';

export const expireTasks = (tasks: TasksState, ids: string[]) => {
  const newTasksById = { ...tasks.tasksById };

  ids.forEach((id) => {
    const prevTaskValue = tasks.tasksById[id];

    if (prevTaskValue.status === 'done') {
      return;
    }

    newTasksById[id].status = 'expired';
  });

  return { ...tasks, tasksById: newTasksById };
};
