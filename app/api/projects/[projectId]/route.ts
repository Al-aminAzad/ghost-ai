import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = RouteContext<"/api/projects/[projectId]">;

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await ctx.params;
  const id = parseInt(projectId, 10);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const name: string | undefined =
    typeof body.name === "string" && body.name.trim()
      ? body.name.trim()
      : undefined;

  if (!name) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  const updated = await prisma.project.update({
    where: { id },
    data: { name },
  });

  return Response.json({ project: updated });
}

export async function DELETE(_request: NextRequest, ctx: Ctx) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await ctx.params;
  const id = parseInt(projectId, 10);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.project.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
