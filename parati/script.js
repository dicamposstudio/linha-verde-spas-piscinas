// Linha Verde - Landing Page Parati
const WHATSAPP_OFICIAL = '5571999997043';
const MENSAGEM_PADRAO = 'Olá! Gostaria de saber mais informações sobre a promoção da Piscina Paraty';

function atualizarLinksWhatsApp() {
  const links = document.querySelectorAll('[data-whatsapp]');

  links.forEach((link) => {
    const url = new URL(link.href);
    const texto = url.searchParams.get('text') || MENSAGEM_PADRAO;

    link.href = `https://wa.me/${WHATSAPP_OFICIAL}?text=${encodeURIComponent(texto)}`;

    link.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_whatsapp',
        campaign: 'piscina_parati_gerador_cloro'
      });

      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Clique WhatsApp - Piscina Parati',
          content_category: 'Landing Page Parati'
        });

        window.fbq('track', 'Contact', {
          content_name: 'Contato WhatsApp - Piscina Parati'
        });
      }

      if (window.gtag) {
        window.gtag('event', 'click_whatsapp', {
          campaign_name: 'piscina_parati_gerador_cloro'
        });
      }
    });
  });
}

function iniciarAnimacoes() {
  const elementos = document.querySelectorAll('.reveal');

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

function rastrearScroll() {
  const marcos = [25, 50, 75, 100];
  const enviados = new Set();

  window.addEventListener('scroll', () => {
    const altura = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = Math.round((window.scrollY / altura) * 100);

    marcos.forEach((marco) => {
      if (progresso >= marco && !enviados.has(marco)) {
        enviados.add(marco);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'scroll_depth', percent: marco });
      }
    });
  }, { passive: true });
}

function gerenciarPromocaoTemporaria() {
  const dataFinalPromocao = new Date('2026-06-30T23:59:59-03:00');
  const agora = new Date();
  const promocaoAtiva = agora <= dataFinalPromocao;

  document.body.classList.toggle('promo-active', promocaoAtiva);
  document.body.classList.toggle('promo-ended', !promocaoAtiva);

  document.querySelectorAll('[data-promo-text][data-default-text]').forEach((el) => {
    el.textContent = promocaoAtiva ? el.dataset.promoText : el.dataset.defaultText;
  });

  const diasEl = document.getElementById('dias');
  if (diasEl && promocaoAtiva) {
    const diff = dataFinalPromocao - agora;
    const dias = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    diasEl.textContent = dias;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  gerenciarPromocaoTemporaria();
  atualizarLinksWhatsApp();
  iniciarAnimacoes();
  rastrearScroll();
});