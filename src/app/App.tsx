// libraries
import { type FC } from 'react';
import 'shared/lib/dayjs';

import { SearchTasksProvider, TasksProvider } from 'app/providers';
import { TaskList } from 'entities/task';

const App: FC = () => {
  return (
    <TasksProvider>
      <SearchTasksProvider>
        <TaskList />
      </SearchTasksProvider>
    </TasksProvider>
  );
};

export default App;
