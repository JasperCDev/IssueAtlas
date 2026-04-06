import { ListContent } from "./components/list-content";
import { resolveProjectId } from "@/lib/mock-data";

export default async function ProjectListPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	const projectId = resolveProjectId(project);

	return <ListContent key={`list-${projectId}`} />;
}
