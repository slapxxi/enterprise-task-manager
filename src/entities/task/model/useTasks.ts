import { useContext } from 'react';

import { TasksContext } from 'app/providers';

export const useTasks = () => {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) {
    throw new Error('useTasks must be used within a TasksProvider');
  }

  return tasksContext;
};
