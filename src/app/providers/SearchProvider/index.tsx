// libraries
import {
  createContext, type FC, useMemo, useState,
} from 'react';
// types
import type { SearchResult } from 'shared/types';

import { searchTasks, useTasks } from 'entities/task';
import { debounce } from 'shared/utils';

type SearchProviderProps = {
  children: React.ReactNode;
};

type SearchContextValue = {
  search: string;
  searchResult: SearchResult;
  query: string;
  setSearch: (value: string) => void;
};

export const SearchContext = createContext<SearchContextValue>(null);

export const SearchTasksProvider: FC<SearchProviderProps> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [delayedSearch, setDelayedSearch] = useState('');
  const { tasks } = useTasks();

  const setDelayedSearchDebounced = useMemo(() => debounce(setDelayedSearch, 300), []);
  const searchResult = useMemo(() => searchTasks(tasks, delayedSearch), [tasks, delayedSearch]);

  const contextValue = useMemo(() => ({
    search,
    searchResult,
    query: delayedSearch,
    setSearch: (value: string) => {
      setSearch(value);
      setDelayedSearchDebounced(value);
    },
  }), [search, delayedSearch, searchResult, setSearch, setDelayedSearchDebounced]);

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
