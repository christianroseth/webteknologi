# Uke 8: Event loop og asynkronitet

## Læringsmål

Etter denne uken skal du kunne:
- Forklare event loopen i detalj: call stack, task queue, microtask queue
- Forutsi rekkefølgen av `setTimeout`, `Promise`, `queueMicrotask` og `requestAnimationFrame`
- Beskrive forskjellen mellom makro- og mikrooppgaver
- Forstå hvordan event loopen samhandler med rendering

## Oversikt

JavaScript er **entrådet** — bare én ting kjører om gangen. Likevel kan nettlesere håndtere tusenvis av samtidige hendelser uten å fryse. Hemmeligheten er **event loopen**.

### Event loop-modellen

```
┌──────────────────────────────┐
│         Call Stack            │ ← Synkron kjøring
└──────────────┬───────────────┘
               │ (tom?)
               ▼
┌──────────────────────────────┐
│       Microtask Queue         │ ← Promise.then, queueMicrotask
│  (tømmes HELT før neste steg) │
└──────────────┬───────────────┘
               │ (tom?)
               ▼
┌──────────────────────────────┐
│     Rendering (om nødvendig)  │ ← rAF, style, layout, paint
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Task Queue             │ ← setTimeout, setInterval, I/O
│    (tar ÉN oppgave)          │
└──────────────┴───────────────┘
         ↑          │
         └──────────┘  (løkken gjentar)
```

### Makro- vs. mikrooppgaver

| Type | Eksempler | Når kjøres de? |
|------|-----------|----------------|
| Makrooppgave (task) | `setTimeout`, `setInterval`, I/O, UI-hendelser | Én per iterasjon av event loopen |
| Mikrooppgave (microtask) | `Promise.then`, `queueMicrotask`, `MutationObserver` | ALLE tømmes etter hver makrooppgave |

### Klassisk puslespill

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
```

**Forklaring:**
1. `"1"` — synkront, kjøres umiddelbart
2. `setTimeout` — legges i task queue
3. `Promise.then` — legges i microtask queue
4. `"4"` — synkront, kjøres umiddelbart
5. Call stack tom → tøm microtask queue → `"3"`
6. Rendering-mulighet (nettleseren kan male et nytt bilde her, om nødvendig)
7. Neste event loop-iterasjon → ta fra task queue → `"2"`

Steg 6 er grunnen til at `requestAnimationFrame`-callbacks kjøres *mellom* mikrotask-tømming og neste makrotask. Det er også grunnen til at en uendelig løkke av mikrotasks (f.eks. `Promise.then` som kaller seg selv) kan henge nettleseren — rendering-trinnet nås aldri.

### `requestAnimationFrame`

`rAF` kjøres rett **før** nettleseren rendrer et nytt bilde (vanligvis 60 fps = hvert 16.6ms):

```javascript
// Riktig for animasjoner — synkronisert med skjermens oppdatering
function animate() {
  element.style.transform = `translateX(${pos}px)`;
  pos++;
  requestAnimationFrame(animate);
}
```

## Lesestoff

### Obligatorisk
- [The event loop — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) — Jake Archibald ([arkiv](https://web.archive.org/web/2024/https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/))
- [Inside look at modern web browser (Part 3)](https://developer.chrome.com/blog/inside-browser-part3) — Event loop-seksjonen

### Anbefalt
- [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) — Philip Roberts (video)
- [In The Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0) — Jake Archibald (video, JSConf 2018)

## Oppgaver

### Oppgave 1: Forutsi output

Skriv ned forventet output **før** du kjører koden:

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);

Promise.resolve().then(() => {
  console.log("D");
  setTimeout(() => console.log("E"), 0);
});

console.log("F");
```

### Oppgave 2: Bygg en event loop-simulator

Lag en forenklet event loop i JavaScript:

```javascript
class EventLoop {
  constructor() {
    this.callStack = [];
    this.taskQueue = [];
    this.microtaskQueue = [];
  }

  // Implementer: addTask, addMicrotask, run
}
```

Simulatoren skal demonstrere at mikrotasks tømmes helt før neste makrotask.

### Oppgave 3: rAF-timing

Lag en side med to animasjoner:
1. En som bruker `setTimeout(fn, 16)` for å flytte en boks
2. En som bruker `requestAnimationFrame(fn)` for å flytte en boks

Sammenlign jevnheten (smoothness). Bruk Performance-panelet til å se forskjellen i timing.

## Semesteroppgave

**Denne uken:** Innlevering milepæl 3 (Style tree). Sørg for at alle tester i `stil.test.ts` passerer.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Event loop | Mekanisme som koordinerer asynkron kjøring i JavaScript |
| Call stack | LIFO-struktur for aktive funksjonsanrop |
| Task queue | Kø for makrooppgaver (setTimeout, I/O) |
| Microtask queue | Kø for mikrooppgaver (Promises) — tømmes helt mellom hver task |
| `requestAnimationFrame` | Callback som kjøres synkronisert med skjermens oppdateringsfrekvens |
