/* ==========================================================================
   core.js — shared namespace, environment flags, tiny utilities.
   Every other module registers itself with EVO.register(name, init, order);
   main.js boots them in order once fonts are ready.
   ========================================================================== */
(function (w, d) {
  'use strict';

  const EVO = (w.EVO = w.EVO || {});
  const root = d.documentElement;

  EVO.env = {
    get motion() { return root.classList.contains('motion'); },
    get hasLenis() { return typeof w.Lenis !== 'undefined'; },
  };

  EVO.$ = (sel, ctx) => (ctx || d).querySelector(sel);
  EVO.$$ = (sel, ctx) => Array.from((ctx || d).querySelectorAll(sel));
  EVO.clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  EVO.debounce = (fn, ms) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms || 150);
    };
  };
  EVO.pad = (n) => String(n).padStart(2, '0');

  /* Module registry ------------------------------------------------------ */
  EVO.modules = [];
  EVO.register = (name, init, order) => {
    EVO.modules.push({ name, init, order: order == null ? 50 : order });
  };

  /* Cap-height ratio of the display face — sizes every geometric "O".
     Measured once fonts are loaded; exposed as --cap on :root, in em. */
  EVO.measureCap = () => {
    try {
      const ctx = d.createElement('canvas').getContext('2d');
      ctx.font = '900 200px Archivo';
      const m = ctx.measureText('H');
      if (m.actualBoundingBoxAscent) return m.actualBoundingBoxAscent / 200;
    } catch (e) { /* fall through */ }
    return 0.72;
  };

  /* Fit an inline-block element exactly to its container's width */
  EVO.fitWidth = (el, container) => {
    if (!el || !container) return;
    el.style.fontSize = '100px';
    const w100 = el.getBoundingClientRect().width;
    if (w100 > 0) el.style.fontSize = (100 * container.clientWidth / w100).toFixed(2) + 'px';
  };
})(window, document);
