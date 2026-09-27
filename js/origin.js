/* ==========================================================================
   origin.js — the evolution chart assembles the first time it is seen,
   one specimen after another. The last specimen ("Today") keeps evolving:
   every few seconds one of its tiles takes a new form — slowly, and only
   while it is on screen.
   ========================================================================== */
EVO.register('origin', () => {
  const evo = EVO.$('[data-evo]');
  if (!evo) return;

  EVO.$$('.evo__spec', evo).forEach((spec) => {
    EVO.$$('.mt', spec).forEach((t, i) => t.style.setProperty('--ti', i));
  });

  const build = () => {
    evo.classList.add('is-built');
    setTimeout(() => evo.classList.add('is-settled'), 2600);
  };

  if (!EVO.env.motion || !('IntersectionObserver' in window)) {
    evo.classList.add('is-built', 'is-settled');
    return;
  }

  const io = new IntersectionObserver((entries) => {
    if (!entries.some((en) => en.isIntersecting)) return;
    io.disconnect();
    build();
  }, { threshold: .15 });
  io.observe(evo);

  /* Today: still evolving */
  const living = EVO.$('[data-evolving]', evo);
  const section = evo.closest('[data-inview]');
  if (!living) return;
  const tiles = EVO.$$('.mt', living);
  const forms = ['0', '50%', '50% 0 50% 50%', '50% 50% 0 50%', '50% 50% 50% 0', '0 50% 50% 50%',
    '100% 0 100% 0', '0 100% 0 100%', '100% 0 0 0', '0 0 100% 0', '50% 50% 0 0'];
  const fills = ['var(--electric)', 'var(--royal)', 'var(--lavender)', 'var(--indigo)', 'var(--periwinkle)', 'var(--deep)'];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  setInterval(() => {
    if (document.hidden || !evo.classList.contains('is-settled')) return;
    if (section && !section.classList.contains('is-inview')) return;
    const tile = pick(tiles);
    tile.style.setProperty('--form', pick(forms));
    tile.style.setProperty('--fill', pick(fills));
    tile.classList.toggle('is-glass', Math.random() < .15);
  }, 1600);
}, 55);
