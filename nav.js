/* Shared top nav for all AIP-C01 pages. Each page keeps an empty <nav></nav>
   placeholder and includes this script right after it — edit links only here. */
(() => {
  const LINKS = [
    { href: 'index.html', icon: 'i-list', label: 'Trắc nghiệm' },
    { href: 'theory.html', icon: 'i-book', label: 'Lý thuyết' },
    { href: 'aws_aip_c01_summary.html', icon: 'i-clipboard', label: 'Case Study' },
    { href: 'tips.html', icon: 'i-target', label: 'Kinh nghiệm thi' },
    { href: 'gap-terms.html', icon: 'i-gap', label: 'Gap Terms' },
    { href: 'full-glossary.html', icon: 'i-grid', label: 'Full Glossary' },
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  const linksHTML = LINKS.map(l =>
    `<a class="navlink${l.href === current ? ' active' : ''}" href="${l.href}"><svg class="icon"><use href="#${l.icon}"/></svg>${l.label}</a>`
  ).join('');

  const brandHTML = `<a href="index.html" class="nav-brand">
    <span class="nav-logo"><svg class="icon"><use href="#i-spark"/></svg></span>
    <span class="nav-title"><b>AIP-C01</b><span>AWS GenAI Developer Pro</span></span>
  </a>`;

  document.querySelectorAll('nav[data-nav]').forEach(nav => {
    nav.insertAdjacentHTML('afterbegin', brandHTML + `<div class="nav-links">${linksHTML}</div>`);
  });
})();
