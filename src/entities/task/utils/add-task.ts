import type { Task, TasksState } from 'entities/task';

export const addTask = (state: TasksState, task: Task): TasksState => {
  return {
    tasksById: {
      ...state.tasksById,
      [task.id]: task,
    },
    tasksChildrenByParent: {
      ...state.tasksChildrenByParent,
      [task.parentId]: [
        ...(state.tasksChildrenByParent[task.parentId] ?? []),
        task.id,
      ],
      [task.id]: [],
    },
  };
};
