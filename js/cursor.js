/* ==========================================================================
   cursor.js — a small blend-mode dot on fine pointers.
   Grows over interactive things; becomes a "View" disc over the archive;
   steps aside for text fields. Never created on touch or reduced motion.
   ========================================================================== */
EVO.register('cursor', () => {
  if (!EVO.env.finePointer || !EVO.env.motion) return;

  const el = document.createElement('div');
  el.className = 'cursor is-hidden';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="cursor__ball"><span class="cursor__label"></span></div>';
  document.body.appendChild(el);
  document.documentElement.classList.add('has-cursor');
  const label = el.querySelector('.cursor__label');

  let x = -200, y = -200, cx = x, cy = y, raf = 0;
  const render = () => {
    cx += (x - cx) * 0.35;
    cy += (y - cy) * 0.35;
    el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.2 ? requestAnimationFrame(render) : 0;
  };

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    x = e.clientX;
    y = e.clientY;
    if (el.classList.contains('is-hidden') && !el.dataset.field) {
      cx = x; cy = y; // appear in place, don't fly in from a corner
      el.classList.remove('is-hidden');
    }
    if (!raf) raf = requestAnimationFrame(render);
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => el.classList.add('is-hidden'));
  window.addEventListener('pointerdown', () => el.classList.add('is-down'));
  window.addEventListener('pointerup', () => el.classList.remove('is-down'));

  const INTERACTIVE = 'a, button, [data-work-item], [data-tile], label';
  document.addEventListener('pointerover', (e) => {
    const t = e.target;
    const view = t.closest('[data-cursor="view"]');
    const field = t.closest('input, textarea, select');

    el.dataset.field = field ? '1' : '';
    el.classList.toggle('is-hidden', !!field);

    if (view) {
      label.innerHTML = 'View';
      el.classList.add('is-label');
      el.classList.remove('is-hover');
      return;
    }
    el.classList.remove('is-label');
    el.classList.toggle('is-hover', !!t.closest(INTERACTIVE));
  });
}, 1);
