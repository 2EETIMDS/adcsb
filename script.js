document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  document.querySelectorAll('form[data-mock]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      if (msg) {
        msg.textContent = msg.getAttribute('data-success');
        msg.classList.add('show');
      }
      form.reset();
    });
  });

  // ---------- lightbox ----------
  var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (triggers.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<div class="lightbox-inner">' +
        '<button class="lightbox-close" aria-label="Fechar">&times;</button>' +
        '<button class="lightbox-nav lightbox-prev" aria-label="Anterior">&#8249;</button>' +
        '<img src="" alt="">' +
        '<button class="lightbox-nav lightbox-next" aria-label="Próxima">&#8250;</button>' +
      '</div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('img');
    var current = 0;

    function openAt(i) {
      current = (i + triggers.length) % triggers.length;
      var full = triggers[current].getAttribute('data-lightbox');
      lbImg.src = full;
      lbImg.alt = triggers[current].querySelector('img') ? triggers[current].querySelector('img').alt : '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    triggers.forEach(function (t, i) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        openAt(i);
      });
    });

    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.querySelector('.lightbox-prev').addEventListener('click', function () { openAt(current - 1); });
    lb.querySelector('.lightbox-next').addEventListener('click', function () { openAt(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') openAt(current - 1);
      if (e.key === 'ArrowRight') openAt(current + 1);
    });
  }
});
