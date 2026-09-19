/* ==========================================================================
   archive.js — arrow buttons for the event row. The row itself is native
   horizontal scrolling (swipe / trackpad), so the page never gets hijacked.
   ========================================================================== */
EVO.register('archive', () => {
  const track = EVO.$('[data-archive-track]');
  const prev = EVO.$('[data-archive-prev]');
  const next = EVO.$('[data-archive-next]');
  if (!track || !prev || !next) return;

  // One card plus the gap between cards
  const step = () => {
    const card = track.querySelector('.event');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };

  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };

  const go = (dir) => {
    track.scrollBy({ left: dir * step(), behavior: EVO.env.motion ? 'smooth' : 'auto' });
  };

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', EVO.debounce(update, 150));
  update();
}, 40);
