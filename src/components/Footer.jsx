import { Link } from "react-router-dom";
import { BikeIcon, InstagramIcon, FacebookIcon } from "./icons.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <BikeIcon />
              Club Ciclista Torelló
            </div>
            <p>Club ciclista de la comarca d'Osona, obert a persones majors d'edat i a tots els nivells des de 1969.</p>
          </div>
          <div>
            <h4>Navegació</h4>
            <ul>
              <li><Link to="/club">El Club</Link></li>
              <li><Link to="/activitats">Activitats</Link></li>
              <li><Link to="/noticies">Notícies</Link></li>
              <li><Link to="/galeria">Galeria</Link></li>
            </ul>
          </div>
          <div>
            <h4>Club</h4>
            <ul>
              <li><Link to="/contacte">Fes-te soci</Link></li>
              <li><Link to="/contacte">Contacte</Link></li>
              <li><Link to="/club">Junta directiva</Link></li>
            </ul>
          </div>
          <div>
            <h4>Segueix-nos</h4>
            <div className="social-row">
              <a href="https://www.instagram.com/clubciclistatorello/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Club Ciclista Torelló</span>
          <span>Torelló, Osona</span>
        </div>
      </div>
    </footer>
  );
}
