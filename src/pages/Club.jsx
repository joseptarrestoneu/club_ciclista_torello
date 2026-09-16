import { Link } from "react-router-dom";
import { HeartIcon, MapPinIcon, TrophyIcon, HomeIcon } from "../components/icons.jsx";

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
  { initials: "MR", name: "Marta Roca", role: "Presidenta", text: "Sòcia des de 2003, impulsora de la secció de Brevets del club." },
  { initials: "JP", name: "Jordi Puig", role: "Vicepresident", text: "Coordina les sortides de carretera i la relació amb altres clubs." },
  { initials: "NC", name: "Núria Camps", role: "Secretària", text: "Gestiona les inscripcions, les llicències i la comunicació del club." },
  { initials: "AV", name: "Albert Vila", role: "Tresorer", text: "Responsable de la secció de gravel i del manteniment del material." },
];

export default function Club() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/" style={{ color: "inherit" }}>Inici</Link> / El Club</div>
          <h1>El Club</h1>
          <p>Més de cinquanta-cinc anys pedalant per les carreteres i camins d'Osona, amb la mateixa passió des del primer dia.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>De quatre amics a un club de 180 socis</h2>
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

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>El que ens defineix com a club</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="icon"><HeartIcon /></div>
              <h3>Companyonia</h3>
              <p>Ningú pedala sol: sempre hi ha algú que t'espera al capdamunt del port.</p>
            </div>
            <div className="card">
              <div className="icon"><MapPinIcon /></div>
              <h3>Arrelats al territori</h3>
              <p>Promovem i cuidem els camins i carreteres de la nostra comarca, Osona.</p>
            </div>
            <div className="card">
              <div className="icon"><TrophyIcon /></div>
              <h3>Esforç i superació</h3>
              <p>Fomentem l'esport de base i acompanyem els nostres socis fins als reptes de llarga distància.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Junta directiva</h2>
            <p>Un equip de voluntaris que fa possible cada sortida, cada esdeveniment i cada projecte del club.</p>
          </div>
          <div className="grid grid-4">
            {board.map((member) => (
              <div className="card person-card" key={member.initials}>
                <div className="avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <p>{member.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <h2>Local social al centre de Torelló</h2>
              <p>El nostre local és el punt de trobada abans i després de cada sortida: hi guardem el material del club, hi fem les xerrades tècniques i hi celebrem el sopar de final de temporada.</p>
              <p>Obert els dimarts i dijous a la tarda, i els dissabtes abans de cada sortida de grup.</p>
              <Link to="/contacte" className="btn btn-primary">Com arribar-hi</Link>
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 280, margin: 0, borderRadius: 14, background: "var(--color-ink)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <HomeIcon style={{ width: 56, height: 56 }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
