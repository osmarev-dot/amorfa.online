# Relatório de implementação — DÉDALO / Antologia 03.07

## Decisão
Primeiro pacote aplicado como reconstrução controlada do site estático. Não houve migração para framework. O CSS antigo foi preservado; as páginas novas usam `assets/amorfa.css` e `assets/amorfa.js`.

## Arquivos principais criados/atualizados
- `index.html`
- `antologia.html`
- `discografia.html`
- `sobre.html`
- `ouvir.html`
- `fragmentos.html`
- `transmissoes.html`
- `discografia/albuns/antologia/album-i.html` a `album-vi.html`
- `discografia/eps/dia-dos-namorados-macabro.html`
- `assets/data/releases.json`
- `assets/data/links.json`
- `assets/data/site.json`
- `assets/amorfa.css`
- `assets/amorfa.js`
- `sitemap.xml`
- `robots.txt`
- `assets/img/og/*.jpg`
- `assets/img/optimized/**/*`

## Álbum VI
Incluído como álbum oficial da Antologia:
`/discografia/albuns/antologia/album-vi.html`

Tracklist oficial preservada na ordem fornecida.

## SEO
Adicionados ou atualizados:
- titles e descriptions por página;
- canonical;
- Open Graph absoluto;
- Twitter card;
- JSON-LD `MusicGroup`, `WebSite` e `MusicAlbum` nas páginas principais;
- `sitemap.xml` com a rota do VI;
- `robots.txt`.

## Observação visual
Foi criada uma capa/OG editorial provisória para o Álbum VI porque não havia capa definitiva no ZIP original. Substituir `assets/img/albums/album_vi.jpg` e `assets/img/og/album-vi-og.jpg` quando a arte final estiver aprovada.

## Validação feita
- Links internos verificados por parser: nenhum caminho interno quebrado encontrado.
- Rota do Álbum VI incluída no sitemap.
- `releases.json` contém 7 lançamentos: 6 álbuns + 1 EP.
