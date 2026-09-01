export const apps = [
  { id: 'notes', name: 'Notes', icon: '✎', width: 600, height: 430 },
  { id: 'calculator', name: 'Calculator', icon: '⌗', width: 330, height: 480 },
  { id: 'settings', name: 'Settings', icon: '⚙', width: 520, height: 400 },
  { id: 'clock', name: 'Clock', icon: '◷', width: 390, height: 360 },
  { id: 'browser', name: 'Browser', icon: '◉', width: 760, height: 510 },
  { id: 'files', name: 'File Explorer', icon: '▣', width: 600, height: 410 },
];

export const getApp = (id) => apps.find((app) => app.id === id);
