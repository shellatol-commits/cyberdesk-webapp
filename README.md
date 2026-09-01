# CyberDesk

CyberDesk is a static, browser-based desktop environment built with React and Vite.

## Current foundation

- First-launch account creation and password-based unlock flow
- PBKDF2-derived AES-GCM encryption using the Web Crypto API
- Encrypted Notes data stored in localStorage (no plaintext persisted)
- Reusable window manager with focus, drag, resize, minimize, maximize, close, and taskbar integration
- Desktop, taskbar, Start menu, app icons, Settings, Notes, and Calculator

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. The Vite `base: './'` configuration supports static hosting, including GitHub Pages.

## Data and privacy

CyberDesk never sends account data, passwords, settings, or notes to a server. The password is never stored. The account record contains only a username, a cryptographic salt, and an encrypted verifier; saved notes contain only AES-GCM ciphertext and an IV.
