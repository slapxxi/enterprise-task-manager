import type { SearchResult } from 'shared/types';

import type { TasksState } from 'entities/task';

export const searchTasks = (tasks: TasksState, query: string): SearchResult => {
  const trimmedQuery = query.trim();
  const matches: SearchResult = new Map();

  if (trimmedQuery === '') {
    return matches;
  }

  Object.keys(tasks.tasksById).forEach((taskId) => {
    const task = tasks.tasksById[taskId];
    const titleIndices = findMatchIndices(task.title, trimmedQuery);
    const descriptionIndices = findMatchIndices(task.description, trimmedQuery);

    if (titleIndices.length > 0 || descriptionIndices.length > 0) {
      matches.set(taskId, {
        title: titleIndices,
        description: descriptionIndices,
      });
    }
  });

  return matches;
};

const findMatchIndices = (text: string, query: string) => {
  const searchLower = query.toLowerCase();
  const textLower = text.toLowerCase();

  const matchIndices: number[] = [];

  let index = 0;

  while (index < textLower.length) {
    const indexOfMatch = textLower.indexOf(searchLower, index);

    if (indexOfMatch === -1) {
      break;
    }

    matchIndices.push(indexOfMatch);
    index = indexOfMatch + searchLower.length;
  }

  return matchIndices;
};
