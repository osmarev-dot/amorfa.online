
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

$('.menu-toggle')?.addEventListener('click', () => document.body.classList.toggle('menu-open'));

async function loadJSON(path, fallback){
  try{
    const res = await fetch(path, {cache:'no-store'});
    if(!res.ok) return fallback;
    return await res.json();
  }catch(e){ return fallback; }
}
function list(data){
  if(Array.isArray(data)) return data;
  if(data && Array.isArray(data.items)) return data.items;
  if(data && Array.isArray(data.posts)) return data.posts;
  return [];
}
function esc(str=''){
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function assetPath(src='', folder='fragmentos'){
  if(!src) return '';
  if(src.startsWith('http') || src.startsWith('/') || src.startsWith('assets/')) return src.replace(/^\//,'');
  return `assets/uploads/${folder}/${src}`;
}

async function renderFragments(){
  const view = $('#fragment-view');
  if(!view) return;
  const data = await loadJSON('fragmentos.json', {items:[]});
  const items = list(data).filter(x => (x.texto || x.conteudo || '').trim() || (x.imagem || x.image || '').trim()).slice(0, 16);
  if(!items.length) return;

  let current = 0;
  let paused = false;
  let timer = null;

  view.innerHTML = items.map((item, index) => {
    const text = esc(item.texto || item.conteudo || 'fragmento visual');
    const img = assetPath(item.imagem || item.image || '', 'fragmentos');
    const tone = esc(item.tom || 'fragmento');
    const date = esc(item.data || '');
    return `<article class="fragment-card ${index===0 ? 'active' : ''}">
      ${img ? `<img src="${img}" alt="${text}">` : `<img src="assets/img/site/marionete_1.png" alt="AMORFA">`}
      <div class="fragment-text">
        <span>${tone}</span>
        <blockquote>${text}</blockquote>
        <p>${date}</p>
      </div>
    </article>`;
  }).join('');

  const cards = $$('.fragment-card', view);
  function show(n){
    current = (n + cards.length) % cards.length;
    cards.forEach((card, i) => card.classList.toggle('active', i === current));
  }
  function start(){
    clearInterval(timer);
    if(!paused && cards.length > 1) timer = setInterval(() => show(current + 1), 4300);
  }
  $('#frag-next')?.addEventListener('click', () => { show(current + 1); start(); });
  $('#frag-prev')?.addEventListener('click', () => { show(current - 1); start(); });
  $('#frag-pause')?.addEventListener('click', e => {
    paused = !paused;
    e.currentTarget.textContent = paused ? 'retomar' : 'pausar';
    paused ? clearInterval(timer) : start();
  });
  start();
}

async function renderTransmissions(){
  const root = $('#transmission-list');
  if(!root) return;
  const data = await loadJSON('transmissoes.json', {posts:[]});
  const posts = list(data).slice(0, 6);
  if(!posts.length) return;

  root.innerHTML = posts.map((post, i) => {
    const text = (post.conteudo || post.texto || '').trim();
    const excerpt = text.length > 150 ? text.slice(0, 150).trim() + '…' : text;
    return `<article class="transmission-card" data-index="${i}">
      <p class="eyebrow">${esc(post.data || '')}</p>
      <h3>${esc(post.titulo || 'Transmissão')}</h3>
      <p>${esc(excerpt)}</p>
    </article>`;
  }).join('');

  const modal = $('#modal');
  $('#modal-close')?.addEventListener('click', () => modal.classList.remove('open'));
  modal?.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('open'); });

  $$('.transmission-card', root).forEach(card => {
    card.addEventListener('click', () => {
      const p = posts[Number(card.dataset.index)];
      $('#modal-date').textContent = p.data || '';
      $('#modal-title').textContent = p.titulo || 'Transmissão';
      $('#modal-text').textContent = p.conteudo || p.texto || '';
      modal.classList.add('open');
    });
  });
}
renderFragments();
renderTransmissions();
