/* ==========================================================================
   events.js — the collage. Hovering a photo lifts it (CSS), nudges its
   neighbours away from it and shifts the shapes behind. Clicking opens
   the photo large in a dialog, with previous / next.
   ========================================================================== */
EVO.register('events', () => {
  const collage = EVO.$('[data-collage]');
  if (!collage) return;
  const photos = EVO.$$('[data-photo]', collage);

  /* Neighbours make room (desktop collage only) ---------------------------- */
  const wide = window.matchMedia('(min-width: 900px)');
  if (EVO.env.fine && EVO.env.motion) {
    const reset = () => {
      photos.forEach((p) => { p.style.setProperty('--px', '0px'); p.style.setProperty('--py', '0px'); });
      collage.style.setProperty('--hx', 0);
      collage.style.setProperty('--hy', 0);
    };
    const centre = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    photos.forEach((photo) => {
      photo.addEventListener('pointerenter', () => {
        if (!wide.matches) return;
        const c = centre(photo);
        const box = collage.getBoundingClientRect();
        photos.forEach((other) => {
          if (other === photo) { other.style.setProperty('--px', '0px'); other.style.setProperty('--py', '0px'); return; }
          const o = centre(other);
          const dx = o.x - c.x;
          const dy = o.y - c.y;
          const d = Math.hypot(dx, dy) || 1;
          const push = 22 * Math.max(0, 1 - d / 900);
          other.style.setProperty('--px', `${(dx / d * push).toFixed(1)}px`);
          other.style.setProperty('--py', `${(dy / d * push).toFixed(1)}px`);
        });
        collage.style.setProperty('--hx', (((c.x - box.left) / box.width) * 2 - 1).toFixed(2));
        collage.style.setProperty('--hy', (((c.y - box.top) / box.height) * 2 - 1).toFixed(2));
      });
    });
    collage.addEventListener('pointerleave', reset);
  }

  /* Lightbox ----------------------------------------------------------------- */
  const box = EVO.$('[data-lightbox]');
  if (!box || typeof box.showModal !== 'function') return;
  const img = EVO.$('[data-lightbox-img]', box);
  const title = EVO.$('[data-lightbox-title]', box);
  const meta = EVO.$('[data-lightbox-meta]', box);
  let index = 0;

  const show = (i) => {
    index = (i + photos.length) % photos.length;
    const photo = photos[index];
    const source = EVO.$('img', photo);
    img.src = source.currentSrc || source.src;
    img.alt = source.alt;
    title.textContent = EVO.$('.ph__label b', photo).textContent;
    meta.textContent = EVO.$('.ph__label span', photo).textContent;
  };

  photos.forEach((photo, i) => photo.addEventListener('click', () => {
    show(i);
    box.showModal();
  }));
  EVO.$('[data-lightbox-prev]', box).addEventListener('click', () => show(index - 1));
  EVO.$('[data-lightbox-next]', box).addEventListener('click', () => show(index + 1));
  EVO.$('[data-lightbox-close]', box).addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
  box.addEventListener('close', () => photos[index].focus());
}, 60);
