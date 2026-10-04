# TZ — Yer Analoglari (Earth Analog Explorer)

**Challenge:** NASA Space Apps — Identify Earth Locations that Analog Moon/Mars
**Jamoa:** Odilbek (merge/lead), MuhammadAli, HojiAkbar
**Muddat:** 3 soat (hackathon sprint)

---

## 1. Loyiha vizyoni

Yer yuzidagi Oy va Marsga geologik/ekologik jihatdan o'xshash haqiqiy
hududlarni (Atakama cho'li, Devon oroli, Danakil botig'i va h.k.) interaktiv
xarita orqali ko'rsatuvchi, har bir o'xshashlikni ilmiy manbalar bilan
asoslab tushuntiruvchi ta'lim platformasi.

**Maqsadli auditoriya:** NASA Space Apps hakamlari (demo ko'rinishi va
ilmiy halollik ustunlik qiladi).

**Asosiy tamoyil — ilmiy halollik:** Hech qachon biror joy "Marsning aynan
nusxasi" deb ko'rsatilmaydi. Har bir joyda: o'xshashliklar, **muhim
farqlar**, va manbalar alohida ko'rsatiladi. Taqqoslash darajasi
(`confidenceLevel`) har doim ko'rinadi.

---

## 2. MVP ko'lami (3 soat uchun realistik)

✅ **Kiritilgan:**
- Bosh sahifa: hero + 3 ta tanlangan joy kartasi
- Interaktiv xarita (Leaflet): 7 ta joy, planet bo'yicha filtr, popup
- Har bir joy uchun batafsil sahifa: Yer vs Oy/Mars rasm taqqoslash,
  o'xshashliklar/farqlar, ilmiy kontekst, manbalar
- 7 ta real, ilmiy jihatdan hujjatlashtirilgan analog joy (statik ma'lumot)
- Responsive layout (mobil + desktop)

❌ **MVP'dan tashqarida (vaqt qolsa keyingi bosqich):**
- Foydalanuvchi akkaunti / sevimlilar
- Backend / baza (hozir barcha ma'lumot `src/data/locations.ts` da statik)
- 3D globus
- Qidiruv (matn bo'yicha)
- Jonli NASA API integratsiyasi (hozircha statik, tayyor rasm URL'lari bilan)

---

## 3. Texnologiya steki

| Qatlam | Tanlov | Sabab |
|---|---|---|
| Frontend | React 19 + TypeScript + Vite | Tez build, zamonaviy, hakamlar uchun yaxshi taassurot |
| Routing | react-router-dom v7 | Sahifalar orasida navigatsiya |
| Xarita | Leaflet + react-leaflet + OpenStreetMap tiles | Bepul, kalit talab qilmaydi |
| Ma'lumot | Statik TS fayl (`src/data/locations.ts`) | Backend qurishga vaqt yo'q, 3 soatda statik yetarli |
| Stil | Oddiy CSS fayllar + `src/styles/tokens.css` dizayn tokenlari | Qo'shimcha kutubxonasiz tez va nazorat qilinadigan |
| Deploy | Railway | Jamoa tanlovi |

---

## 4. Ma'lumotlar modeli

`src/types/location.ts` dagi `EarthLocation` interfeysi:

```ts
{
  id, name, country, coordinates: [lat, lng],
  analogPlanet: 'moon' | 'mars' | 'both',
  terrainTags: TerrainTag[],
  shortDescription, scientificContext,
  confidenceLevel: 'verified' | 'approximate' | 'illustrative',
  earthImage, referenceImage, referenceCaption,
  similarities: {title, description}[],
  differences: {title, description}[],
  sources: {label, url}[],
}
```

7 ta joy allaqachon `src/data/locations.ts` da to'ldirilgan (Atakama,
Devon oroli, Danakil botig'i, Makmurdo quruq vodiylari, Timanfaya/Lansarote,
Mauna Kea, Nordlinger Ris krateri). Rasmlar Wikimedia Commons'dan olingan
ochiq litsenziyali rasmlar.

---

## 5. Dizayn tizimi

`src/styles/tokens.css` da CSS o'zgaruvchilar orqali belgilangan:
- **Fon:** qora-ko'k kosmik fon (`--color-bg: #05070d`)
- **Aksentlar:** Yer — moviy (`--color-earth`), Mars — qizg'ish-to'q sariq
  (`--color-mars`), Oy — kumush-kul rang (`--color-moon`)
- **Shrift:** Space Grotesk (sarlavhalar), Inter (matn)
- Yangi rang/oraliq kerak bo'lsa — shu faylga qo'shiladi, komponent ichida
  hardcode qilinmaydi.

---

## 6. Sahifa tuzilishi

```
/            → HomePage (hero, tanlangan joylar)
/explore     → MapExplorer (interaktiv xarita, filtr, ro'yxat)
/location/:id → LocationDetail (to'liq taqqoslash, manbalar)
```

Umumiy komponentlar (`src/components/common/`): `LocationCard`,
`PlanetBadge`, `ConfidenceBadge` — barcha sahifalarda qayta ishlatiladi.

---

## 7. Ilmiy manbalar strategiyasi

Har bir joy haqiqatan ham NASA/ESA/ilmiy jamoa tomonidan Oy/Mars analog
sayti sifatida tadqiq qilingan (masalan, Haughton-Mars Project, HI-SEAS,
Apollo geologiya mashg'ulotlari). Har bir joy kartochkasida kamida 1-2
tashqi manba havolasi bor. Hech qanday statistika yoki ilmiy da'vo
o'ylab topilmagan.

---

## 8. Xavflar

- **Vaqt juda qisqa (3 soat)** — shuning uchun backend yo'q, ma'lumot
  statik, MVP minimal qilib belgilangan.
- **Rasm havolalari tashqi (Wikimedia)** — internet bo'lmasa yoki havola
  o'zgarsa, rasm yuklanmaydi. Zaxira: `location.name` alt-matn sifatida
  ko'rinadi.
- **3 kishi parallel ishlashi** — merge konfliktini oldini olish uchun
  har kim faqat TASK.md da belgilangan papkada ishlaydi (qarang: TASK.md).
