import { useCallback, useState } from 'react';
import { getApp } from '../apps/appRegistry';

const INITIAL_WINDOWS = [];

export function useWindows() {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [topZIndex, setTopZIndex] = useState(2);

  const open = useCallback((app) => {
    const appDefinition = getApp(app);
    if (!appDefinition) return;
    setWindows((current) => {
      const existing = current.find((window) => window.app === app);
      if (existing) return current.map((window) => window.id === existing.id ? { ...window, minimized: false, zIndex: topZIndex + 1 } : window);
      const count = current.length;
      return [...current, { id: app, title: appDefinition.name, app, x: 120 + count * 28, y: 85 + count * 22, width: appDefinition.width, height: appDefinition.height, zIndex: topZIndex + 1 }];
    });
    setTopZIndex((value) => value + 1);
  }, [topZIndex]);

  const update = useCallback((id, changes) => setWindows((current) => current.map((window) => window.id === id ? { ...window, ...changes } : window)), []);
  const close = useCallback((id) => setWindows((current) => current.filter((window) => window.id !== id)), []);
  const focus = useCallback((id) => {
    setTopZIndex((value) => {
      setWindows((current) => current.map((window) => window.id === id ? { ...window, minimized: false, zIndex: value + 1 } : window));
      return value + 1;
    });
  }, []);
  return { windows, open, update, close, focus };
}
