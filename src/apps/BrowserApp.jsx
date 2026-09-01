import { useState } from 'react';

const homePages = [
  { name: 'CyberDesk Guide', address: 'cyberdesk://welcome', copy: 'Your private desktop lives entirely in this browser.' },
  { name: 'Privacy', address: 'cyberdesk://privacy', copy: 'CyberDesk does not upload your account, notes, or settings.' },
];

export default function BrowserApp() {
  const [address, setAddress] = useState('cyberdesk://welcome');
  const [page, setPage] = useState(homePages[0]);
  const navigate = (event) => {
    event.preventDefault();
    const builtInPage = homePages.find((candidate) => candidate.address === address.trim());
    if (builtInPage) return setPage(builtInPage);
    const destination = address.startsWith('http://') || address.startsWith('https://') ? address : `https://${address}`;
    globalThis.open(destination, '_blank', 'noopener,noreferrer');
    setPage({ name: 'Opened in a new tab', address: destination, copy: 'For safety, external websites open in a separate browser tab.' });
  };
  return <div className="browser-app"><form onSubmit={navigate}><input value={address} onChange={(event) => setAddress(event.target.value)} aria-label="Website address" /><button type="submit">Go</button></form><article><div className="browser-logo">◉</div><h2>{page.name}</h2><p>{page.copy}</p><small>{page.address}</small><div className="browser-links">{homePages.map((item) => <button key={item.address} onClick={() => { setAddress(item.address); setPage(item); }}>{item.name}</button>)}</div></article></div>;
}
