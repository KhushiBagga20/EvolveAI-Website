/* ==========================================================================
   smooth-scroll.js — Lenis inertia scrolling (wheel only; touch stays
   native), synced to GSAP's ticker so ScrollTrigger scrubs stay in step.
   Also owns in-page anchor navigation.
   ========================================================================== */
EVO.register('smooth-scroll', () => {
  const { gsap, ScrollTrigger, Lenis } = window;
  let lenis = null;

  if (EVO.env.motion && EVO.env.hasGSAP && EVO.env.hasLenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  EVO.lenis = lenis;

  EVO.scrollTo = (target) => {
    if (lenis) {
      lenis.scrollTo(target || 0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
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
