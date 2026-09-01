export default function Taskbar({ windows, onFocus, onLock, startOpen, setStartOpen }) {
  const toggleStart = (event) => { event.stopPropagation(); setStartOpen(!startOpen); };
  return <footer className="taskbar"><button className="start-button" onClick={toggleStart} aria-label="Open Start menu">⊞</button>{windows.map((window) => <button key={window.id} className={`task-button ${window.minimized ? '' : 'active'}`} onClick={() => onFocus(window.id)}>{window.title}</button>)}<div className="taskbar-spacer" /><button className="lock-button" onClick={onLock} title="Lock CyberDesk">⌁</button><time>{new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date())}</time></footer>;
}
