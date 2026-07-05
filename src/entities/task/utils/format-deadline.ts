import dayjs from 'dayjs';

export const formatDeadline = (deadline: string) => {
  const dayjsDeadline = dayjs(deadline);

  return `${dayjsDeadline.format('DD-MM-YY HH:mm')} (${dayjsDeadline.fromNow()})`;
};
