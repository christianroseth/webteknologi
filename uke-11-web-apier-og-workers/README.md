# Uke 11: Web APIer og Workers

## Læringsmål

Etter denne uken skal du kunne:
- Forklare forskjellen mellom main thread og Web Workers
- Beskrive Service Workers og deres rolle i offline-funksjonalitet
- Forstå livssyklusen til en Service Worker (install, activate, fetch)
- Bruke Cache API for offline-støtte

## Oversikt

JavaScript i nettleseren kjører på **main thread** sammen med rendering. Tunge beregninger blokkerer derfor UI-en. Web Workers og Service Workers løser dette ved å flytte arbeid til egne tråder.

### Web Workers

```javascript
// main.js — kjører på main thread
const worker = new Worker("worker.js");
worker.postMessage({ data: heavyArray });
worker.onmessage = (e) => console.log("Resultat:", e.data);

// worker.js — kjører i egen tråd
self.onmessage = (e) => {
  const result = tungtArbeid(e.data);
  self.postMessage(result);
};
```

**Begrensninger:**
- Ingen tilgang til DOM
- Kommunikasjon via `postMessage` (data kopieres, ikke deles)
- `SharedArrayBuffer` tillater delt minne (krever spesielle HTTP-headers)

### Service Workers

Service Workers sitter **mellom nettleseren og nettverket** som en proxy:

```
Nettleser → Service Worker → Nettverk
                ↓
             Cache API
```

### Livssyklus

```
Registrering → Installasjon → Ventetilstand → Aktivering → Kontroll
```

```javascript
// Registrer
navigator.serviceWorker.register("/sw.js");

// sw.js — Install: fyll cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) =>
      cache.addAll(["/", "/style.css", "/app.js"])
    )
  );
});

// sw.js — Fetch: server fra cache, fall tilbake til nettverk
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request)
    )
  );
});
```

### Cachestrategier

| Strategi | Beskrivelse | Best for |
|----------|-------------|----------|
| Cache first | Sjekk cache, fall tilbake til nettverk | Statiske ressurser |
| Network first | Prøv nettverk, fall tilbake til cache | API-data |
| Stale while revalidate | Server fra cache, oppdater i bakgrunnen | Innhold som tåler litt foreldelse |
| Cache only | Bare cache | Offline-only ressurser |
| Network only | Bare nettverk | Betalinger, autentisering |

### Andre Web APIer

| API | Formål |
|-----|--------|
| Fetch API | HTTP-forespørsler (erstatter XMLHttpRequest) |
| IndexedDB | Klientside-database for store datamengder |
| Web Storage | Enkel nøkkel-verdi-lagring (localStorage, sessionStorage) |
| Notification API | Push-varsler til brukeren |
| Intersection Observer | Effektiv observering av om elementer er synlige |
| Performance API | Presis ytelsesmåling |

## Lesestoff

### Obligatorisk
- [Service Workers — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Service Workers: an Introduction](https://web.dev/articles/service-worker-lifecycle) — web.dev
- [Web Workers — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

### Anbefalt
- [The Offline Cookbook](https://web.dev/articles/offline-cookbook) — Jake Archibald
- [Using the Cache API](https://web.dev/articles/cache-api-quick-guide) — web.dev

## Oppgaver

### Oppgave 1: Service Worker + offline-cache

Lag en enkel nettside med Service Worker som:
1. Cacher `index.html`, `style.css` og `app.js` ved installasjon
2. Serverer cachede filer når brukeren er offline
3. Viser en "Du er offline"-melding for sider som ikke er cachet

Test ved å slå av nettverket i DevTools (Network → Offline).

### Oppgave 2: Web Worker — tung beregning

Lag en side med en teller som oppdateres hvert sekund. Implementer:
1. **Uten Worker:** Kjør en tung beregning (f.eks. finn primtall opp til 10 millioner) på main thread. Observer at telleren fryser.
2. **Med Worker:** Flytt beregningen til en Web Worker. Observer at telleren fortsetter å tikke.

### Oppgave 3: DevTools — Service Worker-inspeksjon

Åpne Application-panelet i DevTools:
1. Besøk en side med Service Worker (f.eks. din egen fra oppgave 1).
2. Inspiser Service Worker-statusen (Registered, Waiting, Active).
3. Sjekk Cache Storage — hva er cachet?
4. Prøv "Update on reload" og "Bypass for network" — hva gjør de?

## Semesteroppgave

**Denne uken:** Innlevering milepæl 4 (Layout). Sørg for at alle tester i `layout.test.ts` passerer.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Web Worker | Separat tråd for JavaScript uten DOM-tilgang |
| Service Worker | Proxy mellom nettleser og nettverk, muliggjør offline |
| Cache API | Programmatisk kontroll over nettleserens cache |
| `postMessage` | Kommunikasjonsmekanisme mellom tråder |
| Offline first | Arkitekturmønster der appen fungerer uten nettverk |
