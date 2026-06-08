
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
