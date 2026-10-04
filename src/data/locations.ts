import type { EarthLocation } from '../types/location';

// Barcha joylar NASA/ESA yoki ilmiy jamoalar tomonidan haqiqatan ham
// Oy/Mars "analog sayti" sifatida tadqiq qilingan hududlar.
// Rasm manbalari: Wikimedia Commons (ochiq litsenziya). Agar rasm ochilmasa,
// src/data/locations.ts dagi earthImage/referenceImage qiymatini yangilang.

export const locations: EarthLocation[] = [
  {
    id: 'atacama-desert',
    name: 'Atakama cho\'li',
    country: 'Chili',
    coordinates: [-24.5, -69.25],
    analogPlanet: 'mars',
    terrainTags: ['desert', 'salt-flat'],
    shortDescription:
      'Yerdagi eng quruq issiq cho\'llardan biri. NASA astrobiologlari bu yerda Marsga o\'xshash tuproq va ekstremofil bakteriyalarni o\'rganadi.',
    scientificContext:
      'NASA Ames va Astrobiology Institute Atakamada "Mars yagi" robototexnika va hayot izlarini aniqlash sinovlarini o\'tkazgan (Atacama Rover Astrobiology Drilling Studies — ARADS loyihasi). Tuproq kimyosi va kuchli UV radiatsiyasi Mars yuzasiga juda yaqin.',
    confidenceLevel: 'verified',
    earthImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Atacama.png',
    referenceImage:
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png',
    referenceCaption: 'Mars sayyorasi — umumiy ko\'rinish',
    similarities: [
      {
        title: 'Ekstremal quruqlik',
        description:
          'Ba\'zi hududlarida yillar davomida yomg\'ir yog\'maydi — Marsning hozirgi quruq iqlimiga juda yaqin.',
      },
      {
        title: 'Tuproq kimyosi',
        description:
          'Perklorat va nitrat minerallariga boy tuproq — bu birikmalar Mars tuprog\'ida ham (Viking va Phoenix missiyalari aniqlagan) topilgan.',
      },
      {
        title: 'Kuchli UV radiatsiya',
        description:
          'Yupqa atmosfera va baland balandlik tufayli UV nurlanish darajasi yuqori, Mars yuzasidagi radiatsiya sharoitini qisman taqlid qiladi.',
      },
    ],
    differences: [
      {
        title: 'Atmosfera bosimi',
        description:
          'Yer atmosferasi Marsnikidan ~160 marta zichroq — Atakamada odam erkin nafas oladi, Marsda bu mumkin emas.',
      },
      {
        title: 'Harorat tebranishi',
        description:
          'Mars tunlari -100°C gacha tushadi, Atakama tunlari ancha mo\'tadilroq.',
      },
    ],
    sources: [
      { label: 'NASA Astrobiology — ARADS loyihasi', url: 'https://astrobiology.nasa.gov/' },
      { label: 'Wikipedia — Atacama Desert', url: 'https://en.wikipedia.org/wiki/Atacama_Desert' },
    ],
  },
  {
    id: 'devon-island',
    name: 'Devon oroli (Haughton krateri)',
    country: 'Kanada (Arktika)',
    coordinates: [75.25, -88.0],
    analogPlanet: 'mars',
    terrainTags: ['crater', 'polar', 'arctic', 'desert'],
    shortDescription:
      'Dunyodagi eng katta odamsiz orol. 23 million yil oldin tushgan meteorit kraterini o\'z ichiga oladi va qutb cho\'li sharoitida joylashgan.',
    scientificContext:
      'NASA/SETI Institute Haughton-Mars loyihasi (HMP) 1997-yildan beri shu yerda Mars missiyalari uchun field-geologiya, astronavtlar mashg\'uloti va avtonom robototexnikani sinab ko\'radi.',
    confidenceLevel: 'verified',
    earthImage:
      'https://upload.wikimedia.org/wikipedia/commons/e/e2/Truelove_Lowlands_Devon_Island.jpg',
    referenceImage:
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png',
    referenceCaption: 'Mars sayyorasi — zarba kraterlariga boy yuzasi',
    similarities: [
      {
        title: 'Zarba krateri geologiyasi',
        description:
          'Haughton krateri Mars yuzasidagi ko\'plab qadimiy kraterlar bilan bir xil zarba jinslari (shocked rock) va struktura tarixiga ega.',
      },
      {
        title: 'Sovuq, quruq, radiatsiyaga ochiq muhit',
        description:
          'Qutb cho\'li sharoiti — kam yog\'ingarchilik, past harorat — Mars yuzasining zamonaviy sharoitiga o\'xshash sinov maydoni yaratadi.',
      },
    ],
    differences: [
      {
        title: 'Muz va suyuq suv mavjudligi',
        description:
          'Devon orolida mavsumiy erigan suv va muz qatlamlari bor, Marsning yuzasida esa suyuq suv deyarli yo\'q.',
      },
      {
        title: 'Biologik hayot',
        description:
          'Yerda mikroorganizmlar va o\'simliklar mavjud, Marsda hozirgача tasdiqlangan hayot izi topilmagan.',
      },
    ],
    sources: [
      { label: 'Haughton-Mars Project (SETI Institute)', url: 'https://www.seti.org/haughton-mars-project' },
      { label: 'Wikipedia — Devon Island', url: 'https://en.wikipedia.org/wiki/Devon_Island' },
    ],
  },
  {
    id: 'danakil-depression',
    name: 'Danakil botig\'i (Erta Ale vulqoni)',
    country: 'Efiopiya',
    coordinates: [13.60639, 40.66139],
    analogPlanet: 'mars',
    terrainTags: ['volcanic', 'salt-flat', 'desert'],
    shortDescription:
      'Dengiz sathidan 125 metr past joylashgan, doimiy lava ko\'liga ega faol vulqon va tuz konlariga boy ekstremal issiq hudud.',
    scientificContext:
      'Geologlar va astrobiologlar Danakil\'ni erta Mars davridagi gidrotermal va sulfat-boy muhitlarga analog sifatida o\'rganadi; ekstremofil organizmlar hayotning chegaralarini tushunishga yordam beradi.',
    confidenceLevel: 'verified',
    earthImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Erta_Ale.jpg',
    referenceImage:
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png',
    referenceCaption: 'Mars sayyorasi — vulqonik va sulfatga boy hududlar',
    similarities: [
      {
        title: 'Sulfat va tuz minerallari',
        description:
          'Gipsga va tuzga boy cho\'kindilar — Mars rover\'lari (masalan, Opportunity) aniqlagan sulfat minerallariga o\'xshash.',
      },
      {
        title: 'Vulqonik faollik',
        description:
          'Bazalt lava oqimlari Marsning qadimiy vulqonik tekisliklariga geologik jihatdan o\'xshash.',
      },
    ],
    differences: [
      {
        title: 'Haroratning yuqoriligi',
        description:
          'Danakil Yerdagi eng issiq doimiy aholi yashaydigan joylardan biri — Mars yuzasi esa doimiy ravishda muzlab turadi.',
      },
      {
        title: 'Faol vulqon faoliyati',
        description:
          'Erta Ale hozirda faol, Marsda esa so\'nggi vulqon faolligi yuz millionlab yillar oldin tugagan deb hisoblanadi.',
      },
    ],
    sources: [
      { label: 'Wikipedia — Danakil Depression', url: 'https://en.wikipedia.org/wiki/Danakil_Depression' },
      { label: 'Wikipedia — Erta Ale', url: 'https://en.wikipedia.org/wiki/Erta_Ale' },
    ],
  },
  {
    id: 'mcmurdo-dry-valleys',
    name: 'Makmurdo quruq vodiylari',
    country: 'Antarktida',
    coordinates: [-77.467, 162.517],
    analogPlanet: 'mars',
    terrainTags: ['polar', 'desert', 'arctic'],
    shortDescription:
      'Antarktidaning muzsiz, ekstremal quruq vodiylari — Yerdagi eng Marsga o\'xshash sovuq cho\'l landshafti.',
    scientificContext:
      'NASA bu hududni Viking missiyasidan beri Mars yuzasidagi cho\'kindi jarayonlar va hayotning chegara sharoitlarini o\'rganish uchun tabiiy laboratoriya sifatida ishlatadi.',
    confidenceLevel: 'verified',
    earthImage: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Wright_Valley_From_Bull_Pass.jpg',
    referenceImage:
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png',
    referenceCaption: 'Mars sayyorasi — sovuq, quruq cho\'l tekisliklari',
    similarities: [
      {
        title: 'Muzsiz sovuq cho\'l',
        description:
          'Kuchli shamollar namlikni yo\'qotib, Antarktidaning eng quruq hududlarini yaratadi — Marsning quruq yuzasiga o\'xshash.',
      },
      {
        title: 'Permafrost va tuproq strukturasi',
        description:
          'Doimiy muzlagan tuproq qatlami Marsdagi taxmin qilingan subsurface muz strukturasiga o\'xshash jarayonlarni ko\'rsatadi.',
      },
    ],
    differences: [
      {
        title: 'Kislorodli atmosfera',
        description:
          'Yer atmosferasi kislorodga boy, Mars atmosferasi esa asosan karbonat angidriddan iborat va juda yupqa.',
      },
      {
        title: 'Mikrobial hayot',
        description:
          'Vodiylardagi ko\'llarda mikrobial ekotizimlar mavjud — Marsda bunga o\'xshash hayot hali topilmagan.',
      },
    ],
    sources: [
      { label: 'Wikipedia — McMurdo Dry Valleys', url: 'https://en.wikipedia.org/wiki/McMurdo_Dry_Valleys' },
    ],
  },
  {
    id: 'timanfaya-lanzarote',
    name: 'Timanfaya milliy bog\'i',
    country: 'Ispaniya (Lansarote, Kanar orollari)',
    coordinates: [28.99417, -13.79333],
    analogPlanet: 'both',
    terrainTags: ['volcanic', 'desert'],
    shortDescription:
      'Bazalt lava maydonlari va vulqonik kraterlarga boy hudud — ESA va NASA astronavtlarini geologik mashg\'ulotlardan o\'tkazadigan joy.',
    scientificContext:
      'ESA\'ning PANGAEA dasturi va NASA astronavtlari vulqonik jins turlarini tanish va "sayyoraviy" dala geologiyasi ko\'nikmalarini mashq qilish uchun Lansarotedan foydalanadi — bu yer tubida ham Oy, ham Mars vulqonik terrainlariga o\'xshash.',
    confidenceLevel: 'verified',
    earthImage:
      'https://upload.wikimedia.org/wikipedia/commons/4/41/Timanfaya_National_Park_landscape.jpg',
    referenceImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg',
    referenceCaption: 'Oy — bazalt "mare" tekisliklari',
    similarities: [
      {
        title: 'Bazalt lava jinslari',
        description:
          'Qora bazalt oqimlari Oyning mare hududlari va Marsning vulqonik tekisliklaridagi jinslarga mineralogik jihatdan yaqin.',
      },
      {
        title: 'O\'simliksiz vulqonik landshaft',
        description:
          'Deyarli hech qanday o\'simlik yo\'q sirt — astronavtlar uchun vizual va geologik jihatdan "sayyoraviy" muhit yaratadi.',
      },
    ],
    differences: [
      {
        title: 'Atmosfera va eroziya',
        description:
          'Yer shamoli va namligi jinslarni Oy/Marsdagidan farqli tarzda eroziyaga uchratadi.',
      },
      {
        title: 'Yosh farqi',
        description:
          'Lansarote lava maydonlari bir necha yuz yillik, Oy/Mars vulqonik tekisliklari esa milliardlab yil yoshda.',
      },
    ],
    sources: [
      { label: 'ESA — PANGAEA dasturi', url: 'https://www.esa.int/' },
      { label: 'Wikipedia — Timanfaya National Park', url: 'https://en.wikipedia.org/wiki/Timanfaya_National_Park' },
    ],
  },
  {
    id: 'mauna-kea',
    name: 'Mauna Kea',
    country: 'AQSh (Gavayi)',
    coordinates: [19.82056, -155.46806],
    analogPlanet: 'moon',
    terrainTags: ['volcanic', 'desert'],
    shortDescription:
      'So\'nib qolgan qalqon-vulqon, cho\'qqisidagi bazalt kul va shisha zarralari Oy regolitiga juda o\'xshash.',
    scientificContext:
      'Apollo davridan beri NASA astronavtlari va HI-SEAS (Hawai\'i Space Exploration Analog and Simulation) dasturi Mauna Kea/Mauna Loa hududlarida Oy va Mars missiyalari uchun regolit bilan ishlash va izolyatsiya tajribalarini o\'tkazadi.',
    confidenceLevel: 'verified',
    earthImage: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Mauna_Kea_from_the_ocean.jpg',
    referenceImage: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Mare_Imbrium_%28LRO%29.png',
    referenceCaption: 'Oy — Mare Imbrium bazalt tekisligi',
    similarities: [
      {
        title: 'Bazalt regolit',
        description:
          'Cho\'qqidagi mayda kul va shisha zarrachalari tarkibi Oy tuprog\'i (regolit) namunalariga mineralogik jihatdan yaqin — NASA shu yerda regolit simulantlarini ishlab chiqadi.',
      },
      {
        title: 'O\'simliksiz, qizil-qoramtir yuza',
        description:
          'Baland balandlikdagi vulqonik cho\'l o\'simliklardan deyarli xoli, vizual jihatdan Oy/Mars yuzasiga yaqin manzara yaratadi.',
      },
    ],
    differences: [
      {
        title: 'Gravitatsiya',
        description:
          'Yer tortishish kuchi Oynikidan 6 marta kuchli — astronavt harakatini to\'liq simulyatsiya qilib bo\'lmaydi.',
      },
      {
        title: 'Atmosfera mavjudligi',
        description:
          'Mauna Keada yupqa bo\'lsa-da atmosfera bor, Oyda esa deyarli atmosfera yo\'q.',
      },
    ],
    sources: [
      { label: 'HI-SEAS dasturi', url: 'https://hi-seas.org/' },
      { label: 'Wikipedia — Mauna Kea', url: 'https://en.wikipedia.org/wiki/Mauna_Kea' },
    ],
  },
  {
    id: 'noerdlinger-ries',
    name: 'Nordlinger Ris krateri',
    country: 'Germaniya',
    coordinates: [48.88333, 10.56667],
    analogPlanet: 'moon',
    terrainTags: ['crater'],
    shortDescription:
      '15 million yil oldin tushgan meteorit hosil qilgan 24 km diametrli zarba krateri — Apollo astronavtlari mashg\'ulot o\'tgan joy.',
    scientificContext:
      'Apollo 14 va 17 ekipajlari zarba geologiyasini ("shocked quartz", suevit jinsi) tanib olishni o\'rganish uchun 1970-yillarda Ris kraterida dala mashg\'ulotlaridan o\'tgan — bu Oydagi zarba kraterlarini tahlil qilish uchun to\'g\'ridan-to\'g\'ri tayyorgarlik bo\'lgan.',
    confidenceLevel: 'verified',
    earthImage:
      'https://upload.wikimedia.org/wikipedia/commons/9/99/N%C3%B6rdlinger_Ries_Relief_Map%2C_SRTM-1.jpg',
    referenceImage: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Tycho_LRO.png',
    referenceCaption: 'Oy — Tycho krateri',
    similarities: [
      {
        title: 'Zarba jinslari (shocked rock)',
        description:
          'Suevit va "shocked quartz" kabi yuqori bosim ta\'sirida hosil bo\'lgan minerallar Oy kraterlaridagi jinslar bilan bir xil fizik jarayon natijasida paydo bo\'ladi.',
      },
      {
        title: 'Krater morfologiyasi',
        description:
          'Doiraviy shakl va markaziy ko\'tarilma strukturasi Oydagi o\'rta o\'lchamli kraterlar (masalan, Tycho) bilan geometrik jihatdan taqqoslanadi.',
      },
    ],
    differences: [
      {
        title: 'Eroziya darajasi',
        description:
          '15 million yil davomida Yer atmosferasi va o\'simliklar krater chetlarini yumshatgan; Oydagi kraterlar atmosferasiz muhitda deyarli o\'zgarmay qoladi.',
      },
      {
        title: 'Hajmi',
        description:
          'Ris krateri Tychodan ancha kichik (24 km vs ~85 km diametr) — faqat geologik jarayon o\'xshashligi uchun taqqoslanadi, o\'lcham emas.',
      },
    ],
    sources: [
      { label: 'Wikipedia — Nördlinger Ries', url: 'https://en.wikipedia.org/wiki/N%C3%B6rdlinger_Ries' },
      { label: 'NASA — Apollo 14 Geology Training', url: 'https://www.nasa.gov/' },
    ],
  },
];

export function getLocationById(id: string): EarthLocation | undefined {
  return locations.find((loc) => loc.id === id);
}
