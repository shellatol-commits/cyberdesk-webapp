import { useState } from 'react';

const locations = {
  home: { name: 'Home', detail: 'Local files', icon: '⌂', children: ['documents', 'notes', 'pictures', 'downloads'] },
  documents: { name: 'Documents', detail: 'Your local workspace', icon: '▰', children: [] },
  notes: { name: 'Notes', detail: 'Encrypted notes are managed in Notes', icon: '✎', children: [] },
  pictures: { name: 'Pictures', detail: 'No local pictures yet', icon: '▧', children: [] },
  downloads: { name: 'Downloads', detail: 'Browser-managed downloads', icon: '⇩', children: [] },
};

const sidebarLocations = ['home', 'documents', 'pictures', 'downloads'];

export default function FileExplorerApp() {
  const [activeLocationId, setActiveLocationId] = useState('home');
  const activeLocation = locations[activeLocationId];
  const openLocation = (locationId) => setActiveLocationId(locationId);
  return <div className="files-app"><aside><b>CyberDesk</b>{sidebarLocations.map((locationId) => <button className={activeLocationId === locationId ? 'selected' : ''} key={locationId} onClick={() => openLocation(locationId)}>{locations[locationId].name}</button>)}</aside><main><header>{activeLocationId !== 'home' && <button className="back-folder" onClick={() => openLocation('home')} aria-label="Back to Home">←</button>}<div><span>{activeLocation.name}</span><small>{activeLocation.detail}</small></div></header>{activeLocation.children.length ? <div className="file-grid">{activeLocation.children.map((locationId) => { const location = locations[locationId]; return <button key={locationId} onDoubleClick={() => openLocation(locationId)} onClick={() => openLocation(locationId)}><span>{location.icon}</span><b>{location.name}</b><small>{location.detail}</small></button>; })}</div> : <div className="folder-empty"><span>{activeLocation.icon}</span><h2>{activeLocationId === 'notes' ? 'Open Notes to access encrypted notes' : `No items in ${activeLocation.name}`}</h2><p>{activeLocationId === 'notes' ? 'Notes stay encrypted and are only available through the Notes app.' : 'Files saved by future CyberDesk apps will appear here.'}</p></div>}<footer>{activeLocation.detail}</footer></main></div>;
}
