const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  })
},{threshold:.16});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const glow=document.querySelector('.cursor-glow');
window.addEventListener('mousemove',e=>{
  glow.style.transform=`translate(${e.clientX-210}px,${e.clientY-210}px)`;
});
