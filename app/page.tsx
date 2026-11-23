import FantasyOS from "@/components/FantasyOS";
import { CALIFORNIA_PROJECTS } from "@/data/projects";
import { EXTRA_PROJECTS, GITHUB_URL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <FantasyOS />
      {/* Lista com links de verdade, legível por buscadores, leitores de tela e IAs. */}
      <section aria-label="Lista de projetos" className="sr-only">
        <h2>Projetos do Peter (@javaijafoi) - Desenvolvedor em São Paulo, Brasil</h2>
        <p>
          Portfólio com jogos no navegador, ficção interativa, utilitários client-side e agentes de IA.
          Documentação para agentes e modelos de linguagem disponível em <a href="/llms.txt">llms.txt</a> e <a href="/llms-full.txt">llms-full.txt</a>.
        </p>
        <ul>
          {CALIFORNIA_PROJECTS.map((p) => (
            <li key={p.id}>
              <h3>
                <a href={p.vercelUrl}>{p.title}</a>
              </h3>
              <p>
                {p.tagline}. {p.description}
              </p>
              <p>Tecnologias: {p.techStack.join(", ")}</p>
              {p.githubUrl ? <a href={p.githubUrl}>Código no GitHub</a> : null}
            </li>
          ))}
        </ul>
        <h2>Outros repositórios públicos</h2>
        <ul>
          {EXTRA_PROJECTS.map((p) => (
            <li key={p.name}>
              <a href={p.url}>{p.name}</a>: {p.description} <a href={p.repo}>Código no GitHub</a>
            </li>
          ))}
        </ul>
        <a href={GITHUB_URL}>Perfil do Peter no GitHub (@javaijafoi)</a>
      </section>
    </>
  );
}
