document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', String(open));
});
