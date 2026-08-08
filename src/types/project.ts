export interface ProjectCardData {
  id: string;
  name: string;
  slug: string;
  description: string | null;

  status: "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED";

  taskCount: number;

  memberCount: number;

  createdAt: Date;

  updatedAt: Date;
}
