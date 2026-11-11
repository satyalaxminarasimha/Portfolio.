(() => {
  "use strict";

  const header = document.getElementById("header");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");

  /* ---------- Header background on scroll ---------- */
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  };

  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Highlight the active nav link ---------- */
  if ("IntersectionObserver" in window) {
    const linkFor = (id) => document.querySelector(`.nav__link[href="#${id}"]`);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) => l.classList.remove("is-active"));
          const link = linkFor(entry.target.id);
          if (link) link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));
  }

  /* ---------- Copy email to clipboard ---------- */
  const copyBtn = document.getElementById("copy-email");
  if (copyBtn && navigator.clipboard) {
    const label = copyBtn.querySelector(".copy-label");
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.email);
        copyBtn.classList.add("is-copied");
        label.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.classList.remove("is-copied");
          label.textContent = "Copy";
        }, 2000);
      } catch {
        window.location.href = `mailto:${copyBtn.dataset.email}`;
      }
    });
  } else if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      window.location.href = `mailto:${copyBtn.dataset.email}`;
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
