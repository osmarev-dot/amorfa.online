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
  const artistUrl   = "https://open.spotify.com/artist/6hbGT8M54r38uokc9q09ys";

  const dailyTracks = [
    { title: "Fusão Nuclear", album: "I / SUPERFÍCIE", cover: "assets/images/album-1-uso-face-crack.webp", url: artistUrl },
    { title: "Hematoma", album: "II / CORPO", cover: "assets/images/album-2-incendios-candle.webp", url: artistUrl },
    { title: "Toque Fantasma", album: "III / AUSÊNCIA", cover: "assets/images/album-3-teologia-circle.webp", url: artistUrl },
    { title: "Fantasmogênese", album: "IV / FANTASMA", cover: "assets/images/album-4-fantasmogenese-ectoplasm.webp", url: artistUrl },
    { title: "O Arranjo do Submundo", album: "V / SUBMUNDO", cover: "assets/images/album-5-submundo-amphora.webp", url: artistUrl },
  ];

  const fallbackData = {
    "data.json": {
      albums: [
        {
          id: "uso",
          type: "ÁLBUM I",
          date: "29 mai 2026",
          status: "disponível agora",
          title: "Tudo Que Eu Uso Me Usa de Volta",
          image: "assets/images/album-1-uso-face-crack.webp",
          concept: "A tela acende. O corpo responde. A superfície cobra.",
          summary: "Tudo que ajuda a funcionar também aprende a usar.",
          tracks: ["Versão Consumida", "Fusão Nuclear", "Luz Azul", "Modo Avião", "Só o Que Vende / Livre Pra Quem", "Kouros de Silício", "Corpo-Entulho", "Vênus Aflita", "Você Era Banal", "Placebo", "Glamour Febril", "Cento e Oitenta", "Terminal"],
        },
        {
          id: "incendios",
          type: "ÁLBUM II",
          date: "05 jun 2026",
          status: "em breve",
          title: "Pequenos Incêndios sob o Ar-Condicionado no Máximo",
          image: "assets/images/album-2-incendios-candle.webp",
          concept: "A pele registra. O quarto esfria. A marca fica quente.",
          summary: "Contato não apaga. Só muda de temperatura.",
          tracks: ["Erro de Cálculo", "Fidelidade Antiga", "Não Claro", "Amor Com Dentes", "O Devorador", "Mercúrio", "Manutenção Mínima", "Pronta", "Portador da Luz", "Hematoma", "O Corpo Que Eu Tentei Ser", "Mão no Bolso"],
        },
        {
          id: "ep",
          type: "EP",
          date: "12 jun 2026",
          status: "em breve",
          title: "Dia dos Namorados Macabro",
          image: "ep-urso-neon-amorfa-v8.webp",
          color: true,
          concept: "o amor como produto com péssimo histórico",
          summary: "Quatro faixas sobre presente, vitrine, casa assombrada, romance vendido e afeto devolvido sem nota fiscal.",
          tracks: ["Feliz Dia (Que Horror)", "Assombração de Estimação", "Aceito Proposta", "Happy Valentine's (How Ghastly)"],
        },
        {
          id: "teologia",
          type: "ÁLBUM III",
          date: "19 jun 2026",
          status: "em breve",
          title: "Teologia dos Fracassos Afetivos em Cama de Solteiro",
          image: "assets/images/album-3-teologia-circle.webp",
          concept: "A cama vira altar. O sinal vira rito. A ausência cria rotina.",
          summary: "O quase aprende a ocupar o quarto.",
          tracks: ["Santo Errado", "Tarde Demais", "O Culto da Carne", "Lockdown (Terror Cult)", "Toque Fantasma", "Fracasso de Estimação", "Não Se Preocupa (Era Bituca)", "Cortesia do Medo", "Vinte e Três", "Quase Verdade", "Matéria Escura", "Para Onde Eu Fui?", "O Reino do Quase"],
        },
        {
          id: "fantasmogenese",
          type: "ÁLBUM IV",
          date: "26 jun 2026",
          status: "em breve",
          title: "Fantasmogênese",
          image: "assets/images/album-4-fantasmogenese-ectoplasm.webp",
          concept: "O vidro respira. A forma falha. O arquivo ganha voz.",
          summary: "Nada desaparece inteiro.",
          tracks: ["Onde Se Guarda", "Frequência Distorcida", "Fantasmogênese", "Campo Nulo", "Baixa Resolução", "Dose de Impulso", "Ritual de Fogo", "Junho, De Novo"],
        },
        {
          id: "submundo",
          type: "ÁLBUM V",
          date: "03 jul 2026",
          status: "em breve",
          title: "O Arranjo do Submundo",
          image: "assets/images/album-5-submundo-amphora.webp",
          concept: "A casa abre por baixo. A fome mostra a planta. O mecanismo respira.",
          summary: "Descer não revela tudo. Só deixa a porta acesa.",
          tracks: ["LIMIAR", "A Porta Debaixo da Casa", "Organismo Associado", "A Casa Dormia com os Olhos Abertos", "A Ânfora", "A Sutura Invisível", "O Arranjo do Submundo", "O Guardião das Formas", "Erro Original", "Flor de Plástico", "Colapso"],
        },
      ],
    },
    "transmissoes.json": {
      posts: [
        { id: "T-005", tipo: "transmissao", titulo: "001", imagem: "assets/uploads/transmissoes/capa_album_1.jpg", imagemFormato: "quadrada", imagemAlt: "Capa do Álbum I — Tudo Que Eu Uso Me Usa de Volta", conteudo: "TUDO QUE EU USO ME USA DE VOLTA\nestá no Spotify.\n\nTreze faixas.\nUma entrada.\nNenhuma saída limpa.", faixa: "TUDO QUE EU USO ME USA DE VOLTA — AMORFA" },
        { id: "T-004", tipo: "fragmento", titulo: "Brilhar", conteudo: "Eu brilho até cansar.\nVocê nem sente o calor\ne eu ainda chamo de sinal.", faixa: "Fusão Nuclear — AMORFA" },
        { id: "T-002", tipo: "fragmento", titulo: "", conteudo: "Posta uma foto.\napaga.\nposta de novo.\nespera.\n\nsem perceber,\no teu corpo inteiro\ncomeça a depender\nde uma luz azul\npra continuar funcionando.", faixa: "Versão Consumida — AMORFA" },
      ],
    },
    "estratos.json": {
      posts: [
        { id: "E-001", estrato: "fumaça", titulo: "Fumaça", conteudo: "meus gritos viram fumaça" },
        { id: "E-002", estrato: "frio", titulo: "Frio físico", conteudo: "esse frio não vem com o vento" },
        { id: "E-003", estrato: "dentes", titulo: "Língua", conteudo: "sua língua dança atrás dos dentes" },
        { id: "E-004", estrato: "forma", titulo: "Forma", conteudo: "a forma falha" },
        { id: "E-005", estrato: "sintoma", titulo: "Antes", conteudo: "antes sintoma" },
        { id: "E-006", estrato: "sinal", titulo: "Transmissão", conteudo: "a transmissão continua" },
      ],
    },
  };

  const loadJson = (url) => {
    if (location.protocol === "file:" && fallbackData[url]) {
      return Promise.resolve(fallbackData[url]);
    }
    return fetch(url).then((r) => {
      if (!r.ok) throw new Error(`Falha ao carregar ${url}`);
      return r.json();
    });
  };

  function initDailySignal() {
    const box = document.getElementById("dailySignal");
    if (!box) return;

    const track = dailyTracks[Math.floor(Date.now() / 86400000) % dailyTracks.length];
    const cover = box.querySelector(".daily-cover");
    const title = box.querySelector(".daily-title");
    const album = box.querySelector(".daily-album");
    const link = box.querySelector(".daily-link");

    if (cover) {
      cover.src = track.cover;
      cover.alt = `Capa de ${track.title}`;
    }
    if (title) title.textContent = track.title;
    if (album) album.textContent = track.album;
    if (link) link.href = track.url;
  }

  initDailySignal();

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

  const postFeedCard = (post) => {
    const title = post.titulo || post.id || "Arquivo aberto";
    const type = String(post.tipo || normalizeTipo(post.tipo)).toLowerCase();
    const track = post.faixa
      ? `<span class="post-track">${escapeHtml(post.faixa)}</span>`
      : "";
    return `
      <article class="post-card" data-post-type="${escapeHtml(type)}">
        <small>${escapeHtml(normalizeId(post.id))} / ${escapeHtml(post.tipo || type)}</small>
        <h3>${escapeHtml(title)}</h3>
        ${renderImage(post)}
        <p class="post-content">${escapeHtml(post.conteudo || "")}</p>
        ${track}
      </article>`;
  };

  /* ── feed de transmissões ── */

  const FEED_COPY = {
    transmissao: {
      kicker:      "transmissões públicas",
      title:       "Voz pública",
      description: "Arquivo aberto. O resto permanece recolhido.",
      label:       "TRANSMISSÃO",
    },
    fragmento: {
      kicker:      "fragmentos",
      title:       "Cortes do arquivo vivo",
      description: "Fragmentos. Restos. Sinais sem legenda.",
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

  function setupPostGrid(posts) {
    const feed = document.querySelector("[data-post-feed]");
    if (!feed) return;
    const params = new URLSearchParams(location.search);
    const requested = String(params.get("tipo") || location.hash.replace("#", "") || "todos").toLowerCase();
    const initialFilter = ["todos", "sinal", "verso", "poema", "fragmento", "transmissao"].includes(requested)
      ? requested
      : "todos";

    const render = (filter) => {
      const visible = filter === "todos"
        ? posts
        : posts.filter((post) => String(post.tipo || "").toLowerCase() === filter);
      feed.innerHTML = visible.length
        ? visible.map(postFeedCard).join("")
        : '<p class="empty">Nenhum arquivo aberto.</p>';
    };

    document.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        render(button.dataset.filter || "todos");
      });
    });

    document.querySelectorAll(".filter-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === initialFilter);
    });
    render(initialFilter);
  }

  const postPreview = document.querySelector("[data-post-preview]");
  const hasFeed     = document.getElementById("latest-post");
  const postFeed    = document.querySelector("[data-post-feed]");

  if (postPreview || hasFeed || postFeed) {
    loadJson("transmissoes.json")
      .then((data) => {
        const posts = sortPosts(Array.isArray(data.posts) ? data.posts : []);
        if (postPreview) {
          postPreview.innerHTML = posts.slice(0, 3).map(postCard).join("") ||
            '<p class="empty">Nenhuma transmissão ainda.</p>';
        }
        if (hasFeed) setupFeedTabs(posts);
        if (postFeed) setupPostGrid(posts);
      })
      .catch(() => {
        const msg = '<p class="empty">Não foi possível carregar as transmissões.</p>';
        if (postPreview) postPreview.innerHTML = msg;
        if (hasFeed)     hasFeed.innerHTML     = msg;
        if (postFeed)    postFeed.innerHTML    = msg;
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
