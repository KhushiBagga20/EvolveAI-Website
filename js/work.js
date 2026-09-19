/* ==========================================================================
   work.js — "What we do" strips.
   Mouse: colour floods from the exact entry point and retreats to the exit
   point. Keyboard: focus activates. Touch: whichever strip crosses the
   middle of the screen is active, so the section animates as you scroll.
   ========================================================================== */
EVO.register('work', () => {
  const items = EVO.$$('[data-work-item]');
  if (!items.length) return;

  const setOrigin = (item, x, y) => {
    item.style.setProperty('--x', typeof x === 'number' ? `${x}px` : x);
    item.style.setProperty('--y', typeof y === 'number' ? `${y}px` : y);
  };
  const fromEvent = (item, e) => {
    const r = item.getBoundingClientRect();
    setOrigin(item, e.clientX - r.left, e.clientY - r.top);
  };

  items.forEach((item) => {
    item.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      fromEvent(item, e);
      item.classList.add('is-active');
    });
    item.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      fromEvent(item, e);
      item.classList.remove('is-active');
    });
    item.addEventListener('focus', () => {
      setOrigin(item, '6%', '50%');
      item.classList.add('is-active');
    });
    item.addEventListener('blur', () => item.classList.remove('is-active'));
  });

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        setOrigin(en.target, '10%', '50%');
        en.target.classList.toggle('is-active', en.isIntersecting);
      });
    }, { rootMargin: '-44% 0px -44% 0px' });
    items.forEach((item) => io.observe(item));
  }
}, 20);
