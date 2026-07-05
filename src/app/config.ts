import type { TaskPriority, TasksState, TaskStatus } from 'entities/task';
import { buildTaskState } from 'entities/task';

const dummyData = {
  description: 'Lorem ipsum', priority: 'Medium' as TaskPriority, deadline: '2008-06-11' as TaskStatus,
};

const SEED_SIZE = 10_000;

const PARENT_OFFSET = 5;

export const GENERATE_SEED_DATA = (): TasksState => {
  const start = performance.now();
  const tasks = [];

  for (let index = 0; index < SEED_SIZE; index += 1) {
    let parentId = null;
    let status: TaskStatus = 'development';

    if (index > PARENT_OFFSET && index % 2 === 0) {
      parentId = String(index - 2);
      status = 'done';
    }

    tasks.push({
      id: String(index + 1), title: `task ${index + 1}`, parentId, status, ...dummyData,
    });
  }

  const result = buildTaskState(tasks);
  const end = performance.now();

  console.log(`Seed data generated in ${end - start}ms`);

  return result;
};
