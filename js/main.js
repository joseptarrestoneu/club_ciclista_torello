document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === document.body.dataset.page) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".footer-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Theme toggle (light/dark), persisted per visitor
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const storedTheme = localStorage.getItem("cct-theme");

  if (storedTheme) {
    root.dataset.theme = storedTheme;
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const current = root.dataset.theme || (prefersDark ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("cct-theme", next);
    });
  }

  // Gallery filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;

      galleryItems.forEach((item) => {
        const show = category === "all" || item.dataset.category === category;
        item.style.display = show ? "" : "none";
      });
    });
  });

  // Contact form (demo submit)
  const form = document.querySelector(".contact-form");
  const successBox = document.querySelector(".form-success");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (successBox) {
        successBox.classList.add("visible");
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  // Hero photo slideshow — images load one ahead of when they're needed
  // instead of all at once, since hero photos can be several MB each.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSlides = document.querySelectorAll(".hero-slide");

  if (heroSlides.length > 1) {
    const loadSlide = (index) => {
      const slide = heroSlides[index];
      if (slide && slide.dataset.src) {
        slide.src = slide.dataset.src;
        delete slide.dataset.src;
      }
    };

    loadSlide(1);

    if (!prefersReducedMotion) {
      let activeSlide = 0;

      setInterval(() => {
        heroSlides[activeSlide].classList.remove("is-active");
        activeSlide = (activeSlide + 1) % heroSlides.length;
        heroSlides[activeSlide].classList.add("is-active");
        loadSlide((activeSlide + 1) % heroSlides.length);
      }, 5000);
    }
  }

  // Animated stat counters
  const counters = document.querySelectorAll("[data-count]");

  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      if (prefersReducedMotion) {
        el.textContent = target + suffix;
      } else {
        requestAnimationFrame(step);
      }
    };

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );

      counters.forEach((el) => counterObserver.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  // Back to top button
  const backToTop = document.querySelector("[data-back-to-top]");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("visible", window.scrollY > 480);
      },
      { passive: true }
    );

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
