import { ListContent } from "./components/list-content";
import { resolveTeamId } from "@/lib/mock-data";

export default async function TeamListPage({
	params,
}: {
	params: Promise<{ team: string }>;
}) {
	const { team } = await params;
	const teamId = resolveTeamId(team);

	return <ListContent key={`list-${teamId}`} />;
}
