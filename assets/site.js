
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let glitchLock=false;
function pulseGlitch(){if(glitchLock)return;glitchLock=true;document.body.classList.add('is-glitch');setTimeout(()=>document.body.classList.remove('is-glitch'),210);setTimeout(()=>glitchLock=false,520)}
document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,.release-card,.transmission-card'))pulseGlitch()});
document.addEventListener('click',e=>{if(e.target.closest('a,button,.release-card,.transmission-card'))pulseGlitch()});
async function loadJSON(path,fallback=[]){try{const r=await fetch(path,{cache:'no-store'});if(!r.ok)return fallback;return await r.json()}catch(e){return fallback}}
function list(data){if(Array.isArray(data))return data;if(data&&Array.isArray(data.posts))return data.posts;if(data&&Array.isArray(data.items))return data.items;return[]}
function escapeHTML(str=''){return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
async function renderTransmissions(){
 const root=$('#transmission-list'); if(!root)return;
 let data=await loadJSON('transmissoes.json',null); if(!data)data=await loadJSON('assets/data/transmissoes.json',[]);
 const posts=list(data); if(!posts.length)return;
 root.className='transmission-list';
 root.innerHTML=posts.map((p,i)=>{const text=(p.conteudo||p.texto||'').trim();const excerpt=text.length>150?text.slice(0,150).trim()+'…':text;return `<article class="transmission-card" data-index="${i}"><span>${escapeHTML(p.data||'')}</span><h3>${escapeHTML(p.titulo||'Transmissão')}</h3><p>${escapeHTML(excerpt)}</p></article>`}).join('');
 const modal=$('#modal'); const close=$('.modal-close'); if(close)close.addEventListener('click',()=>modal.classList.remove('open')); if(modal)modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 $$('.transmission-card',root).forEach(card=>card.addEventListener('click',()=>{const p=posts[Number(card.dataset.index)];$('#modal-date').textContent=p.data||'';$('#modal-title').textContent=p.titulo||'Transmissão';$('#modal-text').textContent=p.conteudo||p.texto||'';modal.classList.add('open');pulseGlitch()}));
}
renderTransmissions();

async function renderFragments(){
 const carousel=$('#fragment-carousel'), track=$('#fragment-track'); if(!carousel||!track)return;
 const data=await loadJSON('fragmentos.json',null); const items=list(data).filter(item=>((item.texto||item.conteudo||'').trim()||(item.imagem||item.image||'').trim()));
 if(!items.length)return;
 let current=0, paused=false, timer=null;
 const imgPath=src=>!src?'':(src.startsWith('http')||src.startsWith('/')||src.startsWith('assets/')?src.replace(/^\//,''):`assets/uploads/fragmentos/${src}`);
 function slideHTML(item,i){
   const text=escapeHTML(item.texto||item.conteudo||''), img=imgPath(item.imagem||item.image||''), alt=escapeHTML(item.imagemAlt||item.alt||item.texto||'Fragmento AMORFA'), date=escapeHTML(item.data||''), tone=escapeHTML(item.tom||'fragmento');
   const imageHTML=img?`<div class="fragment-image"><img src="${img}" alt="${alt}"></div>`:`<div class="fragment-image empty-fragment-image" aria-hidden="true"></div>`;
   const textHTML=text?`<blockquote>${text}</blockquote>`:`<blockquote>fragmento visual</blockquote>`;
   return `<article class="fragment-slide ${i===0?'active':''}" aria-hidden="${i===0?'false':'true'}">${imageHTML}<div class="fragment-text"><span class="eyebrow">${tone}</span>${textHTML}<p>${date}</p></div></article>`;
 }
 track.innerHTML=items.map(slideHTML).join('')+`<div class="fragment-dots" aria-label="Selecionar fragmento">${items.map((_,i)=>`<button type="button" data-slide="${i}" class="${i===0?'active':''}" aria-label="Fragmento ${i+1}"></button>`).join('')}</div>`;
 const slides=$$('.fragment-slide',track), dots=$$('.fragment-dots button',track);
 function show(n){current=(n+slides.length)%slides.length;slides.forEach((s,i)=>{s.classList.toggle('active',i===current);s.setAttribute('aria-hidden',i===current?'false':'true')});dots.forEach((d,i)=>d.classList.toggle('active',i===current));pulseGlitch()}
 function next(){show(current+1)} function prev(){show(current-1)} function start(){clearInterval(timer); if(!paused&&items.length>1)timer=setInterval(next,5200)} function stop(){clearInterval(timer)}
 $('#fragment-next')?.addEventListener('click',()=>{next();start()}); $('#fragment-prev')?.addEventListener('click',()=>{prev();start()}); $('#fragment-pause')?.addEventListener('click',e=>{paused=!paused;e.target.textContent=paused?'retomar':'pausar';paused?stop():start()}); dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.slide));start()}));
 carousel.addEventListener('mouseenter',stop); carousel.addEventListener('mouseleave',start); carousel.addEventListener('focusin',stop); carousel.addEventListener('focusout',start); start();
}
renderFragments();
