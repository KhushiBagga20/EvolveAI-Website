/* ==========================================================================
   core.js — shared namespace, environment flags, tiny helpers, and one
   animation-frame loop for the whole page.

   EVO.task(fn) adds fn to the loop; fn(time) runs every frame and returns
   true while it still has work to do (e.g. an easing that hasn't settled).
   When nothing is busy the loop sleeps; scroll, resize and pointer
   movement wake it (EVO.wake). Modules register with EVO.register(name,
   init, order); main.js boots them in order.
   ========================================================================== */
(function (w, d) {
  'use strict';

  const EVO = (w.EVO = w.EVO || {});
  const html = d.documentElement;

  EVO.env = {
    get motion() { return html.classList.contains('motion'); },
    get fine() { return html.classList.contains('fine'); },
  };

  EVO.$ = (sel, ctx) => (ctx || d).querySelector(sel);
  EVO.$$ = (sel, ctx) => Array.from((ctx || d).querySelectorAll(sel));
  EVO.clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  EVO.lerp = (a, b, t) => a + (b - a) * t;
  EVO.ease = (t) => 1 - Math.pow(1 - t, 3);          // easeOutCubic

  /* Pointer, normalised to -1…1 from the viewport centre */
  EVO.pointer = { x: w.innerWidth / 2, y: w.innerHeight / 2, nx: 0, ny: 0, active: false };

  /* The loop */
  const tasks = new Set();
  let running = false;
  const frame = (t) => {
    let busy = false;
    tasks.forEach((fn) => { if (fn(t)) busy = true; });
    if (busy) w.requestAnimationFrame(frame);
    else running = false;
  };
  EVO.wake = () => {
    if (running) return;
    running = true;
    w.requestAnimationFrame(frame);
  };
  EVO.task = (fn) => {
    tasks.add(fn);
    EVO.wake();
    return () => tasks.delete(fn);
  };

  w.addEventListener('scroll', EVO.wake, { passive: true });
  w.addEventListener('resize', EVO.wake, { passive: true });
  w.addEventListener('pointermove', (e) => {
    const p = EVO.pointer;
    p.x = e.clientX;
    p.y = e.clientY;
    p.nx = (e.clientX / w.innerWidth) * 2 - 1;
    p.ny = (e.clientY / w.innerHeight) * 2 - 1;
    p.active = true;
    EVO.wake();
  }, { passive: true });

  EVO.modules = [];
  EVO.register = (name, init, order) => {
    EVO.modules.push({ name, init, order: order == null ? 50 : order });
  };
})(window, document);
