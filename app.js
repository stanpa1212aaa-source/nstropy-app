// Nstropy App v2
(function () {
  const splash = document.getElementById('splash');
  const app = document.getElementById('app');

  window.addEventListener('load', () => {
    setTimeout(() => {
      splash.classList.add('hidden');
      app.classList.remove('hidden');
      requestAnimationFrame(() => app.classList.add('visible'));
    }, 800);
  });

  // Navigation
  window.showPage = function (pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
      document.querySelector('.main').scrollTop = 0;
    }
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
  };

  // Calculator
  window.calculatePrice = function () {
    const area = parseFloat(document.getElementById('area').value) || 0;
    const typePrice = parseFloat(document.getElementById('type').value) || 0;
    const lighting = parseFloat(document.getElementById('lighting').value) || 0;
    const complexity = parseFloat(document.getElementById('complexity').value) || 1;

    if (area < 1) {
      alert('Zadejte plochu větší než 0 m²');
      return;
    }

    const pricePerM2 = (typePrice + lighting) * complexity;
    const total = Math.round(area * pricePerM2);

    const resultEl = document.getElementById('calc-result');
    document.getElementById('result-price').textContent = total.toLocaleString('cs-CZ') + ' Kč';
    document.getElementById('result-detail').textContent =
      `${area} m² × ${Math.round(pricePerM2).toLocaleString('cs-CZ')} Kč/m²`;
    resultEl.classList.remove('hidden');
  };

  // Inquiry form
  window.submitInquiry = function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
    const area = document.getElementById('area-form').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone) {
      alert('Vyplňte prosím jméno a telefon.');
      return;
    }

    const body = [
      `Jméno: ${name}`,
      `Telefon: ${phone}`,
      email ? `E-mail: ${email}` : '',
      city ? `Lokalita: ${city}` : '',
      area ? `Plocha: ${area} m²` : '',
      message ? `Poznámka: ${message}` : '',
      '',
      '---',
      'Odesláno z mobilní aplikace Nstropy'
    ].filter(Boolean).join('\n');

    const mailto = `mailto:info@nstropy.cz?subject=${encodeURIComponent('Poptávka napínaných stropů – ' + name)}&body=${encodeURIComponent(body)}`;

    document.getElementById('inquiry-form').classList.add('hidden');
    document.getElementById('form-success').classList.remove('hidden');

    setTimeout(() => { window.location.href = mailto; }, 600);
  };

  // Lightbox
  const galleryImages = [
    'g1.jpg',
    'g3.jpg',
    'g4.jpg',
    'g5.jpg',
    'g2.jpg',
    'g6.jpg'
  ];
  let currentLightbox = 0;

  window.openLightbox = function (index) {
    currentLightbox = index;
    document.getElementById('lightbox-img').src = galleryImages[index];
    document.getElementById('lightbox').classList.remove('hidden');
  };

  window.closeLightbox = function () {
    document.getElementById('lightbox').classList.add('hidden');
  };

  window.changeLightbox = function (dir) {
    currentLightbox = (currentLightbox + dir + galleryImages.length) % galleryImages.length;
    document.getElementById('lightbox-img').src = galleryImages[currentLightbox];
  };

  // Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
