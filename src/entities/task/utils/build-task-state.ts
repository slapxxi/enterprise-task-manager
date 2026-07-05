import type { Task, TasksState } from 'entities/task';

export const buildTaskState = (tasks: Task[]): TasksState => {
  const tasksById: TasksState['tasksById'] = {};
  const tasksChildrenByParent: TasksState['tasksChildrenByParent'] = {};

  tasks.forEach((task) => {
    tasksById[task.id] = task;

    const parentKey = task.parentId ?? 'null';

    if (!tasksChildrenByParent[parentKey]) {
      tasksChildrenByParent[parentKey] = [];
    }

    tasksChildrenByParent[parentKey].push(task.id);

    if (!tasksChildrenByParent[task.id]) {
      tasksChildrenByParent[task.id] = [];
    }
  });

  return { tasksById, tasksChildrenByParent };
};
