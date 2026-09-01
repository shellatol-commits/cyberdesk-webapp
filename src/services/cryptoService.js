const encoder = new TextEncoder();
const decoder = new TextDecoder();
const ITERATIONS = 310_000;

const toBase64 = (bytes) => {
  const chunkSize = 8_192;
  let text = '';
  for (let index = 0; index < bytes.length; index += chunkSize) text += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  return btoa(text);
};
const fromBase64 = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

export const cryptoService = {
  createSalt: () => crypto.getRandomValues(new Uint8Array(16)),

  async deriveKey(password, salt) {
    const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
      material,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );
  },

  async encrypt(value, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(JSON.stringify(value)));
    return { iv: toBase64(iv), ciphertext: toBase64(new Uint8Array(encrypted)) };
  },

  async decrypt(payload, key) {
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64(payload.iv) },
      key,
      fromBase64(payload.ciphertext),
    );
    return JSON.parse(decoder.decode(decrypted));
  },

  saltToString: (salt) => toBase64(salt),
  saltFromString: (salt) => fromBase64(salt),
};
