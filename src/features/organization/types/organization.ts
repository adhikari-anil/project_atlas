export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: string;
  createdAt: Date;
}
