// libraries
import {
  type FC,
  useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import {
  Button,
  InputGroup,
} from '@blueprintjs/core';
import { useVirtualizer } from '@tanstack/react-virtual';

import { DragProvider } from 'app/providers';
import {
  estimateTaskSize,
  type ExpandedTasksState,
  expandSearchResult,
  TaskForm,
  type TaskFormValues, TaskNode,
  useTasks,
} from 'entities/task';
// hooks
import { useSearchTasks } from 'shared/hooks';
import { Drag } from 'shared/ui';

type TaskListProps = {
  onChange?: () => void;
};

export const TaskList: FC<TaskListProps> = () => {
  const {
    tasks, addTask, moveTask, seedTasks,
  } = useTasks();
  const { search, setSearch, searchResult } = useSearchTasks();
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedTasks, setExpandedTasks] = useState<ExpandedTasksState>({});

  const expandedTasksWithSearch = useMemo(() =>
    expandSearchResult(tasks, expandedTasks, searchResult),
  [tasks, expandedTasks, searchResult]);

  const roots = tasks.tasksChildrenByParent.null ?? [];

  const rowVirtualizer = useVirtualizer({
    count: roots.length,
    getScrollElement: () => containerRef.current,
    estimateSize: (index) => estimateTaskSize(tasks, expandedTasksWithSearch, roots[index]),
    gap: 8,
  });

  const handleSubmit = async (task: TaskFormValues) => {
    addTask({ ...task, parentId: null, status: 'queue' });
  };

  const handleDrop = (targetId: string, parentId: string) => {
    if (parentId === 'null') {
      moveTask(targetId, null);
    } else {
      moveTask(targetId, parentId);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleToggleExpand = (id: string, expanded: boolean) => {
    setExpandedTasks((expandedTasksValue) => ({ ...expandedTasksValue, [id]: expanded }));
  };

  const handleSeedData = () => {
    seedTasks();
  };

  useLayoutEffect(() => {
    rowVirtualizer.measure();
  }, [tasks, expandedTasksWithSearch, rowVirtualizer]);

  return (
    <DragProvider onDrop={handleDrop}>
      <Drag className="board" dragDisabled dragId="null">
        <div className="board-header">
          <h2 className="board-title">ETM Board</h2>

          <InputGroup
            className="board-search"
            onChange={handleSearch}
            placeholder="Search..."
            rightElement={<Button icon="search" variant="minimal" />}
            value={search}
          />

          <div className="board-group">
            <Button intent="success" onClick={handleSeedData} size="small">Seed Data</Button>
          </div>
        </div>

        <TaskForm onSubmit={handleSubmit}>
          <Button intent="primary" type="submit">Create Task</Button>
        </TaskForm>

        <div ref={containerRef} className="board-list">
          <div className="board-list-inner" style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                className="board-list-item"
                style={{ height: virtualItem.size, transform: `translateY(${virtualItem.start}px)` }}
              >
                <TaskNode
                  key={roots[virtualItem.index]}
                  expandedTasks={expandedTasksWithSearch}
                  id={roots[virtualItem.index]}
                  onToggleExpand={handleToggleExpand}
                  tasks={tasks}
                />
              </div>
            ))}
          </div>
        </div>
      </Drag>
    </DragProvider>
  );
};
