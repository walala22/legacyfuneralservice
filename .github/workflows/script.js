// Smooth scroll for nav links
// Fade-in on scroll for sections

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for nav links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Typing animation for hero words (looping, no | cursor)
  const words = [
    { el: document.querySelector(".hero-word1"), text: "Honoring" },
    { el: document.querySelector(".hero-word2"), text: "Lives," },
    { el: document.querySelector(".hero-word3"), text: "Celebrating" },
    { el: document.querySelector(".hero-word4"), text: "Legacies" },
  ];
  function typeWord(idx) {
    if (!words[idx]) {
      // Loop back to the first word after a pause
      setTimeout(() => typeWord(0), 1200);
      return;
    }
    const { el, text } = words[idx];
    el.textContent = "";
    el.style.opacity = 1;
    el.classList.remove("typed");
    let i = 0;
    function typeChar() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(typeChar, 80);
      } else {
        el.classList.add("typed");
        setTimeout(() => {
          if (words[idx + 1]) typeWord(idx + 1);
          else
            setTimeout(() => {
              // Clear all and restart
              words.forEach((w) => {
                w.el.textContent = "";
                w.el.style.opacity = 0;
                w.el.classList.remove("typed");
              });
              setTimeout(() => typeWord(0), 400);
            }, 1200);
        }, 350);
      }
    }
    typeChar();
  }
  // Remove border/cursor from hero words
  words.forEach((w) => {
    w.el.textContent = "";
    w.el.style.opacity = 0;
    w.el.classList.remove("typed");
    w.el.style.borderRight = "none";
  });
  setTimeout(() => typeWord(0), 400);

  // Fade-in on scroll for sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade-init");
    observer.observe(section);
  });

  // Burger menu logic for mobile nav
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      document.body.classList.toggle(
        "nav-open",
        navLinks.classList.contains("open")
      );
    });
    burger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        navLinks.classList.toggle("open");
        document.body.classList.toggle(
          "nav-open",
          navLinks.classList.contains("open")
        );
      }
    });
    // Close nav on link click (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 800) {
          navLinks.classList.remove("open");
          document.body.classList.remove("nav-open");
        }
      });
    });
    // Ensure nav-open is removed and nav is closed on desktop resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) {
        navLinks.classList.remove("open");
        document.body.classList.remove("nav-open");
      }
    });
  }
  // Prevent body scroll when nav is open
  const style = document.createElement("style");
  style.innerHTML = `.nav-open { overflow: hidden !important; }`;
  document.head.appendChild(style);
});

// Gallery pagination logic
const galleryImages = [
  "images/gallery1.jpg",
  "images/gallery2.jpg",
  "images/gallery3.jpg",
  "images/gallery4.jpg",
  "images/gallery5.jpg",
  "images/gallery6.jpg",
  "images/gallery7.jpg",
  "images/gallery8.jpg",
  "images/gallery9.jpg",
  "images/gallery10.jpg",
  "images/gallery11.jpg",
  "images/gallery12.jpg",
  "images/gallery13.jpg",
  "images/gallery14.jpg",
];

const imagesPerPage = 8;
let currentPage = 0;

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const start = currentPage * imagesPerPage;
  const end = Math.min(start + imagesPerPage, galleryImages.length);
  for (let i = start; i < end; i++) {
    const img = document.createElement("img");
    img.src = galleryImages[i];
    img.alt = `Gallery ${i + 1}`;
    img.className = "gallery-img";
    img.addEventListener("click", function () {
      openImageModal(galleryImages[i]);
    });
    grid.appendChild(img);
  }
}

function updateGalleryNav() {
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  if (!prevBtn || !nextBtn) return;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = (currentPage + 1) * imagesPerPage >= galleryImages.length;
}

// Image modal logic
function openImageModal(src) {
  let modal = document.getElementById("gallery-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "gallery-modal";
    modal.className = "gallery-modal";
    modal.innerHTML = `
      <div class="gallery-modal-backdrop"></div>
      <div class="gallery-modal-content">
        <button class="gallery-modal-close" title="Close">&times;</button>
        <img src="" alt="Gallery Large" />
      </div>
    `;
    document.body.appendChild(modal);
    // Close on backdrop click
    modal
      .querySelector(".gallery-modal-backdrop")
      .addEventListener("click", closeImageModal);
    // Close on button click
    modal
      .querySelector(".gallery-modal-close")
      .addEventListener("click", closeImageModal);
    // Close on ESC key
    document.addEventListener("keydown", function escListener(e) {
      if (modal.style.display === "flex" && e.key === "Escape")
        closeImageModal();
    });
  }
  modal.querySelector("img").src = src;
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("open");
  }, 10);
}

