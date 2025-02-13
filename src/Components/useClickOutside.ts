// hooks/useClickOutside.ts (new)
import React, { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(callback: () => void) => {
  const ref = React.useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [callback]);

  return ref;
};