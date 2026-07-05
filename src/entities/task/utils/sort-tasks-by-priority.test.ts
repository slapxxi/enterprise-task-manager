import { describe, expect, it } from 'vitest';

import { sortTasksByPriority } from 'entities/task/utils/sort-tasks-by-priority';

describe('sortTasksByPriority', () => {
  it('sorts tasks by priority', () => {
    const state = {
      tasksById: {
        a: { id: 'a', priority: 'High' },
        b: { id: 'b', priority: 'Low' },
        c: { id: 'c', priority: 'Medium' },
      },
      tasksChildrenByParent: {
        null: ['a', 'b', 'c'],
        a: ['c', 'b'],
      },
    };

    expect(sortTasksByPriority(state)).toEqual({
      tasksById: {
        a: { id: 'a', priority: 'High' },
        b: { id: 'b', priority: 'Low' },
        c: { id: 'c', priority: 'Medium' },
      },
      tasksChildrenByParent: {
        null: ['b', 'c', 'a'],
        a: ['b', 'c'],
      },
    });
  });
});
