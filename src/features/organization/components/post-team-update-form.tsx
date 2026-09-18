"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createTeamUpdateAction } from "@/actions";
import { Send, AlertCircle, MessageSquare, Flame } from "lucide-react";

interface PostTeamUpdateFormProps {
  organizationId: string;
}

export function PostTeamUpdateForm({ organizationId }: PostTeamUpdateFormProps) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"GENERAL" | "TASK_UPDATE" | "BLOCKER">("GENERAL");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setIsPending(true);
    setError(null);

    try {
      await createTeamUpdateAction(organizationId, {
        message: message.trim(),
        type,
      });
      setMessage("");
      setType("GENERAL");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post update.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-xs">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-primary" /> Post Team Update
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share progress, a milestone, or report a blocker to your team..."
          className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          disabled={isPending}
        />

        {error && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setType("GENERAL")}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                type === "GENERAL"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              General
            </button>
            <button
              type="button"
              onClick={() => setType("TASK_UPDATE")}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                type === "TASK_UPDATE"
                  ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Task Update
            </button>
            <button
              type="button"
              onClick={() => setType("BLOCKER")}
              className={`px-2.5 py-1 text-xs rounded-md font-medium flex items-center gap-1 transition-colors ${
                type === "BLOCKER"
                  ? "bg-destructive/10 text-destructive border border-destructive/20"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Flame className="w-3 h-3" /> Blocker
            </button>
          </div>

          <Button type="submit" size="sm" disabled={isPending || !message.trim()}>
            <Send className="w-3.5 h-3.5 mr-1" />
            {isPending ? "Posting..." : "Broadcast"}
          </Button>
        </div>
      </form>
    </div>
  );
}
