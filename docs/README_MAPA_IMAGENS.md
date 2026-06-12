# AMORFA — Imagens do site renomeadas

Pacote preparado para Dédalo.

## Uso

Copiar a pasta abaixo para o repositório do site:

```txt
/assets/img/backgrounds/
```

As imagens já estão em **WebP** e com nomes finais. Não há texto, logo, painel ou UI embutidos nas imagens.

## Regras de implementação

- Usar como fundos estáticos, não como capas.
- Aplicar overlay escuro por CSS quando houver texto por cima.
- Não usar `background-image` com imagens 1:1 antigas.
- Priorizar os arquivos `*_desktop.webp` no desktop.
- Usar os `*_mobile.webp` apenas onde já houver versão vertical adequada.
- Para páginas sem mobile dedicado, Dédalo pode usar o desktop com `background-position` ajustado até a próxima rodada.

## Mapa de arquivos

| Arquivo final | Uso | Dimensão | Peso | Fonte original | Status |
|---|---|---:|---:|---|---|
| `home_desktop.webp` | Home desktop | 1672x941 | 73 KB | `HOME_desktop.png` | aprovado |
| `antologia_desktop.webp` | Página Antologia desktop | 1672x941 | 65 KB | `antologia_desktop.png` | aprovado/usar como versão principal |
| `album_vi_arquivo_final_desktop.webp` | Álbum VI desktop | 1672x941 | 30 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_25 (1).png` | aprovado |
| `discografia_desktop.webp` | Discografia desktop | 1672x941 | 58 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_25 (2).png` | aprovado |
| `ouvir_desktop.webp` | Ouvir desktop | 1672x941 | 20 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_26 (3).png` | aprovado |
| `sobre_desktop.webp` | Sobre desktop | 1672x941 | 23 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_26 (4).png` | aprovado |
| `album_i_superficie_desktop.webp` | Álbum I — Superfície desktop | 1672x941 | 27 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_26 (5).png` | aprovado |
| `album_ii_contato_desktop.webp` | Álbum II — Contato desktop | 1672x941 | 67 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_26 (6).png` | aprovado |
| `album_iii_devocao_desktop.webp` | Álbum III — Devoção desktop | 1672x941 | 31 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_27 (7).png` | aprovado |
| `album_iv_dissolucao_desktop.webp` | Álbum IV — Dissolução desktop | 1672x941 | 153 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_27 (8).png` | aprovado |
| `album_v_submundo_desktop.webp` | Álbum V — Submundo desktop | 1672x941 | 65 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_27 (9).png` | aprovado |
| `ep_dia_dos_namorados_desktop.webp` | EP Dia dos Namorados Macabro desktop | 1672x941 | 61 KB | `ChatGPT Image 12 de jun. de 2026, 14_16_28 (10).png` | aprovado |
| `fragmentos_desktop.webp` | Fragmentos desktop | 1672x941 | 52 KB | `ChatGPT Image 12 de jun. de 2026, 13_56_05.png` | usar como arquivo lateral/vestígio |
| `transmissoes_desktop.webp` | Transmissões desktop | 1672x941 | 38 KB | `ChatGPT Image 12 de jun. de 2026, 13_44_22.png` | usar como sinal/reflexo |
| `home_mobile.webp` | Home mobile | 941x1672 | 45 KB | `ChatGPT Image 12 de jun. de 2026, 13_47_12.png` | aprovado |
| `antologia_mobile.webp` | Antologia mobile | 941x1672 | 43 KB | `ChatGPT Image 12 de jun. de 2026, 13_16_59.png` | base disponível |
| `album_vi_arquivo_final_mobile.webp` | Álbum VI mobile | 941x1672 | 30 KB | `ChatGPT Image 12 de jun. de 2026, 14_06_12.png` | base disponível |
| `sobre_mobile.webp` | Sobre mobile | 941x1672 | 45 KB | `ChatGPT Image 12 de jun. de 2026, 13_51_15.png` | base disponível |
| `album_v_submundo_mobile.webp` | Álbum V mobile / alternativa escura | 941x1672 | 66 KB | `ChatGPT Image 12 de jun. de 2026, 13_30_39.png` | base disponível |
| `transmissoes_mobile.webp` | Transmissões mobile / alternativa escura | 941x1672 | 71 KB | `ChatGPT Image 12 de jun. de 2026, 14_10_06.png` | base disponível |


## CSS recomendado

```css
.page-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image: var(--bg-desktop);
  background-size: cover;
  background-position: center;
  pointer-events: none;
}

.page-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.50), rgba(0,0,0,.72));
}

@media (max-width: 760px) {
  .page-bg {
    background-image: var(--bg-mobile, var(--bg-desktop));
    background-position: center top;
  }
}
```

## Exemplo HTML

```html
<div
  class="page-bg"
  style="
    --bg-desktop: url('/assets/img/backgrounds/album_vi_arquivo_final_desktop.webp');
    --bg-mobile: url('/assets/img/backgrounds/album_vi_arquivo_final_mobile.webp');
  "
  aria-hidden="true"></div>
```
