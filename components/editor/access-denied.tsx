import { Lock } from "lucide-react";
import Link from "next/link";

export function AccessDenied() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-subtle border border-surface-border">
        <Lock className="h-5 w-5 text-copy-muted" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-copy-primary">
          Access denied
        </h2>
        <p className="text-sm text-copy-muted max-w-xs">
          This project does not exist or you do not have permission to view it.
        </p>
      </div>
      <Link
        href="/editor"
        className="text-sm text-brand hover:underline underline-offset-4"
      >
        Back to editor
      </Link>
    </div>
  );
}
