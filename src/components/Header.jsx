import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SunIcon, MoonIcon } from "./icons.jsx";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cct-theme");
    if (stored) {
      document.documentElement.dataset.theme = stored;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("cct-theme", next);
  };

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img src="/assets/logo.png" alt="Club Ciclista Torelló" className="brand-mark" />
          <span className="brand-name">Club Ciclista Torelló</span>
        </NavLink>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-tools">
          <button
            className="theme-toggle"
            aria-label="Canvia entre tema clar i fosc"
            onClick={toggleTheme}
          >
            <SunIcon className="icon-sun" />
            <MoonIcon className="icon-moon" />
          </button>
          <NavLink to="/contacte" className="btn btn-primary nav-cta">
            Fes-te soci
          </NavLink>
          <button
            className={`nav-toggle${open ? " is-open" : ""}`}
            aria-label={open ? "Tanca el menú" : "Obre el menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`nav-overlay${open ? " is-open" : ""}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) => (isActive ? "active" : undefined)}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink to="/contacte" className="btn btn-primary" onClick={closeMenu}>
          Fes-te soci
        </NavLink>
      </div>
    </header>
  );
}
