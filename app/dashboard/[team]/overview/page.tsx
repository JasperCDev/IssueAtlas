import { resolveTeamId } from "@/lib/mock-data";
import { OverviewContentClient } from "./components/overview-content-client";

export default async function TeamOverviewPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = await params;
  const teamId = resolveTeamId(team);

  return <OverviewContentClient key={`overview-${teamId}`} />;
}
