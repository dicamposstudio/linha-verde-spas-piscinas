(function () {
  const CONSENT_KEY = 'linha_verde_analytics_consent_v1';
  const GTM_ID = 'GTM-MWT6W358';
  const META_PIXEL_ID = '1427314554990921';
  const script = document.currentScript;
  const privacyPath = script?.dataset.privacy || 'privacidade/';
  let trackingLoaded = false;

  function loadTracking() {
    if (trackingLoaded) return;
    trackingLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js'
    });

    const gtm = document.createElement('script');
    gtm.async = true;
    gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(gtm);

    if (!window.fbq) {
      const fbq = function () {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = '2.0';
      window.fbq = fbq;
      window._fbq = fbq;

      const pixel = document.createElement('script');
      pixel.async = true;
      pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(pixel);
    }

    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
    window.dataLayer.push({ event: 'analytics_consent_granted' });
  }

  function addStyles() {
    if (document.getElementById('lv-consent-style')) return;
    const style = document.createElement('style');
    style.id = 'lv-consent-style';
    style.textContent = `
      .lv-consent{position:fixed;z-index:10000;left:18px;right:18px;bottom:18px;max-width:860px;margin:auto;padding:20px;border:1px solid rgba(255,255,255,.16);border-radius:20px;background:#082b25;color:#fff;box-shadow:0 22px 70px rgba(0,0,0,.32);font:500 15px/1.55 Inter,system-ui,sans-serif}
      .lv-consent[hidden]{display:none}.lv-consent__inner{display:flex;align-items:center;justify-content:space-between;gap:22px}.lv-consent p{margin:0;color:#dce9e4}.lv-consent strong{display:block;margin-bottom:4px;font-size:17px}.lv-consent a{color:#fff;text-decoration:underline;text-underline-offset:3px}.lv-consent__actions{display:flex;flex:0 0 auto;gap:10px}.lv-consent button{min-height:46px;padding:0 17px;border:1px solid rgba(255,255,255,.32);border-radius:999px;background:transparent;color:#fff;font:800 14px Inter,system-ui,sans-serif;cursor:pointer}.lv-consent button[data-consent-accept]{border-color:#fff;background:#fff;color:#082b25}.lv-consent button:focus-visible,.lv-consent a:focus-visible{outline:3px solid #f2c66d;outline-offset:3px}
      @media(max-width:720px){.lv-consent{left:10px;right:10px;bottom:10px;padding:17px}.lv-consent__inner{display:block}.lv-consent__actions{margin-top:16px;display:grid}.lv-consent button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function ensureBanner() {
    addStyles();
    let banner = document.querySelector('[data-lv-consent]');
    if (banner) return banner;

    banner = document.createElement('section');
    banner.className = 'lv-consent';
    banner.setAttribute('data-lv-consent', '');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Preferências de privacidade');
    banner.innerHTML = `
      <div class="lv-consent__inner">
        <p><strong>Sua privacidade importa</strong>Usamos métricas para entender o desempenho do site. Elas só serão ativadas com sua escolha. <a href="${privacyPath}">Saiba mais</a>.</p>
        <div class="lv-consent__actions">
          <button type="button" data-consent-reject>Continuar sem métricas</button>
          <button type="button" data-consent-accept>Aceitar métricas</button>
        </div>
      </div>`;
    document.body.appendChild(banner);

    banner.querySelector('[data-consent-accept]').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      banner.hidden = true;
      loadTracking();
    });
    banner.querySelector('[data-consent-reject]').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'rejected');
      banner.hidden = true;
    });
    return banner;
  }

  function openPreferences() {
    const banner = ensureBanner();
    banner.hidden = false;
    banner.querySelector('button')?.focus();
  }

  window.LinhaVerdeConsent = {
    open: openPreferences,
    reset() {
      localStorage.removeItem(CONSENT_KEY);
      openPreferences();
    }
  };

  const choice = localStorage.getItem(CONSENT_KEY);
  if (choice === 'accepted') loadTracking();
  if (!choice) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', openPreferences, { once: true });
    } else {
      openPreferences();
    }
  }
})();
