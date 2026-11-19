(() => {
 const list=document.getElementById('archive-list');
 const prev=document.getElementById('archive-prev');
 const next=document.getElementById('archive-next');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function update(){prev.disabled=list.scrollLeft<=1;next.disabled=list.scrollLeft+list.clientWidth>=list.scrollWidth-2;}
 function move(direction){
  const card=list.querySelector('.archive-card:not([hidden])');if(!card)return;
  const step=card.getBoundingClientRect().width+parseFloat(getComputedStyle(list).gap||0);
  list.scrollBy({left:direction*step,behavior:reduced.matches?'instant':'smooth'});
 }
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 list.addEventListener('scroll',update,{passive:true});
 new ResizeObserver(update).observe(list);
 new MutationObserver(update).observe(list,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{list.scrollTo({left:0,behavior:'instant'});requestAnimationFrame(update)}));
 list.addEventListener('focusin',event=>{if(event.target.matches('.archive-card')){event.target.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});update()}});
 update();
})();
