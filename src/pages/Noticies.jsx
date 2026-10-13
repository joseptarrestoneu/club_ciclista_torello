import { useState } from "react";
import { Link } from "react-router-dom";
import { news } from "../data/news.js";

const categories = ["Totes", "Brevets", "Club", "Cròniques"];

export default function Noticies() {
  const [category, setCategory] = useState("Totes");
  const visible = news.filter((item) => category === "Totes" || item.category === category);

  return (
    <>
      <section className="hero">
        <div
          className="hero-slideshow"
          style={{
            backgroundImage: "url(/assets/foto-6.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container hero-top">
          <p className="hero-kicker">Club Ciclista Torelló - Osona, des de 1969</p>
          <h1>
            Notícies
            <br />
            del club
          </h1>
          <p className="lead">
            Resultats esportius, cròniques de sortides i tot el que passa al Club Ciclista Torelló. Aquí hi ha la vida del grup setmana rere setmana.
          </p>
          <div className="hero-actions">
            <Link to="/contacte" className="btn btn-primary">Fes-te soci</Link>
            <Link to="/galeria" className="btn btn-outline">Veure galeria</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${category === cat ? " active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-3">
            {visible.map((item) => (
              <article className="card news-card" key={item.slug}>
                <div className="thumb"><img src={item.photo} alt="" /></div>
                <div className="meta">{item.date} · {item.category}</div>
                <h3><Link to={`/noticies/${item.slug}`}>{item.title}</Link></h3>
                <p>{item.entradeta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
