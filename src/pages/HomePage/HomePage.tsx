import { Link } from 'react-router-dom';
import { locations } from '../../data/locations';
import LocationCard from '../../components/common/LocationCard';
import './HomePage.css';

// MUHAMMADALI: shu sahifa sening zonang.
// TASK.md dagi vazifalarga qarab: hero bo'limini kuchaytirish, statistikalar,
// "qanday ishlaydi" bo'limi va boshqa UI yaxshilanishlar shu faylda va HomePage.css da qilinadi.
// locations massivini yoki umumiy komponentlarni (LocationCard, PlanetBadge) o'zgartirmang —
// agar o'zgartirish zarur bo'lsa, Odilbek bilan kelishib oling.

export default function HomePage() {
  const featured = locations.slice(0, 3);

  return (
    <div className="home">
      <section className="home__hero container">
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
      </section>
    </div>
  );
}
