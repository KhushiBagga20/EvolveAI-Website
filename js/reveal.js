/* ==========================================================================
   reveal.js — [data-reveal="up|fade|lines"] elements get .is-in the first
   time they enter the viewport; CSS (base.css) does the easing. Once only.
   ========================================================================== */
EVO.register('reveal', () => {
  const els = EVO.$$('[data-reveal]');

  // Stagger index for line-by-line reveals
  EVO.$$('[data-reveal="lines"]').forEach((block) => {
    EVO.$$('.line', block).forEach((line, i) => line.style.setProperty('--i', i));
  });

  if (!EVO.env.motion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  els.forEach((el) => io.observe(el));
}, 5);
