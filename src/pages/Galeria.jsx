import { useState } from "react";
import { Link } from "react-router-dom";
import { CameraIcon } from "../components/icons.jsx";

const filters = [
  { key: "all", label: "Totes" },
  { key: "carretera", label: "Carretera" },
  { key: "gravel", label: "Gravel" },
  { key: "brevets", label: "Brevets" },
  { key: "club", label: "Vida de club" },
];

const items = [
  { category: "carretera", label: "Ruta del Ter, 2026", photo: "/assets/foto-1.jpg" },
  { category: "gravel", label: "Pujada al Far", photo: "/assets/foto-2.jpg" },
  { category: "club", label: "Sopar de temporada", photo: "/assets/foto-3.jpg" },
  { category: "brevets", label: "Brevet BRM 200 Osona", photo: "/assets/foto-4.jpg" },
  { category: "carretera", label: "Volta al Bisaura", photo: "/assets/foto-5.jpg" },
  { category: "gravel", label: "Circuit Collsacabra", photo: "/assets/foto-6.jpg" },
  { category: "club", label: "45è aniversari del club", photo: "/assets/foto-7.jpg" },
  { category: "brevets", label: "Sortida de Brevets", photo: "/assets/foto-1.jpg" },
];

export default function Galeria() {
  const [active, setActive] = useState("all");
  const visible = items.filter((item) => active === "all" || item.category === active);

  return (
    <>
      <section className="hero">
        <div
          className="hero-slideshow"
          style={{
            backgroundImage: "url(/assets/foto-4.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container hero-top">
          <p className="hero-kicker">Club Ciclista Torelló - Osona, des de 1969</p>
          <h1>
            Galeria
            <br />
            del club
          </h1>
          <p className="lead">
            Un tast de les sortides, competicions i trobades del club. Aquí recollim els moments que defineixen la nostra vida de grup i el nostre ambient.
          </p>
          <div className="hero-actions">
            <Link to="/contacte" className="btn btn-primary">Fes-te soci</Link>
            <Link to="/activitats" className="btn btn-outline">Veure sortides</Link>
          </div>
          {/* <nav className="tab-nav" aria-label="Seccions de la galeria">
            <Link to="/activitats">Sortides</Link>
            <Link to="/noticies">Notícies</Link>
            <Link to="/galeria">Galeria</Link>
            <Link to="/contacte">Contacte</Link>
          </nav> */}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={`filter-btn${active === filter.key ? " active" : ""}`}
                onClick={() => setActive(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visible.map((item) => (
              <div className="gallery-item" key={item.label}>
                <img src={item.photo} alt="" />
                <CameraIcon />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
