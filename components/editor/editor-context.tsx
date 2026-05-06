"use client";

import { createContext, useContext } from "react";
import { useProjectActions } from "@/hooks/use-project-actions";
import type { ProjectSummary } from "@/lib/projects";

interface EditorContextValue extends ReturnType<typeof useProjectActions> {
  ownedProjects: ProjectSummary[];
  sharedProjects: ProjectSummary[];
}

const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorProviderProps {
  children: React.ReactNode;
  ownedProjects: ProjectSummary[];
  sharedProjects: ProjectSummary[];
}

export function EditorProvider({
  children,
  ownedProjects,
  sharedProjects,
}: EditorProviderProps) {
  const actions = useProjectActions();
  const value: EditorContextValue = { ...actions, ownedProjects, sharedProjects };
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}
