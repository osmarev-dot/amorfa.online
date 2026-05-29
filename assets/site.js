(function () {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

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

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const normalizeId = (value) => String(value ?? "").replace(/\s+/g, "");
  const albumUrl = "https://open.spotify.com/album/1nZDDHw5kjsS11Rg1Y5dBJ";

  const renderReleaseCard = (album) => {
    const live = /dispon/i.test(album.status || "");
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
      </article>
    `;
  };

  const renderAlbumDetail = (album) => {
    const live = /dispon/i.test(album.status || "");
    const color = Boolean(album.color);
    const tracks = Array.isArray(album.tracks) ? album.tracks : [];
    const listenButton = live
      ? `<a class="btn primary" href="${albumUrl}" target="_blank" rel="noopener">Ouvir album I</a>`
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
              ${tracks.map((track) => `<li>${escapeHtml(track)}</li>`).join("")}
            </ol>
          </details>
        </div>
      </article>
    `;
  };

  const loadJson = (url) => fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Falha ao carregar ${url}`);
    return response.json();
  });

  const releaseRail = document.querySelector("[data-release-rail]");
  const albumList = document.querySelector("[data-album-list]");

  if (releaseRail || albumList) {
    loadJson("data.json")
      .then((data) => {
        const albums = Array.isArray(data.albums) ? data.albums : [];
        if (releaseRail) {
          releaseRail.innerHTML = albums.map(renderReleaseCard).join("");
        }
        if (albumList) {
          albumList.innerHTML = albums.map(renderAlbumDetail).join("");
        }
      })
      .catch(() => {
        const message = '<p class="empty">Nao foi possivel carregar o catalogo.</p>';
        if (releaseRail) releaseRail.innerHTML = message;
        if (albumList) albumList.innerHTML = message;
      });
  }

  const postPreview = document.querySelector("[data-post-preview]");
  const postFeed = document.querySelector("[data-post-feed]");
  const filters = document.querySelectorAll("[data-filter]");

  const postCard = (post) => {
    const title = post.titulo || post.id || "Transmissao";
    const type = post.tipo || "sinal";
    const track = post.faixa ? `<span class="post-track">${escapeHtml(post.faixa)}</span>` : "";
    return `
      <article class="post-card" data-post-type="${escapeHtml(type)}">
        <small>${escapeHtml(normalizeId(post.id))} / ${escapeHtml(type)}</small>
        <h3>${escapeHtml(title)}</h3>
        <p class="post-content">${escapeHtml(post.conteudo)}</p>
        ${track}
      </article>
    `;
  };

  const setFilter = (type) => {
    const normalized = type || "todos";
    filters.forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === normalized);
    });

    document.querySelectorAll("[data-post-type]").forEach((card) => {
      const show = normalized === "todos" || card.dataset.postType === normalized;
      card.hidden = !show;
    });
  };

  if (postPreview || postFeed) {
    loadJson("transmissoes.json")
      .then((data) => {
        const posts = Array.isArray(data.posts) ? data.posts : [];
        if (postPreview) {
          postPreview.innerHTML = posts.slice(0, 3).map(postCard).join("");
        }
        if (postFeed) {
          postFeed.innerHTML = posts.map(postCard).join("");
          const params = new URLSearchParams(window.location.search);
          setFilter(params.get("tipo") || "todos");
        }
      })
      .catch(() => {
        const message = '<p class="empty">Nao foi possivel carregar as transmissoes.</p>';
        if (postPreview) postPreview.innerHTML = message;
        if (postFeed) postFeed.innerHTML = message;
      });
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });

  const estratoFeed = document.querySelector("[data-estrato-feed]");
  if (estratoFeed) {
    loadJson("estratos.json")
      .then((data) => {
        const posts = Array.isArray(data.posts) ? data.posts : [];
        estratoFeed.innerHTML = posts.map((post) => `
          <article class="post-card">
            <small>${escapeHtml(post.id)} / estrato ${escapeHtml(post.estrato)}</small>
            <h3>${escapeHtml(post.titulo || "Sem titulo")}</h3>
            <p class="post-content">${escapeHtml(post.conteudo)}</p>
          </article>
        `).join("");
      })
      .catch(() => {
        estratoFeed.innerHTML = '<p class="empty">Nao foi possivel carregar os estratos.</p>';
      });
  }
})();
