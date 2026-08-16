# Nstropy – Mobilní aplikace (PWA + APK)

Kompletní prezentace firmy **Nstropy.cz** – napínané stropy.

## Funkce aplikace

- **Domů** – úvod a rychlé odkazy
- **Galerie** – 6 fotografií z reálných realizací + lightbox
- **Kalkulačka** – orientační výpočet ceny podle plochy, typu fólie, osvětlení a složitosti
- **Poptávka** – formulář, který otevře e-mailový klient s předvyplněnými údaji
- **Kontakt** – klikací telefon, e-mail, adresa, IČO

Aplikace funguje offline a vypadá jako nativní aplikace.

---

## Jak získat .APK soubor (Android)

### Doporučený způsob – PWABuilder (5 minut)

1. Nahrajte celou složku `nstropy-android-app` na jakýkoliv hosting  
   (Netlify Drop, Vercel, GitHub Pages, nebo váš vlastní web).
2. Získejte veřejnou URL (např. `https://nstropy-app.netlify.app`).
3. Jděte na **https://www.pwabuilder.com**
4. Vložte URL a klikněte **Start**.
5. V sekci **Android** klikněte **Package** → stáhněte **APK**.
6. APK nainstalujete na telefon (povolte „Neznámé zdroje“).

### Alternativa – Bubblewrap (pro vývojáře)

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://vaše-url/manifest.json
bubblewrap build
```

---

## Lokální testování

```bash
cd nstropy-android-app
npx serve
# nebo python3 -m http.server 8080
```

Otevřete v Chrome na telefonu a „Přidat na plochu“.

---

## Ceny v kalkulačce

Orientační prodejní ceny vycházejí z interního ceníku 2026 (PC sloupec):

| Typ                  | Od Kč/m² |
|----------------------|----------|
| Mat / Satin bílý     | 500      |
| Lesk                 | 520      |
| Translucent          | 650      |
| S fototiskem         | 800      |
| Speciální            | 1400     |

+ příplatky za osvětlení a složitost místnosti.

Finální cena vždy po zaměření.

---

Kontakt: +420 730 507 975 | info@nstropy.cz
