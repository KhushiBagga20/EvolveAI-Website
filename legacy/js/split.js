/* ==========================================================================
   split.js — EVO.split(el) wraps each word of an element in a mask
   (<span class="w"><span>word</span></span>) and numbers it (--wi), so
   words can move one after another. Inline elements such as <em> are
   kept. Screen readers still read the text normally.
   [data-split] titles are split on load and rise word by word.
   ========================================================================== */
(function () {
  'use strict';

  const splitInto = (source, counter) => {
    const frag = document.createDocumentFragment();
    source.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const mask = document.createElement('span');
          const word = document.createElement('span');
          mask.className = 'w';
          mask.style.setProperty('--wi', counter.i++);
          word.textContent = part;
          mask.appendChild(word);
          frag.appendChild(mask);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const shell = node.cloneNode(false);
        shell.appendChild(splitInto(node, counter));
        frag.appendChild(shell);
      }
    });
    return frag;
  };

  EVO.split = (el) => {
    if (el.dataset.splitDone) return;
    const frag = splitInto(el, { i: 0 });
    el.textContent = '';
    el.appendChild(frag);
    el.dataset.splitDone = '1';
  };

  EVO.register('split', () => {
    EVO.$$('[data-split]').forEach((el) => {
      EVO.split(el);
      el.classList.add('split');
    });
  }, 1);
})();
