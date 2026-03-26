import { redirect } from "next/navigation";
import { resolveTeamId } from "@/lib/mock-data";

export default async function TeamDashboardPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = await params;
  redirect(`/dashboard/${resolveTeamId(team)}/overview`);
}
