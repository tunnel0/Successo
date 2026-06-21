(function () {
  var BASE = "/assets/projects/minuto-de-dios/";
  var RENDERS = BASE + "renders/";
  var TOUR = BASE + "virtual-tour/";

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

  var SHOWCASE = {
    duplex: {
      "301": {
        images: ["duplex-301.jpg", "duplex-301-2.jpg", "duplex-301-3.jpg"],
        video: "duplex-301.mp4",
        poster: "duplex-301.jpg",
      },
      "302": {
        images: ["duplex-302.jpg", "duplex-302-2.jpg", "duplex-302-3.jpg"],
        video: "duplex-302.mp4",
        poster: "duplex-302.jpg",
      },
      "303": {
        images: ["duplex-303.jpg", "duplex-303-2.jpg"],
        video: "duplex-303.mp4",
        poster: "duplex-303.jpg",
      },
      "304": {
        images: ["duplex-304.jpg"],
        video: "duplex-304.mp4",
        poster: "duplex-304.jpg",
      },
      "305": {
        images: ["duplex-305.jpg", "duplex-305-2.jpg"],
        video: "duplex-305.mp4",
        poster: "duplex-305.jpg",
      },
    },
    primerPiso: {
      images: [
        "aptos-101-102.jpg",
        "apto-101-102-2.jpg",
        "apto-101-102-3.jpg",
        "apto-103.jpg",
      ],
      videos: [
        {
          title: "Escenas — Apto 103",
          src: "escenas-apto-103.mp4",
          poster: "apto-103.jpg",
        },
        {
          title: "Escenas — Apto 103 (alternativo)",
          src: "escenas-apto-103-alt.mp4",
          poster: "apto-103.jpg",
        },
      ],
    },
    segundoPiso: {
      images: ["apto-201.jpg", "apto-202.jpg", "apto-203.jpg"],
    },
    recorridos: [
      {
        title: "Recorrido — Primer piso",
        src: "piso-1.mp4",
        poster: "aptos-101-102.jpg",
        posterBase: RENDERS + "primer-piso/",
      },
      {
        title: "Recorrido — Segundo piso",
        src: "piso-2.mp4",
        poster: "apto-201.jpg",
        posterBase: RENDERS + "segundo-piso/",
      },
    ],
  };

  var lightboxGroup = [];
  var lightboxIndex = 0;

  function fillGallery(containerId, files, basePath, altPrefix) {
    var el = document.getElementById(containerId);
    if (!el) return;
    files.forEach(function (file, i) {
      var full = basePath + file;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-full", full);
      btn.setAttribute(
        "aria-label",
        (altPrefix || "Ampliar imagen") + " " + (i + 1)
      );
      var img = document.createElement("img");
      img.src = full;
      img.alt = altPrefix ? altPrefix + " " + (i + 1) : "";
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 400;
      img.height = 400;
      btn.appendChild(img);
      el.appendChild(btn);
    });
  }

  function createVideoCard(title, src, poster) {
    var figure = document.createElement("figure");
    figure.className = "video-card";
    var video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", title);
    if (poster) video.poster = poster;
    var source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
    var caption = document.createElement("figcaption");
    caption.textContent = title;
    figure.appendChild(video);
    figure.appendChild(caption);
    return figure;
  }

  function fillRenderGallery(containerId, files, basePath, altPrefix) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = "";
    files.forEach(function (file, i) {
      var full = basePath + file;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = i === 0 && files.length > 1 ? "render-featured" : "";
      btn.setAttribute("data-full", full);
      btn.setAttribute("data-group", containerId);
      btn.setAttribute(
        "aria-label",
        altPrefix + (files.length > 1 ? " — vista " + (i + 1) : "")
      );
      var img = document.createElement("img");
      img.src = full;
      img.alt = altPrefix + (files.length > 1 ? " — vista " + (i + 1) : "");
      img.loading = "lazy";
      img.decoding = "async";
      btn.appendChild(img);
      el.appendChild(btn);
    });
  }

  function renderRecorridos() {
    var el = document.getElementById("tour-recorridos");
    if (!el) return;
    SHOWCASE.recorridos.forEach(function (item) {
      el.appendChild(
        createVideoCard(
          item.title,
          TOUR + item.src,
          item.posterBase + item.poster
        )
      );
    });
  }

  function renderPrimerPiso() {
    fillRenderGallery(
      "gallery-primer-piso",
      SHOWCASE.primerPiso.images,
      RENDERS + "primer-piso/",
      "Render apartamento primer piso"
    );
    var tourEl = document.getElementById("tour-primer-piso");
    if (!tourEl) return;
    SHOWCASE.primerPiso.videos.forEach(function (item) {
      tourEl.appendChild(
        createVideoCard(
          item.title,
          TOUR + item.src,
          RENDERS + "primer-piso/" + item.poster
        )
      );
    });
  }

  function renderSegundoPiso() {
    fillRenderGallery(
      "gallery-segundo-piso",
      SHOWCASE.segundoPiso.images,
      RENDERS + "segundo-piso/",
      "Render apartamento segundo piso"
    );
  }

  function renderDuplexUnit(unit) {
    var data = SHOWCASE.duplex[unit];
    if (!data) return;

    fillRenderGallery(
      "gallery-duplex-renders",
      data.images,
      RENDERS + "duplex/",
      "Render dúplex " + unit
    );

    var videoWrap = document.getElementById("duplex-video");
    if (!videoWrap) return;
    videoWrap.innerHTML = "";
    videoWrap.appendChild(
      createVideoCard(
        "Recorrido dúplex " + unit,
        TOUR + data.video,
        RENDERS + "duplex/" + data.poster
      )
    );
  }

  function initShowcaseTabs() {
    var tabs = document.querySelectorAll(".showcase-tabs [role='tab']");
    var panels = document.querySelectorAll(".showcase-panel");
    if (!tabs.length) return;

    function activateTab(tab) {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.setAttribute("aria-selected", active ? "true" : "false");
        t.tabIndex = active ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var isTarget = panel.id === tab.getAttribute("aria-controls");
        panel.hidden = !isTarget;
        panel.classList.toggle("is-active", isTarget);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab);
      });
      tab.addEventListener("keydown", function (e) {
        var idx = Array.prototype.indexOf.call(tabs, tab);
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(idx + 1) % tabs.length];
        if (e.key === "ArrowLeft")
          next = tabs[(idx - 1 + tabs.length) % tabs.length];
        if (next) {
          e.preventDefault();
          next.focus();
          activateTab(next);
        }
      });
    });
  }

  function initUnitFilter() {
    var pills = document.querySelectorAll(".unit-pill");
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) {
          p.classList.remove("is-active");
        });
        pill.classList.add("is-active");
        renderDuplexUnit(pill.getAttribute("data-unit"));
        bindLightboxButtons();
      });
    });
    renderDuplexUnit("301");
  }

  function bindLightboxButtons() {
    document.querySelectorAll(".gallery button[data-full]").forEach(function (btn) {
      if (btn._lightboxBound) return;
      btn._lightboxBound = true;
      btn.addEventListener("click", function () {
        var groupId = btn.getAttribute("data-group");
        var scope = groupId
          ? document.getElementById(groupId)
          : btn.closest(".gallery");
        var buttons = scope
          ? scope.querySelectorAll("button[data-full]")
          : [btn];
        lightboxGroup = Array.prototype.map.call(buttons, function (b) {
          return {
            src: b.getAttribute("data-full"),
            alt: b.getAttribute("aria-label") || "",
          };
        });
        lightboxIndex = Array.prototype.indexOf.call(buttons, btn);
        openLightbox(lightboxIndex);
      });
    });
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImg || !lightboxGroup.length) return;
    lightboxIndex = index;
    var item = lightboxGroup[lightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    updateLightboxNav();
  }

  function updateLightboxNav() {
    var prev = document.querySelector(".lightbox-prev");
    var next = document.querySelector(".lightbox-next");
    if (!prev || !next) return;
    var multi = lightboxGroup.length > 1;
    prev.style.display = multi ? "" : "none";
    next.style.display = multi ? "" : "none";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxGroup = [];
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    if (lightboxGroup.length < 2) return;
    lightboxIndex =
      (lightboxIndex + delta + lightboxGroup.length) % lightboxGroup.length;
    var item = lightboxGroup[lightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
  }

  fillGallery(
    "gallery-main",
    PROJECT_IMAGES,
    BASE + "images/"
  );
  fillGallery(
    "gallery-duplex",
    DUPLEX_IMAGES,
    BASE + "duplex/"
  );

  renderRecorridos();
  renderPrimerPiso();
  renderSegundoPiso();
  initShowcaseTabs();

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".nav-list a");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.querySelector(".lightbox-close");
  var lightboxPrev = document.querySelector(".lightbox-prev");
  var lightboxNext = document.querySelector(".lightbox-next");

  initUnitFilter();
  bindLightboxButtons();

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (nav) nav.classList.remove("is-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev)
    lightboxPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      stepLightbox(-1);
    });
  if (lightboxNext)
    lightboxNext.addEventListener("click", function (e) {
      e.stopPropagation();
      stepLightbox(1);
    });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
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

  var sections = document.querySelectorAll("section[id]");
  if (sections.length && navLinks.length) {
    var map = new Map();
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && href.startsWith("#")) map.set(href.slice(1), a);
    });

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          var link = map.get(id);
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
