/* ==========================================================================
   sections.js — scroll choreography that ties sections together.
   UPPER (above the pinned archive) and LOWER (below it) are registered
   separately so ScrollTriggers are created in page order — the archive's
   pin spacing must exist before anything below it measures itself.
   ========================================================================== */

/* Arch rows rise out of the previous section to become the next one's edge */
const evoArchRows = (rows) => {
  const { gsap } = window;
  rows.forEach((row) => {
    gsap.fromTo(EVO.$$('span', row),
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: 'none',
        stagger: { each: 0.14, from: 'random' },
        scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom 50%', scrub: 0.6 },
      });
  });
};

/* ── UPPER: origin + vision ─────────────────────────────────────────────── */
EVO.register('sections-upper', () => {
  const windows = EVO.$$('[data-windows] > span');

  if (!EVO.env.motion || !EVO.env.hasGSAP) return;
  const { gsap, ScrollTrigger } = window;

  evoArchRows(EVO.$$('.origin [data-arch-row]'));

  // "2021" drifts sideways; its zero assembles from two half-rings
  const year = EVO.$('[data-origin-year]');
  if (year) {
    gsap.fromTo(year, { xPercent: 5 }, {
      xPercent: -5,
      ease: 'none',
      scrollTrigger: { trigger: year, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    const zero = EVO.$('[data-origin-zero]');
    gsap.fromTo(zero, { '--zy-top': '-85%', '--zy-bottom': '85%' }, {
      '--zy-top': '0%',
      '--zy-bottom': '0%',
      ease: 'power2.out',
      scrollTrigger: { trigger: year, start: 'top 92%', end: 'top 30%', scrub: 0.8 },
    });
  }

  // Colonnade windows light up (in a scattered order) as you pass
  if (windows.length) {
    const order = [0, 6, 3, 9, 1, 11, 4, 7, 2, 10, 5, 8].filter((i) => i < windows.length);
    ScrollTrigger.create({
      trigger: '[data-windows]',
      start: 'top 88%',
      end: 'bottom 35%',
      onUpdate: (self) => {
        const lit = Math.round(self.progress * order.length);
        order.forEach((idx, n) => windows[idx].classList.toggle('is-lit', n < lit));
      },
    });
  }

  // Vision: the orange field arrives as an arch and opens to full bleed
  const panel = EVO.$('[data-vision-panel]');
  if (panel) {
    gsap.fromTo(panel,
      { clipPath: 'inset(6% 5% 0% 5% round 45vw 45vw 0vw 0vw)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)',
        ease: 'none',
        scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 12%', scrub: true },
      });
  }

  // Statement lines drift at different speeds (typography movement).
  // Travel is bounded by each line's free space, so text slides into empty
  // room and never off the page — left-aligned lines drift right,
  // right-aligned lines drift left; the sign of data-drift sets the phase.
  EVO.$$('[data-drift]').forEach((line) => {
    const d = parseFloat(line.dataset.drift) || 0;
    const inner = line.firstElementChild;
    const dir = line.closest('.vs--2') && getComputedStyle(line).textAlign === 'right' ? -1 : 1;
    const amp = () => {
      const slack = line.clientWidth - inner.getBoundingClientRect().width;
      return Math.max(0, Math.min((Math.abs(d) / 100) * line.clientWidth * 2, slack));
    };
    gsap.fromTo(line,
      { x: () => dir * (d > 0 ? 0 : amp()) },
      {
        x: () => dir * (d > 0 ? amp() : 0),
        ease: 'none',
        scrollTrigger: { trigger: line, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
  });

  // Shapes that turn with scroll
  EVO.$$('[data-spin]').forEach((el) => {
    gsap.fromTo(el, { rotation: -90 }, {
      rotation: 90,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}, 30);

/* ── LOWER: scallops, FAQ, partners, contact, footer ────────────────────── */
EVO.register('sections-lower', () => {
  // Footer wordmark always fits its container, motion or not
  const fw = EVO.$('[data-footer-word]');
  const fwInner = fw && EVO.$('.fw-inner', fw);
  const fitFooter = () => EVO.fitWidth(fwInner, fw);
  fitFooter();
  if (EVO.env.hasGSAP) window.ScrollTrigger.addEventListener('refreshInit', fitFooter);
  else window.addEventListener('resize', EVO.debounce(fitFooter, 120));

  if (!EVO.env.motion || !EVO.env.hasGSAP) return;
  const { gsap } = window;

  // The page ends on the tile strip it began with — ticking quietly
  EVO.tickTiles(EVO.$('[data-tile-strip]'), 1500);

  // Footer "O" flips with scroll
  const fo = EVO.$('.footer__o');
  if (fo) {
    fo.style.transition = 'none';
    gsap.fromTo(fo, { rotation: -180 }, {
      rotation: 180,
      ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }

  // Half-discs drop from the archive into the testimonials
  EVO.$$('[data-scallops]').forEach((row) => {
    gsap.fromTo(EVO.$$('span', row), { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      stagger: 0.12,
      scrollTrigger: { trigger: row, start: 'top 100%', end: 'top 45%', scrub: 0.6 },
    });
  });

  // FAQ: the lilac spills in and grows; the two-halves circle turns
  const faq = EVO.$('.faq');
  if (faq) {
    gsap.fromTo('.faq__quarter', { scale: 0.55 }, {
      scale: 1.1,
      ease: 'none',
      scrollTrigger: { trigger: faq, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    const deco = EVO.$('[data-faq-deco]');
    if (deco) {
      deco.style.transition = 'none';
      gsap.fromTo(deco, { rotation: 0 }, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: { trigger: faq, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  }

  // Partners: the rounded block settles into place
  const block = EVO.$('[data-partners-block]');
  if (block) {
    gsap.fromTo(block, { scale: 0.93, yPercent: 4 }, {
      scale: 1,
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: block, start: 'top bottom', end: 'top 30%', scrub: true },
    });
  }

  // Contact: arches rise; the frame's shapes assemble around the form
  evoArchRows(EVO.$$('.contact [data-arch-row]'));
  const frame = EVO.$('[data-contact-frame]');
  if (frame) {
    const st = { trigger: frame, start: 'top 90%', end: 'top 25%', scrub: 0.8 };
    gsap.fromTo('.cshape--sun', { rotation: -180 }, { rotation: 0, ease: 'none', scrollTrigger: st });
    gsap.fromTo('.cshape--quarter', { scale: 0, transformOrigin: '100% 100%' }, { scale: 1, ease: 'none', scrollTrigger: st });
    gsap.fromTo('.cshape--pill', { yPercent: 80 }, { yPercent: -10, ease: 'none', scrollTrigger: st });
    gsap.fromTo('.cshape--u', { rotation: 90, scale: 0.4 }, { rotation: 0, scale: 1, ease: 'none', scrollTrigger: st });
  }
}, 60);
