export const debugTarget = (event: React.UIEvent) => {
  const target = event.target as HTMLElement;
  const currentTarget = event.currentTarget as HTMLElement;

  if (Object.is(target, currentTarget)) {
    currentTarget.style.filter = 'url(#red-outline) url(#green-outline)';

    return;
  }

  currentTarget.style.filter = 'url(#green-outline)';
  target.style.filter = 'url(#red-outline)';
};

export const removeDebugTarget = (event: React.UIEvent) => {
  const target = event.target as HTMLElement;
  const currentTarget = event.currentTarget as HTMLElement;

  currentTarget.style.filter = '';
  target.style.filter = '';
};
