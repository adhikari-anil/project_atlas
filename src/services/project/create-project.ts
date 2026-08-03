import {
  createProject as createProjectRepository,
  findProjectBySlug,
} from "@/repositories";

import { getCurrentUser } from "@/services/index";

import { CreateProjectInput } from "@/validations/project-schema";

import { generateSlug } from "@/lib/slug";

export async function createProject(
  organizationId: string,
  data: CreateProjectInput,
) {
  /*
   * Current User
   */

  const currentUser = await getCurrentUser();

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
