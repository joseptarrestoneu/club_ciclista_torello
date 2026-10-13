import { Link } from "react-router-dom";
import { BikeIcon, HeartIcon, ClockIcon, MapPinIcon } from "../components/icons.jsx";
import Counter from "../components/Counter.jsx";
import UpcomingFortnight from "../components/UpcomingFortnight.jsx";
import { events } from "../data/events.js";

const weeklyRhythm = [
  { icon: BikeIcon, title: "Sortides de diumenge", text: "Carretera i muntanya, de març a octubre." },
  { icon: HeartIcon, title: "Social Ride · dijous", text: "Ritme suau entre setmana, de març a octubre (sense agost)." },
  { icon: ClockIcon, title: "Social Ride iniciàtica · dimarts", text: "Pensada per a qui s'inicia, el mateix període que el Social Ride." },
  { icon: MapPinIcon, title: "Caminades de club", text: "Una al gener i una al desembre, obertes a tothom." },
];

const talks = [
  { quarter: "T1 · Març", title: "Normativa vial per a ciclistes" },
  { quarter: "T2 · Juny", title: "Entrenament per a ciclistes" },
  { quarter: "T3 · Setembre", title: "Nutrició per a ciclistes" },
  { quarter: "T4 · Novembre", title: "Mecànica per a ciclistes" },
];

const galleryPreview = ["/assets/foto-1.jpg", "/assets/foto-3.jpg", "/assets/foto-6.jpg", "/assets/foto-7.jpg"];

export default function Activitats() {
  return (
    <>
      <section className="hero">
        <div
          className="hero-slideshow"
          style={{
            backgroundImage: "url(/assets/foto-7.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container hero-top">
          <p className="hero-kicker">Club Ciclista Torelló - Osona, des de 1969</p>
          <h1>
            Activitats i
            <br />
            sortides per a tots
          </h1>
          <p className="lead">
            Sortides de diumenge, Social Ride entre setmana, xerrades formatives i esdeveniments singulars oberts a tothom, dins el full de ruta de la temporada 2027.
          </p>
          <div className="hero-actions">
            <Link to="/contacte" className="btn btn-primary">Fes-te soci</Link>
            <Link to="#calendari" className="btn btn-outline">Veure calendari</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div className="when">
              <strong>Diumenge, 8:00 h</strong>
              <span>Punt de trobada: Plaça Nova, Torelló</span>
            </div>
            <div className="band-actions">
              <Link to="#calendari" className="btn btn-primary">Veure calendari complet</Link>
              <Link to="/contacte" className="btn btn-outline">Fes-te soci</Link>
            </div>
          </div>
        </div>
      </section>

      <UpcomingFortnight />

      <div className="stats-wrap">
        <div className="container">
          <div className="stats">
            <div className="stat"><Counter target={110} /><span>Activitats el 2027</span></div>
            <div className="stat"><Counter target={29} /><span>Sortides de diumenge</span></div>
            <div className="stat"><Counter target={59} /><span>Social Ride setmanals</span></div>
            <div className="stat"><Counter target={9} /><span>Esdeveniments singulars</span></div>
          </div>
        </div>
      </div>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <h2>El ritme de cada setmana</h2>
            <p>El calendari 2027 es construeix sobre aquest ritme regular, de març a octubre.</p>
          </div>
          <div className="grid grid-4">
            {weeklyRhythm.map(({ icon: Icon, title, text }) => (
              <div className="card" key={title}>
                <div className="icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="calendari">
        <div className="container">
          <div className="section-head">
            <h2>Esdeveniments destacats 2027</h2>
            <p>A banda del ritme setmanal, el calendari 2027 inclou set esdeveniments singulars.</p>
          </div>
          <div className="grid grid-3">
            {events.map((event) => (
              <article className="card ride-card" key={event.name}>
                <div className="ride-date"><strong>{event.day}</strong><span>{event.month}</span></div>
                <h3>{event.name}</h3>
                <p>{event.text}</p>
                <span className="chip">{event.tag}</span>
              </article>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            Format, recorreguts i dies exactes d'alguns esdeveniments encara estan per concretar. Consulta el grup de WhatsApp del club per a la confirmació de cada sortida.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <h2>Cicle de xerrades formatives</h2>
            <p>Quatre xerrades obertes a socis i no socis, una per trimestre. Dia exacte, ponents i format encara per concretar.</p>
          </div>
          <div className="grid grid-4">
            {talks.map((talk) => (
              <div className="card" key={talk.quarter}>
                <span className="feature-tag">{talk.quarter}</span>
                <h3>{talk.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Un tast de les nostres sortides</h2>
          </div>
          <div className="gallery-grid">
            {galleryPreview.map((src) => (
              <Link to="/galeria" className="gallery-item" key={src}>
                <img src={src} alt="" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-primary">
        <div className="container band-split">
          <div>
            <h2>T'esperem a la plaça!</h2>
            <p>Primera vegada amb nosaltres? Pots venir a provar una sortida abans de fer-te soci. Escriu-nos i t'assignem el grup de nivell adequat.</p>
          </div>
          <div className="band-actions">
            <Link to="/contacte" className="btn btn-primary">Escriu-nos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
