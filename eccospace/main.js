(function () {
  var header = document.getElementById('site-header');
  var menu = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  menu.addEventListener('click', function () {
    var open = header.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Abrir menú');
    });
  });

  var mainImage = document.getElementById('gallery-image');
  var counter = document.getElementById('gallery-counter');
  var thumbs = document.querySelectorAll('.gallery-thumb');
  var dialog = document.getElementById('gallery-dialog');
  var dialogImage = document.getElementById('gallery-dialog-image');
  var closeDialog = document.querySelector('.gallery-dialog-close');
  var lastThumb = null;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      if (!thumb.classList.contains('is-active')) {
        thumbs.forEach(function (item) {
          item.classList.remove('is-active');
          item.setAttribute('aria-pressed', 'false');
        });
        thumb.classList.add('is-active');
        thumb.setAttribute('aria-pressed', 'true');
        mainImage.classList.add('is-changing');
        mainImage.src = thumb.dataset.src;
        mainImage.alt = thumb.dataset.alt;
        counter.textContent = thumb.dataset.number + ' / 05';
      }
      lastThumb = thumb;
      dialogImage.src = thumb.dataset.src;
      dialogImage.alt = thumb.dataset.alt;
      dialog.showModal();
    });
  });

  closeDialog.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', function () {
    dialogImage.removeAttribute('src');
    if (lastThumb) lastThumb.focus();
  });

  mainImage.addEventListener('load', function () {
    mainImage.classList.remove('is-changing');
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
