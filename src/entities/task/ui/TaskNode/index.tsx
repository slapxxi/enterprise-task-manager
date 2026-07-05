import type { FC } from 'react';
import type { ID } from 'shared/types';

import type { ExpandedTasksState, TasksState } from 'entities/task';
import { calculateTaskProgress, TaskItem } from 'entities/task';

type TaskProps = {
  id: ID;
  tasks: TasksState;
  expandedTasks: ExpandedTasksState;
  nesting?: number;
  onToggleExpand?: (id: ID, expanded: boolean) => void;
};

type CSSVars = {
  '--nesting': number;
} & React.CSSProperties;

export const TaskNode:FC<TaskProps> = ({
  id, tasks, expandedTasks, onToggleExpand, nesting = 0,
}) => {
  const task = tasks.tasksById[id];
  const parent = tasks.tasksById[task.parentId];
  const childIds = tasks.tasksChildrenByParent[id];
  const isExpanded = id in expandedTasks ? expandedTasks[id] : false;

  const taskProgress = childIds.length === 0 ? null : calculateTaskProgress(tasks, id);
  const isParentDone = parent?.status === 'done';

  const style: CSSVars = {
    '--nesting': nesting,
  };

  const handleToggleExpand = (expanded: boolean) => {
    onToggleExpand?.(id, expanded);
  };

  return (
    <TaskItem
      isExpanded={isExpanded}
      isStatusDisabled={isParentDone}
      onToggleExpand={handleToggleExpand}
      style={style}
      task={task}
      taskProgress={taskProgress}
    >
      {childIds.map((childId) => (
        <TaskNode
          key={childId}
          expandedTasks={expandedTasks}
          id={childId}
          nesting={nesting + 1}
          onToggleExpand={onToggleExpand}
          tasks={tasks}
        />
      ))}
    </TaskItem>
  );
};
