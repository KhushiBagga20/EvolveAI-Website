/* ==========================================================================
   vision.js — while the vision section is pinned, one statement is shown
   at a time, chosen by how far through the section you have scrolled.
   The words of the current line are .is-active; lines already read are
   .is-past (they leave into a blur). --vp (0…1) moves the soft shapes.
   ========================================================================== */
EVO.register('vision', () => {
  const section = EVO.$('[data-vision]');
  if (!section) return;
  const lines = EVO.$$('[data-vline]', section);
  const steps = EVO.$$('.vision__steps li', section);

  lines.forEach((line) => EVO.split(line));
  if (!EVO.env.motion) return;

  let current = -1;
  const show = (index) => {
    if (index === current) return;
    current = index;
    lines.forEach((line, i) => {
      line.classList.toggle('is-active', i === index);
      line.classList.toggle('is-past', i < index);
      line.setAttribute('aria-hidden', String(i !== index));
    });
    steps.forEach((s, i) => s.classList.toggle('is-on', i === index));
  };

  EVO.task(() => {
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return false;
    const p = EVO.clamp(-r.top / (r.height - vh), 0, 1);
    section.style.setProperty('--vp', p.toFixed(3));
    show(Math.min(lines.length - 1, Math.floor(p * lines.length)));
    return false;
  });
}, 65);
