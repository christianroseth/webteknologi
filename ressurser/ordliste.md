# Norsk–engelsk ordliste

Denne ordlisten dekker sentrale begreper brukt i kurset. Der det norske begrepet er lite brukt i praksis, foretrekkes det engelske — men begge oppgis for forståelse.

## Nettleser og rendering

| Norsk | Engelsk | Forklaring |
|-------|---------|------------|
| Nettleser | Browser | Program som henter og viser nettsider |
| Gjengivelse / rendering | Rendering | Prosessen fra kode til piksler på skjerm |
| Rendertre | Render tree | Kombinasjon av DOM og CSSOM som representerer synlige elementer |
| Stiltre | Style tree | Tre der hver node har tilknyttede CSS-verdier |
| Utlegg / layout | Layout (reflow) | Beregning av posisjon og størrelse for hvert element |
| Maling | Paint | Tegning av piksler basert på layout-beregninger |
| Sammensetning | Compositing | Kombinering av malte lag til det endelige bildet |
| Lag | Layer | Separat tegneflate som kan håndteres uavhengig |
| Rasterisering | Rasterization | Konvertering av vektorer/former til piksler |
| Omflytning | Reflow | Ny layout-beregning etter endring i DOM/CSS |
| Ommaling | Repaint | Ny maling uten endring i layout |
| Boksmodell | Box model | CSS-modellen med content, padding, border, margin |

## HTML og DOM

| Norsk | Engelsk | Forklaring |
|-------|---------|------------|
| Dokumentobjektmodell | DOM (Document Object Model) | Trestruktur som representerer HTML-dokumentet |
| Node | Node | Enkelt punkt i DOM-treet |
| Element | Element | DOM-node som representerer en HTML-tag |
| Tekstnode | Text node | DOM-node som inneholder ren tekst |
| Attributt | Attribute | Nøkkel-verdi-par på et HTML-element |
| Parsing / tolking | Parsing | Konvertering av tekst til strukturert data (tre) |
| Tokenisering | Tokenization | Oppdeling av tekst i meningsfulle enheter (tokens) |
| Rekursiv nedstigning | Recursive descent | Parsingteknikk der hver grammatikkregel er en funksjon |

## CSS

| Norsk | Engelsk | Forklaring |
|-------|---------|------------|
| Stilark | Stylesheet | Samling av CSS-regler |
| Regel | Rule | En selektor + deklarasjonsblokk i CSS |
| Selektor | Selector | Mønster som matcher HTML-elementer |
| Deklarasjon | Declaration | Et egenskap–verdi-par (f.eks. `color: red`) |
| Spesifisitet | Specificity | System for å avgjøre hvilken CSS-regel som vinner |
| Kaskade | Cascade | Algoritmen som bestemmer endelig stilverdi |
| Arv | Inheritance | Mekanisme der barn arver stiler fra foreldre |
| Beregnet verdi | Computed value | Endelig CSS-verdi etter kaskade og arv |

## JavaScript og motor

| Norsk | Engelsk | Forklaring |
|-------|---------|------------|
| JS-motor | JavaScript engine | Program som kjører JavaScript (f.eks. V8) |
| Abstrakt syntakstre | AST (Abstract Syntax Tree) | Trestruktur som representerer parsert kode |
| Bytekode | Bytecode | Mellomformat mellom kildekode og maskinkode |
| Tolk | Interpreter | Program som kjører kode linje for linje |
| JIT-kompilering | Just-In-Time compilation | Kompilering til maskinkode under kjøring |
| Deoptimalisering | Deoptimization | Tilbakefall fra optimalisert til uoptimalisert kode |
| Skjulte klasser | Hidden classes | V8s interne strukturer for objektlayout |
| Inline-hurtigbuffer | Inline cache | Optimalisering for raskere egenskapsoppslag |
| Hendelsesløkke | Event loop | Mekanisme som håndterer asynkron kjøring |
| Makrooppgave | Macrotask | Oppgave i hovedkøen (setTimeout, I/O) |
| Mikrooppgave | Microtask | Oppgave med høyere prioritet (Promises, queueMicrotask) |
| Anropsstakk | Call stack | LIFO-struktur for aktive funksjonsanrop |
| Søppelinnsamling | Garbage collection | Automatisk frigjøring av ubrukt minne |

## Nettverk

| Norsk | Engelsk | Forklaring |
|-------|---------|------------|
| Domenenavnsystem | DNS (Domain Name System) | Oversetter domenenavn til IP-adresser |
| Transportlagssikkerhet | TLS (Transport Layer Security) | Krypteringsprotokoll for sikker kommunikasjon |
| Håndtrykk | Handshake | Innledende forhandling mellom klient og server |
| Sertifikat | Certificate | Digital attest som bekrefter serverens identitet |
| Multipleksing | Multiplexing | Flere samtidige strømmer over én tilkobling |
| Ventetid | Latency | Tid fra forespørsel sendes til svar mottas |
| Båndbredde | Bandwidth | Dataoverføringskapasitet per tidsenhet |
| Mellomlagring | Caching | Lagring av data for raskere fremtidig tilgang |

## Sikkerhet

| Norsk | Engelsk | Forklaring |
|-------|---------|------------|
| Opprinnelsespolicy | Same-Origin Policy | Sikkerhetsprinsipp som isolerer ulike opprinnelser |
| Kryssopprinnelse | Cross-origin | Forespørsler mellom ulike opprinnelser |
| Innholdssikkerhetspolicy | CSP (Content Security Policy) | HTTP-header som begrenser tillatte ressurser |
| Skriptkjøring på tvers av sider | XSS (Cross-Site Scripting) | Angrep der ondsinnet JavaScript injiseres |
| Forfalskning på tvers av sider | CSRF (Cross-Site Request Forgery) | Angrep der brukerens sesjon misbrukes |
| Klikkekapring | Clickjacking | Angrep der bruker lures til å klikke på skjult element |

## Ytelse

| Norsk | Engelsk | Forklaring |
|-------|---------|------------|
| Første innholdsfulle maling | FCP (First Contentful Paint) | Tidspunkt der første innhold vises |
| Største innholdsfulle maling | LCP (Largest Contentful Paint) | Tidspunkt der største synlige element vises |
| Kumulativt layoutskift | CLS (Cumulative Layout Shift) | Mål på visuell ustabilitet |
| Interaksjon til neste maling | INP (Interaction to Next Paint) | Mål på responsivitet |
| Kritisk renderingsbane | Critical rendering path | Minimumsstegene før piksler kan vises |
