/* ==========================================================================
   footer.js — the closing row starts scattered (each tile shifted,
   turned, a different form) and settles into one calm pattern when the
   footer comes into view.
   ========================================================================== */
EVO.register('footer', () => {
  const footer = EVO.$('[data-settle]');
  if (!footer) return;
  const tiles = EVO.$$('.footer__row .mt', footer);
  const forms = ['50%', '0', '100% 0 0 0', '0 100% 0 100%', '50% 50% 0 0'];

  tiles.forEach((t, i) => {
    t.style.setProperty('--ti', i);
    t.style.setProperty('--sx', `${Math.round((Math.random() - .5) * 60)}px`);
    t.style.setProperty('--sy', `${Math.round(-40 - Math.random() * 90)}px`);
    t.style.setProperty('--sr', `${Math.round((Math.random() - .5) * 180)}deg`);
    t.style.setProperty('--sf', forms[i % forms.length]);
  });

  if (!EVO.env.motion || !('IntersectionObserver' in window)) {
    footer.classList.add('is-settled');
    return;
  }
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((en) => en.isIntersecting)) return;
    io.disconnect();
    footer.classList.add('is-settled');
  }, { threshold: .45 });
  io.observe(footer);
}, 80);
