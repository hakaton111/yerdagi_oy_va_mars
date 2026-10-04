# TASK.md — 3 soatlik sprint taqsimoti

Jamoa: **Odilbek** (lead, merge qiladi), **MuhammadAli**, **HojiAkbar**
To'liq texnik kontekst uchun: [`TZ.md`](./TZ.md)

Loyiha allaqachon ishga tushirilgan holatda: routing, ma'lumotlar
(`src/data/locations.ts`, 7 ta real joy), umumiy komponentlar
(`LocationCard`, `PlanetBadge`, `ConfidenceBadge`), va 3 sahifaning ishchi
asosiy versiyasi tayyor. Sizning vazifangiz — o'z sahifangizni pardozlash
va funksionallikni kuchaytirish.

```
npm install
npm run dev     # http://localhost:5173
```

---

## Git workflow (MUHIM — merge konfliktini oldini olish uchun)

1. Har kim o'z branch'ida ishlaydi:
   - Odilbek → `feature/map-explorer`
   - MuhammadAli → `feature/homepage`
   - HojiAkbar → `feature/location-detail`
2. Faqat o'zingizga tegishli papka/fayllarda o'zgartirish kiriting
   (pastda ro'yxat). Umumiy fayllarni (`src/data/locations.ts`,
   `src/types/location.ts`, `src/components/common/*`) o'zgartirish kerak
   bo'lsa — avval jamoaga Discord/Telegram'da yozing.
3. Kichik-kichik commit qiling (har 20-30 daqiqada bir marta), tushunarli
   xabar bilan: `git commit -m "map: filtr tugmalarini qo'shdim"`
4. Oxirida Odilbek barcha branch'larni `main`ga merge qiladi va
   `npm run build` bilan tekshiradi.

---

## Vaqt taqsimoti (3 soat)

| Vaqt | Bosqich |
|---|---|
| 0:00–0:10 | Hammaga: `npm install`, loyihani ko'rib chiqish, TZ.md o'qish |
| 0:10–2:20 | Parallel ishlash (pastdagi shaxsiy vazifalar) |
| 2:20–2:45 | Odilbek: barcha branch'larni merge qilish, konfliktlarni hal qilish |
| 2:45–3:00 | Birgalikda: `npm run build` tekshirish, Railway'ga deploy, demo sinovi |

---

## 🗺️ Odilbek — Map Explorer + Merge Lead

**Papka:** `src/pages/MapExplorer/` (MapExplorer.tsx, MapExplorer.css)

Asosiy xarita allaqachon ishlaydi (markerlar, planet filtri, sidebar
ro'yxat). Vazifalar:

- [ ] Satellite/standard xarita qatlamini almashtirish tugmasi qo'shish
      (masalan, Esri World Imagery tile layer'ni qo'shib, oddiy toggle)
- [ ] Marker bosilganda sidebar'da mos joy highlight bo'lishi (scroll +
      rang o'zgarishi)
- [ ] Mobil ko'rinishda sidebar/xarita tartibini tekshirish va tuzatish
- [ ] (Vaqt qolsa) Terrain tag bo'yicha qo'shimcha filtr (cho'l, vulqonik,
      krater va h.k. — `location.terrainTags` dan foydalaning)
- [ ] **Sprint oxiri:** barcha 3 branch'ni `main`ga merge qilish,
      `npm run build` va `tsc -b` xatosiz o'tishini tasdiqlash, Railway'ga
      deploy qilish

---

## 🏠 MuhammadAli — Homepage + Vizual jilo

**Papka:** `src/pages/HomePage/` (HomePage.tsx, HomePage.css)
**Qo'shimcha:** `index.html` (favicon/meta, kerak bo'lsa), umumiy
branding elementlari

Hero va 3 tanlangan joy kartasi allaqachon ishlaydi. Vazifalar:

- [ ] Hero bo'limini kuchaytirish: fon animatsiyasi yoki statik
      kosmik grafika (CSS bilan, tashqi og'ir kutubxonasiz)
- [ ] "Nega bu loyiha kerak?" / "Qanday ishlaydi" qisqa tushuntirish
      bo'limini qo'shish (3 qadam: Xaritada tanlang → O'xshashlikni
      ko'ring → Farqlarni tushuning)
- [ ] Haqiqiy son bilan statistika bloki (masalan: "7 tadqiq qilingan
      joy", "2 sayyora" — **faqat haqiqiy sonlar**, o'ylab topilgan
      statistika YO'Q)
- [ ] Nano Banana uchun logo prompt yozib berish (quyida tayyor prompt
      bor — kerak bo'lsa moslashtiring) va logo kelganda uni
      Navbar'ga joylashtirish (`src/components/layout/Navbar.tsx`,
      faqat shu faylda, Odilbekka xabar bering)
- [ ] Responsive: mobil ekranda hero va grid tekshirish

**Logo uchun tayyor prompt (Nano Banana'ga tashlash uchun):**
> Minimal, modern flat-vector logo for a space-science education app
> called "Yer Analoglari" (Earth Analogs). Concept: a simplified Earth
> hemisphere on the left blending into a cratered Moon/Mars surface
> texture on the right, connected by a subtle orbital arc line. Color
> palette: deep space navy background (#05070d), Earth blue (#3aa6ff),
> Mars rust-orange (#ff6a4d). No text, no gradients, no 3D, no shadows —
> flat geometric style, works at small favicon size, transparent
> background, square 1:1 aspect ratio.

---

## 🔬 HojiAkbar — Location Detail + Taqqoslash vizuali

**Papka:** `src/pages/LocationDetail/` (LocationDetail.tsx,
LocationDetail.css)

Yer vs Oy/Mars rasm taqqoslash, o'xshashlik/farq kartalari, manbalar
bo'limi allaqachon ishlaydi. Vazifalar:

- [ ] Rasm taqqoslash bo'limini kuchaytirish: ustiga bosilganda kattaroq
      ko'rinish (lightbox) yoki slider/divider effekt qo'shish
- [ ] O'xshashlik/farq kartalariga ikonka yoki vizual belgi qo'shish
      (masalan, ✓ va ⚠ emas — CSS bilan rangli chekka chizish, chunki
      loyihada emoji ishlatilmaydi)
- [ ] "Keyingi/Oldingi joy" tugmalarini qo'shish (sahifa pastida, 7 ta
      joy orasida navigatsiya — `src/data/locations.ts` dagi
      `locations` massividan foydalaning, lekin faylni o'zgartirmang)
- [ ] 404 holatini (`location topilmadi`) vizual jihatdan tekshirish
- [ ] Responsive: mobil ekranda compare-card va points grid tekshirish

---

## Merge oldidan umumiy checklist

- [ ] `npm run build` xatosiz o'tadi
- [ ] Barcha 3 sahifa (`/`, `/explore`, `/location/atacama-desert`)
      brauzerda ochiladi
- [ ] Mobil kenglikda (375px) asosiy sahifalar buzilmaydi
- [ ] Konsolda qizil xato yo'q
- [ ] `src/data/locations.ts` faqat bitta joyda (kerak bo'lsa) o'zgartirilgan,
      ikki marta emas
