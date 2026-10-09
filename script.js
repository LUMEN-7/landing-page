const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav-links');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); document.body.classList.remove('menu-open'); }
toggle.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); document.body.classList.toggle('menu-open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
