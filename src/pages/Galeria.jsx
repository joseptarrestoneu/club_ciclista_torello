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
  { category: "carretera", label: "Ruta del Ter, 2026", color: "#ff5669" },
  { category: "gravel", label: "Pujada al Far", color: "#1a1a1a" },
  { category: "club", label: "Sopar de temporada", color: "#6b6558" },
  { category: "brevets", label: "Brevet BRM 200 Osona", color: "#d63a4e" },
  { category: "carretera", label: "Volta al Bisaura", color: "#1a1a1a" },
  { category: "gravel", label: "Circuit Collsacabra", color: "#6b6558" },
  { category: "club", label: "45è aniversari del club", color: "#ff5669" },
  { category: "brevets", label: "Sortida de Brevets", color: "#d63a4e" },
];

export default function Galeria() {
  const [active, setActive] = useState("all");
  const visible = items.filter((item) => active === "all" || item.category === active);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/" style={{ color: "inherit" }}>Inici</Link> / Galeria</div>
          <h1>Galeria</h1>
          <p>Un tast de les sortides, competicions i trobades del club. Substitueix aquestes plantilles per les teves pròpies fotos.</p>
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
              <div className="gallery-item" key={item.label} style={{ background: item.color }}>
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
