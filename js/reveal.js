/* ==========================================================================
   reveal.js — generic reveal-on-scroll.
   [data-reveal="up|fade|scale|clip|lines"] elements get .is-in once they
   enter the viewport; CSS (base.css) does the actual motion.
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
  }, { rootMargin: '0px 0px -10% 0px' });

  els.forEach((el) => io.observe(el));

  // Pause decorative CSS loops when their section is far off-screen
  EVO.watchOffscreen(EVO.$$('.hero-wrap, .bands, .archive, .partners'));
}, 5);
