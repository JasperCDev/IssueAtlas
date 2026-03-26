import { TicketBoard } from "@/app/dashboard/board/components/ticket-board";
import { resolveTeamId } from "@/lib/mock-data";

export default async function TeamBoardPage({
	params,
}: {
	params: Promise<{ team: string }>;
}) {
	const { team } = await params;
	const teamId = resolveTeamId(team);

	return <TicketBoard key={`board-${teamId}`} />;
}
