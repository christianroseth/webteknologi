# Uke 14: Sikkerhet

## Læringsmål

Etter denne uken skal du kunne:
- Forklare Same-Origin Policy og dens rolle i nettlesersikkerhet
- Beskrive XSS, CSRF og clickjacking — angrep og forsvar
- Konfigurere Content Security Policy (CSP) og CORS
- Identifisere sikkerhetssårbarheter i webapplikasjoner

## Oversikt

Nettleseren er et av de mest utsatte programmene på en brukers maskin — den kjører vilkårlig kode (JavaScript) fra ukjente kilder. Sikkerhetstiltak er derfor innebygd i nettleserens kjernearkitektur.

### Same-Origin Policy (SOP)

En **opprinnelse** (origin) er definert av: `protokoll + domene + port`.

```
https://example.com:443  — én opprinnelse
https://example.com:8080 — ANNEN opprinnelse (annen port)
http://example.com:443   — ANNEN opprinnelse (annen protokoll)
https://api.example.com  — ANNEN opprinnelse (annet domene)
```

SOP forhindrer at kode fra én opprinnelse leser data fra en annen. Uten SOP kunne enhver nettside lese dine bankdata, e-poster, etc.

### XSS — Cross-Site Scripting

Angriper injiserer JavaScript som kjører i offerets nettleser:

```javascript
// Reflected XSS — ondsinnet input reflekteres tilbake
// URL: https://site.com/search?q=<script>stealCookies()</script>

// Stored XSS — ondsinnet input lagres i databasen
// Kommentarfelt: <img onerror="stealCookies()" src="x">

// DOM-basert XSS — direkte DOM-manipulering
document.getElementById("output").innerHTML = userInput; // ALDRI gjør dette!
```

**Forsvar:**
- **Escape output** — HTML-encode brukerinput før visning
- **CSP** — Begrens hvilke skript som kan kjøre
- **`textContent`** i stedet for `innerHTML` for brukerdata
- **HttpOnly cookies** — Forhindrer JavaScript-tilgang til sesjonscookies

### CSRF — Cross-Site Request Forgery

Angriper lurer brukerens nettleser til å sende forespørsler til en annen side:

```html
<!-- Ondsinnet side -->
<img src="https://bank.com/transfer?to=angriper&amount=10000">
<!-- Nettleseren sender cookies automatisk! -->
```

**Forsvar:**
- **CSRF-token** — Uforutsigbar verdi i hvert skjema
- **SameSite cookies** — `Set-Cookie: session=abc; SameSite=Strict`
- **Sjekk Origin/Referer-header** — Verifiser at forespørselen kommer fra egen side

### CSP — Content Security Policy

HTTP-header som definerer hva som er tillatt:

```
Content-Security-Policy: default-src 'self';
                         script-src 'self' https://cdn.example.com;
                         style-src 'self' 'unsafe-inline';
                         img-src *;
```

Denne policyen:
- Tillater ressurser fra egen opprinnelse
- Tillater skript fra egen opprinnelse og `cdn.example.com`
- Tillater inline-stiler (men ikke inline-skript!)
- Tillater bilder fra alle kilder

### CORS — Cross-Origin Resource Sharing

Kontrollert unntak fra SOP for API-kall:

```
Nettleser (a.com)          API-server (b.com)
   |--- OPTIONS (preflight) ---->|
   |<-- Access-Control-Allow-Origin: a.com
   |--- GET /api/data ---------->|
   |<-- 200 OK + data -----------|
```

## Lesestoff

### Obligatorisk
- [Same-Origin Policy — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [Cross-Site Scripting (XSS) — OWASP](https://owasp.org/www-community/attacks/xss/)
- [Content Security Policy — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Anbefalt
- [CORS — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Web Security — Google](https://web.dev/articles/same-origin-policy)

## Oppgaver

### Oppgave 1: XSS-lab

Lag en enkel app med et søkefelt som viser søkeresultater:

```javascript
// Sårbar versjon
const query = new URLSearchParams(location.search).get("q");
document.getElementById("results").innerHTML =
  `Resultater for: ${query}`;
```

1. Finn en XSS-payload som viser en `alert()`.
2. Fiks sårbarheten med `textContent` eller HTML-escaping.
3. Legg til CSP-header som blokkerer inline scripts.

### Oppgave 2: CSRF-demonstrasjon

Lag to "sider":
1. **Target-side** — En enkel app med et skjema (f.eks. "endre profil").
2. **Angriperside** — En side som automatisk sender skjemaet til target.

Implementer deretter forsvar:
1. Legg til et CSRF-token i skjemaet.
2. Sett `SameSite=Strict` på cookies.
3. Verifiser at angrepet nå feiler.

### Oppgave 3: CSP i DevTools

Åpne en populær nettside (f.eks. GitHub, Google):
1. Sjekk `Content-Security-Policy`-headeren i Network-panelet.
2. Hva tillater policyen?
3. Prøv å injisere et inline-skript i Console — blokkeres det?
4. Se Console for CSP-feilmeldinger.

## Semesteroppgave

**Denne uken:** Innlevering milepæl 5 (Maling) + refleksjonsnotat.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Same-Origin Policy | Sikkerhetsprinsipp som isolerer opprinnelser fra hverandre |
| XSS | Injeksjon av ondsinnet JavaScript i en nettside |
| CSRF | Lure brukerens nettleser til å utføre uønskede handlinger |
| CSP | HTTP-header som begrenser tillatte ressurser og skript |
| CORS | Mekanisme for kontrollert kryssopprinnelse-tilgang |
