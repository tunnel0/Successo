(function () {
  var PROJECT_IMAGES = [
    "IMG-20250224-WA0001.jpg",
    "IMG-20250224-WA0002.jpg",
    "IMG-20250224-WA0003.jpg",
    "IMG-20250224-WA0004.jpg",
    "IMG-20250224-WA0005.jpg",
    "IMG-20250224-WA0006.jpg",
    "IMG-20250224-WA0007.jpg",
    "IMG-20250224-WA0008.jpg",
    "IMG-20250224-WA0009.jpg",
    "IMG-20250224-WA0010.jpg",
    "IMG-20250224-WA0011.jpg",
    "IMG-20250224-WA0012.jpg",
    "IMG-20250224-WA0013.jpg",
    "IMG-20250224-WA0014.jpg",
    "IMG-20250224-WA0016.jpg",
    "IMG-20250224-WA0017.jpg",
    "IMG-20250224-WA0018.jpg",
    "IMG-20250224-WA0019.jpg",
    "IMG-20250224-WA0020.jpg",
    "IMG-20250224-WA0021.jpg",
    "IMG-20250224-WA0022.jpg",
    "IMG-20250224-WA0023.jpg",
    "IMG-20250224-WA0024.jpg",
    "IMG-20250224-WA0025.jpg",
    "IMG-20250224-WA0026.jpg",
    "IMG-20250224-WA0027.jpg",
    "IMG-20250224-WA0028.jpg",
    "IMG-20250224-WA0030.jpg",
    "IMG-20250224-WA0031.jpg",
    "IMG-20250224-WA0032.jpg",
    "IMG-20250224-WA0033.jpg",
    "IMG-20250224-WA0034.jpg",
    "IMG-20250224-WA0035.jpg",
    "IMG-20250224-WA0036.jpg",
    "IMG-20250224-WA0037.jpg",
  ];

  var DUPLEX_IMAGES = [
    "28b1bc23-1ef1-45bd-9524-85aaa9028d8f.jpg",
    "4ff61bd2-53b9-4879-a30c-63dfcf82cc21.jpg",
    "5d91d478-1e05-40bd-b51d-56d23f060283.jpg",
    "679bca1c-0a4b-46d2-bf8b-861e2df895f9.jpg",
    "a44d60f9-1148-413c-93df-7de944d97e46.jpg",
    "bf373056-d72b-4d6f-b644-b618d90d899a.jpg",
    "dd15cd16-3c64-49e0-bbb1-a6395be1a70c.jpg",
    "ff7fd300-d2c4-49c0-ae03-f169a312c3aa.jpg",
  ];

  function fillGallery(containerId, files, basePath) {
    var el = document.getElementById(containerId);
    if (!el) return;
    files.forEach(function (file, i) {
      var full = basePath + file;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-full", full);
      btn.setAttribute("aria-label", "Ampliar imagen " + (i + 1));
      var img = document.createElement("img");
      img.src = full;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 400;
      img.height = 400;
      btn.appendChild(img);
      el.appendChild(btn);
    });
  }

  fillGallery(
    "gallery-main",
    PROJECT_IMAGES,
    "/assets/projects/minuto-de-dios/images/"
  );
  fillGallery(
    "gallery-duplex",
    DUPLEX_IMAGES,
    "/assets/projects/minuto-de-dios/duplex/"
  );

  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-list a");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (nav) nav.classList.remove("is-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".gallery button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const src = btn.getAttribute("data-full");
      if (!src || !lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = btn.getAttribute("aria-label") || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  const sections = document.querySelectorAll("section[id]");
  if (sections.length && navLinks.length) {
    const map = new Map();
    navLinks.forEach(function (a) {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) map.set(href.slice(1), a);
    });

    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          const link = map.get(id);
          if (!link) return;
          map.forEach(function (l) {
            l.removeAttribute("aria-current");
          });
          link.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (sec) {
      obs.observe(sec);
    });
  }
})();
