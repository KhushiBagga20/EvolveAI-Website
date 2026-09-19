/* ==========================================================================
   faq.js — accordion. CSS animates the real height (grid rows 0fr → 1fr);
   this only flips state + ARIA, then re-measures scroll animations once
   the page below has moved.
   ========================================================================== */
EVO.register('faq', () => {
  let refresh;
  EVO.$$('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-item__q');
    if (!button) return;
    button.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      clearTimeout(refresh);
      if (EVO.env.hasGSAP) refresh = setTimeout(() => window.ScrollTrigger.refresh(), 700);
    });
  });
}, 55);
