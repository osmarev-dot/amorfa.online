
(function(){
  const tracks = [
    {title:'Fusão Nuclear', album:'I / SUPERFÍCIE', cover:'album-1.webp'},
    {title:'Hematoma', album:'II / CORPO', cover:'album-2.webp'},
    {title:'Toque Fantasma', album:'III / AUSÊNCIA', cover:'album-3.webp'},
    {title:'Fantasmogênese', album:'IV / FANTASMA', cover:'album-4.webp'},
    {title:'O Arranjo do Submundo', album:'V / SUBMUNDO', cover:'album-5.webp'}
  ];
  function initDailySignal(){
    const box=document.getElementById('dailySignal'); if(!box) return;
    const index=Math.floor(Date.now()/86400000)%tracks.length;
    const t=tracks[index];
    const img=box.querySelector('.signal-cover');
    box.querySelector('.signal-title').textContent=t.title;
    box.querySelector('.signal-album').textContent=t.album;
    if(img){ img.src=t.cover; img.alt='Capa — '+t.title; }
  }
  function initTabs(){
    const tabs=[...document.querySelectorAll('.tab[data-filter]')]; if(!tabs.length) return;
    const posts=[...document.querySelectorAll('[data-post-type]')];
    tabs.forEach(btn=>btn.addEventListener('click',()=>{
      tabs.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const f=btn.dataset.filter;
      posts.forEach(p=>{p.hidden = !(f==='all' || p.dataset.postType===f);});
    }));
  }
  document.addEventListener('DOMContentLoaded',()=>{initDailySignal(); initTabs();});
})();
