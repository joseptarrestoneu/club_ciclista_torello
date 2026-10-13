import { Link, useParams } from "react-router-dom";
import { news } from "../data/news.js";

export default function NoticiaDetall() {
  const { slug } = useParams();
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    return (
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/" style={{ color: "inherit" }}>Inici</Link> / <Link to="/noticies" style={{ color: "inherit" }}>Notícies</Link></div>
          <h1>Notícia no trobada</h1>
          <p>Potser s'ha mogut o ja no està disponible.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/" style={{ color: "inherit" }}>Inici</Link> / <Link to="/noticies" style={{ color: "inherit" }}>Notícies</Link>
          </div>
          <h1>{item.title}</h1>
          <p>{item.date} · {item.category}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 740 }}>
          <img
            src={item.photo}
            alt=""
            style={{ width: "100%", borderRadius: "var(--radius)", marginBottom: 32, aspectRatio: "16 / 9", objectFit: "cover" }}
          />
          <p style={{ fontWeight: 600, fontSize: "1.1rem" }}>{item.entradeta}</p>
          <p>{item.cos}</p>
          <p style={{ fontWeight: 600, marginTop: 24 }}>{item.tancament}</p>
          <p style={{ marginTop: 40 }}>
            <Link to="/noticies" className="btn btn-outline">Totes les notícies</Link>
          </p>
        </div>
      </section>
    </>
  );
}
