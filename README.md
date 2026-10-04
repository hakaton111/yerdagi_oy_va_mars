# Yer Analoglari — Earth Analog Explorer

**NASA Space Apps Challenge** — "Identify Earth Locations that Analog Moon/Mars"

Yer yuzidagi Oy va Marsga geologik/ekologik jihatdan o'xshash haqiqiy
hududlarni interaktiv xarita orqali kashf qilish va har bir o'xshashlikni
ilmiy manbalar bilan asoslab tushuntirish platformasi.

## Jamoa

- **Odilbek** — loyiha skeletoni, interaktiv xarita, merge
- **MuhammadAli** — bosh sahifa, vizual branding
- **HojiAkbar** — joy tafsiloti sahifasi, Yer/Oy/Mars taqqoslash

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build (dist/)
npm run lint     # oxlint
```

## Funksiyalar

- **Interaktiv xarita** — standart/sputnik qatlamlari, sayyora va relyef
  turi bo'yicha filtr, qidiruv, marker↔ro'yxat sinxronizatsiyasi
- **7 ta ilmiy jihatdan hujjatlashtirilgan Yer-analog joy** — Atakama
  cho'li, Devon oroli (Haughton krateri), Danakil botig'i, Makmurdo quruq
  vodiylari, Timanfaya milliy bog'i, Mauna Kea, Nordlinger Ris krateri
- **Yer vs Oy/Mars vizual taqqoslash** — slider va yonma-yon rejimlar
- Har bir joy uchun o'xshashlik/farq tahlili, ilmiy kontekst va tashqi
  manba havolalari — hech qaysi joy "aynan nusxa" sifatida ko'rsatilmaydi

To'liq texnik hujjat: [`TZ.md`](./TZ.md). Vazifa taqsimoti: [`TASK.md`](./TASK.md).

## Tech stack

React 19 + TypeScript + Vite, React Router, Leaflet/react-leaflet.
Ma'lumotlar statik (`src/data/locations.ts`) — backend talab qilinmaydi.

## Ilmiy halollik

Hech bir joy Oy yoki Marsning aynan nusxasi sifatida taqdim etilmaydi.
Har bir joyda o'xshashliklar bilan bir qatorda **muhim farqlar** va
tashqi manbalar (NASA, ESA, Wikipedia) ko'rsatiladi.
