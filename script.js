
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Organizer carousel: organizer01.jpg to organizer22.jpg
  const track = document.getElementById("organizerTrack");

  if (!track) return;

  const totalOrganizers = 22;
  const originalCards = [];

  function createOrganizer(number) {
    const card = document.createElement("article");
    card.className = "organizer-card";

    const image = document.createElement("img");

    const filename =
      "organizer" + String(number).padStart(2, "0") + ".jpg";

    image.src = filename;
    image.alt = "Diwali organizer " + number;
    image.loading = "eager";
    image.decoding = "async";

    image.onerror = function () {
      card.remove();
    };

    const name = document.createElement("p");
    name.className = "organizer-name";
    name.textContent = "Organizer " + number;

    card.appendChild(image);
    card.appendChild(name);

    return card;
  }

  for (let i = 1; i <= totalOrganizers; i++) {
    const card = createOrganizer(i);

    track.appendChild(card);
    originalCards.push(card);
  }

  // Duplicate the photos to create a continuous carousel.
  originalCards.forEach(function (card) {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });
});
