import { describe, expect, it } from 'vitest';
import type { ID } from 'shared/types';

import type { Task, TasksState } from 'entities/task/model';
import { buildTaskState } from 'entities/task/utils/build-task-state';

const testTaskEntries: Omit<Task, 'id' | 'title' | 'parentId'> = {
  status: 'queue', priority: 'Low', deadline: '2002-11-06', description: 'Lorem ipsum',
};

const testTask = (id: ID, parentId?: ID): Task => {
  return {
    id, title: `task ${id}`, parentId: parentId || null, ...testTaskEntries,
  };
};

describe('buildTaskState', () => {
  it('resturns state for empty dto', () => {
    const tasks: Task[] = [];

    const expected: TasksState = {
      tasksById: {},
      tasksChildrenByParent: {},
    };

    expect(buildTaskState(tasks)).toEqual(expected);
  });

  it('returns state for dto with no parents', () => {
    const tasks = [
      testTask('1'),
      testTask('2'),
      testTask('3'),
    ];

    const expected: TasksState = {
      tasksById: {
        1: testTask('1'),
        2: testTask('2'),
        3: testTask('3'),
      },
      tasksChildrenByParent: {
        null: ['1', '2', '3'],
        1: [],
        2: [],
        3: [],
      },
    };

    expect(buildTaskState(tasks)).toEqual(expected);
  });

  it('returns state for dto with parents', () => {
    const tasks = [
      testTask('1'),
      testTask('2'),
      testTask('3'),
      testTask('4', '1'),
      testTask('5', '4'),
    ];

    const expected: TasksState = {
      tasksById: {
        1: testTask('1'),
        2: testTask('2'),
        3: testTask('3'),
        4: testTask('4', '1'),
        5: testTask('5', '4'),
      },
      tasksChildrenByParent: {
        null: ['1', '2', '3'],
        1: ['4'],
        2: [],
        3: [],
        4: ['5'],
        5: [],
      },
    };

    expect(buildTaskState(tasks)).toEqual(expected);
  });
});
