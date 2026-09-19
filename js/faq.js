/* ==========================================================================
   faq.js — accordion. CSS animates the real height (grid rows 0fr → 1fr);
   this only flips the state and its ARIA.
   ========================================================================== */
EVO.register('faq', () => {
  EVO.$$('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-item__q');
    if (!button) return;
    button.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
}, 55);
