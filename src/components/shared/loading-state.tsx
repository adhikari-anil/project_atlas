import { Loader2 } from "lucide-react";
import type { LoadingStateProps } from "@/types/ui";

export function LoadingState({ text = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="mt-4 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
