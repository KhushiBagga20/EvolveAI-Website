/* ==========================================================================
   cursor.js — on desktop, a small violet dot follows the pointer with a
   little lag. Over links and buttons it opens into a ring; over anything
   with [data-cursor="Label"] it shows the label. It steps aside over text
   fields. Fine pointers only, and never with reduced motion (see the flag
   script in index.html).
   ========================================================================== */
EVO.register('cursor', () => {
  if (!EVO.env.fine) return;
  const el = EVO.$('[data-cursor-el]');
  const labelEl = EVO.$('[data-cursor-label]');
  if (!el) return;

  document.documentElement.classList.add('has-cursor');

  const pos = { x: EVO.pointer.x, y: EVO.pointer.y };
  let label = '';

  EVO.task(() => {
    const p = EVO.pointer;
    if (!p.active) return false;
    pos.x = EVO.lerp(pos.x, p.x, .22);
    pos.y = EVO.lerp(pos.y, p.y, .22);
    el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    return Math.abs(p.x - pos.x) > .1 || Math.abs(p.y - pos.y) > .1;
  });

  const setState = (target) => {
    const labelled = target && target.closest('[data-cursor]');
    const text = target && target.closest('input, textarea');
    const hover = target && target.closest('a, button, [role="button"], label');
    el.classList.toggle('is-text', !!text);
    if (labelled) {
      const next = labelled.getAttribute('data-cursor');
      if (next !== label) { label = next; labelEl.textContent = next; }
      el.classList.add('is-label');
      el.classList.remove('is-hover');
    } else {
      el.classList.remove('is-label');
      el.classList.toggle('is-hover', !!hover);
    }
  };

  document.addEventListener('pointerover', (e) => setState(e.target), { passive: true });
  document.addEventListener('pointermove', () => el.classList.add('is-visible'), { passive: true, once: false });
  document.documentElement.addEventListener('pointerleave', () => el.classList.remove('is-visible'));
}, 20);
