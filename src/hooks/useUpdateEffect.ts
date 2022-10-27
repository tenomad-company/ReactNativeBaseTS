import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

// Ignore first run

export default function useUpdateEffect(
  callback: EffectCallback,
  deps?: DependencyList,
) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
