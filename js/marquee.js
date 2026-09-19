/* ==========================================================================
   marquee.js — the marquees and ticker bands are plain CSS animations.
   This nudges their playbackRate with scroll velocity, and flips their
   direction when you scroll back up. No layout work, just the Web
   Animations API on animations the compositor already runs.
   ========================================================================== */
EVO.register('marquee', () => {
  if (!EVO.env.motion) return;

  const tracks = EVO.$$('.marquee__track, .band__track');
  const anims = tracks
    .map((t) => (t.getAnimations ? t.getAnimations()[0] : null))
    .filter(Boolean);
  if (!anims.length) return;

  let lastY = window.scrollY;
  let lastT = performance.now();
  let dir = 1;
  let rate = 1;

  const step = () => {
    const now = performance.now();
    const y = window.scrollY;
    const dt = Math.max(16, now - lastT);
    const v = (y - lastY) / dt; // px per ms
    if (Math.abs(v) > 0.05) dir = v > 0 ? 1 : -1;
    const target = dir * (1 + Math.min(Math.abs(v) * 2.2, 5));
    rate += (target - rate) * 0.08;
    if (Math.abs(anims[0].playbackRate - rate) > 0.01) {
      anims.forEach((a) => { a.playbackRate = rate; });
    }
    lastY = y;
    lastT = now;
  };

  if (EVO.env.hasGSAP) window.gsap.ticker.add(step);
  else {
    const loop = () => { step(); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
}, 70);
