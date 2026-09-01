const KEYS = {
  account: 'cyberdesk.account.v1',
  settings: 'cyberdesk.settings.v1',
  notes: 'cyberdesk.notes.v1',
};

const read = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const storageService = {
  getAccount: () => read(KEYS.account),
  saveAccount: (account) => write(KEYS.account, account),
  getSettings: () => read(KEYS.settings, { theme: 'midnight', wallpaper: 'aurora' }),
  saveSettings: (settings) => write(KEYS.settings, settings),
  getNotes: () => read(KEYS.notes),
  saveNotes: (encryptedNotes) => write(KEYS.notes, encryptedNotes),
};
