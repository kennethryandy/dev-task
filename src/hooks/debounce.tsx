interface DebounceOptions<_T> {
  wait: number;
  leading?: boolean;
}

export const useDebounce = <T extends (...args: any[]) => ReturnType<T>>(
  fn: T,
  options: DebounceOptions<T> = {
    wait: 900,
    leading: false,
  }
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (!options.leading) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, options.wait);
    } else {
      fn(...args);
    }
  };
};
