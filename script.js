/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const menu =
        document.getElementById("navMenu");

    menu.classList.toggle("active");

}


const navLinks =
    document.querySelectorAll("#navMenu a");


navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        document
            .getElementById("navMenu")
            .classList.remove("active");

    });

});



/* ================= FIREWORKS ================= */

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");


let fireworks = [];

let particles = [];



/* ================= CANVAS SIZE ================= */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* ================= FIREWORK ================= */

class Firework {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            canvas.height;


        this.targetX =
            Math.random() *
            canvas.width;


        this.targetY =
            Math.random() *
            canvas.height * 0.55
            + 50;


        this.speed = 7;


        this.angle =
            Math.atan2(
                this.targetY - this.y,
                this.targetX - this.x
            );


        this.velocityX =
            Math.cos(this.angle)
            * this.speed;


        this.velocityY =
            Math.sin(this.angle)
            * this.speed;


        this.exploded = false;

    }


    update() {

        this.x +=
            this.velocityX;

        this.y +=
            this.velocityY;


        const distance =
            Math.sqrt(

                Math.pow(
                    this.targetX -
                    this.x,
                    2
                )

                +

                Math.pow(
                    this.targetY -
                    this.y,
                    2
                )

            );


        if (distance < 10) {

            this.explode();

            this.exploded = true;

        }

    }


    draw() {

        ctx.beginPath();


        ctx.arc(
            this.x,
            this.y,
            2,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#ffd54a";


        ctx.fill();

    }


    explode() {

        const particleCount = 80;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(

                new Particle(
                    this.x,
                    this.y
                )

            );

        }

    }

}



/* ================= PARTICLES ================= */

class Particle {

    constructor(x, y) {

        this.x = x;

        this.y = y;


        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            Math.random() * 6 + 2;


        this.velocityX =
            Math.cos(angle) *
            speed;


        this.velocityY =
            Math.sin(angle) *
            speed;


        this.alpha = 1;


        this.gravity = 0.06;


        this.friction = 0.98;

    }


    update() {

        this.velocityX *=
            this.friction;


        this.velocityY *=
            this.friction;


        this.velocityY +=
            this.gravity;


        this.x +=
            this.velocityX;


        this.y +=
            this.velocityY;


        this.alpha -=
            0.012;

    }


    draw() {

        ctx.save();


        ctx.globalAlpha =
            this.alpha;


        ctx.beginPath();


        ctx.arc(
            this.x,
            this.y,
            2,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#ffd54a";


        ctx.fill();


        ctx.restore();

    }

}



/* ================= CREATE FIREWORK ================= */

function createFirework() {

    fireworks.push(
        new Firework()
    );

}



/* ================= ANIMATION ================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    ctx.fillStyle =
        "rgba(8, 4, 0, 0.18)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* Fireworks */

    for (
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const firework =
            fireworks[i];


        firework.update();

        firework.draw();


        if (
            firework.exploded
        ) {

            fireworks.splice(
                i,
                1
            );

        }

    }



    /* Particles */

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            particles[i];


        particle.update();

        particle.draw();


        if (
            particle.alpha <= 0
        ) {

            particles.splice(
                i,
                1
            );

        }

    }

}



/* ================= START ================= */

animate();



/* New fireworks */

setInterval(
    function() {

        createFirework();

    },
    1200
);



/* Initial fireworks */

setTimeout(
    createFirework,
    500
);


setTimeout(
    createFirework,
    1500
);


setTimeout(
    createFirework,
    2500
);
