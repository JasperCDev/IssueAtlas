import { TicketBoard } from "@/app/dashboard/board/components/ticket-board";
import { resolveProjectId } from "@/lib/mock-data";

export default async function ProjectBoardPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	const projectId = resolveProjectId(project);

	return <TicketBoard key={`board-${projectId}`} />;
}
