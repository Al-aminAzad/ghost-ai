"use client";

import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditor } from "@/components/editor/editor-context";

export function ProjectDialogs() {
  const {
    dialog,
    formName,
    setFormName,
    roomId,
    isLoading,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  } = useEditor();

  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dialog.type === "rename") {
      setTimeout(() => renameInputRef.current?.focus(), 50);
    }
  }, [dialog.type]);

  return (
    <>
      {/* Create Project */}
      <Dialog
        open={dialog.type === "create"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent
          showCloseButton={false}
          className="rounded-3xl bg-elevated border border-surface-border text-copy-primary max-w-sm w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-copy-primary">New Project</DialogTitle>
            <DialogDescription className="text-copy-muted">
              Give your architecture workspace a name.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Input
              placeholder="Project name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
              className="bg-subtle border-surface-border text-copy-primary placeholder:text-copy-faint"
            />
            {formName && (
              <p className="text-xs text-copy-muted font-mono">
                room: <span className="text-brand">{roomId || "—"}</span>
              </p>
            )}
          </div>

          <DialogFooter className="border-t-0 bg-transparent p-0 -mx-0 -mb-0 mt-1">
            <Button variant="outline" onClick={closeDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!formName.trim() || isLoading}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Project */}
      <Dialog
        open={dialog.type === "rename"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent
          showCloseButton={false}
          className="rounded-3xl bg-elevated border border-surface-border text-copy-primary max-w-sm w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-copy-primary">Rename Project</DialogTitle>
            <DialogDescription className="text-copy-muted">
              Renaming &ldquo;{dialog.project?.name}&rdquo;
            </DialogDescription>
          </DialogHeader>

          <Input
            ref={renameInputRef}
            placeholder="Project name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="bg-subtle border-surface-border text-copy-primary placeholder:text-copy-faint"
          />

          <DialogFooter className="border-t-0 bg-transparent p-0 -mx-0 -mb-0 mt-1">
            <Button variant="outline" onClick={closeDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              disabled={!formName.trim() || isLoading}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project */}
      <Dialog
        open={dialog.type === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent
          showCloseButton={false}
          className="rounded-3xl bg-elevated border border-surface-border text-copy-primary max-w-sm w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-copy-primary">Delete Project</DialogTitle>
            <DialogDescription className="text-copy-muted">
              Are you sure you want to delete &ldquo;{dialog.project?.name}&rdquo;? This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="border-t-0 bg-transparent p-0 -mx-0 -mb-0 mt-1">
            <Button variant="outline" onClick={closeDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
