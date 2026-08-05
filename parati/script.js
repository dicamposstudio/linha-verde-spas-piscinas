const WHATSAPP_OFICIAL = '5571999997043';
const MENSAGEM_PADRAO = 'Olá! Gostaria de conhecer a Piscina Parati.';

function prepararWhatsApp() {
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const url = new URL(link.href);
    const texto = url.searchParams.get('text') || MENSAGEM_PADRAO;
    link.href = `https://wa.me/${WHATSAPP_OFICIAL}?text=${encodeURIComponent(texto)}`;
    link.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'site_interaction', action: 'whatsapp_parati' });
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'WhatsAppClick', { placement: 'parati' });
      }
    });
  });
}

function iniciarAnimacoes() {
  const elementos = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elementos.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  prepararWhatsApp();
  iniciarAnimacoes();
});
