/* ==========================================================================
   faq.js — one question open at a time. The section's --open (the open
   question's number, 0 when none) moves the shapes behind the glass.
   ========================================================================== */
EVO.register('faq', () => {
  const section = EVO.$('[data-faq]');
  if (!section) return;
  const items = EVO.$$('.faq-item', section);

  const setOpen = (item, open) => {
    item.classList.toggle('is-open', open);
    EVO.$('.faq-item__q', item).setAttribute('aria-expanded', String(open));
  };

  items.forEach((item, i) => {
    EVO.$('.faq-item__q', item).addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      items.forEach((other) => { if (other !== item) setOpen(other, false); });
      setOpen(item, open);
      section.style.setProperty('--open', open ? i + 1 : 0);
    });
  });
}, 70);
