# DÉDALO — Revisão de Layout V4

Base: amorfa-online-dedalo-antologia-0307-v3-layoutfix.zip  
Pacote visual integrado: AMORFA_site_backgrounds_renomeados.zip

## Decisões aplicadas

- Fundos finais importados em `/assets/img/backgrounds/`.
- Documentos do pacote mantidos em `/docs/`.
- Sistema antigo `--page-bg` em `.site-shell::before` removido.
- Novo sistema explícito `.page-bg` + `.page-overlay` implementado.
- Capa deixou de funcionar como fundo. Capa é objeto; fundo é atmosfera.
- Header reduzido para: Antologia / Discografia / Ouvir.
- Sobre, Fragmentos e Transmissões movidos para footer e menu mobile secundário.
- Escala tipográfica reduzida conforme relatório V4.
- Home refeita em três atos: Hero / Seis estados / 03.07.
- Antologia refeita com cards compactos em timeline editorial.
- Discografia refeita com cards curtos.
- Páginas de álbum refeitas em composição capa + texto + tracklist.
- `assets/site.css` antigo arquivado em `/docs/archive/site-v38/site.css`.
- `assets/amorfa.css` mantido como CSS principal.
- Fragmentos e Transmissões foram estabilizados, mas sem competir com a campanha principal.

## Fundos aplicados

| Página | Fundo |
|---|---|
| Home | `home_desktop.webp` / `home_mobile.webp` |
| Antologia | `antologia_desktop.webp` / `antologia_mobile.webp` |
| Discografia | `discografia_desktop.webp` |
| Ouvir | `ouvir_desktop.webp` |
| Sobre | `sobre_desktop.webp` / `sobre_mobile.webp` |
| Álbum I | `album_i_superficie_desktop.webp` |
| Álbum II | `album_ii_contato_desktop.webp` |
| Álbum III | `album_iii_devocao_desktop.webp` |
| Álbum IV | `album_iv_dissolucao_desktop.webp` |
| Álbum V | `album_v_submundo_desktop.webp` / `album_v_submundo_mobile.webp` |
| Álbum VI | `album_vi_arquivo_final_desktop.webp` / `album_vi_arquivo_final_mobile.webp` |
| EP | `ep_dia_dos_namorados_desktop.webp` |
| Fragmentos | `fragmentos_desktop.webp` |
| Transmissões | `transmissoes_desktop.webp` / `transmissoes_mobile.webp` |

## Teste rápido

Abrir localmente:

- `index.html`
- `antologia.html`
- `discografia.html`
- `discografia/albuns/antologia/album-vi.html`
- `ouvir.html`

As páginas foram geradas com caminhos relativos para funcionar em `file://` e em GitHub Pages.
