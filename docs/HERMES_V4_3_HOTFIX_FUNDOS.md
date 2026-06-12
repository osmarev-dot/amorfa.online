# HERMES V4.3 — Hotfix de fundos locais e GitHub Pages

Correção aplicada após teste local em `file://`: os fundos não apareciam porque a V4.2 usava URLs absolutas (`/assets/...`).

## Correção

- Removidas variáveis inline `--bg-desktop` / `--bg-mobile` dos elementos `.page-bg`.
- Inserido `<style id="page-background-image">` em cada página com `background-image` relativo ao próprio HTML.
- O mesmo pacote funciona abrindo localmente no navegador e também em GitHub Pages/domínio próprio.
- Nenhuma imagem foi removida.
- Fundos permanecem em `/assets/img/backgrounds/`.

## Páginas ajustadas

- `antologia.html`
- `discografia.html`
- `fragmentos.html`
- `index.html`
- `ouvir.html`
- `sobre.html`
- `transmissoes.html`
- `discografia/index.html`
- `discografia/eps/dia-dos-namorados-macabro.html`
- `discografia/albuns/antologia/album-i.html`
- `discografia/albuns/antologia/album-ii.html`
- `discografia/albuns/antologia/album-iii.html`
- `discografia/albuns/antologia/album-iv.html`
- `discografia/albuns/antologia/album-v.html`
- `discografia/albuns/antologia/album-vi.html`
