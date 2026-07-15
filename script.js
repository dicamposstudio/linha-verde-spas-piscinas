const header=document.querySelector('[data-header]');
const menu=document.querySelector('[data-menu]');
const menuToggle=document.querySelector('[data-menu-toggle]');
const year=document.querySelector('[data-year]');

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
  window.dataLayer.push({event:'site_interaction',interaction_name:name});
  if(typeof window.fbq==='function'&&name.startsWith('whatsapp'))window.fbq('trackCustom','WhatsAppClick',{placement:name});
}
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>track(el.dataset.track)));
