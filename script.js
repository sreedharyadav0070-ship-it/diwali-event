
document.addEventListener("DOMContentLoaded", function () {

    /* MOBILE NAVIGATION */
    const menuToggle = document.getElementById("menu-toggle")
        || document.querySelector(".menu-toggle");

    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
            });
        });
    }

    /* ORGANIZER CAROUSEL */
    const organizerTrack = document.querySelector(".organizer-track");

    if (organizerTrack && !organizerTrack.dataset.duplicated) {
        const originalSlides = Array.from(organizerTrack.children);

        originalSlides.forEach(function (slide) {
            const clone = slide.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");

            clone.querySelectorAll("img").forEach(function (img) {
                img.alt = "";
            });

            organizerTrack.appendChild(clone);
        });

        organizerTrack.dataset.duplicated = "true";
    }

    /* FESTIVE FIREWORKS — NO SOUND */
    const canvas = document.getElementById("fireworks");

    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = 0;
        let height = 0;
        let particles = [];
        let lastLaunch = 0;

        function resizeCanvas() {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);

            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

        function launchFirework() {
            const x = Math.random() * width;
            const y = height * (0.12 + Math.random() * 0.42);
            const hue = 35 + Math.random() * 35;
            const count = 35 + Math.floor(Math.random() * 25);

            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const speed = 1 + Math.random() * 3;

                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 45 + Math.random() * 30,
                    maxLife: 75,
                    hue: hue,
                    size: 1 + Math.random() * 2
                });
            }
        }

        function animateFireworks(timestamp) {
            ctx.clearRect(0, 0, width, height);

            if (timestamp - lastLaunch > 900 + Math.random() * 700) {
                launchFirework();
                lastLaunch = timestamp;
            }

            particles = particles.filter(function (particle) {
                return particle.life > 0;
            });

            particles.forEach(function (particle) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.025;
                particle.vx *= 0.99;
                particle.life -= 1;

                const opacity = Math.max(0, particle.life / particle.maxLife);

                ctx.beginPath();
                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "hsla(" + particle.hue + ", 100%, 70%, " +
                    opacity + ")";

                ctx.shadowBlur = 10;
                ctx.shadowColor = "#f5c76b";
                ctx.fill();
            });

            ctx.shadowBlur = 0;
            requestAnimationFrame(animateFireworks);
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        requestAnimationFrame(animateFireworks);
    }

});
