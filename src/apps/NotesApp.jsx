import { useEffect, useState } from 'react';
import { cryptoService } from '../services/cryptoService';
import { storageService } from '../services/storageService';

export default function NotesApp({ encryptionKey }) {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [status, setStatus] = useState('Loading encrypted notes…');
  const activeNote = notes.find((note) => note.id === activeId);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const encrypted = storageService.getNotes();
      if (!encrypted) { if (active) setStatus('All notes are encrypted locally.'); return; }
      try {
        const decrypted = await cryptoService.decrypt(encrypted, encryptionKey);
        if (active) { setNotes(decrypted); setActiveId(decrypted[0]?.id ?? null); setStatus('Encrypted locally'); }
      } catch { if (active) setStatus('Unable to decrypt saved notes.'); }
    };
    load(); return () => { active = false; };
  }, [encryptionKey]);

  const persist = async (nextNotes) => {
    setNotes(nextNotes);
    storageService.saveNotes(await cryptoService.encrypt(nextNotes, encryptionKey));
    setStatus('Encrypted locally');
  };
  const addNote = async () => {
    const note = { id: crypto.randomUUID(), title: 'Untitled note', body: '', updatedAt: Date.now() };
    setActiveId(note.id); await persist([note, ...notes]);
  };
  const updateNote = async (changes) => activeNote && persist(notes.map((note) => note.id === activeId ? { ...note, ...changes, updatedAt: Date.now() } : note));
  const deleteNote = async () => {
    if (!activeNote || !globalThis.confirm(`Delete “${activeNote.title || 'Untitled note'}”? This cannot be undone.`)) return;
    const nextNotes = notes.filter((note) => note.id !== activeId);
    setActiveId(nextNotes[0]?.id ?? null);
    await persist(nextNotes);
  };
  return <div className="notes-app"><aside><button className="new-note" onClick={addNote}>+ New note</button><div className="note-list">{notes.map((note) => <button className={note.id === activeId ? 'selected' : ''} onClick={() => setActiveId(note.id)} key={note.id}><strong>{note.title || 'Untitled note'}</strong><small>{new Date(note.updatedAt).toLocaleDateString()}</small></button>)}</div></aside><main>{activeNote ? <><div className="note-toolbar"><input className="note-title" value={activeNote.title} onChange={(event) => updateNote({ title: event.target.value })} aria-label="Note title" /><button className="delete-note" onClick={deleteNote}>Delete</button></div><textarea value={activeNote.body} onChange={(event) => updateNote({ body: event.target.value })} placeholder="Write something private…" aria-label="Note content" /></> : <div className="notes-empty">Create a note to get started.</div>}<footer>{status}</footer></main></div>;
}
