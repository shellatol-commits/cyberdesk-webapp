import { apps } from '../apps/appRegistry';
export default function DesktopIcons({ onOpen }) { return <nav className="desktop-icons">{apps.map((app) => <button key={app.id} onDoubleClick={() => onOpen(app.id)} onClick={() => onOpen(app.id)}><span>{app.icon}</span>{app.name}</button>)}</nav>; }
