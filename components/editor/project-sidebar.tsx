"use client";

import { X, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor } from "@/components/editor/editor-context";
import { Project } from "@/lib/mock-projects";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProjectItem({ project }: { project: Project }) {
  const { openRename, openDelete } = useEditor();

  return (
    <div className="group flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-subtle cursor-pointer">
      <span className="flex-1 text-sm text-copy-primary truncate">{project.name}</span>
      {project.owned && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-copy-muted hover:text-copy-primary"
            onClick={(e) => {
              e.stopPropagation();
              openRename(project);
            }}
            aria-label={`Rename ${project.name}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-copy-muted hover:text-state-error"
            onClick={(e) => {
              e.stopPropagation();
              openDelete(project);
            }}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { projects, openCreate } = useEditor();

  const ownedProjects = projects.filter((p) => p.owned);
  const sharedProjects = projects.filter((p) => !p.owned);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop scrim */}
      <div
        className="fixed inset-0 z-30 bg-black/50 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

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

          <TabsContent value="my-projects" className="flex-1 min-h-0 mt-2">
            {ownedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full px-4">
                <p className="text-sm text-copy-muted text-center">No projects yet.</p>
              </div>
            ) : (
              <ScrollArea className="h-full px-2">
                <div className="flex flex-col gap-0.5 py-1">
                  {ownedProjects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex-1 min-h-0 mt-2">
            {sharedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full px-4">
                <p className="text-sm text-copy-muted text-center">No shared projects.</p>
              </div>
            ) : (
              <ScrollArea className="h-full px-2">
                <div className="flex flex-col gap-0.5 py-1">
                  {sharedProjects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-surface-border">
          <Button variant="outline" className="w-full gap-2" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
