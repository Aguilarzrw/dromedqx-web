(function(){
var H=document.querySelector('header.h'),B=document.querySelector('.burger'),N=document.querySelector('nav.m');
addEventListener('scroll',function(){H&&H.classList.toggle('s',scrollY>30)},{passive:true});
if(B)B.addEventListener('click',function(){var o=N.classList.toggle('o');B.setAttribute('aria-expanded',o)});
if(N)N.addEventListener('click',function(e){if(e.target.tagName==='A'){N.classList.remove('o');B.setAttribute('aria-expanded',false)}});
/* images: direct -> weserv proxy -> branded gradient */
document.querySelectorAll('.ph[data-k]').forEach(function(p){
 var u=window.IMG&&IMG[p.dataset.k];if(!u)return;
 var i=new Image();i.alt=p.dataset.alt||'';i.decoding='async';var t=0;
 i.onload=function(){p.classList.add('ok')};
 i.onerror=function(){if(t++===0)i.src='https://images.weserv.nl/?w=900&q=80&url='+encodeURIComponent(u);else i.remove()};
 i.src=u;p.appendChild(i);
});
/* reveals */
var els=document.querySelectorAll('.in');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('v')});
/* count-up */
document.querySelectorAll('[data-n]').forEach(function(e){
 var n=+e.dataset.n,s=e.dataset.s||'',done=0;
 var go=function(){if(done)return;done=1;var t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/1300);e.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0)};
 if('IntersectionObserver' in window)new IntersectionObserver(function(es,o){if(es[0].isIntersecting){go();o.disconnect()}}).observe(e);else go();
});
/* contact -> WhatsApp */
var F=document.getElementById('cf');
if(F)F.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(F);
 var m='Hola DromedQX, soy '+d.get('n')+' ('+d.get('e')+'). Tipo de consulta: '+d.get('t')+'. '+d.get('m');
 open('https://wa.me/584243089393?text='+encodeURIComponent(m),'_blank','noopener')});
})();
