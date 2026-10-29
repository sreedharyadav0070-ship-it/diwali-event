
/* ==================================
   DIWALI CELEBRATION 2026
   No audio
================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ENVELOPE INTRO */

    const intro = document.getElementById("intro");
    const envelope = document.getElementById("envelope");
    const openButton = document.getElementById("openInvite");
    let invitationOpened = false;

    document.body.classList.add("intro-active");

    function openInvitation() {
        if (invitationOpened) return;

        invitationOpened = true;
        envelope.classList.add("opened");

        setTimeout(function () {
            intro.classList.add("hidden");
            document.body.classList.remove("intro-active");
        }, 950);
    }

    envelope.addEventListener("click", openInvitation);
    openButton.addEventListener("click", openInvitation);

    /* MOBILE NAVIGATION */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });

    /* ORGANIZER CAROUSEL */

    const track = document.querySelector(".organizer-track");

    if (track && track.dataset.duplicated !== "true") {
        const slides = Array.from(track.children);

        slides.forEach(function (slide) {
            const clone = slide.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");

            clone.querySelectorAll("img").forEach(function (img) {
                img.alt = "";
                img.removeAttribute("loading");
            });

            track.appendChild(clone);
        });

        track.dataset.duplicated = "true";
    }

    /* FIREWORKS ANIMATION */

    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles = [];
    let lastLaunch = 0;
    let animationFrame = null;

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function launchFirework() {
        if (particles.length > 450) return;

        const x = Math.random() * width;
        const y = Math.random() * height * 0.48 + 30;
        const hue = Math.random() * 45 + 20;
        const count = 35;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 2.8 + 0.8;

            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: Math.random() * 0.012 + 0.009,
                hue: hue
            });
        }
    }

    function animateFireworks(timestamp) {
        ctx.clearRect(0, 0, width, height);

        if (!reduceMotion && timestamp - lastLaunch > 1250) {
            launchFirework();
            lastLaunch = timestamp;
        }

        particles = particles.filter(function (p) {
            return p.life > 0;
        });

        particles.forEach(function (p) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.018;
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.life -= p.decay;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
            ctx.fillStyle =
                "hsla(" + p.hue + ", 100%, 68%, " + p.life + ")";
            ctx.fill();
        });

        animationFrame = requestAnimationFrame(animateFireworks);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!reduceMotion) {
        animationFrame = requestAnimationFrame(animateFireworks);
    }

});
