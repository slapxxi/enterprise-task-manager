import { describe, expect, it } from 'vitest';

import { expireTasks } from 'entities/task/utils/expire-tasks';

describe('expireTasks', () => {
  it('expires tasks', () => {
    const tasks = {
      tasksById: {
        1: { id: '1', status: 'queue' },
        2: { id: '2', status: 'development' },
        3: { id: '3', status: 'done' },
      },
      tasksChildrenByParent: { 1: ['2'] },
    };

    expect(expireTasks(tasks, ['1', '2'])).toEqual({
      tasksById: {
        1: { id: '1', status: 'expired' },
        2: { id: '2', status: 'expired' },
        3: { id: '3', status: 'done' },
      },
      tasksChildrenByParent: { 1: ['2'] },
    });
  });

  it('does not expire tasks that are done', () => {
    const tasks = {
      tasksById: {
        1: { id: '1', status: 'done' },
        2: { id: '2', status: 'done' },
      },
      tasksChildrenByParent: { 1: ['2'] },
    };

    expect(expireTasks(tasks, ['1', '2'])).toEqual({
      tasksById: {
        1: { id: '1', status: 'done' },
        2: { id: '2', status: 'done' },
      },
      tasksChildrenByParent: { 1: ['2'] },
    });
  });
});
