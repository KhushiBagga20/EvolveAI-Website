/* ==========================================================================
   contact.js — client-side validation + a success state.
   PROTOTYPE: nothing is sent anywhere yet. Wire the submit handler to a
   form service (e.g. Formspree, Google Forms, a serverless function) later.
   ========================================================================== */
EVO.register('contact', () => {
  const form = EVO.$('[data-form]');
  if (!form) return;
  const status = EVO.$('[data-form-status]', form);
  const label = EVO.$('.form__submit .btn__label', form);
  const fields = EVO.$$('.field', form);

  const validate = (field) => {
    const input = field.querySelector('.field__input');
    const ok = input.value.trim() !== '' && input.checkValidity();
    field.classList.toggle('is-invalid', !ok);
    return ok;
  };

  fields.forEach((field) => {
    field.querySelector('.field__input').addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validate(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = fields.filter((f) => !validate(f));
    if (invalid.length) {
      status.textContent = 'A couple of fields need you.';
      invalid[0].querySelector('.field__input').focus();
      return;
    }
    const first = form.elements.name.value.trim().split(/\s+/)[0];
    form.classList.add('is-sent');
    label.textContent = 'Message sent';
    status.textContent = `Thanks, ${first} — we'll be in touch. (Prototype: not connected to an inbox yet.)`;
    form.reset();
    setTimeout(() => {
      form.classList.remove('is-sent');
      label.textContent = 'Send message';
    }, 5000);
  });
}, 80);
