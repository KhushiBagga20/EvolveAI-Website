/* ==========================================================================
   voices.js — testimonial switcher. Changes only when the visitor asks
   (arrows or ← → keys); a short crossfade, no autoplay.
   ========================================================================== */
EVO.register('voices', () => {
  const stage = EVO.$('[data-voices]');
  if (!stage) return;

  const quotes = EVO.$$('[data-quote]', stage);
  const current = EVO.$('[data-voices-current]', stage);
  const total = EVO.$('[data-voices-total]', stage);
  let index = 0;

  // Long quotes set a little smaller so every quote fits the same space
  quotes.forEach((q) => {
    const len = q.querySelector('blockquote p').textContent.trim().length;
    q.style.setProperty('--q-scale', Math.sqrt(EVO.clamp(120 / len, 0.55, 1)).toFixed(3));
  });
  if (total) total.textContent = EVO.pad(quotes.length);

  const show = (next) => {
    next = (next + quotes.length) % quotes.length;
    quotes[index].classList.remove('is-active');
    index = next;
    quotes[index].classList.add('is-active');
    current.textContent = EVO.pad(index + 1);
  };

  EVO.$('[data-voices-next]', stage).addEventListener('click', () => show(index + 1));
  EVO.$('[data-voices-prev]', stage).addEventListener('click', () => show(index - 1));
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
}, 50);
