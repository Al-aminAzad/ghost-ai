"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/components/editor/editor-context";

export default function EditorPage() {
  const { openCreate } = useEditor();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold text-copy-primary">
        Create a project or open an existing one
      </h1>
      <p className="text-sm text-copy-muted">
        Start a new architecture workspace, or choose a project from the sidebar.
      </p>
      <Button onClick={openCreate} className="gap-2 mt-2">
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  );
}
