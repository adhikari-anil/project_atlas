-- Retain audit events when a task or project is deleted. The nullable foreign
-- keys are cleared while the activity continues to document what happened.
ALTER TABLE "activities" DROP CONSTRAINT "activities_project_id_fkey";
ALTER TABLE "activities" DROP CONSTRAINT "activities_task_id_fkey";

ALTER TABLE "activities"
  ADD CONSTRAINT "activities_project_id_fkey"
  FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "activities"
  ADD CONSTRAINT "activities_task_id_fkey"
  FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
