import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProjectForm } from "../components/project-form";

export function CreateProjectScreen() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Button variant="ghost" className="w-fit">
        <Link href="/dashboard/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>

          <CardDescription>
            Create a new project inside your current organization.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
