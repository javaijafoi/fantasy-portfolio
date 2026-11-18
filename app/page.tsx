import CaliforniaVibes from "@/components/CaliforniaVibes";
import { CALIFORNIA_PROJECTS } from "@/data/projects";

export default function Home() {
  return (
    <>
      <CaliforniaVibes />
      {/* Lista com links de verdade, legível por buscadores, leitores de tela e IAs. */}
      <section aria-label="Lista de projetos" className="sr-only">
        <h2>Projetos do Peter</h2>
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
      </section>
    </>
  );
}
