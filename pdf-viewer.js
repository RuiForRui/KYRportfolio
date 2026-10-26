const campaignPDFs={9:{count:40,root:'assets/gana/',title:'가나마나? 일단 가!',width:1800,height:1350},13:{count:2,root:'assets/blood-donation/',title:'헌혈 공모전',images:['wave.png','warmth.png'],labels:['파도','따뜻함 형']},14:{count:24,root:'assets/amulet/',title:'삼성화재와 아뮬렛츠고'},15:{count:23,root:'assets/photo-campaign/',title:'나의 사진을 공유'}};
let campaignPageCount=24,campaignRoot='assets/amulet/',campaignTitle='삼성화재와 아뮬렛츠고';
let activeCampaign=null;
const campaignImage=n=>campaignRoot+(activeCampaign?.images?activeCampaign.images[n-1]:'page-'+String(n).padStart(2,'0')+'.jpg');
const slideDialog=document.createElement('dialog');slideDialog.id='slide-viewer';slideDialog.setAttribute('aria-label','기획서 확대 보기');slideDialog.innerHTML='<div class="slide-toolbar"><button id="slide-prev" aria-label="이전 페이지">← 이전</button><span id="slide-count" aria-live="polite"></span><button id="slide-next" aria-label="다음 페이지">다음 →</button><button id="slide-size" aria-pressed="false">원본 크기 확대</button><button id="slide-close">닫기 ×</button></div><div class="slide-stage"><img id="slide-image" alt=""></div>';document.body.append(slideDialog);
let currentSlide=1;
function openCampaignSlide(n){currentSlide=Math.max(1,Math.min(campaignPageCount,n));const img=slideDialog.querySelector('#slide-image');img.src=campaignImage(currentSlide);slideDialog.setAttribute('aria-label',activeCampaign?.images?'포스터 확대 보기':'기획서 확대 보기');img.alt=activeCampaign?.images?campaignTitle+' — '+activeCampaign.labels[currentSlide-1]:campaignTitle+' 기획서 '+currentSlide+'페이지';slideDialog.querySelector('#slide-count').textContent=currentSlide+' / '+campaignPageCount;slideDialog.querySelector('#slide-prev').disabled=currentSlide===1;slideDialog.querySelector('#slide-next').disabled=currentSlide===campaignPageCount;slideDialog.querySelector('.slide-stage').scrollTo(0,0);if(!slideDialog.open)slideDialog.showModal()}
slideDialog.querySelector('#slide-prev').onclick=()=>openCampaignSlide(currentSlide-1);slideDialog.querySelector('#slide-next').onclick=()=>openCampaignSlide(currentSlide+1);slideDialog.querySelector('#slide-close').onclick=()=>slideDialog.close();
slideDialog.querySelector('#slide-size').onclick=e=>{const large=slideDialog.classList.toggle('original-size');e.target.setAttribute('aria-pressed',String(large));e.target.textContent=large?'화면에 맞추기':'원본 크기 확대'};
slideDialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();openCampaignSlide(currentSlide+1)}if(e.key==='ArrowLeft'){e.preventDefault();openCampaignSlide(currentSlide-1)}});

const documentDialog=document.createElement('dialog');
documentDialog.id='document-viewer';
documentDialog.setAttribute('aria-labelledby','document-title');
document.body.append(documentDialog);
function openCampaignDocument(index){
 const config=campaignPDFs[index];
 activeCampaign=config;campaignPageCount=config.count;campaignRoot=config.root;campaignTitle=config.title;
 slideDialog.classList.remove('original-size');
 slideDialog.querySelector('#slide-size').setAttribute('aria-pressed','false');
 slideDialog.querySelector('#slide-size').textContent='원본 크기 확대';
 documentDialog.innerHTML='<div class="document-top"><div><span class="micro">'+(config.images?'POSTERS':'CAMPAIGN')+' / '+config.count+' '+(config.images?'WORKS':'PAGES')+'</span><h2 id="document-title">'+config.title+'</h2></div><div class="document-actions">'+(config.images?'':'<a href="'+config.root+'campaign.pdf" download="'+config.title+'.pdf">PDF 다운로드 ↓</a>')+'<button id="document-close" aria-label="기획서 닫기">닫기 ×</button></div></div><div class="document-pages'+(config.images?' poster-pages':'')+'">'+Array.from({length:config.count},(_,i)=>'<button class="campaign-page" data-slide="'+(i+1)+'" aria-label="'+(i+1)+'페이지 확대"><img src="'+campaignImage(i+1)+'" alt="'+(config.images?config.title+' — '+config.labels[i]:config.title+' 기획서 '+(i+1)+'페이지')+'" loading="'+(i===0?'eager':'lazy')+'" width="'+(config.width||2000)+'" height="'+(config.height||1125)+'"></button>').join('')+'</div>';
 documentDialog.querySelector('#document-close').onclick=()=>documentDialog.close();
 documentDialog.showModal();documentDialog.scrollTop=0;document.body.style.overflow='hidden';
}
documentDialog.addEventListener('click',e=>{const page=e.target.closest('[data-slide]');if(page)openCampaignSlide(+page.dataset.slide)});
documentDialog.addEventListener('close',()=>{documentDialog.innerHTML='';document.body.style.overflow=''});
