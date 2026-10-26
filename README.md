# CyberLab Academy — starter project

A responsive, browser-based cybersecurity learning prototype inspired by common cyber-training platforms. It is not affiliated with Hackversity.

## Run on Windows
1. Extract this ZIP.
2. Keep `index.html`, `styles.css`, and `app.js` in the same folder.
3. Double-click `index.html` to open it in a browser.
4. If preferred, open Command Prompt in this folder and run `py -m http.server 8000`, then visit http://localhost:8000.

## Included
- Responsive dashboard and mobile navigation
- Learning path lessons for Linux and SOC alert triage
- Safe, fictional log-review and alert-triage exercises
- Five-question knowledge quiz
- Local progress saved in browser localStorage

## Limitations
This is a front-end starter. It has no real user accounts, server database, cloud sync, hosted virtual machines, or verified certificates. Progress is saved only in the current browser. Do not enter real passwords or sensitive information. Practice only on systems you own or are authorized to test.

## Files
- `index.html` — app layout
- `styles.css` — responsive dark theme
- `app.js` — navigation, simulated exercises, quiz, and local progress


## Login page (demo only)
This starter includes a sign-in and create-account screen. Accounts are stored in this browser's localStorage for demonstration. Passwords are not securely hashed, so use a made-up test password only. This is NOT production authentication and must not be exposed as a public service. For a real launch, add a server-side authentication provider, hashed passwords, secure sessions, HTTPS, and appropriate security controls.

Open `index.html` in a browser. Select **Create account** for the first run, enter a display name, email, and a made-up password of at least 8 characters.
