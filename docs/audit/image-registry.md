# Image Registry - Fluvius

Date: 2026-06-14
Status: registro inicial

| Asset | Uso atual | Dimensao fonte | Alt padrao | Status |
| --- | --- | --- | --- | --- |
| `assets/hero-dam.jpg` | Hero, cards de projeto e paginas institucionais | existente no repo | Estrutura hidrica/geotecnica em vale | aprovado para uso atual |
| `assets/river-accent.jpg` | Cards de saneamento, territorio e recurso hidrico | existente no repo | Curso d'agua e infraestrutura hidrica | aprovado para uso atual |
| `assets/logo-lockup.jpg` | Header e footer | existente no repo | Fluvius Engenharia | aprovado |
| `assets/logo-lockup.png` | Apple touch icon | existente no repo | Fluvius Engenharia | aprovado |
| `assets/favicon.svg` | Favicon | existente no repo | n/a | aprovado |

## Bloqueios

- `BLOCKED_ASSET_SOURCE`: ainda faltam imagens reais distintas para todos os setores/cases.
- Ate o bloqueio ser resolvido, a melhoria de reduzir repeticao visual fica parcial.

## Politica Inicial

- Hero principal usa `fetchpriority="high"`.
- Imagens abaixo da dobra usam `loading="lazy"` e `decoding="async"`.
- `srcset`/formatos adicionais devem ser gerados quando houver fonte com resolucao suficiente.
