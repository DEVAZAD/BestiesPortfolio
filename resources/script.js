// Scroll reveal with staggered siblings
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.querySelectorAll(".reveal")];
      setTimeout(
        () => e.target.classList.add("visible"),
        siblings.indexOf(e.target) * 90,
      );
      io.unobserve(e.target);
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  }),
);

// Nav shadow on scroll
window.addEventListener(
  "scroll",
  () => {
    document.querySelector("nav").style.boxShadow =
      scrollY > 10 ? "0 2px 24px rgba(181,72,95,.07)" : "";
  },
  { passive: true },
);
