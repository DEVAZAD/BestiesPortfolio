/* ============================================================
   SAKURA CANVAS ANIMATION
   ============================================================ */
const canvas = document.getElementById("sakura-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const petals = [];
const PETAL_COUNT = 28;

const PETAL_SHAPES = ["🌸", "🌺", "🍃"];

class Petal {
  constructor(reset = false) {
    this.reset(reset);
  }

  reset(fromTop = false) {
    this.x = Math.random() * canvas.width;
    this.y = fromTop ? -30 : Math.random() * canvas.height;
    this.size = 14 + Math.random() * 14;
    this.speedY = 0.6 + Math.random() * 0.9;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.03;
    this.opacity = 0.5 + Math.random() * 0.5;
    this.wave = Math.random() * Math.PI * 2;
    this.waveAmp = 0.4 + Math.random() * 0.6;
    this.emoji = PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)];
  }

  update() {
    this.wave += 0.018;
    this.x += this.speedX + Math.sin(this.wave) * this.waveAmp;
    this.y += this.speedY;
    this.angle += this.spin;

    if (this.y > canvas.height + 40) {
      this.reset(true);
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.emoji, 0, 0);
    ctx.restore();
  }
}

// Initialise
for (let i = 0; i < PETAL_COUNT; i++) {
  petals.push(new Petal(false));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings =
            entry.target.parentElement.querySelectorAll(".reveal");
          let delay = 0;
          siblings.forEach((el, idx) => {
            if (el === entry.target) delay = idx * 100;
          });
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  reveals.forEach((el) => observer.observe(el));
});

/* ============================================================
   SMOOTH ACTIVE NAV
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