function closeImageModal() {
  const modal = document.getElementById("gallery-modal");
  if (modal) {
    modal.classList.remove("open");
    setTimeout(() => {
      modal.style.display = "none";
    }, 200);
  }
}

// Promotion poster modal logic
function openPromotionModal(src) {
  let modal = document.getElementById("promotion-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "promotion-modal";
    modal.className = "gallery-modal";
    modal.innerHTML = `
      <div class="gallery-modal-backdrop"></div>
      <div class="gallery-modal-content">
        <button class="gallery-modal-close" title="Close">&times;</button>
        <img src="" alt="Promotion Poster Large" />
      </div>
    `;
    document.body.appendChild(modal);
    // Close on backdrop click
    modal
      .querySelector(".gallery-modal-backdrop")
      .addEventListener("click", closePromotionModal);
    // Close on button click
    modal
      .querySelector(".gallery-modal-close")
      .addEventListener("click", closePromotionModal);
    // Close on ESC key
    document.addEventListener("keydown", function escListener(e) {
      if (modal.style.display === "flex" && e.key === "Escape")
        closePromotionModal();
    });
  }
  modal.querySelector("img").src = src;
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("open");
  }, 10);
}
function closePromotionModal() {
  const modal = document.getElementById("promotion-modal");
  if (modal) {
    modal.classList.remove("open");
    setTimeout(() => {
      modal.style.display = "none";
    }, 200);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderGallery();
  updateGalleryNav();
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (currentPage > 0) {
        currentPage--;
        renderGallery();
        updateGalleryNav();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if ((currentPage + 1) * imagesPerPage < galleryImages.length) {
        currentPage++;
        renderGallery();
        updateGalleryNav();
      }
    });
  }
  // Promotion poster click/keyboard logic
  const promoPoster = document.querySelector(".promotion-poster");
  if (promoPoster) {
    promoPoster.addEventListener("click", function () {
      openPromotionModal(this.src);
    });
    promoPoster.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        openPromotionModal(this.src);
      }
    });
  }
  // Promotion images pagination logic
  const promotionImages = [
    "images/promotion1.jpg",
    "images/promotion2.jpg",
    "images/promotion3.jpg",
    "images/promotion4.jpg",
    "images/promotion5.jpg",
    "images/promotion6.jpg",
  ];
  const promotionPerPage = 2;
  let promotionPage = 0;

  function renderPromotion() {
    const grid = document.getElementById("promotion-grid");
    if (!grid) return;
    grid.innerHTML = "";
    const start = promotionPage * promotionPerPage;
    const end = Math.min(start + promotionPerPage, promotionImages.length);
    for (let i = start; i < end; i++) {
      const img = document.createElement("img");
      img.src = promotionImages[i];
      img.alt = `Promotion Poster ${i + 1}`;
      img.className = "promotion-poster";
      img.tabIndex = 0;
      img.addEventListener("click", function () {
        openPromotionModal(promotionImages[i]);
      });
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          openPromotionModal(promotionImages[i]);
        }
      });
      grid.appendChild(img);
    }
  }

  function updatePromotionNav() {
    const prevBtn = document.getElementById("promotion-prev");
    const nextBtn = document.getElementById("promotion-next");
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = promotionPage === 0;
    nextBtn.disabled =
      (promotionPage + 1) * promotionPerPage >= promotionImages.length;
  }

  renderPromotion();
  updatePromotionNav();
  const prevPromotionBtn = document.getElementById("promotion-prev");
  const nextPromotionBtn = document.getElementById("promotion-next");
  if (prevPromotionBtn) {
    prevPromotionBtn.addEventListener("click", function () {
      if (promotionPage > 0) {
        promotionPage--;
        renderPromotion();
        updatePromotionNav();
      }
    });
  }
  if (nextPromotionBtn) {
    nextPromotionBtn.addEventListener("click", function () {
      if ((promotionPage + 1) * promotionPerPage < promotionImages.length) {
        promotionPage++;
        renderPromotion();
        updatePromotionNav();
      }
    });
  }
});
