import type { TasksState } from 'entities/task';

export const moveTask = (state: TasksState, id: string, newParentId: string | null): TasksState => {
  const oldParentId = state.tasksById[id].parentId;

  if (oldParentId === newParentId) {
    return state;
  }

  return {
    tasksById: {
      ...state.tasksById,
      [id]: { ...state.tasksById[id], parentId: newParentId },
    },
    tasksChildrenByParent: {
      ...state.tasksChildrenByParent,
      [oldParentId!]: state.tasksChildrenByParent[oldParentId!].filter(
        (childId) => childId !== id,
      ),
      [newParentId!]: [
        ...(state.tasksChildrenByParent[newParentId!] ?? []),
        id,
      ],
    },
  };
};
