import { useContext } from 'react';

import { SearchContext } from 'app/providers';

export const useSearchTasks = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return searchContext;
};
