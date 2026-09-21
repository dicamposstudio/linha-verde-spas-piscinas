# Linha Verde Spas e Piscinas — atualização do site

Atualização preparada em 21 de setembro de 2026.

## Objetivo desta versão

Evoluir a home para uma experiência mais visual e persuasiva, preservando a estrutura de SEO que já começou a ganhar impressões e cliques orgânicos.

## Mudanças implementadas na home

- hero cinematográfico com vídeo real de piscina, loop curto, silencioso e comprimido;
- poster otimizado para carregamento inicial e fallback para usuários com redução de movimento;
- nova mensagem de abertura orientada a desejo + orientação comercial;
- separação narrativa entre Piscinas (convívio, processo e segurança) e Spas (bem-estar e descanso);
- uso de vídeo real de spa em formato vertical dentro de composição responsiva;
- seção “Projetos reais” com registros de instalação em andamento e resultado final;
- galeria mantida e reposicionada como prova visual de projetos executados;
- seção “Do quintal à primeira água” transformada em storytelling com imagem sticky e etapas ativadas pelo scroll;
- CTA de menor fricção: enviar foto do espaço para receber orientação inicial;
- formulário rápido com produto, cidade e disponibilidade de foto; as respostas não são armazenadas e apenas montam a mensagem do WhatsApp;
- CTA final em vídeo com sequência clara: foto → cidade → orientação;
- novos pontos de rastreamento via dataLayer para interesse em piscina/spa, projetos, qualificador e WhatsApp;
- manutenção das páginas regionais, blog, FAQ, sitemap, canonical, JSON-LD e estrutura de URLs existentes.

## Novos ativos otimizados

- `assets/video/hero-piscina.mp4` — vídeo curto para o hero;
- `assets/video/spa-real.mp4` — vídeo real de spa;
- `assets/hero-piscina-poster.jpg` — poster do hero;
- `assets/projeto-real-processo.webp` — registro de instalação;
- `assets/projeto-real-final.webp` — registro do resultado final.

Os vídeos foram comprimidos para web; juntos ficam próximos de 1 MB, reduzindo o impacto de performance.

## SEO preservado

As URLs locais continuam inalteradas, incluindo Camaçari, Salvador, Lauro de Freitas, Simões Filho, Candeias e Mata de São João. Também foram mantidos blog, sitemap, robots, dados estruturados e metadados principais.

## Antes de publicar

- confirmar que os dois registros usados como “Processo” e “Resultado” podem permanecer publicamente no portfólio;
- conferir o WhatsApp `(71) 99999-7043`;
- após publicar, testar o evento `click_whatsapp` no GA4/GTM para garantir que os novos links continuam entrando no mesmo acompanhamento;
- acompanhar PageSpeed em mobile após a publicação;
- comparar GA4 e Search Console com a linha de base de 01–15/09/2026.


## SEO orgânico — atualização 21/09/2026

- Criado hub `/modelos-piscinas/` com medidas do catálogo de referência disponibilizado pela Linha Verde.
- Criado hub `/projetos/` e caso indexável `/projetos/piscina-residencial-instalacao-real/`.
- Criado artigo `/blog/artigos/como-escolher-tamanho-piscina-fibra/`.
- Páginas locais receberam Open Graph, robots, Service + Breadcrumb + FAQ schema, FAQ visível e links internos para modelos, projeto real e conteúdos comerciais.
- Home e blog ganharam links para os novos hubs.
- Sitemap atualizado com as novas URLs e datas de modificação.
- Nenhuma cidade foi atribuída ao projeto real porque o material fornecido não identifica a localização do caso.
- A página de modelos deixa claro que medidas vêm do catálogo de referência e não equivalem a confirmação de estoque, preço ou disponibilidade.
