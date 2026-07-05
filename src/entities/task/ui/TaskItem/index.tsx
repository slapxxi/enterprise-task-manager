// libraries
import { type FC, useState } from 'react';
import {
  Button,
  Dialog,
  Menu, MenuItem, Popover, Spinner,
  Tag,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
// config
import { TASK_PRIORITY_TO_INTENT, TASK_STATUS_TO_INTENT } from 'entities/task/ui/TaskItem/config';
// types
import type { Nullable } from 'shared/types';

import {
  checkEverySubtask,
  formatDeadline,
  type Task, TaskForm,
  type TaskFormValues, TaskPriorities, type TaskPriority, type TaskStatus,
  useTasks,
} from 'entities/task';
import { useSearchTasks } from 'shared/hooks';
import { Drag } from 'shared/ui';
import { highlightText } from 'shared/utils';

type TaskItemProps = {
  task: Task;
  taskProgress: Nullable<number>;
  children?: React.ReactNode;
  isStatusDisabled?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'>;

export const TaskItem: FC<TaskItemProps> = ({
  task, children, taskProgress, onToggleExpand, onChange,
  isStatusDisabled = false, isExpanded = false, ...rest
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const {
    tasks, addTask, updateTask, deleteTask,
  } = useTasks();
  const { searchResult, query } = useSearchTasks();

  const priorityIntent = TASK_PRIORITY_TO_INTENT[task.priority];
  const statusIntent = TASK_STATUS_TO_INTENT[task.status];
  const taksProgressHumanReadable = Math.floor(taskProgress * 100);
  const isSubtasksDone = checkEverySubtask(tasks, task.id, (subtask) => subtask.status === 'done');
  const expandIconName = isExpanded ? 'chevron-up' : 'chevron-down';
  const searchMatch = searchResult.get(task.id);
  const isExpandDisabled =
    searchResult.has(task.id) || tasks.tasksChildrenByParent[task.id].some((childId) => searchResult.has(childId));
  const formattedDeadline = task.deadline ? formatDeadline(task.deadline) : '';
  const isExpired = task.status === 'expired';

  const handleToggleDialog = () => {
    setIsDialogOpen((isOpen) => !isOpen);
  };

  const handleSubmit = (taskValue: TaskFormValues) => {
    addTask({ ...taskValue, parentId: task.id, status: 'queue' });
    setIsDialogOpen(false);
  };

  const handleSubmitUpdate = (taskValue: TaskFormValues) => {
    updateTask({ ...taskValue, id: task.id });
    setIsEditing(false);
  };

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteTask(task.id);
    setIsDeleteOpen(false);
  };

  const handlePriorityClick = async (priority: TaskPriority) => {
    updateTask({ ...task, priority });
  };

  const handleStatusClick = (status: TaskStatus) => {
    updateTask({ ...task, status });
  };

  const handleToggleEditing = () => {
    setIsEditing((isEditingValue) => !isEditingValue);
  };

  const handleToggleConfirmDelete = () => {
    setIsDeleteOpen((isDeleteOpenValue) => !isDeleteOpenValue);
  };

  const handleToggleExpand = () => {
    onToggleExpand?.(!isExpanded);
  };

  const statusPopoverContent = (
    <Menu>
      <MenuItem onClick={() => handleStatusClick('queue')} text="queue" />
      <MenuItem onClick={() => handleStatusClick('development')} text="development" />
      <MenuItem disabled={!isSubtasksDone} onClick={() => handleStatusClick('done')} text="done" />
    </Menu>
  );

  const priorityPopoverContent = (
    <Menu>
      {TaskPriorities.map((priority) => (
        <MenuItem key={priority} onClick={() => handlePriorityClick(priority)} text={priority} />
      ))}
    </Menu>
  );

  return (
    <Drag
      key={task.id}
      className="task"
      data-expand={isExpanded}
      data-expired={isExpired}
      dragId={task.id}
      parentId={task.parentId}
      {...rest}
    >
      <Dialog isOpen={isDialogOpen} onClose={handleToggleDialog}>
        <TaskForm autoFocus className="task-form" onSubmit={handleSubmit}>
          <Button intent="primary" type="submit">Create Subtask</Button>
        </TaskForm>
      </Dialog>

      <Dialog isOpen={isEditing} onClose={handleToggleEditing}>
        <TaskForm className="task-form" initialValues={task} onSubmit={handleSubmitUpdate}>
          <Button intent="primary" type="submit">Edit</Button>
        </TaskForm>
      </Dialog>

      <Dialog isOpen={isDeleteOpen} onClose={handleToggleConfirmDelete}>
        <form className="form task-form" onSubmit={handleDelete}>
          <p>Are you sure you want to delete this task?</p>
          <Button autoFocus onClick={handleToggleConfirmDelete}>Cancel</Button>
          <Button intent="danger" type="submit">DELETE TASK</Button>
        </form>
      </Dialog>

      <div className="task-container">
        <Button disabled={isExpandDisabled} icon={expandIconName} onClick={handleToggleExpand} variant="minimal" />

        <div className="task-content">
          <div className="task-header">

            <div className="task-title" onClick={handleToggleEditing}>
              {highlightText(task.title, query, searchMatch?.title ?? [])}
            </div>

            <div className="task-group">
              {isExpired && <Tag intent="danger">Expired</Tag>}

              {task.status !== 'done' && taskProgress !== null && (
              <Spinner
                intent="primary"
                size={18}
                title={`Task progress: ${taksProgressHumanReadable}%`}
                value={taskProgress}
              />
              )}
              <Button icon="edit" onClick={handleToggleEditing} size="small" title="New Task" variant="minimal" />
              <Button icon="add" onClick={handleToggleDialog} size="small" title="New Task" variant="minimal" />
              <Button
                icon="delete"
                intent="danger"
                onClick={handleToggleConfirmDelete}
                size="small"
                title="New Task"
                variant="minimal"
              />
            </div>
          </div>

          {isExpanded && (
          <div className="task-body">
            {highlightText(task.description, query, searchMatch?.description ?? [])}
          </div>
          )}

          {isExpanded && (
          <div className="task-footer">
            <div className="task-deadline" data-expired={isExpired}>
              {formattedDeadline}
            </div>

            <div className="task-group">
              {!isExpired && (
              <Popover content={statusPopoverContent}>
                <Button
                  disabled={isStatusDisabled}
                  endIcon={IconNames.CARET_DOWN}
                  intent={statusIntent}
                  size="small"
                  title="Status"
                >
                  {task.status}
                </Button>
              </Popover>
              )}

              <Popover content={priorityPopoverContent}>
                <Button endIcon={IconNames.CARET_DOWN} intent={priorityIntent} size="small">
                  {task.priority}
                </Button>
              </Popover>
            </div>
          </div>
          )}
        </div>
      </div>

      {children}
    </Drag>
  );
};
