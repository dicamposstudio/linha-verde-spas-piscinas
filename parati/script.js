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