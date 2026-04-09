# Uke 1: Internett og nettleseren — det store bildet

## Læringsmål

Etter denne uken skal du kunne:
- Beskrive de viktigste komponentene i internettets infrastruktur (DNS, TCP/IP, HTTP)
- Forklare nettleserens hovedkomponenter og deres roller
- Skissere den overordnede reisen fra URL til piksler
- Skille mellom nettverks-, parsings-, og renderingsfasen

## Oversikt

Denne uken setter vi scenen. Før vi dykker ned i detaljer, trenger du et mentalt kart over hele prosessen — fra det øyeblikket du trykker Enter i adressefeltet til pikslene vises på skjermen.

### Nettleserens arkitektur

En moderne nettleser er ikke ett program — den er et system av samarbeidende **prosesser**. Chrome (og Chromium-baserte nettlesere) bruker en multi-prosess-arkitektur:

- **Browser-prosessen** — Hoved-UI, adressefelt, bokmerker, koordinering
- **Renderer-prosessen** — Én per tab (isolert for sikkerhet): parser HTML/CSS, kjører JS, beregner layout, maler piksler
- **GPU-prosessen** — Rasterisering og compositing via GPU
- **Nettverksprosessen** — DNS, TCP, TLS, HTTP (isolert fra renderer)
- **Plugin/Service Worker-prosessen** — Isolert kjøring av extensions og workers

Denne isoleringen er bevisst: en krasjet tab tar ikke ned hele nettleseren, og en ondsinnet nettside kan ikke lese minnet til en annen tab. (Vi kommer tilbake til dette i sikkerhetsuka.)

Innenfor renderer-prosessen finner vi de klassiske komponentene:

1. **Renderingsmotoren** (Blink i Chrome) — Parser HTML/CSS, bygger trær, beregner layout, maler piksler
2. **JavaScript-motoren** (V8) — Parser og kjører JS
3. **Compositing-tråden** — Separat tråd for GPU-compositing (viktig for animasjonsytelse)
4. **Datapersistens** — Cookies, localStorage, IndexedDB, cache

### Fra URL til piksler — oversikt

```
URL → DNS → TCP → TLS → HTTP → HTML-parsing → DOM
                                  CSS-parsing → CSSOM
                                  DOM + CSSOM → Render tree
                                  Render tree → Layout → Paint → Composite → Piksler
```

Denne uken ser vi på helheten. De neste 14 ukene zoomer vi inn på hvert steg.

## Lesestoff

### Obligatorisk
- [Inside look at modern web browser (Part 1)](https://developer.chrome.com/blog/inside-browser-part1) — Mariko Kosaka
- [Inside look at modern web browser (Part 2)](https://developer.chrome.com/blog/inside-browser-part2) — Mariko Kosaka
- [How Browsers Work](https://web.dev/articles/howbrowserswork) — Les introduksjonen og "The browser's high level structure"

### Anbefalt
- [How the web works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works) — MDN
- [What happens when you type a URL in the browser](https://web.dev/articles/howbrowserswork#the_main_flow) — Klassisk intervjuspørsmål

## Oppgaver

### Oppgave 1: Mental modell

Skriv din egen beskrivelse (200–400 ord) av hva som skjer fra du skriver `https://example.com` i adressefeltet til siden vises. Bruk egne ord — det er OK at den er ufullstendig. Vi kommer tilbake til denne i uke 15 for å se hvor mye forståelsen din har vokst.

**Lever som:** Tekstfil eller Markdown.

### Oppgave 2: Nettleserens komponenter

Åpne Chrome DevTools (`Cmd+Option+I` / `F12`) og utforsk de ulike panelene. For hvert panel, skriv én setning om hvilken del av nettleserens arkitektur det gir innsikt i:
- Elements
- Console
- Sources
- Network
- Performance

### Oppgave 3: Sammenlign nettlesere

Åpne den samme nettsiden i Chrome, Firefox og Safari (eller Edge). Bruk DevTools i hver nettleser til å finne:
- Hvilken renderingsmotor bruker hver nettleser?
- Hvilken JavaScript-motor bruker de?
- Ser du noen forskjeller i Network-panelet?

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Renderingsmotor | Blink (Chrome), Gecko (Firefox), WebKit (Safari) |
| JavaScript-motor | V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari) |
| Kritisk renderingsbane | Minimum stegene som må fullføres før nettleseren kan vise noe |
| DOM | Trestruktur som representerer HTML-dokumentet i minnet |
| CSSOM | Trestruktur som representerer CSS-reglene |
