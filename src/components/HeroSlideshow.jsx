import { useEffect, useRef, useState } from "react";

const photos = [
  "/assets/foto-1.jpg",
  "/assets/foto-2.jpg",
  "/assets/foto-3.jpg",
  "/assets/foto-4.jpg",
  "/assets/foto-5.jpg",
  "/assets/foto-6.jpg",
  "/assets/foto-7.jpg",
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  // Photos load one ahead of when they're shown instead of all at once,
  // since each one can be a few hundred KB.
  const [loadedCount, setLoadedCount] = useState(2);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion.current) return;

    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % photos.length;
        setLoadedCount((count) => Math.max(count, next + 2));
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {photos.map((src, index) => (
        <img
          key={src}
          className={`hero-slide${index === active ? " is-active" : ""}`}
          src={index < loadedCount ? src : undefined}
          alt=""
        />
      ))}
    </div>
  );
}
