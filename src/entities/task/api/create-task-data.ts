import { MOCK_API_CHANCE_TO_FAIL, MOCK_API_DELAY_RANGE } from 'shared/constants';

import type { TasksState } from 'entities/task/model';
import { mockApi } from 'shared/utils';

export const createTaskData = mockApi(MOCK_API_DELAY_RANGE, MOCK_API_CHANCE_TO_FAIL, async (state: TasksState) => {
  return state;
});
