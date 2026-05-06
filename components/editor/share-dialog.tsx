"use client";

import { useState, useEffect, useCallback } from "react";
import { Link2, Loader2, Trash2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CollaboratorInfo {
  email: string;
  name: string | null;
  imageUrl: string | null;
}

interface ShareDialogProps {
  projectId: number;
  isOwner: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CollaboratorAvatar({ info }: { info: CollaboratorInfo }) {
  if (info.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={info.imageUrl}
        alt={info.name ?? info.email}
        className="h-7 w-7 rounded-full object-cover shrink-0"
      />
    );
  }
  const initials = info.name
    ? info.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : info.email[0].toUpperCase();
  return (
    <div className="h-7 w-7 rounded-full bg-subtle border border-surface-border flex items-center justify-center shrink-0">
      <span className="text-xs font-medium text-copy-muted">{initials}</span>
    </div>
  );
}

export function ShareDialog({ projectId, isOwner, open, onOpenChange }: ShareDialogProps) {
  const [collaborators, setCollaborators] = useState<CollaboratorInfo[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);

  const fetchCollaborators = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`);
      if (!res.ok) throw new Error();
      const { collaborators: list } = (await res.json()) as { collaborators: CollaboratorInfo[] };
      setCollaborators(list);
    } finally {
      setLoadingList(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (open) fetchCollaborators();
  }, [open, fetchCollaborators]);

  async function handleInvite() {
    const email = inviteEmail.trim().toLowerCase();
    if (!email) return;
    setInviting(true);
    setInviteError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to invite collaborator");
      setInviteEmail("");
      await fetchCollaborators();
    } catch {
      setInviteError("Could not invite collaborator. Check the email and try again.");
    } finally {
      setInviting(false);
    }
  }

  async function handleRemove(email: string) {
    setRemovingEmail(email);
    try {
      await fetch(
        `/api/projects/${projectId}/collaborators/${encodeURIComponent(email)}`,
        { method: "DELETE" }
      );
      setCollaborators((prev) => prev.filter((c) => c.email !== email));
    } finally {
      setRemovingEmail(null);
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-3xl bg-elevated border border-surface-border text-copy-primary max-w-md w-full"
      >
        <DialogHeader>
          <DialogTitle className="text-copy-primary">Share project</DialogTitle>
          <DialogDescription className="text-copy-muted">
            {isOwner
              ? "Invite collaborators by email or copy the project link."
              : "People with access to this project."}
          </DialogDescription>
        </DialogHeader>

        {/* Invite form — owner only */}
        {isOwner && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                placeholder="Email address"
                type="email"
                value={inviteEmail}
                onChange={(e) => {
                  setInviteEmail(e.target.value);
                  setInviteError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                className="bg-subtle border-surface-border text-copy-primary placeholder:text-copy-faint flex-1"
              />
              <Button
                onClick={handleInvite}
                disabled={!inviteEmail.trim() || inviting}
                size="sm"
                className="gap-1.5 shrink-0"
              >
                {inviting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <UserPlus className="h-3.5 w-3.5" />
                )}
                Invite
              </Button>
            </div>
            {inviteError && (
              <p className="text-xs text-state-error">{inviteError}</p>
            )}
          </div>
        )}

        {/* Collaborator list */}
        <div className="flex flex-col gap-1 min-h-[48px]">
          {loadingList ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-copy-muted" />
            </div>
          ) : collaborators.length === 0 ? (
            <p className="text-sm text-copy-faint py-2">No collaborators yet.</p>
          ) : (
            collaborators.map((c) => (
              <div
                key={c.email}
                className="flex items-center gap-3 px-1 py-1.5 rounded-xl"
              >
                <CollaboratorAvatar info={c} />
                <div className="flex-1 min-w-0">
                  {c.name && (
                    <p className="text-sm text-copy-primary truncate">{c.name}</p>
                  )}
                  <p className={`truncate ${c.name ? "text-xs text-copy-muted" : "text-sm text-copy-primary"}`}>
                    {c.email}
                  </p>
                </div>
                {isOwner && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-copy-muted hover:text-state-error shrink-0"
                    disabled={removingEmail === c.email}
                    onClick={() => handleRemove(c.email)}
                    aria-label={`Remove ${c.email}`}
                  >
                    {removingEmail === c.email ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Copy link */}
        <div className="border-t border-surface-border pt-3 -mx-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 text-copy-muted"
            onClick={handleCopyLink}
          >
            <Link2 className="h-3.5 w-3.5" />
            {copied ? "Copied!" : "Copy project link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
