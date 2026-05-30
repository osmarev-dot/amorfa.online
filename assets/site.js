(function () {
  /* ── menu mobile ── */
  const menuButton = document.querySelector("[data-menu-toggle]");
  const navLinks   = document.querySelector("[data-nav-links]");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "X" : "Menu";
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "Menu";
      });
    });
  }

  /* ── helpers ── */
  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const normalizeId = (value) => String(value ?? "").replace(/\s+/g, "");
  const albumUrl    = "https://open.spotify.com/album/1nZDDHw5kjsS11Rg1Y5dBJ";

  const loadJson = (url) =>
    fetch(url).then((r) => {
      if (!r.ok) throw new Error(`Falha ao carregar ${url}`);
      return r.json();
    });

  /* ── discografia ── */
  const renderReleaseCard = (album) => {
    const live  = /dispon/i.test(album.status || "");
    const color = Boolean(album.color);
    return `
      <article class="release-card${live ? " is-live" : ""}${color ? " is-color" : ""}">
        <img src="${escapeHtml(album.image)}" alt="Capa de ${escapeHtml(album.title)}" loading="lazy">
        <div class="release-body">
          <div class="meta-row">
            <span class="pill${live ? " live" : ""}">${escapeHtml(album.type)}</span>
            <span class="pill">${escapeHtml(album.date)}</span>
          </div>
          <h3 class="release-title">${escapeHtml(album.title)}</h3>
          <p>${escapeHtml(album.concept)}</p>
        </div>
      </article>`;
  };

  const renderAlbumDetail = (album) => {
    const live   = /dispon/i.test(album.status || "");
    const color  = Boolean(album.color);
    const tracks = Array.isArray(album.tracks) ? album.tracks : [];
    const listenButton = live
      ? `<a class="btn primary" href="${albumUrl}" target="_blank" rel="noopener">Ouvir álbum I</a>`
      : "";
    return `
      <article class="album-detail${color ? " is-color" : ""}" id="${escapeHtml(album.id)}">
        <img src="${escapeHtml(album.image)}" alt="Capa de ${escapeHtml(album.title)}" loading="lazy">
        <div class="album-detail-body">
          <div class="meta-row">
            <span class="pill${live ? " live" : ""}">${escapeHtml(album.type)}</span>
            <span class="pill">${escapeHtml(album.date)}</span>
            <span class="pill">${escapeHtml(album.status)}</span>
          </div>
          <h2>${escapeHtml(album.title)}</h2>
          <p class="concept">"${escapeHtml(album.concept)}"</p>
          <p class="summary">${escapeHtml(album.summary)}</p>
          <div class="action-row">${listenButton}</div>
          <details>
            <summary>Faixas</summary>
            <ol class="track-list">
              ${tracks.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
            </ol>
          </details>
        </div>
      </article>`;
  };

  const releaseRail = document.querySelector("[data-release-rail]");
  const albumList   = document.querySelector("[data-album-list]");

  if (releaseRail || albumList) {
    loadJson("data.json")
      .then((data) => {
        const albums = Array.isArray(data.albums) ? data.albums : [];
        if (releaseRail) releaseRail.innerHTML = albums.map(renderReleaseCard).join("");
        if (albumList)   albumList.innerHTML   = albums.map(renderAlbumDetail).join("");
      })
      .catch(() => {
        const msg = '<p class="empty">Não foi possível carregar o catálogo.</p>';
        if (releaseRail) releaseRail.innerHTML = msg;
        if (albumList)   albumList.innerHTML   = msg;
      });
  }

  /* ── transmissões ── */

  /* card compacto — usado no preview da home (3 posts) */
  const postCard = (post) => {
    const title = post.titulo || post.id || "Transmissão";
    const type  = post.tipo || "transmissao";
    const track = post.faixa
      ? `<span class="post-track">${escapeHtml(post.faixa)}</span>`
      : "";
    return `
      <article class="post-card" data-post-type="${escapeHtml(type)}">
        <small>${escapeHtml(normalizeId(post.id))} / ${escapeHtml(type)}</small>
        <h3>${escapeHtml(title)}</h3>
        <p class="post-content">${escapeHtml(post.conteudo)}</p>
        ${track}
      </article>`;
  };

  /* ── feed de transmissões ── */

  const FEED_COPY = {
    transmissao: {
      kicker:      "transmissões públicas",
      title:       "Voz direta da AMORFA",
      description: "Registros diretos, anúncios e falas públicas da AMORFA.",
      label:       "TRANSMISSÃO",
    },
    fragmento: {
      kicker:      "fragmentos",
      title:       "Cortes do arquivo vivo",
      description: "Restos líricos, imagens verbais e sinais soltos.",
      label:       "FRAGMENTO",
    },
  };

  function normalizeTipo(tipo) {
    const v = String(tipo || "").toLowerCase();
    if (v.includes("fragmento") || v.includes("poema") || v.includes("verso") || v.includes("sinal")) return "fragmento";
    return "transmissao";
  }

  function sortPosts(posts) {
    return [...posts].sort((a, b) => {
      const dA = new Date(a.data || a.date || 0).getTime();
      const dB = new Date(b.data || b.date || 0).getTime();
      return dA !== dB ? dB - dA : String(b.id || "").localeCompare(String(a.id || ""));
    });
  }

  function renderImage(post) {
    if (!post.imagem) return "";
    const fmt = post.imagemFormato || "horizontal";
    const alt = escapeHtml(post.imagemAlt || post.titulo || "Imagem da transmissão AMORFA");
    return `<figure class="transmission-media is-${fmt}"><img src="${escapeHtml(post.imagem)}" alt="${alt}" loading="lazy"></figure>`;
  }

  function renderPost(post, index, type) {
    const metaId  = post.id ? `${escapeHtml(post.id)} · ` : "";
    const title   = escapeHtml(post.titulo || "Registro sem título");
    const content = escapeHtml(post.conteudo || "");
    const open    = index === 0 ? " open" : "";
    const feat    = index === 0 ? " featured" : "";
    return `
      <details class="transmission-item${feat}"${open}>
        <summary>
          <span class="post-meta">${metaId}${FEED_COPY[type].label}</span>
          <strong>${title}</strong>
        </summary>
        <div class="post-body">
          ${renderImage(post)}
          <div class="post-text">${content}</div>
        </div>
      </details>`;
  }

  function renderFeed(allPosts, type) {
    const copy    = FEED_COPY[type];
    const kicker  = document.getElementById("feed-kicker");
    const titleEl = document.getElementById("feed-title");
    const descEl  = document.getElementById("feed-description");
    const latest  = document.getElementById("latest-post");
    const archive = document.getElementById("archive-posts");

    if (kicker)  kicker.textContent  = copy.kicker;
    if (titleEl) titleEl.textContent = copy.title;
    if (descEl)  descEl.textContent  = copy.description;

    document.querySelectorAll(".tab-button").forEach((b) => b.classList.toggle("active", b.dataset.type === type));

    const posts = sortPosts(allPosts.filter((p) => normalizeTipo(p.tipo) === type));

    if (latest)  latest.innerHTML  = posts[0] ? renderPost(posts[0], 0, type) : '<p class="empty">Nenhum registro publicado.</p>';
    if (archive) archive.innerHTML = posts.slice(1).length ? posts.slice(1).map((p, i) => renderPost(p, i + 1, type)).join("") : "";
  }

  function setupFeedTabs(allPosts) {
    const initial = location.hash === "#fragmentos" ? "fragmento" : "transmissao";
    renderFeed(allPosts, initial);
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.addEventListener("click", () => renderFeed(allPosts, btn.dataset.type));
    });
  }

  const postPreview = document.querySelector("[data-post-preview]");
  const hasFeed     = document.getElementById("latest-post");

  if (postPreview || hasFeed) {
    loadJson("transmissoes.json")
      .then((data) => {
        const posts = Array.isArray(data.posts) ? data.posts : [];
        if (postPreview) {
          postPreview.innerHTML = posts.slice(0, 3).map(postCard).join("") ||
            '<p class="empty">Nenhuma transmissão ainda.</p>';
        }
        if (hasFeed) setupFeedTabs(posts);
      })
      .catch(() => {
        const msg = '<p class="empty">Não foi possível carregar as transmissões.</p>';
        if (postPreview) postPreview.innerHTML = msg;
        if (hasFeed)     hasFeed.innerHTML     = msg;
      });
  }

  /* ── estratos ── */
  const estratoFeed = document.querySelector("[data-estrato-feed]");
  if (estratoFeed) {
    loadJson("estratos.json")
      .then((data) => {
        const posts = Array.isArray(data.posts) ? data.posts : [];
        estratoFeed.innerHTML = posts.map((post) => `
          <article class="post-card">
            <small>${escapeHtml(post.id)} / estrato ${escapeHtml(post.estrato)}</small>
            <h3>${escapeHtml(post.titulo || "Sem título")}</h3>
            <p class="post-content">${escapeHtml(post.conteudo)}</p>
          </article>`).join("");
      })
      .catch(() => {
        estratoFeed.innerHTML = '<p class="empty">Não foi possível carregar os estratos.</p>';
      });
  }

})();
