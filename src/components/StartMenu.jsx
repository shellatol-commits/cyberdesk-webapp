import { apps } from '../apps/appRegistry';
export default function StartMenu({ onOpen }) { return <aside className="start-menu"><div className="start-title">Applications</div>{apps.map((app) => <button key={app.id} onClick={() => onOpen(app.id)}><span>{app.icon}</span>{app.name}</button>)}</aside>; }
