/* ==========================================================================
   voices.js — testimonial carousel.
   Words slide through masks; the orb turns half a revolution per change.
   Autoplay (motion only) is driven by the progress pill's CSS animation:
   when it ends, the next quote arrives. Hover/focus pauses it; using the
   arrows hands control to the visitor and stops autoplay for good.
   ========================================================================== */
EVO.register('voices', () => {
  const stage = EVO.$('[data-voices]');
  if (!stage) return;

  const section = stage.closest('.voices');
  const quotes = EVO.$$('[data-quote]', stage);
  const current = EVO.$('[data-voices-current]', stage);
  const total = EVO.$('[data-voices-total]', stage);
  const progress = EVO.$('[data-voices-progress]', stage);
  const orb = EVO.$('[data-voices-orb]');
  const qmark = EVO.$('[data-qmark]', stage);

  /* Split each quote into word masks; scale long quotes down a touch */
  quotes.forEach((q) => {
    const p = q.querySelector('blockquote p');
    const text = p.textContent.trim();
    q.style.setProperty('--q-scale', Math.sqrt(EVO.clamp(120 / text.length, 0.55, 1)).toFixed(3));
    p.textContent = '';
    text.split(/\s+/).forEach((word, i) => {
      const outer = document.createElement('span');
      const inner = document.createElement('span');
      outer.className = 'w';
      outer.style.setProperty('--wi', i);
      inner.textContent = word;
      outer.appendChild(inner);
      p.appendChild(outer);
      p.appendChild(document.createTextNode(' '));
    });
  });
  if (total) total.textContent = EVO.pad(quotes.length);

  let index = 0;
  let turn = 0;
  let manual = !EVO.env.motion;
  if (manual) section.classList.add('is-manual');

  const restartProgress = () => {
    progress.classList.remove('is-running');
    if (manual) return;
    void progress.offsetWidth; // restart the CSS animation
    progress.classList.add('is-running');
  };

  const show = (next, dir) => {
    next = (next + quotes.length) % quotes.length;
    if (next === index && quotes[index].classList.contains('is-active')) return;
    const prev = quotes[index];
    if (prev.classList.contains('is-active')) {
      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      setTimeout(() => prev.classList.remove('is-leaving'), 800);
    }
    index = next;
    quotes[index].classList.add('is-active');
    current.textContent = EVO.pad(index + 1);
    turn += dir === undefined ? 1 : dir;
    if (orb) orb.style.setProperty('--orb-rot', `${turn * 180}deg`);
    if (qmark) qmark.style.setProperty('--qmark-rot', `${turn * 12 % 24 - 6}deg`);
    restartProgress();
  };

  const takeControl = () => {
    if (manual) return;
    manual = true;
    section.classList.add('is-manual');
    progress.classList.remove('is-running');
  };

  EVO.$('[data-voices-next]', stage).addEventListener('click', () => { takeControl(); show(index + 1, 1); });
  EVO.$('[data-voices-prev]', stage).addEventListener('click', () => { takeControl(); show(index - 1, -1); });
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { takeControl(); show(index + 1, 1); }
    if (e.key === 'ArrowLeft') { takeControl(); show(index - 1, -1); }
  });

  progress.addEventListener('animationend', () => { if (!manual) show(index + 1, 1); });

  const setPaused = (paused) => section.classList.toggle('is-paused', paused);
  stage.addEventListener('pointerenter', () => setPaused(true));
  stage.addEventListener('pointerleave', () => setPaused(false));
  stage.addEventListener('focusin', () => setPaused(true));
  stage.addEventListener('focusout', () => setPaused(false));

  /* The first quote writes itself in when the section arrives */
  quotes.forEach((q) => q.classList.remove('is-active'));
  if ('IntersectionObserver' in window && EVO.env.motion) {
    let started = false;
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !started) {
        started = true;
        show(0, 0);
      }
      if (!manual) setPaused(!en.isIntersecting);
    }, { threshold: 0.35 }).observe(stage);
  } else {
    show(0, 0);
  }
}, 50);
