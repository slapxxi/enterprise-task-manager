export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): T => {
  let timeoutId: ReturnType<typeof setTimeout>;
  let called = false;

  return ((...args: Parameters<T>) => {
    if (called) {
      clearTimeout(timeoutId);
    }

    called = true;
    timeoutId = setTimeout(() => {
      called = false;
      fn(...args);
    }, delay);
  }) as T;
};
