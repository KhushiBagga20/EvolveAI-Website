/* ==========================================================================
   smooth-scroll.js — gentle inertia for mouse wheels (Lenis; touch stays
   native) and in-page anchor navigation. Works without Lenis too.
   ========================================================================== */
EVO.register('smooth-scroll', () => {
  let lenis = null;

  if (EVO.env.motion && EVO.env.hasLenis) {
    lenis = new window.Lenis({ lerp: 0.12, smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
  EVO.lenis = lenis;

  EVO.scrollTo = (target) => {
    if (lenis) {
      lenis.scrollTo(target || 0, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else if (target) {
      target.scrollIntoView({ behavior: EVO.env.motion ? 'smooth' : 'auto', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: EVO.env.motion ? 'smooth' : 'auto' });
    }
  };

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (hash === '#') { e.preventDefault(); return; } // placeholder links (see TODOs)
    const target = hash === '#top' ? null : document.querySelector(hash);
    if (hash !== '#top' && !target) return;
    e.preventDefault();
    EVO.scrollTo(target);
    if (target) {
      // Move focus for keyboard & screen-reader users, without a jump
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
}, 0);
