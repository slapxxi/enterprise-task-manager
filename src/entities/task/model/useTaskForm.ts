import { type SubmitHandler, useForm } from 'react-hook-form';

import type { Task, TaskFormValues } from 'entities/task';

type UseTaskOptions = {
  initialValues?: Partial<Task>;
  onSubmit: SubmitHandler<TaskFormValues>;
};

export const useTaskForm = ({ initialValues, onSubmit }: UseTaskOptions) => {
  const {
    control, formState: { errors, isSubmitting }, handleSubmit, reset,
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
      priority: initialValues?.priority ?? 'Medium',
      deadline: initialValues?.deadline ?? '',
    },
  });

  return {
    control,
    state: { errors, isSubmitting },
    reset,
    handleSubmit: handleSubmit(onSubmit),
  };
};
