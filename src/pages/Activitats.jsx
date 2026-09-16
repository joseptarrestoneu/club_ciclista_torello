import { Link } from "react-router-dom";
import { BikeIcon, GravelIcon, MapPinIcon, TrophyIcon } from "../components/icons.jsx";

const modalities = [
  { icon: BikeIcon, title: "Carretera", text: "Sortides els dissabtes al matí, entre 60 i 100 km segons el grup." },
  { icon: GravelIcon, title: "Gravel", text: "Rutes per camins i pistes d'Osona i el Bisaura, entre setmana i els caps de setmana." },
  { icon: MapPinIcon, title: "Cicloturisme", text: "Sortides familiars a ritme suau, obertes a tots els nivells." },
  { icon: TrophyIcon, title: "Brevets", text: "Rutes de llarga distància homologades, per a qui vulgui anar més enllà." },
];

const rides = [
  { date: "Dis. 20 set.", name: "Ruta del Ter", mode: "Carretera", distance: "78 km", level: "Mitjà", badge: "badge-orange" },
  { date: "Diu. 21 set.", name: "Pujada al Far", mode: "Gravel", distance: "42 km", level: "Alt", badge: "badge-red" },
  { date: "Diu. 28 set.", name: "Sortida familiar al Pantà", mode: "Cicloturisme", distance: "25 km", level: "Baix", badge: "badge-green" },
  { date: "Dis. 4 oct.", name: "Volta al Bisaura", mode: "Carretera", distance: "95 km", level: "Alt", badge: "badge-red" },
  { date: "Diu. 5 oct.", name: "Circuit Collsacabra", mode: "Gravel", distance: "50 km", level: "Mitjà", badge: "badge-orange" },
  { date: "Diu. 12 oct.", name: "Brevet BRM 200 Osona", mode: "Brevets", distance: "200 km", level: "Alt", badge: "badge-red" },
];

export default function Activitats() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/" style={{ color: "inherit" }}>Inici</Link> / Activitats</div>
          <h1>Activitats i sortides</h1>
          <p>Cada setmana organitzem sortides per a tots els nivells. Tria la teva modalitat i vine a rodar amb nosaltres.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {modalities.map(({ icon: Icon, title, text }) => (
              <div className="card" key={title}>
                <div className="icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <h2>Properes sortides</h2>
            <p>Punt de trobada: local social del club, 15 minuts abans de l'hora de sortida.</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Sortida</th>
                  <th>Modalitat</th>
                  <th>Distància</th>
                  <th>Nivell</th>
                </tr>
              </thead>
              <tbody>
                {rides.map((ride) => (
                  <tr key={ride.name}>
                    <td>{ride.date}</td>
                    <td>{ride.name}</td>
                    <td>{ride.mode}</td>
                    <td>{ride.distance}</td>
                    <td><span className={`badge ${ride.badge}`}>{ride.level}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            Calendari orientatiu subjecte a canvis per condicions meteorològiques. Consulta el grup de WhatsApp del club per a la confirmació de cada sortida.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Primera vegada amb nosaltres?</h2>
              <p>Pots venir a provar una sortida abans de fer-te soci. Escriu-nos i t'assignem el grup de nivell adequat.</p>
            </div>
            <Link to="/contacte" className="btn btn-primary">Escriu-nos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
