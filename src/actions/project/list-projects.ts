"use server";

import { listProjects } from "@/services";

export async function listProjectsAction() {
  return listProjects();
}
