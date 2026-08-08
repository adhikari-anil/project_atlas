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

import { OrganizationForm } from "../components/organization-form";

export function CreateOrganizationScreen() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <Button variant="ghost" className="w-fit">
          <Link href="/dashboard/organizations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Organizations
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Organization
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create a workspace where your team can collaborate on projects and
            tasks.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>

          <CardDescription>
            Enter the basic information to create your organization.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <OrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}
