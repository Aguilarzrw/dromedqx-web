(function(){
"use strict";
var header=document.querySelector("header.h");
var burger=document.querySelector(".burger");
var nav=document.querySelector("nav.m");

if(header){
  var updateHeader=function(){header.classList.toggle("s",window.scrollY>30)};
  updateHeader();
  window.addEventListener("scroll",updateHeader,{passive:true});
}
if(burger&&nav){
  burger.addEventListener("click",function(){
    var opened=nav.classList.toggle("o");
    burger.setAttribute("aria-expanded",String(opened));
    burger.setAttribute("aria-label",opened?"Cerrar menú":"Abrir menú");
  });
  nav.addEventListener("click",function(event){
    if(event.target.closest("a")){
      nav.classList.remove("o");
      burger.setAttribute("aria-expanded","false");
      burger.setAttribute("aria-label","Abrir menú");
    }
  });
  document.addEventListener("keydown",function(event){
    if(event.key==="Escape"&&nav.classList.contains("o")){
      nav.classList.remove("o");
      burger.setAttribute("aria-expanded","false");
      burger.setAttribute("aria-label","Abrir menú");
      burger.focus();
    }
  });
}

/* Carrusel de novedades: control manual, swipe nativo y foco accesible. */
document.querySelectorAll("[data-carousel]").forEach(function(button){
  var track=document.getElementById(button.getAttribute("data-carousel"));
  if(!track)return;
  button.addEventListener("click",function(){
    var card=track.querySelector("article");
    var gap=parseFloat(getComputedStyle(track).gap)||0;
    var step=card?card.getBoundingClientRect().width+gap:track.clientWidth*.8;
    track.scrollBy({left:step*Number(button.getAttribute("data-direction")||1),behavior:reducedMotion?"auto":"smooth"});
  });
});

/* Inclinación 3D muy ligera solo con puntero preciso; nunca en pantallas táctiles. */
var canTilt=window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches;
var motionOff=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(canTilt&&!motionOff){
  document.querySelectorAll(".hero .mosaic>.ph").forEach(function(card){
    card.addEventListener("pointermove",function(event){
      var rect=card.getBoundingClientRect();
      var x=(event.clientX-rect.left)/rect.width-.5;
      var y=(event.clientY-rect.top)/rect.height-.5;
      card.style.transform="perspective(900px) rotateX("+(-y*5).toFixed(2)+"deg) rotateY("+(x*6).toFixed(2)+"deg) translateY(-2px)";
    });
    card.addEventListener("pointerleave",function(){card.style.transform=""});
  });
}

/* Animaciones progresivas: el contenido permanece visible si no hay soporte. */
var revealItems=document.querySelectorAll(".in");
if("IntersectionObserver" in window){
  var revealObserver=new IntersectionObserver(function(entries,observer){
    entries.forEach(function(entry){
      if(entry.isIntersecting){entry.target.classList.add("v");observer.unobserve(entry.target)}
    });
  },{threshold:.12});
  revealItems.forEach(function(item){revealObserver.observe(item)});
}else{
  revealItems.forEach(function(item){item.classList.add("v")});
}

/* Contadores: respetan la preferencia de movimiento reducido. */
var reducedMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-n]").forEach(function(element){
  var target=Number(element.dataset.n)||0;
  var suffix=element.dataset.s||"";
  var started=false;
  function finish(){element.textContent=target+suffix}
  function animate(){
    if(started)return;
    started=true;
    if(reducedMotion||!("requestAnimationFrame" in window)){finish();return}
    var start=performance.now();
    function frame(now){
      var progress=Math.min(1,(now-start)/1100);
      var eased=1-Math.pow(1-progress,3);
      element.textContent=Math.round(target*eased)+suffix;
      if(progress<1)requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if("IntersectionObserver" in window){
    var counterObserver=new IntersectionObserver(function(entries,observer){
      if(entries[0].isIntersecting){animate();observer.disconnect()}
    });
    counterObserver.observe(element);
  }else animate();
});

/* Contacto: prepara el mensaje para que la persona lo revise antes de enviarlo. */
var contactForm=document.getElementById("cf");
if(contactForm){
  contactForm.addEventListener("submit",function(event){
    event.preventDefault();
    if(!contactForm.reportValidity())return;
    var data=new FormData(contactForm);
    var message="Hola DromedQX, soy "+data.get("n")+" ("+data.get("e")+"). Tipo de consulta: "+data.get("t")+". "+data.get("m");
    var url="https://wa.me/584243089393?text="+encodeURIComponent(message);
    var opened=window.open(url,"_blank","noopener,noreferrer");
    if(!opened)window.location.href=url;
  });
}
})();