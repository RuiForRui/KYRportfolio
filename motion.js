const header=document.querySelector('header'),host=document.getElementById('hero-video'),motionButton=document.getElementById('motion-toggle');
function setHeader(){header.classList.toggle('scrolled',window.scrollY>40)}window.addEventListener('scroll',setHeader,{passive:true});setHeader();
const backgroundVideo=document.createElement('video');
backgroundVideo.src='assets/safety-film.mp4';backgroundVideo.muted=true;backgroundVideo.loop=true;backgroundVideo.playsInline=true;backgroundVideo.preload='none';backgroundVideo.poster='assets/safety-poster.jpg';backgroundVideo.setAttribute('aria-hidden','true');backgroundVideo.tabIndex=-1;host.append(backgroundVideo);
function updateMotion(){const playing=!backgroundVideo.paused;motionButton.textContent=playing?'배경 영상 정지':'배경 영상 재생';motionButton.setAttribute('aria-pressed',String(playing))}
backgroundVideo.addEventListener('play',updateMotion);backgroundVideo.addEventListener('pause',updateMotion);
function startBackground(){backgroundVideo.play().catch(updateMotion)}
motionButton.onclick=()=>backgroundVideo.paused?startBackground():backgroundVideo.pause();
updateMotion();
let resumeBackground=false;
function openSafetyFilm(){
 resumeBackground=!backgroundVideo.paused;backgroundVideo.pause();
 detail.innerHTML='<div class="detail-heading"><div><span class="micro">AI / MOTION GRAPHICS / 2026</span><h2 id="detail-title">고용노동부 AI안전영상</h2><p class="small">안녕하냥? 안녕하쥐! · 인화성가스 안전영상</p></div></div><video class="video" controls playsinline preload="metadata" poster="assets/safety-poster.jpg"><source src="assets/safety-film.mp4" type="video/mp4"></video><div class="detail-meta"><div><span class="micro">MY ROLE</span><p>1차 편집</p></div><div><span class="micro">TOOLS</span><p>After Effects</p></div></div><p class="detail-copy">목적: 산업 현장 근로자에게 인화성 가스 취급 등 안전 수칙을 캐릭터 「안녕하냥 안녕하쥐」로 쉽고 친근하게 전달<br>역할: 필름레시피 편집부원으로 1차 편집 (컷 구성, 핵심 자막, 화면비별 모션그래픽)<br>과정: 가로 25편의 컷 흐름과 핵심 자막을 먼저 완성한 뒤 세로 화면비 변형과 모션 디테일 보강<br>결과: 가로·세로 총 50편 기한 내 전량 납품 (2026.09–11)</p>';
 modal.showModal();modal.scrollTop=0;document.body.style.overflow='hidden';detail.querySelector('video').play().catch(()=>{});
};
document.getElementById('safety-watch').onclick=openSafetyFilm;
document.addEventListener('click',event=>{if(event.target.closest('[data-safety]'))openSafetyFilm()});
modal.addEventListener('close',()=>{if(resumeBackground){resumeBackground=false;startBackground()}});
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.center-title,.skills-grid article,.planning-heading,.experience article').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
