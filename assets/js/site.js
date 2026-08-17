(()=>{
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const syncHeader=()=>{
    if(!header)return;
    header.classList.toggle('scrolled',window.scrollY>18);
  };
  syncHeader();
  window.addEventListener('scroll',syncHeader,{passive:true});

  if(menu&&header){
    const closeMenu=()=>{
      header.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
      document.documentElement.classList.remove('nav-open');
    };
    menu.addEventListener('click',()=>{
      const open=!header.classList.contains('open');
      header.classList.toggle('open',open);
      menu.setAttribute('aria-expanded',open?'true':'false');
      document.documentElement.classList.toggle('nav-open',open);
    });
    document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  }

  const revealEls=[...document.querySelectorAll('.reveal,.reveal-stagger,.img-reveal')];
  if(reduce||!('IntersectionObserver' in window)){
    document.body.classList.add('is-loaded');
    revealEls.forEach(el=>el.classList.add('is-visible'));
    return;
  }

  requestAnimationFrame(()=>document.body.classList.add('is-loaded'));
  const io=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  },{threshold:.1,rootMargin:'0px 0px -5% 0px'});
  revealEls.forEach(el=>io.observe(el));
})();
