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

import { selectOrganizationAction } from "@/actions/index";

import { Organization } from "../types/organization";

interface OrganizationCardProps {
  organization: Organization;
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const router = useRouter();
  console.log("From org card: ", organization.id);

  async function handleSelect() {
    try {
      await selectOrganizationAction(organization.id);

      router.push("/dashboard/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to select organization.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="group w-full text-left"
    >
      <div className="flex h-full flex-col rounded-xl border bg-white p-6 transition hover:shadow-md">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{organization.name}</h3>

            <p className="mt-1 text-sm text-gray-500">@{organization.slug}</p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
            {organization.type}
          </span>
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
            Open →
          </span>
        </div>
      </div>
    </button>
  );
}
