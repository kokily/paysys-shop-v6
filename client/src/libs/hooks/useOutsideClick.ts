import { useCallback, useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement = HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [onClick]);

  return ref;
}
