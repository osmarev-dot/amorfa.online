document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', String(open));
});


// HERMES V4.7 — Fragmentos/Transmissões agora usam JSON como fonte do CMS.
const AMORFA = (() => {
  const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[ch]));

  const normalizeAsset = (path = '') => String(path || '').trim();
  const nl2br = (value = '') => escapeHTML(value).replace(/\n/g, '<br>');

  async function loadJSON(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
    return response.json();
  }

  function renderFragmentos() {
    const mount = document.querySelector('[data-fragmentos-list]');
    if (!mount) return;
    loadJSON('fragmentos.json')
      .then((data) => {
        const items = Array.isArray(data.items) ? data.items : [];
        if (!items.length) {
          mount.innerHTML = '<p class="cms-empty">Nenhum fragmento publicado.</p>';
          return;
        }
        mount.innerHTML = items.map((item) => {
          const texto = item.texto || '';
          const img = normalizeAsset(item.imagem);
          const alt = texto || item.id || 'Fragmento AMORFA';
          return `<article class="fragment-card tone-${escapeHTML(item.tom || 'neutro')} size-${escapeHTML(item.tamanho || 'medio')} mode-${escapeHTML(item.modo || 'imagem')}">
            ${img ? `<a class="fragment-media" href="${escapeHTML(img)}" target="_blank" rel="noopener" aria-label="Abrir imagem original de ${escapeHTML(item.id || 'fragmento')}"><img src="${escapeHTML(img)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async"></a>` : ''}
            <p class="state-label">${escapeHTML(item.id || '')}${item.tom ? ` · ${escapeHTML(item.tom)}` : ''}</p>
            ${texto ? `<blockquote>${nl2br(texto)}</blockquote>` : ''}
          </article>`;
        }).join('');
      })
      .catch(() => {
        mount.innerHTML = '<p class="cms-empty">Não foi possível carregar os fragmentos.</p>';
      });
  }

  function renderTransmissoes() {
    const mount = document.querySelector('[data-transmissoes-list]');
    if (!mount) return;
    loadJSON('transmissoes.json')
      .then((data) => {
        const posts = Array.isArray(data.posts) ? data.posts : [];
        if (!posts.length) {
          mount.innerHTML = '<p class="cms-empty">Nenhuma transmissão publicada.</p>';
          return;
        }
        mount.innerHTML = posts.map((post) => {
          const img = normalizeAsset(post.imagem);
          const imgAlt = post.imagemAlt || post.titulo || 'Transmissão AMORFA';
          const player = post.playerUrl ? `<p class="inline-actions"><a href="${escapeHTML(post.playerUrl)}" target="_blank" rel="noopener">Abrir link</a></p>` : '';
          return `<article class="transmission-card image-${escapeHTML(post.imagemFormato || 'horizontal')} image-${escapeHTML(post.imagemTamanho || 'media')}">
            <p class="state-label">${escapeHTML(post.data || '')}${post.tipo ? ` · ${escapeHTML(post.tipo)}` : ''}</p>
            <h3>${escapeHTML(post.titulo || 'Transmissão')}</h3>
            ${img ? `<img class="transmission-image" src="${escapeHTML(img)}" alt="${escapeHTML(imgAlt)}" loading="lazy" decoding="async">` : ''}
            ${post.imagemLegenda ? `<p class="image-caption">${escapeHTML(post.imagemLegenda)}</p>` : ''}
            <p>${nl2br(post.conteudo || '')}</p>
            ${post.faixa ? `<p class="state-label">Faixa: ${escapeHTML(post.faixa)}</p>` : ''}
            ${player}
          </article>`;
        }).join('');
      })
      .catch(() => {
        mount.innerHTML = '<p class="cms-empty">Não foi possível carregar as transmissões.</p>';
      });
  }

  return { renderFragmentos, renderTransmissoes };
})();

AMORFA.renderFragmentos();
AMORFA.renderTransmissoes();
