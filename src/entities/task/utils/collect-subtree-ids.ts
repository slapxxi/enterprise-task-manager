// types
import type { ID } from 'shared/types';

import type { TasksState } from 'entities/task';

export const collectSubtreeIds = (state: TasksState, id: ID, acc: ID[] = []): ID[] => {
  acc.push(id);

  state.tasksChildrenByParent[id].forEach((childId) => {
    collectSubtreeIds(state, childId, acc);
  });

  return acc;
};
