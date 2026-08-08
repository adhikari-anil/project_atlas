import {
  createProject as createProjectRepository,
  findProjectBySlug,
} from "@/repositories";

import { getCurrentOrganization, getCurrentUser } from "@/services/index";

import { CreateProjectInput } from "@/validations/project-schema";

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

  return createProjectRepository({
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
}
