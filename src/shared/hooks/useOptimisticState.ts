// libraries
import { useEffect, useRef, useState } from 'react';

type UseOptimisticStateOptions<T> = {
  initialState: T;
  onError?: () => void;
};

type OptimisticCallback<T> = (state: T) => T;

type AsyncCallback = () => Promise<void>;

export const useOptimisticState = <T>({ initialState, onError }: UseOptimisticStateOptions<T>) => {
  const [state, setState] = useState(initialState);
  const [optimisticState, setOptimisticState] = useState(initialState);
  const [updates, setUpdates] = useState([]);
  const waitingRef = useRef(false);

  const setOptimistic = (optimisticCallback: OptimisticCallback<T>, asyncCallback: AsyncCallback) => {
    const newOptimisticState = optimisticCallback(optimisticState);

    setOptimisticState(newOptimisticState);

    setUpdates((updatesValue) => [...updatesValue, asyncCallback]);
  };

  useEffect(() => {
    if (waitingRef.current) {
      return;
    }

    if (updates.length === 0) {
      return;
    }

    const nextUpdate = updates[0];

    waitingRef.current = true;

    nextUpdate().then(() => {
      setState(optimisticState);
      setUpdates((updatesValue) => [...updatesValue.slice(1)]);
    }).catch(() => {
      setOptimisticState(state);
      setUpdates([]);
      onError?.();
    }).finally(() => {
      waitingRef.current = false;
    });
  }, [updates, state, onError, optimisticState]);

  return {
    state,
    optimisticState,
    setState,
    setOptimisticState,
    setOptimistic,
  };
};
