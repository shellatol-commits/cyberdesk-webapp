import { useState } from 'react';

export default function AccountGate({ account, onCreate, onUnlock }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const creating = !account;
  const submit = async (event) => {
    event.preventDefault();
    if (creating && username.trim().length < 2) return setError('Choose a username with at least 2 characters.');
    if (password.length < 10) return setError('Use a password with at least 10 characters.');
    const success = creating ? await onCreate(username.trim(), password) : await onUnlock(password);
    if (!success && !creating) setError('That password could not unlock CyberDesk.');
  };
  return <main className="account-gate"><section className="account-card"><div className="brand"><div className="brand-mark">C</div><span>CyberDesk</span></div><h1>{creating ? 'Welcome to your private desktop' : `Welcome back, ${account.username}`}</h1><p>{creating ? 'Create a local account. Your password never leaves this browser.' : 'Enter your password to decrypt your workspace.'}</p><form onSubmit={submit}>{creating && <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" autoFocus /></label>}<label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={creating ? 'new-password' : 'current-password'} autoFocus={!creating} /></label>{error && <div className="form-error">{error}</div>}<button type="submit">{creating ? 'Create secure desktop' : 'Unlock'}</button></form></section></main>;
}
