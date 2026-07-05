import { MOCK_API_CHANCE_TO_FAIL, MOCK_API_DELAY_RANGE } from 'shared/constants';
import type { ID } from 'shared/types';

import { mockApi } from 'shared/utils';

export const moveTaskData = mockApi(MOCK_API_DELAY_RANGE, MOCK_API_CHANCE_TO_FAIL, async (taskId: ID, parentId: ID) => {
  return [taskId, parentId];
});
