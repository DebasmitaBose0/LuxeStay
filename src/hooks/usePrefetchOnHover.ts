import { useRef } from 'react';

const prefetchCache = new Map<string, any>();

type Fetcher = () => Promise<any> | Promise<null>;

/**
 * Simple prefetch-on-hover hook.
 * - Calls `fetcher` once per `key` and caches the result in-memory.
 * - Returns event handlers to spread onto interactive elements.
 * - Respects keyboard focus via onFocus/onBlur.
 */
export function usePrefetchOnHover(key: string, fetcher: Fetcher) {
  const inFlightRef = useRef(false);

  const run = () => {
    if (prefetchCache.has(key) || inFlightRef.current) return;
    inFlightRef.current = true;
    // fire and cache; ignore errors
    Promise.resolve()
      .then(() => fetcher())
      .then((res) => {
        prefetchCache.set(key, res);
      })
      .catch(() => {})
      .finally(() => {
        inFlightRef.current = false;
      });
  };

  return {
    onMouseEnter: () => run(),
    onFocus: () => run(),
    onMouseLeave: () => {},
    onBlur: () => {},
  } as const;
}

export function getPrefetched(key: string) {
  return prefetchCache.get(key);
}
