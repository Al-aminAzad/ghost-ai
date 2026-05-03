"use client";

import { useState } from "react";
import { Project, MOCK_PROJECTS } from "@/lib/mock-projects";

export type DialogType = "create" | "rename" | "delete" | null;

interface DialogState {
  type: DialogType;
  project?: Project;
}

function toSlug(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "untitled";
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [dialog, setDialog] = useState<DialogState>({ type: null });
  const [formName, setFormName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slug = toSlug(formName);

  function openCreate() {
    setFormName("");
    setDialog({ type: "create" });
  }

  function openRename(project: Project) {
    setFormName(project.name);
    setDialog({ type: "rename", project });
  }

  function openDelete(project: Project) {
    setDialog({ type: "delete", project });
  }

  function closeDialog() {
    setDialog({ type: null });
    setFormName("");
    setIsLoading(false);
  }

  function handleCreate() {
    if (!formName.trim()) return;
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: formName.trim(),
      slug: toSlug(formName.trim()),
      owned: true,
    };
    setProjects((prev) => [...prev, newProject]);
    closeDialog();
  }

  function handleRename() {
    if (!formName.trim() || !dialog.project) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === dialog.project!.id
          ? { ...p, name: formName.trim(), slug: toSlug(formName.trim()) }
          : p
      )
    );
    closeDialog();
  }

  function handleDelete() {
    if (!dialog.project) return;
    setProjects((prev) => prev.filter((p) => p.id !== dialog.project!.id));
    closeDialog();
  }

  return {
    projects,
    dialog,
    formName,
    setFormName,
    slug,
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
