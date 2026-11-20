<div align="center">

# 🌴 Portfólio do Peter

**Coisas que eu fiz e que estão no ar:** jogos, histórias interativas e experimentos com IA.
Cada projeto é uma fita no deck: é só escolher e apertar play.

[![Abrir o portfólio](https://img.shields.io/badge/%E2%96%B6%20abrir%20o%20portf%C3%B3lio-javaijafoi.dev-ff2e88?style=for-the-badge)](https://javaijafoi.dev)

![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000?style=flat-square&logo=vercel)

<img src="docs/img/home.jpg" alt="Página inicial do portfólio, com estética de fita cassete e synthwave" width="820">

</div>

## 🕹️ O que tem lá

Uma vitrine interativa com estética de anos 80, synthwave e arcade. Cada projeto vira um cartão com chamada, descrição, tecnologias, botão de demo e link para o código.

<div align="center">
<img src="docs/img/projetos.jpg" alt="Cartões dos projetos: Matusalém, Era Vargas, Pinta-Kara, iHunt Chronicle e Rolador" width="820">
</div>

| Fita | Projeto | O que é | Código |
| --- | --- | --- | --- |
| 01 | [**Pico Multitool**](https://multitool.javaijafoi.dev) | 50 ferramentas que rodam no aparelho: remover fundo, vídeo, áudio, PDF, CPF, QR Code e mais | [repo](https://github.com/javaijafoi/pico-tools) |
| 02 | [**Rolador**](https://rolador.javaijafoi.dev) | Dados para qualquer RPG de mesa, com cara de PICO-8 | [repo](https://github.com/javaijafoi/rolador) |
| 03 | [**Matusalém**](https://matusalem.javaijafoi.dev) | História interativa de mistério no Bixiga | — |
| 04 | [**Pico Poetry**](https://poesia.javaijafoi.dev) | Petiscos de poesia em pixel: sorteie, escolha as cores e compartilhe | [repo](https://github.com/javaijafoi/pico-poetry) |
| 05 | [**Arena de Arton**](https://arena.javaijafoi.dev) | Simulador de combate tático por turnos de Tormenta 20 (homenagem de fã) | [repo](https://github.com/javaijafoi/arena-de-arton) |
| 06 | [**Pinta-Kara**](https://pintakara.javaijafoi.dev) | Desenhe no ar com as mãos, usando só a webcam | [repo](https://github.com/javaijafoi/pinta-kara) |
| 07 | [**Era Vargas: O Equilibrista**](https://equilibrista.javaijafoi.dev) | Jogo 3D de decisões sobre o Brasil de 1930 a 1945 | [repo](https://github.com/javaijafoi/era-vargas-seliga) |
| 08 | [**Picotron Arena**](https://picotron.javaijafoi.dev) | Dez modos de arcade caóticos num computador de fantasia | [repo](https://github.com/javaijafoi/picotron-arcade) |
| 09 | [**Jogo do Davi**](https://jogodavi.javaijafoi.dev) | Jogo para crianças aprenderem a ler e a contar | [repo](https://github.com/javaijafoi/Jogo-davi) |
| 10 | [**Antigravitus**](https://antigravitus.javaijafoi.dev) | Diário de aventuras num RPG de texto, jogado por agentes de IA | [repo](https://github.com/javaijafoi/antigravitus) |
| 11 | **#iHunt Chronicle** | Mesa virtual para o RPG #iHunt (em pausa) | — |

Outros projetos públicos no GitHub: [iFone](https://github.com/javaijafoi/ifone) ([no ar](https://ifone.javaijafoi.dev)), o celular de mentira para mesas de #iHunt, e o [iHunt App](https://github.com/javaijafoi/iHunt-app), um fork do Fari App para jogar Fate online. O perfil do autor é [@javaijafoi](https://github.com/javaijafoi), e cada um desses repositórios aponta de volta para este portfólio.

## 🚀 Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

O conteúdo dos cartões fica em `data/projects.ts`, e os textos da interface em `components/`. Para adicionar um projeto, basta incluir um item novo na lista.

## 🧱 Tecnologias

- **Framework:** Next.js 16 (App Router) e React 19
- **Estilo:** Tailwind CSS v4, glassmorphism e efeitos neon
- **Tipografia:** Google Fonts (`Righteous` e `Space Grotesk`)
- **Áudio:** síntese FM de anos 80 com a Web Audio API
- **Deploy:** Vercel

---

Feito por Peter ([@javaijafoi](https://github.com/javaijafoi)).
