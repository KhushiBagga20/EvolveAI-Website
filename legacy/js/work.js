/* ==========================================================================
   work.js — "What we do". Nine tiles on a stage rearrange into a
   composition for each activity; the glass panel over them changes to the
   activity's name and description.

   A recipe lists the nine tiles row by row as "form colour scale", where
   form is one of FORMS below, colour one of FILLS (or glass / line), and
   scale 0 hides the tile.
   ========================================================================== */
EVO.register('work', () => {
  const list = EVO.$('[data-acts]');
  const stage = EVO.$('[data-stage]');
  if (!list || !stage) return;

  const tiles = EVO.$$('[data-stage-tiles] .mt', stage);
  const glass = EVO.$('[data-stage-glass]', stage);
  const numEl = EVO.$('[data-stage-num]', stage);
  const nameEl = EVO.$('[data-stage-name]', stage);
  const descEl = EVO.$('[data-stage-desc]', stage);
  const items = EVO.$$('.act', list);

  /*                  TL    TR    BR    BL */
  const FORMS = {
    sq: '0',
    q1: '100% 0 0 0',   q2: '0 100% 0 0',   q3: '0 0 100% 0',   q4: '0 0 0 100%',   // quarters
    l1: '100% 0 100% 0', l2: '0 100% 0 100%',                                        // leaves
    d1: '50% 0 50% 50%', d2: '50% 50% 0 50%', d3: '50% 50% 50% 0', d4: '0 50% 50% 50%', // drops
    c: '50%',                                                                         // circle
    a1: '50% 50% 0 0',  a2: '0 0 50% 50%',  a3: '50% 0 0 50%',  a4: '0 50% 50% 0',   // arches
  };
  const FILLS = {
    deep: 'var(--deep)', royal: 'var(--royal)', el: 'var(--electric)', ind: 'var(--indigo)',
    lav: 'var(--lavender)', peri: 'var(--periwinkle)', lilac: 'var(--lilac)',
  };

  const RECIPES = {
    // everything comes together: one rounded mass with a bright core
    events: 'q1 royal 1, sq royal 1, q2 royal 1, sq royal 1, c el 1, sq royal 1, q4 royal 1, sq royal 1, q3 royal 1',
    // momentum: drops all pointing up and right, growing as they go
    hackathons: 'd1 lav .55, d1 el .8, d1 el 1, d1 lilac .4, d1 lav .6, d1 el .8, d1 lilac .25, d1 lilac .4, d1 lav .55',
    // building up: blocks and arches stacked into steps
    workshops: 'sq lilac 0, sq lilac 0, a1 el 1, sq lilac 0, a1 lav 1, sq royal 1, a1 peri 1, sq royal 1, sq deep 1',
    // one voice, ideas going out: a solid core, outlined petals around it
    talks: 'q1 line 1, a1 line 1, q2 line 1, a3 line 1, c el 1, a4 line 1, q4 line 1, a2 line 1, q3 line 1',
    // theory into things: an engineer's grid of squares and circles
    projects: 'sq deep 1, c el 1, sq deep 1, c el 1, sq deep 1, c el 1, sq deep 1, c el 1, sq deep 1',
    // back and forth: the interlocking S-curves, half of them glass
    learning: 'd1 el 1, d3 glass 1, d1 el 1, d2 glass 1, d4 el 1, d2 glass 1, d1 el 1, d3 glass 1, d1 el 1',
  };

  const apply = (key) => {
    const recipe = RECIPES[key].split(',').map((t) => t.trim().split(/\s+/));
    tiles.forEach((tile, i) => {
      const [form, fill, scale] = recipe[i];
      tile.style.setProperty('--form', FORMS[form]);
      tile.style.setProperty('--s', scale);
      tile.style.setProperty('--delay', `${(i % 3 + Math.floor(i / 3)) * 45}ms`);
      tile.classList.toggle('is-glass', fill === 'glass');
      tile.classList.toggle('is-line', fill === 'line');
      if (FILLS[fill]) tile.style.setProperty('--fill', FILLS[fill]);
    });
  };

  let current = -1;
  let swapTimer = 0;
  const activate = (index) => {
    if (index === current) return;
    current = index;
    const item = items[index];
    const btn = EVO.$('.act__btn', item);
    items.forEach((it, i) => it.classList.toggle('is-active', i === index));
    apply(btn.dataset.act);

    // the glass panel: fade the words out, swap them, fade back in
    glass.classList.add('is-swapping');
    clearTimeout(swapTimer);
    swapTimer = setTimeout(() => {
      numEl.textContent = EVO.$('.act__num', item).textContent;
      nameEl.textContent = EVO.$('.act__name', item).textContent;
      descEl.textContent = EVO.$('.act__desc', item).textContent;
      glass.classList.remove('is-swapping');
    }, 220);
  };

  items.forEach((item, i) => {
    const btn = EVO.$('.act__btn', item);
    btn.addEventListener('pointerenter', () => activate(i));
    btn.addEventListener('focus', () => activate(i));
    btn.addEventListener('click', () => activate(i));
  });

  current = 0;
  apply(EVO.$('.act__btn', items[0]).dataset.act);
}, 50);
