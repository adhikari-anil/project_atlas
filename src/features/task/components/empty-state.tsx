import Link from "next/link";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;

  description: string;

  buttonLabel: string;

  href: string;
}

export function EmptyState({
  title,
  description,
  buttonLabel,
  href,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed py-20 text-center">
      <div className="mx-auto max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <p className="text-muted-foreground">{description}</p>

        <Button>
          <Link href={href}>{buttonLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
