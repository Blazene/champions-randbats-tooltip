(() => {
  'use strict';
  const DB = window.CHAMPIONS_SETS || {};
  const norm = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const keys = Object.keys(DB);
  const marker = 'champions-sets-inline';
  let pending = false;

  // A tooltip is built by Showdown itself; we only append to it.
  function tooltipNodes() {
    return document.querySelectorAll('#tooltipwrapper .tooltip, .tooltipwrapper .tooltip, .tooltip');
  }
  function speciesFromTooltip(tooltip) {
    // The first heading is Showdown's displayed species, not the nickname or move list.
    const heading = tooltip.querySelector('h2, h3');
    if (!heading) return null;
    const copy = heading.cloneNode(true);
    copy.querySelectorAll('small, .gender, .level, .type, img').forEach(el => el.remove());
    let name = copy.textContent.trim().replace(/\s+(?:Level|Lv\.?|L)\s*\d+.*$/i, '').trim();
    // Strip optional parenthesized gender, but preserve forme names.
    name = name.replace(/\s+[♂♀]\s*$/, '');
    const id = norm(name);
    if (DB[id]) return id;
    // Showdown can display "Charizard-Mega-X" or "Mega Charizard X".
    const alt = norm(name.replace(/^mega\s+/i, '') + (name.match(/^mega\s+\S+\s+(x|y)$/i)?.[1] ? 'mega' + RegExp.$1 : ''));
    return DB[alt] ? alt : null;
  }
  function tag(name, className, text) {
    const element = document.createElement(name);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function build(key) {
    const record = DB[key];
    const section = tag('div', marker);
    section.dataset.championsSpecies = key;
    for (const set of record.sets || []) {
      const role = tag('section', 'champions-role');
      role.append(tag('h4', '', set.role || 'Set'));
      if (set.abilities?.length) role.append(tag('p', '', 'Abilities: ' + set.abilities.join(', ')));
      role.append(tag('p', 'champions-moves', 'Moves: ' + (set.movepool || []).join(', ')));
      section.append(role);
    }
    section.append(tag('p', 'champions-note', 'Role-specific move pools; exact four-move combinations are not specified.'));
    return section;
  }
  // Keep the complete Showdown tooltip on screen after its height changes.
  // Translate the wrapper rather than changing Showdown's positioning logic.
  function keepInViewport(tooltip) {
    const wrapper = tooltip.closest('#tooltipwrapper, .tooltipwrapper') || tooltip;
    wrapper.style.transform = '';
    const rect = tooltip.getBoundingClientRect();
    const margin = 10;
    let dx = 0, dy = 0;
    if (rect.right > innerWidth - margin) dx = innerWidth - margin - rect.right;
    if (rect.left + dx < margin) dx += margin - (rect.left + dx);
    if (rect.bottom > innerHeight - margin) dy = innerHeight - margin - rect.bottom;
    if (rect.top + dy < margin) dy += margin - (rect.top + dy);
    if (dx || dy) wrapper.style.transform = `translate(${Math.round(dx)}px, ${Math.round(dy)}px)`;
  }
  function sync() {
    pending = false;
    for (const tooltip of tooltipNodes()) {
      // Don't affect hidden or unrelated tooltip types.
      const key = speciesFromTooltip(tooltip);
      const old = tooltip.querySelector('.' + marker);
      if (!key) { old?.remove(); continue; }
      if (old?.dataset.championsSpecies === key) { keepInViewport(tooltip); continue; }
      old?.remove();
      tooltip.append(build(key));
      keepInViewport(tooltip);
    }
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(sync);
  }
  const observer = new MutationObserver(mutations => {
    if (mutations.every(m => m.target.closest?.('.' + marker))) return;
    schedule();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  window.addEventListener('resize', schedule, {passive: true});
  schedule();
})();
