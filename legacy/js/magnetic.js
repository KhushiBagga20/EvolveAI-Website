/* ==========================================================================
   magnetic.js — [data-magnetic] buttons lean a few pixels toward the
   pointer while it is near, then settle back (CSS eases the translate).
   ========================================================================== */
EVO.register('magnetic', () => {
  if (!EVO.env.fine) return;

  EVO.$$('[data-magnetic]').forEach((el) => {
    const pull = 0.28;
    const max = 12;

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--mx', `${EVO.clamp(dx * pull, -max, max)}px`);
      el.style.setProperty('--my', `${EVO.clamp(dy * pull, -max, max)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
}, 30);
