<div align="center">

# 🖥️ JAVAI-OS // Portfólio do Peter

**Coisas que eu fiz e que estão no ar:** jogos, histórias interativas, ferramentas no navegador e experimentos com IA.
A vitrine funciona como um **Fantasy OS** com 5 sistemas retrô alternáveis (`JAVAI-64`, `Arcana OS`, `Sunset-OS '88`, `Temple-CRT` e `Win-95`).

[![Abrir o portfólio](https://img.shields.io/badge/%E2%96%B6%20abrir%20o%20portf%C3%B3lio-javaijafoi.dev-ff2e88?style=for-the-badge)](https://javaijafoi.dev)

![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000?style=flat-square&logo=vercel)

<img src="docs/img/home.jpg" alt="Página inicial do portfólio JAVAI-OS" width="820">

</div>

## 🕹️ O que tem lá

Uma vitrine interativa que alterna entre cinco estéticas de sistemas operacionais retrô (`?os=picotron|arcana|sunset|mainframe|win95`). O tema padrão é o Sunset-OS '88. Cada projeto tem chamada, descrição, stack, botão para abrir no navegador e link para o código.

<div align="center">
<img src="docs/img/projetos.jpg" alt="Cartões dos projetos: Matusalém, Era Vargas, Pinta-Kara, iHunt Chronicle e Rolador" width="820">
</div>

| Fita | Projeto | O que é | Código |
| --- | --- | --- | --- |
| 01 | [**Pico Multitool**](https://multitool.javaijafoi.dev) | 50 ferramentas que rodam no aparelho: remover fundo, vídeo, áudio, PDF, CPF, QR Code e mais | [repo](https://github.com/javaijafoi/pico-tools) |
| 02 | [**Rolador**](https://rolador.javaijafoi.dev) | Rolador de dados para doze sistemas de RPG de mesa | [repo](https://github.com/javaijafoi/rolador) |
| 03 | [**Matusalém**](https://matusalem.javaijafoi.dev) | História interativa de mistério no Bixiga | — |
| 04 | [**Pico Poetry**](https://poesia.javaijafoi.dev) | 98 poemas autorais: sorteie, escolha as cores e compartilhe | [repo](https://github.com/javaijafoi/pico-poetry) |
| 05 | [**Arena de Arton**](https://arena.javaijafoi.dev) | Simulador de combate tático por turnos de Tormenta 20 (homenagem de fã) | [repo](https://github.com/javaijafoi/arena-de-arton) |
| 06 | [**Rede**](https://rede.javaijafoi.dev) | Diagnóstico de internet móvel: teste de 20 segundos e monitor de engasgos, com veredito em português | [repo](https://github.com/javaijafoi/rede) |
| 07 | [**Pico Tafl**](https://tafl.javaijafoi.dev) | Hnefatafl, o jogo de tabuleiro dos vikings, contra IA em três níveis ou contra um amigo | [repo](https://github.com/javaijafoi/tafl) |
| 08 | [**Pinta-Kara**](https://pintakara.javaijafoi.dev) | Desenhe no ar com as mãos, usando só a webcam | [repo](https://github.com/javaijafoi/pinta-kara) |
| 09 | [**Era Vargas: O Equilibrista**](https://equilibrista.javaijafoi.dev) | Jogo 3D de decisões sobre o Brasil de 1930 a 1945 | [repo](https://github.com/javaijafoi/era-vargas-seliga) |
| 10 | [**Picotron Arena**](https://picotron.javaijafoi.dev) | Dez modos de arcade num computador de fantasia | [repo](https://github.com/javaijafoi/picotron-arcade) |
| 11 | [**Jogo do Davi**](https://jogodavi.javaijafoi.dev) | Jogo para crianças aprenderem a ler e a contar | [repo](https://github.com/javaijafoi/Jogo-davi) |
| 12 | [**Antigravitus**](https://antigravitus.javaijafoi.dev) | Diário de aventuras num RPG de texto, jogado por agentes de IA | [repo](https://github.com/javaijafoi/antigravitus) |
| 13 | [**#iHunt Chronicle**](https://ihunt.javaijafoi.dev) | Mesa virtual completa em tempo real para o RPG #iHunt (sistema Fate), feita por fã | — |

Outros projetos públicos no GitHub: [iFone](https://github.com/javaijafoi/ifone) ([no ar](https://ifone.javaijafoi.dev)), o celular de mentira para mesas de #iHunt, e o [iHunt App](https://github.com/javaijafoi/iHunt-app), um fork do Fari App para jogar Fate online. Documentação estruturada para IAs e agentes disponível em [`/llms.txt`](https://javaijafoi.dev/llms.txt) e [`/llms-full.txt`](https://javaijafoi.dev/llms-full.txt).

## 🚀 Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

O conteúdo dos projetos fica em `data/projects.ts`, e as interfaces dos 5 sistemas em `components/os/`. Para adicionar um projeto, basta incluir um item novo na lista.

## 🧱 Tecnologias

- **Framework:** Next.js 16 (App Router) e React 19
- **Estilo:** Tailwind CSS v4, glassmorphism, pixel art e CRT
- **Tipografia:** Google Fonts (`Space Grotesk`, `JetBrains Mono`, `Righteous`, `Silkscreen`, `VT323`, `Cinzel` e `Crimson Pro`)
- **Áudio:** síntese FM de anos 80 com a Web Audio API
- **SEO & GEO:** JSON-LD Schema.org (`Person`, `WebSite`, `ProfilePage`, `ItemList`), `sitemap.xml`, `robots.txt`, `llms.txt` e `llms-full.txt`
- **Deploy:** Vercel

---

Feito por Peter ([@javaijafoi](https://github.com/javaijafoi)).
