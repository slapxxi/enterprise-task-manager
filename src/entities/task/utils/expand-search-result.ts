// types
import type { SearchResult } from 'shared/types';

import type { ExpandedTasksState, TasksState } from 'entities/task/model';

export const expandSearchResult = (tasks: TasksState, expandedTasks: ExpandedTasksState, searchResult: SearchResult) => {
  const expandedTasksWithSearch: ExpandedTasksState = { ...expandedTasks };

  searchResult.forEach((_, taskId) => {
    expandedTasksWithSearch[taskId] = true;
    expandedTasksWithSearch[tasks.tasksById[taskId].parentId] = true;
  });

  return expandedTasksWithSearch;
};
