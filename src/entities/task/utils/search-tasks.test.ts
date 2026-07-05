import { describe, expect, it } from 'vitest';

import { searchTasks } from 'entities/task/utils/search-tasks';

describe('searchTasks', () => {
  it('returns empty object when query is empty', () => {
    const tasks = {
      tasksById: {
        1: {
          id: '1',
          title: 'Task 1',
          description: 'Task 1 description',
        },
        2: {
          id: '2',
          title: 'Task 2',
          description: 'Task 2 description',
        },
      },
    };

    const result = searchTasks(tasks, '');

    expect(result).toEqual(new Map());
  });

  it('returns matches when query matches task title', () => {
    const tasks = {
      tasksById: {
        1: {
          id: '1',
          title: 'Task 1',
          description: 'Here Task 1 description task 1',
        },
        2: {
          id: '2',
          title: 'Task 2',
          description: 'Task 2 description',
        },
      },
    };

    const result = searchTasks(tasks, 'task 1');

    expect(result).toEqual(new Map([['1', { title: [0], description: [5, 24] }]]));
  });
});
