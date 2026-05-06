"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ProjectSummary } from "@/lib/projects";

export type DialogType = "create" | "rename" | "delete" | null;

interface DialogState {
  type: DialogType;
  project?: ProjectSummary;
}

function toSlug(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "untitled";
}

function generateSuffix(): string {
  return Math.random().toString(36).slice(2, 6);
}

export function useProjectActions() {
  const router = useRouter();
  const pathname = usePathname();
  const [dialog, setDialog] = useState<DialogState>({ type: null });
  const [formName, setFormName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slug = toSlug(formName);
  const roomId = formName ? `${slug}-${suffix}` : "";

  function openCreate() {
    setFormName("");
    setSuffix(generateSuffix());
    setDialog({ type: "create" });
  }

  function openRename(project: ProjectSummary) {
    setFormName(project.name);
    setDialog({ type: "rename", project });
  }

  function openDelete(project: ProjectSummary) {
    setDialog({ type: "delete", project });
  }

  function closeDialog() {
    setDialog({ type: null });
    setFormName("");
    setIsLoading(false);
  }

  async function handleCreate() {
    if (!formName.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim() }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      const { project } = (await res.json()) as { project: { id: number } };
      closeDialog();
      router.push(`/editor/${project.id}`);
    } catch {
      setIsLoading(false);
    }
  }

  async function handleRename() {
    if (!formName.trim() || !dialog.project) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${dialog.project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim() }),
      });
      if (!res.ok) throw new Error("Failed to rename project");
      closeDialog();
      router.refresh();
    } catch {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!dialog.project) return;
    const projectId = dialog.project.id;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      closeDialog();
      if (pathname === `/editor/${projectId}`) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch {
      setIsLoading(false);
    }
  }

  return {
    dialog,
    formName,
    setFormName,
    slug,
    roomId,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  };
}
