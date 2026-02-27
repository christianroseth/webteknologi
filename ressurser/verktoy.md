# Verktøy — Installasjon og oppsett

## Node.js og npm

Node.js brukes for semesteroppgaven og diverse øvingsoppgaver.

### Installasjon

**macOS (med Homebrew):**
```bash
brew install node
```

**Windows / macOS / Linux (anbefalt):**

Bruk [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) for å håndtere Node-versjoner:
```bash
# Installer nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Installer nyeste LTS-versjon
nvm install --lts
nvm use --lts
```

### Verifiser
```bash
node --version   # Bør være v20+ eller v22+
npm --version    # Bør være v10+
```

---

## Visual Studio Code

Anbefalt editor for kurset.

### Nedlasting
- [code.visualstudio.com](https://code.visualstudio.com/)

### Anbefalte utvidelser

| Utvidelse | Beskrivelse |
|-----------|-------------|
| **ESLint** | JavaScript/TypeScript linting |
| **Prettier** | Kodeformatering |
| **TypeScript Importer** | Automatisk import |
| **Vitest** | Testkjøring i editoren |

Installer fra terminalen:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension vitest.explorer
```

---

## Chrome DevTools

DevTools er integrert i Chrome/Chromium-baserte nettlesere.

### Åpne DevTools
- **macOS:** `Cmd + Option + I`
- **Windows/Linux:** `F12` eller `Ctrl + Shift + I`

### Viktige paneler for kurset

| Panel | Brukes i uke | Formål |
|-------|-------------|--------|
| **Elements** | 2, 3, 4 | Inspiser DOM og CSS |
| **Console** | Alle | JavaScript-kjøring og logging |
| **Sources** | 6, 7 | Debugger, breakpoints |
| **Network** | 9, 10 | HTTP-forespørsler, timing |
| **Performance** | 4, 5, 13 | Rendering-profiler, flame charts |
| **Lighthouse** | 13 | Ytelsesaudit og Core Web Vitals |
| **Application** | 11 | Service Workers, cache, storage |
| **Security** | 14 | TLS-sertifikat, sikkerhetsinfo |

---

## Wireshark

Brukes i uke 9 og 10 for nettverksanalyse.

### Installasjon

**macOS:**
```bash
brew install --cask wireshark
```

**Windows:**
Last ned fra [wireshark.org/download](https://www.wireshark.org/download.html).

**Linux (Ubuntu/Debian):**
```bash
sudo apt install wireshark
sudo usermod -aG wireshark $USER
# Logg ut og inn igjen
```

### Verifiser
```bash
wireshark --version
```

### Nyttige filtre for kurset
```
# DNS-oppslag
dns

# TCP handshake
tcp.flags.syn == 1

# TLS handshake
tls.handshake

# HTTP-trafikk (ukryptert)
http

# Filtrer på domene
dns.qry.name contains "example.com"
```

---

## Git

### Installasjon

**macOS:**
```bash
# Git følger med Xcode Command Line Tools
xcode-select --install
# Eller med Homebrew:
brew install git
```

**Windows:**
Last ned fra [git-scm.com](https://git-scm.com/download/win).

### Oppsett
```bash
git config --global user.name "Ditt Navn"
git config --global user.email "din.epost@example.com"
```

---

## V8-flagg (for uke 6–7)

For å utforske V8-motorens indre virkemåte kan du bruke Node.js med V8-flagg:

```bash
# Vis AST (Abstract Syntax Tree)
node --print-ast script.js

# Vis generert bytekode
node --print-bytecode script.js

# Vis JIT-kompilering
node --trace-opt script.js

# Vis deoptimalisering
node --trace-deopt script.js

# Vis garbage collection
node --trace-gc script.js
```

---

## Semesteroppgave — Kom i gang

```bash
# Klon repoet (eller naviger til kursmappen)
cd webteknologi/semesteroppgave

# Installer avhengigheter
npm install

# Kjør tester
npm test

# Kjør tester i watch mode
npm run test:watch

# Start utviklingsserver (for Canvas-visning)
npm run dev
```
