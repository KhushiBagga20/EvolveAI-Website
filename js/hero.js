/* ==========================================================================
   hero.js
   FIT — EVOLVE is sized to fill the free poster area. Width alone can't do
   that on every screen, so we also solve for the font's width axis:
   expanded on wide/short screens, condensed on tall ones. The word always
   stays on one line — it is never broken across lines.
   INTRO — a one-time CSS entrance (see hero.css); this only prepares it.
   ========================================================================== */
EVO.register('hero', () => {
  const hero = EVO.$('[data-hero]');
  if (!hero) return;

  const root = document.documentElement;
  const title = EVO.$('.hero__title', hero);
  const word = EVO.$('[data-hero-word]', hero);
  const letters = EVO.$$('.hl', word);

  const MIN = 62;
  const MAX = 125;
  const state = { wdth: MAX };

  // While the intro animates each letter's width, measurements would lie —
  // refits requested mid-intro wait until it has finished.
  let introRunning = false;
  let fitPending = false;

  root.style.setProperty('--cap', (EVO.measureCap() * 1.03).toFixed(3) + 'em');

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

    // Find the width-axis value that fills W×H best. On tall, narrow screens
    // this lands on the condensed end and the word is width-bound — as tall
    // as it can be across the screen, still on one line.
    const kH = H / box(MAX).height;             // height doesn't depend on width axis
    const kW = (s) => W / box(s).width;          // shrinks as letters widen
    let s;
    if (kW(MIN) <= kH) s = MIN;                  // tall space: condensed, width-bound
    else if (kW(MAX) >= kH) s = MAX;             // short space: expanded, height-bound
    else {
      let lo = MIN, hi = MAX;
      for (let i = 0; i < 10; i++) {
        const mid = (lo + hi) / 2;
        if (kW(mid) > kH) lo = mid; else hi = mid;
      }
      s = lo;
    }
    const k = Math.min(kW(s), kH) * 0.995;

    word.style.setProperty('--wdth', s.toFixed(2));
    word.style.fontSize = (100 * k).toFixed(2) + 'px';
    state.wdth = s;
  };

  fit();
  window.addEventListener('resize', EVO.debounce(fit, 120));

  // Stagger indices for the CSS intro
  letters.forEach((el, i) => el.style.setProperty('--li', i));
  EVO.$$('.hero__letter', hero).forEach((el, i) => el.style.setProperty('--si', i));
  EVO.$$('[data-intro-nav], [data-intro]').forEach((el, i) => el.style.setProperty('--ii', i));

  EVO.hero = {
    intro() {
      if (!EVO.env.motion) return;
      // Letters settle into their fitted width as they rise: condensed
      // targets start wider, expanded targets start narrower.
      const target = state.wdth;
      const from = target < 94 ? Math.min(MAX, target + 45) : Math.max(MIN, target - 45);
      word.style.setProperty('--wdth-from', from.toFixed(2));

      introRunning = true;
      root.classList.add('is-intro');
      setTimeout(() => {
        root.classList.remove('is-intro');
        introRunning = false;
        if (fitPending) {
          fitPending = false;
          fit();
        }
      }, 2300);
    },
  };
}, 10);
