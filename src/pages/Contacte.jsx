import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon, InstagramIcon, FacebookIcon } from "../components/icons.jsx";

export default function Contacte() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
    form.reset();
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/" style={{ color: "inherit" }}>Inici</Link> / Contacte</div>
          <h1>Contacte</h1>
          <p>Tens dubtes, vols provar una sortida o fer-te soci? Escriu-nos i et respondrem el més aviat possible.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2>On som i com contactar-nos</h2>

              <div className="contact-item">
                <div className="icon"><MapPinIcon /></div>
                <div>
                  <h4>Local social</h4>
                  <p>Carrer Major, 12 · 08570 Torelló, Osona</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon"><MailIcon /></div>
                <div>
                  <h4>Correu electrònic</h4>
                  <p>info@cctorello.cat</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon"><PhoneIcon /></div>
                <div>
                  <h4>Telèfon</h4>
                  <p>93 850 00 00</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon"><ClockIcon /></div>
                <div>
                  <h4>Horari del local</h4>
                  <p>Dimarts i dijous, 19:00–21:00 · Dissabtes abans de cada sortida</p>
                </div>
              </div>

              <div className="social-row">
                <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              </div>

              <div className="map-wrap">
                <iframe
                  title="Mapa de localització del Club Ciclista Torelló"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.2460%2C42.0430%2C2.2760%2C42.0590&layer=mapnik&marker=42.0508%2C2.2610"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div>
              <div className={`form-success${submitted ? " visible" : ""}`}>
                Gràcies pel teu missatge! Ens posarem en contacte amb tu aviat.
              </div>
              <form className="contact-form" noValidate onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="nom">Nom i cognoms</label>
                    <input type="text" id="nom" name="nom" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Correu electrònic</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="telefon">Telèfon</label>
                    <input type="tel" id="telefon" name="telefon" />
                  </div>
                  <div className="field">
                    <label htmlFor="motiu">Motiu del contacte</label>
                    <select id="motiu" name="motiu" defaultValue="soci">
                      <option value="soci">Vull fer-me soci</option>
                      <option value="prova">Vull provar una sortida</option>
                      <option value="brevets">Brevets</option>
                      <option value="altres">Altres consultes</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="missatge">Missatge</label>
                  <textarea id="missatge" name="missatge" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar missatge</button>
                <p className="form-note">Aquest formulari és una plantilla de demostració; connecta'l al teu servei d'enviament de correu preferit per rebre els missatges.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
