/* ==========================================================================
   contact.js — checks the three fields, then plays the "sent" moment: the
   button's label folds away, the arrow turns into a tick and a handful of
   small shapes fly out of it.
   Prototype: nothing is sent anywhere yet (see README).
   ========================================================================== */
EVO.register('contact', () => {
  const form = EVO.$('[data-form]');
  if (!form) return;
  const status = EVO.$('[data-form-status]', form);
  const button = EVO.$('button[type="submit"]', form);
  const burst = EVO.$('[data-burst]', form);
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const check = (field) => {
    const input = EVO.$('.field__input', field);
    const value = input.value.trim();
    const ok = input.type === 'email' ? emailOk(value) : value.length > 0;
    field.classList.toggle('is-invalid', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    return ok;
  };

  EVO.$$('.field', form).forEach((field) => {
    EVO.$('.field__input', field).addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) check(field);
    });
  });

  const throwShapes = () => {
    if (!EVO.env.motion || !burst) return;
    const f = form.getBoundingClientRect();
    const b = button.getBoundingClientRect();
    burst.style.setProperty('--bx', `${b.right - f.left - 26}px`);
    burst.style.setProperty('--by', `${b.top - f.top + b.height / 2}px`);
    const radii = ['50%', '50% 0 50% 50%', '100% 0 0 0', '0', '100% 0 100% 0'];
    const colours = ['var(--electric)', 'var(--lavender)', 'var(--royal)', 'var(--periwinkle)', 'var(--indigo)'];
    burst.textContent = '';
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('i');
      const angle = (-Math.PI / 2) + (Math.random() - .5) * Math.PI * 1.4;
      const dist = 70 + Math.random() * 110;
      s.style.setProperty('--tx', `${(Math.cos(angle) * dist).toFixed(0)}px`);
      s.style.setProperty('--ty', `${(Math.sin(angle) * dist).toFixed(0)}px`);
      s.style.setProperty('--sz', `${8 + Math.random() * 14}px`);
      s.style.setProperty('--r', radii[i % radii.length]);
      s.style.setProperty('--c', colours[i % colours.length]);
      s.style.setProperty('--rot', `${(Math.random() - .5) * 360}deg`);
      s.style.animationDelay = `${i * 18}ms`;
      burst.appendChild(s);
    }
    setTimeout(() => { burst.textContent = ''; }, 1600);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = EVO.$$('.field', form);
    const results = fields.map(check);
    if (results.includes(false)) {
      EVO.$('.field__input', fields[results.indexOf(false)]).focus();
      status.textContent = 'A couple of things are missing.';
      return;
    }
    button.classList.add('is-sent');
    button.disabled = true;
    throwShapes();
    status.textContent = 'Got it — thank you! (This prototype isn’t connected yet: reach us on Instagram or LinkedIn in the meantime.)';
    setTimeout(() => {
      form.reset();
      button.classList.remove('is-sent');
      button.disabled = false;
    }, 5000);
  });
}, 75);
