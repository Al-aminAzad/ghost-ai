import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getProjectWithAccess } from "@/lib/project-access";

type Ctx = RouteContext<"/api/projects/[projectId]/collaborators">;

export async function GET(_req: Request, ctx: Ctx) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await ctx.params;
  const id = parseInt(projectId, 10);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = await getProjectWithAccess(id);
  if (!project) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const records = await prisma.projectCollaborator.findMany({
    where: { projectId: id },
    orderBy: { createdAt: "asc" },
    select: { email: true },
  });

  const emails = records.map((r) => r.email);

  let enriched: Array<{ email: string; name: string | null; imageUrl: string | null }> =
    emails.map((email) => ({ email, name: null, imageUrl: null }));

  if (emails.length > 0) {
    const clerk = await clerkClient();
    const { data: clerkUsers } = await clerk.users.getUserList({ emailAddress: emails });
    const byEmail = new Map(
      clerkUsers.flatMap((u) =>
        u.emailAddresses.map((e) => [e.emailAddress, u])
      )
    );
    enriched = emails.map((email) => {
      const u = byEmail.get(email);
      if (!u) return { email, name: null, imageUrl: null };
      const name = [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username || null;
      return { email, name, imageUrl: u.imageUrl ?? null };
    });
  }

  return Response.json({ collaborators: enriched, isOwner: project.ownerId === userId });
}

export async function POST(req: Request, ctx: Ctx) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await ctx.params;
  const id = parseInt(projectId, 10);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({
    where: { id },
    select: { id: true, ownerId: true, name: true },
  });
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const email: string | undefined =
    typeof body.email === "string" && body.email.trim() ? body.email.trim().toLowerCase() : undefined;
  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const collaborator = await prisma.projectCollaborator.upsert({
    where: { projectId_email: { projectId: id, email } },
    create: { projectId: id, email },
    update: {},
  });

  return Response.json({ collaborator }, { status: 201 });
}
