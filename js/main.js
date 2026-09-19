/* ==========================================================================
   main.js — boot sequence.
   1. Wait for fonts: the hero fit and every geometric "O" depend on metrics.
   2. Init modules in order, isolating failures.
   3. Play the one-time intro and reveal the page.
   ========================================================================== */
(function () {
  'use strict';

  const boot = async () => {
    const root = document.documentElement;

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
    if (EVO.hero) EVO.hero.intro();
    root.classList.remove('is-loading');
    root.classList.add('is-ready');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
