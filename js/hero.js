/* ==========================================================================
   hero.js
   1. FIT — EVOLVE is sized to fill the free poster area. Width alone can't
      do that on every screen, so we also solve for the font's width axis:
      expanded on wide/short screens, condensed on tall ones.
   2. PORTAL — the O's centre is measured; as you scroll, a deep-purple disc
      grows from it until it becomes the next section's background.
   3. INTRO — tiles wipe in, letters rise while stretching to their fitted
      width, the O spins into place, then nav + copy settle.
   4. IDLE — tiles turn now and then; the O flips every few seconds.
   ========================================================================== */
EVO.register('hero', () => {
  const hero = EVO.$('[data-hero]');
  if (!hero) return;

  const root = document.documentElement;
  const wrap = EVO.$('[data-hero-wrap]');
  const title = EVO.$('.hero__title', hero);
  const word = EVO.$('[data-hero-word]', hero);
  const letters = EVO.$$('.hl', word);
  const o = EVO.$('[data-hero-o]', hero);
  const portal = EVO.$('[data-hero-portal]', hero);
  const band = EVO.$('.hero__band', hero);

  const MIN = 62;
  const MAX = 125;
  const state = { wdth: MAX };

  root.style.setProperty('--cap', (EVO.measureCap() * 1.03).toFixed(3) + 'em');

  /* 1. FIT ---------------------------------------------------------------- */
  // While the intro animates each letter's width, measurements would lie —
  // so refits requested mid-intro are deferred until it completes.
  let introRunning = false;
  let fitPending = false;
  const fit = () => {
    if (introRunning) { fitPending = true; return; }
    const cs = getComputedStyle(title);
    const W = title.clientWidth;
    const H = title.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (W <= 0 || H <= 0) return;

    word.style.fontSize = '100px';
    const box = (s) => {
      word.style.setProperty('--wdth', s);
      return word.getBoundingClientRect();
    };

    // Solve one layout: returns the width-axis value and scale that fill W×H
    const solve = (split) => {
      word.classList.toggle('is-split', split);
      const kH = H / box(MAX).height;          // height doesn't depend on width axis
      const kW = (s) => W / box(s).width;       // shrinks as letters widen
      let s;
      if (kW(MIN) <= kH) s = MIN;               // tall space: condensed, width-bound
      else if (kW(MAX) >= kH) s = MAX;          // short space: expanded, height-bound
      else {
        let lo = MIN, hi = MAX;
        for (let i = 0; i < 10; i++) {
          const mid = (lo + hi) / 2;
          if (kW(mid) > kH) lo = mid; else hi = mid;
        }
        s = lo;
      }
      return { split, s, k: Math.min(kW(s), kH) * 0.995 };
    };

    // One line, or EVO / LVE stacked — whichever sets the type bigger
    // (one line wins ties: it reads faster).
    const one = solve(false);
    const two = solve(true);
    const best = two.k > one.k * 1.12 ? two : one;

    word.classList.toggle('is-split', best.split);
    word.style.setProperty('--wdth', best.s.toFixed(2));
    word.style.fontSize = (100 * best.k).toFixed(2) + 'px';
    state.wdth = best.s;
  };

  /* 2. PORTAL ------------------------------------------------------------- */
  const geo = { x: 0, y: 0, s: 1 };
  const measurePortal = () => {
    const hr = hero.getBoundingClientRect();
    const r = o.getBoundingClientRect();
    geo.x = r.left + r.width / 2 - hr.left;
    geo.y = r.top + r.height / 2 - hr.top;
    const R = Math.hypot(Math.max(geo.x, hr.width - geo.x), Math.max(geo.y, hr.height - geo.y));
    geo.s = (R * 2) / 100 + 0.1; // the portal element is 100px wide
  };

  fit();
  measurePortal();

  const { gsap, ScrollTrigger } = window;
  if (EVO.env.hasGSAP) {
    ScrollTrigger.addEventListener('refreshInit', () => { fit(); measurePortal(); });
  } else {
    window.addEventListener('resize', EVO.debounce(fit, 120));
  }

  if (EVO.env.motion && EVO.env.hasGSAP) {
    gsap.matchMedia().add('(min-height: 521px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(portal,
        { x: () => geo.x, y: () => geo.y, scale: 0 },
        { x: () => geo.x, y: () => geo.y, scale: () => geo.s, ease: 'power2.in', duration: 0.84 }, 0)
        .to(band, { yPercent: -7, ease: 'none', duration: 1 }, 0);
    });
  }

  /* 4. IDLE --------------------------------------------------------------- */
  let oRot = 0;
  const flipO = () => {
    oRot += 180;
    o.style.setProperty('--o-rot', oRot + 'deg');
  };
  let idleStarted = false;
  const startIdle = () => {
    if (idleStarted || !EVO.env.motion) return;
    idleStarted = true;
    EVO.tickTiles(hero, 1900);
    let visible = true;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);
    setInterval(() => { if (visible && !document.hidden) flipO(); }, 3600);
    o.addEventListener('pointerenter', flipO);
  };

  /* 3. INTRO -------------------------------------------------------------- */
  EVO.hero = {
    intro() {
      if (!EVO.env.hasGSAP || !EVO.env.motion) return;
      root.classList.add('is-intro');
      introRunning = true;

      // Letters always change width as they rise: condensed targets start
      // wide and tighten into place, expanded targets start narrow and stretch.
      const target = state.wdth;
      const from = target < 94 ? Math.min(MAX, target + 50) : Math.max(MIN, target - 50);
      const cells = EVO.$$('.hero__band > .tile, .hero__letter', hero);
      const shapes = EVO.$$('.hero__band [data-tile] .g', hero);
      const glyphs = EVO.$$('.hero__glyph', hero);
      const navBits = EVO.$$('[data-intro-nav]');
      const introBits = EVO.$$('[data-intro]', hero);

      word.style.clipPath = 'inset(-50% -10% 0% -10%)';

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          root.classList.remove('is-intro');
          word.style.clipPath = '';
          introRunning = false;
          if (fitPending) {
            fitPending = false;
            ScrollTrigger.refresh(); // refreshInit → fit() + measurePortal()
          }
          startIdle();
        },
      });

      tl.fromTo(cells,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, stagger: 0.08, clearProps: 'clipPath' }, 0.05)
        .fromTo(shapes,
          { scale: 0, rotation: -135 },
          { scale: 1, rotation: 0, duration: 1.4, ease: 'back.out(1.5)', stagger: 0.07, clearProps: 'transform' }, 0.5)
        .fromTo(letters,
          { yPercent: 140, '--wdth': from },
          { yPercent: 0, '--wdth': target, duration: 1.7, stagger: 0.075, clearProps: 'transform,--wdth' }, 0.2)
        .fromTo(o,
          { scale: 0, rotation: -270 },
          { scale: 1, rotation: 0, duration: 1.8, clearProps: 'transform' }, 0.55)
        .fromTo(glyphs,
          { yPercent: 125 },
          { yPercent: 0, duration: 1.3, stagger: 0.1, clearProps: 'transform' }, 0.85)
        .fromTo(navBits,
          { y: -18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.05, clearProps: 'all' }, 1)
        .fromTo(introBits,
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08, clearProps: 'all' }, 1.1);
    },
  };

  // Without an intro (reduced motion / no GSAP) the idle loop is skipped too.
}, 10);
