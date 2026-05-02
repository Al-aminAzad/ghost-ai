"use client";

import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  if (!isOpen) return null;

  return (
    <aside
      id="project-sidebar"
      className="fixed top-12 left-0 bottom-0 z-40 w-72 flex flex-col bg-elevated/95 backdrop-blur-sm border-r border-surface-border"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
        <span className="text-sm font-medium text-copy-primary">Projects</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close sidebar"
          className="h-7 w-7 text-copy-muted hover:text-copy-primary"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="flex flex-col flex-1 min-h-0">
        <TabsList className="mx-4 mt-3 grid grid-cols-2">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>

        <TabsContent
          value="my-projects"
          className="flex-1 flex items-center justify-center px-4"
        >
          <p className="text-sm text-copy-muted text-center">No projects yet.</p>
        </TabsContent>

        <TabsContent
          value="shared"
          className="flex-1 flex items-center justify-center px-4"
        >
          <p className="text-sm text-copy-muted text-center">No shared projects.</p>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t border-surface-border">
        <Button variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
