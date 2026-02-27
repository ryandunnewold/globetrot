'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'globetrot:visited';

export function useVisited() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setVisited(new Set(JSON.parse(stored) as string[]));
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const toggle = useCallback((isoNumeric: string) => {
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(isoNumeric)) {
        next.delete(isoNumeric);
      } else {
        next.add(isoNumeric);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isVisited = useCallback(
    (isoNumeric: string) => visited.has(isoNumeric),
    [visited]
  );

  return { visited, toggle, isVisited, hydrated };
}
