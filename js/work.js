/* ==========================================================================
   work.js — "What we do" hover. The highlight spreads from where the mouse
   entered and retreats to where it left. Mouse only; touch sees the plain,
   fully readable list.
   ========================================================================== */
EVO.register('work', () => {
  const items = EVO.$$('[data-work-item]');

  const setOrigin = (item, e) => {
    const r = item.getBoundingClientRect();
    item.style.setProperty('--x', `${e.clientX - r.left}px`);
    item.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  items.forEach((item) => {
    item.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      setOrigin(item, e);
      item.classList.add('is-active');
    });
    item.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      setOrigin(item, e);
      item.classList.remove('is-active');
    });
  });
}, 20);
