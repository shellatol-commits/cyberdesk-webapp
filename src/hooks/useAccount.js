import { useCallback, useEffect, useState } from 'react';
import { cryptoService } from '../services/cryptoService';
import { storageService } from '../services/storageService';

export function useAccount() {
  const [account, setAccount] = useState(null);
  const [key, setKey] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAccount(storageService.getAccount());
    setReady(true);
  }, []);

  const createAccount = useCallback(async (username, password) => {
    const salt = cryptoService.createSalt();
    const derivedKey = await cryptoService.deriveKey(password, salt);
    const verifier = await cryptoService.encrypt({ valid: true }, derivedKey);
    const newAccount = { username, salt: cryptoService.saltToString(salt), verifier };
    storageService.saveAccount(newAccount);
    setAccount(newAccount);
    setKey(derivedKey);
  }, []);

  const unlock = useCallback(async (password) => {
    if (!account) return false;
    try {
      const derivedKey = await cryptoService.deriveKey(password, cryptoService.saltFromString(account.salt));
      const verification = await cryptoService.decrypt(account.verifier, derivedKey);
      if (!verification.valid) return false;
      setKey(derivedKey);
      return true;
    } catch {
      return false;
    }
  }, [account]);

  const lock = useCallback(() => setKey(null), []);
  return { account, createAccount, key, lock, ready, unlock };
}
