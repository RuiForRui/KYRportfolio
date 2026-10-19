const header=document.querySelector('header'),host=document.getElementById('hero-video'),motionButton=document.getElementById('motion-toggle');
function setHeader(){header.classList.toggle('scrolled',window.scrollY>40)}window.addEventListener('scroll',setHeader,{passive:true});setHeader();
const backgroundVideo=document.createElement('video');
backgroundVideo.src='assets/safety-film.mp4';backgroundVideo.muted=true;backgroundVideo.loop=true;backgroundVideo.playsInline=true;backgroundVideo.preload='none';backgroundVideo.poster='assets/safety-poster.jpg';backgroundVideo.setAttribute('aria-hidden','true');backgroundVideo.tabIndex=-1;host.append(backgroundVideo);
function updateMotion(){const playing=!backgroundVideo.paused;motionButton.textContent=playing?'배경 영상 정지':'배경 영상 재생';motionButton.setAttribute('aria-pressed',String(playing))}
backgroundVideo.addEventListener('play',updateMotion);backgroundVideo.addEventListener('pause',updateMotion);
function startBackground(){backgroundVideo.play().catch(updateMotion)}
motionButton.onclick=()=>backgroundVideo.paused?startBackground():backgroundVideo.pause();
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)startBackground();
let resumeBackground=false;
document.getElementById('safety-watch').onclick=()=>{
 resumeBackground=!backgroundVideo.paused;backgroundVideo.pause();
 detail.innerHTML='<div class="detail-heading"><div><span class="micro">AI / MOTION GRAPHICS / 2026</span><h2 id="detail-title">안녕하냥안녕하쥐</h2><p class="small">인화성가스 안전영상</p></div></div><video class="video" controls playsinline preload="metadata" poster="assets/safety-poster.jpg"><source src="assets/safety-film.mp4" type="video/mp4"></video>';
 modal.showModal();modal.scrollTop=0;document.body.style.overflow='hidden';detail.querySelector('video').play().catch(()=>{});
};
modal.addEventListener('close',()=>{if(resumeBackground){resumeBackground=false;startBackground()}});
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.center-title,.skills-grid article,.planning-heading,.experience article').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
