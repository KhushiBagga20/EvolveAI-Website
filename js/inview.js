/* ==========================================================================
   inview.js — [data-inview] sections get .is-inview while on screen.
   CSS uses it to pause ambient motion off screen; other modules use it to
   skip work for sections nobody can see.
   ========================================================================== */
EVO.register('inview', () => {
  const els = EVO.$$('[data-inview]');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-inview'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => en.target.classList.toggle('is-inview', en.isIntersecting));
    EVO.wake();
  }, { rootMargin: '10% 0px' });
  els.forEach((el) => io.observe(el));
}, 2);
