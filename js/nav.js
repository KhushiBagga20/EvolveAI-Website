/* ==========================================================================
   nav.js — compact-on-scroll state, current-section marker, mobile menu.
   ========================================================================== */
EVO.register('nav', () => {
  const nav = EVO.$('[data-nav]');
  const toggle = EVO.$('[data-menu-toggle]');
  const menu = EVO.$('[data-menu]');
  if (!nav) return;

  /* Compact state ------------------------------------------------------- */
  let scrolled = null;
  const onScroll = () => {
    const s = window.scrollY > 40;
    if (s !== scrolled) {
      scrolled = s;
      nav.classList.toggle('is-scrolled', s);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Current section ----------------------------------------------------- */
  const links = EVO.$$('[data-nav-link]');
  if ('IntersectionObserver' in window) {
    const byId = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const link = byId.get(en.target.id);
        if (!link) return;
        if (en.isIntersecting) {
          links.forEach((l) => l.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }

  /* Menu ---------------------------------------------------------------- */
  if (!toggle || !menu) return;
  const label = toggle.querySelector('.nav__toggle-label');
  let closeTimer;
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const open = () => {
    clearTimeout(closeTimer);
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
    if (label) label.textContent = 'Close';
    nav.classList.add('is-menu-open');
    document.documentElement.style.overflow = 'hidden';
    if (EVO.lenis) EVO.lenis.stop();
  };

  const close = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (label) label.textContent = 'Menu';
    nav.classList.remove('is-menu-open');
    document.documentElement.style.overflow = '';
    if (EVO.lenis) EVO.lenis.start();
    closeTimer = setTimeout(() => { if (!isOpen()) menu.hidden = true; }, 400);
  };

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));
  menu.addEventListener('click', (e) => { if (e.target.closest('[data-menu-link]')) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      close();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches && isOpen()) close();
  });
}, 2);
