
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
  const tabs=document.querySelectorAll('[data-filter]');
  const posts=document.querySelectorAll('[data-post-type]');
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active')); tab.classList.add('active');
    const f=tab.dataset.filter;
    posts.forEach(p=>{ p.style.display=(f==='todos'||p.dataset.postType===f)?'block':'none'; });
  }));
  document.querySelectorAll('details.post-item').forEach(d=>{
    d.addEventListener('toggle',()=>{
      if(d.open){ document.querySelectorAll('details.post-item').forEach(o=>{ if(o!==d) o.open=false; }); }
    });
  });
})();


(function(){
  const tracks=[
    {title:'Fusão Nuclear',album:'I / SUPERFÍCIE',cover:'album-1.webp',url:'ouvir.html'},
    {title:'Hematoma',album:'II / CORPO',cover:'album-2.webp',url:'ouvir.html'},
    {title:'Toque Fantasma',album:'III / AUSÊNCIA',cover:'album-3.webp',url:'ouvir.html'},
    {title:'Fantasmogênese',album:'IV / FANTASMA',cover:'album-4.webp',url:'ouvir.html'},
    {title:'O Arranjo do Submundo',album:'V / SUBMUNDO',cover:'album-5.webp',url:'ouvir.html'}
  ];
  const box=document.querySelector('.side-daily');
  if(!box) return;
  const t=tracks[Math.floor(Date.now()/86400000)%tracks.length];
  const img=box.querySelector('.daily-cover');
  const title=box.querySelector('.daily-title');
  const album=box.querySelector('.daily-album');
  const link=box.querySelector('.daily-link');
  if(img){img.src=t.cover;img.alt='Capa — '+t.title;}
  if(title) title.textContent=t.title;
  if(album) album.textContent=t.album;
  if(link) link.href=t.url;
})();
