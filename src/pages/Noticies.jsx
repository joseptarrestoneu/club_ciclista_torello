import { Link } from "react-router-dom";

const news = [
  {
    date: "12 de setembre de 2026",
    category: "Competició",
    title: "L'equip juvenil puja al podi a la Pujada a Rocaprevera",
    text: "Dos corredors del club acaben entre els cinc primers de la seva categoria en una de les proves més exigents del calendari comarcal.",
  },
  {
    date: "30 d'agost de 2026",
    category: "Club",
    title: "Obertes les inscripcions per a la temporada 2026-2027",
    text: "Ja pots renovar la teva llicència o fer-te soci de cara a la nova temporada. Consulta les quotes i la documentació necessària.",
  },
  {
    date: "14 d'agost de 2026",
    category: "Cròniques",
    title: "Crònica de la marxa cicloturista d'estiu",
    text: "Més de 90 persones van completar la ruta pels camins de la Vall del Ges en una jornada amb un ambient immillorable.",
  },
  {
    date: "2 d'agost de 2026",
    category: "Gravel",
    title: "Nova ruta senyalitzada al Collsacabra",
    text: "El club col·labora amb l'ajuntament per senyalitzar un nou circuit de gravel de 50 km.",
  },
  {
    date: "18 de juliol de 2026",
    category: "Brevets",
    title: "El club completa el seu primer Brevet BRM 200",
    text: "Un grup de socis va completar els 200 km del primer Brevet homologat organitzat pel club.",
  },
  {
    date: "5 de juliol de 2026",
    category: "Club",
    title: "Es renova el conveni amb els comerços col·laboradors",
    text: "Els socis i sòcies del club continuaran gaudint de descomptes a botigues i tallers de la zona.",
  },
];

export default function Noticies() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/" style={{ color: "inherit" }}>Inici</Link> / Notícies</div>
          <h1>Notícies del club</h1>
          <p>Resultats esportius, cròniques de sortides i tot el que passa al Club Ciclista Torelló.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {news.map((item) => (
              <article className="card news-card" key={item.title}>
                <div className="meta">{item.date} · {item.category}</div>
                <h3><a href="#">{item.title}</a></h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
