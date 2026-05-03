"use client";

import { createContext, useContext } from "react";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

type EditorContextValue = ReturnType<typeof useProjectDialogs>;

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const value = useProjectDialogs();
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}
