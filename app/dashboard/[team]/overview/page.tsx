import { OverviewContent } from "./components/overview-content";
import { resolveTeamId } from "@/lib/mock-data";

export default async function TeamOverviewPage({
	params,
}: {
	params: Promise<{ team: string }>;
}) {
	const { team } = await params;
	const teamId = resolveTeamId(team);

	return <OverviewContent key={`overview-${teamId}`} />;
}
