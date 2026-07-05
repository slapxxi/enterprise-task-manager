import type { ID } from 'shared/types';

import { collectSubtreeIds, type TasksState } from 'entities/task';

export const deleteTask = (state: TasksState, id: ID): TasksState => {
  const ids = collectSubtreeIds(state, id);
  const { parentId } = state.tasksById[id];

  const tasksById = { ...state.tasksById };
  const tasksChildrenByParent = { ...state.tasksChildrenByParent };

  ids.forEach((taskId) => {
    delete tasksById[taskId];
    delete tasksChildrenByParent[taskId];
  });

  tasksChildrenByParent[parentId] =
    tasksChildrenByParent[parentId].filter((childId) => childId !== id);

  return { tasksById, tasksChildrenByParent };
};
