/* ==========================================================================
   main.js — boot: run every registered module in order, isolating failures.
   ========================================================================== */
(function () {
  'use strict';

  const boot = () => {
    EVO.modules
      .sort((a, b) => a.order - b.order)
      .forEach((m) => {
        try { m.init(); } catch (err) { console.error(`[evolve] ${m.name} failed`, err); }
      });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
