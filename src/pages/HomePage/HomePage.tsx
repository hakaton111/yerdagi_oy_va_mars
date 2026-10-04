import { Link } from 'react-router-dom';
import { locations } from '../../data/locations';
import LocationCard from '../../components/common/LocationCard';
import './HomePage.css';

// MUHAMMADALI: shu sahifa sening zonang.
// TASK.md dagi vazifalarga qarab: hero bo'limini kuchaytirish, statistikalar,
// "qanday ishlaydi" bo'limi va boshqa UI yaxshilanishlar shu faylda va HomePage.css da qilinadi.
// locations massivini yoki umumiy komponentlarni (LocationCard, PlanetBadge) o'zgartirmang —
// agar o'zgartirish zarur bo'lsa, Odilbek bilan kelishib oling.

const steps = [
  {
    title: 'Xaritada tanlang',
    description:
      "Interaktiv xaritada Oy yoki Marsga o'xshash hududni toping va planet bo'yicha filtrlang.",
  },
  {
    title: "O'xshashlikni ko'ring",
    description:
      "Yer hududi rasmini Oy yoki Mars yuzasi bilan yonma-yon solishtiring va geologik o'xshashliklarni o'qing.",
  },
  {
    title: 'Farqlarni tushuning',
    description:
      "Har bir joyda muhim farqlar va ilmiy manbalar alohida ko'rsatiladi — hech bir joy \"aynan nusxa\" emas.",
  },
];

// Statistika faqat haqiqiy ma'lumotlardan hisoblanadi — qo'lda yozilgan son yo'q.
function getStats() {
  const planets = new Set(
    locations.flatMap((loc) =>
      loc.analogPlanet === 'both' ? ['moon', 'mars'] : [loc.analogPlanet],
    ),
  );
  const countries = new Set(locations.map((loc) => loc.country.split(' (')[0]));
  const sources = locations.reduce((sum, loc) => sum + loc.sources.length, 0);

  return [
    { value: locations.length, label: "tadqiq qilingan analog joy" },
    { value: planets.size, label: 'sayyora: Oy va Mars' },
    { value: countries.size, label: 'mamlakat va hudud' },
    { value: sources, label: 'ilmiy manba havolasi' },
  ];
}

export default function HomePage() {
  const featured = locations.slice(0, 3);
  const stats = getStats();

  return (
    <div className="home">
      <section className="home__hero-wrap">
        <div className="home__space" aria-hidden="true">
          <div className="home__stars home__stars--far" />
          <div className="home__stars home__stars--near" />
          <div className="home__orb home__orb--mars" />
          <div className="home__orb home__orb--moon" />
          <div className="home__orbit" />
        </div>

        <div className="home__hero container">
          <p className="home__eyebrow">NASA Space Apps Challenge · Earth Analog Explorer</p>
          <h1>
            Yer yuzida <span className="home__hero-mars">Mars</span> va{' '}
            <span className="home__hero-moon">Oy</span>ga o'xshash joylarni kashf qiling
          </h1>
          <p className="home__subtitle">
            Atakamadan Antarktidagacha — olimlar sayyoralararo missiyalarni
            sinab ko'rish uchun foydalanadigan haqiqiy Yer hududlarini
            o'rganing. Har bir joy uchun ilmiy asoslangan o'xshashlik va farqlar
            tahlili bilan.
          </p>
          <div className="home__cta-row">
            <Link to="/explore" className="btn btn--primary">
              Interaktiv xaritani ochish
            </Link>
            <a href="#featured" className="btn btn--ghost">
              Joylarni ko'rish
            </a>
          </div>
        </div>
      </section>

      <section className="home__stats container" aria-label="Loyiha statistikasi">
        {stats.map((stat) => (
          <div key={stat.label} className="home__stat">
            <span className="home__stat-value">{stat.value}</span>
            <span className="home__stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="home__how container">
        <h2>Qanday ishlaydi</h2>
        <p className="home__section-desc">
          Olimlar Oy va Mars missiyalariga tayyorgarlikni Yerdagi analog
          hududlarda boshlaydi. Platforma shu joylarni uch qadamda tushuntiradi.
        </p>
        <ol className="home__steps">
          {steps.map((step, i) => (
            <li key={step.title} className="home__step">
              <span className="home__step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="featured" className="home__featured container">
        <h2>Tanlangan analog joylar</h2>
        <p className="home__section-desc">
          Jami {locations.length} ta ilmiy jihatdan tasdiqlangan Yer-analog
          hudud bazamizda mavjud.
        </p>
        <div className="home__grid">
          {featured.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
        <div className="home__more">
          <Link to="/explore" className="btn btn--ghost">
            Barcha {locations.length} ta joyni xaritada ko'rish
          </Link>
        </div>
      </section>
    </div>
  );
}
