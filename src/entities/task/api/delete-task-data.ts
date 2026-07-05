// constants
import { MOCK_API_CHANCE_TO_FAIL, MOCK_API_DELAY_RANGE } from 'shared/constants';
// types
import type { ID } from 'shared/types';

import { mockApi } from 'shared/utils';

export const deleteTaskData = mockApi(MOCK_API_DELAY_RANGE, MOCK_API_CHANCE_TO_FAIL, async (taskId: ID) => {
  return taskId;
});
