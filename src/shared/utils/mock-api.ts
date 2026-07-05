import { lerp } from 'shared/utils';

export const mockApi = <T extends (...args: any[]) => Promise<any>>(
  delayRange: [number, number], chanceToFail: number, fn: T): (...args: Parameters<T>) => Promise<ReturnType<T>> => {
  return (...args: Parameters<T>) => {
    const delay = lerp(delayRange[0], delayRange[1], Math.random());

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < chanceToFail) {
          reject(new Error('500 Internal Server Error'));
        } else {
          resolve(fn(...args));
        }
      }, delay);
    });
  };
};
