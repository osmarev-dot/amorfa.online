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

  /* accordion completo — usado na página transmissoes.html */
  const renderTransmissionDetails = (post, isFirst) => {
    const fmt     = escapeHtml(post.imagemFormato || "horizontal");
    const altText = escapeHtml(post.imagemAlt || post.titulo || "Imagem da transmissão AMORFA");
    const imageHtml = post.imagem
      ? `<figure class="transmission-media is-${fmt}">
           <img src="${escapeHtml(post.imagem)}" alt="${altText}" loading="lazy">
         </figure>`
      : "";
    const faixaHtml = post.faixa
      ? `<p class="transmission-track">↳ ${escapeHtml(post.faixa)}</p>`
      : "";
    return `
      <details class="transmission-item"${isFirst ? " open" : ""}>
        <summary class="transmission-summary">
          <span class="transmission-id">${escapeHtml(post.id || "")}</span>
          <strong class="transmission-title">${escapeHtml(post.titulo || "Sem título")}</strong>
          <span class="transmission-arrow" aria-hidden="true">↓</span>
        </summary>
        <div class="transmission-body">
          ${imageHtml}
          <div class="transmission-text">${escapeHtml(post.conteudo || "")}</div>
          ${faixaHtml}
        </div>
      </details>`;
  };

  const postPreview = document.querySelector("[data-post-preview]");
  const feed        = document.querySelector("[data-feed]");
  const tabBtns     = document.querySelectorAll("[data-tab]");
  const tabDesc     = document.getElementById("tab-desc");

  const TAB_DESC = {
    transmissao: "Voz direta, anúncios, sinais públicos e registros da AMORFA.",
    fragmento:   "Cortes curtos, restos líricos e imagens verbais.",
  };

  let allPosts   = [];
  let activeTab  = "transmissao";

  function renderFeed(tipo) {
    if (!feed) return;
    const items = allPosts.filter((p) => p.tipo === tipo);
    feed.innerHTML = items.length
      ? items.map((p, i) => renderTransmissionDetails(p, i === 0)).join("")
      : `<p class="empty">Nenhum registro ainda.</p>`;
    if (tabDesc) tabDesc.textContent = TAB_DESC[tipo] || "";
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      activeTab = btn.dataset.tab;
      renderFeed(activeTab);
    });
  });

  if (postPreview || feed) {
    loadJson("transmissoes.json")
      .then((data) => {
        allPosts = Array.isArray(data.posts) ? data.posts : [];
        if (postPreview) {
          postPreview.innerHTML = allPosts.slice(0, 3).map(postCard).join("") ||
            '<p class="empty">Nenhuma transmissão ainda.</p>';
        }
        if (feed) renderFeed(activeTab);
      })
      .catch(() => {
        const msg = '<p class="empty">Não foi possível carregar as transmissões.</p>';
        if (postPreview) postPreview.innerHTML = msg;
        if (feed)        feed.innerHTML        = msg;
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
