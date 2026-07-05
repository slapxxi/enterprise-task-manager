/**
  * Linear interpolation between two numbers
  * @param a - start value
  * @param b - end value
  * @param t - interpolation value
  * @returns interpolated value
*/
// стандеартное имя для такого рода функций, так же как и clamp, min, max и т.д. (не ии комментарий)
export const lerp = (a: number, b: number, t: number): number => a * (1 - t) + b * t;
