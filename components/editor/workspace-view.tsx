"use client";

import { useState } from "react";
import { Share2, SidebarClose, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "@/components/editor/share-dialog";

interface WorkspaceViewProps {
  projectId: number;
  projectName: string;
  isOwner: boolean;
}

export function WorkspaceView({ projectId, projectName, isOwner }: WorkspaceViewProps) {
  const [aiOpen, setAiOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Workspace navbar */}
      <div className="h-10 flex items-center gap-2 px-4 border-b border-surface-border bg-surface shrink-0">
        <span className="flex-1 text-sm font-medium text-copy-primary truncate">
          {projectName}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs text-copy-muted hover:text-copy-primary"
          onClick={() => setShareOpen(true)}
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-copy-muted hover:text-copy-primary"
          onClick={() => setAiOpen((prev) => !prev)}
          aria-label="Toggle AI sidebar"
        >
          {aiOpen ? (
            <SidebarClose className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Content area */}
      <div className="flex-1 flex min-h-0">
        {/* Canvas placeholder */}
        <div className="flex-1 bg-base flex items-center justify-center">
          <p className="text-sm text-copy-faint">Canvas coming soon</p>
        </div>

        {/* AI sidebar placeholder */}
        {aiOpen && (
          <aside className="w-72 shrink-0 border-l border-surface-border bg-elevated flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border">
              <Bot className="h-4 w-4 text-accent-ai" />
              <span className="text-sm font-medium text-copy-primary">AI Chat</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-copy-faint">AI chat coming soon</p>
            </div>
          </aside>
        )}
      </div>

      <ShareDialog
        projectId={projectId}
        isOwner={isOwner}
        open={shareOpen}
        onOpenChange={setShareOpen}
      />
    </div>
  );
}
