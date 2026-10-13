import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, MapPinIcon, TrophyIcon } from "../components/icons.jsx";

const timeline = [
  {
    year: "1969",
    title: "Fundació del club",
    text: "Un grup d'amics de Torelló comença a organitzar sortides els diumenges i decideix formalitzar el club.",
  },
  {
    year: "1992",
    title: "Primera secció de gravel",
    text: "Neix la secció de gravel aprofitant els camins de la Vall del Ges i el Bisaura.",
  },
  {
    year: "2005",
    title: "Primera participació en Brevets",
    text: "El club comença a organitzar i participar en Brevets de llarga distància.",
  },
  {
    year: "2016",
    title: "Nou local social",
    text: "Estrenem local propi al centre de Torelló, punt de trobada abans i després de cada sortida.",
  },
  {
    year: "2026",
    title: "Avui",
    text: "Més de 180 socis, tres grups de nivell i una seixantena de sortides organitzades cada any.",
  },
];

const board = [
  { initials: "MG", photo: "/assets/MG.jpg", name: "Marc Gilabert", role: "President", text: "Soci des de 2003, impulsor de la secció de Brevets del club." },
  { initials: "IK", photo: "/assets/IK.jpg", name: "Iker Carrasco", role: "Vicepresident", text: "Coordina les sortides de carretera i la relació amb altres clubs." },
  { initials: "MO", photo: "/assets/MO.jpg", name: "Maria Ojeda", role: "Secretària", text: "Gestiona les llicències, la roba i els temes administratius del club." },
  { initials: "AC", photo: "/assets/foto-6.jpg", name: "Anna Cid", role: "Tresorera", text: "Sòcia des de 2010, responsable de la tresoreria i la gestió econòmica del club." },
];

export default function Club() {
  const [joinForm, setJoinForm] = useState({ nom: "", email: "" });
  const [joined, setJoined] = useState(false);

  const handleJoin = (event) => {
    event.preventDefault();
    setJoined(true);
  };

  return (
    <>
      <section className="hero">
        <div
          className="hero-slideshow"
          style={{
            backgroundImage: "url(/assets/foto-3.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container hero-top">
          <p className="hero-kicker">Club Ciclista Torelló - Osona, des de 1969</p>
          <h1>
            El club on
            <br />
            cadascú troba el seu ritme
          </h1>
          <p className="lead">
            Sortides, cròniques, fotos i tot el que fem plegats. Un club obert a tothom que vulgui pedalar, compartir moments i gaudir de la carretera amb bona companyia.
          </p>
          <nav className="tab-nav" aria-label="Seccions del club">
            <Link to="/activitats">Sortides</Link>
            <Link to="/noticies">Notícies</Link>
            <Link to="/galeria">Galeria</Link>
            <Link to="/contacte">Fes-te soci</Link>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>De quatre amics a un club de 180 socis</h2>
            <p>El Club Ciclista Torelló és una entitat ciclista del municipi, activa des de 1969, que agrupa persones de totes les edats i nivells amb un mateix punt de trobada: sortir a rodar juntes, sigui quina sigui la seva experiència sobre la bicicleta.</p>
            <p>Per a la temporada 2027 fem un salt digital: a banda d'aquesta pàgina web, posem en marxa l'app ActClub per gestionar les sortides i fer de carnet de soci digital.</p>
            <div className="chip-row" style={{ marginTop: 16 }}>
              <span className="chip chip-primary">Iniciació</span>
              <span className="chip">Mitjà</span>
              <span className="chip">Avançat / Brevets</span>
            </div>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <div className="timeline-item" key={item.year}>
                <div className="year">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-primary">
        <div className="container band-split">
          <div>
            <h2>Més de 50 anys pedalant</h2>
            <p>La nostra missió: apropar el ciclisme a més persones del territori i mantenir viva una comunitat que surt a rodar junta, sigui quin sigui el nivell de cadascú, des de qui s'hi inicia fins als socis més veterans.</p>
            <p>Vols rebre les properes sortides i novetats del club directament al correu? Deixa'ns les teves dades.</p>
            {joined ? (
              <p style={{ color: "#fff", fontWeight: 600, marginTop: 24 }}>Gràcies! Ja et tenim apuntat/da.</p>
            ) : (
              <form className="inline-form" onSubmit={handleJoin}>
                <input
                  type="text"
                  placeholder="El teu nom"
                  aria-label="Nom"
                  required
                  value={joinForm.nom}
                  onChange={(e) => setJoinForm((f) => ({ ...f, nom: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="El teu correu electrònic"
                  aria-label="Correu electrònic"
                  required
                  value={joinForm.email}
                  onChange={(e) => setJoinForm((f) => ({ ...f, email: e.target.value }))}
                />
                <button type="submit" className="btn btn-primary">Apunta'm</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>El que ens defineix com a club</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="icon"><HeartIcon /></div>
              <h3>Ningú pedala sol</h3>
              <p>Sempre hi ha algú que t'espera al capdamunt del port.</p>
            </div>
            <div className="card">
              <div className="icon"><MapPinIcon /></div>
              <h3>Arrelats al territori</h3>
              <p>Promovem i cuidem els camins i carreteres de la nostra comarca, Osona.</p>
            </div>
            <div className="card">
              <div className="icon"><TrophyIcon /></div>
              <h3>Bon rotllo</h3>
              <p>Gaudim de l'esport i fomentem un ambient positiu i divertit dins del club.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Junta directiva</h2>
            <p>Un equip de voluntaris que fa possible cada sortida, cada esdeveniment i cada projecte del club.</p>
          </div>
          <div className="grid grid-4">
            {board.map((member) => (
              <div
                className="card person-card"
                key={member.initials}
                style={member.photo ? {
                  backgroundImage: `linear-gradient(180deg, rgba(10, 9, 8, 0.18), rgba(10, 9, 8, 0.75)), url(${member.photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                } : undefined}
              >
                <div className="person-card-overlay">
                  <p>{member.text}</p>
                  <div className="role">{member.role}</div>
                  <h2>{member.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Col·laboracions i presència al territori</h2>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <h3>Ràdio Ona Torelló</h3>
              <p>Mantenim una col·laboració activa amb Ràdio Ona Torelló. Per a la temporada 2027 l'ampliem amb "Les Ciclistes": un espai mensual amb especials dedicats al Giro d'Itàlia, el Tour de França i la Vuelta a Espanya, i la retransmissió en directe del Tour de Charleys.</p>
            </div>
            <div className="card">
              <h3>Ciclisme a les escoles</h3>
              <p>A l'abril i al maig fem presentacions a les diferents escoles de Torelló per apropar el ciclisme als alumnes del municipi.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
