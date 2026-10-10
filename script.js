const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav-links');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); document.body.classList.remove('menu-open'); }
toggle.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); document.body.classList.toggle('menu-open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();


// Contato via AJAX: mantém a navegação na própria landing page.
const contactForm = document.querySelector('.contact-form');
const contactFeedback = document.getElementById('form-feedback');
if (contactForm && contactFeedback) {
  const sendButton = contactForm.querySelector('button[type="submit"]');
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    contactFeedback.hidden = true;
    contactFeedback.className = 'form-feedback';
    sendButton.disabled = true;
    sendButton.setAttribute('aria-busy', 'true');
    sendButton.textContent = 'Enviando...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json().catch(() => ({}));
      const accepted = response.ok && (result.success === true || result.success === 'true');
      if (!accepted) throw new Error(result.message || 'O serviço não confirmou o envio.');

      contactFeedback.classList.add('is-success');
      contactFeedback.textContent = 'Mensagem recebida pelo serviço! Obrigada pelo contato. Nossa equipe responderá por e-mail.';
      contactForm.reset();
    } catch (error) {
      contactFeedback.classList.add('is-error');
      contactFeedback.textContent = 'Não foi possível confirmar o envio. Tente novamente ou escreva para lumen.astra7@gmail.com.';
      console.error('Falha no formulário de contato:', error);
    } finally {
      contactFeedback.hidden = false;
      sendButton.disabled = false;
      sendButton.removeAttribute('aria-busy');
      sendButton.innerHTML = 'Enviar mensagem <span aria-hidden="true">↗</span>';
    }
  });
}
