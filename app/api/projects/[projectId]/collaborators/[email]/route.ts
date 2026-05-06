import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

type Ctx = RouteContext<"/api/projects/[projectId]/collaborators/[email]">;

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, email: rawEmail } = await ctx.params;
  const id = parseInt(projectId, 10);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const email = decodeURIComponent(rawEmail).toLowerCase();

  const project = await prisma.project.findUnique({
    where: { id },
    select: { ownerId: true },
  });
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.projectCollaborator.deleteMany({
    where: { projectId: id, email },
  });

  return new Response(null, { status: 204 });
}
