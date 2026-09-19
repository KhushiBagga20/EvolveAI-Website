/* ==========================================================================
   footer.js — the closing wordmark is fitted to the footer's full width.
   ========================================================================== */
EVO.register('footer', () => {
  const word = EVO.$('[data-footer-word]');
  const inner = word && EVO.$('.fw-inner', word);
  if (!inner) return;
  const fit = () => EVO.fitWidth(inner, word);
  fit();
  window.addEventListener('resize', EVO.debounce(fit, 120));
}, 90);
