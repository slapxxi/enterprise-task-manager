// libraries
import { type FC } from 'react';
import { Controller } from 'react-hook-form';
import {
  Button, FormGroup, InputGroup, Menu, MenuItem, Popover,
  TextArea,
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';

import { enUS } from 'date-fns/locale';
import {
  type Task, type TaskFormValues, TaskPriorities,
  useTaskForm,
} from 'entities/task';

type TaskFormProps = {
  initialValues?: Partial<Task>;
  autoFocus?: boolean;
  onSubmit: (task: TaskFormValues) => void;
  children?: React.ReactNode;
  className?: string;
};

export const TaskForm: FC<TaskFormProps> = ({
  autoFocus, initialValues, onSubmit, children, className,
}) => {
  const {
    state, control, handleSubmit, reset,
  } = useTaskForm({
    initialValues,
    onSubmit: (taskFormValues) => {
      onSubmit(taskFormValues);
      reset();
    },
  });

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <FormGroup helperText={state.errors.title?.message}>
            <InputGroup
              autoFocus={autoFocus}
              intent={state.errors.title ? 'danger' : 'none'}
              placeholder="Create task..."
              {...field}
              rightElement={(
                <Controller
                  control={control}
                  name="priority"
                  render={({ field: priorityField }) => (
                    <Popover
                      content={(
                        <Menu>
                          {TaskPriorities.map((priorityValue) => (
                            <MenuItem
                              key={priorityValue}
                              onClick={() => priorityField.onChange(priorityValue)}
                              text={priorityValue}
                            />
                          ))}
                        </Menu>
)}
                    >
                      <Button endIcon={IconNames.CARET_DOWN} variant="minimal">{priorityField.value}</Button>
                    </Popover>
                  )}
                />
          )}
            />
          </FormGroup>
        )}
        rules={{ required: 'Title is required' }}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <FormGroup helperText={state.errors.description?.message}>
            <TextArea
              fill
              intent={state.errors.description ? 'danger' : 'none'}
              placeholder="Description..."
              {...field}
            />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name="deadline"
        render={({ field }) => (
          <FormGroup helperText={state.errors.deadline?.message}>
            <DateInput
              dateFnsLocaleLoader={() => Promise.resolve(enUS)}
              onChange={field.onChange}
              timePrecision="second"
              value={field.value}
            />
          </FormGroup>
        )}
      />

      {children}
    </form>
  );
};
