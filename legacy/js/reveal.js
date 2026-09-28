/* ==========================================================================
   reveal.js — [data-reveal] and [data-split] elements get .is-in the first
   time they enter the viewport; css/motion.css does the rest. Once only.
   ========================================================================== */
EVO.register('reveal', () => {
  const els = EVO.$$('[data-reveal], [data-split]');

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
