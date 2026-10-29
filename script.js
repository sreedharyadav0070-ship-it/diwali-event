
"use strict";

/* ==========================================
   DIWALI CELEBRATION 2026
   No envelope intro and no audio.
   ========================================== */

/* Mobile navigation */
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

/* ==========================================
   ORGANIZER CAROUSEL

   Expected files in the same folder as index.html:
   organizer01.jpg
   organizer02.jpg
   ...
   organizer22.jpg

   Change the filename pattern below if your actual
   filenames are different.
   ========================================== */

const organizerTrack = document.getElementById("organizer-track");
const organizerCount = 22;

if (organizerTrack) {
  const createOrganizerCard = (number) => {
    const card = document.createElement("article");
    card.className = "organizer-card";

    const image = document.createElement("img");
    image.src = `organizer${String(number).padStart(2, "0")}.jpg`;
    image.alt = `Diwali organizer ${number}`;
    image.loading = number <= 4 ? "eager" : "lazy";
    image.decoding = "async";

    const name = document.createElement("h3");
    name.textContent = `Organizer ${number}`;

    const role = document.createElement("p");
    role.textContent = "Diwali Celebration 2026";

    image.addEventListener("error", () => {
      image.alt = `Photo not found for organizer ${number}`;
      image.style.visibility = "hidden";
    });

    card.append(image, name, role);
    return card;
  };

  const addOrganizerSet = () => {
    for (let i = 1; i <= organizerCount; i++) {
      organizerTrack.appendChild(createOrganizerCard(i));
    }
  };

  addOrganizerSet();
  addOrganizerSet();
}

/* ==========================================
   GOLDEN FIREWORK PARTICLES
   Decorative canvas animation only.
   ========================================== */

const canvas = document.getElementById("fireworks");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
  let width = 0;
  let height = 0;
  let particles = [];
  let lastBurst = 0;

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createBurst = () => {
    if (particles.length > 180) return;

    const x = width * (0.15 + Math.random() * 0.7);
    const y = height * (0.12 + Math.random() * 0.43);
    const count = 16 + Math.floor(Math.random() * 13);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 0.5 + Math.random() * 1.7;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 45 + Math.random() * 30,
        maxLife: 75,
        radius: 0.8 + Math.random() * 1.4
      });
    }
  };

  const animate = (time) => {
    ctx.clearRect(0, 0, width, height);

    if (time - lastBurst > 1700 + Math.random() * 1300) {
      createBurst();
      lastBurst = time;
    }

    particles = particles.filter((p) => p.life > 0);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.008;
      p.life -= 1;

      const opacity = Math.max(0, p.life / p.maxLife);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, ${180 + Math.floor(Math.random() * 60)}, 85, ${opacity})`;
      ctx.shadowBlur = 9;
      ctx.shadowColor = "rgba(255, 184, 75, 0.65)";
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(animate);
}
