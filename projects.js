const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const modal=$('#modal'),detail=$('#detail');let projects=[],filter='all';
const tags=v=>{try{return JSON.parse(v||'[]').join(' · ')}catch{return v||''}};
function videoId(url){if(!url)return '';const u=new URL(url);return u.hostname==='youtu.be'?u.pathname.slice(1):u.pathname.startsWith('/shorts/')?u.pathname.split('/')[2]:u.searchParams.get('v')||''}
const names={7:'유튜브 숏폼 콘텐츠',8:'밤이되었습니다. 모작',0:'단편영화 향수',2:'단편영화 바보',5:'선문대학교 축제 모션그래픽',6:'진라면 AI 가상 광고',9:'가나마나? 일단 가!',10:'빼빼로 숏폼광고 3종',20:'영화영상학과 교수 인터뷰',14:'삼성화재와 아뮬렛츠고!',15:'나의 ‘사진’을 공유'};
const groups=[{items:[10,11,12],tabs:['YouTube','Instagram Reels','TikTok'],label:'빼빼로 영상 버전',heading:10,sub:'플랫폼별 3종 제작',copy:'팀 프로젝트로 하나의 브랜드를 유튜브·인스타그램·틱톡에 맞춰 기획하고, Sora 2와 Veo 2로 생성해 편집한 AI 숏폼 광고입니다. 각 버전을 선택해 확인할 수 있습니다.'},{items:[20,19,18],tabs:['김은 교수님편','김정희 교수님편','박준혁 교수님편'],label:'교수 인터뷰 편',heading:20,sub:'인터뷰 3편 제작',copy:'선문대학교 영화영상학과 교수님 세 분을 인터뷰한 영상입니다. 각 편을 선택해 확인할 수 있습니다.'}];
function title(p){return names[p.i]||p['작업명']}
function thumbnail(p){return '<div class="visual" data-label="'+esc(title(p))+'"><img loading="lazy" src="https://i.ytimg.com/vi/'+p.id+'/hqdefault.jpg" alt="'+esc(title(p))+' 영상 썸네일"><span class="watch" aria-hidden="true">▶</span></div>'}
function openProject(i){if(!projects[i])return;if(campaignPDFs[i]){openCampaignDocument(i);return}if(projects[i].local==='safety'&&typeof openSafetyFilm==='function'){openSafetyFilm();return}const p=projects[i],group=groups.find(g=>g.items.includes(i));const heading=group?names[group.heading]:title(p);detail.innerHTML='<div class="detail-heading"><div><span class="micro">'+esc(p['유형'])+' / '+esc(p['연도'])+'</span><h2 id="detail-title">'+esc(heading)+'</h2></div><span class="small">'+(group?group.sub:'')+'</span></div>'+(group?'<div class="variants" role="group" aria-label="'+group.label+'">'+group.items.map((n,k)=>'<button data-variant="'+n+'" class="'+(i===n?'active':'')+'" aria-pressed="'+(i===n)+'">'+group.tabs[k]+'</button>').join('')+'</div>':'')+(p.id?'<iframe class="video" src="https://www.youtube-nocookie.com/embed/'+p.id+'" title="'+esc(p['작업명'])+'" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>':'<div class="document-note">'+esc(p['한줄 요약'].replaceAll('\\',''))+'<br><span class="small">원문 자료는 아직 연결되지 않았습니다.</span></div>')+'<div class="detail-meta"><div><span class="micro">MY ROLE</span><p>'+esc(tags(p['역할'])||'세부 역할 확인 중')+'</p></div>'+(tags(p['툴'])?'<div><span class="micro">TOOLS</span><p>'+esc(tags(p['툴']))+'</p></div>':'')+'</div>'+(group?'<p class="detail-copy">'+group.copy+'</p>':p.id&&p['한줄 요약']?'<p class="detail-copy">'+esc(p['한줄 요약'].replaceAll('\\',''))+'</p>':'')+'<div class="detail-links">'+(p.id?'<a href="'+esc(p['링크'])+'" target="_blank" rel="noopener">YouTube에서 보기 ↗</a>':'')+'</div>';if(!modal.open)modal.showModal();document.body.style.overflow='hidden';modal.scrollTop=0}
function render(rows){projects=rows.map((p,i)=>({...p,i,id:videoId(p['링크']),category:(p['역할']?.includes('모션그래픽')||p['작업명']?.includes('모션그래픽'))?'motion':p['유형']==='영상'?'film':'planning'}));
const selected=['safety',10,5,16];const labels=['AI · 모션그래픽 / 안전하냥?안전하쥐!','AI 숏폼 광고 / YouTube · Reels · TikTok','모션그래픽 / After Effects','KOSAC 영상콘텐츠챌린지 / 기획 · 편집'];
$('#selected-grid').innerHTML=selected.map((n,k)=>{
 const safety=n==='safety',p=safety?null:projects[n],name=safety?'고용노동부 AI안전영상':title(p);
 const visual=safety?'<div class="visual"><img loading="lazy" id="safety-card-poster" src="assets/safety-poster.jpg" alt="안전하냥?안전하쥐! 11초 장면"><span class="watch" aria-hidden="true">&#9654;</span></div>':thumbnail(p);
 return '<button class="project" '+(safety?'data-safety="true"':'data-project="'+n+'"')+' aria-label="'+esc(name)+' 상세 보기">'+visual+'<div class="caption"><div><h3>'+esc(name)+'</h3><p>'+labels[k]+'</p></div><span>0'+(k+1)+'</span></div></button>';
}).join('');
$('#planning-list').innerHTML=[14,15].map((n,k)=>'<button data-project="'+n+'">'+'<span class="num">0'+(k+1)+'</span><span><strong>'+esc(title(projects[n]))+'</strong><small>'+(['KOSAC / IMC 캠페인 기획','KOSAC / IMC 캠페인 기획','광고기획서 분석 및 재기획'][k])+'</small></span><span class="arrow" aria-hidden="true">↗</span></button>').join('');
const archiveProjects=projects.filter(p=>![9,11,12,13,18,19].includes(p.i));
$('#archive .count').textContent=archiveProjects.length;
$('#archive-list').innerHTML=archiveProjects.sort((a,b)=>b['연도']-a['연도']).map((p,k)=>{
 const cover=campaignPDFs[p.i]?.root+(p.i===14?'page-10.jpg':'page-01.jpg');
 const image=p.local==='safety'?'assets/safety-poster.jpg':p.id?'https://i.ytimg.com/vi/'+p.id+'/hqdefault.jpg':campaignPDFs[p.i]?cover:'';
 return '<button class="archive-row archive-card" data-project="'+p.i+'" data-category="'+p.category+'"><span class="archive-cover'+(campaignPDFs[p.i]?' document-cover':'')+'">'+(image?'<img loading="lazy" src="'+esc(image)+'" alt="'+esc(title(p))+'">':'<span class="archive-placeholder">'+esc(title(p))+'</span>')+'<span class="archive-open" aria-hidden="true">'+(p.id||p.local?'PLAY &#8599;':'VIEW &#8599;')+'</span></span><span class="archive-caption"><span class="archive-number">'+String(k+1).padStart(2,'0')+'</span><strong>'+esc(title(p))+'</strong><span class="archive-meta">'+esc(p['유형'])+' / '+esc(p['연도'])+'</span></span></button>';
}).join('');
updateSafetyPoster();
$('#archive-list').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const fallback=document.createElement('span');fallback.className='archive-placeholder';fallback.textContent=img.alt;img.replaceWith(fallback)}));
$('#selected-grid').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.parentElement.classList.add('image-fallback');img.remove()}));}
fetch('projects.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(render).catch(()=>{$('#selected-grid').innerHTML='<p>작업을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.</p>'});
document.addEventListener('click',e=>{const p=e.target.closest('[data-project]');if(p)openProject(+p.dataset.project);const v=e.target.closest('[data-variant]');if(v){openProject(+v.dataset.variant);detail.querySelector('[data-variant="'+v.dataset.variant+'"]').focus()}});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});document.querySelectorAll('.archive-row').forEach(r=>r.hidden=filter!=='all'&&r.dataset.category!==filter)});
$('#close').onclick=()=>modal.close();modal.addEventListener('close',()=>{detail.innerHTML='';document.body.style.overflow=''});modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});

let safetyPosterPromise;
function updateSafetyPoster(){
 if(!safetyPosterPromise){
  safetyPosterPromise=new Promise(resolve=>{
   const video=document.createElement('video');
   video.muted=true;video.playsInline=true;video.preload='auto';
   const timer=setTimeout(()=>finish(null),20000);
   let done=false;
   function finish(url){if(done)return;done=true;clearTimeout(timer);video.removeAttribute('src');video.load();resolve(url);}
   video.addEventListener('loadedmetadata',()=>{video.currentTime=Math.min(11,Math.max(0,video.duration-.05));},{once:true});
   video.addEventListener('seeked',()=>{
    try{
     const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;
     canvas.getContext('2d').drawImage(video,0,0);finish(canvas.toDataURL('image/jpeg',.9));
    }catch(_){finish(null)}
   },{once:true});
   video.addEventListener('error',()=>finish(null),{once:true});
   video.src='assets/safety-film.mp4';
  });
 }
 safetyPosterPromise.then(url=>{const img=document.getElementById('safety-card-poster');if(url&&img)img.src=url;});
}
