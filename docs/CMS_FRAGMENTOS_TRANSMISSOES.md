# CMS — Fragmentos e Transmissões

Correção V4.7:

- As imagens antigas foram movidas para `/assets/uploads/fragmentos/` e `/assets/uploads/transmissoes/`.
- `fragmentos.json` e `transmissoes.json` agora apontam para esses caminhos.
- O Sveltia CMS consegue abrir a biblioteca de mídia com miniaturas pelo botão `Replace`.
- As páginas `/fragmentos.html` e `/transmissoes.html` passaram a ler os JSONs automaticamente via JavaScript.
- Para conferência visual rápida:
  - `/admin/preview-fragmentos.html`
  - `/admin/preview-transmissoes.html`

Regra operacional:

- Não editar manualmente o HTML dos cards.
- Editar conteúdo pelo CMS ou pelos JSONs.
- Subir imagens leves, preferencialmente WebP.
