/**
 * Performance Monitoring Utilities
 *
 * This module provides utilities for monitoring and optimizing application performance.
 * It includes functions for measuring performance metrics and optimizing components.
 */

/**
 * Measures the performance of a function
 * @param fn - The function to measure
 * @param name - The name of the measurement
 * @returns The result of the function and performance metrics
 */
export const measurePerformance = <T>(
  fn: () => T,
  name: string
): { result: T; duration: number } => {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;

  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  return { result, duration };
};

/**
 * Creates a memoized version of a component with performance tracking
 * @param Component - The component to memoize
 * @param name - The name of the component
 * @returns A memoized version of the component
 */
export const memoizeComponent = <P extends object>(
  Component: React.ComponentType<P>,
  name: string
): React.MemoExoticComponent<React.ComponentType<P>> => {
  return React.memo(Component, (prevProps, nextProps) => {
    const { duration } = measurePerformance(() => {
      const prevKeys = Object.keys(prevProps);
      const nextKeys = Object.keys(nextProps);

      if (prevKeys.length !== nextKeys.length) return false;

      return prevKeys.every((key) => {
        const prevValue = prevProps[key as keyof P];
        const nextValue = nextProps[key as keyof P];

        if (
          typeof prevValue === "function" &&
          typeof nextValue === "function"
        ) {
          return prevValue.toString() === nextValue.toString();
        }

        return prevValue === nextValue;
      });
    }, `${name} Props Comparison`);

    return duration < 1; // Only re-render if comparison takes less than 1ms
  });
};

/**
 * Debounces a function to improve performance
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttles a function to improve performance
 * @param fn - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns A throttled version of the function
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  let lastFn: NodeJS.Timeout;
  let lastTime: number;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= limit) {
          fn(...args);
          lastTime = Date.now();
        }
      }, limit - (Date.now() - lastTime));
    }
  };
};
