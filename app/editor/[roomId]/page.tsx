import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getProjectWithAccess } from "@/lib/project-access";
import { AccessDenied } from "@/components/editor/access-denied";
import { WorkspaceView } from "@/components/editor/workspace-view";

export default async function WorkspacePage(
  props: { params: Promise<{ roomId: string }> }
) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { roomId } = await props.params;
  const projectId = parseInt(roomId, 10);

  if (isNaN(projectId)) return <AccessDenied />;

  const project = await getProjectWithAccess(projectId);
  if (!project) return <AccessDenied />;

  return (
    <WorkspaceView
      projectId={project.id}
      projectName={project.name}
      isOwner={project.ownerId === userId}
    />
  );
}
