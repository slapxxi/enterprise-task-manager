// constants
import { MOCK_API_CHANCE_TO_FAIL, MOCK_API_DELAY_RANGE } from 'shared/constants';

import { mockApi } from 'shared/utils';

export const getTasksData = mockApi(MOCK_API_DELAY_RANGE, MOCK_API_CHANCE_TO_FAIL, async <T>(param: T) => {
  return param;
});
