
"use strict";

/* =========================================
   ANVAYA 2026
   Mobile menu, organiser carousel and
   decorative golden fireworks.
   No audio.
   ========================================= */

/* MOBILE NAVIGATION */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

/* ORGANIZER CAROUSEL
   Photo files must be:
   organizer01.jpg through organizer22.jpg
*/

const organizerTrack = document.getElementById("organizer-track");
const organizerCount = 22;

if (organizerTrack) {
  function makeOrganizerCard(number, isDuplicate = false) {
    const card = document.createElement("article");
    card.className = "organizer-card";

    if (isDuplicate) {
      card.setAttribute("aria-hidden", "true");
    }

    const img = document.createElement("img");
    img.src = `organizer${String(number).padStart(2, "0")}.jpg`;
    img.alt = isDuplicate ? "" : `ANVAYA 2026 organizer ${number}`;
    img.loading = number <= 4 ? "eager" : "lazy";
    img.decoding = "async";

    img.addEventListener("error", () => {
      img.style.opacity = "0.15";
      img.alt = isDuplicate ? "" : `Photo missing for organizer ${number}`;
    });

    const name = document.createElement("h3");
    name.textContent = `Organizer ${number}`;

    const caption = document.createElement("p");
    caption.textContent = "ANVAYA 2026";

    card.append(img, name, caption);
    return card;
  }

  for (let number = 1; number <= organizerCount; number++) {
    organizerTrack.appendChild(makeOrganizerCard(number));
  }

  /* Duplicate the cards to create a continuous loop */
  for (let number = 1; number <= organizerCount; number++) {
    organizerTrack.appendChild(makeOrganizerCard(number, true));
  }
}

/* GOLDEN FIREWORKS */

const canvas = document.getElementById("fireworks");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
  let width = 0;
  let height = 0;
  let particles = [];
  let lastBurst = 0;
  let nextBurst = 700;

  const colours = [
    [255, 210, 110],
    [255, 166, 55],
    [255, 225, 160],
    [255, 95, 55],
    [255, 190, 65]
  ];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createBurst() {
    if (particles.length > 360) return;

    const x = width * (0.1 + Math.random() * 0.8);
    const y = height * (0.08 + Math.random() * 0.42);
    const colour = colours[Math.floor(Math.random() * colours.length)];
    const count = 45 + Math.floor(Math.random() * 30);
    const speed = 1.0 + Math.random() * 2.0;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const particleSpeed = speed * (0.45 + Math.random() * 0.8);

      particles.push({
        x,
        y,
        previousX: x,
        previousY: y,
        vx: Math.cos(angle) * particleSpeed,
        vy: Math.sin(angle) * particleSpeed,
        life: 50 + Math.random() * 40,
        maxLife: 90,
        radius: 0.8 + Math.random() * 1.6,
        colour
      });
    }
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    if (time - lastBurst > nextBurst) {
      createBurst();
      lastBurst = time;
      nextBurst = 700 + Math.random() * 1000;
    }

    particles = particles.filter((particle) => particle.life > 0);

    for (const p of particles) {
      p.previousX = p.x;
      p.previousY = p.y;

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.992;
      p.vy = p.vy * 0.992 + 0.018;
      p.life -= 1;

      const opacity = Math.max(0, p.life / p.maxLife);
      const [r, g, b] = p.colour;

      ctx.beginPath();
      ctx.moveTo(p.previousX, p.previousY);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.75})`;
      ctx.lineWidth = p.radius;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(animate);
}
