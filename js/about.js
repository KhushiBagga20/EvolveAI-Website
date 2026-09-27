/* ==========================================================================
   about.js — the hero → about transition. The arch that rises at the
   bottom of the hero widens with scroll until it becomes the section's
   whole surface: --ax (side inset) goes to 0 and --ar (top radius) goes
   from a full semicircle to a soft corner.
   ========================================================================== */
EVO.register('about', () => {
  const section = EVO.$('[data-arch]');
  if (!section) return;
  const arch = EVO.$('.about__arch', section);

  const set = (inset, radius) => {
    arch.style.setProperty('--ax', `${inset.toFixed(1)}px`);
    arch.style.setProperty('--ar', `${radius.toFixed(1)}px`);
  };

  const finalInset = () => (window.innerWidth < 600 ? 8 : 12);

  if (!EVO.env.motion) {
    set(finalInset(), 56);
    return;
  }

  EVO.task(() => {
    const vh = window.innerHeight;
    const top = section.getBoundingClientRect().top;
    if (top > vh * 1.2 || top < -vh) return false;

    const w = arch.clientWidth;
    const narrow = w < 600;
    const start = Math.min(section.offsetTop, vh * .9);   // where it sits on load
    const end = vh * .12;
    const p = EVO.ease(EVO.clamp((start - top) / (start - end), 0, 1));

    const inset0 = w * (narrow ? .12 : .31);
    const radius0 = (w - 2 * inset0) / 2;        // a semicircle: a doorway
    set(EVO.lerp(inset0, finalInset(), p), EVO.lerp(radius0, narrow ? 32 : 56, p));
    return false;
  });
}, 45);
