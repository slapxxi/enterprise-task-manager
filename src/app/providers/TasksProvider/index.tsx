// libraries
import {
  createContext, type FC, startTransition,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { OverlayToaster } from '@blueprintjs/core';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
// config
import { GENERATE_SEED_DATA } from 'app/config';

import {
  addTask,
  buildDeadlines,
  createTaskData,
  expireTasks,
  moveTask, sortTasksByPriority, type Task, type TasksState,
  updateTask,
} from 'entities/task';
import { deleteTask } from 'entities/task/utils/delete-task';
import { useOptimisticState } from 'shared/hooks';

type TasksContextType = {
  tasks: TasksState,
  addTask: (task: Omit<Task, 'id'>) => void,
  updateTask: (task: Partial<Task>) => void,
  moveTask: (id: string, newParentId: string) => void
  deleteTask: (id: string) => void,
  seedTasks: () => void,
};

export const TasksContext = createContext<TasksContextType>(null);

type StoreProviderProps = {
  children: React.ReactNode;
};

export const TasksProvider: FC<StoreProviderProps> = ({ children }) => {
  const deadlineWorkerRef = useRef<Worker>();
  const toasterRef = useRef<OverlayToaster>(null);
  const {
    optimisticState: optimisticTasksState,
    setOptimisticState: setOptimisticTasksState,
    setOptimistic,
  } = useOptimisticState<TasksState>({
    initialState: { tasksById: {}, tasksChildrenByParent: {} },
    onError: () => {
      toasterRef.current?.show({
        message: 'Error while saving data',
        intent: 'danger',
      });
    },
  });

  const sortedTasksState = useMemo(() => sortTasksByPriority(optimisticTasksState), [optimisticTasksState]);

  const contextValue = useMemo<TasksContextType>(() => ({
    tasks: sortedTasksState,

    addTask: async (task) => {
      setOptimistic(
        (state) => addTask(state, { ...task, id: nanoid() }),
        async () => {
          await createTaskData(optimisticTasksState);
        },
      );
    },

    updateTask: (task) => {
      setOptimistic(
        (state) => {
          const prevTaskValue = state.tasksById[task.id];
          const newTaskValue: Partial<Task> = { ...task };

          if (prevTaskValue.status === 'expired') {
            if (!task.deadline || dayjs(task.deadline).isAfter(Date.now())) {
              newTaskValue.status = 'queue';
            }
          }

          return updateTask(state, task.id, newTaskValue);
        },
        async () => {
          await createTaskData(optimisticTasksState);
        });
    },

    deleteTask: (id) => {
      setOptimistic(
        (state) => deleteTask(state, id),
        async () => {
          await createTaskData(optimisticTasksState);
        },
      );
    },

    moveTask: (id: string, newParentId: string) => {
      setOptimistic(
        (state) => moveTask(state, id, newParentId),
        async () => {
          await createTaskData(optimisticTasksState);
        },
      );
    },

    seedTasks: () => {
      startTransition(() => {
        setOptimisticTasksState(GENERATE_SEED_DATA());
      });
    },
  }), [sortedTasksState, optimisticTasksState, setOptimistic, setOptimisticTasksState]);

  useEffect(() => {
    deadlineWorkerRef.current = new Worker(new URL('/deadline-worker.js', import.meta.url));

    return () => deadlineWorkerRef.current.terminate();
  }, []);

  useEffect(() => {
    const handleMessage = ({ data }: MessageEvent) => {
      const { type, payload } = data;

      switch (type) {
        case 'deadlines-expired':
          expireTasks(optimisticTasksState, Object.keys(payload));

          break;

        default:
          break;
      }
    };

    deadlineWorkerRef.current.addEventListener('message', handleMessage);

    deadlineWorkerRef.current.postMessage({ type: 'deadlines-replace', payload: buildDeadlines(optimisticTasksState) });

    return () => deadlineWorkerRef.current.removeEventListener('message', handleMessage);
  }, [optimisticTasksState]);

  return (
    <TasksContext.Provider value={contextValue}>
      <OverlayToaster ref={toasterRef} />
      {children}
    </TasksContext.Provider>
  );
};
