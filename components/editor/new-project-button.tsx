"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/components/editor/editor-context";

export function NewProjectButton() {
  const { openCreate } = useEditor();
  return (
    <Button onClick={openCreate} className="gap-2 mt-2">
      <Plus className="h-4 w-4" />
      New Project
    </Button>
  );
}
