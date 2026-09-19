/* ==========================================================================
   main.js — boot sequence.
   1. Decide whether we can animate (GSAP loaded + motion allowed).
   2. Wait for fonts — the hero fit and every geometric "O" depend on metrics.
   3. Init modules in page order, isolating failures.
   4. Sort + refresh ScrollTriggers, then play the intro.
   ========================================================================== */
(function () {
  'use strict';

  const boot = async () => {
    const root = document.documentElement;

    if (EVO.env.hasGSAP) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    } else {
      // No animation engine (CDN blocked?): show the complete static page.
      root.classList.remove('motion');
    }

    try {
      await Promise.race([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    } catch (e) { /* ignore */ }

    EVO.modules
      .sort((a, b) => a.order - b.order)
      .forEach((m) => {
        try { m.init(); } catch (err) { console.error(`[evolve] ${m.name} failed`, err); }
      });

    clearTimeout(window.__evoFailsafe);

    if (EVO.env.hasGSAP) {
      window.ScrollTrigger.sort();
      window.ScrollTrigger.refresh();
      window.addEventListener('load', () => window.ScrollTrigger.refresh());
    }

    if (EVO.hero && EVO.env.motion) EVO.hero.intro();
    root.classList.remove('is-loading');
    root.classList.add('is-ready');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
