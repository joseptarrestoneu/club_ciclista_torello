import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import BackToTop from "./BackToTop.jsx";
import IntroGame from "./IntroGame.jsx";

const INTRO_KEY = "cct-intro-seen";

function shouldShowIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return !window.localStorage.getItem(INTRO_KEY);
}

export default function Layout() {
  const { pathname } = useLocation();
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const finishIntro = () => {
    window.localStorage.setItem(INTRO_KEY, "1");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroGame onComplete={finishIntro} />}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
