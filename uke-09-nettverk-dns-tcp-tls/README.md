# Uke 9: Nettverk — DNS, TCP, TLS

## Læringsmål

Etter denne uken skal du kunne:
- Beskrive DNS-oppslag fra stub resolver via recursive resolver til authoritative nameserver
- Forklare TCP three-way handshake og hvorfor det er nødvendig
- Beskrive TLS 1.3 handshake og hva som oppnås i hvert steg
- Bruke Wireshark til å fange og analysere nettverkstrafikk

## Oversikt

Før nettleseren kan hente en nettside, må den opprette en forbindelse til serveren. Dette krever tre lag med forhandlinger: DNS (finn IP-adressen), TCP (opprett pålitelig tilkobling), og TLS (krypter tilkoblingen).

### DNS — Oversett navn til adresse

```
Nettleser → OS stub resolver → Recursive resolver → Root → TLD → Authoritative
                                                                      ↓
                                                              93.184.216.34
```

1. **Nettleseren** sjekker sin egen cache
2. **OS** sjekker `/etc/hosts` og sin cache
3. **Recursive resolver** (f.eks. ISPs DNS) sjekker cache, ellers spør videre
4. **Root nameserver** → peker til TLD-server (.com, .no)
5. **TLD nameserver** → peker til authoritative server
6. **Authoritative nameserver** → returnerer IP-adressen

Hele prosessen tar typisk 20–120 ms (uten cache).

### TCP — Three-way handshake

```
Klient                    Server
  |--- SYN (seq=x) -------->|    1. Klient vil koble til
  |<-- SYN-ACK (seq=y, -----)    2. Server godtar og bekrefter
  |    ack=x+1)              |
  |--- ACK (ack=y+1) ------->|   3. Klient bekrefter — tilkobling opprettet
```

TCP garanterer at data kommer frem i riktig rekkefølge og uten tap. Prisen er ekstra rundturer (latens).

### TLS 1.3 — Kryptering

TLS 1.3 trenger bare **én ekstra rundtur** (vs. to i TLS 1.2):

```
Klient                              Server
  |--- ClientHello ----------------->|  Støttede algoritmer + nøkkelutveksling (key share)
  |                                  |
  |<-- ServerHello ------------------|  Valgt algoritme + server sin key share
  |<-- {EncryptedExtensions} --------|  (kryptert fra nå av)
  |<-- {Certificate} ----------------|  Serverens sertifikat
  |<-- {CertificateVerify} ----------|  Bevis på at serveren eier privnøkkelen
  |<-- {Finished} -------------------|  Server er ferdig — kryptert forbindelse etablert
  |                                  |
  |--- {Finished} ------------------>|  Klient bekrefter
  |<====== Kryptert data ==========>|
```

Merk at serveren sender sertifikat, bekreftelse og `Finished` i *samme flight* som `ServerHello` — det er dette som gjør TLS 1.3 til 1-RTT. Klienten trenger ikke vente på en ekstra rundtur for å få sertifikatet.

I TLS 1.2 måtte serveren sende sertifikatet i en separat melding *etter* at nøkkelutvekslingen var bekreftet — det krevde 2 RTT. TLS 1.3 redesignet handshaken slik at hele denne prosessen komprimeres til én rundtur.

**Hva oppnås:**
- **Konfidensialitet** — Data er kryptert (AES-GCM eller ChaCha20)
- **Integritet** — Data kan ikke endres underveis (HMAC)
- **Autentisitet** — Sertifikatet og `CertificateVerify` beviser at serveren er ekte

### Total oppkoblingstid

```
DNS:        ~50ms
TCP:        ~30ms (1 RTT)
TLS 1.3:   ~30ms (1 RTT)
─────────────────
Total:      ~110ms  (før første byte data!)
```

## Lesestoff

### Obligatorisk
- [How DNS works](https://howdns.works/) — Visuell forklaring ([arkiv](https://web.archive.org/web/2024/https://howdns.works/))
- [Inside look at modern web browser (Part 2)](https://developer.chrome.com/blog/inside-browser-part2) — Nettverksseksjonen
- [TLS 1.3 — A major revision](https://blog.cloudflare.com/rfc-8446-aka-tls-1-3/) — Cloudflare Blog

### Anbefalt
- [High Performance Browser Networking — TLS](https://hpbn.co/transport-layer-security-tls/) — Ilya Grigorik (gratis online)
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) — Kapittel 1–3

## Oppgaver

### Oppgave 1: DNS-oppslag

Bruk terminalen til å gjøre DNS-oppslag:

```bash
# Se hele DNS-resolusjonen
dig +trace example.com

# Mål DNS-tid
dig example.com | grep "Query time"

# Tøm DNS-cache (macOS — begge kommandoer er nødvendige)
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder

# Tøm DNS-cache (Linux)
sudo systemd-resolve --flush-caches
```

Gjør oppslag for 3 forskjellige domener. Sammenlign Query time med og uten cache.

### Oppgave 2: Wireshark — TCP handshake

1. Start Wireshark og begynn å fange trafikk.
2. Åpne en nettside i nettleseren.
3. Stopp fangsten.
4. Filtrer med `tcp.flags.syn == 1` for å finne SYN-pakker.
5. Følg en TCP-strøm (høyreklikk → Follow → TCP Stream).
6. Identifiser three-way handshake: SYN → SYN-ACK → ACK.

### Oppgave 3: Wireshark — TLS handshake

1. Fang trafikk mens du åpner en HTTPS-side.
2. Filtrer med `tls.handshake`.
3. Identifiser meldingstypene i TLS 1.3-handshaken:
   - `ClientHello` — hvilke cipher suites tilbys? Hvilke key share-grupper?
   - `ServerHello` — hvilken cipher suite ble valgt?
   - `Certificate`, `CertificateVerify`, `Finished` — sendes disse i samme flight som ServerHello?
4. Sammenlign med en TLS 1.2-tilkobling (noen eldre sider bruker det) — ser du den ekstra rundturen?

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| DNS | Oversetter domenenavn (example.com) til IP-adresser |
| Recursive resolver | DNS-server som gjør oppslaget på vegne av klienten |
| TCP handshake | Treveis forhandling (SYN → SYN-ACK → ACK) for pålitelig tilkobling |
| TLS 1.3 | Krypteringsprotokoll med 1-RTT handshake |
| RTT | Round Trip Time — tid for en pakke å gå frem og tilbake |
| Sertifikat | Digital attest som bekrefter serverens identitet |
