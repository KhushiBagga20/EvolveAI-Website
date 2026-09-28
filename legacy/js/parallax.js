/* ==========================================================================
   parallax.js — two kinds of depth.

   [data-depth="n"] inside a [data-pointer-scene]: the layer drifts up to
   n px with the pointer (negative n moves against it), eased, so glass in
   front and shapes behind move at different speeds.

   [data-speed="s"]: the element slides at a different speed while it
   scrolls past (translateY = distance from the viewport centre × s).

   Both only work while their section is on screen, and neither runs for
   touch or reduced motion.
   ========================================================================== */
EVO.register('parallax', () => {
  if (!EVO.env.motion) return;

  /* Pointer depth ---------------------------------------------------------- */
  if (EVO.env.fine) {
    EVO.$$('[data-pointer-scene]').forEach((scene) => {
      const layers = EVO.$$('[data-depth]', scene).map((el) => ({
        el, depth: parseFloat(el.dataset.depth) || 0, x: 0, y: 0,
      }));
      EVO.task(() => {
        if (!scene.classList.contains('is-inview')) return false;
        const { nx, ny } = EVO.pointer;
        let busy = false;
        layers.forEach((l) => {
          const tx = nx * l.depth;
          const ty = ny * l.depth * 0.7;
          l.x = EVO.lerp(l.x, tx, .06);
          l.y = EVO.lerp(l.y, ty, .06);
          if (Math.abs(tx - l.x) > .05 || Math.abs(ty - l.y) > .05) busy = true;
          l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`;
        });
        return busy;
      });
    });
  }

  /* Scroll speed ------------------------------------------------------------ */
  const movers = EVO.$$('[data-speed]').map((el) => ({ el, speed: parseFloat(el.dataset.speed) || 0 }));
  if (!movers.length) return;
  EVO.task(() => {
    const vh = window.innerHeight;
    movers.forEach((m) => {
      const host = m.el.parentElement.getBoundingClientRect();
      if (host.bottom < -vh * .2 || host.top > vh * 1.2) return;
      const offset = (host.top + host.height / 2 - vh / 2) * m.speed;
      m.el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    return false;
  });
}, 40);
