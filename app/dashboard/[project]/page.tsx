import { redirect } from "next/navigation";
import { resolveProjectId } from "@/lib/mock-data";

export default async function ProjectDashboardPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  redirect(`/dashboard/${resolveProjectId(project)}/overview`);
}
