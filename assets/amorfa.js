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

        const imageSizes = ['frag-wide', 'frag-tall', 'frag-small', 'frag-large', 'frag-square'];
        const quoteSizes = ['frag-quote-small', 'frag-quote-wide', 'frag-quote-tall'];

        const cards = [];
        items.forEach((item, index) => {
          const texto = item.texto || '';
          const img = normalizeAsset(item.imagem);
          const modo = String(item.modo || (img ? 'imagem' : 'texto')).toLowerCase();
          const alt = item.imagemAlt || texto || item.id || 'Fragmento AMORFA';

          // Regra pública: ou é imagem, ou é frase. Nunca legenda + imagem no mesmo card.
          if (modo === 'texto' || !img) {
            if (texto) {
              const size = quoteSizes[index % quoteSizes.length];
              cards.push(`<article class="fragment-item fragment-quote ${size}"><blockquote>${nl2br(texto)}</blockquote></article>`);
            }
            return;
          }

          const size = imageSizes[index % imageSizes.length];
          cards.push(`<a class="fragment-item fragment-image ${size}" href="${escapeHTML(img)}" target="_blank" rel="noopener" aria-label="Abrir fragmento visual"><img src="${escapeHTML(img)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async"></a>`);
        });

        if (!cards.length) {
          mount.innerHTML = '<p class="cms-empty">Nenhum fragmento publicado.</p>';
          return;
        }

        const lanes = [[], [], []];
        cards.forEach((card, index) => lanes[index % lanes.length].push(card));
        mount.innerHTML = `<div class="fragment-drift">${lanes.map((lane, index) => {
          const laneCards = lane.length ? lane : cards;
          const repeated = [...laneCards, ...laneCards, ...laneCards].join('');
          return `<div class="fragment-lane lane-${index + 1}" aria-hidden="${index > 0 ? 'true' : 'false'}"><div class="fragment-track">${repeated}</div></div>`;
        }).join('')}</div>`;
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
