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
    get finePointer() { return w.matchMedia('(hover: hover) and (pointer: fine)').matches; },
    get hasGSAP() { return typeof w.gsap !== 'undefined' && typeof w.ScrollTrigger !== 'undefined'; },
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

  /* Cap-height ratio of the display face (used to size every geometric "O")
     Measured once fonts are loaded; exposed as --cap on :root in em. */
  EVO.measureCap = () => {
    try {
      const ctx = d.createElement('canvas').getContext('2d');
      ctx.font = '900 200px Archivo';
      const m = ctx.measureText('H');
      if (m.actualBoundingBoxAscent) return m.actualBoundingBoxAscent / 200;
    } catch (e) { /* fall through */ }
    return 0.72;
  };

  /* Fit an inline-block element to its container width (single fixed width
     axis value). Used for the footer wordmark. */
  EVO.fitWidth = (el, container) => {
    if (!el || !container) return;
    el.style.fontSize = '100px';
    const w100 = el.getBoundingClientRect().width;
    const target = container.clientWidth;
    if (w100 > 0) el.style.fontSize = (100 * target / w100).toFixed(2) + 'px';
  };

  /* Rotate every primitive inside a GeometricTile by `step` degrees.
     The CSS transition on .g does the easing — this only moves the target. */
  EVO.rotateTile = (tile, step) => {
    EVO.$$('.g', tile).forEach((g) => {
      const next = (parseFloat(g.dataset.rot) || 0) + step;
      g.dataset.rot = next;
      g.style.setProperty('--rot', next + 'deg');
    });
  };

  /* Idle "tick" engine: every `every` ms, one random visible tile turns.
     Reads like a system quietly computing — the AI under the surface. */
  EVO.tickTiles = (container, every) => {
    const tiles = EVO.$$('[data-tile]', container);
    if (!tiles.length) return;
    let visible = false;
    if ('IntersectionObserver' in w) {
      new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(container);
    }
    setInterval(() => {
      if (!visible || d.hidden) return;
      const tile = tiles[Math.floor(Math.random() * tiles.length)];
      EVO.rotateTile(tile, Math.random() < 0.5 ? 90 : 180);
    }, every || 2000);
    tiles.forEach((tile) => tile.addEventListener('pointerenter', () => EVO.rotateTile(tile, 90)));
  };

  /* Toggle .is-offscreen on elements so their CSS loops pause */
  EVO.watchOffscreen = (els) => {
    if (!('IntersectionObserver' in w)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => en.target.classList.toggle('is-offscreen', !en.isIntersecting));
    }, { rootMargin: '200px 0px' });
    els.forEach((el) => el && io.observe(el));
  };
})(window, document);
