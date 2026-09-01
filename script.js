const header=document.querySelector('[data-header]');
const menu=document.querySelector('[data-menu]');
const menuToggle=document.querySelector('[data-menu-toggle]');
const year=document.querySelector('[data-year]');

const ATTRIBUTION_KEY='linha_verde_lead_source_v1';
const ATTRIBUTION_TTL=7*24*60*60*1000;

function detectLeadSource(){
  const params=new URLSearchParams(window.location.search);
  const source=(params.get('utm_source')||'').toLowerCase();
  const medium=(params.get('utm_medium')||'').toLowerCase();
  const paidGoogleMedium=['cpc','ppc','paid','paid_search'].includes(medium);
  return params.has('gclid')||(source==='google'&&paidGoogleMedium)?'google_ads':null;
}

function saveLeadSource(source){
  if(!source)return;
  try{
    localStorage.setItem(ATTRIBUTION_KEY,JSON.stringify({source,expiresAt:Date.now()+ATTRIBUTION_TTL}));
  }catch(error){
    sessionStorage.setItem(ATTRIBUTION_KEY,source);
  }
}

function readLeadSource(){
  const detected=detectLeadSource();
  if(detected){saveLeadSource(detected);return detected}
  try{
    const saved=JSON.parse(localStorage.getItem(ATTRIBUTION_KEY)||'null');
    if(saved?.source&&saved.expiresAt>Date.now())return saved.source;
    if(saved)localStorage.removeItem(ATTRIBUTION_KEY);
  }catch(error){
    localStorage.removeItem(ATTRIBUTION_KEY);
  }
  return sessionStorage.getItem(ATTRIBUTION_KEY);
}

function identifyGoogleAdsMessage(message){
  const fallback='Olá! Encontrei a Linha Verde por um anúncio no Google e gostaria de solicitar um orçamento.';
  const withoutOrigin=(message||fallback).replace(/\s*\[Origem:\s*Google Ads\]\s*$/i,'').trim();
  const identified=withoutOrigin.replace(/vim pelo site(?: da Linha Verde)?/i,'encontrei a Linha Verde por um anúncio no Google');
  return `${identified}\n\n[Origem: Google Ads]`;
}

const leadSource=readLeadSource();
if(leadSource==='google_ads'){
  document.querySelectorAll('a[href*="wa.me/"],a[href*="api.whatsapp.com/"]').forEach(link=>{
    const url=new URL(link.href,window.location.href);
    url.searchParams.set('text',identifyGoogleAdsMessage(url.searchParams.get('text')));
    link.href=url.toString();
    link.dataset.leadSource='google_ads';
  });
}

const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>18);
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});

menuToggle?.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  document.body.classList.toggle('menu-open',open);
});
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  menu.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');
}));

if(year)year.textContent=new Date().getFullYear();

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}});
},{threshold:.12,rootMargin:'0px 0px -35px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const dialog=document.querySelector('[data-lightbox-dialog]');
const dialogImage=document.querySelector('[data-lightbox-image]');
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{
  if(!dialog||!dialogImage)return;dialogImage.src=button.dataset.lightbox;dialogImage.alt=button.querySelector('img')?.alt||'Projeto ampliado';dialog.showModal();
}));
document.querySelector('[data-lightbox-close]')?.addEventListener('click',()=>dialog?.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

function track(name){
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:'site_interaction',interaction_name:name,lead_source:leadSource||'site'});
  if(typeof window.fbq==='function'&&name.startsWith('whatsapp'))window.fbq('trackCustom','WhatsAppClick',{placement:name,lead_source:leadSource||'site'});
}
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>track(el.dataset.track)));
