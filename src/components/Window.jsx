import { useRef } from 'react';
const MIN_WIDTH = 300;
const MIN_HEIGHT = 220;
export default function Window({ window, onClose, onFocus, onUpdate, children }) {
  const drag = useRef(null);
  const startDrag = (event) => {
    if (window.maximized || event.target.closest('button')) return;
    onFocus(window.id); drag.current = { x: event.clientX, y: event.clientY, left: window.x, top: window.y };
    const move = (moveEvent) => onUpdate(window.id, { x: Math.max(0, drag.current.left + moveEvent.clientX - drag.current.x), y: Math.max(0, drag.current.top + moveEvent.clientY - drag.current.y) });
    const end = () => { globalThis.removeEventListener('pointermove', move); globalThis.removeEventListener('pointerup', end); };
    globalThis.addEventListener('pointermove', move); globalThis.addEventListener('pointerup', end);
  };
  const startResize = (event) => {
    event.stopPropagation(); onFocus(window.id); const origin = { x: event.clientX, y: event.clientY, width: window.width, height: window.height };
    const move = (moveEvent) => onUpdate(window.id, { width: Math.max(MIN_WIDTH, origin.width + moveEvent.clientX - origin.x), height: Math.max(MIN_HEIGHT, origin.height + moveEvent.clientY - origin.y) });
    const end = () => { globalThis.removeEventListener('pointermove', move); globalThis.removeEventListener('pointerup', end); };
    globalThis.addEventListener('pointermove', move); globalThis.addEventListener('pointerup', end);
  };
  const style = window.maximized ? {} : { left: window.x, top: window.y, width: window.width, height: window.height, zIndex: window.zIndex };
  return <section className={`window ${window.maximized ? 'maximized' : ''}`} style={style} onPointerDown={() => onFocus(window.id)}><header className="window-titlebar" onPointerDown={startDrag}><span>{window.title}</span><div><button onClick={() => onUpdate(window.id, { minimized: true })}>—</button><button onClick={() => onUpdate(window.id, { maximized: !window.maximized })}>□</button><button className="close" onClick={() => onClose(window.id)}>×</button></div></header><div className="window-content">{children}</div>{!window.maximized && <div className="resize-handle" onPointerDown={startResize} />}</section>;
}
