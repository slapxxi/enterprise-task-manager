import type { TaskPriority, TasksState } from 'entities/task/model';

export const sortTasksByPriority = (tasksState: TasksState): TasksState => {
  const tasksChildrenByParent: TasksState['tasksChildrenByParent'] = {};

  Object.keys(tasksState.tasksChildrenByParent).forEach((rootId) => {
    const children = [...tasksState.tasksChildrenByParent[rootId]];

    children.sort((a, b) => {
      const aPriority = tasksState.tasksById[a].priority;
      const bPriority = tasksState.tasksById[b].priority;

      return comparePriorities(aPriority, bPriority);
    });

    tasksChildrenByParent[rootId] = children;
  });

  return { tasksById: tasksState.tasksById, tasksChildrenByParent };
};

const priorityOrder: Record<Lowercase<TaskPriority>, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

const comparePriorities = (a: TaskPriority, b: TaskPriority): number => {
  const aPriority = a.toLowerCase() as Lowercase<TaskPriority>;
  const bPriority = b.toLowerCase() as Lowercase<TaskPriority>;

  return priorityOrder[aPriority] - priorityOrder[bPriority];
};
