import { useEffect, useState } from 'react';
import CalculatorApp from './apps/CalculatorApp';
import BrowserApp from './apps/BrowserApp';
import ClockApp from './apps/ClockApp';
import FileExplorerApp from './apps/FileExplorerApp';
import NotesApp from './apps/NotesApp';
import SettingsApp from './apps/SettingsApp';
import AccountGate from './components/AccountGate';
import AppErrorBoundary from './components/AppErrorBoundary';
import BootScreen from './components/BootScreen';
import DesktopIcons from './components/DesktopIcons';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import { useAccount } from './hooks/useAccount';
import { useWindows } from './hooks/useWindows';
import { storageService } from './services/storageService';

function App() {
  const { account, createAccount, key, lock, ready, unlock } = useAccount();
  const { windows, open, update, close, focus } = useWindows();
  const [settings, setSettings] = useState(() => storageService.getSettings());
  const [startOpen, setStartOpen] = useState(false);
  useEffect(() => storageService.saveSettings(settings), [settings]);
  if (!ready) return <BootScreen />;
  if (!key) return <AccountGate account={account} onCreate={createAccount} onUnlock={unlock} />;
  const renderApp = (window) => ({
    notes: <NotesApp encryptionKey={key} />,
    calculator: <CalculatorApp />,
    browser: <BrowserApp />,
    clock: <ClockApp />,
    files: <FileExplorerApp />,
    settings: <SettingsApp settings={settings} onChange={setSettings} />,
  }[window.app]);
  const openApp = (app) => { open(app); setStartOpen(false); };
  return <main className={`desktop wallpaper-${settings.wallpaper}`} onPointerDown={() => startOpen && setStartOpen(false)}><DesktopIcons onOpen={openApp} />{startOpen && <StartMenu onOpen={openApp} />}{windows.filter((window) => !window.minimized).map((window) => <Window key={window.id} window={window} onClose={close} onFocus={focus} onUpdate={update}><AppErrorBoundary appId={window.app}>{renderApp(window)}</AppErrorBoundary></Window>)}<Taskbar windows={windows} onFocus={focus} onLock={lock} startOpen={startOpen} setStartOpen={setStartOpen} /></main>;
}
export default App;
