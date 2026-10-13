import { Link } from "react-router-dom";
import HeroSlideshow from "../components/HeroSlideshow.jsx";
import Counter from "../components/Counter.jsx";
import { news } from "../data/news.js";

export default function Home() {
  return (
    <>
      <section className="hero">
        <HeroSlideshow />
        <div className="container hero-top">
          <p className="hero-kicker">Club Ciclista Torelló - Osona, des de 1969</p>
          <h1>
            Pedalem junts,
            <br />
            pugem el que calgui
          </h1>
          <p className="lead">
            Un club obert a tothom: sortides de carretera i gravel cada setmana, social-rides
            entre setmana, cicloturisme i molt bon ambient de grup.
          </p>
          <div className="hero-actions">
            <Link to="/contacte" className="btn btn-primary">Fes-te soci</Link>
            <Link to="/activitats" className="btn btn-outline">Veure calendari</Link>
          </div>
        </div>
      </section>

      <div className="stats-wrap">
        <div className="container">
          <div className="stats">
            <div className="stat"><Counter target={180} suffix="+" /><span>Socis i sòcies</span></div>
            <div className="stat"><Counter target={57} /><span>Anys d'història</span></div>
            <div className="stat"><Counter target={60} /><span>Sortides l'any</span></div>
            <div className="stat"><Counter target={3} /><span>Grups de nivell</span></div>
          </div>
        </div>
      </div>

      <section className="band band-dark">
        <div className="container band-split">
          <div>
            <h2>Un club obert a tothom que vulgui pedalar</h2>
            <p>Només cal tenir ganes de sortir en bicicleta i passar-ho bé amb el grup.</p>
          </div>
          <div className="band-actions">
            <Link to="/club" className="btn btn-outline">Coneix el club</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Un club per a cada tipus de ciclista</h2>
            <p>Tant si vols apretar-te com si vols sortir a rodar tranquil·lament els diumenges, tens un lloc al club.</p>
          </div>
          <div className="feature-list">
            <div className="feature-row">
              <span className="feature-tag">Sortides</span>
              <div>
                <h3>Sortides cada setmana</h3>
                <p>Carretera els diumenges, social rides entre setmana i sortides especials tot l'any.</p>
              </div>
            </div>
            <div className="feature-row">
              <span className="feature-tag">Activitats</span>
              <div>
                <h3>Activitats per a tots</h3>
                <p>A més de les sortides setmanals, organitzem activitats socials i esdeveniments especials durant tot l'any.</p>
              </div>
            </div>
            <div className="feature-row">
              <span className="feature-tag">Ambient</span>
              <div>
                <h3>Ambient familiar</h3>
                <p>Un club de poble, proper, on tothom es coneix i s'ajuda i s'espera a la carretera.</p>
              </div>
            </div>
            <div className="feature-row">
              <span className="feature-tag">Brevets</span>
              <div>
                <h3>Secció de Brevets</h3>
                <p>Organitzem i participem en Brevets de totes les distàncies i per a ciclistes de tots els nivells.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-primary">
        <div className="container band-split">
          <div>
            <h2>Vine a provar-ho un diumenge</h2>
            <p>Cada diumenge sortim des de la Gasolinera Galp de Torelló. Comprova el calendari per veure les properes sortides. Vine a rodar amb nosaltres abans de fer-te soci, sense compromís.</p>
          </div>
          <div className="band-actions">
            <Link to="/activitats#quinzena" className="btn btn-primary">Què toca aquesta setmana?</Link>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <h2>Esdeveniments destacats de la temporada 2027</h2>
            <p>A banda del ritme setmanal de sortides i Social Ride, el calendari 2027 inclou set esdeveniments singulars.</p>
          </div>
          <div className="grid grid-3">
            <article className="card ride-card">
              <div className="ride-date"><strong>03</strong><span>abr.</span></div>
              <h3>Brevet 200</h3>
              <p>Repte de llarga distància tipus audax/randonneur, de 200 km i sense competició.</p>
            </article>
            <article className="card ride-card">
              <div className="ride-date"><strong>26-28</strong><span>jul.</span></div>
              <h3>Tour de Charleys</h3>
              <p>Tres dies de col·laboració, amb retransmissió en directe de Ràdio Ona Torelló.</p>
            </article>
            <article className="card ride-card">
              <div className="ride-date"><strong>18</strong><span>set.</span></div>
              <h3>Pescallunes Attack</h3>
              <p>Ciclisme èpic amb bicicletes clàssiques pel nucli antic de Torelló.</p>
            </article>
          </div>
          <p style={{ marginTop: 32 }}>
            <Link to="/activitats" className="btn btn-primary">Veure calendari</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Darreres notícies</h2>
          </div>
          <div className="grid grid-3">
            {news.slice(0, 3).map((item) => (
              <article className="card news-card" key={item.slug}>
                <div className="thumb"><img src={item.photo} alt="" /></div>
                <div className="meta">{item.date}</div>
                <h3><Link to={`/noticies/${item.slug}`}>{item.title}</Link></h3>
                <p>{item.entradeta}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 32 }}>
            <Link to="/noticies" className="btn btn-primary">Veure totes les notícies</Link>
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Vols pedalar amb nosaltres?</h2>
              <p>Fer-se soci del club és senzill i dona accés a totes les sortides, aplicació i carnet de soci i moltes hores de diversió.</p>
            </div>
            <Link to="/contacte" className="btn btn-primary">Fes-te soci</Link>
          </div>
        </div>
      </section>
    </>
  );
}
