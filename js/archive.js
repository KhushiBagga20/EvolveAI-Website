/* ==========================================================================
   archive.js — the moving visual archive.
   Desktop (+ motion): pin the section; vertical scroll drives the rail
   sideways. Each frame clip-reveals as it enters and its image drifts
   inside the mask (parallax) via ScrollTrigger's containerAnimation.
   Touch / reduced motion: native swipe rail with snap (CSS default).
   ========================================================================== */
EVO.register('archive', () => {
  const pin = EVO.$('[data-archive-pin]');
  const rail = EVO.$('[data-archive-rail]');
  const track = EVO.$('[data-archive-track]');
  if (!pin || !rail || !track) return;

  const root = document.documentElement;
  const cards = EVO.$$('.memory', track);
  const count = EVO.$('[data-archive-count]');
  const bar = EVO.$('[data-archive-bar]');
  const total = cards.length;

  const setProgress = (p) => {
    bar.style.setProperty('--p', Math.max(0.04, p).toFixed(3));
    const idx = EVO.clamp(Math.ceil(p * total), 1, total);
    count.textContent = `${EVO.pad(idx)} / ${EVO.pad(total)}`;
  };

  const nativeProgress = () => {
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  };
  track.addEventListener('scroll', nativeProgress, { passive: true });
  nativeProgress();

  if (!EVO.env.motion || !EVO.env.hasGSAP) return;
  const { gsap } = window;

  gsap.matchMedia().add({
    pinned: '(min-width: 900px) and (min-height: 561px)',
    native: '(max-width: 899px), (max-height: 560px)',
  }, (ctx) => {
    if (ctx.conditions.native) {
      // Clip-reveal cards as they're swiped into view
      root.classList.add('archive-native-reveal');
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add('is-in');
        });
      }, { threshold: 0.25 });
      cards.forEach((c) => io.observe(c));
      return () => {
        io.disconnect();
        root.classList.remove('archive-native-reveal');
      };
    }

    root.classList.add('archive-pinned');
    const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth);

    const tween = gsap.to(rail, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 0.9,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => setProgress(self.progress),
      },
    });

    cards.forEach((card) => {
      const frame = card.querySelector('.memory__frame');
      const media = card.querySelector('.memory__media');
      gsap.fromTo(frame,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 96%', end: 'left 58%', scrub: true },
        });
      gsap.fromTo(media, { xPercent: -8 }, {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
    });

    return () => root.classList.remove('archive-pinned');
  });
}, 40);
