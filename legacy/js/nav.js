/* ==========================================================================
   nav.js — the pill firms up once you scroll (more blur, more opaque,
   rounder), the current section is marked, and the mobile menu opens.
   ========================================================================== */
EVO.register('nav', () => {
  const nav = EVO.$('[data-nav]');
  const toggle = EVO.$('[data-menu-toggle]');
  const menu = EVO.$('[data-menu]');
  if (!nav) return;

  /* Scrolled state --------------------------------------------------------- */
  let scrolled = null;
  EVO.task(() => {
    const s = window.scrollY > 24;
    if (s !== scrolled) {
      scrolled = s;
      nav.classList.toggle('is-scrolled', s);
    }
    return false;
  });

  /* Current section ---------------------------------------------------------- */
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

  /* Mobile menu -------------------------------------------------------------- */
  if (!toggle || !menu) return;
  const label = EVO.$('[data-menu-label]', toggle);

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Close' : 'Menu';
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 350);
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  EVO.$$('[data-menu-link]', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}, 10);
