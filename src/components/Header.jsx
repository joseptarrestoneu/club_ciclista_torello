import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BikeIcon, SunIcon, MoonIcon } from "./icons.jsx";

const navItems = [
  { to: "/", label: "Inici" },
  { to: "/club", label: "El Club" },
  { to: "/activitats", label: "Activitats" },
  { to: "/noticies", label: "Notícies" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contacte", label: "Contacte" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cct-theme");
    if (stored) {
      document.documentElement.dataset.theme = stored;
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("cct-theme", next);
  };

  return (
    <header className="site-header">
      <nav className={`nav container${open ? " open" : ""}`}>
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <BikeIcon />
          Club Ciclista Torelló
        </NavLink>
        <div className="nav-tools">
          <button
            className="theme-toggle"
            aria-label="Canvia entre tema clar i fosc"
            onClick={toggleTheme}
          >
            <SunIcon className="icon-sun" />
            <MoonIcon className="icon-moon" />
          </button>
          <button
            className="nav-toggle"
            aria-label="Obre el menú"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) => (isActive ? "active" : undefined)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/contacte" className="btn btn-primary" onClick={() => setOpen(false)}>
              Fes-te soci
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
