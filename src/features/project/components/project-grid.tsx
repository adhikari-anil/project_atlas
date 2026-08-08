import { ProjectCard } from "./project-card";
import { ProjectCardData } from "../types/project";

type Props = {
  projects: ProjectCardData[];
};

export function ProjectGrid({ projects }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
