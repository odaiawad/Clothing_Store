(function() {
  const doc = document;

  // Mobile nav toggle
  const toggleBtn = doc.getElementById('nav-toggle');
  const menu = doc.getElementById('primary-menu');
  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('show');
    });

    doc.addEventListener('click', (e) => {
      const target = e.target;
      if (!menu.contains(target) && !toggleBtn.contains(target)) {
        menu.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Sticky header subtle shadow on scroll
  const header = doc.getElementById('site-header');
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    header.style.boxShadow = y > 10 ? '0 6px 20px rgba(0,0,0,0.20)' : 'none';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for internal anchors
  doc.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = doc.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Contact form handler (mailto fallback)
  const form = doc.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const phone = data.get('phone') || '';
      const budget = data.get('budget') || '';
      const message = data.get('message') || '';

      const body = `الاسم: ${name}%0Aالبريد: ${email}%0Aالجوال: ${phone}%0Aالميزانية: ${budget}%0A---%0Aالرسالة:%0A${encodeURIComponent(message)}`;
      const mailto = `mailto:hello@example.com?subject=${encodeURIComponent('طلب عرض سعر - الموقع')}&body=${body}`;
      window.location.href = mailto;
    });
  }

  // Footer year
  const year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();