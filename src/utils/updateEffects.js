import { useRef, useLayoutEffect, useEffect } from 'react';

function useFirstMountState() {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

export const useUpdateLayoutEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useLayoutEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    return () => {};
  }, deps);
};

export const useUpdateEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    return () => {};
  }, deps);
};
