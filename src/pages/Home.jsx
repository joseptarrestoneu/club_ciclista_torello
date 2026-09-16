import { Link } from "react-router-dom";
import HeroSlideshow from "../components/HeroSlideshow.jsx";
import Counter from "../components/Counter.jsx";

export default function Home() {
  return (
    <>
      <section className="hero">
        <HeroSlideshow />
        <div className="container hero-top">
          <p className="hero-kicker">Club Ciclista Torelló — Osona, des de 1969</p>
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
            <Link to="/activitats" className="btn btn-outline">Calendari de sortides</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="stats">
          <div className="stat"><Counter target={180} suffix="+" /><span>Socis i sòcies</span></div>
          <div className="stat"><Counter target={57} /><span>Anys d'història</span></div>
          <div className="stat"><Counter target={60} /><span>Sortides l'any</span></div>
          <div className="stat"><Counter target={3} /><span>Grups de nivell</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Un club per a cada tipus de ciclista</h2>
            <p>Tant si vols competir com si vols sortir a rodar tranquil·lament els diumenges, tens un lloc al club.</p>
          </div>
          <div className="feature-list">
            <div className="feature-row">
              <span className="feature-tag">Nivells</span>
              <div>
                <h3>Grups per a tots els nivells</h3>
                <p>Tres grups de ritme perquè ningú es quedi enrere ni s'avorreixi.</p>
              </div>
            </div>
            <div className="feature-row">
              <span className="feature-tag">Sortides</span>
              <div>
                <h3>Sortides cada setmana</h3>
                <p>Carretera els dissabtes, social rides entre setmana i sortides especials tot l'any.</p>
              </div>
            </div>
            <div className="feature-row">
              <span className="feature-tag">Ambient</span>
              <div>
                <h3>Ambient familiar</h3>
                <p>Un club de poble, proper, on tothom es coneix i s'ajuda a la carretera.</p>
              </div>
            </div>
            <div className="feature-row">
              <span className="feature-tag">Brevets</span>
              <div>
                <h3>Secció de Brevets</h3>
                <p>Organitzem i participem en Brevets per a ciclistes de tots els nivells.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <h2>Properes sortides</h2>
            <p>Consulta el calendari complet i apunta't a la propera ruta del club.</p>
          </div>
          <div className="grid grid-3">
            <article className="card ride-card">
              <div className="ride-date"><strong>20</strong><span>set.</span></div>
              <h3>Ruta del Ter</h3>
              <ul className="ride-meta">
                <li>Carretera</li>
                <li>78 km</li>
                <li><span className="badge badge-orange">Mitjà</span></li>
              </ul>
            </article>
            <article className="card ride-card">
              <div className="ride-date"><strong>21</strong><span>set.</span></div>
              <h3>Pujada al Far</h3>
              <ul className="ride-meta">
                <li>Gravel</li>
                <li>42 km</li>
                <li><span className="badge badge-red">Alt</span></li>
              </ul>
            </article>
            <article className="card ride-card">
              <div className="ride-date"><strong>28</strong><span>set.</span></div>
              <h3>Sortida familiar al Pantà</h3>
              <ul className="ride-meta">
                <li>Cicloturisme</li>
                <li>25 km</li>
                <li><span className="badge badge-green">Baix</span></li>
              </ul>
            </article>
          </div>
          <p style={{ marginTop: 32 }}>
            <Link to="/activitats" className="btn btn-primary">Veure totes les activitats</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Darreres notícies</h2>
          </div>
          <div className="grid grid-3">
            <article className="card news-card">
              <div className="meta">12 de setembre de 2026</div>
              <h3><Link to="/noticies">L'equip juvenil puja al podi a la Pujada a Rocaprevera</Link></h3>
              <p>Dos corredors del club acaben entre els cinc primers de la seva categoria.</p>
            </article>
            <article className="card news-card">
              <div className="meta">30 d'agost de 2026</div>
              <h3><Link to="/noticies">Obertes les inscripcions per a la temporada 2026-2027</Link></h3>
              <p>Ja pots renovar o fer-te soci de cara a la nova temporada.</p>
            </article>
            <article className="card news-card">
              <div className="meta">14 d'agost de 2026</div>
              <h3><Link to="/noticies">Crònica de la marxa cicloturista d'estiu</Link></h3>
              <p>Més de 90 persones van completar la ruta pels camins de la Vall del Ges.</p>
            </article>
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
            <Link to="/contacte" className="btn btn-primary">Contacta i fes-te soci</Link>
          </div>
        </div>
      </section>
    </>
  );
}
