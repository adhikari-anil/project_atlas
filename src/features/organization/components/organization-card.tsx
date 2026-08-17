// import Link from "next/link";

// import { Organization } from "../types/organization";

// interface OrganizationCardProps {
//   organization: Organization;
// }

// export function OrganizationCard({ organization }: OrganizationCardProps) {
//   return (
//     <Link
//       href="/dashboard/projects"
//       className="group block rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
//     >
//       <div className="flex h-full flex-col justify-between gap-6">
//         {/* Header */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-blue-600">
//               {organization.name}
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">@{organization.slug}</p>
//           </div>

//           <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
//             {organization.type}
//           </span>
//         </div>

//         {/* Description */}
//         <div className="flex-1">
//           <p className="line-clamp-3 text-sm leading-6 text-gray-600">
//             {organization.description ?? "No description has been added yet."}
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between border-t pt-4">
//           <span className="text-xs text-gray-500">
//             Created {new Date(organization.createdAt).toLocaleDateString()}
//           </span>

//           <span className="text-sm font-medium text-blue-600 transition group-hover:translate-x-1">
//             Open →
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

"use client";

import { useRouter } from "next/navigation";

import {
  deleteOrganizationAction,
  selectOrganizationAction,
} from "@/actions/index";

import { Organization } from "../types/organization";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface OrganizationCardProps {
  organization: Organization;
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);
  async function handleSelect() {
    setIsPending(true);
    try {
      await selectOrganizationAction(organization.id);

      router.push(`/dashboard/organizations/${organization.id}/projects`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to select organization.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleDelete() {
    setIsDeletePending(true);
    const confirmed = window.confirm(
      "Are you sure you want to delete this Organization?",
    );

    if (!confirmed) {
      return;
    }
    try {
      await deleteOrganizationAction(organization.id);
      router.refresh();
    } catch (error) {
      console.log("Error while deleting organization", error);
    } finally {
      setIsDeletePending(false);
    }
  }

  return (
    <div className="group w-full text-left">
      <div className="flex h-full flex-col rounded-xl border bg-white p-6 transition hover:shadow-md gap-4">
        <div className="flex justify-between gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
            {organization.type}
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Link href={`/dashboard/organizations/${organization.id}/edit`}>
                Edit
              </Link>
            </Button>

            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleDelete}
            >
              {isDeletePending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
        {/* Header */}
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{organization.name}</h3>

          <p className="mt-1 text-sm text-gray-500">@{organization.slug}</p>
        </div>

        {/* Description */}
        <div className="flex-1">
          <p className="line-clamp-3 text-sm leading-6 text-gray-600">
            {organization.description ?? "No description has been added yet."}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-xs text-gray-500">
            Created {new Date(organization.createdAt).toLocaleDateString()}
          </span>

          <span className="text-sm font-medium text-blue-600 transition group-hover:translate-x-1">
            <button onClick={handleSelect}>
              {isPending ? "Opening..." : "Open"} →
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
