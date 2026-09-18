import {
  createProject as createProjectRepository,
  findProjectBySlug,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";

import { getCurrentOrganization, getCurrentUser } from "@/services/index";

import { CreateProjectInput } from "@/validations/project-schema";
import { ActivityType } from "../../../generated/prisma/enums";

import { generateSlug } from "@/lib/slug";

export async function createProject(data: CreateProjectInput) {
  /*
   * Current User
   */

  const currentUser = await getCurrentUser();

  // Get your current organization...
  const organizationId = await getCurrentOrganization();

  /*
   * Generate slug
   */

  const slug = generateSlug(data.name);

  /*
   * Check duplicate slug
   */

  const existingProject = await findProjectBySlug(organizationId, slug);

  if (existingProject) {
    throw new Error("A project with this name already exists.");
  }

  /*
   * Save
   */

  const project = await createProjectRepository({
    name: data.name,
    description: data.description,
    status: data.status,

    slug,

    organization: {
      connect: {
        id: organizationId,
      },
    },

    createdBy: {
      connect: {
        id: currentUser.id,
      },
    },
  });

  await createActivity({
    organizationId: project.organizationId,
    projectId: project.id,
    userId: currentUser.id,
    type: ActivityType.PROJECT_CREATED,
    message: `Created project "${project.name}"`,
  });

  return project;
}
