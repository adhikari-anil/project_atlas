import CreateProjectForm from "./components/create-project-form";

export default function ProjectsPage() {
  // Temporary until we implement active organization
  const organizationId = "c71095bd-e112-4584-a5d2-5648e5790a2a";

  return (
    <main className="p-10">
      <CreateProjectForm organizationId={organizationId} />
    </main>
  );
}
