import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export interface ProjectSummary {
  id: number;
  name: string;
  ownerId: string;
}

const select = { id: true, name: true, ownerId: true } as const;

export async function getOwnedProjects(): Promise<ProjectSummary[]> {
  const { userId } = await auth();
  if (!userId) return [];
  return prisma.project.findMany({
    select,
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSharedProjects(): Promise<ProjectSummary[]> {
  const user = await currentUser();
  if (!user) return [];
  const emails = user.emailAddresses.map((e) => e.emailAddress);
  if (emails.length === 0) return [];
  return prisma.project.findMany({
    select,
    where: {
      collaborators: { some: { email: { in: emails } } },
    },
    orderBy: { createdAt: "desc" },
  });
}
