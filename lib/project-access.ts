import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import type { ProjectSummary } from "./projects";

interface Identity {
  userId: string;
  email: string;
}

export async function getCurrentIdentity(): Promise<Identity | null> {
  const user = await currentUser();
  if (!user) return null;
  const email = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;
  if (!email) return null;
  return { userId: user.id, email };
}

export async function getProjectWithAccess(
  projectId: number
): Promise<ProjectSummary | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const identity = await getCurrentIdentity();
  if (!identity) return null;

  const project = await prisma.project.findUnique({
    select: { id: true, name: true, ownerId: true },
    where: { id: projectId },
  });
  if (!project) return null;

  if (project.ownerId === userId) return project;

  const collaborator = await prisma.projectCollaborator.findFirst({
    where: { projectId, email: identity.email },
  });
  if (!collaborator) return null;

  return project;
}
