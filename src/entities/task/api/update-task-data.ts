import { MOCK_API_CHANCE_TO_FAIL, MOCK_API_DELAY_RANGE } from 'shared/constants';

import type { Task } from 'entities/task';
import { mockApi } from 'shared/utils';

export const updateTaskData = mockApi(MOCK_API_DELAY_RANGE, MOCK_API_CHANCE_TO_FAIL, async (task: Partial<Task>) => {
  return task;
});
