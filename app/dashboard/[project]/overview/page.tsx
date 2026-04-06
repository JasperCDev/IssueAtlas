import { resolveProjectId } from "@/lib/mock-data";
import { OverviewContentClient } from "./components/overview-content-client";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const projectId = resolveProjectId(project);

  return <OverviewContentClient key={`overview-${projectId}`} />;
}
