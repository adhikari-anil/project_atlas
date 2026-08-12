import { ProjectForm } from "../components/project-form";
import { getProjectAction } from "@/actions";

interface EditProjectScreenProps {
  projectId: string;
}

export async function EditProjectScreen({ projectId }: EditProjectScreenProps) {
  const project = await getProjectAction(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>

        <p className="mt-2 text-muted-foreground">
          Update the project details.
        </p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
